import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  active: boolean;
  items: Array<Item> = [];
  defaultItems: Array<Item> = [];
  showed: boolean;
  check: boolean;
  valueFrom: number;
  valueTo: number;

  constructor(private itemsService: ItemsService) {
    this.itemsService.getItems().subscribe((items: Array<Item>) => {
      this.items = items;
    });
    this.defaultItems = [...this.items];
  }
  showFilters() {
    this.active = !this.active;
  }
  filters(e) {
    this.showed = false;
    if (e.target.type === 'radio') {
      switch (e.target.value) {
        case 'below100': this.items = this.defaultItems.filter(item => item.price < 100);
          break;
        case '100-300': this.items = this.defaultItems.filter(item => item.price >= 100 && item.price <= 300);
          break;
        case '300-600': this.items = this.defaultItems.filter(item => item.price >= 300 && item.price <= 600);
          break;
        case '600-1000': this.items = this.defaultItems.filter(item => item.price >= 600 && item.price <= 1000);
          break;
        case 'over1000': this.items = this.defaultItems.filter(item => item.price > 1000);
          break;
        case 'buyNow': this.items = this.defaultItems.filter(item => item.purchaseMethod === 'Buy now');
          break;
        case 'auction': this.items = this.defaultItems.filter(item => item.purchaseMethod === 'Auction');
          break;
      }
    } else {
      if (this.valueFrom >= 0 && this.valueTo >= 0) {
        this.items = this.defaultItems.filter(item => item.price >= this.valueFrom && item.price <= this.valueTo);
      }
    }
  }
  showFilteredArray() {
    if (!this.showed) {
      this.itemsService.actualizeItems(this.items);
      this.items = [...this.defaultItems];
      this.showed = true;
      this.check = false;
      this.valueFrom = undefined;
      this.valueTo = undefined;
      setTimeout(() => {
        // check value must be changed to update template
        this.check = undefined;
      }, 100);
    }
  }
  reset() {
    this.itemsService.actualizeItems(this.defaultItems);
    this.check = false;
    this.valueFrom = undefined;
    this.valueTo = undefined;
  }
  ngOnInit() {
  }

}


