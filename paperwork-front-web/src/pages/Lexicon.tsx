import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Cookies from 'universal-cookie';
import "../styles/pages/Lexicon.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getTranslation } from './Translation';
import { useColorMode } from '@chakra-ui/react';

interface FAQ {
  question: string;
  answer: string;
  image: string;
  alt: string;
  link: string;
  open: boolean;
}

function LexiconPage() {
  const cookies = new Cookies();
  const [language, setLanguage] = useState("");
  const api = process.env.REACT_APP_BASE_URL;

  if (!cookies.get('loginToken')) {
    window.location.assign('/');
  }

  const cookieList = cookies.get('loginToken');
  const { colorMode } = useColorMode();
  const translation = getTranslation(language, "lexiconPage");

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
        image: "assets/lexicon-page/vitale.svg",
        alt: "vitale_card_clickable_image",
        link: "https://www.ameli.fr/assure/remboursements/etre-bien-rembourse/carte-vitale",
        open: false
      },
      {
        question: translation.question2,
        answer: translation.answer2,
        image: "assets/lexicon-page/passport.png",
        alt: "passport_clickable_image",
        link: "https://www.service-public.fr/particuliers/vosdroits/N360",
        open: false
      },
      {
        question: translation.question3,
        answer: translation.answer3,
        image: "assets/lexicon-page/visa.png",
        alt: "visa_clickable_image",
        link: "https://www.service-public.fr/particuliers/vosdroits/F16162",
        open: false
      },
      {
        question: translation.question4,
        answer: translation.answer4,
        image: "assets/lexicon-page/resident.png",
        alt: "resident_permit_clickable_image",
        link: "https://www.service-public.fr/particuliers/vosdroits/F14807",
        open: false
      },
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
    <div className={colorMode === "light" ? "lexicon-light" : "lexicon-dark"}>
      <Header />
      {
        colorMode === "light" ?
          <><div className='Help-text-button-light'>
            {translation.textHelp}
          </div><Link className='Help-button-light' to="/help">{translation.buttonHelp}</Link>
          </>
          :
          <><div className='Help-text-button-dark'>
            {translation.textHelp}
          </div><Link className='Help-button-dark' to="/help">{translation.buttonHelp}</Link>
          </>
      }
      <div className="lexicon-image">
        <img src="assets/lexicon-page/Lexicon-icon.png" alt="lexicon_icon_image" />
      </div>
      {
        colorMode === "light" ?
          <div className="faqs">
            {
              faqs.map((faq, index) => (
                <div data-testid="faq-button"
                  className={"faq-light" + (faq.open ? "open" : "")}
                  key={index}
                  onClick={() => toggleFAQ(index)}>
                  <div className="faq-light-question">{faq.question}</div>
                  <div className="faq-light-answer faq-light-answer-divider faq-light-display-linebreak">{faq.answer}</div>
                  <Link to={faq.link}>
                    <img className="faq-light-answer faq-light-screen" src={faq.image} alt={faq.alt} />
                  </Link>
                </div>
              ))
            }
          </div>
          :
          <div className="faqs">
            {
              faqs.map((faq, index) => (
                <div data-testid="faq-button"
                  className={"faq-dark " + (faq.open ? "open" : "")}
                  key={index}
                  onClick={() => toggleFAQ(index)}>
                  <div className="faq-dark-question">{faq.question}</div>
                  <div className="faq-dark-answer faq-dark-answer-divider faq-dark-display-linebreak">{faq.answer}</div>
                  <Link to={faq.link}>
                    <img className="faq-dark-answer faq-dark-screen" src={faq.image} alt={faq.alt} />
                  </Link>
                </div>
              ))
            }
          </div>
      }
    </div>
  );
}

export default LexiconPage;