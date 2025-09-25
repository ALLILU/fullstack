import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Todo = {
    title: string;
    id: number;
    completed: boolean;
} 

function Todo() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const[inputValue, setInputValue] = useState('');
    const[isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        console.log('value is changed')
        const fetchData = async () => {
            setIsLoading(true)
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
            console.log('response',response.data)
            setTodos(response.data.slice(0,10))
            setIsLoading(false)
        }
        fetchData()
    },[]) // simulate component did mount load data at initial render
 


    const handleAddTodo = () => {
        console.log('add todo');
    
        const newTodo : Todo = {
            title: inputValue,
            id: new Date().valueOf() ,
            completed: false
        }
        setTodos([...todos, newTodo])// ... spread operator to add the new todo to the todos array
        setInputValue('');
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('input change',event.target.value);
        setInputValue(event.target.value);
    }

    const handleDeleteTodo = (id: number) => {
        console.log('delete todo',id);
        const filteredTodo = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodo)
    }

    const handleCompleteTodo = (id: number) => {
        console.log('complete todo',id);
        const newTodos = todos.map((todo) => {
            if(todo.id === id){
                return {...todo, completed: !todo.completed}
            }
            return todo
        })
        setTodos(newTodos)
    }
 
    return (  
        <div >
        <div>Todo!</div>
            <br/>
            <input value={inputValue} onChange={handleInputChange}/>
            <button onClick={handleAddTodo}>Add</button>
            {isLoading && <div>Loading...</div>}
            {todos.map((todo) => {
               return (
                <div key={todo.id}>
                    <input type="checkbox" checked={todo.completed}onChange={() => handleCompleteTodo(todo.id)}/>
                    <span>{todo.title}</span>
                    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                </div> 
               )
            })}  
        </div>
    )
}

export default Todo;