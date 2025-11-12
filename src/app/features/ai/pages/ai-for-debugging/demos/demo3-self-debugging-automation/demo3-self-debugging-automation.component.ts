import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo3-self-debugging-automation',
  standalone: false,
  templateUrl: './demo3-self-debugging-automation.component.html',
  styleUrl: './demo3-self-debugging-automation.component.scss'
})
export class Demo3SelfDebuggingAutomationComponent implements OnInit {

  // Simulate an uncaught error after a short delay
ngOnInit(): void {
  setTimeout(() => {
    // This must throw a real uncaught error
    (window as any).undefinedFunction(); 
  }, 2000);
}
}
