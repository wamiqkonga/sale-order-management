import React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './components/Login';
import MainApp from './components/MainApp';
import { AuthProvider, useAuth } from './hooks/useAuth';

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          
            <Routes>
              <Route path="/app" element={<MainApp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element= {<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default App;
