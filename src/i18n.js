import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

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
    .use(reactI18nextModule) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "fighter",

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;