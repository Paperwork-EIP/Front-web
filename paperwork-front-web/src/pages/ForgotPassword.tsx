import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Cookies from 'universal-cookie';
import axios from 'axios';
import "../styles/ForgotPassword.css";

function ForgotPasswordPage() {

    const cookies = new Cookies();

    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }

    const cookieList = cookies.get('loginToken');

    const [faqs, setFaqs] = useState([
        {
            question:
              "Comment modifier ses informations personnelles ?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lorem eu dolor rhoncus, at scelerisque ligula gravida. Sed porta id mi sit amet convallis. Etiam iaculis massa sit amet lacus blandit sodales. Nulla ultrices velit a diam placerat congue. Pellentesque iaculis, ipsum quis eleifend dapibus, est dui eleifend ante, quis fermentum mi ligula quis nisl. Ut et ex dui. Integer id venenatis quam.",
            open: false
        },
        {
          question: "Comment ajouter une procédure ?",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lorem eu dolor rhoncus, at scelerisque ligula gravida. Sed porta id mi sit amet convallis. Etiam iaculis massa sit amet lacus blandit sodales. Nulla ultrices velit a diam placerat congue. Pellentesque iaculis, ipsum quis eleifend dapibus, est dui eleifend ante, quis fermentum mi ligula quis nisl. Ut et ex dui. Integer id venenatis quam.",
          open: false
        },
        {
          question: "Comment utiliser le calendrier ?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lorem eu dolor rhoncus, at scelerisque ligula gravida. Sed porta id mi sit amet convallis. Etiam iaculis massa sit amet lacus blandit sodales. Nulla ultrices velit a diam placerat congue. Pellentesque iaculis, ipsum quis eleifend dapibus, est dui eleifend ante, quis fermentum mi ligula quis nisl. Ut et ex dui. Integer id venenatis quam.",
          open: false
        },
        {
          question:
            "Comment soumettre une idée de nouvelle procédure ?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lorem eu dolor rhoncus, at scelerisque ligula gravida. Sed porta id mi sit amet convallis. Etiam iaculis massa sit amet lacus blandit sodales. Nulla ultrices velit a diam placerat congue. Pellentesque iaculis, ipsum quis eleifend dapibus, est dui eleifend ante, quis fermentum mi ligula quis nisl. Ut et ex dui. Integer id venenatis quam.",
          open: false
        }
      ]);
    
      const toggleFAQ = (index: number) => {
        setFaqs(
          faqs.map((faq, i) => {
            if (i === index) {
              faq.open = !faq.open;
            } else {
              faq.open = false;
            }
    
            return faq;
          })
        );
      };

    return (
        <>
            <Header/>
            <div className="fp-image">
                <img src="assets/forgotpassword-page/ForgotPassword-bro.svg" alt="ForgotPassword_bro_image" />
            </div>
            <input placeholder='Email' type="email" className="fp-user-email"></input>
            <button className="fp-button">Envoyer</button>
        </>
    );
}

export default ForgotPasswordPage;