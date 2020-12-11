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

  // Registro
  registrar(user:string, email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        // S'afegeix a la colecció users (bdd) un nou document (taula) amb la id de l'usuari registrat
        let collection = this.firestore.collection("users");
        collection.doc(value.user.uid).set({
          email: email,
          user: user,
          tasks: "Array amb tasques" // MODIFICAR, organitzar primer la BDD
        });
      })
      .catch((err) => {
        //console.log('Something went wrong:', err.message);
      });
  }

  // Login
  login(email: string, password: string) {
    // Retornem una promesa, es consumeix en login.form.component
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }
}