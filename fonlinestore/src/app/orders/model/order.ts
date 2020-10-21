import {Orderline} from './orderline';

export class Order {
  id: number;
  username: string;
  totalCost: number;
  deliveryAddress: string;
  userAddress: string;
  orderDate: string;
  status: string;
  orderLines: Orderline[];
}
