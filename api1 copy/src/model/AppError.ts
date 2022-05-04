export class AppError {
    message: string;
    status: 400;

    constructor(msg) {
        this.message = msg;
    }
}