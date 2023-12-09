import { Center, Box, Flex, Input, useDisclosure, useColorModeValue, useColorMode } from '@chakra-ui/react';
import Header from '../components/Header';
import Select from 'react-select';
import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import Cookies from 'universal-cookie';
import axios from "axios";
import Modal from 'react-modal';
import { toast } from 'react-toastify';

import { getTranslation } from './Translation';
import Loading from '../components/Loading';
import ListEventCalendar from '../components/ListEventCalendar';

import "../styles/pages/Calendar.scss";

function CalendarPage() {
    const cookies = new Cookies();
    const { colorMode } = useColorMode();
    const [language, setLanguage] = useState("");
    const translation = getTranslation(language, "calendar");

    const customStyles = {
        option: (provided: any) => ({
            ...provided,
            color: 'black',
        }),
    };

    let isEvent = 0;
    let indexMod = 1;
    let indexDel = 1;

    const cookieList = cookies.get('loginToken')
    const api = process.env.REACT_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(true);
    const [date, setDate] = useState(new Date());
    const [stepEdit, setStepEdit] = useState();
    const [postsStepEdit, setPostsStepEdit]: any = useState([{}]);
    const [newDate, setNewDate] = useState("");
    const [posts, setPosts]: any = useState([{}]);
    const [postsStep, setPostsStep]: any = useState([{}]);
    const [stepSelected, setStepSelected] = useState();
    const [rdv, setRDV]: any = useState([]);
    const [listEvents, setListEvents]: any = useState([]);
    const [modDate, setModDate] = useState("");
    const isNewDateError = useRef(false);
    const isModDateError = useRef(false);
    const selectedMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const comparativeDate = date.getFullYear() + '-' + selectedMonth + '-' + day;

    const { isOpen: isOpenAddModal, onOpen: onOpenAddModal, onClose: onCloseAddModal } = useDisclosure();
    const { isOpen: isOpenDailyModal, onOpen: onOpenDailyModal, onClose: onCloseDailyModal } = useDisclosure();
    const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();

    const adaptedColor = useColorModeValue("#f5f5f5", "#303030");

    function handleNewDateChange(e: any) {
        setNewDate(e.target.value);
        isNewDateError.current = e.target.value === '';
    }

    function handleModDateChange(e: any) {
        setModDate(e.target.value);
    }

    async function deleteEvent() {
        rdv?.map((item: any) => {
            indexDel++;
            return (
                item.toString()?.split("T")[0] === comparativeDate ?
                    axios.get(`${api}/calendar/delete?user_process_id=${rdv[indexDel + 2]}&step_id=${rdv[indexDel + 3]}`, {
                    }).then(() => {
                        window.location.reload();
                    }).catch(err => {
                        console.error(err);
                    })
                    : ''
            )
        })
    }

    function replaceEvent() {
        listEvents?.map((item: any) => {
            return (
                item.date.split("T")[0] === comparativeDate ?
                    axios.get(`${api}/calendar/delete?user_process_id=${item.user_process_id}&step_id=${item.step_id}`, {
                    }).catch(err => {
                        console.error(err);
                    })
                    : ''
            )
        })
    }

    async function handleProcessSelected(e: any) {
        await axios.get(`${api}/userProcess/getUserSteps?process_title=${e.label}&user_token=${cookieList.loginToken}`)
            .then(res => {
                let steps = [];
                for (let i = 0; i < res.data.response.length; i++) {
                    steps.push({
                        label: res.data.response[i]['title'],
                        step_id: res.data.response[i]['step_id'],
                        user_process_id: res.data['id'],
                        value: i
                    });
                }
                setPostsStep(steps);
                setStepSelected(steps[0]['label']);
            }).catch(err => {
                console.error(err)
            });
        setStepSelected(e.label);
    }

    function handleStepSelected(e: any) {
        setStepSelected(e.label);
    }

    async function getUserDataByToken() {
        try {
            const userResponse = await axios.get(`${api}/user/getbytoken`, { params: { token: cookieList.loginToken } });
            const userData = userResponse.data;

            setLanguage(userData.language);

            const calendarResponse = await axios.get(`${api}/calendar/getAll?token=${cookieList.loginToken}`);
            const calendarData = calendarResponse.data;

            const rdvTmp = [];
            const tmpListEvents = [];

            for (let i = 0; i < calendarData.appoinment.length; i++) {
                rdvTmp.push(calendarData.appoinment[i]['date'], calendarData.appoinment[i]['stocked_title'], calendarData.appoinment[i]['step_title'], calendarData.appoinment[i]['step_description'], calendarData.appoinment[i]['user_process_id'], calendarData.appoinment[i]['step_id']);
                tmpListEvents.push(
                    {
                        key: i,
                        date: calendarData.appoinment[i].date,
                        process_title: calendarData.appoinment[i].process_title,
                        stocked_title: calendarData.appoinment[i].stocked_title,
                        step_title: calendarData.appoinment[i].step_title,
                        step_description: calendarData.appoinment[i].step_description,
                        user_process_id: calendarData.appoinment[i].user_process_id,
                        step_id: calendarData.appoinment[i].step_id
                    }
                );
            }

            setRDV(rdvTmp);
            setListEvents(tmpListEvents);

            const processResponse = await axios.get(`${api}/process/getAll?language=${userData.language}`);
            const processData = processResponse.data;

            const procedures = processData.response.map((item: any, index: any) => ({
                label: item.stocked_title,
                source: item.source,
                value: index
            }));

            setPosts(procedures);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }

    function submitNewEvent() {
        isNewDateError.current = newDate === '';
        postsStep?.map((item: any) => {
            return (
                item['label'] === stepSelected ?
                    axios.post(`${api}/calendar/set`, {
                        date: comparativeDate + ' ' + newDate + ':00',
                        user_process_id: item['user_process_id'],
                        step_id: item['step_id']
                    }).then(() => {
                        window.location.reload();
                    }).catch(err => {
                        console.error(err);
                    })
                    :
                    ''
            )
        })
    }

    function handleProcessEdit(e: any) {
        rdv?.map((item: any) => {
            indexMod++;
            return (
                item.toString()?.split("T")[0] === comparativeDate ?
                    axios.get(`${api}/userProcess/getUserSteps?process_title=${rdv[indexMod - 1]}&user_token=${cookieList.loginToken}`)
                        .then(res => {
                            let steps = [];
                            for (let i = 0; i < res.data.response.length; i++) {
                                steps.push({
                                    label: res.data.response[i]['title'],
                                    step_id: res.data.response[i]['step_id'],
                                    user_process_id: res.data['id'],
                                    value: i
                                });
                            }
                            setPostsStepEdit(steps);
                            setStepEdit(e.label);
                        }).catch(err => {
                            console.error(err)
                        })
                    : ''
            )

        })
    }

    function submitModEvent() {
        isModDateError.current = modDate === '';
        replaceEvent();
        postsStepEdit.map((item: any) => {
            if (item.label === stepEdit) {
                axios.post(`${api}/calendar/set`, {
                    date: comparativeDate + ' ' + modDate + ':00',
                    user_process_id: item.user_process_id,
                    step_id: item.step_id
                }).then(() => {
                    toast.success(translation.eventModifiedSuccessfully);
                    window.location.reload();
                }).catch(err => {
                    toast.error(err);
                    console.error(err);
                })
            }
        })
    }

    rdv?.map((item: any) => {
        if (item.toString()?.split("T")[0] === comparativeDate) {
            isEvent++;
        }
    })

    function editButtonOnClickEvent(event: any) {
        onOpenDeleteModal();
        handleProcessEdit(event);
    }

    function displayCalendarButtons() {
        return (
            <div className="calendar-buttons">
                <button className={(isEvent > 0 ? ' disabled' : '') + ' calendar-button'} aria-label="add_an_event_button" onClick={onOpenAddModal} disabled={isEvent > 0 ? true : false}>
                    {translation.addEvent}
                </button>
                <button className='calendar-button' aria-label="daily_event_button" onClick={onOpenDailyModal}>
                    {translation.dailyEvent}
                </button>
                <button className={(isEvent === 0 ? ' disabled' : '') + ' calendar-button'} aria-label="delete_edit_event_button" onClick={editButtonOnClickEvent} disabled={isEvent === 0 ? true : false}>
                    {translation.editDeleteEvent}
                </button>
            </div>
        )
    }

    function displayCalendar() {
        return (
            <div className="calendar-widget">
                <Calendar
                    locale={translation.calendarLocation}
                    minDate={new Date()}
                    onClickDay={(value) => {
                        setDate(value);
                        onOpenDailyModal();
                        rdv.map((item: any) => {
                            if (item.toString()?.split("T")[0] === comparativeDate) {
                                isEvent++;
                            }
                        })
                    }}
                />
                {
                    displayCalendarButtons()
                }
            </div>
        )
    }

    function displayModals() {
        return (
            <>
                <Modal
                    className='calendar-modal'
                    style={{ content: { background: adaptedColor } }}
                    overlayClassName='calendar-modal-overlay'
                    isOpen={isOpenAddModal}
                    onRequestClose={onCloseAddModal}
                >
                    <div className='calendar-modal-header'>
                        <div className='calendar-modal-date'>
                            {date.toDateString()}
                        </div>
                        <div className='calendar-modal-line'></div>
                        <h2 className='calendar-modal-text'>
                            {translation.create}
                        </h2>
                    </div>
                    <div className='calendar-modal-content'>
                        <Center p={'10px'}>
                            <Flex width={'70%'} justifyContent={'space-between'}>
                                <Input aria-label='input-new-date-change' onChange={handleNewDateChange} type="time" />
                            </Flex>
                        </Center>
                        <Center p={'10px'}>
                            <div style={{ width: '70%', fontSize: 13 }}>
                                <Select
                                    className='calendar-add-select'
                                    placeholder={translation.selectTheProcess}
                                    options={posts}
                                    onChange={handleProcessSelected}
                                    styles={customStyles}
                                />
                            </div>
                        </Center>
                        <Center p={'10px'}>
                            {
                                postsStep.length !== 0 ?
                                    <div style={{ width: '70%', fontSize: 13 }}>
                                        <Select
                                            className='calendar-add-select'
                                            placeholder={translation.selectTheStep}
                                            options={postsStep}
                                            onChange={handleStepSelected}
                                            styles={customStyles}
                                        />
                                    </div>
                                    :
                                    <div style={{ width: '70%', fontSize: 13 }}>
                                        <Select
                                            className='calendar-add-select'
                                            placeholder={translation.selectTheStep}
                                            options={undefined}
                                            styles={customStyles}
                                        />
                                    </div>
                            }
                        </Center>
                    </div>
                    <div className='calendar-modal-buttons'>
                        <button className='calendar-modal-button close' aria-label="add_close_button" onClick={onCloseAddModal}>
                            {translation.close}
                        </button>
                        <button className='calendar-modal-button submit' aria-label="add_submit_button" onClick={submitNewEvent}>
                            {translation.submit}
                        </button>
                    </div>
                </Modal>
                <Modal
                    className='calendar-modal'
                    style={{ content: { background: adaptedColor } }}
                    overlayClassName='calendar-modal-overlay'
                    isOpen={isOpenDailyModal}
                    onRequestClose={onCloseDailyModal}
                >
                    <div className='calendar-modal-header'>
                        <div className='calendar-modal-date'>
                            {date.toDateString()}
                        </div>
                        <div className='calendar-modal-line'></div>
                        <div className='calendar-modal-text'>
                            {translation.dailyEvent}
                        </div>
                    </div>
                    <div className='calendar-modal-content'>
                        {
                            isEvent === 0 ?
                                <div className='calendar-modal-text'>
                                    {translation.nothingPlanned}
                                </div>
                                :
                                <div className='calendar-event-list'>
                                    {
                                        listEvents.map((item: any) => {
                                            return (
                                                item.date.split("T")[0] === comparativeDate ?
                                                    <div className='calendar-event-list-card'>
                                                        <div className='calendar-event-list-card-content'>
                                                            <h1 className='calendar-event-list-card-content-title-text'>{item.process_title}</h1>
                                                            <h2 className='calendar-event-list-card-content-description-text'>{item.step_title}</h2>
                                                        </div>
                                                    </div>
                                                    : ''
                                            )
                                        })
                                    }
                                </div>
                        }
                    </div>
                    <div className='calendar-modal-buttons'>
                        <button className='calendar-modal-button close' aria-label="add_close_button" onClick={onCloseDailyModal}>
                            {translation.close}
                        </button>
                    </div>
                </Modal>
                <Modal
                    className='calendar-modal'
                    style={{ content: { background: adaptedColor } }}
                    overlayClassName='calendar-modal-overlay'
                    isOpen={isOpenDeleteModal}
                    onRequestClose={onCloseDeleteModal}
                >
                    <div className='calendar-modal-header'>
                        <div className='calendar-modal-date'>
                            {date.toDateString()}
                        </div>
                        <div className='calendar-modal-line'></div>
                        <div className='calendar-modal-header'>
                            <h1 className='calendar-modal-text'>{translation.editDelete}</h1>
                            <button
                                className='calendar-modal-button-bin'
                                aria-label='delete-button'
                                onClick={() => deleteEvent()}
                            >
                                <img src="assets/calendar-page/bin.png" alt="delete_image" />
                            </button>
                        </div>
                    </div>
                    <div className='calendar-modal-content'>
                        {
                            <div className='calendar-event-list'>
                                {
                                    listEvents.map((item: any) => {
                                        return (
                                            item.date.split("T")[0] === comparativeDate ?
                                                <Box width={"100%"} key={item.key}>
                                                    <Center p={'10px'}>
                                                        <Flex width={'100%'} justifyContent={'space-between'}>
                                                            <Input
                                                                type="time"
                                                                onChange={handleModDateChange}
                                                                defaultValue={item.date.split("T")[1].split(":")[0] + ":" + item.date.split("T")[1].split(":")[1]}
                                                            />
                                                        </Flex>
                                                    </Center>
                                                    <Center p={'10px'}>
                                                        <Input width={'100%'} value={`${item.process_title} - ${item.step_title}`} disabled />
                                                    </Center>
                                                    <Center p={'10px'}>
                                                        <Flex width={'100%'}>
                                                            {
                                                                postsStepEdit.length !== 0 ?
                                                                    <Select
                                                                        className='calendar-edit-select'
                                                                        placeholder={translation.selectTheStep}
                                                                        options={postsStepEdit}
                                                                        onChange={handleProcessEdit}
                                                                        styles={customStyles}
                                                                    />
                                                                    :
                                                                    <Select
                                                                        className='calendar-edit-select'
                                                                        placeholder={translation.selectTheStep}
                                                                        defaultValue={"Show List"}
                                                                        styles={customStyles}
                                                                    />
                                                            }
                                                        </Flex>
                                                    </Center>
                                                    <div className='calendar-modal-buttons'>
                                                        <button className='calendar-modal-button submit' aria-label="add_submit_button" onClick={submitModEvent}>
                                                            {translation.submit}
                                                        </button>
                                                        <button className='calendar-modal-button close' aria-label="add_close_button" onClick={onCloseDeleteModal}>
                                                            {translation.close}
                                                        </button>
                                                    </div>
                                                </Box>
                                                : ''
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                </Modal>
            </>
        )
    }

    useEffect(() => {
        listEvents?.map((item: any) => {
            const eventDate = new Date(item.date);
            const today = new Date();
            const threeDays = new Date();
            threeDays.setDate(today.getDate() - 3);
            
            if (eventDate < threeDays) {
                axios.get(`${api}/calendar/delete?user_process_id=${item.user_process_id}&step_id=${item.step_id}`, {
                }).then(() => {
                    window.location.reload();
                }).catch(err => {
                    console.error(err);
                })
            }
        })
    }, [listEvents]);

    useEffect(() => {
        if (!cookies.get('loginToken')) {
            window.location.assign('/');
        } else {
            getUserDataByToken();
        }
    }, [isEvent, comparativeDate, date, stepSelected, stepEdit, modDate]);

    return (
        <>
            <Header />
            {
                isLoading ? <Loading /> : <></>
            }
            <div className='calendar' style={{ backgroundColor: adaptedColor }}>
                <div className='calendar-wrapper'>
                    <h1 className="calendar-title" dangerouslySetInnerHTML={{ __html: translation.calendar }}></h1>
                    <div className={colorMode === 'light' ? "calendar-content-light" : "calendar-content-dark"}>
                        {
                            displayCalendar()
                        }
                        {
                            displayModals()
                        }
                    </div>
                </div>
                <img className='calendar-image' src="assets/calendar-page/online_calendar_bro.png" alt="calendar_image" />
                <ListEventCalendar
                    activeCalendarButton={false}
                    language={language}
                    rdv={listEvents}
                    adaptedColor={adaptedColor}
                    style="calendar-list-widget"
                />
            </div>
        </>
    );
}
export default CalendarPage;