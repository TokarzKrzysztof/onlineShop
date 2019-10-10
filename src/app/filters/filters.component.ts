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
  check: boolean = true;
  priceValueFrom: number;
  priceValueTo: number;
  priceFilterValue: string;
  purchaseMethodFilterValue: string;

  constructor(private itemsService: ItemsService) {
    this.itemsService.getItems().subscribe((items: Array<Item>) => {
      this.items = items;
    });
    this.defaultItems = [...this.items];
  }
  showFilters() {
    this.active = !this.active;
  }
  setPrice(e) {
    this.priceFilterValue = e.target.value;
  }
  setPurchaseMethod(e) {
    this.purchaseMethodFilterValue = e.target.value;
  }
  filter(price, purchaseMethod, valueFrom, valueTo) {
    this.showed = false;
    if (valueFrom > valueTo || valueFrom < 0 || valueTo < 0) {
      window.alert('Please enter correct value!');
      return;
    }
    if (valueFrom >= 0 && valueTo >= 0) {
      this.items = this.items.filter(item => item.price >= valueFrom && item.price <= valueTo);
    }
    else if (price !== undefined) {
      switch (price) {
        case 'below100': this.items = this.items.filter(item => item.price < 100);
          break;
        case '100-300': this.items = this.items.filter(item => item.price >= 100 && item.price <= 300);
          break;
        case '300-600': this.items = this.items.filter(item => item.price >= 300 && item.price <= 600);
          break;
        case '600-1000': this.items = this.items.filter(item => item.price >= 600 && item.price <= 1000);
          break;
        case 'over1000': this.items = this.items.filter(item => item.price > 1000);
          break;
      }
    }
    if (purchaseMethod !== undefined) {
      switch (purchaseMethod) {
        case 'buyNow': this.items = this.items.filter(item => item.purchaseMethod === 'Buy now');
          break;
        case 'auction': this.items = this.items.filter(item => item.purchaseMethod === 'Auction');
          break;
      }
    }
  }
  showFilteredArray() {
    if (this.priceFilterValue || this.purchaseMethodFilterValue || this.priceValueFrom || this.priceValueTo) {
      this.filter(this.priceFilterValue, this.purchaseMethodFilterValue, this.priceValueFrom, this.priceValueTo);
      this.reset(this.items);
      this.items = [...this.defaultItems];
    }

  }
  reset(arr = this.defaultItems) {
    this.itemsService.setItems(arr);
    this.priceValueFrom = undefined;
    this.priceValueTo = undefined;
    this.priceFilterValue = undefined;
    this.purchaseMethodFilterValue = undefined;
    this.active = !this.active;
  }
  ngOnInit() {
  }

}


