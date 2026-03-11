/**
 * Russian locale (ru)
 * ⚠️  All strings below are PLACEHOLDER — they duplicate the English text
 * and need to be replaced with proper Russian translations.
 * Search for "TODO_RU:" comments to find strings that still need translation.
 */
import en from './en.js'

const ru = {
  nav: {
    logo: 'Harrigan Academy', // Keep brand name
    whyUs: 'Почему мы',                 // TODO_RU: review
    about: 'О нашей программе',          // TODO_RU: review
    teachers: 'Наши учителя',               // TODO_RU: review
    faq: 'Вопросы и ответы',            // TODO_RU: review
    contact: 'Связаться с нами',            // TODO_RU: review
    langAriaLabel: 'Переключить язык',
  },

  hero: {
    cta: 'Начать обучение',                      // TODO_RU: review
    slides: en.hero.slides, // TODO_RU: replace with Russian text
  },

  features: {
    virtualClasses: 'Живые онлайн \n занятия',      // TODO_RU: review
    internationalTeachers: 'Международные \n учителя',    // TODO_RU: review
    ageRanges: 'Для всех \n возрастов',        // TODO_RU: review
    anytime: 'Учись где \n и когда угодно', // TODO_RU: review
  },

  whyUs: {
    sectionTitle: 'Почему ученики\nлюбят Harrigan Academy', // TODO_RU: review
    cards: en.whyUs.cards, // TODO_RU: replace with Russian text
  },

  about: {
    sectionTitle: 'О нашей программе', // TODO_RU: review
    slides: en.about.slides,           // TODO_RU: replace with Russian text
  },

  testimonials: {
    eyebrow: 'Что говорят родители и ученики',         // TODO_RU: review
    sectionTitle: 'Истории успеха наших учеников',          // TODO_RU: review
    items: en.testimonials.items, // Testimonials stay in original language
  },

  contact: {
    eyebrow: 'Связаться с нами',
    sectionTitle: 'Запишитесь на\nбесплатный урок',    // TODO_RU: review
    subtitle: 'Готовы начать? Напишите нам, и мы запланируем бесплатное пробное занятие.', // TODO_RU
    formTitle: 'Напишите нам',
    formSubtitle: 'Мы ответим в течение 24 часов.',
    labelName: 'Ваше имя',
    placeholderName: 'например, Анна Иванова',
    labelEmail: 'Email',
    placeholderEmail: 'например, anna@email.com',
    labelMessage: 'Ваше сообщение',
    placeholderMessage: 'Расскажите о возрасте ребёнка, уровне или задайте вопрос...',
    submitButton: 'Отправить',
    phoneLabel: 'Телефон',
    emailLabel: 'Email',
  },

  footer: {
    brandDescription: 'Весёлые онлайн-уроки английского для детей и взрослых с опытными международными учителями.', // TODO_RU
    quickLinksLabel: 'Быстрые ссылки',
    getInTouch: 'Связаться с нами',
    writeTo: 'Написать нам',
    copyright: '© 2026 Harrigan Academy. Все права защищены.',
    privacy: 'Политика конфиденциальности',
    terms: 'Условия использования',
    links: {
      whyUs: 'Почему мы',
      about: 'О программе',
      teachers: 'Наши учителя',
      faq: 'Вопросы и ответы',
      contact: 'Связаться с нами',
    },
  },
}

export default ru
