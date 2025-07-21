import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from "./middleware";
import { CreateRoomSchema, CreateUserSchema, SignInSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors())

// Rate Limiter - 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

// Signup
app.post("/signup", async (req, res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) return res.status(400).json({ message: "Invalid input" });

    const { username, password, name } = parsedData.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prismaClient.user.create({
            data: {
                email: username,
                password: hashedPassword,
                name
            }
        });
        res.status(201).json({ userId: user.id });
    } catch {
        res.status(409).json({ message: "User already exists" });
    }
});

// Signin
app.post("/signin", async (req, res) => {
    const parsedData = SignInSchema.safeParse(req.body);
    if (!parsedData.success) return res.status(400).json({ message: "Invalid input" });

    const { username, password } = parsedData.data;

    const user = await prismaClient.user.findFirst({
        where: { email: username }
    });
    if (!user) return res.status(403).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(403).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
});

// Room Creation
app.post("/room", middleware, async (req, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) return res.status(400).json({ message: "Invalid room input" });

    const userId = (req as any).userId;
    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        });
        res.status(201).json({ roomId: room.id });
    } catch {
        res.status(409).json({ message: "Room already exists" });
    }
});
// Get list of rooms
app.get("/rooms", middleware, async (req, res) => {
    try {
        const rooms = await prismaClient.room.findMany({
            select: {
                id: true,
                slug: true
            }
        });
        res.json({ rooms });
    } catch {
        res.status(500).json({ message: "Failed to fetch rooms" });
    }
});
// Protected Chats Endpoint
app.get("/chats/:roomId", middleware, async (req, res) => {
    try {
        const roomId = Number(req.params.roomId);
        const userId = (req as any).userId;

        const isParticipant = await prismaClient.room.findFirst({
            where: { id: roomId, adminId: userId }
        });
        if (!isParticipant) return res.status(403).json({ message: "Unauthorized access to room" });

        const messages = await prismaClient.chat.findMany({
            where: { roomId },
            orderBy: { id: "desc" },
            take: 1000
        });
        res.json({ messages });
    }
    catch (e) {
        res.json({
            messages: []
        });
    }
});
// Get room by slug (public or protected, your choice)
// Without auth middleware (public):
app.get("/room/:slug", async (req, res) => {
    try {
        const slug = req.params.slug;

        const room = await prismaClient.room.findFirst({
            where: { slug },
        });

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        return res.json({ room });
    } catch (e) {
        console.error("Failed to fetch room by slug:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/rooms/:roomId/drawings", async (req, res) => {
    const roomId = Number(req.params.roomId);
    const drawings = await prismaClient.drawing.findMany({
        where: { roomId , deletedAt: null},
    });
    res.json(drawings);
});


app.listen(3001, () => console.log("HTTP server running on port 3001"));