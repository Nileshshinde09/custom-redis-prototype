import * as net from "net";
import { CommandExce } from "./command";

const server: net.Server = net.createServer((connection: net.Socket) => {
  connection.on("data", (data: any) => {
    CommandExce(connection,data)
  });
});

server.listen(6000, "127.0.0.1");
