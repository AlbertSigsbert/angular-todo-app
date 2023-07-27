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
     activeTab: string = '';

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
          this.activeTab = activeTab
        }
      );
    }

    onTodoCompletedChange(todo: Todo, completed: boolean){
      this.todosService.updateTodo(todo, completed);
      this.todosChangedSubscription = this.todosService.todosChanged.subscribe(
        (updatedTodos: Todo[]) => {
          this.todos = this.todosService.getFilteredTodos();
        }
      );
    }

    onDelete(todo:Todo){
      this.todosService.deleteTodo(todo);
      this.todosChangedSubscription = this.todosService.todosChanged.subscribe(
        (updatedTodos: Todo[]) => {
          this.todos = this.todosService.getFilteredTodos();
        }
      );
    }

    onDeleteAll(){
      this.todosService.deleteTodos();
      this.todosChangedSubscription = this.todosService.todosChanged.subscribe(
        (updatedTodos: Todo[]) => {
          this.todos = this.todosService.getFilteredTodos();
        }
      );

    }

    ngOnDestroy() {
      this.todosChangedSubscription?.unsubscribe();
      this.activeTabSubscription?.unsubscribe();
    }
    

}
