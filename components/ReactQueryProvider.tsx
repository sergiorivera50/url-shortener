'use client';

import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
