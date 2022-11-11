import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  toDoData: any = [];

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.loadToDoList();
  }
    // Get todo list
    loadToDoList() {
      return this.apiService.getToDoList().subscribe((data: {}) => {
        this.toDoData = data;
      });
    }
}
