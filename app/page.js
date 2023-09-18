import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <label htmlFor="url">Shorten my URL! ✨</label>
        <div className={styles.action}>
          <input id="url" type="url" />
          <button className={styles.submit}>Submit</button>
        </div>
      </form>
    </main>
  );
}
