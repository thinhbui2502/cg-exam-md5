import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BookService} from "../service/book.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  isShow = false;
  message: string;
  bookId: number;
  bookForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.bookId = params.id;
      this.bookService.getBookById(this.bookId).subscribe(result => {
        this.bookForm.setValue(result);
      });
    });
  }

  onSubmit(): void {
    if (this.bookId) {
      this.bookService.updateBook(this.bookForm.value).subscribe(result => {
        this.isShow = true;
        this.message = 'Update Successful!';
      });
    } else {
      this.bookService.createBook(this.bookForm.value).subscribe(result => {
        this.isShow = true;
        this.message = 'Create Successful';
      });
    }
  }

  backToList(){
    this.router.navigate(['/'])
  }

}
