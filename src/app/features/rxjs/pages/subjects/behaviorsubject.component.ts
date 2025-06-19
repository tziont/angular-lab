import { Component,  } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-behaviorsubject',
  standalone: false,
  templateUrl: './behaviorsubject.component.html',
  styleUrl: './behaviorsubject.component.scss'
})
export class BehaviorsubjectComponent {

mySubject:Subject<string> = new BehaviorSubject<string>("Initial string")
message:string = "Hello from BehaviorSubject!"
messageSubsciber$ = this.mySubject.asObservable()

emitMessage(){
    this.mySubject.next(this.message);
}

}