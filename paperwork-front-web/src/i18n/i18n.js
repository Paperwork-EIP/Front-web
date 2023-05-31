import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            button: {
                fr: "Français",
                en: "English"
            },
            welcome: {
                header_title: "Paperwork",
                header_description: "A tool to help you for the most annoying task.",
                header_start_button: "Get Started",
                container_title: "What is Paperwork ?",
                container_description: "An app to help you for your administrative tasks",
                container_description_card_1: "Web and Mobile platform !",
                container_description_card_2: "A guide for your administrative procedures in France.",
                container_description_card_3: "Help to be ready for administrative appointments.",
                section_1_title: "Tired of paperwork ?",
                section_1_text_1: "Tired of administrative paperwork ? Here is ",
                section_1_text_2: ", an application that guides step by step in your procedures. the objective of this application is to simplify administrative procedures by providing an intuitive and accessible platform for users.",
                section_2_title: "A quiz to save time",
                section_2_text: "Thanks to our quiz, you will know exactly the steps to follow for the desired procedure.",
                section_3_title: "Stay alerted to remind you your unfinshed tasks",
                section_3_text: "Your progress is saved for each step you start and receive notifications directly in the mobile application to inform you of your steps to be completed and your next appointments.",
                download_title: "Download our Android/IOS application to get more flexibility !",
                download_button_text: "Download",
                footer_title: "Paperwork",
                footer_aboutus: "About Us",
                footer_register: "Register",
                footer_login: "Login"
            },
            login: {
                title: "Login",
                email: "Email",
                password: "Password",
                button: "Login",
                no_account: "You don't have an account ?",
                no_account_click: "Click here !",
                text_1: "Welcome back !",
                text_2: "You can sign in with your existing account",
                error: "Email or password is incorrect.",
                forgotPassword: "Forgot Password",
                forgotPasswordTitleTop: "Forgot Password ?",
                forgotPasswordTitle: "Confirm the mailbox where you want us to send you your new password",
                emailSent: "Email sent successfully!",
                emailFail: "Failure to send the verification email"
            },
            register: {
                title: "Register",
                email: "Email",
                username: "Username",
                password: "Password",
                confirm_password: "Confirm password",
                button: "Register",
                yes_account: "You already have an account ?",
                yes_account_click: "Click here !",
                text_1: "Join us !",
                text_2: "Create your account with an email address or by Google/Facebook",
                fail: "Fail to send the verification email",
                error: "Email, username or password is incorrect."
            },
            aboutus: {
                title: "Team of 7 developers",
                job_1: "Fullstack developer",
                job_2: "Fullstack developer",
                job_3: "Frontend developer",
                job_4: "Frontend developer",
                job_5: "Mobile developer",
                job_6: "Devops/Mobile developer",
                job_7: "Backend developer",
                date_1: "September - October 2021",
                timeline_title: "Project timeline",
                timeline_1_title: "Moonshot",
                timeline_1_text: "Idealization of Paperwork.",
                timeline_2_title: "Forward",
                timeline_2_text: "Creation of the first prototype.",
                date_2: "December 2021",
                timeline_3_title: "TEST & LEARN",
                timeline_3_text: "Implementation of the continuous integration and deployment process.",
                date_3: "April - May 2022",
                timeline_4_title: "MANAGEMENT & PROCESS",
                timeline_4_text: "Implementation of the production environment and definition of weekly meetings.",
                date_4: "June - October 2022",
                timeline_5_title: "Fast Forward",
                timeline_5_text: "Projection on the beta version.",
                date_5: "November 2022 - January 2023",
                timeline_6_title: "BETA & GROWTH HACKING",
                timeline_6_text: "Implementation of the beta plan.",
                date_6: "February - May 2023",
                contact_form_title: "Contact us",
                contact_form_name: "Name",
                contact_form_email: "Email",
                contact_form_text: "Write your message here",
                contact_email: "You can send us an email with this address",
                contact_button: "Send",
                email_sent: "The email has been sent.",
                error: "An error has occured. The service couldn't send the request."
            },
            navbar: {
                link_1: "Home",
                link_2: "Login",
                link_3: "Register",
                link_4: "About Us"
            },
            resetPassword: {
                resetPasswordSuccess: "Password reset successfully!",
                resetPasswordFail: "Failure to reset your password",
                divPasswords: "Password and Confirm Password are not identicals",
                titleTop: "Need a new password ?",
                title: "Set your new password for your Paperwork account",
                passwordInput: "New Password",
                confirmPasswordInput: "Confirm New Password",
                validate: "Validate",
            },
            emailSent: {
                titleTop: "An email has been sent !",
                title: "Please check out your mailbox",
                receiveAgain: "I didn't received it",
                emailSent: "Email sent successfully!",
                emailFail: "Failure to send the verification email",
            },
            verifyEmail: {
                icon: "It's all good !",
                verified: "Your email has been verified",
                titleTop: "Start your journey on Paperwork",
                home: "Home",
                profile: "Profile",
                calendar: "Calendar",
                help: "Help",
                newProcess: "New Process",
                processIdea: "Process Idea",
            }
        }
    },
    fr: {
        translation: {
            button: {
                fr: "Français",
                en: "English"
            },
            welcome: {
                header_title: "Paperwork",
                header_description: "Un outil pour vous aider dans la tâche la plus ennuyeuse.",
                header_start_button: "Commencer",
                container_title: "Qu'est-ce que Paperwork ?",
                container_description: "Une application pour vous aider dans vos tâches administratives.",
                container_description_card_1: "Plateforme web et mobile !",
                container_description_card_2: "Un guide pour vos démarches administratives en France.",
                container_description_card_3: "Aide pour être prêt(e) pour les rendez-vous administratifs.",
                section_1_title: "Fatigué(e) des paperasses ?",
                section_1_text_1: "Marre des paperasses administratives ? Voici ",
                section_1_text_2: ", une application qui vous guide pas à pas dans vos démarches. L'objectif de cette application est de simplifier les procédures administratives en fournissant une plateforme intuitive et accessible aux utilisateurs.",
                section_2_title: "Un quiz pour gagner du temps",
                section_2_text: "Grâce à notre quiz, vous saurez exactement les étapes à suivre pour la procédure souhaitée.",
                section_3_title: "Restez alerté(e) pour vous rappeler vos tâches inachevées",
                section_3_text: "Votre progression est sauvegardée pour chaque étape que vous commencez, et vous recevez des notifications directement dans l'application mobile pour vous informer des étapes à terminer et de vos prochains rendez-vous.",
                download_title: "Téléchargez notre application Android/IOS pour plus de flexibilité !",
                download_button_text: "Télécharger",
                footer_title: "Paperwork",
                footer_aboutus: "À propos de nous",
                footer_register: "S'inscrire",
                footer_login: "Se connecter"
            },
            login: {
                title: "Connexion",
                email: "Email",
                password: "Mot de passe",
                button: "Connexion",
                no_account: "Vous n'avez pas de compte ?",
                no_account_click: "Cliquez ici !",
                text_1: "Bienvenue de retour !",
                text_2: "Vous pouvez vous connecter avec votre compte existant.",
                error: "L'email ou le mot de passe est incorrect.",
                forgotPassword: "Mot de passe oublié",
                forgotPasswordTitleTop: "Mot de passe oublié ?",
                forgotPasswordTitle: "Confirmez l'adresse e-mail à laquelle vous souhaitez que nous vous envoyions votre nouveau mot de passe",
                emailSent: "Email envoyé avec succès!",
                emailFail: "Echec de l'envoi de l'email de vérification"
            },
            register: {
                title: "Inscription",
                email: "Email",
                username: "Nom d'utilisateur",
                password: "Mot de passe",
                confirm_password: "Confirmer le mot de passe",
                button: "S'inscrire",
                yes_account: "Vous avez déjà un compte ?",
                yes_account_click: "Cliquez ici !",
                text_1: "Rejoignez-nous !",
                text_2: "Créez votre compte avec une adresse email ou via Google/Facebook.",
                fail: "Échec de l'envoi de l'email de vérification",
                error: "L'email, le nom d'utilisateur ou le mot de passe est incorrect."
            },
            aboutus: {
                title: "Équipe de 7 développeurs",
                job_1: "Développeur fullstack",
                job_2: "Développeur fullstack",
                job_3: "Développeur frontend",
                job_4: "Développeur frontend",
                job_5: "Développeur mobile",
                job_6: "Devops/Développeur mobile",
                job_7: "Développeur backend",
                timeline_title: "Chronologie du projet",
                timeline_1_title: "Moonshot",
                timeline_1_text: "Idéalisation de Paperwork.",
                date_1: "Septembre - Octobre 2021",
                timeline_2_title: "Forward",
                timeline_2_text: "Création du premier prototype.",
                date_2: "Décembre 2021",
                timeline_3_title: "TEST & LEARN",
                timeline_3_text: "Mise en place du processus d'intégration et de déploiement continus.",
                date_3: "Avril - Mai 2022",
                timeline_4_title: "MANAGEMENT & PROCESS",
                timeline_4_text: "Mise en place de l'environnement de production et définition des réunions hebdomadaires.",
                date_4: "Juin - Octobre 2022",
                timeline_5_title: "Fast Forward",
                timeline_5_text: "Projection sur la version bêta.",
                date_5: "Novembre 2022 - Janvier 2023",
                timeline_6_title: "BETA & GROWTH HACKING",
                timeline_6_text: "Mise en place du plan bêta.",
                date_6: "Février - Mai 2023",
                contact_form_title: "Contactez-nous",
                contact_form_name: "Nom",
                contact_form_email: "Email",
                contact_form_text: "Écrivez votre message ici",
                contact_email: "Vous pouvez nous envoyer un email à cette adresse",
                contact_button: "Envoyer",
                email_sent: "L'email a été envoyé.",
                error: "Une erreur s'est produite. Le service n'a pas pu envoyer la demande."
            },
            navbar: {
                link_1: "Accueil",
                link_2: "Connexion",
                link_3: "Inscription",
                link_4: "À propos de nous"
            },
            resetPassword:{
                resetPasswordSuccess: "Réinitialisation du mot de passe réussie !",
                resetPasswordFail: "Échec de la réinitialisation de votre mot de passe",
                divPasswords: "Le mot de passe et la confirmation du mot de passe ne sont pas identiques",
                titleTop: "Besoin d'un nouveau mot de passe ?",
                title: "Définissez votre nouveau mot de passe pour votre compte Paperwork",
                passwordInput: "Nouveau mot de passe",
                confirmPasswordInput: "Confirmer le nouveau mot de passe",
                validate: "Valider",
            },
            emailSent: {
                titleTop: "Un e-mail a été envoyé !",
                title: "Veuillez vérifier votre boîte mail",
                receiveAgain: "Je n'ai pas reçu d'e-mail",
                emailSent: "E-mail envoyé avec succès !",
                emailFail: "Échec de l'envoi de l'e-mail de vérification",
            },
            verifyEmail: {
                icon: "Tout est en ordre !",
                verified: "Votre e-mail a été vérifié",
                titleTop: "Commencez votre aventure sur Paperwork",
                home: "Accueil",
                profile: "Profil",
                calendar: "Calendrier",
                help: "Aide",
                newProcess: "Nouvelle Procédure",
                processIdea: "Idée de Procédure",
            }
        }
    }
};

const defaultLanguage = window.navigator.userLanguage;

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: defaultLanguage || "en",
        returnNull: false,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;