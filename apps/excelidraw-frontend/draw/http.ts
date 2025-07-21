import { HTTP_BACKEND } from "@/config";
import axios from "axios";

// ✅ Replaced chats endpoint with proper drawings endpoint
export async function getExistingShapes(roomId: string) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Please login to get shapes!");

    // ✅ Using drawings API instead of chats
    const res = await axios.get(`${HTTP_BACKEND}/rooms/${roomId}/drawings`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    // ✅ Directly get shape data, no need to parse JSON messages
    const shapes = res.data; // Array of { id, type, data, deletedAt }

    // ✅ Only include non-deleted shapes
    return shapes.filter((shape: any) => !shape.deletedAt);
}
