import React, { useState, useEffect } from 'react';
import styles from '../styles/todo.module.scss';
import checked from '../assets/check.png';
import trash from '../assets/trash.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Todo() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const email = localStorage.getItem('email');
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate();

  useEffect(() => {
    // Effectue la requête GET pour récupérer les todos depuis l'API
    axios
      .get(`http://localhost:8000/api/todo?userId=${userId}`)
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  function logout() {
    localStorage.clear();
    console.log(localStorage);
    navigate('/');
  }

  const handleAddTodo = e => {
    e.preventDefault();

    const requestData = {
      userId: localStorage.getItem('userId'),
      todo: todo
    };

    axios
      .post('http://localhost:8000/api/todo/add', requestData)
      .then(response => {
        console.log(response);
        // Met à jour la liste des todos après l'ajout
        setTodos(prevTodos => [...prevTodos, response.data]);
        console.log(todos)
        setTodo('');
      })
      .catch(error => {
        console.error(error);
      });
  };
  const handleDeleteTodo = (index) =>{
    const id = todos[index]._id
    console.log (id)
    axios.delete(`http://localhost:8000/api/todo/${id}`)
    .then(response => {
      // Mettez à jour la liste des todos après la suppression
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      console.log('todos après supression')
    })
    .catch(error => {
      console.error(error);
    });
};

 
  return (
    <div className={styles.todos_wrapper}>
      <p>Hello {email}</p>
      <p onClick={logout}>Se deconnecter</p>
      <div className={styles.input_wrapper}>
        <input
          className={styles.input_todo}
          type="text"
          autoFocus
          placeholder="Que devez-vous faire ?"
          value={todo}
          onChange={e => setTodo(e.target.value)}
        />
        <button type="button" className={styles.add_button} onClick={handleAddTodo}>
          Ajouter
        </button>
      </div>

      <ul>
        {todos.map((todoItem, index) => (
          <li key={index}>
            <div className={styles.todo}>
              <div className={styles.todo_name}>{todoItem.todo}</div>
              <div className={styles.icone_container}>
                <img src={checked} alt="icone checked" />
                <img onClick={() => handleDeleteTodo(index)}src={trash} alt="icone checked" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


