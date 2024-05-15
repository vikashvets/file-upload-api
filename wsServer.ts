import WebSocket from 'ws';

export const configureWs = () => {
    const wss = new WebSocket.Server({ port: Number(process.env.WS_PORT)});

    wss.on("connection", (ws: WebSocket) => {
        console.log(ws, wss);
        console.log("New client connected");

        ws.send('Welcome, you are connected!');

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
