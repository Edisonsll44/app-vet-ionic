import { Component, OnInit } from '@angular/core';
import { Blog } from '../interfaces/blog.model';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-blog',
  templateUrl: './detalle-blog.page.html',
  styleUrls: ['./detalle-blog.page.scss'],
  standalone: false,
})
export class DetalleBlogPage implements OnInit {
  blog: Blog | undefined;

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getBlogById(id).subscribe(data => this.blog = data);
  }
}
