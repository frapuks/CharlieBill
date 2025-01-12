//~import modules
import { Request, Response } from "express";
import * as fs from "fs";

//~ resolve __dirname
import { resolve, join } from "path";
const __dirname = resolve(`./src/app/services`);
// resolve will define your root file

//~ Logger
import debug from "debug";
const logger = debug("ErrorHandling");
/**
 * Manage error
 */
function errorLogger(message: string, req: Request, res: Response) {
  const actualDate = new Date();
  const day = actualDate.toLocaleString("en-EN", { day: "numeric" });
  const month = actualDate.toLocaleString("en-EN", { month: "numeric" });
  const year = actualDate.toLocaleString("en-EN", { year: "numeric" });
  const formattedDate = [year, month, day].join("-");

  // format error message : Date + url + message
  const logMessage = `${actualDate.toLocaleString()} - ${
    req.url
  } - ${message}\r`;

  // date format YYYY-MONTH-DD
  const fileName = `${formattedDate}.log`;

  // create a log and write it in your file
  fs.appendFile(
    join(__dirname, `../../../logs/${fileName}`),
    logMessage,
    (error) => {
      if (error) logger(error);
    }
  );
}

export { errorLogger };
