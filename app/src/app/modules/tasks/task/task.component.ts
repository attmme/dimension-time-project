import { AuthService } from 'src/app/shared/services/auth.service';

// Input
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';

// endOfDay, isSameDay, isSameMonth
import {
  startOfDay,
  subDays,
  addDays,
  endOfMonth,
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
import { provideRoutes } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  // Constructor
  constructor(
    private modal: NgbModal,
    public formBuilder: FormBuilder,
    private fbService: FirebaseService,
    private auth: AuthService
  ) {}

  // Colors del picker
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
  editar_borrar: number;
  buttonType: string;

  ////////////////////////////// Jesucristo
  // Variables edit
  diaClicat = new Date();
  dataIni = new Date();
  dataFi = new Date();
  dataID: string | number;
  //////////////////////////////

  //a millorar
  date_inicial_modal_crear: Date;

  events: CalendarEvent[] = [];
  tasques = [];

  form: FormGroup = new FormGroup({
    tasca: new FormControl(''),
    colorPrimari: new FormControl(''),
    colorSecundari: new FormControl(''),
    dataInici: new FormControl(''),
    dataFinal: new FormControl(''),
    id_formulari: new FormControl(''),
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

  // Inici APP
  ngOnInit(): void {
    // Llegeix les tasques de trello al carregar l'app
    this.fbService.readColl('tasks').then((data) => {
      data.map((el, id) => this.tasques.push({ id: id, nom: el['nom'] }));
    });

    // Agafa les dades de la DB i les passa a la web
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
      id_formulari: [''],
    });
  }

  // Agafa les dades de la DB i les passa a la web
  agafarTasquesDB() {
    this.fbService
      .readColl(`users/${this.auth.getToken()}/tasks`)
      .then((data) => {
        data.map((element) => {
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
              draggable: false,
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

  // Entra al clickar u dia per crear una nova tasca
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.date_inicial_modal_crear = date;
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
    this.modalData = { event, action };

    /////////////// Jesucristo 2.0
    this.dataIni = event.start;
    this.dataFi = event.end;
    this.dataID = this.modalData.event.id;
    ///////////////

    if (action == 'Clicked') {
      let dades_parseadas = event.cssClass.split(';');
      const puntero = this.modal.open(this.modalEditar, { size: 'lg' });
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

  eliminar_tasca() {
    let idDocumentBorrar = this.dataID.toString(); // Borrar actual de la bdd
    let idUsuari = this.auth.getToken();
    this.fbService.delete(idUsuari, idDocumentBorrar);

    let index_elem_borrar = this.events
      .map((item) => item.id)
      .indexOf(idDocumentBorrar);
    this.events.splice(index_elem_borrar, 1);

    this.refresh.next();
  }

  // Al guardar un edit d'una tasca
  guardar_tasca() {
    let _color = this.colors[this.formulariEditar.value.colorPrimari];
    let paquet_de_dades = `${0};${this.formulariEditar.value.tasca}`;

    let evento = {
      id: this.events.length, // nova id = tamany array ( final array )
      cssClass: paquet_de_dades, // id usuari, temporal, canviar a la real
      start: this.formulariEditar.value.dataInici,
      end: this.formulariEditar.value.dataFinal,
      title: this.donarTasca(this.formulariEditar.value.tasca),
      color: _color,
      actions: this.actions,
      allDay: false,
      draggable: false,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    };

    this.eliminar_tasca();

    let idUsuari = this.auth.getToken();

    this.fbService // Crear una amb la nova
      .crearEstructuraColeccio('users/' + idUsuari + '/tasks', evento)
      .then(() => {
        this.events = [];
        this.agafarTasquesDB();
      });
  }

  crearTasca() {
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
        draggable: false,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];

    this.fbService.crearEstructuraColeccio(
      'users/' + this.auth.getToken() + '/tasks',
      this.events[this.events.length - 1]
    );
  }

  donarTasca(id): string {
    let nom_tasca = this.tasques.find((element) => element.id == id);
    return nom_tasca.nom;
  }

  // Omplir BDD amb valors per testing
  crearDBTest() {
    let usuari = this.auth.getToken();

    let tasques_usuari = [
      {
        id: 0,
        cssClass: '0;1',
        start: subDays(startOfDay(new Date()), 1),
        end: addDays(new Date(), 1),
        color: this.colors.red,
        title: 'A 3 day event',
      },
      {
        id: 1,
        cssClass: '0;2',
        start: subDays(endOfMonth(new Date()), 3),
        end: addDays(endOfMonth(new Date()), 3),
        color: this.colors.blue,
        title: 'A long event that spans 2 months',
      },
      {
        id: 2,
        cssClass: '0;0',
        start: addHours(startOfDay(new Date()), 2),
        end: addHours(new Date(), 2),
        color: this.colors.blue,
        title: 'A draggable and resizable event',
      },
      {
        id: 3,
        cssClass: '0;0',
        start: subDays(startOfWeek(new Date()), 1),
        end: addDays(startOfWeek(new Date()), 1),
        color: this.colors.yellow,
        title: 'A long event that spans 2 months',
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
