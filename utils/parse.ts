const Parser = require("redis-parser"); 
import type { RedisReply } from "redis-parser";
import { Stream } from "stream";

class Library {
  stream: Stream;
  lastReply: string[] = []; 
  constructor(stream: Stream) {
    this.stream = stream;
    
  }

  returnReply(reply: RedisReply): string[] {
    const result = Array.isArray(reply) ? reply.map(String) : [String(reply)];
    this.lastReply = result; 
    return result; 
  }

  returnError(err: Error): void {
    console.error("Error:", err);
  }

  returnFatalError(err: Error): void {
    console.error("Fatal Error:", err);
  }

  streamHandler(): void {
    this.stream.on("data", (buffer: Buffer) => {
      parser.execute(buffer); 
    });
  }
}


export const lib = new Library(new Stream());

const parser = new Parser({
  returnReply(reply: RedisReply) {
    lib.returnReply(reply);
  },
  returnError(err: Error) {
    lib.returnError(err);
  },
  returnFatalError(err: Error) {
    lib.returnFatalError(err);
  }
});

export {
  parser
};
