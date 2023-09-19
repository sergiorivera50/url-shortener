'use client';

import { redirect } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

export default function Page({ params }) {
  const { data, isError } = useQuery({
    retry: false,
    queryKey: ['hash', params.hash],
    queryFn: async () => {
      const response = await fetch(`api/binding/${params.hash}`);
      if (!response.ok) {
        throw new Error('Unable to fetch URL binding');
      }
      return await response.json();
    },
  });

  if (isError) {
    redirect('/');
  }

  if (data) {
    redirect(data.url);
  }
}
