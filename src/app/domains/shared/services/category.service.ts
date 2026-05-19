import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<Category[]>(
      `${environment.apiUrl}/api/v1/categories`,
    );
  }

  getAllPromises(){
    return fetch(`${environment.apiUrl}/api/v1/categories`)
    .then(response => response.json())
    .then(data => data);
  }
}
