import { redirect } from 'next/navigation';
import { fetchLongURL } from '../../utils/mongo';

export default async function Page({ params }) {
  const url = await fetchLongURL(params['hash']);

  if (url === undefined) {
    redirect('/');
  } else {
    redirect(url);
  }
}