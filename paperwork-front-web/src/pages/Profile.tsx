import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import "../styles/pages/Profile.scss";
import { FaCog } from 'react-icons/fa';
import axios from 'axios';

// Translation Import
import { getTranslation } from './Translation';

// Color mode
import { useColorMode } from '@chakra-ui/react';

const cookies = new Cookies();

const ProfilePage = () => {

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
    const [userProcessInfo, setUserProcessInfo] = useState([{}]);

    // Translation
    const translation = getTranslation(language, "profile");

    // Color mode
    const { colorMode } = useColorMode();

    useEffect(() => {
        if (!cookies.get('loginToken')) {
            window.location.assign('/');
        }
        else {
            axios.get(`${api}/user/getbytoken`, { params: { token: cookiesInfo.loginToken } })
                .then(res => {
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
                    console.log(err)
                });

            axios.get(`${api}/userProcess/getUserProcesses`, { params: { user_token: cookiesInfo.loginToken } })
                .then(res => {
                    setUserProcessInfo(res.data.response);
                }).catch(err => {
                    console.log(err)
                });
        }
    }, [api, cookiesInfo.loginToken])


    return (
        <>
            <Header />

            <div className={colorMode === "light" ? "Profile Profile-light" : "Profile Profile-dark"}>
                <a href='/settings' className='modify-profile-btn' data-testid='modify-profile-btn'><FaCog className='modify-profile-icon' size={25} />{ translation.modify }</a>
                <div className='informations-container'>
                    <div className='main-container'>
                        <img src={profilePicture === null ? "assets/avatar/NoAvatar.png" : profilePicture} alt="Avatar" className="Avatar" data-testid="profilePicture"></img>
                        <div data-testid="username" className='section-username'>{username === null ? translation.noUsername : username}</div>
                        <div className='section-fullname'>
                            <div className='fn-name'>{name === null ? null : name}</div>
                            <div className='fn-firstname'>{firstname === null ? null : firstname}</div>
                        </div>
                    </div>
                    <div className='secondary-container'>
                        <div className='secondary-row'>
                            <div className='secondary-label'>Email</div>
                            <div data-testid="email" className='section-text email-text'>{email === null ? translation.noEmail : email}</div>
                        </div>
                        <hr />
                        <div className='secondary-row'>
                            <div className='secondary-label'>{ translation.address }</div>
                            <div data-testid="address" className='section-text address-text'>{address === null ? translation.noAddress : address}</div>
                        </div>
                        <hr />
                        <div className='secondary-row'>
                            <div className='secondary-label'>{ translation.phonenumber }</div>
                            <div data-testid="number_phone" className='section-text phonenumber-text'>{phonenumber === null ? translation.noPhonenumber : phonenumber}</div>
                        </div>
                        <hr />
                        <div className='secondary-row'>
                            <div className='secondary-label'>{ translation.language }</div>
                            <div data-testid="language" className='section-text language-text'>{language === null ? translation.noLanguage : language}</div>
                        </div>
                        <hr />
                        <div className='secondary-row'>
                            <div className='secondary-label'>{ translation.age }</div>
                            <div data-testid="age" className='section-text section-age'>{age === null ? translation.noAge : age}</div>
                        </div>
                    </div>
                </div>
                <div className='process-container'>
                    <h1 className='heading'>{ translation.process }</h1>
                    <>
                        {
                            userProcessInfo && userProcessInfo.length === 0 ?
                                <div className='no-process'>{ translation.noProcess }</div>
                                :
                            userProcessInfo?.map((item: any) => {
                                console.log("item");
                                console.log(item);
                                return (
                                    item.pourcentage ?
                                        <button className='Process-Btn' data-testid='Process-Btn' onClick={() => window.location.href = 'processResult/' + item.userProcess.stocked_title}>
                                            <div className='process-progress' key={item.userProcess.id}>
                                                <div className='progress-name'>{item.userProcess.title}</div>
                                                <div className='progress-bar'>
                                                    <div className='progress-bar-bg'></div>
                                                    <div className='progress-bar-front' style={{ width: item.pourcentage + '%' }}></div>
                                                </div>
                                            </div>
                                        </button>
                                        : null
                                )
                            })
                        }
                    </>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;