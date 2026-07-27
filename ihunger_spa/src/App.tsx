import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './styles/theme';

import { AuthProvider } from './hooks/auth';
import { CartProvider } from './hooks/cart';
import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <CartProvider>
          <Routes />
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  </Router>
);

export default App;
