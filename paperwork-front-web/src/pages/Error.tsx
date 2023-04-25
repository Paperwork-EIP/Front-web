import React from 'react';
import Navbar from '../components/Navbar';
import "../styles/pages/Error.scss";
import { BiPlusCircle} from 'react-icons/bi';
import { HiLightBulb } from 'react-icons/hi';
import { MdCalendarMonth, MdPerson } from 'react-icons/md';

const ErrorPage = () => {
    return (
        <div className="Error">
            <Navbar/>
            <div className='Error-container'>
                <img src="assets/404error-page/404errorBg.png" alt="404error_cover_image" />
            </div>
            <div className='EmailSent-connections'>
                        <a className='EmailSent-button-api' href="/profile">
                            <MdPerson/>
                        </a>
                        <a className='EmailSent-button-api' href="/calendar">
                            <MdCalendarMonth/>
                        </a>
                        <a className='EmailSent-button-api' href="/quiz">
                            <BiPlusCircle/>
                        </a>
                        <a className='EmailSent-button-api' href="/processidea">
                            <HiLightBulb/>
                        </a>
                    </div>
        </div>
    );
}

export default ErrorPage;