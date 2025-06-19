import { Component,Input,Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: false,
  templateUrl: '././child.component.html',
//   styleUrl: './parent.component.scss'
})
export class ChildComponent  {
@Input() counter:number = 0;
@Output() add = new EventEmitter<number>





addBy(numberToAdd:number){
   
    this.add.emit(numberToAdd)
    
}}