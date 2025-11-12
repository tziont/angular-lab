import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-basic-interceptor-demo',
  standalone: false,
  templateUrl: './basic-interceptor-demo.component.html',
  styleUrls: ['./basic-interceptor-demo.component.scss'],
})
export class BasicInterceptorDemoComponent {
  response: string | null = null;

  constructor(private http: HttpClient) {}

  makeRequest() {
    this.http
      .get('https://jsonplaceholder.typicode.com/posts/1', {
        responseType: 'text',
      })
      .subscribe({
        next: (res) => (this.response = res),
        error: (err) => (this.response = 'Request failed'),
      });
  }
}
