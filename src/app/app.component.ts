import { Component } from '@angular/core';
import { faAngular, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Inteligência Artificial';
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faAngular = faAngular;
  faGithub = faGithub;
}
