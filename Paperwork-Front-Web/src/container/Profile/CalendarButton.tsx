import { Center, Button } from '@chakra-ui/react';
import { AiOutlineCalendar } from "react-icons/ai";
import "../../styles/Profile.css";

const CalendarButton = () => {
    
    return (
        <>
            <Center>
                <Button leftIcon={<AiOutlineCalendar />} className='Profile-CalendarButton'>Calendar</Button>
            </Center>
        </>
    );
}

export default CalendarButton;