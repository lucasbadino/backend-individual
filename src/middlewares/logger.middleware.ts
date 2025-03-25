import { NextFunction, Request, Response } from "express";

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
    let fecha = new Date();
    (`${fecha.toLocaleString()}, Metodo: ${req.method}, Url: ${req.url}`);
    next();

}
