import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { task } from 'src/app/models/task';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  newTaskControl = new FormControl('', [
    Validators.minLength(3)
  ]);
  matcher = new MyErrorStateMatcher();
  tasksList: task[];
  deadlineForSubmission: Date;
  caseNumber: number;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getJSON().subscribe((list: task[]) => {
      this.tasksList = list;
      this.orderList();
    })
  }
  orderList() {
    this.tasksList.sort((a, b) => new Date(a.deadlineForSubmission).getTime() - new Date(b.deadlineForSubmission).getTime());
  }
  getJSON() {
    return this.http.get("../../../assets/tasks.json");
  }
  addTask() {
    if (this.tasksList.length == 5)
      return;
    var today = new Date();
    var isToday = (today.toDateString > this.deadlineForSubmission.toDateString);
    if (isToday) {
      this.deadlineForSubmission = null;
      return;
    }
    if (this.tasksList.find(tsk => tsk.caseNumber == this.caseNumber && tsk.deadlineForSubmission == this.deadlineForSubmission && tsk.description == this.newTaskControl.value)!=undefined)
      return;
    var i = new task();
    i.caseNumber = this.caseNumber;
    i.deadlineForSubmission = this.deadlineForSubmission;
    i.description = this.newTaskControl.value;
    
    this.tasksList.push(i);
    this.orderList();

  }
  deleteTask(index: number) {
    this.tasksList.splice(index - 1, 1);
  }

}
