import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormularioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'projectAngular';
}
