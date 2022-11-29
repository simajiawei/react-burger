export enum OrderStatus {
  DONE = 'done',
  IN_PROGRESS = 'pending',
  CREATED = 'created'
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
