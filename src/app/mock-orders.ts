import { Order } from './entities';

export const ORDERS: Order[] = [
    {
      id: 1,
      clientOrderId: "MY ORDER1",
      symbol: "ABC",
      account: {
        id: 1,
        name: "My Account"
      },
      quantity: 100,
      fillQuantity: 0,
      orderState: "New",
      orderType: "FillOrKill",
      side: "Buy",
      price: 100,
      percentComplete: 20
    },
    {
      id: 2,
      clientOrderId: "MY ORDER2",
      symbol: "ABC",
      account: {
        id: 1,
        name: "My Account"
      },
      quantity: 100,
      fillQuantity: 0,
      orderState: "New",
      orderType: "FillOrKill",
      side: "Sell",
      price: 105,
      percentComplete: 80
    }

  ];