import React, { useState } from 'react';
import image_home from '../assets/todo.png'
import Modal from './Modal';
import styles from '../styles/home.module.scss';
import {BsCheckLg} from '/react-icons/Bs'

export default function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    localStorage.clear()
    console.log(localStorage)
    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };

  return (
    <>
    <main className={styles.home_container}>
      
      <div className = {styles.center}>
      <div className={styles.intro_container}>
      <h1> Ma TODO Liste</h1>
            <p>
            <BsCheckLg/> Organisation  <br/> <BsCheckLg/> Productivité<br/> <BsCheckLg/> Efficacité<br/>
            Je retrouve toutes mes tâches à réaliser en un clin d'oeil.  
          </p>
        
        <div className={styles.buttons_container}>
          <button onClick={openModal} className={styles.button}>C'est parti !</button>
        </div>
      </div>

      <div className={styles.image_container}>
        <img src={image_home} alt="image d'accueil" />
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        {/* Contenu de votre modale */}
      </Modal>
      </div>
    </main>
    <footer>
      <p>© 2023 - Tous droits réservés</p>
    </footer>
    </>
  );
}
