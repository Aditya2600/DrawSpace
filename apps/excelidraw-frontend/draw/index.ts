import { getExistingShapes } from "./http";

type Shape = {
    id: number; // ✅ Added shape id for tracking erase
    type: "rect" | "circle";
    data: any;
};

export async function initDraw(
    canvas: HTMLCanvasElement,
    roomId: string,
    socket: WebSocket,
    selectedToolGetter: () => "rect" | "circle" | "eraser" // ✅ Replaced unsafe window.selectedTool
) {
    const ctx = canvas.getContext("2d");
    let existingShapes: Shape[] = await getExistingShapes(roomId); // ✅ Already filtered deletedAt in backend

    if (!ctx) return;

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type === "draw") {
            existingShapes.push(message.shape);
            clearCanvas(existingShapes, canvas, ctx);
        }

        if (message.type === "erase") {
            const erasedShapeIds: number[] = message.erasedShapeIds;
            existingShapes = existingShapes.filter(shape => !erasedShapeIds.includes(shape.id));
            clearCanvas(existingShapes, canvas, ctx);
        }
    };

    clearCanvas(existingShapes, canvas, ctx);

    let clicked = false;
    let startX = 0;
    let startY = 0;

    const mouseDown = (e: MouseEvent) => {
        clicked = true;
        const rect = canvas.getBoundingClientRect();
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;

        const selectedTool = selectedToolGetter();
        if (selectedTool === "eraser") {
            const erasedIds = eraseAtPoint(startX, startY, existingShapes);
            if (erasedIds.length > 0) {
                socket.send(JSON.stringify({ type: "erase", roomId, erasedShapeIds: erasedIds }));
                existingShapes = existingShapes.filter(shape => !erasedIds.includes(shape.id));
                clearCanvas(existingShapes, canvas, ctx);
            }
        }
    };

    const mouseUp = (e: MouseEvent) => {
        if (!clicked) return;
        clicked = false;

        const rect = canvas.getBoundingClientRect();
        const endX = e.clientX - rect.left;
        const endY = e.clientY - rect.top;

        const width = endX - startX;
        const height = endY - startY;

        const selectedTool = selectedToolGetter();
        let shape: Shape | null = null;

        if (selectedTool === "rect") {
            shape = {
                id: Date.now(), // ✅ Temporary id for local use
                type: "rect",
                data: { x: startX, y: startY, width, height }
            };
        } else if (selectedTool === "circle") {
            const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
            shape = {
                id: Date.now(),
                type: "circle",
                data: {
                    centerX: startX + width / 2,
                    centerY: startY + height / 2,
                    radius
                }
            };
        }

        if (!shape) return;

        existingShapes.push(shape);

        socket.send(JSON.stringify({
            type: "draw",
            roomId,
            shape
        }));

        clearCanvas(existingShapes, canvas, ctx);
    };

    const mouseMove = (e: MouseEvent) => {
        if (!clicked) return;

        const rect = canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        const width = currentX - startX;
        const height = currentY - startY;

        const selectedTool = selectedToolGetter();

        clearCanvas(existingShapes, canvas, ctx);
        ctx.strokeStyle = "rgba(255,255,255)";
        ctx.lineWidth = 2;

        if (selectedTool === "rect") {
            ctx.strokeRect(startX, startY, width, height);
        } else if (selectedTool === "circle") {
            const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
            ctx.beginPath();
            ctx.arc(startX + width / 2, startY + height / 2, radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
        }
    };

    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mouseup", mouseUp);
    canvas.addEventListener("mousemove", mouseMove);

    // ✅ Cleanup listeners on destroy
    return () => {
        canvas.removeEventListener("mousedown", mouseDown);
        canvas.removeEventListener("mouseup", mouseUp);
        canvas.removeEventListener("mousemove", mouseMove);
    };
}

// ✅ Unified clearCanvas function with correct shape render
function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(255, 255, 255)";
    ctx.lineWidth = 2;

    existingShapes.forEach(shape => {
        if (shape.type === "rect") {
            const { x, y, width, height } = shape.data;
            ctx.strokeRect(x, y, width, height);
        } else if (shape.type === "circle") {
            const { centerX, centerY, radius } = shape.data;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
        }
    });
}

// ✅ Added local eraser logic
function eraseAtPoint(x: number, y: number, existingShapes: Shape[]): number[] {
    const eraseRadius = 20;
    const erasedIds: number[] = [];

    existingShapes.forEach(shape => {
        if (shape.type === "rect") {
            const { x: sx, y: sy, width, height } = shape.data;
            const closestX = Math.max(sx, Math.min(x, sx + width));
            const closestY = Math.max(sy, Math.min(y, sy + height));
            const distance = Math.hypot(x - closestX, y - closestY);
            if (distance <= eraseRadius) erasedIds.push(shape.id);
        } else if (shape.type === "circle") {
            const { centerX, centerY, radius } = shape.data;
            const distance = Math.hypot(x - centerX, y - centerY);
            if (distance <= radius + eraseRadius) erasedIds.push(shape.id);
        }
    });

    return erasedIds;
}
