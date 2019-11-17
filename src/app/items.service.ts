import { Injectable } from '@angular/core';
import { Item } from '../app/models/item';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private items: Array<Item> = [];
  private itemsArray = new BehaviorSubject<Array<Item>>(this.items);
  test;

  constructor(private http: HttpClient) {
    this.test = this.http.get('https://jsonplaceholder.typicode.com/posts');
    this.items = [
      { photo: '../assets/img/bicycle.jpg', name: 'Bicycle', price: 200, purchaseMethod: 'Buy now' },
      { photo: '../assets/img/tv.jpg', name: 'TV', price: 1000, purchaseMethod: 'Buy now' },
      { photo: '../assets/img/laptop.jpg', name: 'Laptop', price: 1500, purchaseMethod: 'Auction' },
      { photo: '../assets/img/iPhone.jpg', name: 'iPhone', price: 900, purchaseMethod: 'Buy now' },
      { photo: '../assets/img/glasses.jpg', name: 'Glasses', price: 300, purchaseMethod: 'Buy now' },
      { photo: '../assets/img/suit.jpg', name: 'Suit', price: 1100, purchaseMethod: 'Buy now' },
      { photo: '../assets/img/book.jpg', name: 'Book', price: 50, purchaseMethod: 'Auction' },
      { photo: '../assets/img/plush.jpg', name: 'Plush', price: 10, purchaseMethod: 'Buy now' },
    ];
    this.itemsArray.next(this.items);
  }

  getItems(): Observable<Array<Item>> {
    return this.itemsArray.asObservable();
  }
  setItems(componentArray) {
    console.log(this.http.get('https://jsonplaceholder.typicode.com/posts'));
    this.items = componentArray;
    this.itemsArray.next(this.items);
  }
  ngDoCheck() {
    console.log(this.test);
  }
}
