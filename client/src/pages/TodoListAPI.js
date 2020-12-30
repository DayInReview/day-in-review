import API from "../API";

const API_URL = "/todos/"

async function createTodo(task) {
  const { data: newTodo } = await API.post(API_URL, {
    task,
  })
  return newTodo
}

async function deleteTodo(id) {
  const message = await API.delete(`${API_URL}${id}`)
  return message
}

async function updateTodo(id, payload) {
  const { data: newTodo } = await API.put(`${API_URL}${id}`, payload)
  return newTodo
}

async function getAllTodos() {
  const { data: todos } = await API.get(API_URL)
  return todos
}

export default { createTodo, deleteTodo, updateTodo, getAllTodos }
