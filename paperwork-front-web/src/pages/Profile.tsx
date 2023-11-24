import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import { FaCog } from 'react-icons/fa';

import { useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { getTranslation } from './Translation';
import Loading from '../components/Loading';

import "../styles/pages/Profile.scss";


function ProfilePage() {
    const cookies = new Cookies();
    let cookiesInfo = cookies.get('loginToken');

    const api = process.env.REACT_APP_BASE_URL;

    // User informations
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [language, setLanguage] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [userProcessInfo, setUserProcessInfo] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    // Translation
    const translation = getTranslation(language, "profile");

    // Color mode
    const { colorMode } = useColorMode();

    function getPercentageClass(percentage: number) {
        if (percentage <= 25) {
            return "percentage-low";
        }
        else if (percentage <= 50) {
            return "percentage-medium";
        }
        else if (percentage <= 75) {
            return "percentage-high";
        }
        else if (percentage <= 100) {
            return "percentage-very-high";
        }
        else {
            return "percentage-low";
        }
    };

    async function getUserInfo() {
        try {
            await axios.get(`${api}/user/getbytoken`, { params: { token: cookiesInfo.loginToken } }).then(res => {
                setUsername(res.data.username);
                setName(res.data.name);
                setFirstname(res.data.firstname);
                setLanguage(res.data.language);
                setAge(res.data.age);
                setEmail(res.data.email);
                setAddress(res.data.address);
                setPhonenumber(res.data.number_phone);
                setProfilePicture(res.data.profile_picture);
            }).catch(err => {
                console.error(err)
            });
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }

    async function getUserProcessInfo() {
        try {
            await axios.get(`${api}/userProcess/getUserProcesses`, { params: { user_token: cookiesInfo.loginToken } })
                .then(res => {
                    setUserProcessInfo(res.data.response);
                }).catch(err => {
                    console.error(err)
                });
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (!cookies.get('loginToken')) {
            window.location.assign('/');
        }
        getUserInfo();
        getUserProcessInfo();
    }, []);

    return (
        <>
            <Header />
            {
                isLoading ? <Loading /> : <></>
            }
            <div className={colorMode === "light" ? "Profile Profile-light" : "Profile Profile-dark"}>
                <div className='informations-container'>
                    <div className='main-container'>
                        <div className='primary-container'>
                            <div className='avatar-container'>
                                <img src={profilePicture === null ? "assets/avatar/no_avatar.png" : profilePicture} alt="Avatar" className="avatar" data-testid="profilePicture"></img>
                                <div className='section-fullname'>
                                    <h3 className='fn-firstname'>{firstname === null ? null : firstname}</h3>
                                    <h3 className='fn-name'>{name === null ? null : name}</h3>
                                </div>
                                <h3 data-testid="username" className='section-username'>
                                    {username === null ? translation.noUsername : username}
                                </h3>
                            </div>
                            <div className='process-container'>
                                <h1 className='heading'>{translation.process}</h1>
                                {
                                    userProcessInfo && userProcessInfo.length === 0 ?
                                        <div className='no-process'>{translation.noProcess}</div>
                                        :
                                        userProcessInfo?.map((item: any, index: number) => {
                                            return (
                                                item.pourcentage ?
                                                    <button className='process-btn' data-testid='Process-Btn' onClick={() => window.location.href = 'processResult/' + item.userProcess.stocked_title} key={index}>
                                                        <div key={index} className="home-content-box-percentages-item">
                                                            <div className="home-content-box-percentages-item-top">
                                                                <span key="{itemAscProcess}" className={colorMode === "light" ? "home-content-box-percentages-item-border-light" : "home-content-box-percentages-item-border-dark"}>
                                                                    {item.userProcess.title}
                                                                </span>
                                                            </div>
                                                            <div className="home-content-box-percentages-item-bottom">
                                                                <div className="progress">
                                                                    <div className={`progress-value ${getPercentageClass(item.pourcentage)}`} style={{ width: `${item.pourcentage}%` }}></div>
                                                                </div>
                                                                <span className={`percentage-value`} data-testid="percentageValue">
                                                                    {item.pourcentage}%
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                    :
                                                    <div className='no-process'>{translation.noProcess}</div>
                                            )
                                        })
                                }
                            </div>
                        </div>
                        <div className='secondary-container'>
                            <div className='secondary-row'>
                                <div className='secondary-label'>Email</div>
                                <div data-testid="email" className='section-text email-text'>{email === null ? translation.noEmail : email}</div>
                            </div>
                            <hr />
                            <div className='secondary-row'>
                                <div className='secondary-label'>{translation.address}</div>
                                <div data-testid="address" className='section-text address-text'>{address === null ? translation.noAddress : address}</div>
                            </div>
                            <hr />
                            <div className='secondary-row'>
                                <div className='secondary-label'>{translation.phonenumber}</div>
                                <div data-testid="number_phone" className='section-text phonenumber-text'>{phonenumber === null ? translation.noPhonenumber : phonenumber}</div>
                            </div>
                            <hr />
                            <div className='secondary-row'>
                                <div className='secondary-label'>{translation.language}</div>
                                <div data-testid="language" className='section-text language-text'>{language === null ? translation.noLanguage : language}</div>
                            </div>
                            <hr />
                            <div className='secondary-row'>
                                <div className='secondary-label'>{translation.age}</div>
                                <div data-testid="age" className='section-text section-age'>{age === null ? translation.noAge : age}</div>
                            </div>
                            <a href='/settings' className='modify-profile-btn' data-testid='modify-profile-btn'><FaCog className='modify-profile-icon' size={25} />{translation.modify}</a>
                        </div>
                    </div>
                </div>
                <div className="profile-img" >
                    <img src="assets/profile-page/account.png" alt="profile"/>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;