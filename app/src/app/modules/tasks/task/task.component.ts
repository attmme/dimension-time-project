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
  date_temporal: Date = new Date();

  events: CalendarEvent[] = [];
  tasques = [];

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

    this.agafarTasquesDB();

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
      console.log('id única de la tasca usuari: ', dades_parseadas[0]);
      console.log('id llistat de tasques: ', dades_parseadas[1]);

      this.date_temporal = event.start;

      // dades del evento  ==> donar-li al modal

      this.modal.open(this.modalEditar, { size: 'lg' });
    }
  }

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

  // de la DB => web
  agafarTasquesDB() {
    this.fbService
      .readColl(`users/${this.auth.getToken()}/tasks`)
      .then((data) => {
        data.map((element, id) => {
          this.events = [
            ...this.events,
            {
              id: element['id'],
              cssClass: `${element['id']};${element['id_llistat_tasques']}`, // id usuari; id llistat tasques
              start: new Date(element['data_inici'].seconds * 1000),
              end: new Date(element['data_final'].seconds * 1000),
              title: element['titol'],
              color: element['color'],
              actions: this.actions,
              allDay: false,
              draggable: true,
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
            },
          ];
        });
        this.refresh.next();
      });
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

    let usuari = this.auth.getToken();
    this.fbService.crearEstructuraColeccio(
      'users/' + usuari + '/tasks',
      this.events[this.events.length - 1]
    );
  }

  donarTasca(id): string {
    let nom_tasca = this.tasques.find((element) => element.id == id);
    return nom_tasca.nom;
  }

  crearDBTest() {
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
      this.fbService.crearEstructuraColeccio(
        'users/' + usuari + '/tasks',
        tasques_usuari[i]
      );
    }
  }
}
