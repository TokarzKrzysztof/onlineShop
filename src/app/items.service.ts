import { Injectable } from '@angular/core';
import { Item } from '../app/models/item';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private items: Array<Item> = [];
  private itemsArray = new BehaviorSubject<Array<Item>>(this.items);

  constructor() {
    this.items = [
      { photo: '../../assets/img/bicycle.jpg', name: 'Bicycle', price: 200, purchaseMethod: 'Buy now' },
      { photo: '../../assets/img/tv.jpg', name: 'TV', price: 1000, purchaseMethod: 'Buy now' },
      { photo: '../../assets/img/laptop.jpg', name: 'Laptop', price: 1500, purchaseMethod: 'Auction' },
      { photo: '../../assets/img/iPhone.jpg', name: 'iPhone', price: 900, purchaseMethod: 'Buy now' },
    ];
    this.itemsArray.next(this.items);
  }

  getItems(): Observable<Array<Item>> {
    return this.itemsArray.asObservable();
  }
}
