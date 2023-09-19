'use client';
import styles from './page.module.css';
import { useRef, useState } from 'react';

export default function Page() {
  const urlRef = useRef(null);
  const [binding, setBinding] = useState(null);

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
    const data = await response.json();
    setBinding(data['binding']);
  };

  const host = 'http://localhost:3000/';

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="url">Shorten my URL! ✨</label>
        {binding ? (
          <a
            style={{ textAlign: 'center', textDecoration: 'underline', color: 'blue' }}
            target="_blank"
            href={binding['longURL']}
          >{host}{binding['shortURL']}</a>
        ) : (
          <div className={styles.action}>
            <input id="url" type="url" ref={urlRef} />
            <button className={styles.submit}>Submit</button>
          </div>
        )}
      </form>
    </main>
  );
}
