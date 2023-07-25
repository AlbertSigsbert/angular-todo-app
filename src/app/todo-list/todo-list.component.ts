import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent {
     todos:Todo[] = [];

     private todosChangedSubscription: Subscription | undefined;

     constructor(private todosService:TodoService){
       this.todos = this.todosService.getTodos();
     }

     ngOnInit() {
      this.todos = this.todosService.getTodos();
      this.todosChangedSubscription = this.todosService.todosChanged.subscribe(
        (updatedTodos: Todo[]) => {
          this.todos = updatedTodos;
        }
      );
    }

    onTodoCompletedChange(todo: Todo, completed: boolean){
      this.todosService.updateTodo(todo, completed);
      this.todosChangedSubscription = this.todosService.todosChanged.subscribe(
        (updatedTodos: Todo[]) => {
          this.todos = updatedTodos;
        }
      );
    }


    ngOnDestroy() {
      this.todosChangedSubscription?.unsubscribe();
    }
    

}
