import styles from "../styles/form.module.scss"
import Button from "./Button"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMail, setErrorMail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [loginError, setLoginError] = useState('')
 // const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate()
  
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  
  const handleSignUp = (e) => {
    e.preventDefault();
  
    if (!emailRegex.test(email)) {
        setErrorMail('Adresse e-mail invalide');
      } 

    if (password.length < 6){
      setErrorPassword('mot de passe trop court')
      return;
    }

    const requestData = {
      email: email,
      password: password
    };
  
    axios.post('http://localhost:8000/api/auth/signup', requestData)
      .then(response => {
        console.log(response.data);
        // Vérifie si la création du compte est réussie avant de connecter l'utilisateur
        if (response.status === 201) {
          handleSignIn(e);
        } else {
          // Gérer le cas d'erreur de création du compte
        }
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
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('email', response.data.email)
          const id = response.data.userId
          navigate (`/todo-list/${id}`)
          const emailResponse = response.data.email
         // setUserEmail={emailResponse}
          console.log(localStorage)
        })
        .catch(error => {
          console.error(error);
          setLoginError('Echec, vérifiez votre email et votre mot de passe')
        });
      };

    return(
        <>
        <form >
        {loginError && <span className={styles.span_error}>{loginError}</span>}
            <div className={styles.label_input}>
                <label htmlFor="email" >Adresse Email *</label>
                <input id ="email" name="email" type = "email"
                required
                onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMail(""); // Réinitialise l'erreur à une valeur vide
                    setLoginError('')
                  }}
                />
                {errorMail && <span className={styles.span_error}>{errorMail}</span>}
            </div>
            <div className={styles.label_input}>
                <label htmlFor="password" >Mot de passe *</label>
                <input id="password" name ="password"  type="password"
                required
                onChange= {(e)=>{
                  setPassword(e.target.value)
                  setErrorPassword(""); // Réinitialise l'erreur à une valeur vide
                  setLoginError('')
                }}
                />
                {errorPassword && <span className={styles.span_error}>{errorPassword}</span>}
            </div>
            <div className={styles.buttons_container}>
                <Button  text="Se connecter" action ={handleSignIn}/>
                <Button  text="S'inscrire" action={ handleSignUp} />
            </div>
        </form>
        
      </>
    )
}