import { Component, OnInit } from '@angular/core';
import { Blog } from '../interfaces/blog.model';
import { BlogService } from '../services/blog.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
  standalone: false,
})
export class BlogPage implements OnInit {

  blogs: Blog[] = [];

  constructor(private blogService: BlogService, private navCtrl: NavController) {}

  ngOnInit() {
    this.blogService.getBlogs().subscribe(data => {
      this.blogs = data;
    });
  }

  openBlog(blogId: number) {
    this.navCtrl.navigateForward(`/detalle-blog/${blogId}`);
  }

  volverInicio() {
    this.navCtrl.navigateRoot('/tabs');
  }
}
