import React from "react";
import { Link } from "react-router-dom";
import { Icon, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { BsFillCalendarDateFill, BsHourglassSplit } from "react-icons/bs";

import { getTranslation } from "../pages/Translation";

import "../styles/components/ListEventCalendar.scss";

interface Props {
    language: string;
    adaptedColor: string;
    rdv: any;
    activeCalendarButton: boolean;
    style?: any;
}

function CircleIcon(prop: any) {
    return (
        <Icon viewBox="0 0 100 100" {...prop}>
            <path
                fill="currentColor"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
            />
        </Icon>
    )
};

function ListEventCalendar(props: Readonly<Props>) {
    let colorEvent = "";
    const date = new Date();
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const comparativeDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + day;
    const rdv = props.rdv;
    const style = props.style ? props.style : "list-event-calendar-box-calendar";
    const adaptedColor = props.adaptedColor;
    const activeCalendarButton = props.activeCalendarButton;

    const { colorMode } = useColorMode();
    const translation = getTranslation(props.language, "home");

    return (
        <div className={style} style={{ backgroundColor: useColorModeValue("rgba(233, 233, 233, 0.4)", "rgba(34, 34, 34, 0.65)") }}>
            {
                rdv.length !== 0 ?
                    <>
                        <div className="list-event-calendar-box-calendar-icons-box">
                            <div className="list-event-calendar-calendar-text">
                                {translation.events}
                            </div>
                            <CircleIcon className="list-event-calendar-box-calendar-icon" color="#FC6976" mt={'-18px'} />
                            <div className="list-event-calendar-calendar-icon-text">
                                {translation.applied}
                            </div>
                            <CircleIcon className="list-event-calendar-box-calendar-icon" color="#fc9f69" mt={'2px'} />
                            <div className="list-event-calendar-calendar-icon-text" style={{ marginTop: '20px' }}>
                                {translation.today}
                            </div>
                            <CircleIcon className="list-event-calendar-box-calendar-icon" color="#29C9B3" mt={'22px'} />
                            <div className="list-event-calendar-calendar-icon-text" style={{ marginTop: '40px' }}>
                                {translation.left}
                            </div>
                        </div>

                        <div className="list-event-calendar-box-calendar-in">
                            {
                                rdv.map((item: any) => {
                                    const convertedDateItem = new Date(item.date);
                                    const convertedDateSelected = new Date(comparativeDate);

                                    const checkTodayDate = convertedDateItem.getFullYear() + '-' + (convertedDateItem.getMonth() + 1) + '-' + convertedDateItem.getDate();
                                    const checkSelectedDate = convertedDateSelected.getFullYear() + '-' + (convertedDateSelected.getMonth() + 1) + '-' + convertedDateSelected.getDate();

                                    if (checkTodayDate === checkSelectedDate) {
                                        colorEvent = "#fc9f69";
                                    } else if (convertedDateItem < convertedDateSelected) {
                                        colorEvent = "#FC6976";
                                    } else {
                                        colorEvent = "#29C9B3";
                                    }

                                    return (
                                        <div className="list-event-calendar-box-rendez-vous" style={{ borderColor: colorEvent, backgroundColor: colorMode === 'light' ? "#ffffff" : "#303030" }} key={item.key}>
                                            <div className="list-event-calendar-rendez-vous-date-text">
                                                <div className="list-event-calendar-icon-and-date">
                                                    <div className="icon-container">
                                                        <BsFillCalendarDateFill style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                                                        {item.date?.split('T')[0]}
                                                        <BsHourglassSplit style={{ marginRight: '3px', marginLeft: "20px", verticalAlign: 'middle' }} />
                                                        {item.date?.split('T')[1]?.split('.')[0].split(':')[0] + ':' + item.date?.split('T')[1]?.split('.')[0].split(':')[1]}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="list-event-calendar-rendez-vous-process-name-text">
                                                {item.process_title} - {item.step_title}
                                            </div>
                                            <div className="list-event-calendar-rendez-vous-process-description-text">
                                                {item.step_description}
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </>
                    :
                    <>
                        <div className="list-event-calendar-calendar-text">{translation.calendar}</div>
                        <div className="list-event-calendar-line-calendar" style={{ backgroundColor: adaptedColor }}></div>
                        <div className="list-event-calendar-nothing-text">{translation.nothing}</div>
                    </>
            }
            {
                activeCalendarButton ?
                    <Link to="/calendar">
                        <button className='home-calendar-button' aria-label="submit_button">
                            {translation.calendar}
                        </button>
                    </Link>
                    :
                    <></>
            }
        </div>
    )
}

export default ListEventCalendar