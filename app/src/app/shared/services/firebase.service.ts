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
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.user = firebaseAuth.authState;
  }

  /* async */
  registrar(user:string, email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        console.log('Success!', value); // BORRAR

        // S'afegeix a la colecció users (bdd) un nou document (taula) amb la id de l'usuari registrat
        let collection = this.firestore.collection("users");
        collection.doc(value.user.uid).set({
          email: email,
          user: user,
          tasks: "Array amb tasques" // MODIFICAR
        });
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
      });
  }
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
