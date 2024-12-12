import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from './pages/home';
import { CartProvider } from './context/CartContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
       <CartProvider>
      <Router>
        <Routes>
          <Route path="/" >
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;