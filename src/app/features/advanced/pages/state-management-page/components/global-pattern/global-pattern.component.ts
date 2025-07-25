import { Component } from '@angular/core';
import { AppStateService } from '../../../../../../core/services/app-state.service';

@Component({
  selector: 'app-global-pattern',
  templateUrl: './global-pattern.component.html',
  styleUrls: ['./global-pattern.component.scss'],
  standalone:false
})
export class GlobalPatternComponent {
  constructor(public appState: AppStateService) {}
}
