import { Component } from '@angular/core';
import { AiDebugService } from '../../../../../core/services/ai-debug.service';
@Component({
  selector: 'app-demo2-real-life-version',
  standalone: false,
  templateUrl: './demo2-real-life-version.component.html',
  styleUrl: './demo2-real-life-version.component.scss'
})
export class Demo2RealLifeVersionComponent {

constructor(private aidebugService: AiDebugService) {}
runDemo() {
    const request = {
      codeSnippet: 'console.log(user.id);', // example snippet
      errorMessage: 'Cannot read properties of undefined (reading "id")',
    };

    this.aidebugService.runDebug(request).subscribe({
      next: (res) => {
        console.log('AI Suggestion:', res.suggestion);
      },
      error: (err) => {
        console.error('Debug service error:', err);
      },
    });
  }




}
