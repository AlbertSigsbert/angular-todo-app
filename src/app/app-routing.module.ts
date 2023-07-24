import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AppComponent } from './app.component';

const routes: Routes = [
//   { path: '', component: AppComponent },
  { path: 'all-todos', component: TodoListComponent },
  { path: 'active-todos', component: TodoListComponent },
  { path: 'completed-todos', component: TodoListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
