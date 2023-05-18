import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import "../styles/EmailSent.scss";
import { SiIonos, SiGmail, SiMicrosoftoutlook } from 'react-icons/si';
import { TbBrandYahoo } from 'react-icons/tb';
import { RiMailSendLine } from 'react-icons/ri';
import axios from 'axios';
import Cookies from 'universal-cookie';

function EmailSentPage() {

    const cookies = new Cookies();
    const api = process.env.REACT_APP_BASE_URL;
    const cookieList = cookies.get('loginToken');

    async function handleSubmit() {
        await axios.get(`${api}/user/sendVerificationEmail?token=${cookieList.loginToken}`
        ).then(res => {
            alert("Email sent successfully!");
        }).catch(err => {
            alert("Failure to send the verification email");
            console.log(err);
        })
    }

    useEffect(() => {
        if (!cookies.get('loginToken')) {
            window.location.assign('/');
        }
    });

    return (
        <>
        <div className="EmailSent">
            <Navbar/>
            <div className='EmailSent-container'>
                <div className='EmailSent-container-right'>
                    <RiMailSendLine size={50}/>
                    <div className='EmailSent-title-top'>An email has been sent !</div>
                    <div className='EmailSent-title'>Please check out your mailbox</div>
                    <div className='EmailSent-connections'>
                        <a className='EmailSent-button-api' href="https://mail.google.com/mail/u/0/#inbox">
                            <SiGmail />
                        </a>
                        <a className='EmailSent-button-api' href="https://outlook.live.com/owa/">
                            <SiMicrosoftoutlook />
                        </a>
                        <a className='EmailSent-button-api' href="https://login.yahoo.com">
                            <TbBrandYahoo />
                        </a>
                        <a className='EmailSent-button-api' href="https://login.yahoo.com">
                            <SiIonos />
                        </a>
                    </div>
                    <button className='EmailSent-receive-again' data-testid="send-email-again" onClick={handleSubmit}>
                        I didn't receive it
                    </button>
                </div>
                <div className='EmailSent-container-left'>
                    <div className="EmailSent-images">
                        <img className="image1" src="assets/emailsent-page/BgSent.png" />
                        <img className="image2" src="assets/emailsent-page/SentImage.png" />
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    );
}

export default EmailSentPage;