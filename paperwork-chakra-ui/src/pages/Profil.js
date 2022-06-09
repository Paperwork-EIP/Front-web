import React from 'react';
import { MdAddAPhoto } from "react-icons/md";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";

function Profil() {
    return (
        <>
            <p>Profil Page</p>
                <MdAddAPhoto />
            <AiFillEyeInvisible />
            <AiFillEye />
                <FaCalendarAlt />
                Calendar
        </>
    );
}

export default Profil;