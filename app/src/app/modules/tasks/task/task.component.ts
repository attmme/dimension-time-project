import { AuthService } from 'src/app/shared/services/auth.service';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  Input,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  startOfWeek,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { FirebaseService } from '../../../shared/services/firebase.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('modalCrear', { static: true }) modalCrear: TemplateRef<any>;
  @ViewChild('modalEditar', { static: true }) modalEditar: TemplateRef<any>;

  // variables
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = false;
  formulariCrear: FormGroup;
  formulariEditar: FormGroup;
  dada_tmp: string | number;
  dada_tasca_escollida_temporal: string | number;
  dada_tasca_temps_unix: any; // temporal

  form: FormGroup = new FormGroup({
    tasca: new FormControl(''),
    colorPrimari: new FormControl(''),
    colorSecundari: new FormControl(''),
    dataInici: new FormControl(''),
    dataFinal: new FormControl(''),
  });
  // temporal

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  events: CalendarEvent[] = [
/*     {
      id: 0,
      cssClass: '0;1', // id usuari; id llistat tasques
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: this.colors.red,
      actions: this.actions,
      allDay: false,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }, */
/*     {
      id: 1,
      cssClass: '0;0', // id usuari; id tasca
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: this.colors.blue,
      actions: this.actions,
      allDay: false,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }, */
/*     {
      id: 2,
      cssClass: '0;0', // id usuari; id tasca
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: this.colors.blue,
      actions: this.actions,
      allDay: false,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }, */
/*     {
      id: 3,
      cssClass: '0;2', // id usuari; id tasca
      start: subDays(startOfWeek(new Date()), 1),
      end: addDays(startOfWeek(new Date()), 1),
      title: 'A long event that spans 2 months',
      color: this.colors.yellow,
      allDay: false,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }, */
  ];

  tasques = [];

  // constructor + funcions
  constructor(
    private modal: NgbModal,
    public formBuilder: FormBuilder,
    private fbService: FirebaseService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.fbService.readColl('tasks').then((data) => {
      data.map((el, id) => {
        this.tasques.push({ id: id, nom: el['nom'] });
      });
    });


    this.guardarTasques();
    //this.fbService.readColl(`users/${this.auth.getToken()}/tasks`).then((data) => {
    /* this.fbService
      .readColl(`users/LjovCXj05kOtSU1ok24lV0njpjm1/tasks`)
      .then((data) => {
        data.map((el, id) => {
          console.log('tasca1: ', el['date_final'].seconds);
          this.dada_tasca_temps_unix = el['date_final'].seconds * 1000;
          // anar pintant tasca per tasca en el calendari
        });
      }); */

    this.formulariCrear = this.formBuilder.group({
      tasca: ['', [Validators.required]],
      colorPrimari: ['', [Validators.required]],
      colorSecundari: ['', [Validators.required]],
      dataInici: ['', [Validators.required]],
      dataFinal: ['', [Validators.required]],
    });

    this.formulariEditar = this.formBuilder.group({
      tasca: ['', [Validators.required]],
      colorPrimari: ['', [Validators.required]],
      colorSecundari: ['', [Validators.required]],
      dataInici: ['', [Validators.required]],
      dataFinal: ['', [Validators.required]],
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.modal.open(this.modalCrear, { size: 'lg' });

    /*     if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
        console.log('activeDayIsOpen false');
      } else {
        this.activeDayIsOpen = true;
        console.log('activeDayIsOpen true');
      }
      this.viewDate = date;
    } */
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('handleEvent(): ', action);

    this.modalData = { event, action };

    if (action == 'Clicked') {
      let dades_parseadas = event.cssClass.split(';');

      console.log('evento: ', event);
      console.log('id evento: ', event.id);
      console.log('cssClass evento: ', event.cssClass);
      console.log('id usuari: ', dades_parseadas[0]);
      console.log('id tasca seleccionada: ', dades_parseadas[1]);

      this.dada_tmp = dades_parseadas[1];

      // dades del evento  ==> donar-li al modal

      this.modal.open(this.modalEditar, { size: 'lg' });
    }
  }

  /*   addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }
 */
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  editarTasca() {}

  guardarTasques() {
    /*
    this.fbService.readColl(`users/LjovCXj05kOtSU1ok24lV0njpjm1/tasks`).then((data) => {
      data.map((el, id) => {
        console.log('tasca1: ', el['date_final'].seconds );
        this.dada_tasca_temps_unix = (el['date_final'].seconds*1000);
        // anar pintant tasca per tasca en el calendari
      });
    });
     */
    /*     let _color = this.colors[this.formulariCrear.value.colorPrimari];

    let paquet_de_dades = `${0};${this.formulariCrear.value.tasca}`;

    this.events = [
      ...this.events,
      {
        id: this.events.length, // nova id = tamany array ( final array )
        cssClass: paquet_de_dades, // id usuari, temporal, canviar a la real
        start: this.formulariCrear.value.dataInici,
        end: this.formulariCrear.value.dataFinal,
        title: this.donarTasca(this.formulariCrear.value.tasca),
        color: _color,
        actions: this.actions,
        allDay: false,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
 */
    // console.log("eventos després: ", this.events);
  }

  crearTasca() {
    // console.log("crear tasca, tasca: ", this.formulariCrear.value.tasca);
    // console.log("crear tasca color primari: ", this.formulariCrear.value.dataFinal);

    let _color = this.colors[this.formulariCrear.value.colorPrimari];

    let paquet_de_dades = `${0};${this.formulariCrear.value.tasca}`;

    this.events = [
      ...this.events,
      {
        id: this.events.length, // nova id = tamany array ( final array )
        cssClass: paquet_de_dades, // id usuari, temporal, canviar a la real
        start: this.formulariCrear.value.dataInici,
        end: this.formulariCrear.value.dataFinal,
        title: this.donarTasca(this.formulariCrear.value.tasca),
        color: _color,
        actions: this.actions,
        allDay: false,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];

    // console.log("eventos després: ", this.events);
  }

  donarTasca(id): string {
    let nom_tasca = this.tasques.find((element) => element.id == id);
    return nom_tasca.nom;
  }

  crearDBTest()
  {
    let usuari = this.auth.getToken();

    let tasques_usuari = [
      {
        id: 0,
        data_inici: subDays(startOfDay(new Date()), 1),
        data_final: addDays(new Date(), 1),
        color: this.colors.red,
        titol: 'A 3 day event',
        id_llistat_tasques: 1,
      },
      {
        id: 1,
        data_inici: subDays(endOfMonth(new Date()), 3),
        data_final: addDays(endOfMonth(new Date()), 3),
        color: this.colors.blue,
        titol: 'A long event that spans 2 months',
        id_llistat_tasques: 2,
      },
      {
        id: 2,
        data_inici: addHours(startOfDay(new Date()), 2),
        data_final: addHours(new Date(), 2),
        color: this.colors.blue,
        titol: 'A draggable and resizable event',
        id_llistat_tasques: 0,
      },
      {
        id: 3,
        data_inici: subDays(startOfWeek(new Date()), 1),
        data_final: addDays(startOfWeek(new Date()), 1),
        color: this.colors.yellow,
        titol: 'A long event that spans 2 months',
        id_llistat_tasques: 0,
      },
    ];

    for (let i = 0; i < tasques_usuari.length; i++) {
      this.fbService.crearEstructuraColeccio('users/' + usuari + '/tasks', tasques_usuari[i]);
    }

  }
}
