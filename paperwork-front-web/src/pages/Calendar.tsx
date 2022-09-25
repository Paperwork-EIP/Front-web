import { Center, Text, Box, Button, Portal, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton, PopoverAnchor, } from '@chakra-ui/react';
import Header from '../components/Header';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "../styles/Calendar.css";

const CalendarPage = () => {
    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false);
    const initRef = React.useRef()

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
   <Popover>
  <PopoverTrigger>
  <Center>
    <Button bgColor="#29C9B3" color="white">Daily Events</Button>
    </Center>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton color="#FC6976"/>
    <PopoverHeader color="#BDBDBD" fontSize='xs'>{date.toDateString()}</PopoverHeader>
    <PopoverBody pb={20} fontSize='lg' fontWeight={'bold'}>Nothing Planned
    </PopoverBody>
    <PopoverFooter
          border='0'
          display='flex'
          justifyContent='right'
          pb={4}>




        <Button bgColor="#29C9B3" color="white">Add an event</Button>
        
        
        
        
        </PopoverFooter>
  </PopoverContent>
</Popover> 
   </>);
}

export default CalendarPage;