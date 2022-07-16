import { AppDataSource } from "./data-source";
import { Billing } from "./entity/Billing";
import express, { Request } from "express";
import cors from "cors";
import { BlogDetail } from "./entity/BlogDetail";
import { json } from "body-parser";
import { resData } from "./template/resTemp";
import config from "./config.json";
import morgan from "morgan";
import { Between } from "typeorm";
import dayjs, { Dayjs } from "dayjs";
import { start } from "repl";
import { createServer } from "http";
const app = express();
app.use(cors());
app.use(json());
app.use(morgan("common"));

async function init() {
  await AppDataSource.initialize();
}

app.get(
  "/billing/list",
  async (
    req: Request<
      any,
      any,
      {
        userId: number;
        monthStart: number;
        monthEnd: number;
        dateStart: number;
        dateEnd: number;
      }
    >,
    res
  ) => {
    const { userId, monthStart, dateEnd, dateStart, monthEnd } = req.body;
    const startDay = dayjs().month(monthStart-1).date(dateStart).startOf("date");
    const endDay = dayjs().month(monthEnd-1).date(dateEnd).endOf("date");
    const billings = await AppDataSource.manager.find(Billing, {
      where: {
        user_id: userId,
        create_time: Between(startDay.toDate(), endDay.toDate()),
      },
    });
    res.send(resData(200000, billings));
  }
);
app.post<{}, any, { userId: number; category: string; price: number }>(
  "/billing/add",
  async (req, res) => {
    const { userId, category, price } = req.body;
    const billing = new Billing(userId, category, price);
    await AppDataSource.manager.insert(Billing, billing);
    res.send(resData(200000, billing.billing_id));
  }
);
init().then(() => {
  app.listen(3000);
});
