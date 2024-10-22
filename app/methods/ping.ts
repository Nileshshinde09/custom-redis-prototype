import { Socket } from "net";
export const Ping = (connection: Socket, message: string): void => {
  connection.write(`+${message?message:"PONG"}\r\n`);
};
