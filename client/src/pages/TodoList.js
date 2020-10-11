import React, { Component } from 'react';
import './TodoList.css';
import TodoListAPI from "./TodoListAPI";
import Todo from "../components/Todo";

import {
  List,
  Input,
  Button
} from '@material-ui/core'

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todo: ""
    }
  }

  componentDidMount() {
    const fetchTodoAndSetTodos = async () => {
      const todos = await TodoListAPI.getAllTodos();
      this.setState({todos: todos});
    }
    fetchTodoAndSetTodos();
  }

  render() {  
    const createTodo = async e => {
      e.preventDefault()
      if (!this.state.todo) {
        alert("please enter something")
        return
      }
      if (this.state.todos.some(({ task }) => task === this.state.todo)) {
        alert(`Task: ${this.state.todo} already exists`)
        return
      }
      const newTodo = await TodoListAPI.createTodo(this.state.todo)
      this.setState({todos: [...this.state.todos, newTodo]})
      this.setState({todo: ''})
    }
  
    const deleteTodo = async (e, id) => {
      try {
        e.stopPropagation()
        await TodoListAPI.deleteTodo(id)
        this.setState({todos: this.state.todos.filter(({ _id: i }) => id !== i)})
      } catch (err) {}
    }
  
    const updateTodo = async (e, id) => {
      e.stopPropagation()
      const payload = {
        completed: !this.state.todos.find(todo => todo._id === id).completed,
      }
      const updatedTodo = await TodoListAPI.updateTodo(id, payload)
      this.setState({todos: this.state.todos.map(todo => (todo._id === id ? updatedTodo : todo))})
    }

    return(
      <div className="TodoList">
        {/* Add Todo */}
        <form onSubmit={e => createTodo(e)}>
          <Input 
            className="mb-3"
            placeholder="New todo"
            aria-label="New todo"
            value={this.state.todo}
            onChange={({ target }) => this.setState({todo: target.value})}
          >
          </Input>
          <Button type="submit" variant="outline-secondary">
            Add
          </Button>
        </form>

        {/* List of Todos */}
        <List>
          {this.state.todos.map(({ _id, task, completed }, i) => (
            <Todo 
              key={i}
              id={_id}
              completed={completed}
              task={task}
              delete={deleteTodo}
              update={updateTodo}
            />
          ))}
        </List>
      </div>
    );
  }
}
