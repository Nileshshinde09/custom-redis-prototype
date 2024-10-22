const Parser = require("redis-parser");
import { Socket } from "net";
import type { RedisReply } from "redis-parser";
import { lib } from "../utils/parse";
import { Ping } from "./methods";

enum Command {
  PING = "ping",
}

export const CommandExce = (connection: Socket, data: Buffer): void => {
  const parser = new Parser({
    returnReply(reply: RedisReply) {
      const result = lib.returnReply(reply);
      try {
        switch (result[0].toLowerCase()) {
          case Command.PING:
            Ping(connection, result[1] ? result[1] : "");
            break;
          default:
            connection.write("-ERR unknown command\r\n");
            break;
        }
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    },
    returnError(err: Error) {
      lib.returnError(err);
    },
    returnFatalError(err: Error) {
      lib.returnFatalError(err);
    },
  });
  parser.execute(data);
};
