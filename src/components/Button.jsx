import styles from '../styles/button.module.scss'

export default function Button({ text, action }) {
  return (
    <button onClick={action} className={styles.button}>
      <span>{text}</span>
    </button>
  )
}
