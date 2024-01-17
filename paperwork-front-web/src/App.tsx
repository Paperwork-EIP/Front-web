import {
    ChakraProvider,
    ColorModeScript
} from '@chakra-ui/react';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';
import RegisterPage from './pages/Register';
import ProcessResult from './pages/ProcessResult';
import ProcessIdea from './pages/ProcessIdea';
import CalendarPage from './pages/Calendar';
import HelpPage from './pages/Help';
import LexiconPage from './pages/Lexicon';
import ResetPasswordPage from './pages/ResetPassword';
import VerifyEmailPage from './pages/VerifyEmail';
import EmailSentPage from './pages/EmailSent';
import QuizPage from './pages/QuizPages/Quiz';
import QuizQuestion from './pages/QuizPages/QuizQuestion';
import GooglePage from './pages/Google';
import WelcomePage from './pages/Welcome';
import AboutUsPage from './pages/AboutUs';

import 'react-toastify/dist/ReactToastify.css';
import "./styles/styles.scss";

const App = () => {
    return (

        <div className="App">
            <ChakraProvider>
                <ColorModeScript initialColorMode="light" />
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/aboutus" element={<AboutUsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/lexicon" element={<LexiconPage />} />
                    <Route path="/resetPassword" element={<ResetPasswordPage />} />
                    <Route path="/verifyEmail" element={<VerifyEmailPage />} />
                    <Route path="/emailSent" element={<EmailSentPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/quiz" element={<QuizPage />} />
                    <Route path="/quiz/:processSelected/:processTitle" element={<QuizQuestion />} />
                    <Route path="/processResult/:processSelected" element={<ProcessResult />} />
                    <Route path="/processIdea" element={<ProcessIdea />} />
                    <Route path="/googleLogin" element={<GooglePage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </ChakraProvider>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    )
};

export default App;