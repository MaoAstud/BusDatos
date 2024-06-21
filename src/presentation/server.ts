import express, { Router } from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';

export class Server {
    private app = express();
    private routes: Router;
    private server: http.Server;
    port = 3750;

    constructor(routes: Router) {
        this.routes = routes;
        this.server = http.createServer(this.app);
    }

    async start() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(this.routes);

        // Iniciar servidor
        this.server.listen(this.port, () => {
        console.log(`Server is running at http://localhost:${this.port}`);
        });
    }
}