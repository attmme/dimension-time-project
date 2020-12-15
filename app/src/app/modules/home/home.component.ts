import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  scrolled: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    /*     if (numb >= 500) {
    const numb = window.scrollY;
    
      console.log('1');
      // this.scrolled = true;
    } else {
      console.log('0');
      // this.scrolled = false;
    } */
  }


  saltar(location: string): void {
    window.location.hash = location;
}

}
