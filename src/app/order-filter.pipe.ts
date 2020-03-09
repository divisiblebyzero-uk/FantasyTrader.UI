import { Pipe, PipeTransform } from '@angular/core';
import { Order } from './entities';

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {
  today = new Date();

  compareDate(inputDate: Date): boolean {
    
    const theDate = new Date(inputDate);
    return theDate.getDate() == this.today.getDate() && theDate.getMonth() == this.today.getMonth() && theDate.getFullYear() == this.today.getFullYear();
  }

  transform(items: any[], today: boolean): any {
    if (!items) {
        return items;
    }

    return items.filter(item => {
      const order: Order = item;
      return today?(this.compareDate(order.created)):(!this.compareDate(order.created));
    }
    );
  }

}
