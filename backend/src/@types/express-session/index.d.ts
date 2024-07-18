import "express-session";

declare module "express-session" {
  interface SessionData {
    userId: number;
    token: string;
    startTime: string;
    lifetime: number;
    endTime: string;
  }
}
