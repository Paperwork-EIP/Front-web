import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getTranslation } from './Translation';
import { useColorMode } from '@chakra-ui/react';

import "../styles/pages/Help.scss";

interface FAQ {
    question: string;
    answer: string;
    imageLight: string;
    imageDark: string;
    alt: string;
    link: string;
    title: string;
    open: boolean;
}

function HelpPage() {
    const cookies = new Cookies();
    const [language, setLanguage] = useState("");
    const api = process.env.REACT_APP_BASE_URL;

    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }

    const cookieList = cookies.get('loginToken');
    const { colorMode } = useColorMode();
    const translation = getTranslation(language, "helpPage");


    useEffect(() => {
        axios.get(`${api}/user/getbytoken`, { params: { token: cookieList.loginToken } })
            .then(res => {
                console.log(res.data.language);
                setLanguage(res.data.language);
            }).catch(err => {
                console.log(err)
            });
    }, [cookieList]);

    useEffect(() => {
        setFaqs([
            {
                question: translation.question1,
                answer: translation.answer1,
                imageLight: "assets/help-page/Profile-light.png",
                imageDark: "assets/help-page/Profile-dark.png",
                alt: "Profile_page_clickable_image",
                link: "/profile",
                title: "Go to profile page",
                open: false
            },
            {
                question: translation.question2,
                answer: translation.answer2,
                imageLight: "assets/help-page/Quiz-light.png",
                imageDark: "assets/help-page/Quiz-dark.png",
                alt: "Quiz_page_clickable_image",
                link: "/quiz",
                title: "Go to quiz page",
                open: false
            },
            {
                question: translation.question3,
                answer: translation.answer3,
                imageLight: "assets/help-page/Calendar-create-light.png",
                imageDark: "assets/help-page/Calendar-create-dark.png",
                alt: "Calendar_addEvent_page_clickable_image",
                link: "/calendar",
                title: "Go to calendar page",
                open: false
            },
            {
                question: translation.question4,
                answer: translation.answer4,
                imageLight: "assets/help-page/Calendar-delete-light.png",
                imageDark: "assets/help-page/Calendar-delete-dark.png",
                alt: "Calendar_deleteEvent_page_clickable_image",
                link: "/calendar",
                title: "Go to calendar page",
                open: false
            },
            {
                question: translation.question5,
                answer: translation.answer5,
                imageLight: "assets/help-page/ProcessIdea-light.png",
                imageDark: "assets/help-page/ProcessIdea-dark.png",
                alt: "ProcessIdea_page_clickable_image",
                link: "/processidea",
                title: "Go to process idea page",
                open: false
            },
            {
                question: translation.question6,
                answer: translation.answer6,
                imageLight: "assets/help-page/Settings-light.png",
                imageDark: "assets/help-page/Settings-dark.png",
                alt: "Settings_page_clickable_image",
                link: "/settings",
                title: "Go to settings page",
                open: false
            },
            {
                question: translation.question7,
                answer: translation.answer7,
                imageLight: "assets/help-page/Lexicon-light.png",
                imageDark: "assets/help-page/Lexicon-dark.png",
                alt: "Lexicon_page_clickable_image",
                link: "/lexicon",
                title: "Go to lexicon page",
                open: false
            }
        ]);
    }, [language]);

    const [faqs, setFaqs] = useState<FAQ[]>([]);

    const toggleFAQ = (index: number) => {
        setFaqs((prevFaqs) => {
            return prevFaqs.map((faq, i) => {
                if (i === index) {
                    return { ...faq, open: !faq.open };
                } else {
                    return { ...faq, open: false };
                }
            });
        });
    };

    return (
        <div className={colorMode === "light" ? "Help help-light" : "Help help-dark"}>
            <Header />
            {
                colorMode === "light" ?
                    <>
                        <div className='Lexicon-text-button-light'>
                            {translation.textLexicon}
                        </div><Link className='Lexicon-button-light' to="/lexicon">{translation.buttonLexicon}</Link><div className="faq-light-image">
                            <img src="assets/help-page/FAQs-bro.svg" alt="FAQs_bro_image" />
                        </div>
                    </>
                    :
                    <>
                        <div className='Lexicon-text-button-dark'>
                            {translation.textLexicon}
                        </div><Link className='Lexicon-button-dark' to="/lexicon">{translation.buttonLexicon}</Link><div className="faq-dark-image">
                            <img src="assets/help-page/FAQs-bro.svg" alt="FAQs_bro_image" />
                        </div>
                    </>
            }
            {
                colorMode === "light" ?
                    <div className="faqs-light">
                        {
                            faqs.map((faq, index) => (
                                <div data-testid="faq-button"
                                    className={"faq-light " + (faq.open ? "open" : "")}
                                    key={index}
                                    onClick={() => toggleFAQ(index)}>
                                    <div className="faq-light-question">{faq.question}</div>
                                    <div className="faq-light-answer faq-light-answer-divider faq-light-display-linebreak">{faq.answer}</div>
                                    <Link to={faq.link}>
                                        <img className="faq-light-answer faq-light-screen" src={faq.imageLight} alt={faq.alt} title={faq.title} />
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div className="faqs-dark">
                        {
                            faqs.map((faq, index) => (
                                <div data-testid="faq-button"
                                    className={"faq-dark " + (faq.open ? "open" : "")}
                                    key={index}
                                    onClick={() => toggleFAQ(index)}>
                                    <div className="faq-dark-question">{faq.question}</div>
                                    <div className="faq-dark-answer faq-dark-answer-divider faq-dark-display-linebreak">{faq.answer}</div>
                                    <Link to={faq.link}>
                                        <img className="faq-dark-answer faq-dark-screen" src={faq.imageDark} alt={faq.alt} />
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
            }
            <a href="mailto:paperwork_2024@labeip.epitech.eu" className='contact-button'>
                <img src="assets/help-page/email.png" className="contact-image" alt="ContactUs_bro_image" title='Send an email' />
            </a>
        </div>
    );
}

export default HelpPage;