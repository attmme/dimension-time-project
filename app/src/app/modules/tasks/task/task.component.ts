import { Component, OnInit } from '@angular/core';
// import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  dades = [
    {
      nom: 'Pintar',
      hores: '1',
    },
    {
      nom: 'Posar button',
      hores: '1.5',
    },
    {
      nom: 'Arreglar material',
      hores: '2',
    },
    {
      nom: 'Borders',
      hores: '2.5',
    },
    {
      nom: 'Borders',
      hores: '2.5',
    },
    {
      nom: 'Borders',
      hores: '2.5',
    },
    {
      nom: 'Borders',
      hores: '2.5',
    },
    {
      nom: 'Borders',
      hores: '2.5',
    },
    {
      nom: 'Borders',
      hores: '2.5',
    },
    {
      nom: 'Borders',
      hores: '2.5',
    },
  ];
  constructor(/* public dialog: MatDialog */) {}

  ngOnInit(): void {}

  click_targeta() {
    console.log('click en targeta');
  }


  click_borrar_targeta() {
    console.log('click en borrar');

    // const dialogRef = this.dialog.open(DialogContentExampleDialog);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Botó apretat: ${result}`);
    // });
  }
}


// @Component({
//   selector: 'app-confirm-dialog',
//   templateUrl: '../../../shared/confirm-dialog/confirm-dialog.component.html',
// })

// export class DialogContentExampleDialog {}


