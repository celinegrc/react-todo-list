import React, { useState, useEffect } from 'react';
import styles from '../styles/todo.module.scss';
import checked from '../assets/check.png';
import trash from '../assets/trash.png'
import {FiLogOut} from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Todo() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false)
  const email = localStorage.getItem('email');
  const userId = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    // Effectue la requête GET pour récupérer les todos depuis l'API
    axios
      .get(`http://localhost:8000/api/todo?userId=${userId.id}`)
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

    axios.post('http://localhost:8000/api/todo/add', requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
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
    axios.delete(`http://localhost:8000/api/todo/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      console.log('todos après supression')
    })
    .catch(error => {
      console.error(error);
    });
};

const handleCompleted = (index) => {
  const id = todos[index]._id;

  const updatedTodos = todos.map((todo, i) => {
    if (i === index) {
      return { ...todo, isCompleted: !todo.isCompleted };
    }
    return todo;
  });

  setTodos(updatedTodos);

  axios
    .put(`http://localhost:8000/api/todo/${id}`, updatedTodos[index], {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      console.log('Todo updated:', response.data);
    })
    .catch(error => {
      console.error(error);
    });
};

    
  return (
    <>
    <div className={styles.h1_todo}>
      <h1 >Ma todo liste</h1>
      <div className={styles.info_user}>
        <p> 👋 {email.split('@')[0]} </p>
        <p onClick={logout}className={styles.logout}>  Quitter <FiLogOut /> </p>
      </div>
    </div>
    <div className={styles.todos_wrapper}>
      
      <div className={styles.input_wrapper}>
        <input
          className={styles.input_todo}
          type="text"
          autoFocus
          placeholder="Que devez-vous faire ?"
          value={todo}
          onChange={e => setTodo(e.target.value)}
          maxLength='30'
        />
        <button type="button" className={styles.add_button} onClick={handleAddTodo}>
          Ajouter
        </button>
      </div>

      <ul>
        {todos.map((todoItem, index) => (
          <li key={index}>
            <div className={styles.todo}>
              <div className={todoItem.isCompleted ? styles.todo_name_active : styles.todo_name}>{todoItem.todo}</div>
              <div className={styles.icone_container}>
                <img 
                  className={todoItem.isCompleted ? styles.todo_check_active : styles.todo_check}
                  onClick={() => handleCompleted(index)} 
                  src={checked} 
                  alt="icone checked" 
                />
                <img 
                  onClick={() => handleDeleteTodo(index)} 
                  src={trash} 
                  alt="icone checked" 
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}


