import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontal, PenTool, Eraser, Undo2, Redo2 } from "lucide-react";
import { Game } from "@/draw/Game";
import { Drawing } from "./RoomCanvas";

type CanvasProps = {
    roomId: string;
    socket: WebSocket;
    initialDrawings: Drawing[];
    onGameReady: (g: Game) => void;
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
        onGameReady(g);

        return () => g.destroy();
    }, [roomId, socket, initialDrawings, onGameReady]);

    useEffect(() => {
        const resize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                game?.clearCanvas();
            }
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [game]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement | null;
            if (target?.isContentEditable) return;
            if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;

            const isModKey = event.metaKey || event.ctrlKey;
            if (!isModKey) return;

            if (event.key === "z" || event.key === "Z") {
                event.preventDefault();
                if (event.shiftKey) {
                    game?.redo();
                } else {
                    game?.undo();
                }
                return;
            }

            if (event.key === "y" || event.key === "Y") {
                event.preventDefault();
                game?.redo();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [game]);

    return (
        <div className="relative h-[100dvh] min-h-screen overflow-hidden bg-gray-900">
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                className="h-full w-full cursor-crosshair touch-none"
            />
            <Topbar
                setSelectedTool={setSelectedTool}
                selectedTool={selectedTool}
                onUndo={() => game?.undo()}
                onRedo={() => game?.redo()}
            />
        </div>
    );
}

function Topbar({
    selectedTool,
    setSelectedTool,
    onUndo,
    onRedo,
}: {
    selectedTool: Tool;
    setSelectedTool: (s: Tool) => void;
    onUndo: () => void;
    onRedo: () => void;
}) {
    return (
        <div className="fixed top-3 left-3 right-3 flex flex-wrap justify-center gap-1 rounded-2xl border border-gray-700/50 bg-gray-800/90 p-2 shadow-xl backdrop-blur-md sm:top-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:gap-2 sm:p-3">
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
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
                <div className="h-px w-full bg-gray-600/60 my-1 sm:my-0 sm:h-auto sm:w-px sm:self-stretch sm:mx-1" />
                <IconButton
                    onClick={onUndo}
                    icon={<Undo2 size={20} />}
                    tooltip="Undo (Ctrl/Cmd+Z)"
                />
                <IconButton
                    onClick={onRedo}
                    icon={<Redo2 size={20} />}
                    tooltip="Redo (Ctrl/Cmd+Shift+Z)"
                />
            </div>
        </div>
    );
}
