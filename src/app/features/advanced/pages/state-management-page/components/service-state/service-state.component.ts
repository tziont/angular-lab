import { Component } from '@angular/core';
import { CounterSignalService } from '../../../../../../core/services/counter-signal.service';
@Component({
  selector: 'app-service-state',
  templateUrl: './service-state.component.html',
   styleUrl:'./service-state.component.scss'
})
export class ServiceStateComponent {
  constructor(public counterService: CounterSignalService) {}
}
