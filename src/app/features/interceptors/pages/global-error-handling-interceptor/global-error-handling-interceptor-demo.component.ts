import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-global-error-handling-interceptor-demo',
  standalone: false,
  templateUrl: './global-error-handling-interceptor-demo.component.html',
  styleUrl: './global-error-handling-interceptor-demo.component.scss'
})
export class GlobalErrorHandlingInterceptorDemoComponent {
  response: string | null = null;

  constructor(private http: HttpClient) {}

  makeRequest() {
    this.http.get('https://jsonplaceholder.typicode.com/posts/1', { responseType: 'text' })
      .subscribe({
        next: res => this.response ="give me a brake",
        error: err => this.response = 'Request failed',
      });
  }
}
