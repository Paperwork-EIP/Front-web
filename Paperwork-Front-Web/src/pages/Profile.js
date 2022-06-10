import React from 'react';
import { MdAddAPhoto } from "react-icons/md";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";

function Profile() {
    return (
        <>
            <p>Profile Page</p>
                <MdAddAPhoto />
            <AiFillEyeInvisible />
            <AiFillEye />
                <FaCalendarAlt />
                Calendar
        </>
    );
}

export default Profile;