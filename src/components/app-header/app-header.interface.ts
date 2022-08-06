export enum Tabs  {
  CONSTRUCTOR = 'CONSTRUCTOR',
  ORDERS = 'ORDERS',
  PROFILE = 'PROFILE'
}


export interface AppHeaderStateInterface{
  active: Tabs
}
