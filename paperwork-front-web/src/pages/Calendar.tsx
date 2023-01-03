import { Center, Text, Box, Button, Flex, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton, Input} from '@chakra-ui/react';
import Header from '../components/Header';
import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import "../styles/Calendar.css";
import Cookies from 'universal-cookie';
import axios from "axios";

const cookies = new Cookies();

const cookieList = cookies.get('loginToken');

const CalendarPage = (props: any) => {
    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false);
    const initRef = React.useRef()
    var isEvent = 0;

    const [time, setTime] = useState("");
    const isTimeError = useRef(false);

    const api = "http://localhost:8080/";
    const [rdv, setRDV]= useState([]);

    useEffect(() => {
        axios.get(`${api}calendar/getAll?email=${cookieList.email}`, {
        }) .then(res => {
        console.log(res);
          for (var i = 0; i < res.data.appoinment.length; i++) {
              setRDV(res.data.appoinment[i]['date']);
            //console.log(res.data.response[i].process_title)
          }
          
        }).catch(err => {
          console.log(err);
        })
    
        console.log(rdv);
    })

    const handleTimeChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTime(e.target.value);
        isTimeError.current = e.target.value === '';
    }

    const [object, setObject] = useState("");
    const isObjectError = useRef(false);
    
    const selectedMonth =  date.toDateString().split(" ")[1] == "Jan" ? "01" : "Not Set";
    const comparativeDate = date.toDateString().split(" ")[3] + "-" + selectedMonth + "-" + date.toDateString().split(" ")[2];

    const handleObjectChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setObject(e.target.value);
        isObjectError.current = e.target.value === '';
    }

    {
        props.events.list?.map((item: any) => {
            return (
                item.date.split(" ")[0] === comparativeDate ? isEvent += 1 : isEvent += 0
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
                <Text as='em' color="#FC6976" fontSize='lg'>{/*date.toDateString()*/comparativeDate}</Text>
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
                                <Input type="time"/>
                            </Flex>
                        </Center>
                        <Center>
                        <Input width={'200px'} placeholder='Object'/>
                        </Center>
                    </PopoverBody>
                    <PopoverFooter border='0' display='flex' justifyContent='right' pb={4}>
                    <Button bgColor="#29C9B3" color="white">Submit</Button>
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
                                props.events.list?.map((item: any) => {
                                    return (
                                        item.date.split(" ")[0] === comparativeDate ?

                                        <Box m={3} bgColor="#dbdbdb" borderRadius='lg' borderWidth='1px'>
                                            <Text fontSize='xs' mt='1' px='1'> {item.date.split(" ")[1]} </Text>
                                            <Text fontSize='small' px='1'> {item.object} </Text>
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
                        props.events.list?.map((item: any) => {
                            return (
                                item.date.split(" ")[0] === comparativeDate ?
                                <Box m={3} borderColor="#dbdbdb" borderRadius='lg' borderWidth='1px' p={'10px'}>
                                    <Center p={'10px'}>
                                    <Flex width={'200px'} justifyContent={'space-between'}>
                                        <Input type="time" defaultValue={item.date.split(" ")[1]} onChange={handleTimeChange}/>
                                    </Flex>
                                    </Center>
                                    <Center>
                                        <Input width={'200px'} defaultValue={item.object} onChange={handleObjectChange}/>
                                    </Center>
                                    <Center p={'10px'}>
                                        <Button bgColor="#FC6976" color="white">Delete Event</Button>
                                    </Center>                   
                                </Box>
                                : ''
                            )
                        })
                    }
                    </PopoverBody>
                    <PopoverFooter border='0' display='flex' justifyContent='right' pb={4}>
                            <Button justifyContent='right' bgColor="#29C9B3" color="white">Submit</Button>
                    </PopoverFooter>
                    </PopoverContent>
                </Popover>
            </Flex>
            </Center>
   </>);
}

export default CalendarPage;