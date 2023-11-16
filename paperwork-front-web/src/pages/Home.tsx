import { useColorModeValue, useColorMode } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";

import { getTranslation } from '../pages/Translation';

import Header from '../components/Header';
import Loading from "../components/Loading";
import ListEventCalendar from "../components/ListEventCalendar";

import "../styles/HomeContent.scss";

function HomePage() {
    const cookies = new Cookies();
    const cookieList = cookies.get('loginToken');
    const api = process.env.REACT_APP_BASE_URL;
    const [rdv, setRDV]: any = useState([]);
    const [userProcessInfo, setUserProcessInfo]: any = useState([]);
    const [language, setLanguage] = useState("");
    const translation = getTranslation(language, "home");
    const [isLoading, setIsLoading] = useState(true);

    const { colorMode } = useColorMode();
    const adaptedColor = useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(34, 34, 34, 0.65)");

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

    async function getUserDatasByToken() {
        try {
            await axios.get(`${api}/user/getbytoken`, { params: { token: cookieList.loginToken } })
                .then(res => {
                    setLanguage(res.data.language);
                }).catch(err => {
                    console.log(err)
                });
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }

    async function getCalendarDatas() {
        try {
            await axios.get(`${api}/calendar/getAll?token=${cookieList.loginToken}`)
                .then(res => {
                    let rdvTmp = [];
                    for (let i = 0; i < res.data.appoinment.length; i++) {
                        rdvTmp.push(
                            {
                                key: i,
                                date: res.data.appoinment[i]['date'],
                                process_title: res.data.appoinment[i]['process_title'],
                                step_title: res.data.appoinment[i]['step_title'],
                                step_description: res.data.appoinment[i]['step_description']
                            }
                        );
                    }
                    setRDV(rdvTmp);
                }).catch(err => {
                    console.error(err);
                })
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }

    async function getUserProcessData() {
        try {
            await axios.get(`${api}/userProcess/getUserProcesses?user_token=${cookieList.loginToken}`)
                .then(res => {
                    let userProcessTmp = [];
                    for (let j = 0; j < res.data.response.length; j++) {
                        if (res.data.response[j]['pourcentage'] != null)
                            userProcessTmp.push(
                                {
                                    key: j,
                                    process: res.data.response[j]['userProcess'].title,
                                    percentage: res.data.response[j]['pourcentage']
                                }
                            );
                        else
                            userProcessTmp.push(
                                {
                                    key: j,
                                    process: res.data.response[j]['userProcess'].title,
                                    percentage: 0
                                }
                            );
                    }
                    setUserProcessInfo(userProcessTmp);
                }).catch(err => {
                    console.error(err)
                });
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getUserDatasByToken();
        getCalendarDatas();
        getUserProcessData();
    }, []);

    return (
        <>
            <Header />
            <div className={colorMode === "light" ? "Home home-content-main-box-light" : "Home home-content-main-box-dark"}>
                <div className="home-container">
                    {
                        isLoading ? <Loading /> : <></>
                    }
                    <div className="home-wrapper">
                        <div className="home-image">
                            <img src="assets/home-page/home-logo.svg" alt="home_icon_image" />
                        </div>
                        <h1 className="home-title">
                            {translation.title}
                        </h1>
                        <div className="home-content-box-percentages" style={{ backgroundColor: useColorModeValue("rgba(233, 233, 233, 0.4)", "rgba(34, 34, 34, 0.65)") }}>
                            <h2 className="home-content-percentages-title">
                                {translation.process}
                            </h2>
                            <div className="home-content-item-percentages-container">
                                {
                                    userProcessInfo.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="home-content-box-percentages-item">
                                                <div className="home-content-box-percentages-item-top">
                                                    <span key="{itemAscProcess}" className={colorMode === "light" ? "home-content-box-percentages-item-border-light" : "home-content-box-percentages-item-border-dark"}>
                                                        {item.process}
                                                    </span>

                                                </div>
                                                <div className="home-content-box-percentages-item-bottom">
                                                    <div className="progress">
                                                        <div className={`progress-value ${getPercentageClass(item.percentage)}`} style={{ width: `${item.percentage}%` }}></div>
                                                    </div>
                                                    <span className={`percentage-value`} data-testid="percentageValue">
                                                        {item.percentage}%
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <Link to="/quiz">
                                <button className='home-content-start-process-button' aria-label="submit_button">
                                    {translation.newProcessButton}
                                </button>
                            </Link>
                        </div>
                        <div className="home-floating-buttons">
                            <Link to="/quiz">
                                <button className='home-floating-button' aria-label="submit_button">
                                    <img src="assets/help-page/help_icon.png" alt="Help_page_clickable_image" />
                                    <div className="home-floating-button-modal-description">
                                        <p>{translation.help}</p>
                                    </div>
                                </button>

                            </Link>
                            <Link to="/help">
                                <button className='home-floating-button' aria-label="submit_button">
                                    <img src="assets/lexicon-page/lexicon_icon.png" alt="Lexicon_page_clickable_image" />
                                    <div className="home-floating-button-modal-description">
                                        <p>{translation.lexicon}</p>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <ListEventCalendar
                        activeCalendarButton={true}
                        rdv={rdv}
                        language={language}
                        adaptedColor={adaptedColor}
                    />
                </div>
            </div>
        </>
    );
}

export default HomePage;