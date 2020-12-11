import { Component, Output, EventEmitter, ViewChild, Renderer2, AfterViewInit, OnInit } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MatCalendar } from '@angular/material/datepicker';


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

  @ViewChild('calendar') calendar: MatCalendar<Moment>;
selectedDate: Moment;


  ngOnInit(): void {}

  click_targeta() {
    console.log('click en targeta');
  }


  click_borrar_targeta() {
    console.log('click en borrar');
  }
}

