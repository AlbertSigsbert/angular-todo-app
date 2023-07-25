import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
})
export class AddTodoFormComponent {
  todoDetails: string = '';

  constructor(private todoService: TodoService) {}

  handleSubmit() {
    if (this.todoDetails) {
      this.todoService.addTodo(this.todoDetails);
    }

    this.todoDetails = '';
  }
}
