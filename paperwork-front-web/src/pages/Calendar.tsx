import { Center, Text, Box, Button, Flex, Input, useDisclosure, useColorModeValue, Icon, IconProps, OmitCommonProps } from '@chakra-ui/react';
import Header from '../components/Header';
import Select from 'react-select';
import React, { useState, useRef, useEffect, SVGProps } from 'react';
import Calendar from 'react-calendar';
import "../styles/Calendar.scss";
import Cookies from 'universal-cookie';
import axios from "axios";
import Modal from 'react-modal';
import { getTranslation } from './Translation';
import { BsFillCalendarDateFill, BsHourglassSplit } from 'react-icons/bs';
import Loading from '../components/Loading';

function CalendarPage() {

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

    const cookies = new Cookies();
    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }

    const customStyles = {
        option: (provided: any) => ({
            ...provided,
            color: 'black',
        }),
    };

    const cookieList = cookies.get('loginToken')
    const api = process.env.REACT_APP_BASE_URL;
    const [isLoading, setIsloading] = useState(true);
    const [date, setDate] = useState(new Date());
    var isEvent = 0;
    var indexDai = 1;
    var indexEdi = 1;
    var indexMod = 1;
    var indexRep = 1;
    var indexDel = 1;
    let colorEvent = "";
    const [stepEdit, setStepEdit] = useState();
    const [postsStepEdit, setPostsStepEdit]: any = useState([{}]);
    const [newDate, setNewDate] = useState("");
    const [posts, setPosts]: any = useState([{}]);
    const [postsStep, setPostsStep]: any = useState([{}]);
    const [stepSelected, setStepSelected] = useState();
    const [rdv, setRDV]: any = useState([]);
    const [rdvEvent, setRDVEvent]: any = useState([]);
    const [modDate, setModDate] = useState("");
    const isNewDateError = useRef(false);
    const isModDateError = useRef(false);
    const selectedMonth = date.toDateString()?.split(" ")[1] === "Jan" ? "01" : date.toDateString()?.split(" ")[1] === "Feb" ? "02" : date.toDateString()?.split(" ")[1] === "Mar" ? "03" :
        date.toDateString()?.split(" ")[1] === "Apr" ? "04" : date.toDateString()?.split(" ")[1] === "May" ? "05" : date.toDateString()?.split(" ")[1] === "Jun" ? "06" :
            date.toDateString()?.split(" ")[1] === "Jul" ? "07" : date.toDateString()?.split(" ")[1] === "Aug" ? "08" : date.toDateString()?.split(" ")[1] === "Sep" ? "09" :
                date.toDateString()?.split(" ")[1] === "Oct" ? "10" : date.toDateString()?.split(" ")[1] === "Nov" ? "11" : date.toDateString()?.split(" ")[1] === "Dec" ? "12" : "Not Set";
    const comparativeDate = date.toDateString()?.split(" ")[3] + "-" + selectedMonth + "-" + date.toDateString()?.split(" ")[2];
    const [language, setLanguage] = useState("");
    const translation = getTranslation(language, "calendar");

    const { isOpen: isOpenAddModal, onOpen: onOpenAddModal, onClose: onCloseAddModal } = useDisclosure();
    const { isOpen: isOpenDailyModal, onOpen: onOpenDailyModal, onClose: onCloseDailyModal } = useDisclosure();
    const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();

    const adaptedColor = useColorModeValue("rgba(255,255,255,1)", "rgba(45,45,55,1)");

    const handleNewDateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setNewDate(e.target.value);
        isNewDateError.current = e.target.value === '';
    }

    const handleModDateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setModDate(e.target.value);
        isModDateError.current = e.target.value === '';
    }

    function deleteEvent() {
        rdv?.map((item: any) => {
            indexDel++;
            return (
                item.toString()?.split("T")[0] === comparativeDate ?
                    axios.get(`${api}/calendar/delete?user_process_id=${rdv[indexDel + 2]}&step_id=${rdv[indexDel + 3]}`, {
                    }).then(res => {
                        window.location.reload();
                    }).catch(err => {
                        console.log(err);
                    })
                    : ''
            )
        })
    }

    function replaceEvent() {
        rdv?.map((item: any) => {
            indexRep++;
            return (
                item.toString()?.split("T")[0] === comparativeDate ?
                    axios.get(`${api}/calendar/delete?user_process_id=${rdv[indexRep + 2]}&step_id=${rdv[indexRep + 3]}`, {
                    }).catch(err => {
                        console.log(err);
                    })
                    : ''
            )
        })
    }

    function handleProcessSelected(e: React.SetStateAction<any>) {
        axios.get(`${api}/userProcess/getUserSteps?process_title=${e.label}&user_token=${cookieList.loginToken}`)
            .then(res => {
                var steps = [];
                for (var i = 0; i < res.data.response.length; i++) {
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
                console.log(err)
            });
        setStepSelected(e.label);
    }

    function handleStepSelected(e: React.SetStateAction<any>) {
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
            const rdvEvent = [];

            for (var i = 0; i < calendarData.appoinment.length; i++) {
                rdvTmp.push(
                    {
                        key: i,
                        date: calendarData.appoinment[i].date,
                        stocked_title: calendarData.appoinment[i].stocked_title,
                        step_title: calendarData.appoinment[i].step_title,
                        step_description: calendarData.appoinment[i].step_description,
                        user_process_id: calendarData.appoinment[i].user_process_id,
                        step_id: calendarData.appoinment[i].step_id
                    }
                );
                rdvEvent.push(
                    {
                        key: i,
                        date: calendarData.appoinment[i].date,
                        step_title: calendarData.appoinment[i].step_title,
                        step_description: calendarData.appoinment[i].step_description,
                        process_title: calendarData.appoinment[i].process_title,
                    }
                );
            }

            setRDV(rdvTmp);
            setRDVEvent(rdvEvent);

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
        setIsloading(false);
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
                    }).then(res => {
                        window.location.reload();
                    }).catch(err => {
                        console.log(err);
                    })
                    :
                    ''
            )
        })
    }

    function handleProcessEdit(e: React.SetStateAction<any>) {
        rdv?.map((item: any) => {
            indexMod++;
            return (
                item.toString()?.split("T")[0] === comparativeDate ?
                    axios.get(`${api}/userProcess/getUserSteps?process_title=${rdv[indexMod - 1]}&user_token=${cookieList.loginToken}`)
                        .then(res => {
                            var steps = [];
                            for (var i = 0; i < res.data.response.length; i++) {
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
                            console.log(err)
                        })
                    : ''
            )

        })
    }

    function submitModEvent() {
        isModDateError.current = modDate === '';
        replaceEvent();
        postsStepEdit?.map((item: any) => {
            return (
                item['label'] === stepEdit ?
                    axios.post(`${api}/calendar/set`, {
                        date: comparativeDate + ' ' + modDate + ':00',
                        user_process_id: item['user_process_id'],
                        step_id: item['step_id']
                    }).then(res => {
                        window.location.reload();
                    }).catch(err => {
                        console.log(err);
                    })
                    :
                    ''
            )
        })
    }

    rdv?.map((item: any) => {
        return (
            item.toString()?.split("T")[0] === comparativeDate ? isEvent += 1 : isEvent += 0
        )
    })

    function editButtonOnClickEvent(e: React.SetStateAction<any>) {
        onOpenDeleteModal();
        handleProcessEdit(e);
    }

    useEffect(() => {
        if (cookieList) {
            getUserDataByToken();
        }
    }, []);

    return (
        <>
            <Header />
            {
                isLoading ? <Loading /> :
                    <>
                        <div className="calendar-main-box">
                            <div className="calendar-main-text" style={{ marginBottom: '20px' }}> {translation.calendar} </div>
                            <Calendar className='react-calendar-main-component' locale={translation.calendarLocation} onChange={setDate} value={date} />
                        </div>
                        <div className="calendar-main-box-buttons">
                            {
                                isEvent === 0 ?
                                    <button className='calendar-main-button' style={{ left: "32%" }} aria-label="add_an_event_button" onClick={onOpenAddModal}>
                                        {translation.addEvent}
                                    </button>
                                    :
                                    <button className='calendar-main-button-disable' disabled style={{ left: "32%" }} aria-label="add_an_event_button" onClick={onOpenAddModal}>
                                        {translation.addEvent}
                                    </button>
                            }
                            <button className='calendar-main-button' style={{ left: "45%" }} aria-label="daily_event_button" onClick={onOpenDailyModal}>
                                {translation.dailyEvent}
                            </button>
                            {
                                isEvent === 0 ?
                                    <button className='calendar-main-button-disable' disabled aria-label="delete_edit_event_button" onClick={onOpenDeleteModal}>
                                        {translation.editDeleteEvent}
                                    </button>
                                    :
                                    <button className='calendar-main-button' style={{ left: "58%" }} aria-label="delete_edit_event_button" onClick={editButtonOnClickEvent}>
                                        {translation.editDeleteEvent}
                                    </button>
                            }
                        </div>
                        {
                            rdvEvent.length !== 0 ?
                                <>

                                    <div className="calendar-content-box-calendar" style={{ backgroundColor: useColorModeValue("rgba(255,255,255,0.75)", "rgba(228,228,228,0.20)") }}>
                                        <div className="calendar-content-box-calendar-icons-box">
                                            <div className="calendar-content-calendar-text"> {translation.events} </div>
                                            <CircleIcon className="calendar-content-box-calendar-icon" color="#FC6976" mt={'-18px'} />
                                            <div className="calendar-content-calendar-icon-text"> {translation.applied} </div>
                                            <CircleIcon className="calendar-content-box-calendar-icon" color="#fc9f69" mt={'2px'} />
                                            <div className="calendar-content-calendar-icon-text" style={{ marginTop: '20px' }}> {translation.today} </div>
                                            <CircleIcon className="calendar-content-box-calendar-icon" color="#29C9B3" mt={'22px'} />
                                            <div className="calendar-content-calendar-icon-text" style={{ marginTop: '40px' }}> {translation.left} </div>
                                        </div>
                                        <div className="calendar-content-box-calendar-in">
                                            {rdvEvent?.map((item: any) => {
                                                if (item.date.split('T')[0].split('-')[0] + item.date.split('T')[0].split('-')[1] + item.date.split('T')[0].split('-')[2] === comparativeDate.split('-')[0] + comparativeDate.split('-')[1] + comparativeDate.split('-')[2]) {
                                                    colorEvent = "#fc9f69";
                                                } else if (item.date.split('T')[0].split('-')[0] + item.date.split('T')[0].split('-')[1] + item.date.split('T')[0].split('-')[2] < comparativeDate.split('-')[0] + comparativeDate.split('-')[1] + comparativeDate.split('-')[2]) {
                                                    colorEvent = "#FC6976";
                                                } else {
                                                    colorEvent = "#29C9B3";
                                                }
                                                return (

                                                    <div className="calendar-content-box-rendez-vous" style={{ borderColor: colorEvent }}>
                                                        <div className="calendar-content-rendez-vous-date-text" style={{ color: "rgba(255,255,255)" }}>
                                                            <div className="calendar-content-icon-and-date">
                                                                <div className="icon-container">
                                                                    <BsFillCalendarDateFill style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                                                                    {item.date.split('T')[0]}
                                                                    <BsHourglassSplit style={{ marginRight: '3px', marginLeft: "20px", verticalAlign: 'middle' }} />
                                                                    {item.date.split('T')[1]?.split('.')[0].split(':')[0] + ':' + item.date.split('T')[1]?.split('.')[0].split(':')[1]}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="calendar-content-rendez-vous-process-name-text" style={{ color: "rgba(255,255,255)" }}>
                                                            {item.process_title} - {item.step_title}
                                                        </div>
                                                        <div className="calendar-content-rendez-vous-process-description-text" style={{ color: "rgba(255,255,255)" }}>
                                                            {item.step_description}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            )}
                                        </div>
                                    </div>
                                </>
                                :
                                null
                        }
                        <Modal className='calendar-modal' style={{ content: { background: adaptedColor } }} overlayClassName='calendar-modal-overlay' isOpen={isOpenAddModal} onRequestClose={onCloseAddModal}>
                            <div className='calendar-modal-date'>{date.toDateString()}</div>
                            <div className='calendar-modal-line' style={{ backgroundColor: "rgba(228,228,228,1)" }}></div>
                            <div className='calendar-modal-text'> {translation.create} </div>
                            <button className='calendar-close-button' aria-label="add_close_button" onClick={onCloseAddModal}>
                                {translation.close}
                            </button>
                            <button className='calendar-submit-button' aria-label="add_submit_button" onClick={submitNewEvent}>
                                {translation.submit}
                            </button>
                            <Center p={'10px'}>
                                <Flex width={'200px'} justifyContent={'space-between'}>
                                    <Input aria-label='input-new-date-change' onChange={handleNewDateChange} type="time" />
                                </Flex>
                            </Center>
                            <Center p={'10px'}>
                                <div style={{ width: '200px', fontSize: 13 }}>
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
                                        <div style={{ width: '200px', fontSize: 13 }}>
                                            <Select
                                                className='calendar-add-select'
                                                placeholder={translation.selectTheStep}
                                                options={postsStep}
                                                onChange={handleStepSelected}
                                                styles={customStyles}
                                            />
                                        </div>
                                        :
                                        <div style={{ width: '200px', fontSize: 13 }}>
                                            <Select
                                                className='calendar-add-select'
                                                placeholder={translation.selectTheStep}
                                                options={undefined}
                                                styles={customStyles}
                                            />
                                        </div>
                                }
                            </Center>
                        </Modal>
                        <Modal className='calendar-modal' style={{ content: { background: adaptedColor } }} overlayClassName='calendar-modal-overlay' isOpen={isOpenDailyModal} onRequestClose={onCloseDailyModal}>
                            <div className='calendar-modal-date'>{date.toDateString()}</div>
                            <div className='calendar-modal-line' style={{ backgroundColor: "rgba(228,228,228,1)" }}></div>
                            <div className='calendar-modal-text'>{translation.dailyEvent}</div>
                            <button className='calendar-close-button' aria-label="add_close_button" onClick={onCloseDailyModal}>
                                {translation.close}
                            </button>
                            {
                                isEvent === 0 ?
                                    <div className='calendar-modal-text' style={{ paddingTop: "12%", textAlign: "center" }}> {translation.nothingPlanned} </div>

                                    :
                                    <div className='calendar-event-list'>
                                        {
                                            rdv?.map((item: any) => {
                                                indexDai++;
                                                return (
                                                    item.toString()?.split("T")[0] === comparativeDate ?
                                                        <Box m={3} bgColor="#dbdbdb" borderRadius='lg' borderWidth='1px'>
                                                            <Text color="black" fontSize='xs' mt='1' px='1'> {item.toString()?.split("T")[1]?.split(".")[0]} </Text>
                                                            <Text color="black" fontSize='small' mt='2' px='1'> {rdv[indexDai]} </Text>
                                                            <Text color="black" fontSize='2xs' px='1'> {rdv[indexDai + 1]} </Text>
                                                        </Box>
                                                        : ''
                                                )
                                            })
                                        }
                                    </div>
                            }
                        </Modal>
                        <Modal className='calendar-modal' style={{ content: { background: adaptedColor } }} overlayClassName='calendar-modal-overlay' isOpen={isOpenDeleteModal} onRequestClose={onCloseDeleteModal}>
                            <div className='calendar-modal-date'>{date.toDateString()}</div>
                            <div className='calendar-modal-line' style={{ backgroundColor: "rgba(228,228,228,1)" }}></div>
                            <div className='calendar-modal-text'>{translation.editDelete}</div>
                            <button className='calendar-close-button' aria-label="add_close_button" onClick={onCloseDeleteModal}>
                                {translation.close}
                            </button>
                            <button className='calendar-submit-button' aria-label="add_submit_button" onClick={submitModEvent}>
                                {translation.submit}
                            </button>
                            {
                                <div className='calendar-event-list'>
                                    {
                                        rdv.map((item: any) => {
                                            console.log(item);
                                            return (
                                                item.toString()?.split("T")[0] === comparativeDate ?
                                                    <Box>
                                                        <Center p={'10px'}>
                                                            <Flex width={'200px'} justifyContent={'space-between'}>
                                                                <Input type="time" onChange={handleModDateChange} />
                                                            </Flex>
                                                        </Center>
                                                        <Center p={'10px'}>
                                                            <Input width={'200px'} value={rdv[indexEdi - 1]} />
                                                        </Center>
                                                        <Center p={'10px'}>
                                                            {
                                                                postsStepEdit.length !== 0 ?
                                                                    <div style={{ width: '200px', fontSize: 13 }}>
                                                                        <Select
                                                                            className='calendar-edit-select'
                                                                            placeholder={translation.selectTheStep}
                                                                            options={postsStepEdit}
                                                                            onChange={handleProcessEdit}
                                                                            styles={customStyles}
                                                                        />
                                                                    </div>
                                                                    :
                                                                    <div style={{ width: '200px', fontSize: 13 }}>
                                                                        <Select
                                                                            className='calendar-edit-select'
                                                                            placeholder={translation.selectTheStep}
                                                                            defaultValue={"Show List"}
                                                                            styles={customStyles}
                                                                        />
                                                                    </div>
                                                            }
                                                        </Center>
                                                        <Center p={'10px'}>
                                                            <Button
                                                                aria-label='delete-button'
                                                                bgColor="#FC6976"
                                                                color="white"
                                                                onClick={deleteEvent}>
                                                                {translation.deleteEvent}
                                                            </Button>
                                                        </Center>
                                                    </Box>
                                                    : ''
                                            )
                                        })
                                    }
                                </div>
                            }
                        </Modal>
                    </>
            }
        </>
    );
}
export default CalendarPage;