import {Component, OnInit} from '@angular/core';
import {IBook} from "../ibook";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../service/book.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  books: IBook[] = [];
  bookForm: FormGroup;

  constructor(private bookService: BookService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const {value} = this.bookForm;
      this.bookService.createBook(value).subscribe(result => {
        this.books.unshift(result);
        this.bookForm.reset({
          title: '',
          author: '',
          description: ''
        });
        this.bookService.shouldRefresh.next('show a message');
      });
    }
  }
}
