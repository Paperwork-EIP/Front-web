import React, { useState } from "react";

import { toast } from 'react-toastify';
import { FaLinkedin } from "react-icons/fa";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { MdManageAccounts, MdOutlineModelTraining, MdRocketLaunch, MdFastForward } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";
import { TbBeta } from "react-icons/tb"
import { useTranslation } from 'react-i18next';
import axios from "axios";

import Navbar from "../components/Navbar";

import "../styles/pages/AboutUs.scss";
import 'react-vertical-timeline-component/style.min.css';

function AboutUsPage() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const api = process.env.REACT_APP_BASE_URL;
    const { t } = useTranslation();

    function submitForm() {
        axios.get(`${api}/contact/sendEmail`,
            {
                params: {
                    name: name,
                    content: text,
                    email: email
                }
            })
            .then(() => {
                toast.success(t('aboutus.email_sent'));
            })
            .catch((err) => {
                console.log(err);
                toast.error(t('aboutus.error'));
            })
    }

    return (
        <div className="AboutUs">
            <Navbar />
            <div className="AboutUs-container">
                <div className="AboutUs-team">
                    <h1 className="AboutUs-title">{t('aboutus.title')}</h1>
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
                                <p>{t('aboutus.job_1')}</p>
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
                                <p>{t('aboutus.job_2')}</p>
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
                                <p>{t('aboutus.job_3')}</p>
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
                                <p>{t('aboutus.job_4')}</p>
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
                                <p>{t('aboutus.job_5')}</p>
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
                                <p>{t('aboutus.job_6')}</p>
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
                                <p>{t('aboutus.job_7')}</p>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="AboutUs-timeline">
                    <h1 className="AboutUs-timeline-h1">{t('aboutus.timeline_title')}</h1>
                    <VerticalTimeline>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ borderTop: '6px solid #808080' }}
                            date={t('aboutus.date_1').toString()}
                            iconStyle={{ background: '#808080', color: '#fff' }}
                            icon={<IoMoonSharp />}
                        >
                            <p className="vertical-timeline-element-title">{t('aboutus.timeline_1_title')}</p>
                            <p className="vertical-timeline-element-subtitle">{t('aboutus.timeline_1_text')}</p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ borderTop: '6px solid #AA6C39' }}
                            date={t('aboutus.date_2').toString()}
                            iconStyle={{ background: '#AA6C39', color: '#fff' }}
                            icon={<MdOutlineModelTraining />}
                        >
                            <p className="vertical-timeline-element-title">{t('aboutus.timeline_2_title')}</p>
                            <p className="vertical-timeline-element-subtitle">{t('aboutus.timeline_2_text')}</p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ borderTop: '6px solid #FFBD19' }}
                            date={t('aboutus.date_3').toString()}
                            iconStyle={{ background: '#FFBD19', color: '#fff' }}
                            icon={<MdRocketLaunch />}
                        >
                            <p className="vertical-timeline-element-title">{t('aboutus.timeline_3_title')}</p>
                            <p className="vertical-timeline-element-subtitle">{t('aboutus.timeline_3_text')}</p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ borderTop: '6px solid red' }}
                            date={t('aboutus.date_4').toString()}
                            iconStyle={{ background: 'red', color: '#fff' }}
                            icon={<MdManageAccounts />}
                        >
                            <p className="vertical-timeline-element-title">{t('aboutus.timeline_4_title')}</p>
                            <p className="vertical-timeline-element-subtitle">{t('aboutus.timeline_4_text')}</p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ borderTop: '6px solid #8B008B' }}
                            date={t('aboutus.date_5').toString()}
                            iconStyle={{ background: '#8B008B', color: '#fff' }}
                            icon={<MdFastForward />}
                        >
                            <p className="vertical-timeline-element-title">{t('aboutus.timeline_5_title')}</p>
                            <p className="vertical-timeline-element-subtitle">{t('aboutus.timeline_5_text')}</p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ borderTop: '6px solid #4B0076' }}
                            date={t('aboutus.date_6').toString()}
                            iconStyle={{ background: '#4B0076', color: '#fff' }}
                            icon={<TbBeta />}
                        >
                            <p className="vertical-timeline-element-title">{t('aboutus.timeline_6_title')}</p>
                            <p className="vertical-timeline-element-subtitle">{t('aboutus.timeline_6_text')}</p>
                        </VerticalTimelineElement>
                    </VerticalTimeline>
                </div>
                <div className="AboutUs-footer">
                    <h1>{t('aboutus.contact_form_title')}</h1>
                    <div className="AboutUs-contact-form">
                        <form id="contact">
                            <fieldset>
                                <input placeholder={t('aboutus.contact_form_name').toString()} type="text" data-testid="name" value={name} onChange={(e) => setName(e.target.value)} required />
                            </fieldset>
                            <fieldset>
                                <input placeholder={t('aboutus.contact_form_email').toString()} type="email" data-testid="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </fieldset>
                            <fieldset>
                                <textarea placeholder={t('aboutus.contact_form_text').toString()} data-testid="text" value={text} onChange={(e) => setText(e.target.value)} required></textarea>
                            </fieldset>
                            <fieldset>
                                <button type="button" aria-label="button-send" onClick={submitForm}>{t('aboutus.contact_button')}</button>
                            </fieldset>
                        </form>
                    </div>
                    <p>{t('aboutus.contact_email')}</p>
                    <a href="mailto:paperwork_2024@labeip.epitech.eu">paperwork_2024@labeip.epitech.eu</a>
                    <div className="separator"></div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsPage;