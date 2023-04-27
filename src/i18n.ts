import { createI18n } from 'vue-i18n';
import it from './locales/it.json';

//for lazy loading - https://vue-i18n.intlify.dev/guide/advanced/lazy.html

const messages = {
    en: {},
    it: it,
};

const i18n = createI18n({
    legacy: false,
    locale: "it",
    fallbackLocale: "it",
    globalInjection: true,
    messages
});

export default i18n;
