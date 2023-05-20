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
    const [profilePicture, setProfilePicture] = useState("");
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
    const [avatarModal, setAvatarModal] = React.useState(false);

    useEffect(() => {
        if (cookiesInfo) {
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
        }
    })

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
                token: cookiesInfo.loginToken,
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
                token: cookiesInfo.loginToken,
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
                token: cookiesInfo.loginToken,
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
            const languageSelect = document.getElementById('Language-Select') as HTMLSelectElement;
            const languageValue = languageSelect.value;
            axios.post(`${api}/user/modifyDatas`, {
                token: cookiesInfo.loginToken,
                language: languageValue,
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
            if (Number(age) < 1 || Number(age) > 200) {
                alert("Age must be between 1 and 200.");
            } else {
                axios.post(`${api}/user/modifyDatas`, {
                    token: cookiesInfo.loginToken,
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
            }
        } else if (variableToChange === "email") {
            axios.post(`${api}/user/modifyDatas`, {
                token: cookiesInfo.loginToken,
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
                token: cookiesInfo.loginToken,
                address: address,
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
                token: cookiesInfo.loginToken,
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
            if (password.length >= 4 && password === verifPassword) {
                axios.post(`${api}/user/modifyDatas`, {
                    token: cookiesInfo.loginToken,
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
            token: cookiesInfo.loginToken,
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

    const handleSetNewAvatar = (newAvatar: string) => {
        axios.post(`${api}/user/modifyDatas`, {
            token: cookiesInfo.loginToken,
            profile_picture: newAvatar,
        }).then(res => {
            console.log(res.data);
            alert("Avatar updated!");
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
        setAvatarModal(!avatarModal);
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
                        <div className="avatar-container">
                            <img src={profilePicture === null ? "Avatars/NoAvatar.png" : profilePicture} alt="Avatar" className="Avatar"></img>
                            <button aria-label='button-change-avatar' onClick={() => setAvatarModal(!avatarModal) }><img src="Avatars/PictureModif.png" alt="PictureModif" className="ModifImg"></img></button>
                        </div>
                    </div>

                    <div className="information-container">
                        <label htmlFor="username">Username</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setUsername(target.value)} data-testid='input-change-username' className='edit-input' type="text" id="username" name="username" placeholder={ username ? username : "Username..."}></input>
                            <button type="button" className='edit-btn' aria-label='button-change-username' onClick={() => handleChangeVariable("username")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>

                    <div className="information-container">
                        <label htmlFor="name">Name</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setName(target.value)} data-testid='input-change-name' className='edit-input' type="text" id="name" name="name" placeholder={ name ? name : "Name..."}></input>
                            <button type="button" className='edit-btn' aria-label='button-change-name' onClick={() => handleChangeVariable("name")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>
                    
                    <div className="information-container">
                        <label htmlFor="firstname">Firstname</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setFirstname(target.value)} data-testid='input-change-firstname' className='edit-input' type="text" id="firstname" name="firstname" placeholder={ firstname ? firstname : "Firstname..."}></input>
                            <button type="button" className='edit-btn' aria-label='button-change-firstname' onClick={() => handleChangeVariable("firstname")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>

                    <div className="information-container">
                        <label htmlFor="language">Language</label>
                        <div className='input-container'>
                            <select onChange={({ target }) => setLanguage(target.value)} defaultValue="English" name="Language-Select" id="Language-Select" data-testid="select" className='edit-select' placeholder='English'>
                                <option data-testid="select-option" value="english">English</option>
                                <option data-testid="select-option" value="french">Français</option>
                            </select>
                            <button type="button" className='edit-btn' aria-label='button-change-language' onClick={() => handleChangeVariable("language")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>
                    
                    <div className="information-container">
                        <label htmlFor="age">Age</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setAge(target.value)} data-testid='input-change-age' className='edit-input' type="number" id="age" name="age" min="1" max="200" placeholder={ age ? age : "Age..."}></input>
                            <button type="button" className='edit-btn' aria-label='button-change-age' onClick={() => handleChangeVariable("age")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>
                </div>

                <h1 className="heading">Personal informations</h1>
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
                        <label htmlFor="address">Address</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setAddress(target.value)} data-testid='input-change-address' className='edit-input' type="text" id="address" name="address" placeholder={ address ? address : "Address..."}></input>
                            <button type="button" className='edit-btn' aria-label='button-change-address' onClick={() => handleChangeVariable("address")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>
                    
                    <div className="information-container">
                        <label htmlFor="phonenumber">Phone number</label>
                        <div className='input-container'>
                            <input onChange={({ target }) => setPhonenumber(target.value)} data-testid='input-change-phone' className='edit-input' type="tel" id="phonenumber" name="phonenumber" placeholder={ phonenumber ? phonenumber : "Phone number..."}></input>
                            <button type="button" className='edit-btn' aria-label='button-change-phone' onClick={() => handleChangeVariable("phonenumber")}><AiOutlineEdit className='edit-icon' /></button>
                        </div>
                    </div>
                </div>

                <h1 className="heading">Security</h1>
                <div className="divider"> <span></span></div>

                <div className='section-container'>
                    <div className="information-container">
                        <label htmlFor="password">Password</label>
                        <div className="passwordInput">
                            <input onChange={({ target }) => setPassword(target.value)} data-testid='input-change-pswd' type={showEyePwd ? 'text' : 'password'} id="password" name="password" placeholder="**********"></input>
                            <button type="button" aria-label='button-change-show1' onClick={handleClickEyePwd}>{showEyePwd ? <AiFillEye className='passwordInputEye' size={20} /> : <AiFillEyeInvisible className='passwordInputEye' size={20} />}</button>
                        </div>
                        <label htmlFor="errorPassword" className='errorPassword'>The password must contain at least 8 characters.</label>
                    </div>
                    
                    <div className="information-container">
                        <label htmlFor="verifPassword">Verif password</label>
                        <div className="passwordInput">
                            <input onChange={({ target }) => setVerifPassword(target.value)} data-testid='input-change-cpswd' type={showEyeVerifPwd ? 'text' : 'password'} id="verifPassword" name="verifPassword" placeholder="**********"></input>
                            <button type="button"aria-label='button-change-show2' onClick={handleClickVerifEyePwd}>{showEyeVerifPwd ? <AiFillEye className='passwordInputEye' size={20} /> : <AiFillEyeInvisible className='passwordInputEye' size={20} />}</button>
                        </div>
                    </div>
                    <div className="information-container">
                        <button type="button" className='edit-password-btn' aria-label='button-change-password' onClick={() => handleChangeVariable("password")}>Edit password<AiOutlineEdit className='edit-password-icon' /></button>
                    </div>
                </div>

                <h1 className="heading">Delete Account</h1>
                <div className="divider"> <span></span></div>

                <div className='section-container'>
                    <div className="information-container">
                        <button type="button" className='delete-account-btn' aria-label='button-change-delete' onClick={() => setDeleteModal(true)}>Delete Account<AiOutlineDelete className='delete-account-icon' /></button>
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
                                        <button type="button" className="modal-btn modal-cancel-btn" aria-label='button-change-cancel' onClick={handleCloseModal}>Cancel</button>
                                        <button type="button" className="modal-btn modal-continue-btn" aria-label='button-change-continue' onClick={handleSubmit}>Continue</button>
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
                                        <button type="button" className="modal-btn modal-cancel-btn" aria-label='button-delete-cancel' onClick={() => setDeleteModal(false)}>Cancel</button>
                                        <button type="button" className="modal-btn modal-continue-btn" aria-label='button-delete-continue' onClick={handleDeleteAccount}>Continue</button>
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
                                    <h1 className="modal-title">Click to choose a new avatar :</h1>
                                    <div className="divider"> <span></span></div>
                                    <div className="modal-avatar-container">
                                        <button type="button" className='modal-avatar-button' aria-label='button-change-avatar-option' onClick={ () => handleSetNewAvatar("Avatars/Avatar01.png") }><img src="Avatars/Avatar01.png" alt="Avatar" className="Avatar"></img></button>
                                        <button type="button" className='modal-avatar-button' aria-label='button-change-avatar-option' onClick={ () => handleSetNewAvatar("Avatars/Avatar02.png") }><img src="Avatars/Avatar02.png" alt="Avatar" className="Avatar"></img></button>
                                        <button type="button" className='modal-avatar-button' aria-label='button-change-avatar-option' onClick={ () => handleSetNewAvatar("Avatars/Avatar03.png") }><img src="Avatars/Avatar03.png" alt="Avatar" className="Avatar"></img></button>
                                        <button type="button" className='modal-avatar-button' aria-label='button-change-avatar-option' onClick={ () => handleSetNewAvatar("Avatars/Avatar04.png") }><img src="Avatars/Avatar04.png" alt="Avatar" className="Avatar"></img></button>
                                        <button type="button" className='modal-avatar-button' aria-label='button-change-avatar-option' onClick={ () => handleSetNewAvatar("Avatars/Avatar05.png") }><img src="Avatars/Avatar05.png" alt="Avatar" className="Avatar"></img></button>
                                        <button type="button" className='modal-avatar-button' aria-label='button-change-avatar-option' onClick={ () => handleSetNewAvatar("Avatars/Avatar06.png") }><img src="Avatars/Avatar06.png" alt="Avatar" className="Avatar"></img></button>
                                        <button type="button" className='modal-avatar-button' aria-label='button-change-avatar-option' onClick={ () => handleSetNewAvatar("Avatars/Avatar07.png") }><img src="Avatars/Avatar07.png" alt="Avatar" className="Avatar"></img></button>
                                        <button type="button" className='modal-avatar-button' aria-label='button-change-avatar-option' onClick={ () => handleSetNewAvatar("Avatars/Avatar08.png") }><img src="Avatars/Avatar08.png" alt="Avatar" className="Avatar"></img></button>
                                        <div className="modal-avatar-cancel-btn-container">
                                            <button type="button" className="modal-avatar-cancel-btn" aria-label='button-change-avatar-close' onClick={() => setAvatarModal(false)}>Cancel</button>
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

export default SettingsPage;