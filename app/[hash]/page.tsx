'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page({ params }) {
  const router = useRouter();

  useEffect(() => {
    const fetchURL = async (): Promise<string> => {
      const response = await fetch(`api/binding/${params.hash}`);

      if (!response.ok) {
        return '/';
      }

      const data = await response.json();
      return data['url'];
    };

    fetchURL()
      .then(url => router.push(url));
  }, []);
}
