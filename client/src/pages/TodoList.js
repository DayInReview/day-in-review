import React, { useState, useEffect } from 'react';
import './TodoList.css';
import TodoListAPI from "./TodoListAPI";
import Todo from "../components/Todo";

import {
  List,
  Input,
  Button
} from '@material-ui/core'

export default function TodoList(props) {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await TodoListAPI.getAllTodos();
      setTodos(todos);
    }
    fetchTodoAndSetTodos();
  })

  const createTodo = async e => {
    e.preventDefault()
    if (!todo) {
      alert("please enter something")
      return
    }
    if (todos.some(({ task }) => task === todo)) {
      alert(`Task: ${todo} already exists`)
      return
    }
    const newTodo = await TodoListAPI.createTodo(todo)
    setTodos([...todos, newTodo])
    setTodo("")
  }

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation()
      await TodoListAPI.deleteTodo(id)
      setTodos(todos.filter(({ _id: i }) => id !== i))
    } catch (err) {}
  }

  const updateTodo = async (e, id) => {
    e.stopPropagation()
    const payload = {
      completed: !todos.find(todo => todo._id === id).completed,
    }
    const updatedTodo = await TodoListAPI.updateTodo(id, payload)
    setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)))
  }

  return(
    <div className="TodoList">
      {/* Add Todo */}
      <form onSubmit={e => createTodo(e)}>
        <Input 
          className="mb-3"
          placeholder="New todo"
          aria-label="New todo"
          value={todo}
          onChange={({ target }) => setTodo(target.value)}
        >
        </Input>
        <Button type="submit" variant="outline-secondary">
          Add
        </Button>
      </form>

      {/* List of Todos */}
      <List>
        {todos.map(({ _id, task, completed }, i) => (
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
