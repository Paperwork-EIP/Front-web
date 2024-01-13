import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AiFillEye, AiFillEyeInvisible, AiOutlineEdit } from 'react-icons/ai';
import { FaUserEdit } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { RxUpdate } from 'react-icons/rx';
import { TiUserDelete } from 'react-icons/ti';
import { useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import Header from '../components/Header';
import Loading from '../components/Loading';
import { getTranslation } from './Translation';

import "../styles/pages/Settings.scss";

function SettingsPage() {
    const cookies = new Cookies();

    const cookiesInfo = cookies.get('loginToken');

    const api = process.env.REACT_APP_BASE_URL;

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

    const [newUsername, setNewUsername] = useState("");
    const [newName, setNewName] = useState("");
    const [newFirstname, setNewFirstname] = useState("");
    const [newLanguage, setNewLanguage] = useState("");
    const [newAge, setNewAge] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newPhonenumber, setNewPhonenumber] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const translation = getTranslation(language, "settings");

    const { colorMode } = useColorMode();

    const [showEyePwd, setShowEyePwd] = React.useState(false);
    const handleClickEyePwd = () => setShowEyePwd(!showEyePwd);
    const [showEyeVerifPwd, setShowEyeVerifPwd] = React.useState(false);
    const handleClickVerifEyePwd = () => setShowEyeVerifPwd(!showEyeVerifPwd);

    const [deleteModal, setDeleteModal] = React.useState(false);
    const [avatarModal, setAvatarModal] = React.useState(false);
    const [currentSection, setCurrentSection] = useState("PersonalInformation");

    async function getUserData() {
        await axios.get(`${api}/user/getbytoken`, { params: { token: cookiesInfo.loginToken } })
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
                toast.error(translation.alertSystemError);
                console.log(err)
            });
        setIsLoading(false);
    }

    async function handleSubmit() {
        setIsLoading(true);

        const parameters = { token: cookiesInfo.loginToken };
        let isAnyNewValue = false;

        function checkAndAssign(newValue: string, oldValue: string, paramName: string) {
            if (newValue.length > 0 && oldValue !== newValue) {
                Object.assign(parameters, { [paramName]: newValue });
                isAnyNewValue = true;
            }
        };

        checkAndAssign(newUsername, username, 'username');
        checkAndAssign(newName, name, 'name');
        checkAndAssign(newFirstname, firstname, 'firstname');
        checkAndAssign(newLanguage, language, 'language');
        checkAndAssign(newAge, age, 'age');
        checkAndAssign(newEmail, email, 'new_email');
        checkAndAssign(newAddress, address, 'address');
        checkAndAssign(newPhonenumber, phonenumber, 'number_phone');

        if (isAnyNewValue) {
            await axios.post(`${api}/user/modifyDatas`, parameters)
                .then(() => {
                    toast.success(translation.alertUpdateProfileInfo);
                    newUsername.length > 0 ? setUsername(newUsername) : setUsername(username);
                    newName.length > 0 ? setName(newName) : setName(name);
                    newFirstname.length > 0 ? setFirstname(newFirstname) : setFirstname(firstname);
                    newLanguage.length > 0 ? setLanguage(newLanguage) : setLanguage(language);
                    newAge.length > 0 ? setAge(newAge) : setAge(age);
                    newEmail.length > 0 ? setEmail(newEmail) : setEmail(email);
                    newAddress.length > 0 ? setAddress(newAddress) : setAddress(address);
                    newPhonenumber.length > 0 ? setPhonenumber(newPhonenumber) : setPhonenumber(phonenumber);
                })
                .catch(err => {
                    console.log(err);
                    if (err.response && err.response.status) {
                        const { status } = err.response;
                        switch (status) {
                            case 400:
                                toast.error(translation.alertMissingToken);
                                break;
                            case 404:
                                toast.error(translation.alertUserNotFound);
                                break;
                            case 409:
                                toast.error(translation.alertUsernameAlreadyUsed);
                                break;
                            case 500:
                                toast.error(translation.alertSystemError);
                                break;
                            default:
                                break;
                        }
                    }
                });
        } else {
            toast.error(translation.alertNoChange);
        }

        setIsLoading(false);
    };

    async function handleChangePassword() {
        setIsLoading(true);
        const passwordInput = document.getElementById('password') as HTMLInputElement;

        if (passwordInput.value === undefined || passwordInput.value === null || passwordInput.value === "") {
            toast.error(translation.alertEmptyPassword);
        } else {
            if (password.length >= 0 && password === verifPassword) {
                await axios.post(`${api}/user/modifyDatas`, {
                    token: cookiesInfo.loginToken,
                    password: password,
                }).then(res => {
                    console.log(res.data);
                    toast.success(translation.alertUpdatePassword);
                }).catch(err => {
                    console.log(err)
                    if (err.response.status === 400) {
                        toast.error(translation.alertMissingToken);
                    } else if (err.response.status === 404) {
                        toast.error(translation.alertUserNotFound);
                    } else if (err.response.status === 500) {
                        toast.error(translation.alertSystemError);
                    }
                });
            } else {
                toast.error(translation.alertPasswordNotMatch);
            }
        }
        setIsLoading(false);
    }

    async function handleDeleteAccount() {
        setIsLoading(true);
        await axios.get(`${api}/user/delete`, {
            params: {
                token: cookiesInfo.loginToken,
            }
        }).then(() => {
            toast.success(translation.alertDeleteAccount);
            cookies.remove('loginToken', { path: '/' });
            window.location.reload();
        }).catch(err => {
            console.log(err)
            if (err.response.status === 400) {
                toast.error(translation.alertMissingToken);
            } else if (err.response.status === 404) {
                toast.error(translation.alertUserNotFound);
            } else if (err.response.status === 500) {
                toast.error(translation.alertSystemError);
            }
        });
        setDeleteModal(!deleteModal);
        setIsLoading(false);
    }

    async function handleSetNewAvatar(newAvatar: string) {
        setIsLoading(true);
        await axios.post(`${api}/user/modifyDatas`, {
            token: cookiesInfo.loginToken,
            profile_picture: newAvatar,
        }).then(() => {
            toast.success(translation.alertAvatarUpdated);
            window.location.reload();
        }).catch(err => {
            console.log(err)
            if (err.response.status === 400) {
                toast.error(translation.alertMissingToken);
            } else if (err.response.status === 404) {
                toast.error(translation.alertUserNotFound);
            } else if (err.response.status === 500) {
                toast.error(translation.alertSystemError);
            }
        });
        setAvatarModal(!avatarModal);
        setIsLoading(false);
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            <Header />
            {
                isLoading ? <Loading /> : <></>
            }
            <div className={`Settings ${colorMode === "light" ? "Settings-light" : "Settings-dark"}`}>
                <div className="title">{translation.title}</div>
                <div className="settings-container">
                    <div className="choice-container">
                        <button
                            aria-label="button-personal-information-section"
                            onClick={() => setCurrentSection("PersonalInformation")}
                            className="choice-button"
                        >
                            <FaUserEdit className="choice-icon" />
                            {translation.choice1}
                        </button>
                        <button
                            aria-label="button-security-section"
                            onClick={() => setCurrentSection("Security")}
                            className="choice-button"
                        >
                            <RiLockPasswordFill className="choice-icon" />
                            {translation.choice2}
                        </button>
                        <button
                            aria-label="button-delete-account-section"
                            onClick={() => setCurrentSection("DeleteAccount")}
                            className="choice-button"
                        >
                            <TiUserDelete className="choice-icon" />
                            {translation.choice3}
                        </button>
                    </div>

                    {currentSection === "PersonalInformation" && (
                        <div className="section-container">
                            <div className="section-title">{translation.choice1}</div>
                            <div className="information-container-avatar">
                                <div className="avatar-container">
                                    <img
                                        src={profilePicture === null ? "/assets/avatar/no_avatar.png" : profilePicture}
                                        alt="Avatar"
                                        className="Avatar"
                                    />
                                    <button aria-label="button-change-avatar" onClick={() => setAvatarModal(!avatarModal)}>
                                        <img src="/assets/avatar/picture_modif.png" alt="PictureModif" className="ModifImg" />
                                    </button>
                                </div>
                            </div>

                            <div className="information-container">
                                <label htmlFor="username">{translation.username}</label>
                                <div className="input-container">
                                    <input
                                        onChange={({ target }) => setNewUsername(target.value)}
                                        data-testid="input-change-username"
                                        className="edit-input"
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder={username ? username : translation.usernamePlaceholder}
                                    />
                                </div>
                            </div>

                            <div className="information-container">
                                <label htmlFor="name">{translation.name}</label>
                                <div className="input-container">
                                    <input
                                        onChange={(event) => setNewName(event.target.value)}
                                        data-testid="input-change-name"
                                        className="edit-input"
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder={name ? name : translation.namePlaceholder}
                                    />
                                </div>
                            </div>

                            <div className="information-container">
                                <label htmlFor="firstname">{translation.firstname}</label>
                                <div className="input-container">
                                    <input
                                        onChange={({ target }) => setNewFirstname(target.value)}
                                        data-testid="input-change-firstname"
                                        className="edit-input"
                                        type="text"
                                        id="firstname"
                                        name="firstname"
                                        placeholder={firstname ? firstname : translation.firstnamePlaceholder}
                                    />
                                </div>
                            </div>

                            <div className="information-container">
                                <label htmlFor="language">{translation.language}</label>
                                <div className="input-container">
                                    <select
                                        onChange={({ target }) => setNewLanguage(target.value)}
                                        value={newLanguage.length > 0 && newLanguage !== language ? newLanguage : language}
                                        name="Language-Select"
                                        id="Language-Select"
                                        data-testid="select-change-language"
                                        className="edit-select"
                                    >
                                        <option data-testid="select-option" value="english">
                                            English
                                        </option>
                                        <option data-testid="select-option" value="french">
                                            Français
                                        </option>
                                        <option data-testid="select-option" value="german">
                                            Deutsch
                                        </option>
                                        <option data-testid="select-option" value="korean">
                                            Korean
                                        </option>
                                        <option data-testid="select-option" value="indonesian">
                                            Indonesia
                                        </option>
                                        <option data-testid="select-option" value="spanish">
                                            Espanol
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="information-container">
                                <label htmlFor="age">{translation.age}</label>
                                <div className="input-container">
                                    <input
                                        onChange={({ target }) => setNewAge(target.value)}
                                        data-testid="input-change-age"
                                        className="edit-input"
                                        type="number"
                                        id="age"
                                        name="age"
                                        min="1"
                                        max="200"
                                        placeholder={age ? age : translation.agePlaceholder}
                                    />
                                </div>
                            </div>

                            <div className="information-container">
                                <label htmlFor="email">Email</label>
                                <div className="input-container">
                                    <input
                                        onChange={({ target }) => setNewEmail(target.value)}
                                        data-testid="input-change-email"
                                        className="edit-input"
                                        type="email"
                                        pattern=".+@globex\.com"
                                        id="email"
                                        name="email"
                                        placeholder={email ? email : "Email..."}
                                    />
                                </div>
                            </div>

                            <div className="information-container">
                                <label htmlFor="address">{translation.address}</label>
                                <div className="input-container">
                                    <input
                                        onChange={({ target }) => setNewAddress(target.value)}
                                        data-testid="input-change-address"
                                        className="edit-input"
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder={address ? address : translation.addressPlaceholder}
                                    />
                                </div>
                            </div>

                            <div className="information-container">
                                <label htmlFor="phonenumber">{translation.phonenumber}</label>
                                <div className="input-container">
                                    <input
                                        onChange={({ target }) => setNewPhonenumber(target.value)}
                                        data-testid="input-change-phone"
                                        className="edit-input"
                                        type="tel"
                                        id="phonenumber"
                                        name="phonenumber"
                                        placeholder={phonenumber ? phonenumber : translation.phonenumberPlaceholder}
                                    />
                                </div>
                            </div>

                            <div className="update-btn-container">
                                <button
                                    type="button"
                                    className="update-personal-info-btn"
                                    aria-label="update-personal-info-btn"
                                    onClick={() => handleSubmit()}
                                >
                                    {translation.updateBtn}
                                    <RxUpdate className="update-personal-info-icon" />
                                </button>
                            </div>
                        </div>
                    )}

                    {currentSection === "Security" && (
                        <div className="section-container">
                            <div className="section-title">{translation.choice2}</div>
                            <div className="information-container">
                                <label htmlFor="password">{translation.password}</label>
                                <div className="passwordInput">
                                    <input
                                        onChange={({ target }) => setPassword(target.value)}
                                        data-testid="input-change-pswd"
                                        type={showEyePwd ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        placeholder="**********"
                                    />
                                    <button type="button" aria-label="button-change-show1" onClick={handleClickEyePwd}>
                                        {showEyePwd ? <AiFillEye className="passwordInputEye" size={20} /> : <AiFillEyeInvisible className="passwordInputEye" size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="information-container">
                                <label htmlFor="verifPassword">{translation.verifPassword}</label>
                                <div className="passwordInput">
                                    <input
                                        onChange={({ target }) => setVerifPassword(target.value)}
                                        data-testid="input-change-cpswd"
                                        type={showEyeVerifPwd ? "text" : "password"}
                                        id="verifPassword"
                                        name="verifPassword"
                                        placeholder="**********"
                                    />
                                    <button type="button" aria-label="button-change-show2" onClick={handleClickVerifEyePwd}>
                                        {showEyeVerifPwd ? <AiFillEye className="passwordInputEye" size={20} /> : <AiFillEyeInvisible className="passwordInputEye" size={20} />}
                                    </button>
                                </div>
                            </div>
                            <label htmlFor="errorPassword" className="errorPassword">
                                {translation.errorPassword}
                            </label>
                            <div className="update-btn-container">
                                <button
                                    type="button"
                                    className="update-personal-info-btn"
                                    aria-label="update-password-btn"
                                    onClick={() => handleChangePassword()}
                                >
                                    {translation.editPassword}
                                    <AiOutlineEdit className="update-personal-info-icon" />
                                </button>
                            </div>
                        </div>
                    )}

                    {currentSection === "DeleteAccount" && (
                        <div className="section-container">
                            <div className="section-title">{translation.choice3}</div>
                            <label htmlFor="errorPassword" className="errorPassword">
                                {translation.deleteModalQst}
                            </label>
                            <div className="update-btn-container">
                                <button
                                    type="button"
                                    className="delete-account-btn"
                                    aria-label="delete-account-btn"
                                    onClick={() => setDeleteModal(true)}
                                >
                                    {translation.deleteAccount}
                                    <TiUserDelete className="update-personal-info-icon" />
                                </button>
                            </div>
                        </div>
                    )}

                    {deleteModal && (
                        <div id="changeVariableModal" className="modal-background">
                            <div className="modal-container">
                                <div className="modal-content">
                                    <h1 className="modal-title">{translation.deleteModalQst}</h1>
                                    <div className="divider">
                                        <span></span>
                                    </div>
                                    <div className="modal-button-container">
                                        <button type="button" className="modal-btn modal-cancel-btn" aria-label="button-delete-cancel" onClick={() => setDeleteModal(false)}>
                                            {translation.cancelBtn}
                                        </button>
                                        <button type="button" className="modal-btn modal-continue-btn" aria-label="button-delete-continue" onClick={handleDeleteAccount}>
                                            {translation.continueBtn}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {avatarModal && (
                        <div id="changeVariableModal" className="modal-background">
                            <div className="modal-container">
                                <div className="modal-content">
                                    <h1 className="modal-title">{translation.avatarModalTxt}</h1>
                                    <div className="divider">
                                        <span></span>
                                    </div>
                                    <div className="modal-avatar-container">
                                        <button type="button" className="modal-avatar-button" aria-label="button-change-avatar-option" onClick={() => handleSetNewAvatar("/assets/avatar/avatar01.png")}>
                                            <img src="/assets/avatar/avatar01.png" alt="Avatar" className="Avatar" />
                                        </button>
                                        <button type="button" className="modal-avatar-button" aria-label="button-change-avatar-option" onClick={() => handleSetNewAvatar("/assets/avatar/avatar02.png")}>
                                            <img src="/assets/avatar/avatar02.png" alt="Avatar" className="Avatar" />
                                        </button>
                                        <button type="button" className="modal-avatar-button" aria-label="button-change-avatar-option" onClick={() => handleSetNewAvatar("/assets/avatar/avatar03.png")}>
                                            <img src="/assets/avatar/avatar03.png" alt="Avatar" className="Avatar" />
                                        </button>
                                        <button type="button" className="modal-avatar-button" aria-label="button-change-avatar-option" onClick={() => handleSetNewAvatar("/assets/avatar/avatar04.png")}>
                                            <img src="/assets/avatar/avatar04.png" alt="Avatar" className="Avatar" />
                                        </button>
                                        <button type="button" className="modal-avatar-button" aria-label="button-change-avatar-option" onClick={() => handleSetNewAvatar("/assets/avatar/avatar05.png")}>
                                            <img src="/assets/avatar/avatar05.png" alt="Avatar" className="Avatar" />
                                        </button>
                                        <button type="button" className="modal-avatar-button" aria-label="button-change-avatar-option" onClick={() => handleSetNewAvatar("/assets/avatar/avatar06.png")}>
                                            <img src="/assets/avatar/avatar06.png" alt="Avatar" className="Avatar" />
                                        </button>
                                        <button type="button" className="modal-avatar-button" aria-label="button-change-avatar-option" onClick={() => handleSetNewAvatar("/assets/avatar/avatar05.png")}>
                                            <img src="/assets/avatar/avatar07.png" alt="Avatar" className="Avatar" />
                                        </button>
                                        <button type="button" className="modal-avatar-button" aria-label="button-change-avatar-option" onClick={() => handleSetNewAvatar("/assets/avatar/avatar06.png")}>
                                            <img src="/assets/avatar/avatar08.png" alt="Avatar" className="Avatar" />
                                        </button>
                                    </div>
                                    <div className="modal-button-container">
                                        <button type="button" className="modal-btn modal-cancel-btn" aria-label="button-change-avatar-cancel" onClick={() => setAvatarModal(false)}>
                                            {translation.cancelBtn}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
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