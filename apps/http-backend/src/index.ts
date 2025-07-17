// import express from "express";
// import jwt from "jsonwebtoken";
// import { JWT_SECRET } from '@repo/backend-common/config';
// import { middleware } from "./middleware";
// import { CreateRoomSchema, CreateUserSchema, SignInSchema } from "@repo/common/types"; 
// import { prismaClient } from "@repo/db/client";



// const app = express();
// app.use(express.json());

// app.post("/signup", async (req, res) => {
//     const parsedData = CreateUserSchema.safeParse(req.body);

//     if (!parsedData.success) {
//         console.log(parsedData.error);
//         res.json({
//             message: "Incorrect inputs"
//         });
//         return;
//     }

//     try {
//         const user = await prismaClient.user.create({
//             data: {
//                 email: parsedData.data?.username,  // 👈 assuming username == email
//                 password: parsedData.data.password,  // TODO: Hash this later
//                 name: parsedData.data.name
//             }
//         });

//         res.json({
//             userId: user.id 
//         });
//     } catch (e) {
//         res.status(411).json({
//             message: "User already exists with this username"
//         });
//     }
// });
// app.post("/signin", async (req, res) => {
//     const parsedData = SignInSchema.safeParse(req.body);
//     if (!parsedData.success) {
//         res.json({ message: "Incorrect inputs" });
//         return;
//     }

//     const user = await prismaClient.user.findFirst({
//         where: {
//             email: parsedData.data.username,
//             password: parsedData.data.password   TODO: Compare hashed pw
//         }
//     });

//     if (!user) {
//         res.status(403).json({ message: "Invalid credentials" });
//         return;
//     }

//     const token = jwt.sign({ userId: user?.id }, JWT_SECRET);
//     res.json({ token });
// });
// app.post("/room", middleware, async (req, res) => {
//     const parsedData = CreateRoomSchema.safeParse(req.body);
//     if (!parsedData.success) {
//         res.json({ message: "Incorrect inputs" });
//         return;
//     }

//    //👇 Get userId from custom middleware-added field
//     const userId = (req as any).userId;

//     try {
//         const room = await prismaClient.room.create({
//             data: {
//                 slug: parsedData.data.name,
//                 adminId: userId
//             }
//         });

//         res.json({ roomId: room.id });
//     } catch (e) {
//         res.status(400).json({
//             message: "Room already exists or error creating"
//         });
//     }
// });
// app.get("/chats/:roomId", async (req, res) => {
//     const roomId = Number(req.params.roomId);
//     const message = await prismaClient.chat.findMany({
//         where: {
//             roomId: roomId
//         },
//         orderBy: {
//             id: "desc"
//         },
//         take: 50
//     });
//     res.json({
//         messages
//     })
// })
// app.get("/room/:slug", async (req, res) => {
//     const slug = req.params.slug;
//     const room = await prismaClient.room.findFirst({
//         where: {
//             slug
//         },       
//     });
//     res.json({
//         room
//     })
// })
// app.listen(3001);

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from "./middleware";
import { CreateRoomSchema, CreateUserSchema, SignInSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());

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
            take: 50
        });
        res.json({ messages });
    }
    catch(e){
        res.json({ messages: []
        });
    }
});

app.listen(3001, () => console.log("HTTP server running on port 3001"));