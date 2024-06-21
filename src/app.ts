
import { AppRoutes } from "./presentation/router";
import { Server } from "./presentation/server";

(async() => {
    main();
})();

function main(){
    const server = new Server(AppRoutes.routes);

    server.start();
}