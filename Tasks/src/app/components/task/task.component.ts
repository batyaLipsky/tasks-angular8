import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { task } from 'src/app/models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: task;
  @Input() index: number;
  @Output() returnTaskForDelete: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    debugger;
  }
  deleteTask() {
    this.returnTaskForDelete.emit(this.index);
  }
}
