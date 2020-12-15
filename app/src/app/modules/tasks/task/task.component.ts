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
  bloqueig_boto: boolean;

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

  revisarDates(accio) {
    let inici: Date;
    let final: Date;

    switch (accio) {
      case 'Crear':
        inici = new Date(this.formulariCrear.value.dataInici);
        final = new Date(this.formulariCrear.value.dataFinal);
        break;
      case 'Editar':
        inici = new Date(this.formulariEditar.value.dataInici);
        final = new Date(this.formulariEditar.value.dataFinal);
        break;
    }

    let sonIguals = this.datesIguals(inici, final);
    this.bloqueig_boto = !sonIguals;
  }

  datesIguals(data1, data2): boolean {
    let hora1 = data1.getHours();
    hora1 = hora1 == 24 ? 0 : hora1;
    let minuts1 = data1.getMinutes();
    let day1 = data1.getDate();
    let month1 = data1.getMonth() + 1; //months from 1-12
    let year1 = data1.getFullYear();

    let hora2 = data2.getHours();
    hora2 = hora2 == 24 ? 0 : hora2;
    let minuts2 = data2.getMinutes();
    let day2 = data2.getDate();
    let month2 = data2.getMonth() + 1; //months from 1-12
    let year2 = data2.getFullYear();

    let newdate1 = month1 + '/' + day1 + '/' + year1;
    let newdate2 = month2 + '/' + day2 + '/' + year2;

    let esNumero = year1 + month1 + day1 > 0;
    let datesIguals = newdate1 === newdate2;
    let horesCorrectes = hora2 >= hora1;
    let minutsCorrectes = minuts2 >= minuts1;
    let horaRepetida = hora2 == hora1 && minuts2 == minuts1;

    return (
      datesIguals &&
      esNumero &&
      horesCorrectes &&
      minutsCorrectes &&
      !horaRepetida
    );
  }

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
              id: element['nomDocument'],
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
      this.modal.open(this.modalEditar, { size: 'lg' });
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  eliminarTasca() {
    // borrar del firebase
    let nomDocumentBorrar = this.dataID.toString(); // Borrar actual de la bdd
    let idUsuari = this.auth.getToken();
    this.fbService.delete(idUsuari, nomDocumentBorrar);

    // borrar del array
    let index_elem_borrar = this.events
      .map((item) => item.id)
      .indexOf(nomDocumentBorrar);
    this.events.splice(index_elem_borrar, 1);

    this.refresh.next();
  }

  // Al guardar un edit d'una tasca
  submitEdit() {
    let _color = this.colors[this.formulariEditar.value.colorPrimari];
    let paquet_de_dades = `${0};${this.formulariEditar.value.tasca}`;

    let evento = {
      //id: aqui ha d anar el UUID de la DB, // nova id = tamany array ( final array )
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

    this.eliminarTasca();

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

    let tasca_a_crear = {
      cssClass: paquet_de_dades, // id usuari, temporal, canviar a la real
      start: this.formulariCrear.value.dataInici,
      end: this.formulariCrear.value.dataFinal,
      title: this.donarTasca(this.formulariCrear.value.tasca),
      color: _color,
    };

    this.fbService.crearEstructuraColeccio(
      'users/' + this.auth.getToken() + '/tasks',
      tasca_a_crear
    ).then(
      ()=>{
        this.events = [];
        this.agafarTasquesDB();
      }
    );
  }

  donarTasca(id): string {
    let nom_tasca = this.tasques.find((element) => element.id == id);
    return nom_tasca.nom;
  }
}
