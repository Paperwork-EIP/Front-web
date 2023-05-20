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
    },
  },
  french: {
    quiz: {
      title: "Nouveau questionnaire de procédure",
    },
  }
};

export function getTranslation(locale: string, page: string): TranslationKeys {
  const pageTranslations = translations[locale]?.[page] || translations.french[page];
  return pageTranslations;
}
