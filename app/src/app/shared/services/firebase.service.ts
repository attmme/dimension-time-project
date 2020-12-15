//import { UserService } from './user.service';
//import { Item } from '../interfaces/item';
//import { FirebaseApp } from '@angular/fire';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  user: Observable<firebase.User>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.user = firebaseAuth.authState;
  }

  // Guardar time-task
  task(dades: object) {
    let collection = this.firestore.collection('tasks');

    // Agafar l'objecte i canviar aquí el contingut
    collection.doc('test').set({
      prova: 'prova',
    });
  }

  // Guardar time-task
  crearEstructuraColeccio(ruta: string, dades: any) {
    let collection = this.firestore.collection(ruta);
    let id_unica = uuidv4();
    return (
      // Agafar l'objecte i canviar aquí el contingut
      collection.doc(id_unica).set({ //dades.id.toString()
        nomDocument: id_unica,
        id_llistat_tasques: dades.cssClass.split(';')[1], // cssClass element[1] = id llistat tasques
        data_inici: dades.start,
        data_final: dades.end,
        color: dades.color,
        titol: dades.title,
      })
    );
  }

  // Llegir coleccio
  readColl(name) {
    let collection = this.firestore.collection(name);
    return collection
      .get()
      .toPromise()
      .then((data) => data.docs.map((el) => el.data()));
  }

  // Llegir document
  readDoc(name, id) {
    let collection = this.firestore.collection(name);

    // this.firestore.collection(`users/${id_usuari}/tasks`).doc(id).delete();

    return collection.doc(id).get().toPromise();
  }

  llegir_tasques_usuari(id_usuari) {
    let collection = this.firestore.collection(`users/${id_usuari}/tasks`);
    return collection
      .get()
      .toPromise()
      .then((data) => data.docs.map((el) => el.data()));
  }

  // Registro
  registrar(user: string, email: string, password: string) {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        // S'afegeix a la colecció users (bdd) un nou document (taula) amb la id de l'usuari registrat
        let collection = this.firestore.collection('users');
        collection.doc(value.user.uid).set({
          email: email,
          user: user,
        });
      });
  }

  // Eliminar document
  delete(id_usuari: string, nom_document: string) {
    return this.firestore
      .collection(`users/${id_usuari}/tasks`)
      .doc(nom_document)
      .delete();
  }

  // Login
  login(email: string, password: string) {
    // Retornem una promesa, es consumeix en login.form.component
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  // Logout
  logout() {
    localStorage.removeItem('userId');
  }
}
