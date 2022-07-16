import "reflect-metadata";
import { DataSource } from "typeorm";
import { Billing } from "./entity/Billing";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Billing],
  migrations: [],
  subscribers: [],
});
