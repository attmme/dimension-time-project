import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fbAuth: AngularFirestore) { }

  singUp(email: String, pass: String) {
  }
  
/* 
  addItem(item: Item): Promise<void> {
    item.id = this.fbAuth.createId();
    return this.fbAuth.collection<Item>('todos').doc(item.id).set(item);
  }

  editItem(item: Item): Promise<void> {
    item.id = this.fbAuth.createId();
    return this.fbAuth.collection<Item>('todos').doc(item.id).set(item);
  }

  getTotalItems$(): Observable<Item[]> {
    return this.fbAuth.collection<Item>('todos').valueChanges();
  } */
}
