import { Component, OnInit } from '@angular/core';
import {IBook} from "../ibook";
import {BookService} from "../service/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-book-content',
  templateUrl: './book-content.component.html',
  styleUrls: ['./book-content.component.css']
})
export class BookContentComponent implements OnInit {
  bookId: number;
  bookForm: FormGroup;
  book: IBook;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.bookId = params.id;
      this.bookService.getBookById(this.bookId).subscribe(result => {
        // this.bookForm.setValue(result);
        this.book = result;
      });
    });
  }

  backToList(){
    this.router.navigate(['/'])
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure to delete?')) {
      this.bookService.deleteBook(id).subscribe(result => {
        this.bookService.shouldRefresh.next();
        this.backToList();
      });
    }
  }
}
