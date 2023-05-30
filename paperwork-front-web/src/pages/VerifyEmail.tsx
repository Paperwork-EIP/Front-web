import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Cookies from 'universal-cookie';
import "../styles/VerifyEmail.scss";
import axios from "axios";
import { BiCheckShield, BiPlusCircle } from 'react-icons/bi';
import { HiLightBulb } from 'react-icons/hi';
import { MdCalendarMonth, MdHelpOutline, MdHome, MdPerson } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

function VerifyEmailPage() {

    const api = process.env.REACT_APP_BASE_URL;
    const url = new URL(window.location.href);
    const cookies = new Cookies();
    const { t } = useTranslation();

    useEffect(() => {
        axios.get(`${api}/user/verifyEmail?token=${url.searchParams.get('token')}`)
            .then(async res => {
                cookies.set('loginToken', { loginToken: url.searchParams.get('token')}, {
                    path: '/',
                    secure: true,
                    sameSite: 'none'
                })
            }).catch(err => {
                console.log(err)
            });
    })

    return (
        <>
            <div className="VerifyEmail">
                <Navbar />
                <div className='VerifyEmail-container'>
                    <div className='VerifyEmail-container-right'>
                        <h1><BiCheckShield className='VerifyEmail-validate-icon' size={50} color='green' />{t('verifyEmail.icon')}</h1>
                        <h3>{t('verifyEmail.verified')}</h3>
                        <div className='VerifyEmail-title-top'>{t('verifyEmail.titleTop')}</div>
                        <a href='/home' className='VerifyEmail-title'><MdHome className='VerifyEmail-title-icons' size={30} />{t('verifyEmail.home')}</a>
                        <a href='/profile' className='VerifyEmail-title'><MdPerson className='VerifyEmail-title-icons' size={30} />{t('verifyEmail.profile')}</a>
                        <a href='/calendar' className='VerifyEmail-title'><MdCalendarMonth className='VerifyEmail-title-icons' size={30} />{t('verifyEmail.calendar')}</a>
                        <a href='/help' className='VerifyEmail-title'><MdHelpOutline className='VerifyEmail-title-icons' size={30} />{t('verifyEmail.help')}</a>
                        <a href='/quiz' className='VerifyEmail-title'><BiPlusCircle className='VerifyEmail-title-icons' size={30} />{t('verifyEmail.newProcess')}</a>
                        <a href='/processidea' className='VerifyEmail-title'><HiLightBulb className='VerifyEmail-title-icons' size={30} />{t('verifyEmail.processIdea')}</a>
                        <div className='VerifyEmail-form'>
                        </div>
                    </div>
                    <div className='VerifyEmail-container-left'>
                        <div className="VerifyEmail-images">
                            <img className="image1" src="assets/verifyemail-page/BgVerify.png" alt="verify_email_cover_image" />
                            <img className="image2" src="assets/verifyemail-page/VerifyImage.png" alt="verify_email_front_image" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VerifyEmailPage;