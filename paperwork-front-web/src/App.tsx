import {
  ChakraProvider,
  ColorModeScript
} from '@chakra-ui/react';
import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';
import RegisterPage from './pages/Register';
import CalendarPage from './pages/Calendar';
import QuizPage from './pages/QuizPages/Quiz';
import VitalCard1Page from './pages/QuizPages/VitalCard1';
import VitalCard2Page from './pages/QuizPages/VitalCard2';

const App = () => {
  return (
      
    <div className="App">
      <ChakraProvider>
        <ColorModeScript initialColorMode="light"/>
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path= "/profile" element={<ProfilePage/>}/>
            <Route path= "/calendar" element={<CalendarPage/>}/>
            <Route path= "/quiz" element={<QuizPage/>}/>
            <Route path= "/vitalcard1" element={<VitalCard1Page/>}/>
            <Route path= "/vitalcard2" element={<VitalCard2Page/>}/>
            <Route
              path="*"
              element={<ErrorPage />}
            />
          </Routes>   
      </ChakraProvider>
    </div>
  )
};

export default App;