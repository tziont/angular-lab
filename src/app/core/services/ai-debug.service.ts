import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface DebugRequest {
  codeSnippet: string;
  errorMessage: string;
}

interface DebugResponse {
  suggestion: string;
}

@Injectable({
  providedIn: 'root',
})
export class AiDebugService {
  private apiUrl = '/api/ai-debug';

  constructor(private http: HttpClient) {}

  runDebug(request: DebugRequest): Observable<DebugResponse> {
    return this.http.post<DebugResponse>(this.apiUrl, request);
  }
}

