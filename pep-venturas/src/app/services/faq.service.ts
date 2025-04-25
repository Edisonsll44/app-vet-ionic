import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Faq } from '../interfaces/faq.model';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private jsonUrl = 'assets/mock/faqs.json';

  constructor(private http: HttpClient) {}

  getFaqs(): Observable<Faq[]> {
    return this.http.get<Faq[]>(this.jsonUrl);
  }
}
