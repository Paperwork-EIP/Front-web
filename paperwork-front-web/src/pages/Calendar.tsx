import { Textarea, Center, Text, Box, Button, Flex, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton, Input} from '@chakra-ui/react';
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

    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false);
    const initRef = React.useRef()
    var isEvent = 0;
    var indexDai = 0;
    var indexEdi = 0;
    var indexDel = 0;

    const [newDate, setNewDate] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    const isNewDateError = useRef(false);
    const isNewTitleError = useRef(false);
    const isNewContentError = useRef(false);

    const handleNewDateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setNewDate(e.target.value);
        isNewDateError.current = e.target.value === '';
    }
    const handleNewTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setNewTitle(e.target.value);
        isNewTitleError.current = e.target.value === '';
    }
    
    const handleNewContentChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setNewContent(e.target.value);
        isNewContentError.current = e.target.value === '';
    }


    const [modDate, setModDate] = useState("");
    const [modTitle, setModTitle] = useState("");
    const [modContent, setModContent] = useState("");

    const isModDateError = useRef(false);
    const isModTitleError = useRef(false);
    const isModContentError = useRef(false);

    const handleModDateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setModDate(e.target.value);
        isModDateError.current = e.target.value === '';
    }
    const handleModTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setModTitle(e.target.value);
        isModTitleError.current = e.target.value === '';
    }
    
    const handleModContentChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setModContent(e.target.value);
        isModContentError.current = e.target.value === '';
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

    const [posts, setPosts] = useState([{}]);
    const [processSelected, setProcessSelected] = useState();

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
            // console.log(procedures);
            setPosts(procedures);
            setProcessSelected(procedures[0]['label']);
        }).catch(err => {
            console.log(err)
        });
    }, [])

    const handleProcessSelected = (e: any) => {
        setProcessSelected(e.label);
        // console.log(processSelected);
    }

    const [time, setTime] = useState("");
    const isTimeError = useRef(false);

    const api = process.env.REACT_APP_BASE_URL;

    const [rdv, setRDV]= useState([[]]);

    useEffect(() => {
        axios.get(`${api}calendar/getAll?email=${cookieList.email}`, {
        }) .then(res => {
        var rdvTmp =  [];
        for (var i = 0; i < res.data.appoinment.length; i++) {
            rdvTmp.push(res.data.appoinment[i]['date'], res.data.appoinment[i]['step_title'], res.data.appoinment[i]['step_description'], res.data.appoinment[i]['user_process_id'], res.data.appoinment[i]['step_id']);
        }
        setRDV(rdvTmp);
        //console.log(res.data.response[i].process_title)
          
        }).catch(err => {
          console.log(err);
        })
    }, rdv)

    const handleTimeChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTime(e.target.value);
        isTimeError.current = e.target.value === '';
    }

    const [object, setObject] = useState("");
    const isObjectError = useRef(false);
    
    const selectedMonth =  date.toDateString()?.split(" ")[1] == "Jan" ? "01" : "Not Set";
    const comparativeDate = date.toDateString()?.split(" ")[3] + "-" + selectedMonth + "-" + date.toDateString()?.split(" ")[2];

    const handleObjectChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setObject(e.target.value);
        isObjectError.current = e.target.value === '';
    }

    const submitNewEvent = () => {
        isNewDateError.current = newDate === '';
        isNewTitleError.current = newTitle === '';
        isNewContentError.current = newContent === '';
        var newEventContent = {
            date: newDate,
            title: newTitle,
            content: newContent
        }
        // Back-end code to submit newEventContent variable here
        console.log(newEventContent);
    }

    const submitModEvent = () => {
        isModDateError.current = modDate === '';
        isModTitleError.current = modTitle === '';
        isModContentError.current = modContent === '';
        var modEventContent = {
            date: modDate,
            title: modTitle,
            content: modContent
        }
        // Back-end code to submit modEventContent variable here
        console.log(modEventContent);
    }

    {
        rdv?.map((item: any) => {
            return (
                item.toString()?.split("T")[0] === comparativeDate ? isEvent += 1 : isEvent += 0
            )
        })
    }

    if(!cookies.get('loginToken')) {
        window.location.assign('/');
    }
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
                    <Calendar locale="en-GB" onChange={setDate} value={date} onClickDay={() => setShowTime(true)}/>
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
                        placeholder={'Select the Procedure'}
                        options={posts}
                        onChange={handleProcessSelected}
                        /> 
                        </div>
                        

                        </Center>
                        <Center>
                            <Textarea 
                                width={'200px'}
                                placeholder='Object'
                                onChange={handleNewContentChange}
                            />
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
                        <Button bgColor="#29C9B3" color="white" width={'160px'}>Edit/Delete an Event</Button>
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
                                        <Input type="time" defaultValue={item.toString()?.split("T")[1]?.split(".")[0]} onChange={handleModDateChange}/>
                                    </Flex>
                                    </Center>
                                    <Center p={'10px'}>
                                        <Input width={'200px'} defaultValue={rdv[indexEdi]} onChange={handleModTitleChange}/>
                                    </Center>
                                    <Center>
                                    <Textarea 
                                        width={'200px'}
                                        placeholder='Object'
                                        defaultValue={rdv[indexEdi + 1]}
                                        onChange={handleModContentChange}
                                    />
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