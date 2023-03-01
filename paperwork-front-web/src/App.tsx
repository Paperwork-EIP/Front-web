import {
  ChakraProvider,
  ColorModeScript
} from '@chakra-ui/react';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';
import RegisterPage from './pages/Register';
import ProcessResult from './pages/ProcessResult';
import ProcessIdea from './pages/ProcessIdea';
import CalendarPage from './pages/Calendar';
import HelpPage from './pages/Help';
import ForgotPasswordPage from './pages/ForgotPassword';
import QuizPage from './pages/QuizPages/Quiz';
import QuizQuestion from './pages/QuizPages/QuizQuestion';
import GooglePage from './pages/Google';
import FacebookPage from './pages/Facebook';

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
            <Route path= "/help" element={<HelpPage/>}/>
            <Route path= "/forgotPassword" element={<ForgotPasswordPage/>}/>
            <Route path= "/quiz" element={<QuizPage/>}/>
            <Route path="/quiz/:processSelected/:step" element={<QuizQuestion/>}/>
            <Route path="/processResult/:processSelected" element={<ProcessResult/>}/>
            <Route path= "/processIdea" element={<ProcessIdea/>}/>
            <Route path= "/googleLogin" element={<GooglePage/>}/>
            <Route path= "/facebookLogin" element={<FacebookPage/>}/>
            <Route path="*" element={<ErrorPage />}/>
          </Routes>   
      </ChakraProvider>
    </div>
  )
};

export default App;