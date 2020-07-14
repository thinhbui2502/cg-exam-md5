import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IBook} from "../ibook";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly API_URL = 'http://localhost:3000/books';
  shouldRefresh = new Subject<any>();

  constructor(private httpClient: HttpClient) {
  }

  getListBook(): Observable<IBook[]> {
    return this.httpClient.get<IBook[]>(this.API_URL);
  }

  getBookById(id: number): Observable<IBook> {
    return this.httpClient.get<IBook>(`${this.API_URL}/${id}`);
  }

  createBook(book: IBook): Observable<IBook> {
    return this.httpClient.post<IBook>(this.API_URL, book);
  }

  updateBook(book: IBook): Observable<IBook> {
    return this.httpClient.put<IBook>(`${this.API_URL}/${book.id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
}
