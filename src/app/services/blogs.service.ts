import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Blog {
  _id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  content?: string; // Optional full content field
}

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private apiUrl = 'http://localhost:3000/blogs'; // Adjust to your backend URL

  constructor(private http: HttpClient) {}

  // ✅ Fetch all blogs
  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  // ✅ Fetch a single blog by ID
  getBlogById(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  // ✅ Create a new blog
  createBlog(blogData: Partial<Blog>): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, blogData);
  }

  // ✅ Update an existing blog — uses PATCH to match backend
  updateBlog(id: string, blogData: Partial<Blog>): Observable<Blog> {
    return this.http.patch<Blog>(`${this.apiUrl}/${id}`, blogData); // ✅ changed to PATCH
  }

  // ✅ Delete a blog
  deleteBlog(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
