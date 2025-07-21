import type { Tool } from "@/components/Canvas";
import { Drawing } from "@/components/RoomCanvas";
import { HTTP_BACKEND } from "@/config";

type Shape =
    | {
        type: "rect";
        x: number;
        y: number;
        width: number;
        height: number;
    }
    | {
        type: "circle";
        centerX: number;
        centerY: number;
        radius: number;
    }
    | {
        type: "pencil";
        startX: number;
        startY: number;
        endX: number;
        endY: number;
    }
    | {
        type: "freehand";
        points: { x: number; y: number }[];
    };

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private socket: WebSocket;
    private selectedTool: Tool = "freehand";
    private currentFreehandPath: { x: number; y: number }[] = [];

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket, initialDrawings: Drawing[]) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.selectedTool = "freehand";

    this.existingShapes = initialDrawings.map(d => {
        return { id: d.id, ...d.data, type: d.type } as Shape & { id: number };
    });

    this.clearCanvas();
    this.initHandlers();
    this.initMouseHandlers();
}

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    }

    setTool(tool: Tool) {
        this.selectedTool = tool;
    }

    async init() {
    this.clearCanvas(); // Just redraw from passed-in drawings
}


    initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "draw") {
                this.existingShapes.push(message.shape);
                this.clearCanvas();
            }

            if (message.type === "erase") {
                const erasedShapeIds: number[] = message.erasedShapeIds;
                this.existingShapes = this.existingShapes.filter(
                    (shape: any) => !erasedShapeIds.includes(shape.id)
                );
                this.clearCanvas();
            }

        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0, 0, 0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.existingShapes.map((shape) => {
            if (shape.type === "rect") {
                this.ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                this.ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (shape.type === "pencil") {
                this.ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(shape.startX, shape.startY);
                this.ctx.lineTo(shape.endX, shape.endY);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (shape.type === "freehand") {
                this.drawFreehandPath(shape.points);
            }
        });
    }

    private drawFreehandPath(points: { x: number; y: number }[], isPreview = false) {
        if (points.length < 2) return;

        this.ctx.strokeStyle = isPreview ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.8)";
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";

        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);

        // Use quadratic curves for smoother lines
        for (let i = 1; i < points.length - 1; i++) {
            const midX = (points[i].x + points[i + 1].x) / 2;
            const midY = (points[i].y + points[i + 1].y) / 2;
            this.ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
        }

        // Draw the last point
        if (points.length > 1) {
            const lastPoint = points[points.length - 1];
            this.ctx.lineTo(lastPoint.x, lastPoint.y);
        }

        this.ctx.stroke();
        this.ctx.closePath();
    }

    private eraseAtPoint(x: number, y: number) {
        const eraseRadius = 20;
        const erasedShapeIds: number[] = [];

        this.existingShapes = this.existingShapes.filter((shape: any) => {
            let shouldKeep = true;

            if (shape.type === "rect") {
                const rectLeft = shape.x;
                const rectRight = shape.x + shape.width;
                const rectTop = shape.y;
                const rectBottom = shape.y + shape.height;

                const closestX = Math.max(rectLeft, Math.min(x, rectRight));
                const closestY = Math.max(rectTop, Math.min(y, rectBottom));
                const distance = Math.hypot(x - closestX, y - closestY);
                if (distance <= eraseRadius) shouldKeep = false;
            } else if (shape.type === "circle") {
                const distance = Math.hypot(x - shape.centerX, y - shape.centerY);
                if (distance <= eraseRadius + shape.radius) shouldKeep = false;
            } else if (shape.type === "pencil") {
                const distance = this.distanceToLineSegment(x, y, shape.startX, shape.startY, shape.endX, shape.endY);
                if (distance <= eraseRadius) shouldKeep = false;
            } else if (shape.type === "freehand") {
                for (let i = 0; i < shape.points.length - 1; i++) {
                    const p1 = shape.points[i];
                    const p2 = shape.points[i + 1];
                    const distance = this.distanceToLineSegment(x, y, p1.x, p1.y, p2.x, p2.y);
                    if (distance <= eraseRadius) {
                        shouldKeep = false;
                        break;
                    }
                }
            }

            // ✅ Collect erased IDs before removing from local state
            if (!shouldKeep && shape.id !== undefined) {
                erasedShapeIds.push(shape.id);
            }

            return shouldKeep;
        });

        // ✅ Send erased IDs to server if any found
        if (erasedShapeIds.length > 0) {
            this.socket.send(JSON.stringify({
                type: "erase",
                roomId: this.roomId,
                erasedShapeIds,
            }));
        }

        this.clearCanvas();
    }


    private distanceToLineSegment(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
        const A = px - x1;
        const B = py - y1;
        const C = x2 - x1;
        const D = y2 - y1;

        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        let param = -1;
        if (lenSq !== 0) {
            param = dot / lenSq;
        }

        let xx, yy;
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }

        const dx = px - xx;
        const dy = py - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }

    mouseDownHandler = (e: MouseEvent) => {
        this.clicked = true;
        const rect = this.canvas.getBoundingClientRect();
        this.startX = e.clientX - rect.left;
        this.startY = e.clientY - rect.top;

        if (this.selectedTool === "freehand") {
            this.currentFreehandPath = [{ x: this.startX, y: this.startY }];
        } else if (this.selectedTool === "eraser") {
            this.eraseAtPoint(this.startX, this.startY);
            this.clearCanvas();
        }
    }

    mouseUpHandler = (e: MouseEvent) => {
        this.clicked = false;
        const rect = this.canvas.getBoundingClientRect();
        const endX = e.clientX - rect.left;
        const endY = e.clientY - rect.top;

        const selectedTool = this.selectedTool;
        let shape: Shape | null = null;

        if (selectedTool === "rect") {
            const width = endX - this.startX;
            const height = endY - this.startY;
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                width,
                height,
            };
        } else if (selectedTool === "circle") {
            const width = endX - this.startX;
            const height = endY - this.startY;
            const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
            const centerX = this.startX + width / 2;
            const centerY = this.startY + height / 2;
            shape = {
                type: "circle",
                centerX,
                centerY,
                radius,
            };
        } else if (selectedTool === "pencil") {
            shape = {
                type: "pencil",
                startX: this.startX,
                startY: this.startY,
                endX,
                endY,
            };
        } else if (selectedTool === "freehand") {
            // Add final point if not already there
            const lastPoint = this.currentFreehandPath[this.currentFreehandPath.length - 1];
            if (!lastPoint || lastPoint.x !== endX || lastPoint.y !== endY) {
                this.currentFreehandPath.push({ x: endX, y: endY });
            }

            // Only create shape if we have enough points for a meaningful path
            if (this.currentFreehandPath.length > 1) {
                shape = {
                    type: "freehand",
                    points: [...this.currentFreehandPath],
                };
            }
            this.currentFreehandPath = [];
        }

        if (shape) {
            this.socket.send(JSON.stringify({
                type: "draw",
                roomId: this.roomId,
                shapeType: shape.type,
                shapeData: shape,
            }));
            this.clearCanvas();
        }
    }

    mouseMoveHandler = (e: MouseEvent) => {
        if (!this.clicked) return;

        const rect = this.canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        const selectedTool = this.selectedTool;

        if (selectedTool === "freehand") {
            // Add point to current path (with some distance threshold to avoid too many points)
            const lastPoint = this.currentFreehandPath[this.currentFreehandPath.length - 1];
            const distance = Math.sqrt(
                Math.pow(currentX - lastPoint.x, 2) + Math.pow(currentY - lastPoint.y, 2)
            );

            if (distance > 2) { // Only add point if moved enough distance
                this.currentFreehandPath.push({ x: currentX, y: currentY });
            }

            // Redraw canvas with current path
            this.clearCanvas();
            if (this.currentFreehandPath.length > 1) {
                this.drawFreehandPath(this.currentFreehandPath, true);
            }
        } else if (selectedTool === "eraser") {
            this.eraseAtPoint(currentX, currentY);
            this.clearCanvas();
        } else {
            // For rect, circle, and pencil tools, show preview
            const width = currentX - this.startX;
            const height = currentY - this.startY;

            this.clearCanvas();

            this.ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
            this.ctx.lineWidth = 2;

            if (selectedTool === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);
            } else if (selectedTool === "circle") {
                const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
                const centerX = this.startX + width / 2;
                const centerY = this.startY + height / 2;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (selectedTool === "pencil") {
                this.ctx.beginPath();
                this.ctx.moveTo(this.startX, this.startY);
                this.ctx.lineTo(currentX, currentY);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }
    }

    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpHandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    }
}