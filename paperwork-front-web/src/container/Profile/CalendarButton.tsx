import { Button } from '@chakra-ui/react';
import { AiOutlineCalendar } from "react-icons/ai";
import "../../styles/Profile.css";

const CalendarButton = () => {
    
    return (
        <Button aria-label='calendar-button' size="lg" mb={8} className='Profile-CalendarButton' fontSize={"24px"}><AiOutlineCalendar color="#FC6976" size={50} className="Profile-Calendar-Icon"/>Calendar</Button>
    );
}

export default CalendarButton;