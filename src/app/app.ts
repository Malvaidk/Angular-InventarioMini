import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from '../shared/home/home';
import { Header } from '../shared/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Ejercicio1');
  autor = 'Malva'; // Placeholder for the author's name
}
