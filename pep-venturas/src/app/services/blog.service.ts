import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../interfaces/blog.model';



@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private jsonUrl = 'assets/mock/blogs.json';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.jsonUrl);
  }

  getBlogById(id: number): Observable<Blog | undefined> {
    return new Observable((observer) => {
      this.getBlogs().subscribe((blogs) => {
        const blog = blogs.find(b => b.id === id);
        observer.next(blog);
        observer.complete();
      });
    });
  }
}
