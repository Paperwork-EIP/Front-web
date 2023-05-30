import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import "../styles/pages/Settings.scss";
import { AiFillEye, AiFillEyeInvisible, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';

// Translation Import
import { getTranslation } from './Translation';

// Color mode
import { useColorMode } from '@chakra-ui/react';

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
    const [profilePicture, setProfilePicture] = useState("");
    const [password, setPassword] = useState("");
    const [verifPassword, setVerifPassword] = useState("");


    // Translation
    const translation = getTranslation(language, "settings");

    // Color mode
    const { colorMode } = useColorMode();

    // Eye Password
    const [showEyePwd, setShowEyePwd] = React.useState(false);
    const handleClickEyePwd = () => setShowEyePwd(!showEyePwd);
    const [showEyeVerifPwd, setShowEyeVerifPwd] = React.useState(false);
    const handleClickVerifEyePwd = () => setShowEyeVerifPwd(!showEyeVerifPwd);

    // Handle change    
    const [showModal, setShowModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [variableToChange, setVariableToChange] = useState("");
    const [avatarModal, setAvatarModal] = React.useState(false);

    useEffect(() => {
        if (cookiesInfo) {
            axios.get(`${api}/user/getbytoken`, { params: { token: cookiesInfo.loginToken } })
                .then(res => {
                    console.log(res.data);
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
                }
            );
        }
    }, []);

    const handleChangeVariable = (event: any) => {
        setVariableToChange(event);
        setShowModal(!showModal);
    }

    const handleCloseModal = (event: any) => {
        event.preventDefault();
        setShowModal(!showModal);
    }

    const handleSubmit = (event: any) => {
        if (variableToChange === "username") {
            const usernameInput = document.getElementById('username') as HTMLInputElement;
            if (usernameInput.value === undefined || usernameInput.value === null || usernameInput.value === "") {
                alert(translation.alertEmptyUsername);
            } else {
                axios.post(`${api}/user/modifyDatas`, {
                    token: cookiesInfo.loginToken,
                    username: username,
                }).then(res => {
                    console.log(res.data);
                    alert(translation.alertUpdateUsername);
                    window.location.reload();
                }).catch(err => {
                    console.log(err)
                    if (err.response.status === 400) {
                        alert(translation.alertMissingToken);
                    } else if (err.response.status === 404) {
                        alert(translation.alertUserNotFound);
                    } else if (err.response.status === 409) {
                        alert(translation.alertUsernameAlreadyUsed);
                    } else if (err.response.status === 500) {
                        alert(translation.alertSystemError);
                    }
                });
            }
        } else if (variableToChange === "name") {
            const nameInput = document.getElementById('name') as HTMLInputElement;
            if (nameInput.value === undefined || nameInput.value === null || nameInput.value === "") {
                alert(translation.alertEmptyName);
            } else {
                axios.post(`${api}/user/modifyDatas`, {
                    token: cookiesInfo.loginToken,
                    name: name,
                }).then(res => {
                    console.log(res.data);
                    alert(translation.alertUpdateName);
                    window.location.reload();
                }).catch(err => {
                    console.log(err)
                    if (err.response.status === 400) {
                        alert(translation.alertMissingToken);
                    } else if (err.response.status === 404) {
                        alert(translation.alertUserNotFound);
                    } else if (err.response.status === 500) {
                        alert(translation.alertSystemError);
                    }
                });
            }
        } else if (variableToChange === "firstname") {
            const firstnameInput = document.getElementById('firstname') as HTMLInputElement;
            if (firstnameInput.value === undefined || firstnameInput.value === null || firstnameInput.value === "") {
                alert(translation.alertEmptyFirstname);
            } else {
                axios.post(`${api}/user/modifyDatas`, {
                    token: cookiesInfo.loginToken,
                    firstname: firstname,
                }).then(res => {
                    console.log(res.data);
                    alert(translation.alertUpdateFirstname);
                    window.location.reload();
                }).catch(err => {
                    console.log(err)
                    if (err.response.status === 400) {
                        alert(translation.alertMissingEmail);
                    } else if (err.response.status === 404) {
                        alert(translation.alertUserNotFound);
                    } else if (err.response.status === 500) {
                        alert(translation.alertSystemError);
                    }
                });
            }
        } else if (variableToChange === "language") {
            const languageSelect = document.getElementById('Language-Select') as HTMLSelectElement;
            const languageValue = languageSelect.value;
            axios.post(`${api}/user/modifyDatas`, {
                token: cookiesInfo.loginToken,
                language: languageValue,
            }).then(res => {
                console.log(res.data);
                alert(translation.alertUpdateLanguage);
                window.location.reload();
            }).catch(err => {
                console.log(err)
                if (err.response.status === 400) {
                    alert(translation.alertMissingToken);
                } else if (err.response.status === 404) {
                    alert(translation.alertUserNotFound);
                } else if (err.response.status === 500) {
                    alert(translation.alertSystemError);
                }
            });
        } else if (variableToChange === "age") {
            const ageInput = document.getElementById('age') as HTMLInputElement;
            if (ageInput.value === undefined || ageInput.value === null || ageInput.value === "") {
                alert(translation.alertEmptyAge);
            } else {
                console.log("age");
                console.log(age);
                if (Number(age) < 1 || Number(age) > 200) {
                    alert(translation.alertAgeRange);
                } else {
                    axios.post(`${api}/user/modifyDatas`, {
                        token: cookiesInfo.loginToken,
                        age: age,
                    }).then(res => {
                        console.log(res.data);
                        alert(translation.alertUpdateAge);
                        window.location.reload();
                    }).catch(err => {
                        console.log(err)
                        if (err.response.status === 400) {
                            alert(translation.alertMissingToken);
                        } else if (err.response.status === 404) {
                            alert(translation.alertUserNotFound);
                        } else if (err.response.status === 500) {
                            alert(translation.alertSystemErrorPutNumber);
                        }
                    });
                }
            }
        } else if (variableToChange === "email") {
            const emailInput = document.getElementById('email') as HTMLInputElement;
            if (emailInput.value === undefined || emailInput.value === null || emailInput.value === "") {
                alert(translation.alertEmptyEmail);
            } else {
                axios.post(`${api}/user/modifyDatas`, {
                    token: cookiesInfo.loginToken,
                    new_email: email,
                }).then(res => {
                    console.log(res.data);
                    alert(translation.alertUpdateEmail);
                    // On met à jour le cookie avec les nouvelles infos (gestion du changement d'email)
                    if (cookiesInfo.email !== email) {
                        cookies.remove('loginToken', { path: '/' });
                        // cookies.set('loginToken', { token: cookiesInfo.token, email: email }, {
                        //     path:'/',
                        //     secure:true,
                        //     sameSite:'none'
                        // });
                    }
                    window.location.reload();
                }).catch(err => {
                    console.log(err)
                    if (err.response.status === 400) {
                        alert(translation.alertMissingToken);
                    } else if (err.response.status === 404) {
                        alert(translation.alertUserNotFound);
                    } else if (err.response.status === 409) {
                        alert(translation.alertEmailAlreadyUsed);
                    } else if (err.response.status === 500) {
                        alert(translation.alertSystemError);
                    }
                });
            }
        } else if (variableToChange === "address") {
            const addressInput = document.getElementById('address') as HTMLInputElement;
            if (addressInput.value === undefined || addressInput.value === null || addressInput.value === "") {
                alert(translation.alertEmptyAddress);
            } else {
                axios.post(`${api}/user/modifyDatas`, {
                    token: cookiesInfo.loginToken,
                    address: address,
                }).then(res => {
                    console.log(res.data);
                    alert(translation.alertUpdateAddress);
                    window.location.reload();
                }).catch(err => {
                    console.log(err)
                    if (err.response.status === 400) {
                        alert(translation.alertMissingToken);
                    } else if (err.response.status === 404) {
                        alert(translation.alertUserNotFound);
                    } else if (err.response.status === 500) {
                        alert(translation.alertSystemError);
                    }
                });
            }
        } else if (variableToChange === "phonenumber") {
            const phonenumberInput = document.getElementById('phonenumber') as HTMLInputElement;
            if (phonenumberInput.value === undefined || phonenumberInput.value === null || phonenumberInput.value === "") {
                alert(translation.alertEmptyPhonenumber);
            } else {
                axios.post(`${api}/user/modifyDatas`, {
                    token: cookiesInfo.loginToken,
                    number_phone: phonenumber,
                }).then(res => {
                    console.log(res.data);
                    alert(translation.alertUpdatePhonenumber);
                    window.location.reload();
                }).catch(err => {
                    console.log(err)
                    if (err.response.status === 400) {
                        alert(translation.alertMissingToken);
                    } else if (err.response.status === 404) {
                        alert(translation.alertUserNotFound);
                    } else if (err.response.status === 500) {
                        alert(translation.alertSystemError);
                    }
                });
            }
        } else if (variableToChange === "password") {
            const passwordInput = document.getElementById('password') as HTMLInputElement;
            if (passwordInput.value === undefined || passwordInput.value === null || passwordInput.value === "") {
                alert(translation.alertEmptyPassword);
            } else {
                if (password.length >= 4 && password === verifPassword) {
                    axios.post(`${api}/user/modifyDatas`, {
                        token: cookiesInfo.loginToken,
                        password: password,
                    }).then(res => {
                        console.log(res.data);
                        alert(translation.alertUpdatePassword);
                        window.location.reload();
                    }).catch(err => {
                        console.log(err)
                        if (err.response.status === 400) {
                            alert(translation.alertMissingToken);
                        } else if (err.response.status === 404) {
                            alert(translation.alertUserNotFound);
                        } else if (err.response.status === 500) {
                            alert(translation.alertSystemError);
                        }
                    });
                } else {
                    alert(translation.alertPasswordNotMatch);
                }
            }
        }
        setShowModal(!showModal);
    }

    const handleDeleteAccount = (event: any) => {
        axios.get(`${api}/user/delete`, { params: {
            token: cookiesInfo.loginToken,
        }}).then(res => {
            console.log(res.data);
            alert(translation.alertDeleteAccount);
            cookies.remove('loginToken', { path: '/' });
            window.location.reload();
        }).catch(err => {
            console.log(err)
            if (err.response.status === 400) {
                alert(translation.alertMissingToken);
            } else if (err.response.status === 404) {
                alert(translation.alertUserNotFound);
            } else if (err.response.status === 500) {
                alert(translation.alertSystemError);
            }
        });
        setDeleteModal(!deleteModal);
    }

    const handleSetNewAvatar = (newAvatar: string) => {
        axios.post(`${api}/user/modifyDatas`, {
            token: cookiesInfo.loginToken,
            profile_picture: newAvatar,
        }).then(res => {
            console.log(res.data);
            alert(translation.alertAvatarUpdated);
            window.location.reload();
        }).catch(err => {
            console.log(err)
            if (err.response.status === 400) {
                alert(translation.alertMissingToken);
            } else if (err.response.status === 404) {
                alert(translation.alertUserNotFound);
            } else if (err.response.status === 500) {
                alert(translation.alertSystemError);
            }
        });
        setAvatarModal(!avatarModal);
    }
    
    return (
        <>
            <Header/>
            <div className={colorMode === "light" ? "Settings Settings-light" : "Settings Settings-dark"}>
                <div className='heading-image'>
                    <img src="assets/settings-page/OnlinePageBro.svg" alt="OnlinePageBro" />
                </div>
                <h1 className="heading">{ translation.heading1 }</h1>
                <div className="divider"> <span></span></div>

                <div className='section-container'>
                    <div className="information-container">
                        <div className="avatar-container">
                            <img src={profilePicture === null ? "/assets/avatar/NoAvatar.png" : profilePicture} alt="Avatar" className="Avatar"></img>
                            <button aria-label='button-change-avatar' onClick={() => setAvatarModal(!avatarModal) }><img src="/assets/avatar/PictureModif.png" alt="PictureModif" className="ModifImg"></img></button>
                        </div>
                    </div>

                    <div className="information-container">
                        <label htmlFor="username">{ translation.username }</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setUsername(target.value)} data-testid='input-change-username' className='edit-input' type="text" id="username" name="username" placeholder={ username ? username : translation.usernamePlaceholder }></input>
                            <button type="button" className='edit-btn' aria-label='button-change-username' onClick={() => handleChangeVariable("username")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>

                    <div className="information-container">
                        <label htmlFor="name">{ translation.name }</label>
                        <div className='input-container'>
                            <input onChange={(event) => {
                                setName(event.target.value);
                                console.log("target.target.value = " + event.target.value);
                                console.log("name = " + name);
                                }} data-testid='input-change-name' className='edit-input' type="text" id="name" name="name" placeholder={ name ? name : translation.namePlaceholder}></input>
                            <button type="button" className='edit-btn' aria-label='button-change-name' onClick={() => handleChangeVariable("name")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>

                    <div className="information-container">
                        <label htmlFor="firstname">{ translation.firstname }</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setFirstname(target.value)} data-testid='input-change-firstname' className='edit-input' type="text" id="firstname" name="firstname" placeholder={ firstname ? firstname : translation.firstnamePlaceholder}></input>
                            <button type="button" className='edit-btn' aria-label='button-change-firstname' onClick={() => handleChangeVariable("firstname")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>

                    <div className="information-container">
                        <label htmlFor="language">{ translation.language }</label>
                        <div className='input-container'>
                            <select onChange={({ target }) => setLanguage(target.value)} value={ language } name="Language-Select" id="Language-Select" data-testid="select-change-language" className='edit-select' placeholder={ language }>
                                <option data-testid="select-option" value="english">English</option>
                                <option data-testid="select-option" value="français">Français</option>
                            </select>
                            <button type="button" className='edit-btn' aria-label='button-change-language' onClick={() => handleChangeVariable("language")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>
                    
                    <div className="information-container">
                        <label htmlFor="age">{ translation.age }</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setAge(target.value)} data-testid='input-change-age' className='edit-input' type="number" id="age" name="age" min="1" max="200" placeholder={ age ? age : translation.agePlaceholder}></input>
                            <button type="button" className='edit-btn' aria-label='button-change-age' onClick={() => handleChangeVariable("age")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>
                </div>

                <h1 className="heading">{ translation.heading2 }</h1>
                <div className="divider"> <span></span></div>

                <div className='section-container'>
                    <div className="information-container">
                        <label htmlFor="email">Email</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setEmail(target.value)} data-testid='input-change-email' className='edit-input' type="email" pattern=".+@globex\.com" id="email" name="email" placeholder={ email ? email : "Email..."}></input>
                            <button type="button" className='edit-btn' aria-label='button-change-email' onClick={() => handleChangeVariable("email")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>
                    
                    <div className="information-container">
                        <label htmlFor="address">{ translation.address }</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setAddress(target.value)} data-testid='input-change-address' className='edit-input' type="text" id="address" name="address" placeholder={ address ? address : translation.addressPlaceholder}></input>
                            <button type="button" className='edit-btn' aria-label='button-change-address' onClick={() => handleChangeVariable("address")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>
                    
                    <div className="information-container">
                        <label htmlFor="phonenumber">{ translation.phonenumber }</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setPhonenumber(target.value)} data-testid='input-change-phone' className='edit-input' type="tel" id="phonenumber" name="phonenumber" placeholder={ phonenumber ? phonenumber : translation.phonenumberPlaceholder}></input>
                            <button type="button" className='edit-btn' aria-label='button-change-phone' onClick={() => handleChangeVariable("phonenumber")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>
                </div>

                <h1 className="heading">{ translation.heading3 }</h1>
                <div className="divider"> <span></span></div>

                <div className='section-container'>
                    <div className="information-container">
                        <label htmlFor="password">{ translation.password }</label>
                        <div className="passwordInput">
                            <input onChange={({ target }) => setPassword(target.value)} data-testid='input-change-pswd' type={showEyePwd ? 'text' : 'password'} id="password" name="password" placeholder="**********"></input>
                            <button type="button" aria-label='button-change-show1' onClick={handleClickEyePwd}>{showEyePwd ? <AiFillEye className='passwordInputEye' size={20} /> : <AiFillEyeInvisible className='passwordInputEye' size={20} />}</button>
                        </div>
                        <label htmlFor="errorPassword" className='errorPassword'>{ translation.errorPassword }</label>
                    </div>
                    
                    <div className="information-container">
                        <label htmlFor="verifPassword">{ translation.verifPassword }</label>
                        <div className="passwordInput">
                            <input onChange={({ target }) => setVerifPassword(target.value)} data-testid='input-change-cpswd' type={showEyeVerifPwd ? 'text' : 'password'} id="verifPassword" name="verifPassword" placeholder="**********"></input>
                            <button type="button"aria-label='button-change-show2' onClick={handleClickVerifEyePwd}>{showEyeVerifPwd ? <AiFillEye className='passwordInputEye' size={20} /> : <AiFillEyeInvisible className='passwordInputEye' size={20} />}</button>
                        </div>
                    </div>
                    <div className="information-container">
                        <button type="button" className='edit-password-btn' aria-label='button-change-password' onClick={() => handleChangeVariable("password")}>{ translation.editPassword }<AiOutlineEdit className='edit-password-icon' /></button>
                    </div>
                </div>

                <h1 className="heading">{ translation.deleteAccount }</h1>
                <div className="divider"> <span></span></div>

                <div className='section-container'>
                    <div className="information-container">
                        <button type="button" className='delete-account-btn' aria-label='button-change-delete' onClick={() => setDeleteModal(true)}>{ translation.deleteAccount }<AiOutlineDelete className='delete-account-icon' /></button>
                    </div>
                </div>

                {
                    showModal ?
                        <div id="changeVariableModal" className="modal-background">
                            <div className="modal-container">
                                <div className="modal-content">
                                    <h1 className="modal-title">{translation.changeModalQst + getVariableToChange(variableToChange, translation)}?</h1>
                                    <div className="divider"> <span></span></div>
                                    <div className="modal-button-container">
                                        <button type="button" className="modal-btn modal-cancel-btn" aria-label='button-change-cancel' onClick={handleCloseModal}>{ translation.cancelBtn }</button>
                                        <button type="button" className="modal-btn modal-continue-btn" aria-label='button-change-continue' onClick={handleSubmit}>{ translation.continueBtn }</button>
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
                                    <h1 className="modal-title">{ translation.deleteModalQst }</h1>
                                    <div className="divider"> <span></span></div>
                                    <div className="modal-button-container">
                                        <button type="button" className="modal-btn modal-cancel-btn" aria-label='button-delete-cancel' onClick={() => setDeleteModal(false)}>{ translation.cancelBtn }</button>
                                        <button type="button" className="modal-btn modal-continue-btn" aria-label='button-delete-continue' onClick={handleDeleteAccount}>{ translation.continueBtn }</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    : null
                }

                {
                    avatarModal ?
                        <div id="changeVariableModal" className="modal-background">
                            <div className="modal-container">
                                <div className="modal-content">
                                    <h1 className="modal-title">{ translation.avatarModalTxt }</h1>
                                    <div className="divider"> <span></span></div>
                                    <div className="modal-avatar-container">
                                        <button type="button" className='modal-avatar-button' aria-label='button-change-avatar-option' onClick={ () => handleSetNewAvatar("/assets/avatar/Avatar01.png") }><img src="/assets/avatar/Avatar01.png" alt="Avatar" className="Avatar"></img></button>
                                        <button type="button" className='modal-avatar-button' aria-label='button-change-avatar-option' onClick={ () => handleSetNewAvatar("/assets/avatar/Avatar02.png") }><img src="/assets/avatar/Avatar02.png" alt="Avatar" className="Avatar"></img></button>
                                        <button type="button" className='modal-avatar-button' aria-label='button-change-avatar-option' onClick={ () => handleSetNewAvatar("/assets/avatar/Avatar03.png") }><img src="/assets/avatar/Avatar03.png" alt="Avatar" className="Avatar"></img></button>
                                        <button type="button" className='modal-avatar-button' aria-label='button-change-avatar-option' onClick={ () => handleSetNewAvatar("/assets/avatar/Avatar04.png") }><img src="/assets/avatar/Avatar04.png" alt="Avatar" className="Avatar"></img></button>
                                        <button type="button" className='modal-avatar-button' aria-label='button-change-avatar-option' onClick={ () => handleSetNewAvatar("/assets/avatar/Avatar05.png") }><img src="/assets/avatar/Avatar05.png" alt="Avatar" className="Avatar"></img></button>
                                        <button type="button" className='modal-avatar-button' aria-label='button-change-avatar-option' onClick={ () => handleSetNewAvatar("/assets/avatar/Avatar06.png") }><img src="/assets/avatar/Avatar06.png" alt="Avatar" className="Avatar"></img></button>
                                        <button type="button" className='modal-avatar-button' aria-label='button-change-avatar-option' onClick={ () => handleSetNewAvatar("/assets/avatar/Avatar07.png") }><img src="/assets/avatar/Avatar07.png" alt="Avatar" className="Avatar"></img></button>
                                        <button type="button" className='modal-avatar-button' aria-label='button-change-avatar-option' onClick={ () => handleSetNewAvatar("/assets/avatar/Avatar08.png") }><img src="/assets/avatar/Avatar08.png" alt="Avatar" className="Avatar"></img></button>
                                        <div className="modal-avatar-cancel-btn-container">
                                            <button type="button" className="modal-avatar-cancel-btn" aria-label='button-change-avatar-close' onClick={() => setAvatarModal(false)}>{ translation.cancelBtn }</button>
                                        </div>
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

export function getVariableToChange(variableToChange: string, translation: any) {
    switch (variableToChange) {
        case "username":
            return translation.username.toLowerCase();
        case "name":
            return translation.name.toLowerCase();
        case "firstname":
            return translation.firstname.toLowerCase();
        case "language":
            return translation.language.toLowerCase();
        case "age":
            return translation.age.toLowerCase();
        case "email":
            return "email";
        case "address":
            return translation.address.toLowerCase();
        case "phonenumber":
            return translation.phonenumber.toLowerCase();
        case "password":
            return translation.password.toLowerCase();
        default:
            return "";
    }
}

export default SettingsPage;