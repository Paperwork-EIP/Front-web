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
import QuizPage from './pages/QuizPages/Quiz';
import QuizQuestion from './pages/QuizPages/QuizQuestion';
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

  const ongoingProcess = {
    // Variable temporaire remplacant le JSON reçu par Home (afin de tester la page)
    "list": [
      {
        "process": "VLS-TS",
        "percentage": 25,
      },
      {
        "process": "Residence Permit",
        "percentage": 50,
      },
      {
        "process": "French Nationality",
        "percentage": 0,
      },
      {
        "process": "Work Permit",
        "percentage": 50,
      },
      {
        "process": "Travel Document",
        "percentage": 0,
      },
      {
        "process": "Visa",
        "percentage": 25,
      },
      {
        "process": "Vital card",
        "percentage": 75,
      },
      {
        "process": "Driver License",
        "percentage": 25,
      },
    ],
  }

  const events = {
    // Variable temporaire remplacant le JSON reçu par Calendar (afin de tester la page)
    "list": [
      {
        "date": "2023-01-01 17:00:00",
        "object": "CPAM social security number 3 Pl. Adolphe Chérioux 75015 Paris",
      },
      {
        "date": "2023-01-07 17:00:00",
        "object": "RDV Vital Card 5 Av. de la porte de Montmartre 75018 Paris",
      },
      {
        "date": "2023-01-09 17:00:00",
        "object": "RDV Residence Permit 5 Av. de la porte de Montmartre 75018 Paris",
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
            <Route path="/home" element={<HomePage ongoingProcess={ongoingProcess} />}/>
            <Route path= "/profile" element={<ProfilePage/>}/>
            <Route path= "/calendar" element={<CalendarPage events={events}/>}/>
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