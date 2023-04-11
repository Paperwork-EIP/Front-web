import React, { useState } from 'react';
import Header from '../components/Header';
import Cookies from 'universal-cookie';
import "../styles/Help.css";
import { Link } from 'react-router-dom';

function HelpPage() {

    const cookies = new Cookies();

    if (!cookies.get('loginToken')) {
        window.location.assign('/');
    }

    const [faqs, setFaqs] = useState([
        {
            question:
              "Comment modifier ses informations personnelles ?",
            answer: "Afin de modifier ses informations personnelles, rendez-vous sur la page Profile en cliquant sur l'image ci-dessous.\nDepuis cette page, vous pouvez:\n- Modifier votre photo de profil en entrant le lien de l'image de votre choix dans le champs 'Profile picture link',\n- Modifier votre nom d'utilisateur via le champ 'Username',\n- Modifier votre adresse email partagée via le champ 'Email',\n- Et enfin modifier votre mot de passe en entrant deux fois le même nouveau mot de passe.",
            image: "assets/help-page/Profile-neutral.png",
            alt: "Profile_page_clickable_image",
            link: "/profile",
            open: false
        },
        {
          question: "Comment ajouter une procédure ?",
          answer: "Afin d'ajouter de nouvelles procédures, rendez-vous sur la page Quiz en cliquant sur l'image ci-dessous.\nDepuis cette page, vous pourrez choisir une procédure parmi toutes celles existantes.\n Une fois la procédure trouvée vous devrez répondre à des questions sur votre avancement dans celle-ci (possession des documents nécéssaires, élégibilité à l'avaancée de la procédure, etc...).\n Une fois la phase de questions terminée, vous serez redirigés vers une page compilant toutes les informations sur la procédure en cours, et vous pourrez ajouter des évènements liés à celle-ci dans le calendrier si nécéssaire.",
          image: "assets/help-page/Quiz-neutral.png",
          alt: "Quiz_page_clickable_image",
          link: "/quiz",
          open: false
        },
        {
          question: "Comment ajouter un évènement au calendrier ?",
          answer: "Afin d'ajouter des évènements liés aux procédures, rendez-vous sur la page Calendar en cliquant sur l'image ci-dessous.\n Depuis le calendrier, vous pourrez voir les différents évènements déjà intanciés mais aussi en ajouter.\nPour ce faire, il vous suffit de cliquer sur la date à laquelle vous souhaitez ajouter un évènement.\n Cliquez ensuite sur le bouton 'Add an Event'. Il vous faudra par la suite renseigner l'heure à laquelle votre évènement a lieu ainsi que la procédure liée à l'évènement parmi la liste de procédures en cours et enfin l'étape de celle-ci. Cliquez enfin sur 'Submit' une fois tous les éléments rensignés afin de créer l'évènement.",
          image: "assets/help-page/Calendar-create.png",
          alt: "Calendar_addEvent_page_clickable_image",
          link: "/calendar",
          open: false
        },
        {
          question: "Comment supprimer ou modifier un évènement au calendrier ?",
          answer: "Afin de modifier ou de supprimer des évènements liés aux procédures, rendez-vous sur la page Calendar en cliquant sur l'image ci-dessous.\n Depuis le calendrier, vous pourrez voir les différents évènements déjà intanciés mais aussi les modifier ou les supprimer.\nPour ce faire, il vous suffit de cliquer sur la date pour laquelle vous souhaitez modifier l'évènement.\n Cliquez ensuite sur le bouton 'Edit/Delete an Event'. Il vous faudra par la suite, pour le modifier renseigner la nouvelle heure ou la nouvelle étape que vous souhaitez attribuer à votre évènement puis cliquer sur le bouton 'Submit' pour le modifier, ou alors cliquer directement sur le bouton 'Delete Event' pour le supprimer.",
          image: "assets/help-page/Calendar-delete.png",
          alt: "Calendar_deleteEvent_page_clickable_image",
          link: "/calendar",
          open: false
        },
        {
          question:
            "Je ne trouve pas la procédure dont j'ai besoin dans la liste des procédures disponibles ?",
          answer: "Dans le cas où une procédure que vous voulez lancer n'est pas disponible sur notre site, vous avez la possibilité de nous le faire savoir via la page Process Idea en cliquant sur l'image ci-dessous.\n Renseignez alors le titre, la description et le contenu de la procédure voulue, appuyez sur le bouton 'Submit' et nous recevrons votre demande. Vous pouvez aussi nous contacter via le bouton de contact en bas de cette page en nous envoyant un mail à paperwork_2024@labeip.epitech.eu.",
          image: "assets/help-page/Processidea-neutral.png",
          alt: "ProcessIdea_page_clickable_image",
          link: "/processidea",
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
            <div className="faq-image">
                <img src="assets/help-page/FAQs-bro.svg" alt="FAQs_bro_image" />
            </div>
            <div className="App">
                <div className="faqs">
                    {faqs.map((faq, index) => (
                    <div data-dataid="faq-button"
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