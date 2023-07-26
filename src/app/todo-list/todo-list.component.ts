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
     private activeTabSubscription: Subscription | undefined; 

     constructor(private todosService:TodoService){
       this.todos = this.todosService.getFilteredTodos();
     }

     ngOnInit() {
      this.todos = this.todosService.getFilteredTodos();
      this.todosChangedSubscription = this.todosService.todosChanged.subscribe(
        (updatedTodos: Todo[]) => {
          this.todos = updatedTodos;
        }
      );

      this.activeTabSubscription = this.todosService.activeTabChanged.subscribe(
        (activeTab: string) => {
          this.todos = this.todosService.getFilteredTodos();
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
      this.activeTabSubscription?.unsubscribe();
    }
    

}
