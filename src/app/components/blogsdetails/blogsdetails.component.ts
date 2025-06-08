import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService, Blog } from '../../services/blogs.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogsdetails',
  templateUrl: './blogsdetails.component.html',
  imports:[CommonModule],
  styleUrls: ['./blogsdetails.component.scss']
})
export class BlogsdetailsComponent implements OnInit {
  blog?: Blog;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private blogsService: BlogsService
  ) {}

  ngOnInit() {
    this.loadBlog();
  }

  loadBlog() {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.loading = true;
      this.blogsService.getBlogById(blogId).subscribe({
        next: (data) => {
          this.blog = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load the blog article.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'No blog ID provided in route.';
    }
  }
}
