import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    useColorModeValue,
    useColorMode,
    Button,
} from "@chakra-ui/react";
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
    const [activeAsc, setActiveAsc] = useState(false);
    const [activeAlp, setActiveAlp] = useState(false);
    const [activePriority, setActivePriority] = useState(false);
    const ascendingArray = [...userProcessInfo].sort((a, b) => a.percentage - b.percentage);
    const descendingArray = [...userProcessInfo].sort((a, b) => b.percentage - a.percentage);
    const alphabeticArray = [...userProcessInfo].sort((a, b) => a.process > b.process ? 1 : -1);
    const invertArray = [...userProcessInfo].sort((a, b) => a.process > b.process ? -1 : 1);
    const [language, setLanguage] = useState("");
    const translation = getTranslation(language, "home");
    const [isLoading, setIsLoading] = useState(true);

    const { colorMode } = useColorMode();
    const adaptedColor = useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(34, 34, 34, 0.65)");

    function handleClickAsc() {
        setActiveAsc(!activeAsc);
        setActivePriority(true);
    }

    function handleClickAlp() {
        setActiveAlp(!activeAlp);
        setActivePriority(false);
    }

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
            axios.get(`${api}/calendar/getAll?token=${cookieList.loginToken}`)
                .then(res => {
                    var rdvTmp = [];
                    for (var i = 0; i < res.data.appoinment.length; i++) {
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
                    var userProcessTmp = [];
                    for (var j = 0; j < res.data.response.length; j++) {
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
            <div className="Home">
                {
                    colorMode === "light" ?
                        <div className="home-content-main-box-light">
                        </div>
                        :
                        <div className="home-content-main-box-dark">
                        </div>
                }
                <div className="home-container">
                    {
                        isLoading ? <Loading /> : <></>
                    }
                    <div className="home-wrapper">
                        <div className="home-image">
                            <img src="assets/home-page/home-logo.svg" alt="home_icon_image" />
                        </div>
                        <h1 className="home-title"> {translation.title} </h1>
                        <div className="home-content-box-percentages" style={{ backgroundColor: useColorModeValue("rgba(233, 233, 233, 0.4)", "rgba(34, 34, 34, 0.65)") }}>
                            <div className="home-content-help-text"> {translation.process} </div>
                            <TableContainer>
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>
                                                <Button onClick={handleClickAlp} aria-label="click-alp">
                                                    {activeAlp ? "Z...A" : "A...Z"}
                                                </Button>
                                            </Th>
                                            <Th isNumeric>
                                                <Button onClick={handleClickAsc} aria-label="click-asc">
                                                    {activeAsc ? translation.descending : translation.ascending}
                                                </Button>
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            activePriority === true ?
                                                activeAsc ?
                                                    ascendingArray?.map((item: any, index: any) => {
                                                        return (
                                                            <Tr key={index.toString() + item.process}>
                                                                <Td key="{itemAscProcess}">{item.process}</Td>
                                                                <Td key="{itemAscPercent}" isNumeric>
                                                                    <div className={`percentage-value ${getPercentageClass(item.percentage)}`}>{item.percentage}%</div>
                                                                </Td>
                                                            </Tr>
                                                        );
                                                    })
                                                    :
                                                    descendingArray?.map((item: any, index: any) => {
                                                        return (
                                                            <Tr key={index.toString() + item.process}>
                                                                <Td key="{itemDscProcess}">{item.process}</Td>
                                                                <Td key="{itemDscPercent}" isNumeric>
                                                                    <div className={`percentage-value ${getPercentageClass(item.percentage)}`}>{item.percentage}%</div>
                                                                </Td>
                                                            </Tr>
                                                        );
                                                    })
                                                :
                                                activeAlp ?
                                                    alphabeticArray?.map((item: any, index: any) => {
                                                        return (
                                                            <Tr key={index.toString() + item.process}>
                                                                <Td key="{itemAlpProcess}">{item.process}</Td>
                                                                <Td key="{itemAlpPercent}" isNumeric>
                                                                    <div className={`percentage-value ${getPercentageClass(item.percentage)}`}>{item.percentage}%</div>
                                                                </Td>
                                                            </Tr>
                                                        );
                                                    })
                                                    :
                                                    invertArray?.map((item: any, index: any) => {
                                                        return (
                                                            <Tr key={index + item.process}>
                                                                <Td key="{itemInvProcess}">{item.process}</Td>
                                                                <Td key="{itemInvPercent}" isNumeric>
                                                                    <div className={`percentage-value ${getPercentageClass(item.percentage)}`}>{item.percentage}%</div>
                                                                </Td>
                                                            </Tr>
                                                        );
                                                    })
                                        }

                                    </Tbody>
                                </Table>
                            </TableContainer>
                            <Link to="/quiz">
                                <button className='home-content-start-process-button' aria-label="submit_button">
                                    {translation.newProcessButton}
                                </button>
                            </Link>
                        </div>
                        <div className="home-content-box-help-base" style={{ backgroundColor: useColorModeValue("rgba(233, 233, 233, 0.4)", "rgba(34, 34, 34, 0.65)") }}>
                            <div className="home-content-help-text"> {translation.needHelp} </div>
                            <div className="home-content-box-help-wrapper">
                                <div className="home-content-box-help" style={{ backgroundColor: adaptedColor }}>
                                    <Link to="/help">
                                        <div className="home-content-help-help-text"> {translation.help} </div>
                                        <img className="home-help-image" src="assets/help-page/FAQs-bro.png" alt="Help_page_clickable_image" />
                                    </Link>
                                </div>
                                <div className="home-content-box-lexicon" style={{ backgroundColor: adaptedColor }}>
                                    <Link to="/lexicon">
                                        <div className="home-content-help-lexicon-text"> {translation.lexicon} </div>
                                        <img className="home-help-image" src="assets/lexicon-page/Lexicon-icon.png" alt="Lexicon_page_clickable_image" />
                                    </Link>
                                </div>
                            </div>
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