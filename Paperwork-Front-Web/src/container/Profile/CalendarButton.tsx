import { Center, Button } from '@chakra-ui/react';
import { AiOutlineCalendar } from "react-icons/ai";
import "../../styles/Profile.css";

const CalendarButton = () => {
    
    return (
        <Button leftIcon={<AiOutlineCalendar/>} mb={8} className='Profile-CalendarButton'>Calendar</Button>
    );
}

export default CalendarButton;