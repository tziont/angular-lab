import { Component } from '@angular/core'
import { ChildComponent } from './child.component'
@Component({
  selector: 'app-parent',
  standalone: false,
  templateUrl: './parent.component.html',
//   styleUrl: './parent.component.scss'
})
export class ParentComponent {
    counter = 0
    incriment($event:number){
       return this.counter += $event
    }
}
