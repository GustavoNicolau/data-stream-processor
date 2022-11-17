import { Transform } from "node:stream";

export default class ThrottleRequest extends Transform {
  #requestsPerSeconds = 0;
  #internalCounter = 0;
  constructor({ objectMode, requestsPerSeconds }) {
    super({
      objectMode,
    });

    this.#requestsPerSeconds = requestsPerSeconds;
  }
  _transform(chunk, enc, callback) {
    this.#internalCounter++;
    if (!(this.#internalCounter >= this.#requestsPerSeconds)) {
      return callback(null, chunk);
    }
    setTimeout(() => {
      this.#internalCounter = 0;

      return callback(null, chunk);
    }, 1000);
  }
}
