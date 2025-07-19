import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403).json({ message: "Token not provided" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
        return res.status(403).json({ message: "Token malformed" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        // @ts-ignore: TODO: Fix this
        req.userId = decoded.userId;
        next();
    } catch (e) {
        return res.status(403).json({ message: "Invalid Token" });
    }
}

// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "@repo/backend-common/config";

// export function middleware(req: Request, res: Response, next: NextFunction) {
//     const token = req.headers["authorization"] ?? "";

//     const decoded = jwt.verify(token, JWT_SECRET);

//     if (decoded) {
        
//         req.userId = decoded.userId;
//         next();
//     } else {
//         res.status(403).json({
//             message: "Unauthorized"
//         })
//     }
// }