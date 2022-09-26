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
import ProcessResult from './pages/ProcessResult';
import ProcessIdea from './pages/ProcessIdea';
import CalendarPage from './pages/Calendar';
import QuizPage from './pages/QuizPages/Quiz';
import VitalCard1Page from './pages/QuizPages/VitalCard1';
import VitalCard2Page from './pages/QuizPages/VitalCard2';
import GooglePage from './pages/Google';
import FacebookPage from './pages/Facebook';

const App = () => {
  // Variable temporaire remplacant le JSON reçu par ProcessResult (afin de tester la page)
  const processInfo = {
    "type": "Carte vitale",
    "tasks": [
      {
        "state": true,
        "description": "Take a appointment at the CPAM to this number : 01 84 90 36 46 (between 9 am and 6 pm)",
      },
      {
        "state": true,
        "description": "You must go to your appointement with your identity card and your residence permit (adress : 3 Pl. Adolphe Chérioux, 75015 Paris)",
      },
      {
        "state": false,
        "description": "Create an ameli account with your new social security number",
      },
      {
        "state": false,
        "description": "Go to your account process and select “carte vitale”",
      },
      {
        "state": false,
        "description": "Enter your scanned ID photo and your ID card and check your information and valide your request",
      },
    ],
  }

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
            <Route path= "/processResult" element={<ProcessResult processInfo={processInfo} />}/>
            <Route path= "/processIdea" element={<ProcessIdea/>}/>
            <Route path= "/googleLogin" element={<GooglePage/>}/>
            <Route path= "/facebookLogin" element={<FacebookPage/>}/>
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