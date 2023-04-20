import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import "../styles/pages/Profile.scss";
import { FaCog } from 'react-icons/fa';
import axios from 'axios';

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
    const [userProcessInfo, setUserProcessInfo] = useState([{}]);

    useEffect(() => {
        if (!cookies.get('loginToken')) {
            window.location.assign('/');
        }
        else {
            axios.get(`${api}/user/getbytoken`, { params: { token: cookiesInfo.token } })
                .then(res => {
                    console.log("user getbytoken")
                    console.log(res);
                    console.log(res.data);
                    setUsername(res.data.username);
                    setName(res.data.name);
                    setFirstname(res.data.firstname);
                    setLanguage(res.data.language);
                    setAge(res.data.age);
                    setEmail(res.data.email);
                    setAddress(res.data.address);
                    setPhonenumber(res.data.number_phone);
                }).catch(err => {
                    console.log(err)
                });

            axios.get(`${api}/userProcess/getUserProcesses`, { params: { user_token: cookiesInfo.token } })
                .then(res => {
                    console.log("res.data.response getUserProcesses");
                    console.log(res);
                    console.log(res.data.response);
                    setUserProcessInfo(res.data.response);
                }).catch(err => {
                    console.log("err getUserProcesses")
                    console.log(err)
                });
        }
    })


    return (
        <>
            <Header />

            <div className='Profile'>
                <a href='/settings' className='modify-profile-btn' data-testid='modify-profile-btn'><FaCog className='modify-profile-icon' size={25} />Modify Profile</a>
                <div className='informations-container'>
                    <div className='main-container'>
                        <img src="https://wallpapers.com/images/featured/4co57dtwk64fb7lv.jpg" alt="Avatar" className="Avatar"></img>
                        <div data-testid="username" className='section-username'>{username}</div>
                        <div className='section-fullname'>
                            <div className='fn-name'>{name}</div>
                            <div className='fn-firstname'>{firstname}</div>
                        </div>
                    </div>
                    <div className='secondary-container'>
                        <div className='secondary-row'>
                            <div className='secondary-label'>Email</div>
                            <div data-testid="email" className='section-text email-text'>{email}</div>
                        </div>
                        <hr />
                        <div className='secondary-row'>
                            <div className='secondary-label'>Address</div>
                            <div data-testid="address" className='section-text address-text'>{address}</div>
                        </div>
                        <hr />
                        <div className='secondary-row'>
                            <div className='secondary-label'>Phone Number</div>
                            <div data-testid="number_phone" className='section-text phonenumber-text'>{phonenumber}</div>
                        </div>
                        <hr />
                        <div className='secondary-row'>
                            <div className='secondary-label'>Language</div>
                            <div data-testid="language" className='section-text language-text'>{language}</div>
                        </div>
                        <hr />
                        <div className='secondary-row'>
                            <div className='secondary-label'>Age</div>
                            <div data-testid="age" className='section-text section-age'>{age}</div>
                        </div>
                    </div>
                </div>
                <div className='process-container'>
                    <h1 className='heading'>Your current process</h1>
                    <>
                        {
                            userProcessInfo?.map((item: any) => {
                                return (
                                    item.pourcentage ?
                                        <button className='Process-Btn' data-testid='Process-Btn' onClick={() => window.location.href = 'processResult/' + item.userProcess.process_title}>
                                            <div className='process-progress' key={item.userProcess.id}>
                                                <div className='progress-name'>{item.userProcess.process_title}</div>
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