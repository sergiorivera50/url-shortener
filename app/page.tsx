import styles from './page.module.css';
import { createURLBinding } from '../utils/prisma';

export default function Page() {
  async function create(formData: FormData): Promise<void> {
    'use server';

    const longURL: string = formData.get('url').toString();
    const shortURL: string = await createURLBinding(longURL);
    console.log(`New URL binding created: ${shortURL} => ${longURL}`);
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
