"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {

    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDRlNjYzMy0xZDY0LTQ3MDUtYjFiYS01MGUzOTgzM2Y0MTQiLCJpYXQiOjE3NTI4NTUwNTcsImV4cCI6MTc1MzQ1OTg1N30.FbQCXkmFbc2vzlsurJ7iM3OURlLugwJp0JqBX4D6jJc`)

        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId: roomId
            }))
        }
    }, [])

    if (!socket) {
        return <div>
            Connecting to server....
        </div>
    }
    return <div>
        <Canvas roomId={roomId} socket={socket} />
    </div>
}
