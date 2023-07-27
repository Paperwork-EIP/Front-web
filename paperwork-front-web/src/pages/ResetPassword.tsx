import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import "../styles/ResetPassword.scss";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

function ResetPasswordPage() {
    
    const api = process.env.REACT_APP_BASE_URL;
    const url = new URL(window.location.href);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { t } = useTranslation();

    function handleSubmit() {
        axios.get(
            `${api}/user/resetPassword?token=${url.searchParams.get('token')}&password=${password}`,
            ).then(res => {
                toast.success(t('resetPassword.resetPasswordSuccess'));
                window.location.replace('/login');
            }).catch(err => {
                toast.error(t('resetPassword.resetPasswordFail'));
                console.log(err);
            })
    };

    function handleinputFilled() {
        if (password && confirmPassword) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }

    useEffect(() => {
        handleinputFilled();
    });

    function errorSubmit() {
        toast.warning(t('resetPassword.divPasswords'))
    };


    return (
        <>
            <Navbar/>
            <div className="ResetPassword">
            <div className='ResetPassword-container'>
                <div className='ResetPassword-container-right'>
                <div className='ResetPassword-title-top'>{t('resetPassword.titleTop')}</div>
                    <div className='ResetPassword-title'>{t('resetPassword.title')}</div>
                    <div className='ResetPassword-box-password'>
                    <div className="ResetPassword-password-input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="ResetPassword-password-input"
                            placeholder={t('resetPassword.passwordInput') || ''}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="ResetPassword-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <AiFillEyeInvisible/> : <AiFillEye/>}
                        </span>
                    </div>
                    <div className="ResetPassword-password-input-wrapper">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="ResetPassword-password-input"
                            placeholder={t('resetPassword.confirmPasswordInput') || ''}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <span className="ResetPassword-password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <AiFillEyeInvisible/> : <AiFillEye/>}
                        </span>
                    </div>
                    <button className={buttonDisabled ? 'ResetPassword-submit-button disabled' : 'ResetPassword-submit-button'} type='submit' aria-label='button-resetpassword' onClick={password === confirmPassword ? handleSubmit : errorSubmit} disabled={buttonDisabled}>
                        {t('resetPassword.validate')}
                    </button>
                </div>
                </div>
                
                <div className='ResetPassword-container-left'>
                    <div className="ResetPassword-images">
                        <img className="image1" src="assets/resetpassword-page/BgResetPassword.png" alt="ResetPassword_background_image"/>
                        <img className="image2" src="assets/resetpassword-page/ResetPassword-bro.svg" alt="ResetPassword_bro_image" />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ResetPasswordPage;