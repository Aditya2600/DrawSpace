// types/express/index.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: number; // ✅ Add custom field here
    }
  }
}

export {}; // 👈 VERY important to treat this as a module