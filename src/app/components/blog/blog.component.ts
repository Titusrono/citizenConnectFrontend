import { Component, OnInit } from '@angular/core';
import { Blog, BlogsService } from '../../services/blogs.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  imports: [CommonModule],
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blogs: Blog[] = [];
  loading = false;
  error = '';
blog: any;

  constructor(private blogsService: BlogsService, private router: Router) {}

  ngOnInit() {
    this.fetchBlogs();
  }

  fetchBlogs() {
    this.loading = true;
    this.error = '';

    this.blogsService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load blogs. Please try again later.';
        this.loading = false;
      },
    });
  }

  goToFullArticle(blogId: string) {
    if (!blogId) {
      console.warn('No blog ID provided for navigation.');
      return;
    }
    this.router.navigate(['/blogsdetails', blogId]);
  }
}
