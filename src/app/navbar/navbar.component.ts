import { Component } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  

  constructor(private todoService:TodoService){}

  get activeTab(): 'all' | 'active' | 'completed' {
    return this.todoService.activeTab;
  }


  onTabSelect(tab: 'all' | 'active' | 'completed'){
     this.todoService.setActiveTab(tab);
  }
}

