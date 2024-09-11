import express from "express"
import { WebSocketServer } from "ws"

const app = express()
const PORT = 6900

const server = app.listen(PORT , ()=>{
    console.log(`The server is listening on ${PORT}`)
})

const wss = new WebSocketServer({ server: server })

wss.on('connection' ,(ws) =>{
    console.log("New client connected")

//     ws.on('message' ,(message)=>{
//         console.log(`Received ${message}`)
//     })

//     ws.on('message', (data: any) => {

//   const message = data.toString()
//   console.log(`Received: ${message}`)

//         wss.clients.forEach((client) => {
//         if (client !== ws && client.readyState === ws.OPEN) {
//             client.send(message)
//         }
//          })
//     })

ws.on('message', (data: any) => {
    const message = data.toString();
    console.log(`Received: ${message}`);

    // Broadcast message to all clients except the sender
    wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === client.OPEN) {
            client.send(message);
        }
    });
});
})

wss.off('close' ,()=>{
    console.log('Client dissconnected')
})