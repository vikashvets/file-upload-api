import WebSocket from 'ws';
export const wsClients = new Map();

export const configureWs = () => {
    const wss = new WebSocket.Server({ port: Number(process.env.WS_PORT), host: process.env.WS_HOST, });

    wss.on("connection", (ws: WebSocket, req) => {
        const connectionId = req.url?.slice(2);
        console.log(`New client ${connectionId} connected`);
        wsClients.set(connectionId, ws);

        ws.on("message", (data: string) => {
            console.log(`Client ${connectionId} has sent: ${data}`)
        });

        ws.on("close", () => {
            console.log(`The client ${connectionId} has disconnected`);
            wsClients.delete(connectionId);
        });

        ws.onerror = function () {
            console.log("Error occurred during connection to the client");
        }
    });
    console.log("The WebSocket server is running on port 8080");
}
