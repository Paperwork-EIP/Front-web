import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import "../styles/pages/Settings.scss";
import { AiFillEye, AiFillEyeInvisible, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';

const cookies = new Cookies();

const SettingsPage = () => {
    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }

    const cookiesInfo = cookies.get('loginToken');

    const api = process.env.REACT_APP_BASE_URL;

    // Inputs
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [language, setLanguage] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    // const [profilPictureLink, setProfilPictureLink] = useState("");
    const [password, setPassword] = useState("");
    const [verifPassword, setVerifPassword] = useState("");

    // Eye Password
    const [showEyePwd, setShowEyePwd] = React.useState(false);
    const handleClickEyePwd = () => setShowEyePwd(!showEyePwd);
    const [showEyeVerifPwd, setShowEyeVerifPwd] = React.useState(false);
    const handleClickVerifEyePwd = () => setShowEyeVerifPwd(!showEyeVerifPwd);

    // Handle change    
    const [showModal, setShowModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [variableToChange, setVariableToChange] = useState("");



    useEffect(() => {
        axios.get(`${api}/user/getbytoken`, { params: { token: cookiesInfo.token } })
        .then(res => {
            console.log(res.data);
            setUsername(res.data.username);
            setName(res.data.name);
            setFirstname(res.data.firstname);
            setLanguage(res.data.language);
            setAge(res.data.age);
            setEmail(res.data.email);
            setAddress(res.data.adress);
            setPhonenumber(res.data.number_phone);
        }).catch(err => {
            console.log(err)
        });
    }, [cookiesInfo.email, api])

    

    const handleChangeVariable = (event: any) => {
        setVariableToChange(event);
        setShowModal(!showModal);
    }

    const handleCloseModal = (event: any) => {
        setShowModal(!showModal);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (variableToChange === "username") {
            axios.post(`${api}/user/modifyDatas`, {
                token: cookiesInfo.token,
                username: username,
            }).then(res => {
                console.log(res.data);
                alert("Username updated!");
                window.location.reload();
            }).catch(err => {
                console.log(err)
                if (err.response.status === 400) {
                    alert("Missing parameter token.");
                } else if (err.response.status === 404) {
                    alert("User not found.");
                } else if (err.response.status === 409) {
                    alert("Username already used.");
                } else if (err.response.status === 500) {
                    alert("System error.");
                }
            });
        } else if (variableToChange === "name") {
            axios.post(`${api}/user/modifyDatas`, {
                token: cookiesInfo.token,
                name: name,
            }).then(res => {
                console.log(res.data);
                alert("Name updated!");
                window.location.reload();
            }).catch(err => {
                console.log(err)
                if (err.response.status === 400) {
                    alert("Missing parameter token.");
                } else if (err.response.status === 404) {
                    alert("User not found.");
                } else if (err.response.status === 500) {
                    alert("System error.");
                }
            });
        } else if (variableToChange === "firstname") {
            axios.post(`${api}/user/modifyDatas`, {
                token: cookiesInfo.token,
                firstname: firstname,
            }).then(res => {
                console.log(res.data);
                alert("Firstname updated!");
                window.location.reload();
            }).catch(err => {
                console.log(err)
                if (err.response.status === 400) {
                    alert("Missing parameter email.");
                } else if (err.response.status === 404) {
                    alert("User not found.");
                } else if (err.response.status === 500) {
                    alert("System error.");
                }
            });
        } else if (variableToChange === "language") {
            axios.post(`${api}/user/modifyDatas`, {
                token: cookiesInfo.token,
                language: language,
            }).then(res => {
                console.log(res.data);
                alert("Language updated!");
                window.location.reload();
            }).catch(err => {
                console.log(err)
                if (err.response.status === 400) {
                    alert("Missing parameter token.");
                } else if (err.response.status === 404) {
                    alert("User not found.");
                } else if (err.response.status === 500) {
                    alert("System error.");
                }
            });
        } else if (variableToChange === "age") {
            axios.post(`${api}/user/modifyDatas`, {
                token: cookiesInfo.token,
                age: age,
            }).then(res => {
                console.log(res.data);
                alert("Age updated!");
                window.location.reload();
            }).catch(err => {
                console.log(err)
                if (err.response.status === 400) {
                    alert("Missing parameter token.");
                } else if (err.response.status === 404) {
                    alert("User not found.");
                } else if (err.response.status === 500) {
                    alert("System error. You should put a number.");
                }
            });
        } else if (variableToChange === "email") {
            axios.post(`${api}/user/modifyDatas`, {
                token: cookiesInfo.token,
                new_email: email,
            }).then(res => {
                console.log(res.data);
                alert("Email updated!");
                // On met à jour le cookie avec les nouvelles infos (gestion du changement d'email)
                if (cookiesInfo.email !== email) {
                    cookies.remove('loginToken', { path: '/' });
                    cookies.set('loginToken', { token: cookiesInfo.token, email: email }, {
                        path:'/',
                        secure:true,
                        sameSite:'none'
                    });
                }
                window.location.reload();
            }).catch(err => {
                console.log(err)
                if (err.response.status === 400) {
                    alert("Missing parameter token.");
                } else if (err.response.status === 404) {
                    alert("User not found.");
                } else if (err.response.status === 409) {
                    alert("Email already used.");
                } else if (err.response.status === 500) {
                    alert("System error.");
                }
            });
        } else if (variableToChange === "address") {
            axios.post(`${api}/user/modifyDatas`, {
                token: cookiesInfo.token,
                adress: address,
            }).then(res => {
                console.log(res.data);
                alert("Address updated!");
                window.location.reload();
            }).catch(err => {
                console.log(err)
                if (err.response.status === 400) {
                    alert("Missing parameter token.");
                } else if (err.response.status === 404) {
                    alert("User not found.");
                } else if (err.response.status === 500) {
                    alert("System error.");
                }
            });
        } else if (variableToChange === "phonenumber") {
            axios.post(`${api}/user/modifyDatas`, {
                token: cookiesInfo.token,
                number_phone: phonenumber,
            }).then(res => {
                console.log(res.data);
                alert("Phonenumber updated!");
                window.location.reload();
            }).catch(err => {
                console.log(err)
                if (err.response.status === 400) {
                    alert("Missing parameter token.");
                } else if (err.response.status === 404) {
                    alert("User not found.");
                } else if (err.response.status === 500) {
                    alert("System error.");
                }
            });
        } else if (variableToChange === "password") {
            if (password.length >= 8 && password === verifPassword) {
                axios.post(`${api}/user/modifyDatas`, {
                    token: cookiesInfo.token,
                    password: password,
                }).then(res => {
                    console.log(res.data);
                    alert("Password updated!");
                    window.location.reload();
                }).catch(err => {
                    console.log(err)
                    if (err.response.status === 400) {
                        alert("Missing parameter token.");
                    } else if (err.response.status === 404) {
                        alert("User not found.");
                    } else if (err.response.status === 500) {
                        alert("System error.");
                    }
                });
            } else {
                alert("Passwords does not match.");
            }
        }
        setShowModal(!showModal);
    }

    const handleDeleteAccount = (event: any) => {
        axios.get(`${api}/user/delete`, { params: {
            token: cookiesInfo.token,
        }}).then(res => {
            console.log(res.data);
            alert("Account deleted!");
            cookies.remove('loginToken', { path: '/' });
            window.location.reload();
        }).catch(err => {
            console.log(err)
            if (err.response.status === 400) {
                alert("Missing parameter token.");
            } else if (err.response.status === 404) {
                alert("User not found.");
            } else if (err.response.status === 500) {
                alert("System error.");
            }
        });
        setDeleteModal(!deleteModal);
    }

    
    return (
        <>
            <Header/>
            <div className="Settings">
                <div className='heading-image'>
                    <img src="assets/settings-page/OnlinePageBro.svg" alt="OnlinePageBro" />
                </div>
                <h1 className="heading">Profile</h1>
                <div className="divider"> <span></span></div>

                <div className='section-container'>
                    <div className="information-container">
                        <img src="https://wallpapers.com/images/featured/4co57dtwk64fb7lv.jpg" alt="Avatar" className="Avatar"></img>
                    </div>

                    <div className="information-container">
                        <label htmlFor="username">Username</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setUsername(target.value)} className='edit-input' type="text" id="username" name="username" placeholder={ username ? username : "Username..."}></input>
                            <button type="button" className='edit-btn' onClick={() => handleChangeVariable("username")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>

                    <div className="information-container">
                        <label htmlFor="name">Name</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setName(target.value)} className='edit-input' type="text" id="name" name="name" placeholder={ name ? name : "Name..."}></input>
                            <button type="button" className='edit-btn' onClick={() => handleChangeVariable("name")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>
                    
                    <div className="information-container">
                        <label htmlFor="firstname">Firstname</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setFirstname(target.value)} className='edit-input' type="text" id="firstname" name="firstname" placeholder={ firstname ? firstname : "Firstname..."}></input>
                            <button type="button" className='edit-btn' onClick={() => handleChangeVariable("firstname")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>

                    <div className="information-container">
                        <label htmlFor="language">Language</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setLanguage(target.value)} className='edit-input' type="text" id="language" name="language" placeholder={ language ? language : "Language..."}></input>
                            <button type="button" className='edit-btn' onClick={() => handleChangeVariable("language")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>
                    
                    <div className="information-container">
                        <label htmlFor="age">Age</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setAge(target.value)} className='edit-input' type="number" id="age" name="age" placeholder={ age ? age : "Age..."}></input>
                            <button type="button" className='edit-btn' onClick={() => handleChangeVariable("age")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>
                </div>

                <h1 className="heading">Personal informations</h1>
                <div className="divider"> <span></span></div>

                <div className='section-container'>
                    <div className="information-container">
                        <label htmlFor="email">Email</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setEmail(target.value)} className='edit-input' type="email" pattern=".+@globex\.com" id="email" name="email" placeholder={ email ? email : "Email..."}></input>
                            <button type="button" className='edit-btn' onClick={() => handleChangeVariable("email")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>
                    
                    <div className="information-container">
                        <label htmlFor="address">Address</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setAddress(target.value)} className='edit-input' type="text" id="address" name="address" placeholder={ address ? address : "Address..."}></input>
                            <button type="button" className='edit-btn' onClick={() => handleChangeVariable("address")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>
                    
                    <div className="information-container">
                        <label htmlFor="phonenumber">Phone number</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setPhonenumber(target.value)} className='edit-input' type="tel" id="phonenumber" name="phonenumber" placeholder={ phonenumber ? phonenumber : "Phone number..."}></input>
                            <button type="button" className='edit-btn' onClick={() => handleChangeVariable("phonenumber")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>
                </div>

                <h1 className="heading">Security</h1>
                <div className="divider"> <span></span></div>

                <div className='section-container'>
                    <div className="information-container">
                        <label htmlFor="password">Password</label>
                        <div className="passwordInput">
                            <input onChange={({ target }) => setPassword(target.value)} type={showEyePwd ? 'text' : 'password'} id="password" name="password" placeholder="**********"></input>
                            <button type="button" onClick={handleClickEyePwd}>{showEyePwd ? <AiFillEye className='passwordInputEye' size={20} /> : <AiFillEyeInvisible className='passwordInputEye' size={20} />}</button>
                        </div>
                        <label htmlFor="errorPassword" className='errorPassword'>The password must contain at least 8 characters.</label>
                    </div>
                    
                    <div className="information-container">
                        <label htmlFor="verifPassword">Verif password</label>
                        <div className="passwordInput">
                            <input onChange={({ target }) => setVerifPassword(target.value)} type={showEyeVerifPwd ? 'text' : 'password'} id="verifPassword" name="verifPassword" placeholder="**********"></input>
                            <button type="button" onClick={handleClickVerifEyePwd}>{showEyeVerifPwd ? <AiFillEye className='passwordInputEye' size={20} /> : <AiFillEyeInvisible className='passwordInputEye' size={20} />}</button>
                        </div>
                    </div>
                    <div className="information-container">
                        <button type="button" className='edit-password-btn' onClick={() => handleChangeVariable("password")}>Edit password<AiOutlineEdit className='edit-password-icon' /></button>
                    </div>
                </div>

                <h1 className="heading">Delete Account</h1>
                <div className="divider"> <span></span></div>

                <div className='section-container'>
                    <div className="information-container">
                        <button type="button" className='delete-account-btn' onClick={() => setDeleteModal(true)}>Delete Account<AiOutlineDelete className='delete-account-icon' /></button>
                    </div>
                </div>

                {
                    showModal ?
                        <div id="changeVariableModal" className="modal-background">
                            <div className="modal-container">
                                <div className="modal-content">
                                    <h1 className="modal-title">Are you sure you want to change your {variableToChange}?</h1>
                                    <div className="divider"> <span></span></div>
                                    <div className="modal-button-container">
                                        <button type="button" className="modal-btn modal-cancel-btn" onClick={handleCloseModal}>Cancel</button>
                                        <button type="button" className="modal-btn modal-continue-btn" onClick={handleSubmit}>Continue</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    : null
                }

                {
                    deleteModal ?
                        <div id="changeVariableModal" className="modal-background">
                            <div className="modal-container">
                                <div className="modal-content">
                                    <h1 className="modal-title">Are you sure you want to delete your account ?</h1>
                                    <div className="divider"> <span></span></div>
                                    <div className="modal-button-container">
                                        <button type="button" className="modal-btn modal-cancel-btn" onClick={() => setDeleteModal(false)}>Cancel</button>
                                        <button type="button" className="modal-btn modal-continue-btn" onClick={handleDeleteAccount}>Continue</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    : null
                }
            </div>
        </>
    );
}

export default SettingsPage;