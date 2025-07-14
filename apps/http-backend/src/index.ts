import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from './middleware';
import { CreateRoomSchema, CreateUserSchema, SignInSchema } from "@repo/common/types"; 
import { prismaClient } from '@repo/db/client';

const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        });
        return;
    }

    try {
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.username,  // 👈 assuming username == email
                password: parsedData.data.password,  // TODO: Hash this later
                name: parsedData.data.name
            }
        });

        res.json({ userId: user.id });
    } catch (e) {
        res.status(400).json({
            message: "User already exists or error creating user"
        });
    }
});
app.post("/signin", async (req, res) => {
    const data = SignInSchema.safeParse(req.body);
    if (!data.success) {
        res.json({ message: "Incorrect inputs" });
        return;
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: data.data.username,
            password: data.data.password  // TODO: Compare hashed pw
        }
    });

    if (!user) {
        res.status(403).json({ message: "Invalid credentials" });
        return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token });
});
app.post("/room", middleware, async (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if (!data.success) {
        res.json({ message: "Incorrect inputs" });
        return;
    }

    // 👇 Get userId from custom middleware-added field
    const userId = (req as any).userId;

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: data.data.name,
                adminId: userId
            }
        });

        res.json({ roomId: room.id });
    } catch (e) {
        res.status(400).json({ message: "Room already exists or error creating" });
    }
});
app.listen(3000);