import styles from '../styles/modal.module.scss';
import Form from './Form';

const Modal = ({ isOpen, onClose }) => {
   
    const handleContentClick = (e) => {
      e.stopPropagation();
    };
  
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className={styles.modal} onClick={onClose}>
        <div className={styles.modalOverlay}></div>
        <div className={styles.modalContent} onClick={handleContentClick}>
          <div className={styles.modalInnerContent}>
            <Form />
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  
  
  
  
  
  
  
  
  
  
  

