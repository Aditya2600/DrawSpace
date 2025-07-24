"use client";

import { WS_URL, HTTP_BACKEND } from "@/config";
import { useCallback, useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import { Game } from "@/draw/Game";

export type Drawing = {
    id: number;
    type: "rect" | "circle" | "pencil" | "freehand";
    data: any;
};

export function RoomCanvas({ roomId }: { roomId: string }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [game, setGame] = useState<Game | null>(null);
    const [initialDrawings, setInitialDrawings] = useState<Drawing[]>([]);

    const handleGameReady = useCallback((g: Game) => {
        setGame(g);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("No token found. Please login first.");
            return;
        }

        const ws = new WebSocket(`${WS_URL}?token=${token}`);

        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }));
        };

        ws.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        return () => ws.close();
    }, [roomId]);

    useEffect(() => {
        if (!socket) return;

        async function loadDrawings() {
            try {
                const res = await fetch(`${HTTP_BACKEND}/rooms/${roomId}/drawings`);
                const drawings = await res.json();
                setInitialDrawings(drawings);
            } catch (err) {
                console.error("Failed to load drawings:", err);
            }
        }
        loadDrawings();
    }, [socket, roomId]);

    if (!socket) return <div>Connecting to server...</div>;
    

    return (
        <Canvas
            roomId={roomId}
            socket={socket}
            initialDrawings={initialDrawings}
            onGameReady={handleGameReady}
        />
    );
}
