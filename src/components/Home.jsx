import React, { useState } from 'react';
import image_home from '../assets/image_home.png'
import Button from './Button';
import Modal from './Modal';
import styles from '../styles/home.module.scss';

export default function Home() {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };

  return (
    <main className={styles.home_container}>
      <div className={styles.intro_container}>
        <p>Ici, je consulte toutes mes tâches à réaliser en un coup d’oeil</p>
        <p className={styles.home_intro_p}>Retrouvez votre TO DO list en ligne</p>
        <div className={styles.buttons_container}>
          <Button text="Se connecter" action={openModal} />
          <Button text="S'inscrire" action={openModal} />
        </div>
      </div>

      <div className={styles.image_container}>
        <img src={image_home} alt="image d'accueil" />
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        {/* Contenu de votre modale */}
      </Modal>
    </main>
  );
}
