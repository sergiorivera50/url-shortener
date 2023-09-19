'use client';
import styles from './page.module.css';
import { useRef } from 'react';

export default function Page() {
  const urlRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      'api/binding/new',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urlRef.current.value }),
      },
    );
    console.log(await response.json());
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="url">Shorten my URL! ✨</label>
        <div className={styles.action}>
          <input id="url" type="url" ref={urlRef} />
          <button className={styles.submit}>Submit</button>
        </div>
      </form>
    </main>
  );
}
