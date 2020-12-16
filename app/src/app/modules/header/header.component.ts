import { Router } from '@angular/router';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //
  @Input() fill_dada: string;
  @ViewChild('templateResumen', { static: true })
  templateResumen: TemplateRef<any>;
  @ViewChild('templatePersonal', { static: true })
  templatePersonal: TemplateRef<any>;

  llista = [];
  tasques_trello = [];
  nomUsuari: string;

  constructor(
    private trucazo_router: Router,
    private modal: NgbModal,

    private service: AuthService,
    private fbService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.agafarTasquesUsuariDB();

    this.service.getUserName().then((data) => {
      this.nomUsuari = data.data()['user'];
    });

    this.fbService.readColl('tasks').then((data) => {
      data.map((el, id) =>
        this.tasques_trello.push({ id: id, nom: el['nom'] })
      );
    });
  }

  isLogged = () => localStorage.getItem('userId');

  clickPersonal() {
    let llista_reduida = [];
    let llista_tmp = [];

    // refrescar la llista
    this.agafarTasquesUsuariDB().then(() => {

      for (let i = 0; i < this.tasques_trello.length; i++) {
        let x = this.llista.filter(el => el.titol == this.tasques_trello[i].nom);
        if (x.length > 0) {
          llista_reduida.push(x)
        }
      }

      for (let i = 0; i < llista_reduida.length; i++) {
        let t = [
          {
            titol: llista_reduida[i][0].titol,
            total: llista_reduida[i].reduce(
              (accumulator, currentValue) => {
                accumulator.horesMinutsSegons = this.adderHMS(
                  accumulator.horesMinutsSegons,
                  currentValue.horesMinutsSegons
                );
                return accumulator;
              },
              { horesMinutsSegons: '00:00:00' }
            ).horesMinutsSegons,
          },
        ];

        llista_tmp.push(t);
      }


      this.llista = [];
      this.llista = [...llista_tmp];

    }).then(
      () => {
        this.modal.open(this.templatePersonal, { size: 'lg' });
      }
    );
  }

  dataToHMS(data_inici, data_final) {
    let tempsInici = +new Date(data_inici);
    let tempsFinal = +new Date(data_final);
    let seconds = Math.abs(tempsFinal - tempsInici);
    //console.log("PROVES: ", new Date(seconds * 1000).toISOString());
    let dada = new Date(seconds * 1000).toISOString().substr(11, 8);
    return dada;
  }

  adderHMS(startTime, endTime) {
    var times = [0, 0, 0];
    var max = times.length;

    var a = (startTime || '').split(':');
    var b = (endTime || '').split(':');

    // normalize time values
    for (var i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i]);
    }

    // store time values
    for (var i = 0; i < max; i++) {
      times[i] = a[i] + b[i];
    }

    var hours = times[0];
    var minutes = times[1];
    var seconds = times[2];

    if (seconds >= 60) {
      var m = (seconds / 60) << 0;
      minutes += m;
      seconds -= 60 * m;
    }

    if (minutes >= 60) {
      var h = (minutes / 60) << 0;
      hours += h;
      minutes -= 60 * h;
    }

    return (
      ('0' + hours).slice(-2) +
      ':' +
      ('0' + minutes).slice(-2) +
      ':' +
      ('0' + seconds).slice(-2)
    );
  }

  clickResumen() {
    this.modal.open(this.templateResumen, { size: 'lg' });
  }

  agafarTasquesUsuariDB() {
    this.llista = [];

    return this.fbService
      .readColl(`users/${this.service.getToken()}/tasks`)
      .then((data) => {
        data.map((element) => {
          let d_init = element['data_inici'].seconds;
          let d_final = element['data_final'].seconds;
          this.llista = [
            ...this.llista,
            {
              id: element['id'],
              horesMinutsSegons: this.dataToHMS(d_init, d_final),
              titol: element['titol'],
              color: element['color'],
            },
          ];
        });

        // this.refresh.next();
      });
  }

  clickLogout() {
    this.service.logout();
    this.trucazo_router.navigateByUrl('/login');
  }

  clickLogin() {
    this.service.logout();
    this.trucazo_router.navigateByUrl('/login');
  }
}
