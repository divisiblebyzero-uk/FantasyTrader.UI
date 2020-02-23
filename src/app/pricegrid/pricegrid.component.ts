import { Component, OnInit } from '@angular/core';
import { PriceGrid, PriceGridEntry } from '../pricegrid';
import { PricegridService } from '../pricegrid.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-pricegrid',
  templateUrl: './pricegrid.component.html',
  styleUrls: ['./pricegrid.component.css']
})
export class PricegridComponent implements OnInit {

  activePriceGrid;
  constructor(private priceGridService: PricegridService, private messageService: MessageService) { }

  ngOnInit() {
    this.getPriceGrids();
  }

  getPriceGrids(): void {
    this.priceGridService.getPriceGrids().subscribe(priceGrids => this.priceGrids = priceGrids);
  }

  tabChanged(newIndex) {
    this.priceGridService.getPriceGridEntries(this.activePriceGrid).subscribe(priceGridEntries => {this.messageService.add("Received: " + JSON.stringify(priceGridEntries));this.priceGridEntries = priceGridEntries;});
  }

  selectedPriceGrid: number;

  priceGrids: PriceGrid[];
  priceGridEntries: PriceGridEntry[];
}
