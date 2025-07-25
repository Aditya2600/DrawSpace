// import { useEffect, useRef, useState } from "react";
// import { IconButton } from "./IconButton";
// import { Circle, Pencil, RectangleHorizontal, PenTool, Eraser } from "lucide-react";
// import { Game } from "@/draw/Game";
// import { Drawing } from "./RoomCanvas";

// type CanvasProps = {
//     roomId: string;
//     socket: WebSocket;
//     initialDrawings: Drawing[];
//     onGameReady: (g: Game) => void;
// };


// export type Tool = "circle" | "rect" | "pencil" | "freehand" | "eraser";

// export function Canvas({ roomId, socket, initialDrawings, onGameReady }: CanvasProps) {
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const [game, setGame] = useState<Game>();
//     const [selectedTool, setSelectedTool] = useState<Tool>("freehand");

//     useEffect(() => {
//         game?.setTool(selectedTool);
//     }, [selectedTool, game]);

//     useEffect(() => {
//         if (canvasRef.current) {
//             const g = new Game(canvasRef.current, roomId, socket, initialDrawings);

//             setGame(g);
//             return () => {
//                 g.destroy();
//             }
//         }
//     }, [canvasRef, roomId, socket, initialDrawings]);

//     useEffect(() => {
//     const resize = () => {
//         if (canvasRef.current) {
//             canvasRef.current.width = window.innerWidth;
//             canvasRef.current.height = window.innerHeight;
//             game?.clearCanvas();
//         }
//     };
//     resize(); // ✅ call once on mount
//     window.addEventListener("resize", resize);
//     return () => window.removeEventListener("resize", resize);
// }, [game]);

//     return (
//         <div className="overflow-hidden h-screen bg-gray-900">
//             <canvas 
//                 ref={canvasRef} 
//                 width={window.innerWidth} 
//                 height={window.innerHeight}
//                 className="cursor-crosshair"
//             />
//             <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool}/>
//         </div>
//     );
// }

// function Topbar({selectedTool, setSelectedTool}: {
//     selectedTool: Tool,
//     setSelectedTool: (s: Tool) => void
// }) {
//     return (
//         <div className="fixed top-6 left-1/2 -translate-x-1/2 flex gap-2 bg-gray-800/90 backdrop-blur-md p-3 rounded-2xl border border-gray-700/50 shadow-xl">
//             <div className="flex gap-2">
//                 <IconButton 
//                     onClick={() => setSelectedTool("pencil")} 
//                     activated={selectedTool === "pencil"} 
//                     icon={<Pencil size={20} />}
//                     tooltip="Free-hand Draw"
//                 />
//                 <IconButton 
//                     onClick={() => setSelectedTool("freehand")} 
//                     activated={selectedTool === "freehand"} 
//                     icon={<PenTool size={20} />}
//                     tooltip="Free-hand Drawing"
//                 />
//                 <IconButton 
//                     onClick={() => setSelectedTool("rect")} 
//                     activated={selectedTool === "rect"} 
//                     icon={<RectangleHorizontal size={20} />}
//                     tooltip="Rectangle"
//                 />
//                 <IconButton 
//                     onClick={() => setSelectedTool("circle")} 
//                     activated={selectedTool === "circle"} 
//                     icon={<Circle size={20} />}
//                     tooltip="Circle"
//                 />
//                 <IconButton 
//                     onClick={() => setSelectedTool("eraser")} 
//                     activated={selectedTool === "eraser"} 
//                     icon={<Eraser size={20} />}
//                     tooltip="Eraser"
//                 />
//             </div>
//         </div>
//     );
// }

import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontal, PenTool, Eraser } from "lucide-react";
import { Game } from "@/draw/Game";
import { Drawing } from "./RoomCanvas";

type CanvasProps = {
    roomId: string;
    socket: WebSocket;
    initialDrawings: Drawing[];
    onGameReady: (g: Game) => void; // ✅ used in RoomCanvas.tsx, kept intact
};

export type Tool = "circle" | "rect" | "pencil" | "freehand" | "eraser";

export function Canvas({ roomId, socket, initialDrawings, onGameReady }: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("freehand");

    useEffect(() => {
        game?.setTool(selectedTool);
    }, [selectedTool, game]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const g = new Game(canvasRef.current, roomId, socket, initialDrawings);
        setGame(g);
        onGameReady(g); // callback is memoized now

        return () => g.destroy();
    }, [roomId, socket, initialDrawings, onGameReady]); // ✅ clean deps
    // ✅ Added onGameReady to dependency array

    useEffect(() => {
        const resize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                game?.clearCanvas();
            }
        };
        resize(); // ✅ call once on mount
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [game]);

    return (
        <div className="overflow-hidden h-screen bg-gray-900">
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                className="cursor-crosshair"
            />
            <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
        </div>
    );
}

function Topbar({
    selectedTool,
    setSelectedTool,
}: {
    selectedTool: Tool;
    setSelectedTool: (s: Tool) => void;
}) {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 flex gap-2 bg-gray-800/90 backdrop-blur-md p-3 rounded-2xl border border-gray-700/50 shadow-xl">
            <div className="flex gap-2">
                <IconButton
                    onClick={() => setSelectedTool("pencil")}
                    activated={selectedTool === "pencil"}
                    icon={<Pencil size={20} />}
                    tooltip="Line Sketch Tool"
                />
                <IconButton
                    onClick={() => setSelectedTool("freehand")}
                    activated={selectedTool === "freehand"}
                    icon={<PenTool size={20} />}
                    tooltip="Free-hand Draw"
                />
                <IconButton
                    onClick={() => setSelectedTool("rect")}
                    activated={selectedTool === "rect"}
                    icon={<RectangleHorizontal size={20} />}
                    tooltip="Rectangle"
                />
                <IconButton
                    onClick={() => setSelectedTool("circle")}
                    activated={selectedTool === "circle"}
                    icon={<Circle size={20} />}
                    tooltip="Circle"
                />
                <IconButton
                    onClick={() => setSelectedTool("eraser")}
                    activated={selectedTool === "eraser"}
                    icon={<Eraser size={20} />}
                    tooltip="Eraser"
                />
            </div>
        </div>
    );
}