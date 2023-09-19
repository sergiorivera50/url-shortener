import styles from './page.module.css';
import { createURLBinding, fetchLongURL } from '../utils/mongo';
import crypto from 'crypto';

export default function Page() {
  async function create(formData: FormData): Promise<void> {
    'use server';

    try {
      const longURL: string = formData.get('url').toString();
      const shortURL: string = crypto.randomBytes(4).toString('hex');
      await createURLBinding(longURL, shortURL);
      console.log(`URL binding created for ${longURL} (${shortURL})`);
      const binding = await fetchLongURL(shortURL);
      console.log(`From DB: ${JSON.stringify(binding)}`);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <main className={styles.main}>
      <form className={styles.form} action={create}>
        <label htmlFor="url">Shorten my URL! ✨</label>
        <div className={styles.action}>
          <input id="url" name="url" type="url" />
          <button className={styles.submit}>Submit</button>
        </div>
      </form>
    </main>
  );
}
