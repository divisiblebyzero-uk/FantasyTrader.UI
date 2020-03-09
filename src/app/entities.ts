export class Account {
    id: number;
    name: string;
}

export class Order {
    id?: number;
    clientOrderId: string;
    symbol: string;
    account: Account;
    quantity: number;
    fillQuantity?: number;
    orderState?: string;
    orderType: string;
    side: string;
    price: number;
    percentComplete?: number;
    created?: Date;
    averageFillPrice?: number;
}

export class Price {
    symbol: string;
    lastPrice: number;
    timestamp: Date;
    direction: number;
}

export class PriceGrid {
    id: number;
    name: string;
}

export class PriceGridEntry {
    id: number;
    symbol: string;
}