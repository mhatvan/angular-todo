import { Component } from '@angular/core';
import { OnInit, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public displayMessage: boolean = false;
  public messageText: string = '';

  private timeout: number = 5000;

  public todos: Array<Todo> = [];
  public todosFiltered: Array<Todo>;

  public activeTodo: Todo = {
    id: -1,
    title: '',
    description: '',
    urgent: null,
    done: null,
    category: ''
  };

  public categories: any = ['Household', 'Work', 'Pets'];


  public defaultTodos: Array<Todo> = [
    {
      id: 1,
      title: 'clean katzenkisterl',
      description: 'do it every second day, bag is outside the window',
      urgent: true,
      done: false,
      category: 'Pets'
    },
    {
      id: 2,
      title: 'hang up clothes',
      description: 'take clothes out of washing machine, hang them up in the bedroom',
      urgent: false,
      done: false,
      category: 'Household'
    }
  ];


  public ngOnInit(): void {
    this.todosFiltered = this.todos = JSON.parse(localStorage.getItem('todos')) || JSON.parse(localStorage.getItem('todosNoCompleted'));
    if (!this.todos) {
      this.todosFiltered = this.todos = this.defaultTodos;
    }
  }

  public createNewTodo(): void {
    if (this.activeTodo.title && this.activeTodo.description) {
      this.activeTodo.id = this.todosFiltered.length + 1;
      this.todos.push(this.activeTodo);
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.todosFiltered = this.todos = JSON.parse(localStorage.getItem('todos'));

      this.displayMessage = true;
      this.messageText = 'successfully created new Todo!';
      setTimeout(() => {
        this.displayMessage = false;
      }, this.timeout);
    }
  }

  public searchForTodo(event): string | void {
    if (event.target.value === '' || event.target.value !== '' && event.keyCode === 13) {
      this.todosFiltered = this.todos.filter(elem => {
        return (elem.title).includes(event.target.value) || (elem.description).includes(event.target.value);
      });
    }
  }

  public saveActiveTodo(activeTodo): void {
    this.todosFiltered.find((elem: Todo): any => {
      if (elem.id === activeTodo.id) {
        elem = activeTodo;
        localStorage.clear();
        localStorage.setItem('todosNoCompleted', JSON.stringify(this.todosFiltered));
      }
    });
  }

  public deleteCompletedTodos() {
    this.todosFiltered = this.todos.filter(elem => !elem.done);
    localStorage.clear();
    if (this.todosFiltered.length) {
      localStorage.setItem('todosNoCompleted', JSON.stringify(this.todosFiltered));
    }
  }

  public deleteSingleTodo(todo, index) {
    this.todosFiltered = this.todosFiltered.filter(elem => todo.id !== elem.id);
    localStorage.clear();
    if (this.todosFiltered.length) {
      localStorage.setItem('todosNoCompleted', JSON.stringify(this.todosFiltered));
    }
    this.messageText = `successfully deleted todo: '${todo.title}'!`;
    this.displayMessage = true;
    setTimeout(() => {
      this.displayMessage = false;
    }, this.timeout);
  }

}

interface Todo {
  id: number;
  title: string;
  description: string;
  urgent: boolean;
  done: boolean;
  category: string;
}
