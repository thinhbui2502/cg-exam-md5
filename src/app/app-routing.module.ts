import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BooksComponent} from "./books/books.component";
import {BookDetailComponent} from "./book-detail/book-detail.component";
import {CreateBookComponent} from "./create-book/create-book.component";
import {BookContentComponent} from "./book-content/book-content.component";


const routes: Routes = [
  {
    path: '',
    component: BooksComponent
  },
  {
    path: 'book-create',
    component: CreateBookComponent
  },
  {
    path: 'book-edit/:id',
    component: BookDetailComponent
  },
  {
    path: 'book/:id',
    component: BookContentComponent
  },
  // {
  //   path: '',
  //   redirectTo: 'books',
  //   pathMatch: 'full'
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
