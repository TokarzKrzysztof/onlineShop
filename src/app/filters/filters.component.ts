import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  items: Array<Item> = [];

  constructor(private itemsService: ItemsService) {
    this.itemsService.getItems().subscribe((items: Array<Item>) => {
      this.items = items;
    });
  }

  priceFilter(e) {
    console.log(e.target.value);
    switch (e.target.value) {
      case 'below100': this.items = this.items.filter(item => item.price < 100);
        console.log(this.items.filter(item => item.price < 100))
        break;
      case '100-300':
        break;
      case '300-600':
        break;
      case '600-1000':
        break;
      case 'over1000':
        break;
    }
  }
  purchaseMethodFilter(e) {
    console.log(e.target.value);
  }
  ngOnInit() {
  }

}
