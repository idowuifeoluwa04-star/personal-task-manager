import { Request, Response, NextFunction } from "express";

// express only picks this up as an error handler because it has 4 params

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error(err); 
  res.status(500).json({ message: "Something went wrong" });
};

// so we can actually see what broke in the terminal
