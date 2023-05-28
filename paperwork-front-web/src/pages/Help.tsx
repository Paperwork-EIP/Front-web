import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Cookies from 'universal-cookie';
import "../styles/Help.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getTranslation } from './Translation';

interface FAQ {
  question: string;
  answer: string;
  image: string;
  alt: string;
  link: string;
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
    const translation = getTranslation(language, "helpPage");
    setFaqs([
      {
        question: translation.question1,
        answer: translation.answer1,
        image: "assets/help-page/Profile-neutral.png",
        alt: "Profile_page_clickable_image",
        link: "/profile",
        open: false
      },
      {
        question: translation.question2,
        answer: translation.answer2,
        image: "assets/help-page/Quiz-neutral.png",
        alt: "Quiz_page_clickable_image",
        link: "/quiz",
        open: false
      },
      {
        question: translation.question3,
        answer: translation.answer3,
        image: "assets/help-page/Calendar-create.png",
        alt: "Calendar_addEvent_page_clickable_image",
        link: "/calendar",
        open: false
      },
      {
        question: translation.question4,
        answer: translation.answer4,
        image: "assets/help-page/Calendar-delete.png",
        alt: "Calendar_deleteEvent_page_clickable_image",
        link: "/calendar",
        open: false
      },
      {
        question: translation.question5,
        answer: translation.answer5,
        image: "assets/help-page/Processidea-neutral.png",
        alt: "ProcessIdea_page_clickable_image",
        link: "/processidea",
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
    <>
      <Header />
      <div className="faq-image">
        <img src="assets/help-page/FAQs-bro.svg" alt="FAQs_bro_image" />
      </div>
      <div className="App">
        <div className="faqs">
          {faqs.map((faq, index) => (
            <div data-testid="faq-button"
              className={"faq " + (faq.open ? "open" : "")}
              key={index}
              onClick={() => toggleFAQ(index)}>
              <div className="faq-question">{faq.question}</div>
              <div className="faq-answer faq-answer-divider faq-display-linebreak">{faq.answer}</div>
              <Link to={faq.link}>
                <img className="faq-answer faq-screen" src={faq.image} alt={faq.alt} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <a href="mailto:paperwork_2024@labeip.epitech.eu">
          <div className="faq-image-contact-us faq-contact-mail" >
              <img src="assets/help-page/ContactUs-bro.svg" alt="ContactUs_bro_image" />
          </div>
      </a>
      </>
    );
}

export default HelpPage;