import * as dotenv from "dotenv";
dotenv.config();

export const PORT: number = parseInt("8181", 10);
export const WS_PORT: number = parseInt(process.env.WS_PORT || "3000", 10);
