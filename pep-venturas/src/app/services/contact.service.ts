import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactData } from '../interfaces/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private jsonUrl = 'assets/mock/contact.json';

  constructor(private http: HttpClient) {}

  getContactData(): Observable<ContactData> {
    return this.http.get<ContactData>(this.jsonUrl);
  }
}
