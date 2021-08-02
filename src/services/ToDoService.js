import $api from "../http/https";

export default class ToDoService {
    static async createTodo(name) {
       return $api.post('/create-todo' ,{
            name: name,
            isDone: false
        })
    }

    static async deleteTodo(todo) {
        return $api.post('/delete-todo', todo);
    }
        
    static async editTodo(todo, todos) {
        return $api.post('/edit-todo', {todo, todos});
    }
        
}