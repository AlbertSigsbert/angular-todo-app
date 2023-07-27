import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from './todo.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  activeTab: 'all' | 'active' | 'completed' = 'all';
  todosChanged = new Subject<Todo[]>();
  activeTabChanged = new Subject<string>();

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

  updateTodo(todo: Todo, completed: boolean) {
    const foundTodo = this.todos.find((t) => t.id === todo.id);
    if (foundTodo) {
      foundTodo.completed = completed;
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.todosChanged.next(this.todos.slice());
    }
  }

  deleteTodo(todo: Todo) {
    const foundTodo = this.todos.find((t) => t.id === todo.id);
    if (foundTodo) {
      const index = this.todos.indexOf(foundTodo);
      if (index !== -1) {
        this.todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(this.todos));
        this.todosChanged.next(this.todos.slice());
      }
    }
  }

  deleteTodos() {
    this.todos = this.todos.filter((todo) => !todo.completed);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.todosChanged.next(this.todos.slice());
  }

  setActiveTab(tab: 'all' | 'active' | 'completed') {
    this.activeTab = tab;
    this.activeTabChanged.next(tab);
  }

  getFilteredTodos() {
    switch (this.activeTab) {
      case 'all':
        return this.todos.slice();
      case 'active':
        return this.todos.filter((t) => !t.completed);
      case 'completed':
        return this.todos.filter((t) => t.completed);
      default:
        return this.todos.slice();
    }
  }
}
