import styles from '../styles/todo.module.scss'
import { useState } from 'react'
import data from '../data.json'
import checked from '../assets/check.png'
import trash from '../assets/trash.png'


export default function Todo(){
    const [todo, setTodo] = useState("")
    return (
      <div className={styles.todos_wrapper}>
        <div className={styles.input_wrapper}>
            <input className={styles.input_todo} type ="text" placeholder="Quelle est votre tâche ?"/>
            <button className={styles.add_button}>Ajouter</button>
        </div>

        <ul>
          {data.map((todo,index) => 
          <li key ={index}>
              <div className={styles.todo}>

                <div className={styles.todo_name}>
                  {todo.todo}
                </div>

                <div className ={styles.icone_container}> 
                  <img src = {checked} alt="icone checked" />
                  <img src = {trash} alt="icone checked" />
                </div>
                
            </div>
          </li>)}
        </ul>

      </div>

    )
}

