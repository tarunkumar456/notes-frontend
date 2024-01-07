import React from 'react';
import {
  ChakraProvider,
  
  theme,
} from '@chakra-ui/react';

import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Add from './components/Add';
import { createContext, useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Edit from './components/Edit';
import Notfound from './components/Notfound';

export const usercontext = createContext(null);
function App() {

  const [loading, setloading] = useState(true);

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Header />
        <usercontext.Provider value={{loading, setloading}}>
          <Routes>
            <Route path={'/'} element={<Home />}></Route>
            <Route path={'/login'} element={<Login/>}></Route>
            <Route path={'/register'} element={<Register/>}></Route>
            <Route path={'/add'} element={<Add />}></Route>
            <Route path={'/edit/:id'} element={<Edit />}></Route>
            <Route path={'*'} element={<Notfound/>}></Route>
          </Routes>
        </usercontext.Provider>

      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
