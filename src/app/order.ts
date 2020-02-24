import { Account } from './account';

export interface Order {
    id?: number,
    clientOrderId: string,
    symbol: string,
    account: Account,
    quantity: number,
    fillQuantity?: number,
    orderState?: string,
    orderType: string,
    side: string,
    price: number,
    percentComplete?: number
}
