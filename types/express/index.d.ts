
import "express";

declare module "express" {
  interface Request {
    userId?: number; // ✅ Optional is safer (initially undefined)
  }
}

export {}; // ✅ Ensures this file is treated as a module