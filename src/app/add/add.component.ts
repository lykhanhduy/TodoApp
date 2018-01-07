import { TaskService } from './../task.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from './../task';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Output() myClick = new EventEmitter();
  @Output() myUpdate = new EventEmitter();
  task: Task;
  _id: string;
  title: string;
  time: string;
  completed: boolean;
  isEdit = false;
  constructor(private taskService: TaskService) { }
  ngOnInit() {
  }

  addTaskForParent(formAddTask) {
    console.log(formAddTask);
    this.myClick.emit(formAddTask);
    this.title = '';
    this.time  = '';
  }

  addTask(formAddTask) {
    this.task = formAddTask.value;
    this.task.completed = false;
  }
  saveTaskForParent(formAddTask) {
    const updateTask = {
      _id: this._id,
      title: this.title,
      time: this.time,
      completed: this.completed
    };
    this.myUpdate.emit(updateTask);
    this.title = '';
    this.time  = '';
    this.isEdit = !this.isEdit;
  }
}
