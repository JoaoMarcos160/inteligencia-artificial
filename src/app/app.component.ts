import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { faAngular, faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faRobot,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private location: Location) {}

  title = 'Inteligência Artificial';
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faAngular = faAngular;
  faGithub = faGithub;
  faRobot = faRobot;

  toBack() {
    this.location.back();
  }

  toForward() {
    this.location.forward();
  }
}
