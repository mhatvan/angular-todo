import { Component, OnInit } from '@angular/core';
import { Todo } from './shared/models/todo.model';
import { TodoService } from './shared/services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public todos: Array<Todo> = [];
  public todosFiltered: Array<Todo> = [];
  public selectedTodos: Array<Todo> = [];
  public newTodo: Todo = {
    id: -1,
    title: '',
    description: '',
    urgent: false,
    done: false,
    category: ''
  };

  public activeTodo: Todo = null;

  public messageText: string = '';
  private timeout: number = 7000;

  public categories: Array<string> = ['Pets', 'Household', 'Work'];

  constructor(private todoService: TodoService) {}

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.todoService.getAllTodos().subscribe(
      (res: Array<Todo>) => {
        this.todos = res;
        this.todosFiltered = this.todos;
      },
      error => {
        console.error(error);
      }
    );
  }

  public createNewTodo(newTodo: Todo): void {
    if (this.newTodo.title && this.newTodo.description) {
      this.newTodo.id = this.todos.length + 1;

      this.todoService.createNewTodo(newTodo).subscribe(
        (res: Todo) => {
          this.messageText = `successfully created new Todo: '${res.title}' !`;
          this.loadData();
        },
        error => {
          console.error(error);
        }
      );

      setTimeout(() => {
        this.messageText = '';
      }, this.timeout);
    }
  }

  public searchForTodo(event): string | void {
    if (event.target.value === '' || (event.target.value !== '' && event.keyCode === 13)) {
      this.todosFiltered = this.todos.filter(elem => {
        return (
          elem.title.includes(event.target.value) || elem.description.includes(event.target.value)
        );
      });
    }
  }

  public updateSingleTodo(): void {
    this.todosFiltered.find(
      (elem: Todo): any => {
        if (elem.id === this.activeTodo.id) {
          this.todoService.updateSingleTodo(this.activeTodo).subscribe(
            () => {
              this.messageText = `successfully updated '${this.activeTodo.title}' !`;
              this.activeTodo = null;
              this.loadData();
            },
            error => {
              console.error(error);
            }
          );

          setTimeout(() => {
            this.messageText = '';
          }, this.timeout);
        }
      }
    );
  }

  public onSelectTodo(selectedTodo: Todo): void {
    if (this.selectedTodos.indexOf(selectedTodo) > -1) {
      this.selectedTodos.splice(this.selectedTodos.indexOf(selectedTodo), 1);
    } else {
      this.selectedTodos.push(selectedTodo);
    }
  }

  public deleteCompletedTodos(): void {
    const messageText = `successfully deleted ${this.selectedTodos.length} todos!`;
    this.selectedTodos.forEach(selectedTodo => {
      this.deleteSingleTodo(selectedTodo, messageText);
    });
  }

  public deleteSingleTodo(selectedTodo: any, messageText: string): void {
    this.todoService.deleteSingleTodo(selectedTodo.id).subscribe(
      () => {
        this.messageText = messageText
          ? messageText
          : `successfully deleted ${selectedTodo.title} !`;
        this.loadData();
      },
      error => {
        console.error(error);
      }
    );

    setTimeout(() => {
      this.messageText = '';
    }, this.timeout);
  }
}
