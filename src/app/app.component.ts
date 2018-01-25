import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // save stuff to local storage

  // public newTodo: {
  //   title: 'asdf',
  //   description: 'asdf',
  //   urgent: null,
  //   done: null
  // };

  public todosFiltered: any;

  public todos: Array<any> = [
    {
      title: 'clean katzenkisterl',
      description: 'do it every second day, bag is outside the window',
      urgent: true,
      done: false
    },
    {
      title: 'hang up clothes',
      description: 'take clothes out of washing machine, hang them up in the bedroom',
      urgent: false,
      done: false
    }
  ];

  public ngOnInit() {
    this.todosFiltered = this.todos;
  }

  public searchForTodo(event) {
    if (event.target.value === '' || event.target.value !== '' && event.keyCode === 13) {
      this.todosFiltered = this.todos.filter(elem => {
        return (elem.title).includes(event.target.value) || (elem.description).includes(event.target.value);
      });
    }
  }

  public onSubmit() {
    console.log('triggered');
    // if (this.myform.valid) {
    //   console.log("Form Submitted!");
    // }
  }
}
