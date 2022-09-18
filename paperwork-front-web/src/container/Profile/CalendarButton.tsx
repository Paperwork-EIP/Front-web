import React from 'react';
import { AiOutlineCalendar } from "react-icons/ai";
import { Button } from '@chakra-ui/react';

const CalendarButton = () => {

    return (
        <Button
            size="lg"
            borderRadius={'5px'}
            mb={8}
            fontSize={"24px"}>
            <AiOutlineCalendar
                color="#FC6976"
                size={50}
            />
            Calendar
        </Button>
    );
}

export default CalendarButton;