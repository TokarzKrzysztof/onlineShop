import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  items: Array<Item> = [];

  constructor(private itemsService: ItemsService) {
    this.itemsService.getItems().subscribe((items: Array<Item>) => {
      this.items = items;
    });
  }
  sort(e) {
    e.target[0].value === '' && e.target[0].remove();
    switch (e.target.value) {
      case 'byName': this.items.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        break;
      case 'byPrice': this.items.sort((a, b) => {
        return a.price - b.price;
      });
        break;
      case 'byPurchaseMethod': this.items.sort((a, b) => (a.purchaseMethod > b.purchaseMethod) ? 1 : ((b.purchaseMethod > a.purchaseMethod) ? -1 : 0));
        break;
    }
  }

  ngOnInit() {
  }

}
