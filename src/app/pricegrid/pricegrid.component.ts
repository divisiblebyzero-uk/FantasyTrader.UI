import { Component, OnInit } from '@angular/core';
import { PriceGrid, PriceGridEntry } from '../pricegrid';
import { PricegridService } from '../pricegrid.service';

@Component({
  selector: 'app-pricegrid',
  templateUrl: './pricegrid.component.html',
  styleUrls: ['./pricegrid.component.css']
})
export class PricegridComponent implements OnInit {

  constructor(private priceGridService: PricegridService) { }

  ngOnInit() {
    this.getPriceGrids();
  }

  getPriceGrids(): void {
    this.priceGridService.getPriceGrids().subscribe(priceGrids => this.priceGrids = priceGrids);
  }

  changeTab(newIndex) {
    this.selectedPriceGrid = newIndex;
    this.priceGridService.getPriceGridEntries(this.priceGrids[this.selectedPriceGrid]).subscribe(priceGridEntries => this.priceGridEntries = priceGridEntries);
  }

  selectedPriceGrid: number;

  priceGrids: PriceGrid[];
  priceGridEntries: PriceGridEntry[];
}
