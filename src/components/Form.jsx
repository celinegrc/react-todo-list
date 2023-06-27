import styles from "../styles/form.module.scss"
import Button from "./Button"
import { useState } from "react";

export default function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!emailRegex.test(email)) {
        setError('Adresse e-mail invalide');
      } else {
        setError('');
        alert(`${password}, ${email}`);
      }
    };

    return(
        <>
        <form onSubmit={handleSubmit}>
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
                <Button type ="submit" text="Se connecter"  />
                <Button type ="submit" text="S'inscrire"  />
            </div>
        </form>
        
      </>
    )
}