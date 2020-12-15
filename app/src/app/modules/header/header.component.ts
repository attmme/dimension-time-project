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

  nomUsuari: string;

  constructor(
    private trucazo_router: Router,
    private modal: NgbModal,

    private service: AuthService,
    private fbService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.agafarTasquesUsuariDB();

    this.service.getUserName().then((data) => {
      this.nomUsuari = data.data()['user'];
    });
  }

  isLogged = () => localStorage.getItem('userId');

  clickPersonal() {
    console.log('Total:', this.dataToHMS(4));

    this.modal.open(this.templatePersonal, { size: 'lg' });
  }

  dataToHMS(index) {
    let tempsInici = +new Date(this.llista[index].data_inici);
    let tempsFinal = +new Date(this.llista[index].data_final);
    let seconds = Math.abs(tempsFinal - tempsInici);

    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

  clickResumen() {
    this.modal.open(this.templateResumen, { size: 'lg' });
  }

  agafarTasquesUsuariDB() {
    this.fbService
      .readColl(`users/${this.service.getToken()}/tasks`)
      .then((data) => {
        data.map((element) => {
          this.llista = [
            ...this.llista,
            {
              id: element['id'],
              data_inici: element['data_inici'].seconds,
              data_final: element['data_final'].seconds,
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
