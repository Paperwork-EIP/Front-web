import React from 'react';
import { AiOutlineCalendar } from "react-icons/ai";
import { Button, Box } from '@chakra-ui/react';
import { Link } from "react-router-dom";

function CalendarButton() {
    return (
        <>
            <Box position={"relative"} h={"100%"}>
                <Box position={"absolute"} bottom={"0"}>
                    <Link to="/calendar">
                        <Button
                            id="calendar-button"
                            aria-label="calendar-button"
                            size="lg"
                            borderRadius={'5px'}
                            mb={4}
                            px={16}
                            py={8}
                            fontSize={"24px"}
                            variant='outline'>
                            <AiOutlineCalendar
                                color="#FC6976"
                                size={50}
                            />
                            Calendar
                        </Button>
                    </Link>
                </Box>
            </Box>
        </>
    );
}

export default CalendarButton;