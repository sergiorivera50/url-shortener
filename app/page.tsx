'use client';
import styles from './page.module.css';
import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

export default function Page() {
  const urlRef = useRef(null);
  const [binding, setBinding] = useState(null);

  const { mutate: createBinding } = useMutation({
    mutationFn: async (url) => {
      const response = await fetch(
        'api/binding/new',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        },
      );
      return response.json();
    },
    onSuccess: (data) => setBinding(data['binding']),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createBinding(urlRef.current.value);
  };

  const host: string = process.env.NEXT_PUBLIC_HOST;

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="url">Shorten my URL! ✨</label>
        {binding ? (
          <a
            style={{ textAlign: 'center', textDecoration: 'underline', color: 'blue' }}
            target="_blank"
            href={binding['longURL']}
          >{host}/{binding['shortURL']}</a>
        ) : (
          <div className={styles.action}>
            <input id="url" type="url" ref={urlRef} required />
            <button className={styles.submit}>Submit</button>
          </div>
        )}
      </form>
    </main>
  );
}
