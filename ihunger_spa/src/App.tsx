import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './styles/theme';

import { AuthProvider } from './hooks/auth';
import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  </Router>
);

export default App;
