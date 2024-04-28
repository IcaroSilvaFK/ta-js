export default class NotFoundFileError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundFileError";
  }
}
