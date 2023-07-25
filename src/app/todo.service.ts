import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from './todo.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  todosChanged = new Subject<Todo[]>();

  constructor() {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  getTodos() {
    return this.todos.slice();
  }

  addTodo(description: string): void {
    const todo: Todo = {
      id: uuidv4(),
      description,
      completed: false,
    };

    this.todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.todosChanged.next(this.todos.slice());
  }



  updateTodo(todo:Todo, completed:boolean){
    const foundTodo = this.todos.find((t) => t.id === todo.id);

    if (foundTodo) {
      foundTodo.completed = completed;
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.todosChanged.next(this.todos.slice());
    }
  }
}
