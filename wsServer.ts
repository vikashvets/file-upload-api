import WebSocket from 'ws';
export let wsInstance: WebSocket;
export const configureWs = () => {
    const wss = new WebSocket.Server({ port: Number(process.env.WS_PORT), host: process.env.WS_HOST});

    wss.on("connection", (ws: WebSocket) => {
        console.log("New client connected");
        wsInstance = ws;

        ws.on("message", (data: string) => {
            console.log(`Client has sent: ${data}`)
        });

        ws.on("close", () => {
            console.log("The client has disconnected");
        });

        ws.onerror = function () {
            console.log("Error occurred during connection to the client");
        }
    });
    console.log("The WebSocket server is running on port 8080");
}
