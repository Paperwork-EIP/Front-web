import { Center, Text, Box, Button, Flex, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton, Input} from '@chakra-ui/react';
import Header from '../components/Header';
import Select from 'react-select';
import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import "../styles/Calendar.css";
import Cookies from 'universal-cookie';
import axios from "axios";

const CalendarPage = (props: any) => {

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
    const selectedMonth =  date.toDateString()?.split(" ")[1] === "Jan" ? "01" : date.toDateString()?.split(" ")[1] === "Feb" ? "012" : date.toDateString()?.split(" ")[1] === "Mar" ? "03" :
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
                    axios.get(`${api}calendar/delete?user_process_id=${rdv[indexDel + 2]}&step_id=${rdv[indexDel + 3]}`, {
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
                    axios.get(`${api}calendar/delete?user_process_id=${rdv[indexRep + 2]}&step_id=${rdv[indexRep + 3]}`, {
                    }).catch(err => {
                    console.log(err);
                    })
                : ''
            )
        })
    }

    useEffect(() => {
      axios.get(`${api}process/getAll`)
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
        axios.get(`${api}userProcess/getUserSteps?process_title=${e.label}&user_email=${cookieList.email}`)
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
        axios.get(`${api}calendar/getAll?email=${cookieList.email}`)
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
                axios.post(`${api}calendar/set`, {
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
                axios.get(`${api}userProcess/getUserSteps?process_title=${rdv[indexMod - 1]}&user_email=${cookieList.email}`)
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
                axios.post(`${api}calendar/set`, {
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

    return (
        <>
            <Header/>
            <Box p={15} m={50}>
                <Box pb={20}>
                    <Center>
                        <Text fontSize='lg' fontWeight={'bold'}>Calendar</Text>
                    </Center>
                </Box>
                    <Center>
                    <Calendar locale="en-GB" onChange={setDate} value={date}/>
                    </Center>
            </Box>
            <Center m={2}>
                <Text as='em' color="#FC6976" fontSize='lg'>{date.toDateString()}</Text>
            </Center>
            <Center>
            <Flex width={'600px'} justifyContent={'space-between'}>
            <Popover>
                    <PopoverTrigger>
                    <Center>
                        <Button bgColor="#29C9B3" color="white" width={'160px'}>Add an Event</Button>
                    </Center>
                    </PopoverTrigger>
                    <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton color="#FC6976"/>
                    <PopoverHeader color="#BDBDBD" fontSize='xs'>{date.toDateString()}</PopoverHeader>
                    <PopoverBody fontSize='lg' fontWeight={'bold'}>
                        Create
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
                    </PopoverBody>
                    <PopoverFooter border='0' display='flex' justifyContent='right' pb={4}>
                    <Button 
                    bgColor="#29C9B3"
                    color="white"
                    onClick={submitNewEvent}>
                        Submit
                    </Button>
                    </PopoverFooter>
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger>
                    <Center>
                        <Button bgColor="#29C9B3" color="white" width={'160px'}>Daily Events</Button>
                    </Center>
                    </PopoverTrigger>
                    <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton color="#FC6976"/>
                    <PopoverHeader color="#BDBDBD" fontSize='xs'>{date.toDateString()}</PopoverHeader>
                    {
                    isEvent === 0 ?
                        <PopoverBody pb={20} fontSize='lg' fontWeight={'bold'}>
                            Nothing Planned
                        </PopoverBody>
                    :
                        <PopoverBody pb={20} fontSize='lg' fontWeight={'bold'}>
                            {
                                rdv?.map((item: any) => {
                                    indexDai++;
                                    return (
                                        item.toString()?.split("T")[0] === comparativeDate ?
                                        <Box m={3} bgColor="#dbdbdb" borderRadius='lg' borderWidth='1px'>
                                            <Text fontSize='xs' mt='1' px='1'> {item.toString()?.split("T")[1]?.split(".")[0]} </Text>
                                            <Text fontSize='small' mt='2' px='1'> {rdv[indexDai]} </Text>
                                            <Text fontSize='2xs' px='1'> {rdv[indexDai + 1]} </Text>
                                        </Box>
                                        : ''
                                    )
                                })
                            }
                        </PopoverBody>
                    }
                    <PopoverFooter border='0' display='flex' justifyContent='right' pb={4}>
                    </PopoverFooter>
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger>
                    <Center>
                    {
                    isEvent === 0 ?
                        <Button bgColor="#29C9B3" color="white" width={'160px'} isDisabled>Edit/Delete an Event</Button>
                        :
                        <Button onClick={handleProcessEdit} bgColor="#29C9B3" color="white" width={'160px'}>Edit/Delete an Event</Button>
                    }
                    </Center>
                    </PopoverTrigger>
                    <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton color="#FC6976"/>
                    <PopoverHeader color="#BDBDBD" fontSize='xs'>{date.toDateString()}</PopoverHeader>
                    <PopoverBody pb={20} fontSize='lg' fontWeight={'bold'}>
                    Edit/Delete
                    {
                        rdv?.map((item: any) => {
                            indexEdi++;
                            return (
                                item.toString()?.split("T")[0] === comparativeDate ?
                                <Box m={3} borderColor="#dbdbdb" borderRadius='lg' borderWidth='1px' p={'10px'}>
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
                    </PopoverBody>
                    <PopoverFooter border='0' display='flex' justifyContent='right' pb={4}>
                            <Button
                            justifyContent='right'
                            bgColor="#29C9B3"
                            color="white"
                            onClick={submitModEvent}>
                                Submit
                            </Button>
                    </PopoverFooter>
                    </PopoverContent>
                </Popover>
            </Flex>
            </Center>
   </>);
}

export default CalendarPage;