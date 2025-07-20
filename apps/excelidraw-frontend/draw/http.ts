// import { HTTP_BACKEND } from "@/config";
// import axios from "axios";



// export async function getExistingShapes(roomId: string) {
//     const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
//     const messages = res.data.messages;

//     const shapes = messages.map((x: {message: string}) => {
//         const messageData = JSON.parse(x.message)
//         return messageData.shape;
//     })

//     return shapes;
// }

import { HTTP_BACKEND } from "@/config";
import axios from "axios";
export async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`, {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDRlNjYzMy0xZDY0LTQ3MDUtYjFiYS01MGUzOTgzM2Y0MTQiLCJpYXQiOjE3NTI4NTUwNTcsImV4cCI6MTc1MzQ1OTg1N30.FbQCXkmFbc2vzlsurJ7iM3OURlLugwJp0JqBX4D6jJc",
        },
    });

    const messages = res.data.messages;
    const shapes = messages.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message);
        return messageData.shape;
    });

    return shapes;
}