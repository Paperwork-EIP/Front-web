import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Icon,
  useColorModeValue,
  IconProps,
  OmitCommonProps,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { SVGProps, } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import "../../styles/HomeContent.scss";
import { Link } from "react-router-dom";
import { getTranslation } from '../../pages/Translation';
import { BsFillCalendarDateFill, BsHourglassSplit } from "react-icons/bs"

const CircleIcon = (
  prop: JSX.IntrinsicAttributes &
    OmitCommonProps<SVGProps<SVGSVGElement>, keyof IconProps> &
    IconProps & { as?: "svg" | undefined }
) => (
  <Icon viewBox="0 0 100 100" {...prop}>
    <path
      margin-left="2px"
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);

const Bg = () => {
  const cookies = new Cookies();
  const cookieList = cookies.get('loginToken');
  const api = process.env.REACT_APP_BASE_URL;
  var index = -2;
  const [rdv, setRDV] = useState([[]]);
  const [userProcessInfo, setUserProcessInfo]: any = useState([{}]);
  const [activeAsc, setActiveAsc] = useState(false);
  const [activeAlp, setActiveAlp] = useState(false);
  const [activePriority, setActivePriority] = useState(false);
  const ascendingArray = [...userProcessInfo].sort((a, b) => a.percentage - b.percentage);
  const descendingArray = [...userProcessInfo].sort((a, b) => b.percentage - a.percentage);
  const alphabeticArray = [...userProcessInfo].sort((a, b) => a.process > b.process ? 1 : -1);
  const invertArray = [...userProcessInfo].sort((a, b) => a.process > b.process ? -1 : 1);
  const [language, setLanguage] = useState("");
  const translation = getTranslation(language, "home");
  const [date, setDate] = useState(new Date());
  const selectedMonth = date.toDateString()?.split(" ")[1] === "Jan" ? "01" : date.toDateString()?.split(" ")[1] === "Feb" ? "02" : date.toDateString()?.split(" ")[1] === "Mar" ? "03" :
    date.toDateString()?.split(" ")[1] === "Apr" ? "04" : date.toDateString()?.split(" ")[1] === "May" ? "05" : date.toDateString()?.split(" ")[1] === "Jun" ? "06" :
      date.toDateString()?.split(" ")[1] === "Jul" ? "07" : date.toDateString()?.split(" ")[1] === "Aug" ? "08" : date.toDateString()?.split(" ")[1] === "Sep" ? "09" :
        date.toDateString()?.split(" ")[1] === "Oct" ? "10" : date.toDateString()?.split(" ")[1] === "Nov" ? "11" : date.toDateString()?.split(" ")[1] === "Dec" ? "12" : "Not Set";
  const comparativeDate = date.toDateString()?.split(" ")[3] + "-" + selectedMonth + "-" + date.toDateString()?.split(" ")[2];
  let colorEvent = "";

  useEffect(() => {
    axios.get(`${api}/user/getbytoken`, { params: { token: cookieList.loginToken } })
      .then(res => {
        setLanguage(res.data.language);
      }).catch(err => {
        console.log(err)
      });
    axios.get(`${api}/calendar/getAll?token=${cookieList.loginToken}`)
      .then(res => {
        var rdvTmp = [];
        for (var i = 0; i < res.data.appoinment.length; i++) {
          rdvTmp.push(res.data.appoinment[i]['date'], res.data.appoinment[i]['step_title'], res.data.appoinment[i]['step_description']);
        }
        setRDV(rdvTmp);
      }).catch(err => {
        console.log(err);
      })
  }, [rdv])

  useEffect(() => {
    axios.get(`${api}/userProcess/getUserProcesses?user_token=${cookieList.loginToken}`)
      .then(res => {
        var userProcessTmp = [];
        for (var j = 0; j < res.data.response.length; j++) {
          if (res.data.response[j]['pourcentage'] != null)
            userProcessTmp.push({ process: res.data.response[j]['userProcess'].title, percentage: res.data.response[j]['pourcentage'] });
          else
            userProcessTmp.push({ process: res.data.response[j]['userProcess'].title, percentage: 0 });;
        }
        setUserProcessInfo(userProcessTmp);

      }).catch(err => {
        console.log(err)
      });
  }, [rdv])

  const handleClickAsc = () => {
    setActiveAsc(!activeAsc);
    setActivePriority(true);
  }

  const handleClickAlp = () => {
    setActiveAlp(!activeAlp);
    setActivePriority(false);
  }

  const { colorMode } = useColorMode();
  const adaptedColor = useColorModeValue("#f2f2f2", "rgba(45,45,55,1)");

  const getPercentageClass = (percentage: number) => {
    if (percentage <= 25) return "percentage-low";
    else if (percentage <= 50) return "percentage-medium";
    else if (percentage <= 75) return "percentage-high";
    else return "percentage-very-high";
  };

  return (
    <>
      <div className="Home">
        {colorMode === "light" ?
          <div className="home-content-main-box-light">
          </div>
          :
          <div className="home-content-main-box-dark">
          </div>
        }

        <div className="home-container">
          <div className="home-wrapper">
            <div className="home-image">
              <img src="assets/home-page/home-logo.svg" alt="home_icon_image" />
            </div>
            <h1 className="home-title"> {translation.title} </h1>
            <div className="home-content-box-percentages" style={{ backgroundColor: useColorModeValue("#f2f2f2", "rgba(228,228,228,0.20)") }}>
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
                          ascendingArray?.map((item: any) => {
                            return (
                              <Tr>
                                <Td key="{itemAscProcess}">{item.process}</Td>
                                <Td key="{itemAscPercent}" isNumeric>
                                  <div className={`percentage-value ${getPercentageClass(item.percentage)}`}>{item.percentage}%</div>
                                </Td>
                              </Tr>
                            );
                          })
                          :
                          descendingArray?.map((item: any) => {
                            return (
                              <Tr>
                                <Td key="{itemDscProcess}">{item.process}</Td>
                                <Td key="{itemDscPercent}" isNumeric>
                                  <div className={`percentage-value ${getPercentageClass(item.percentage)}`}>{item.percentage}%</div>
                                </Td>
                              </Tr>
                            );
                          })
                        :
                        activeAlp ?
                          alphabeticArray?.map((item: any) => {
                            return (
                              <Tr>
                                <Td key="{itemAlpProcess}">{item.process}</Td>
                                <Td key="{itemAlpPercent}" isNumeric>
                                  <div className={`percentage-value ${getPercentageClass(item.percentage)}`}>{item.percentage}%</div>
                                </Td>
                              </Tr>
                            );
                          })
                          :
                          invertArray?.map((item: any) => {
                            return (
                              <Tr>
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
            <div className="home-content-box-help-base" style={{ backgroundColor: useColorModeValue("#f2f2f2", "rgba(228,228,228,0.20)") }}>
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

          <div className="home-content-box-calendar" style={{ backgroundColor: useColorModeValue("#f2f2f2", "rgba(228,228,228,0.20)") }}>
            {
              rdv.length !== 0 ?
                <>
                  <div className="home-content-box-calendar-icons-box">
                    <div className="home-content-calendar-text"> {translation.events} </div>
                    <CircleIcon className="home-content-box-calendar-icon" color="#FC6976" mt={'-18px'} />
                    <div className="home-content-calendar-icon-text"> {translation.applied} </div>
                    <CircleIcon className="home-content-box-calendar-icon" color="#fc9f69" mt={'2px'} />
                    <div className="home-content-calendar-icon-text" style={{ marginTop: '20px' }}> {translation.today} </div>
                    <CircleIcon className="home-content-box-calendar-icon" color="#29C9B3" mt={'22px'} />
                    <div className="home-content-calendar-icon-text" style={{ marginTop: '40px' }}> {translation.left} </div>
                  </div>

                  <div className="home-content-box-calendar-in">
                    {rdv?.map((item: any) => {
                      index += 3;
                      if (index <= rdv.length) {
                        if (rdv[index - 1].toString()?.split('T')[0].split('-')[0] + rdv[index - 1].toString()?.split('T')[0].split('-')[1] + rdv[index - 1].toString()?.split('T')[0].split('-')[2] === comparativeDate.split('-')[0] + comparativeDate.split('-')[1] + comparativeDate.split('-')[2]) {
                          colorEvent = "#fc9f69";
                        } else if (rdv[index - 1].toString()?.split('T')[0].split('-')[0] + rdv[index - 1].toString()?.split('T')[0].split('-')[1] + rdv[index - 1].toString()?.split('T')[0].split('-')[2] < comparativeDate.split('-')[0] + comparativeDate.split('-')[1] + comparativeDate.split('-')[2]) {
                          colorEvent = "#FC6976";
                        } else {
                          colorEvent = "#29C9B3";
                        }
                        return (

                          <div className="home-content-box-rendez-vous" style={{ backgroundColor: colorEvent }}>
                            <div className="home-content-rendez-vous-date-text" style={{ color: "#f2f2f2" }}>
                              <div className="home-content-icon-and-date">
                                <div className="icon-container">
                                  <BsFillCalendarDateFill style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                                  {rdv[index - 1].toString()?.split('T')[0]}
                                  <BsHourglassSplit style={{ marginRight: '3px', marginLeft: "20px", verticalAlign: 'middle' }} />
                                  {rdv[index - 1].toString()?.split('T')[1]?.split('.')[0].split(':')[0] + ':' + rdv[index - 1].toString()?.split('T')[1]?.split('.')[0].split(':')[1]}
                                </div>
                              </div>
                            </div>

                            <div className="home-content-rendez-vous-process-name-text" style={{ color: "#f2f2f2" }}>
                              {rdv[index]}
                            </div>
                            <div className="home-content-rendez-vous-process-description-text" style={{ color: "#f2f2f2" }}>
                              {rdv[index + 1]}
                            </div>
                          </div>
                        );
                      } else
                        return ('');
                    })}
                  </div>
                  <Link to="/calendar">
                    <button className='home-calendar-button' aria-label="submit_button">
                      {translation.calendar}
                    </button>
                  </Link>
                </>
                :
                <>
                  <div className="home-content-calendar-text"> {translation.calendar} </div>
                  <div className="home-content-line-calendar" style={{ backgroundColor: adaptedColor }} ></div>
                  <div className="home-content-nothing-text"> {translation.nothing} </div>
                </>
            } </div>
        </div>
      </div>
    </>
  );
};

export default Bg;