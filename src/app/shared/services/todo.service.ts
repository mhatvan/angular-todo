import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable()
export class TodoService {
  constructor(private http: HttpClient) {}

  public getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/todos');
  }

  public createNewTodo(newTodo: Todo): Observable<Todo> {
    return this.http.post<Todo>('http://localhost:3000/todos', newTodo);
  }

  public deleteSingleTodo(selectedTodo: Todo): Observable<{}> {
    return this.http.delete(`http://localhost:3000/todos/${selectedTodo}`);
  }

  public updateSingleTodo(selectedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`http://localhost:3000/todos/${selectedTodo.id}`, selectedTodo);
  }
}
