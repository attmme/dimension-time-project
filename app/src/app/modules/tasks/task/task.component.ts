import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const colors: any = {
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

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('modalCrear', { static: true }) modalCrear: TemplateRef<any>;

  // variables
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = false;


  // temporal
  formulariCrear: FormGroup;

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
    {
      id: 0,
      cssClass: "0", // id usuari
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: false,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      id: 1,
      cssClass: "0", // id usuari
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      actions: this.actions,
      allDay: false,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      id: 2,
      cssClass: "0", // id usuari
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.blue,
      actions: this.actions,
      allDay: false,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },

    {
      id: 3,
      cssClass: "0", // id usuari
      start: subDays(startOfWeek(new Date()), 1),
      end: addDays(startOfWeek(new Date()), 1),
      title: 'A long event that spans 2 months',
      color: colors.yellow,
      allDay: false,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  tasques = [
    {
      nom: 'Tasca 1',
      id: 1,
    },
    {
      nom: 'Tasca 2',
      id: 2,
    },
  ];

  // constructor + funcions
  constructor(private modal: NgbModal,
    public formBuilder: FormBuilder) {}


    ngOnInit(): void
    {
    this.formulariCrear = this.formBuilder.group(
      {
       tasca: ['', [Validators.required]],
      colorPrimari: ['', [Validators.required]],
      colorSecundari: ['', [Validators.required]],
      dataInici: ['', [Validators.required]],
      dataFinal: ['', [Validators.required]],
    }
    );
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log('dayClicked(), date: ', date);
    console.log('dayClicked(), events: ', events);

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

    if(action == 'Clicked'){
      this.modal.open(this.modalContent, { size: 'lg' });
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

  crearTasca()
  {
    // console.log("crear tasca color primari: ", this.formulariCrear.value.colorPrimari);
    // console.log("crear tasca color primari: ", this.formulariCrear.value.dataFinal);

    console.log( this.donarTasca(this.formulariCrear.value.tasca) );

    /* this.events = [
      ...this.events,
      {
        title: this.formulariCrear.value.tasca,
        start: this.formulariCrear.value.dataInici,
        end: this.formulariCrear.value.dataFinal,
        color: this.formulariCrear.value.colorPrimari, // canviar
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ]; */
  }

  donarTasca(id): String{
    let nom_tasca = this.tasques.find((element)=> element.id == id);
    return nom_tasca.nom;
  }
}
