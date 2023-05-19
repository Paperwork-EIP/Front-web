import React, { useState } from "react";

import { FaLinkedin } from "react-icons/fa";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { MdManageAccounts, MdOutlineModelTraining, MdRocketLaunch, MdFastForward, MdEmail } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";
import { TbBeta } from "react-icons/tb";
import axios from "axios";

import Navbar from "../components/Navbar";

import "../styles/pages/AboutUs.scss";
import 'react-vertical-timeline-component/style.min.css';

function AboutUsPage() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const api = process.env.REACT_APP_BASE_URL;

    function submitForm() {
        axios.get(`${api}/contact/sendEmail`,
        {
            params: {
                    email: email,
                    description: text,
                    name: name
            }
        })
        .then(() => {
            alert("The email has been sent.");
        })
        .catch((err) => {
            console.log(err);
            alert("An error has occured. The service couldn't send the request.");
        })
    }

    return (
        <div className="AboutUs">
            <Navbar />
            <div className="AboutUs-container">
                <div className="AboutUs-team">
                    <h1 className="AboutUs-title">Team of 7 developers</h1>
                    <div className="AboutUs-contacts">
                        <section className="AboutUs-card">
                            <div className="AboutUs-card-picture-container">
                                <img src="/assets/aboutus-page/austin.jpg" alt="austin-picture" />
                            </div>
                            <div className="AboutUs-card-content">
                                <h1>
                                    <a href="https://www.linkedin.com/in/austin-william-lo-2a75271a1/" target="blank">
                                        Austin-William Lo
                                    </a>
                                    <FaLinkedin />
                                </h1>
                                <p>Fullstack developer</p>
                            </div>
                        </section>
                        <section className="AboutUs-card">
                            <div className="AboutUs-card-picture-container">
                                <img src="/assets/aboutus-page/emma.jpg" alt="emma-picture" />
                            </div>
                            <div className="AboutUs-card-content">
                                <h1>
                                    <a href="https://www.linkedin.com/in/emma-rulliere/" target="blank">
                                        Emma Rulliere
                                    </a>
                                    <FaLinkedin />
                                </h1>
                                <p>Fullstack developer</p>
                            </div>
                        </section>
                        <section className="AboutUs-card">
                            <div className="AboutUs-card-picture-container">
                                <img src="/assets/aboutus-page/dylan.png" alt="dylan-picture" />
                            </div>
                            <div className="AboutUs-card-content">
                                <h1>
                                    <a href="https://www.linkedin.com/in/dylan-faure/" target="blank">
                                        Dylan Faure
                                    </a>
                                    <FaLinkedin />
                                </h1>
                                <p>Frontend developer</p>
                            </div>
                        </section>
                        <section className="AboutUs-card">
                            <div className="AboutUs-card-picture-container">
                                <img src="/assets/aboutus-page/luca.png" alt="luca-picture" />
                            </div>
                            <div className="AboutUs-card-content">
                                <h1>
                                    <a href="https://www.linkedin.com/in/luca-banyols/" target="blank">
                                        Luca Banyols
                                    </a>
                                    <FaLinkedin />
                                </h1>
                                <p>Frontend developer</p>
                            </div>
                        </section>
                        <section className="AboutUs-card">
                            <div className="AboutUs-card-picture-container">
                                <img src="/assets/aboutus-page/vincent.png" alt="vincent-picture" />
                            </div>
                            <div className="AboutUs-card-content">
                                <h1>
                                    <a href="https://www.linkedin.com/in/vincent-pichot-5324111ab/" target="blank">
                                        Vincent Pichot
                                    </a>
                                    <FaLinkedin />
                                </h1>
                                <p>Mobile developer</p>
                            </div>
                        </section>
                        <section className="AboutUs-card">
                            <div className="AboutUs-card-picture-container">
                                <img src="/assets/aboutus-page/annaig.png" alt="annaig-picture" />
                            </div>
                            <div className="AboutUs-card-content">
                                <h1>
                                    <a href="https://www.linkedin.com/in/annaig-leizour/" target="blank">
                                        Annaïg Leizour
                                    </a>
                                    <FaLinkedin />
                                </h1>
                                <p>Devops/Mobile developer</p>
                            </div>
                        </section>
                        <section className="AboutUs-card">
                            <div className="AboutUs-card-picture-container">
                                <img src="/assets/aboutus-page/victor.png" alt="victor-picture" />
                            </div>
                            <div className="AboutUs-card-content">
                                <h1>
                                    <a href="https://www.linkedin.com/in/annaig-leizour/" target="blank">
                                        Victor Thouvenin
                                    </a>
                                    <FaLinkedin />
                                </h1>
                                <p>Backend developer</p>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="AboutUs-timeline">
                    <h1 className="AboutUs-timeline-h1">Timeline of the project</h1>
                    <VerticalTimeline>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ borderTop: '6px solid #808080' }}
                            date="September - October 2021"
                            iconStyle={{ background: '#808080', color: '#fff' }}
                            icon={<IoMoonSharp />}
                        >
                            <p className="vertical-timeline-element-title">Moonshot</p>
                            <p className="vertical-timeline-element-subtitle">Paperwork's Idealization.</p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ borderTop: '6px solid #AA6C39' }}
                            date="December 2021"
                            iconStyle={{ background: '#AA6C39', color: '#fff' }}
                            icon={<MdOutlineModelTraining />}
                        >
                            <p className="vertical-timeline-element-title">Forward</p>
                            <p className="vertical-timeline-element-subtitle">Creation of the first prototype.</p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ borderTop: '6px solid #FFBD19' }}
                            date="April - May 2022"
                            iconStyle={{ background: '#FFBD19', color: '#fff' }}
                            icon={<MdRocketLaunch />}
                        >
                            <p className="vertical-timeline-element-title">TEST & LEARN</p>
                            <p className="vertical-timeline-element-subtitle">Implementation of the continuous integration and deployment process.</p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ borderTop: '6px solid red' }}
                            date="June - October 2022"
                            iconStyle={{ background: 'red', color: '#fff' }}
                            icon={<MdManageAccounts />}
                        >
                            <p className="vertical-timeline-element-title">MANAGEMENT & PROCESS</p>
                            <p className="vertical-timeline-element-subtitle">Implementation of the production environment and definition of weekly meetings.</p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ borderTop: '6px solid #8B008B' }}
                            date="November 2022 - January 2023"
                            iconStyle={{ background: '#8B008B', color: '#fff' }}
                            icon={<MdFastForward />}
                        >
                            <p className="vertical-timeline-element-title">Fast forward</p>
                            <p className="vertical-timeline-element-subtitle">Projection on the beta version.</p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ borderTop: '6px solid #4B0076' }}
                            date="February - May 2023"
                            iconStyle={{ background: '#4B0076', color: '#fff' }}
                            icon={<TbBeta />}
                        >
                            <p className="vertical-timeline-element-title">BETA & GROWTH HACKING</p>
                            <p className="vertical-timeline-element-subtitle">Implementation of the beta plan.</p>
                        </VerticalTimelineElement>
                    </VerticalTimeline>
                </div>
                <div className="AboutUs-footer">
                    <h1>Contact us</h1>
                    <div className="AboutUs-contact-form">
                        <form id="contact">
                            <fieldset>
                                <input placeholder="Name" type="text" data-testid="name" value={name} onChange={(e) => setName(e.target.value)} required />
                            </fieldset>
                            <fieldset>
                                <input placeholder="Email Address" type="email" data-testid="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </fieldset>
                            <fieldset>
                                <textarea placeholder="Type your message here...." data-testid="text" value={text} onChange={(e) => setText(e.target.value)} required></textarea>
                            </fieldset>
                            <fieldset>
                                <button type="button" aria-label="button-send" onClick={submitForm}>Send</button>
                            </fieldset>
                        </form>
                    </div>
                    <p>You can send us an email with this address</p>
                    <a href="mailto:paperwork_2024@labeip.epitech.eu">paperwork_2024@labeip.epitech.eu</a>
                    <div className="separator"></div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsPage;