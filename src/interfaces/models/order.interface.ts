export enum OrderStatus {
  DONE = 'done',
  IN_PROGRESS = 'in_progress'
}

export interface OrderInterface {
  ingredients: string[];
  _id: string;
  status: OrderStatus;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
