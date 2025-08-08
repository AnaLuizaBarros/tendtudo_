import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routes';

@Component({
  selector: 'tt-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, AppRoutingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tendtudo';
}
