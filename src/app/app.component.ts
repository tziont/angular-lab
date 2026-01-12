import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'


  
})


export class AppComponent {
  title = 'senior-angular-lab';

  constructor(private themeService: ThemeService) {
  this.themeService.init();
}
}
