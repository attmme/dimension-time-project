//import { UserService } from './user.service';
//import { Item } from '../interfaces/item';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  gallina = "asdasd";
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.user = firebaseAuth.authState;
  }

  /* async */
  registrar(user:string, email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        console.log('Success!', value);

        console.log("ESTIC DINS")
        let temp = this.firestore.collection("users");
        temp.doc(value.user.uid).set({
          email: email,
          user: user
        });
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
      });
  }


  // addItem(item: Item): Promise<void> {
  //   item.id = this.fbAuth.createId();
  //   return this.fbAuth.collection<Item>('todos').doc(item.id).set(item);
  // }

  // editItem(item: Item): Promise<void> {
  //   item.id = this.fbAuth.createId();
  //   return this.fbAuth.collection<Item>('todos').doc(item.id).set(item);
  // }

  // getTotalItems$(): Observable<Item[]> {
  //   return this.fbAuth.collection<Item>('todos').valueChanges();
  // }
}

/*
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable()
export class FirebaseService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

} */
