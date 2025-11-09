import { Component } from '@angular/core';

@Component({
  selector: 'app-demo1-interactive-assistant',
  standalone: false,
  templateUrl: './demo1-interactive-assistant.component.html',
  styleUrl: './demo1-interactive-assistant.component.scss'
})
export class Demo1InteractiveAssistantComponent {
  errorInput: string = '';
  aiResponse: string = '';

  analyzeError() {
    if (!this.errorInput) {
      this.aiResponse = 'Please enter an error message to analyze.';
      return;
    }

    // Simple simulated AI logic for learning/demo purposes
    if (this.errorInput.includes('undefined')) {
      this.aiResponse = 'Detected undefined property. Check variable initialization.';
    } else if (this.errorInput.includes('null')) {
      this.aiResponse = 'Null object detected. Ensure the object is properly created.';
    } else {
      this.aiResponse = 'Check logs and variable assignments.';
    }
  }

  clear() {
    this.errorInput = '';
    this.aiResponse = '';
  }
}
