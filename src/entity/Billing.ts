import dayjs from "dayjs";
import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  TableIndex,
} from "typeorm";

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  billing_id: number;

  @Column()
  user_id: number;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  create_time: Date;

  public constructor(
    user_id: number,
    category: string,
    price: number
  ) {
    this.category = category;
    this.user_id = user_id;
    this.price = price;
    this.create_time = dayjs().toDate();
  }
}
