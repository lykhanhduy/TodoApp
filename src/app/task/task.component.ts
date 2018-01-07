import { AddComponent } from './../add/add.component';
import { TaskService } from './../task.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from './../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @ViewChild(AddComponent)
  myChildAdd: AddComponent;
  newTask: Task;
  tasks: Task[];
  isCompleted: boolean;
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
    .subscribe(tasks => this.tasks = tasks);
  }
  doComplete(task: Task, e) {
    this.isCompleted = e.target.checked;
    this.taskService.taskIsCompleted(this.isCompleted, task)
    .subscribe( task1 => console.log(task1));
  }
  addNewTask(e) {
    this.newTask = e.value;
    this.newTask.completed = false;
    this.taskService.addTask(this.newTask)
    .subscribe(newtask => this.tasks.push(newtask));
  }
  updateNewTask(e) {
    this.taskService.updateTask(e)
    .subscribe(data => {
      if (data.n === 1) {
        for (let i = 0; i < this.tasks.length; i++) {
          if ( this.tasks[i]._id === <any>e._id ) {
            this.tasks[i].title = e.title;
            this.tasks[i].time = e.time;
            this.tasks[i].completed = e.completed;
          }
        }
      }
    });
  }
  delete(id: string) {
    this.taskService.delete(id)
    .subscribe(data => {
      if (data.n === 1) {
        for (let i = 0; i < this.tasks.length; i++) {
          if ( this.tasks[i]._id === <any>id ) {
            this.tasks.splice(i, 1);
          }
        }
      }
    });
  }
  update(task: Task) {
    this.myChildAdd._id = task._id;
    this.myChildAdd.title = task.title;
    this.myChildAdd.time = task.time;
    this.myChildAdd.completed = task.completed;
    this.myChildAdd.isEdit = true;
  }
}
