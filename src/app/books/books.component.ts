import { Component, OnInit } from '@angular/core';
import {IBook} from "../ibook";
import {BookService} from "../service/book.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: IBook[] = [];
  message: string;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getAll();
    this.bookService.shouldRefresh.subscribe(result => (this.getAll()));
  }

  getAll(): void {
    this.bookService
      .getListBook()
      .subscribe(result => (this.books = result), error => (this.books = []));
  }


  deleteBook(id: number): void {
    if (confirm('Are you sure to delete?')) {
      this.bookService.deleteBook(id).subscribe(result => {
        this.bookService.shouldRefresh.next();
      });
    }
  }



}
