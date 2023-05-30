// Translation.tsx

type TranslationKeys = {
  [key: string]: string;
};

type PageTranslations = {
  [page: string]: TranslationKeys;
};

type Translations = {
  [locale: string]: PageTranslations;
};

const translations: Translations = {
  english: {
    quiz: {
      title: "New Process Quiz",
      question: "What type of procedure do you want to complete ?",
      submit: "Submit",
      yes: "Yes",
      no: "No",
    },
    profile: {
      modify: "Modify Profile",
      noUsername: "Username not found",
      noEmail: "Email not found",
      address: "Address",
      noAddress: "Address not found",
      phonenumber: "Phone number",
      noPhonenumber: "Phone number not found",
      language: "Language",
      noLanguage: "Language not found",
      age: "Age",
      noAge: "Age not found",
      process: "Your current process",
      noProcess: "You don't have any process yet",
    },
    settings: {
      heading1: "Profile",
      username: "Username",
      usernamePlaceholder: "Username...",
      name: "Name",
      namePlaceholder: "Name...",
      firstname: "Firstname",
      firstnamePlaceholder: "Firstname...",
      language: "Language",
      languagePlaceholder: "Language...",
      age: "Age",
      agePlaceholder: "Age...",
      heading2: "Personal information",
      address: "Address",
      addressPlaceholder: "Address...",
      phonenumber: "Phone number",
      phonenumberPlaceholder: "Phone number...",
      heading3: "Security",
      password: "Password",
      errorPassword: "Password must be at least 4 characters long",
      verifPassword: "Verif password",
      editPassword: "Edit password",
      deleteAccount: "Delete account",
      changeModalQst: "Are you sure you want to modify your ",
      cancelBtn: "Cancel",
      continueBtn: "Continue",
      deleteModalQst: "Are you sure you want to delete your account ?",
      avatarModalTxt: "Click to choose a new avatar :",
      alertMissingToken: "Missing parameter token.",
      alertMissingEmail: "Missing parameter email.",
      alertUserNotFound: "User not found.",
      alertUsernameAlreadyUsed: "Username already used.",
      alertEmailAlreadyUsed: "Email already used.",
      alertSystemError: "System error.",
      alertSystemErrorPutNumber: "System error, please put a number.",
      alertEmptyUsername: "Username cannot be empty.",
      alertUpdateUsername: "Username updated!",
      alertEmptyName: "Name cannot be empty.",
      alertUpdateName: "Name updated!",
      alertEmptyFirstname: "Firstname cannot be empty.",
      alertUpdateFirstname: "Firstname updated!",
      alertEmptyLanguage: "Language cannot be empty.",
      alertUpdateLanguage: "Language updated!",
      alertEmptyAge: "Age cannot be empty.",
      alertAgeRange: "Age must be between 1 and 200.",
      alertUpdateAge: "Age updated!",
      alertEmptyEmail: "Email cannot be empty.",
      alertUpdateEmail: "Email updated!",
      alertEmptyAddress: "Address cannot be empty.",
      alertUpdateAddress: "Address updated!",
      alertEmptyPhonenumber: "Phone number cannot be empty.",
      alertUpdatePhonenumber: "Phone number updated!",
      alertEmptyPassword: "Password cannot be empty.",
      alertUpdatePassword: "Password updated!",
      alertPasswordLength: "Password must be at least 4 characters long.",
      alertPasswordNotMatch: "Passwords do not match.",
      alertDeleteAccount: "Account deleted!",
      alertAvatarUpdated: "Avatar updated!",
    },
    processResult: {
      alertUpdate: "Updated successfully!",
      startNewProcess: "Start a new process",
      resultProcess: "Result of the process for ",
    },
    header: {
      home: "Home",
      profile: "Profile",
      calendar: "Calendar",
      help: "Help",
      logout: "Logout",
    },
    processIdea: {
      title: "Title",
      helperTitle: "Title of the document.",
      errorTitle: "Title is required.",
      description: "Description",
      helperDescription: "Short description of the document.",
      errorDescription: "Description is required.",
      content: "Content",
      helperContent: "Description of the document.",
      errorContent: "Content is required.",
      cancel: "Cancel",
      submit: "Submit",
      close: "Close",
      continue: "Continue",
      cancelMessage: "Are you sure you want to cancel the process idea?",
      submitMessage: "Are you sure you want to submit the process idea?"
    },
    helpPage: {
      question1: "How to update personal information?",
      answer1: "To update your personal information, go to the Profile page by clicking on the image below.\nFrom this page, you can:\n- Update your profile picture by entering the image link of your choice in the 'Profile picture link' field,\n- Modify your username using the 'Username' field,\n- Update your shared email address using the 'Email' field,\n- Finally, change your password by entering the new password twice.",
      question2: "How to add a process?",
      answer2: "To add new processes, go to the Quiz page by clicking on the image below.\nFrom this page, you can choose a process from the available options.\nOnce you have selected a process, you will need to answer questions about your progress in the process (possession of necessary documents, eligibility for process advancement, etc.).\nOnce the question phase is completed, you will be redirected to a page that compiles all the information about the ongoing process, and you can add events related to it in the calendar if necessary.",
      question3: "How to add an event to the calendar?",
      answer3: "To add events related to processes, go to the Calendar page by clicking on the image below.\nFrom the calendar, you can view existing events and add new ones.\nTo do this, simply click on the date on which you want to add an event.\nThen click on the 'Add an Event' button. You will need to provide the time of the event, the process associated with the event from the list of ongoing processes, and finally the step of the process. Finally, click on 'Submit' once all the details are filled in to create the event.",
      question4: "How to delete or modify an event in the calendar?",
      answer4: "To modify or delete events related to processes, go to the Calendar page by clicking on the image below.\nFrom the calendar, you can view existing events and modify or delete them.\nTo do this, simply click on the date for which you want to modify the event.\nThen click on the 'Edit/Delete an Event' button. For modification, you will need to enter the new time or step you want to assign to your event and click the 'Submit' button to save the changes. Alternatively, you can directly click the 'Delete Event' button to delete the event.",
      question5: "I can't find the process I need in the list of available processes. What should I do?",
      answer5: "If you can't find the process you want to launch in the available processes list, you have the option to let us know through the Process Idea page by clicking on the image below.\nProvide the title, description, and content of the desired process, press the 'Submit' button, and we will receive your request. You can also contact us via the contact button at the bottom of this page by sending an email to paperwork_2024@labeip.epitech.eu.",
    },
    home: {
      ascending: "Ascending",
      descending: "Descending",
      newProcessButton: "New Process",
      calendar: "Calendar",
      applied: "Applied",
      left: "Left",
      nothing: "Nothing to Show"
    },
    calendar: {
      calendarLocation:"en-GB",
      calendar: "Calendar",
      addEvent: "Add an Event",
      dailyEvent: "Daily Events",
      editDeleteEvent: "Edit/Delete an Event",
      create: "Create",
      close: "Close",
      submit: "Submit",
      selectTheProcess: "Select the Process",
      selectTheStep: "Select the Step",
      nothingPlanned: "Nothing Planned",
      editDelete: "Edit/Delete",
      deleteEvent: "Delete Event",
    }
  },
  français: {
    quiz: {
      title: "Nouveau questionnaire de procédure",
      question: "Quel type de procédure voulez-vous compléter ?",
      submit: "Soumettre",
      yes: "Oui",
      no: "Non",
    },
    profile: {
      modify: "Modifier le profil",
      noUsername: "Aucun nom d'utilisateur renseigné",
      noEmail: "Aucun email renseigné",
      address: "Adresse",
      noAddress: "Aucune adresse renseignée",
      phonenumber: "Numéro de téléphone",
      noPhonenumber: "Aucun numéro de téléphone renseigné",
      language: "Langue",
      noLanguage: "Aucune langue renseignée",
      age: "Âge",
      noAge: "Aucun âge renseigné",
      process: "Vos procédures actuelles",
      noProcess: "Vous n'avez pas encore de procédure en cours",
    },
    settings: {
      heading1: "Profil",
      username: "Nom d'utilisateur",
      usernamePlaceholder: "Nom d'utilisateur...",
      name: "Nom",
      namePlaceholder: "Nom...",
      firstname: "Prénom",
      firstnamePlaceholder: "Prénom...",
      language: "Langue",
      languagePlaceholder: "Langue...",
      age: "Âge",
      agePlaceholder: "Âge...",
      heading2: "Informations personnelles",
      email: "Email",
      emailPlaceholder: "Email...",
      address: "Adresse",
      addressPlaceholder: "Adresse...",
      phonenumber: "Numéro de téléphone",
      phonenumberPlaceholder: "Numéro de téléphone...",
      heading3: "Sécurité",
      password: "Mot de passe",
      errorPassword: "Le mot de passe doit contenir au moins 4 caractères",
      verifPassword: "Vérification du mot de passe",
      editPassword: "Modifier le mot de passe",
      deleteAccount: "Supprimer le compte",
      changeModalQst: "Êtes-vous sûr de vouloir modifier votre ",
      cancelBtn: "Annuler",
      continueBtn: "Continuer",
      deleteModalQst: "Êtes-vous sûr de vouloir supprimer votre compte ?",
      avatarModalTxt: "Cliquez pour choisir un nouvel avatar :",
      alertMissingToken: "Paramètre token manquant.",
      alertMissingEmail: "Paramètre email manquant.",
      alertUserNotFound: "Utilisateur introuvable.",
      alertUsernameAlreadyUsed: "Nom d'utilisateur déjà utilisé.",
      alertEmailAlreadyUsed: "Email déjà utilisé.",
      alertSystemError: "Erreur système.",
      alertSystemErrorPutNumber: "Erreur système, veuillez entrer un nombre.",
      alertEmptyUsername: "Le nom d'utilisateur ne peut pas être vide.",
      alertUpdateUsername: "Nom d'utilisateur mis à jour !",
      alertEmptyName: "Le nom ne peut pas être vide.",
      alertUpdateName: "Nom mis à jour !",
      alertEmptyFirstname: "Le prénom ne peut pas être vide.",
      alertUpdateFirstname: "Prénom mis à jour !",
      alertEmptyLanguage: "La langue ne peut pas être vide.",
      alertUpdateLanguage: "Langue mise à jour !",
      alertEmptyAge: "L'âge ne peut pas être vide.",
      alertAgeRange: "L'âge doit être compris entre 1 et 200.",
      alertUpdateAge: "Âge mis à jour !",
      alertEmptyEmail: "L'email ne peut pas être vide.",
      alertUpdateEmail: "Email mis à jour !",
      alertEmptyAddress: "L'adresse ne peut pas être vide.",
      alertUpdateAddress: "Adresse mise à jour !",
      alertEmptyPhonenumber: "Le numéro de téléphone ne peut pas être vide.",
      alertUpdatePhonenumber: "Numéro de téléphone mis à jour !",
      alertEmptyPassword: "Le mot de passe ne peut pas être vide.",
      alertUpdatePassword: "Mot de passe mis à jour !",
      alertPasswordLength: "Le mot de passe doit contenir au moins 4 caractères.",
      alertPasswordNotMatch: "Les mots de passe ne correspondent pas.",
      alertDeleteAccount: "Compte supprimé !",
      alertAvatarUpdated: "Avatar mis à jour !",
    },
    processResult: {
      alertUpdate: "Mis à jour avec succès !",
      startNewProcess: "Commencer une nouvelle procédure",
      resultProcess: "Résultat de la procédure pour ",
    },
    header: {
      home: "Accueil",
      profile: "Profil",
      calendar: "Calendrier",
      help: "Aide",
      logout: "Déconnexion",
    },
    processIdea: {
      title: "Titre",
      helperTitle: "Titre du document.",
      errorTitle: "Le titre est requis.",
      description: "Description",
      helperDescription: "Courte description du document.",
      errorDescription: "La description est requise.",
      content: "Contenu",
      helperContent: "Description du document.",
      errorContent: "Le contenu est requis.",
      cancel: "Annuler",
      submit: "Soumettre",
      close: "Fermer",
      continue: "Continuer",
      cancelMessage: "Êtes-vous sûr(e) de vouloir annuler l'idée de procédure ?",
      submitMessage: "Êtes-vous sûr(e) de vouloir soumettre l'idée de procédure ?"
      },
      helpPage: {
        question1: "Comment modifier ses informations personnelles ?",
        answer1: "Afin de modifier ses informations personnelles, rendez-vous sur la page Profile en cliquant sur l'image ci-dessous.\nDepuis cette page, vous pouvez:\n- Modifier votre photo de profil en entrant le lien de l'image de votre choix dans le champs 'Profile picture link',\n- Modifier votre nom d'utilisateur via le champ 'Username',\n- Modifier votre adresse email partagée via le champ 'Email',\n- Et enfin modifier votre mot de passe en entrant deux fois le même nouveau mot de passe.",
        question2: "Comment ajouter une procédure ?",
        answer2: "Afin d'ajouter de nouvelles procédures, rendez-vous sur la page Quiz en cliquant sur l'image ci-dessous.\nDepuis cette page, vous pourrez choisir une procédure parmi toutes celles existantes.\n Une fois la procédure trouvée vous devrez répondre à des questions sur votre avancement dans celle-ci (possession des documents nécéssaires, élégibilité à l'avaancée de la procédure, etc...).\n Une fois la phase de questions terminée, vous serez redirigés vers une page compilant toutes les informations sur la procédure en cours, et vous pourrez ajouter des évènements liés à celle-ci dans le calendrier si nécéssaire.",
        question3: "Comment ajouter un évènement au calendrier ?",
        answer3: "Afin d'ajouter des évènements liés aux procédures, rendez-vous sur la page Calendar en cliquant sur l'image ci-dessous.\n Depuis le calendrier, vous pourrez voir les différents évènements déjà intanciés mais aussi en ajouter.\nPour ce faire, il vous suffit de cliquer sur la date à laquelle vous souhaitez ajouter un évènement.\n Cliquez ensuite sur le bouton 'Add an Event'. Il vous faudra par la suite renseigner l'heure à laquelle votre évènement a lieu ainsi que la procédure liée à l'évènement parmi la liste de procédures en cours et enfin l'étape de celle-ci. Cliquez enfin sur 'Submit' une fois tous les éléments rensignés afin de créer l'évènement.",
        question4: "Comment supprimer ou modifier un évènement au calendrier ?",
        answer4: "Afin de modifier ou de supprimer des évènements liés aux procédures, rendez-vous sur la page Calendar en cliquant sur l'image ci-dessous.\n Depuis le calendrier, vous pourrez voir les différents évènements déjà intanciés mais aussi les modifier ou les supprimer.\nPour ce faire, il vous suffit de cliquer sur la date pour laquelle vous souhaitez modifier l'évènement.\n Cliquez ensuite sur le bouton 'Edit/Delete an Event'. Il vous faudra par la suite, pour le modifier renseigner la nouvelle heure ou la nouvelle étape que vous souhaitez attribuer à votre évènement puis cliquer sur le bouton 'Submit' pour le modifier, ou alors cliquer directement sur le bouton 'Delete Event' pour le supprimer.",
        question5: "Je ne trouve pas la procédure dont j'ai besoin dans la liste des procédures disponibles ?",
        answer5: "Dans le cas où une procédure que vous voulez lancer n'est pas disponible sur notre site, vous avez la possibilité de nous le faire savoir via la page Process Idea en cliquant sur l'image ci-dessous.\n Renseignez alors le titre, la description et le contenu de la procédure voulue, appuyez sur le bouton 'Submit' et nous recevrons votre demande. Vous pouvez aussi nous contacter via le bouton de contact en bas de cette page en nous envoyant un mail à paperwork_2024@labeip.epitech.eu.",
      },
      home: {
        ascending: "Croissant",
        descending: "Décroissant",
        newProcessButton: "Nouvelle Procédure",
        calendar: "Calendrier",
        applied: "Passé",
        left: "Restant",
        nothing: "Rien à afficher"
      },
      calendar: {
        calendarLocation: "fr-FR",
        calendar: "Calendrier",
        addEvent: "Ajouter un évènement",
        dailyEvent: "Évènements quotidiens",
        editDeleteEvent: "Modifier/Supprimer un évènement",
        create: "Créer",
        close: "Fermer",
        submit: "Valider",
        selectTheProcess: "Sélectionner la Procédure",
        selectTheStep: "Sélectionner l'Étape",
        nothingPlanned: "Rien de prévu",
        editDelete: "Modifier/Supprimer",
        deleteEvent: "Supprimer l'évènement",
        }
  }
};

export function getTranslation(locale: string, page: string): TranslationKeys {
  const pageTranslations = translations[locale]?.[page] || translations.français[page];
  return pageTranslations;
}