import React from 'react';
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { MdAddAPhoto } from "react-icons/md";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";

function Profil() {
    return (
        <>
            <p>Profil Page</p>
            {/* <Row>
                <Col sm={5}>
                    <Button>
                        <MdAddAPhoto />
                    </Button>
                    <AiFillEyeInvisible />
                    <AiFillEye />
                </Col>
                <Col sm={7}>
                    <Button>
                        <FaCalendarAlt />
                        Calendar
                    </Button>
                </Col>
            </Row> */}
        </>
    );
}

export default Profil;