import { Component,  } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-subject-demo',
  standalone: false,
  templateUrl: './subject-demo.component.html',
  styleUrl: './subject-demo.component.scss'
})
export class SubjectDemoComponent {

mySubject:Subject<string> = new Subject<string>()
message:string = "Hello from Subject!"
messageSubsciber$ = this.mySubject.asObservable()

emitMessage(){
    this.mySubject.next(this.message);
}

}
