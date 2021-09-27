import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationFIGHTER from './locales/fighter/translation.json';
import translationWORKER from './locales/worker/translation.json';

// the translations
const resources = {
    fighter: {
        translation: translationFIGHTER
    },
    worker: {
        translation: translationWORKER
    }
};
i18n
    .use(initReactI18next) // bind react-i18next to the instance
    .init({
        fallbackLng: 'fighter',
        debug: true,
        resources: resources,
        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        // react i18next special options (optional)
        // override if needed - omit if ok with defaults
        react: {
          useSuspense: true,
        }
    });

export default i18n;