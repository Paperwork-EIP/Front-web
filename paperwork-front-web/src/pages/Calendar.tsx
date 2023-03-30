import { Center, Text, Box, Button, Flex, Input, useDisclosure, useColorModeValue} from '@chakra-ui/react';
import Header from '../components/Header';
import Select from 'react-select';
import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import "../styles/Calendar.css";
import Cookies from 'universal-cookie';
import axios from "axios";
import Modal from 'react-modal';

const CalendarPage = () => {

    const cookies = new Cookies();
    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }
    const cookieList = cookies.get('loginToken')
    const api = process.env.REACT_APP_BASE_URL;
    const [date, setDate] = useState(new Date());
    var isEvent = 0;
    var indexDai = 1;
    var indexEdi = 1;
    var indexMod = 1;
    var indexRep = 1;
    var indexDel = 1;
    const [stepEdit, setStepEdit] = useState();
    const [postsStepEdit, setPostsStepEdit] : any = useState([{}]);
    const [newDate, setNewDate] = useState("");
    const [posts, setPosts]: any = useState([{}]);
    const [postsStep, setPostsStep] : any = useState([{}]);
    const [stepSelected, setStepSelected] = useState();
    const [rdv, setRDV]= useState([[]]);
    const [modDate, setModDate] = useState("");
    const isNewDateError = useRef(false);
    const isModDateError = useRef(false);
    const selectedMonth =  date.toDateString()?.split(" ")[1] === "Jan" ? "01" : date.toDateString()?.split(" ")[1] === "Feb" ? "02" : date.toDateString()?.split(" ")[1] === "Mar" ? "03" :
                           date.toDateString()?.split(" ")[1] === "Apr" ? "04" : date.toDateString()?.split(" ")[1] === "May" ? "05" : date.toDateString()?.split(" ")[1] === "Jun" ? "06" :
                           date.toDateString()?.split(" ")[1] === "Jul" ? "07" : date.toDateString()?.split(" ")[1] === "Aug" ? "08" : date.toDateString()?.split(" ")[1] === "Sep" ? "09" :
                           date.toDateString()?.split(" ")[1] === "Oct" ? "10" : date.toDateString()?.split(" ")[1] === "Nov" ? "11" : date.toDateString()?.split(" ")[1] === "Dec" ? "12" : "Not Set";
    const comparativeDate = date.toDateString()?.split(" ")[3] + "-" + selectedMonth + "-" + date.toDateString()?.split(" ")[2];

    const handleNewDateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setNewDate(e.target.value);
        isNewDateError.current = e.target.value === '';
    }

    const handleModDateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setModDate(e.target.value);
        isModDateError.current = e.target.value === '';
    }

    const deleteEvent = () => {
        rdv?.map((item: any) => {
            indexDel++;
            return(
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

    const replaceEvent = () => {
        rdv?.map((item: any) => {
            indexRep++;
            return(
                item.toString()?.split("T")[0] === comparativeDate ?
                    axios.get(`${api}/calendar/delete?user_process_id=${rdv[indexRep + 2]}&step_id=${rdv[indexRep + 3]}`, {
                    }).catch(err => {
                    console.log(err);
                    })
                : ''
            )
        })
    }

    useEffect(() => {
      axios.get(`${api}/process/getAll`)
        .then(res => {
            var procedures = [];
            for (var i = 0; i < res.data.response.length; i++)
            {
                procedures.push({
                    label: res.data.response[i]['title'],
                    source: res.data.response[i]['source'],
                    value: i
                });
            }
            setPosts(procedures);
        }).catch(err => {
            console.log(err)
        });
    })

    const handleProcessSelected = (e: React.SetStateAction<any>) => {
        axios.get(`${api}/userProcess/getUserSteps?process_title=${e.label}&user_email=${cookieList.email}`)
        .then(res => {
            var steps = [];
            for (var i = 0; i < res.data.response.length; i++)
            {
                steps.push({
                    label: res.data.response[i]['step_title'],
                    step_id: res.data.response[i]['step_id'],
                    user_process_id: res.data.response[i]['user_process_id'],
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
    
    const handleStepSelected = (e: React.SetStateAction<any>) => {
        setStepSelected(e.label);
    }

    useEffect(() => {
        axios.get(`${api}/calendar/getAll?email=${cookieList.email}`)
        .then(res => {
        var rdvTmp = [];
        for (var i = 0; i < res.data.appoinment.length; i++) {
            rdvTmp.push(res.data.appoinment[i]['date'], res.data.appoinment[i]['process_title'], res.data.appoinment[i]['step_title'], res.data.appoinment[i]['step_description'], res.data.appoinment[i]['user_process_id'], res.data.appoinment[i]['step_id']);
        }
        setRDV(rdvTmp);
        }).catch(err => {
          console.log(err);
        })
    })
    
    const submitNewEvent = () => {
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

    const handleProcessEdit = (e: React.SetStateAction<any>) => {
        rdv?.map((item: any) => {
            indexMod++;
            return(
                item.toString()?.split("T")[0] === comparativeDate ?
                axios.get(`${api}/userProcess/getUserSteps?process_title=${rdv[indexMod - 1]}&user_email=${cookieList.email}`)
                .then(res => {
                    var steps = [];
                    for (var i = 0; i < res.data.response.length; i++)
                    {
                        steps.push({
                            label: res.data.response[i]['step_title'],
                            step_id: res.data.response[i]['step_id'],
                            user_process_id: res.data.response[i]['user_process_id'],
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

    const submitModEvent = () => {
        
        isModDateError.current = modDate === '';
        replaceEvent();
        console.log(stepEdit)

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

    const { isOpen: isOpenAddModal, onOpen: onOpenAddModal, onClose: onCloseAddModal } = useDisclosure();
    const { isOpen: isOpenDailyModal, onOpen: onOpenDailyModal, onClose: onCloseDailyModal } = useDisclosure();
    const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();

    const adaptedColor = useColorModeValue("rgba(255,255,255,1)", "rgba(45,45,55,1)");

    return (
        <>
            <Header/>
            <div className="calendar-main-box">
                <div className="calendar-main-text" style={{marginBottom:'20px'}}> Calendar </div>
                <Calendar className='react-calendar-main-component' locale="en-GB" onChange={setDate} value={date}/>
            </div>
            <div className="calendar-main-box-buttons">
                <button className='calendar-main-button' style={{left: "32%"}} aria-label="add_an_event_button" onClick={onOpenAddModal}>
                    Add an Event
                </button>
                <button className='calendar-main-button' style={{left: "45%"}} aria-label="daily_event_button" onClick={onOpenDailyModal}>
                    Daily Events
                </button>
                {
                isEvent === 0 ?
                    <button className='calendar-main-button-disable' disabled aria-label="delete_edit_event_button" onClick={onOpenDeleteModal}>
                        Edit/Delete an Event
                    </button>
                    :
                    <button className='calendar-main-button' style={{left: "58%"}} aria-label="delete_edit_event_button" onClick={onOpenDeleteModal}>
                        Edit/Delete an Event
                    </button>
                }
            </div>

            <Modal className='calendar-modal' style={{content:{background: adaptedColor}}} overlayClassName='calendar-modal-overlay' isOpen={isOpenAddModal} onRequestClose={onCloseAddModal}>
                <div className='calendar-modal-date'>{date.toDateString()}</div>
                <div className='calendar-modal-line' style={{backgroundColor: "rgba(228,228,228,1)"}}></div>
                <div className='calendar-modal-text'>Create</div>
                <button className='calendar-close-button' aria-label="add_close_button" onClick={onCloseAddModal}>
                    Close
                </button>
                <button className='calendar-submit-button' aria-label="add_submit_button" onClick={submitNewEvent}>
                    Submit
                </button>
                <Center p={'10px'}>
                            <Flex width={'200px'} justifyContent={'space-between'}>
                                <Input onChange={handleNewDateChange} type="time"/>
                            </Flex>
                        </Center>
                        <Center p={'10px'}>
                        <div style={{width: '200px', fontSize: 13}}>
                            <Select
                            className='calendar-add-select'
                            placeholder={'Select the Process'}
                            options={posts}
                            onChange={handleProcessSelected}
                            /> 
                        </div>                        
                        </Center>
                        <Center p={'10px'}>
                        {
                                postsStep.length !== 0 ?
                        <div style={{width: '200px', fontSize: 13}}>
                            <Select
                            className='calendar-add-select'
                            placeholder={'Select the Step'}
                            options={postsStep}
                            onChange={handleStepSelected}
                            /> 
                        </div>
                        :
                        <div style={{width: '200px', fontSize: 13}}>
                            <Select
                            className='calendar-add-select'
                            placeholder={'Select the Step'}
                            options={undefined}
                            /> 
                        </div>
                        }
                        </Center>
            </Modal>

            <Modal className='calendar-modal' style={{content:{background: adaptedColor}}} overlayClassName='calendar-modal-overlay' isOpen={isOpenDailyModal} onRequestClose={onCloseDailyModal}>
                <div className='calendar-modal-date'>{date.toDateString()}</div>
                <div className='calendar-modal-line' style={{backgroundColor: "rgba(228,228,228,1)"}}></div>
                <div className='calendar-modal-text'>Daily Event</div>
                <button className='calendar-close-button' aria-label="add_close_button" onClick={onCloseDailyModal}>
                    Close
                </button>
                {
                    isEvent === 0 ?
                        <div className='calendar-modal-text' style={{paddingTop: "12%", textAlign: "center"}}> Nothing Planned </div>

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

            <Modal className='calendar-modal' style={{content:{background: adaptedColor}}} overlayClassName='calendar-modal-overlay' isOpen={isOpenDeleteModal} onRequestClose={onCloseDeleteModal}>
                <div className='calendar-modal-date'>{date.toDateString()}</div>
                <div className='calendar-modal-line' style={{backgroundColor: "rgba(228,228,228,1)"}}></div>
                <div className='calendar-modal-text'>Edit/Delete</div>
                <button className='calendar-close-button' aria-label="add_close_button" onClick={onCloseDeleteModal}>
                    Close
                </button>
                <button className='calendar-submit-button' aria-label="add_submit_button" onClick={submitModEvent}>
                    Submit
                </button>
                {
                    <div className='calendar-event-list'>
                        {
                            rdv?.map((item: any) => {
                        indexEdi++;
                        return (
                            item.toString()?.split("T")[0] === comparativeDate ?
                            <Box>
                                <Center p={'10px'}>
                                <Flex width={'200px'} justifyContent={'space-between'}>
                                    <Input type="time" onChange={handleModDateChange}/>
                                </Flex>
                                </Center>
                                <Center p={'10px'}>
                                <Input width={'200px'} value={rdv[indexEdi - 1]}/>                      
                                </Center>
                                <Center p={'10px'}>
                                {
                                postsStepEdit.length !== 0 ?
                                <div style={{width: '200px', fontSize: 13}}>
                                    <Select
                                    className='calendar-edit-select'
                                    placeholder={'Select the Step'}
                                    options={postsStepEdit}
                                    onChange={handleProcessEdit}
                                    /> 
                                </div>
                                :
                                <div style={{width: '200px', fontSize: 13}}>
                                    <Select
                                    className='calendar-edit-select'
                                    placeholder={'Select the Step'}
                                    defaultValue={"Show List"}
                                    /> 
                                </div>
                                }
                                </Center>
                                <Center p={'10px'}>
                                    <Button 
                                    bgColor="#FC6976"
                                    color="white"
                                    onClick={deleteEvent}>
                                        Delete Event
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
   </>);
}
export default CalendarPage;