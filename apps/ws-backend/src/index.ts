import { WebSocket, WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

// ✅ Token verification to extract userId from token
function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string" || !decoded || !('userId' in decoded)) return null;
    return (decoded as any).userId;
  } catch (e) {
    return null;
  }
}

// ✅ Connection established
wss.on('connection', (ws, request) => {
  const url = request.url;
  if (!url) return;

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || "";
  const userId = checkUser(token);

  if (!userId) {
    ws.close();
    return;
  }

  // ✅ Register user in memory
  const user: User = { ws, rooms: [], userId };
  users.push(user);

  // ✅ Cleanup on disconnect
  ws.on('close', () => {
    const index = users.findIndex(u => u.ws === ws);
    if (index !== -1) users.splice(index, 1);
  });

  // ✅ Listen for messages
  ws.on('message', async (data) => {
    let parsedData: any;
    try {
      parsedData = JSON.parse(typeof data === 'string' ? data : data.toString());
    } catch {
      console.error("Invalid JSON received");
      return;
    }

    const type = parsedData.type;
    const roomId = String(parsedData.roomId);

    if (type === 'join_room') {
      if (!user.rooms.includes(roomId)) user.rooms.push(roomId);
    }

    if (type === 'leave_room') {
      user.rooms = user.rooms.filter(r => r !== roomId);
    }

    // ✅ Chat Handling
    if (type === 'chat') {
      const message = parsedData.message;
      await prismaClient.chat.create({
        data: { roomId: Number(roomId), message, userId }
      });

      users.forEach(u => {
        if (u.rooms.includes(roomId)) {
          u.ws.send(JSON.stringify({ type: 'chat', roomId, message }));
        }
      });
    }

    // ✅ Draw Handling (Persistent & Broadcast)
    if (type === 'draw') {
      const { shapeData, shapeType } = parsedData;

      const savedShape = await prismaClient.drawing.create({
        data: {
          roomId: Number(roomId),
          userId,
          type: shapeType,
          data: shapeData,
        },
      });

      const shapeToSend = {
        id: savedShape.id,
        type: savedShape.type,
        ...(savedShape.data as Record<string, any>)
      };

      users.forEach(u => {
        if (u.rooms.includes(roomId)) {
          u.ws.send(JSON.stringify({
            type: 'draw',
            roomId,
            shape: shapeToSend,
          }));
        }
      });
    }

    // ✅ Erase Handling (Soft Delete & Broadcast)
    if (type === 'erase') {
      const { erasedShapeIds } = parsedData;

      await prismaClient.drawing.updateMany({
        where: {
          id: { in: erasedShapeIds.map(Number) },
          roomId: Number(roomId),
          deletedAt: null,
        },
        data: { deletedAt: new Date() },
      });

      users.forEach(u => {
        if (u.rooms.includes(roomId)) {
          u.ws.send(JSON.stringify({
            type: 'erase',
            roomId,
            erasedShapeIds,
          }));
        }
      });
    }
  });
});
