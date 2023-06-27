import styles from "../styles/form.module.scss"
import Button from "./Button"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 // const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate()
  
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  
  const handleSignUp = (e) => {
    e.preventDefault();
  
    if (!emailRegex.test(email)) {
        setError('Adresse e-mail invalide');
      } else {
        setError('');
      }
    
    const requestData = {
      email: email,
      password: password
    };
  
    axios.post('http://localhost:8000/api/auth/signup', requestData)
      .then(response => {
        console.log(response.data);
        navigate ("/todo-list")
      })
      .catch(error => {
        console.error(error);
      });
    };
  

    const handleSignIn = (e) => {
      e.preventDefault();
         
      const requestData = {
        email: email,
        password: password
      };
    
      axios.post('http://localhost:8000/api/auth/login', requestData)
        .then(response => {
          console.log("connecté");
          navigate ("/todo-list")
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('email', response.data.email)
          const emailResponse = response.data.email
         // setUserEmail={emailResponse}
          console.log(localStorage)
        })
        .catch(error => {
          console.error(error);
        });
      };

    return(
        <>
        <form >
            <div className={styles.label_input}>
                <label htmlFor="email" >Adresse Email *</label>
                <input id ="email" name="email" type = "email"
                required
                onChange={(e) => {
                    setEmail(e.target.value);
                    setError(""); // Réinitialise l'erreur à une valeur vide
                  }}
                />
                {error && <span className={styles.span_error}>{error}</span>}
            </div>
            <div className={styles.label_input}>
                <label htmlFor="password" >Mot de passe *</label>
                <input id="password" name ="password"  type="password"
                required
                onChange= {(e)=>setPassword(e.target.value)}
                />
            </div>
            <div className={styles.buttons_container}>
                <Button  text="Se connecter" action ={handleSignIn}/>
                <Button  text="S'inscrire" action={ handleSignUp} />
            </div>
        </form>
        
      </>
    )
}