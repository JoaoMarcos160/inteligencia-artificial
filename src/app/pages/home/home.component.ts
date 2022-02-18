import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public routes: { name: string; route: string }[] = [
    {
      name: 'Treinar reconhecimento de números',
      route: '/number-recognition-training'
    }
  ];

  constructor(private router: Router) {}
}
