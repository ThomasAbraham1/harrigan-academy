/**
 * English locale — the source of truth for all UI text.
 * When adding new strings, put them here first, then add
 * matching keys to ru.js and ja.js.
 */
const en = {
  // ── Navbar ──────────────────────────────────────────────
  nav: {
    logo:        'Harrigan Academy',
    whyUs:       'Why Us',
    about:       'About Our Program',
    teachers:    'Our Teachers',
    faq:         'FAQ',
    contact:     'Contact Us',
    langAriaLabel: 'Switch language',
  },

  // ── Hero Section ─────────────────────────────────────────
  hero: {
    cta: 'Start Learning Today',
    slides: [
      {
        title:    'Fun Online Classes to improve your English!',
        subtitle: 'With experienced international teachers who care about your progress.',
      },
      {
        title:    'Learning That\nFeels Natural',
        subtitle: 'Flexible classes that fit easily into your daily routine',
      },
      {
        title:    'Personal 1:1 Lessons\ndesigned just for you',
        subtitle: 'Learn at your own pace with a teacher\nfocused entirely on your progress',
      },
      {
        title:    'Learn Together\nin Small Groups',
        subtitle: 'Interactive classes with small batches of 5–6 students',
      },
      {
        title:    'Teachers from\nAround the World',
        subtitle: 'Experienced educators who bring global and multilingual perspective',
      },
    ],
  },

  // ── Features Bar ─────────────────────────────────────────
  features: {
    virtualClasses:     'Live Virtual \n Classes',
    internationalTeachers: 'International \n Teachers',
    ageRanges:          'For all Age \n Ranges',
    anytime:            'Learn Anytime \n Anywhere',
  },

  // ── Why Us Section ───────────────────────────────────────
  whyUs: {
    sectionTitle: 'Why Students\nlove Harrigan Academy',
    cards: [
      {
        title:       'Learn with Support',
        description: 'We use gestures, visuals, & step-by-step prompts so students learn naturally.',
      },
      {
        title:       'Speaking-first Routine',
        description: 'Students repeat, respond and role-play to build confident speaking skills.',
      },
      {
        title:       'Play-based Learning',
        description: 'Interactive stories, games, songs, and conversations make learning fun!',
      },
    ],
  },

  // ── About Section ────────────────────────────────────────
  about: {
    sectionTitle: 'About our Program',
    slides: [
      {
        title: 'Full Immersion',
        body:  'Our teachers speak only English, so children learn to think and speak while immersed in an English-language learning environment. This helps them concentrate and achieve better results.',
      },
      {
        title: 'Multi-culture Exposure',
        body:  'All of our teachers speak several languages and are based around the world. They all grew up in multicultural environments, making it interesting and easy to find common ground.',
      },
      {
        title: 'Teaching Methodology',
        body:  'We use a natural language acquisition method. Through frequent repetition, we gradually increase the complexity of the material. Our students are not afraid to use English.',
      },
    ],
  },

  // ── Testimonials Section ──────────────────────────────────
  testimonials: {
    eyebrow:      'What Parents & Students Say',
    sectionTitle: 'Success Stories From Our Students',
    items: [
      { name: 'Sabina',               role: 'Mother of Camilla',                     quote: 'My daughter enjoys the lessons very much and looks forward to every class. The teachers are patient and encouraging, and I can already see her becoming more confident when speaking English.' },
      { name: 'Julia',                role: 'Mother of Samuel',                      quote: 'The classes have helped my son improve his English skills and feel more comfortable speaking. The lessons are engaging and well organized, and the teachers know how to keep children motivated.' },
      { name: 'Elia Gunkin',          role: 'Father of Pasha',                       quote: "We are very happy with the results. My son has become more confident in English and participates actively in class. The teachers are professional, supportive, and genuinely care about their students' progress." },
      { name: "Milana's Father",      role: 'Parent',                                quote: 'Mr. John and his wife have been teaching English to my daughter Milana since 2021. Milana really enjoys the lessons. I must say her spoken English has improved significantly during this time. I highly recommend English lessons with John and his wife. 🔥' },
      { name: 'Alexandra Kryusova',   role: 'Irkutsk, Russia — English Teacher',     quote: "This was my first time communicating with a foreign teacher, and at first I felt unsure of my abilities and wondered if I would be able to keep up. But after the very first lesson, those doubts disappeared. I felt a surge of confidence and motivation to improve.\n\nI am very grateful to Mr. John, who truly inspires his students and helps them believe in their abilities. I especially appreciate how he highlights each student's strengths during reflection, which shows how attentive he is to his students. I always look forward to our lessons." },
      { name: 'Elena Povarissova',    role: 'English Teacher — 30+ Years Experience', quote: "As a teacher with more than 30 years of experience, I believe that both students and teachers are always learning and improving. Lessons with Mr. John are a wonderful opportunity to develop conversational English while discussing many topics, including teaching methods, in a friendly and supportive atmosphere.\n\nWith his extensive experience working with both adults and children, as well as his ability as a polyglot, I am confident that anyone who joins his classes will greatly benefit from his guidance." },
      { name: 'Denis and Elena',      role: 'Students',                              quote: "My husband and I are studying with John. My husband has become much more confident in his English — he's amazed at how he's started using more complex phrases and words in class and with other people.\n\nI'm an English teacher myself and I'm studying with John to improve my spoken English. John is always very supportive, gives lots of praise, and takes our interests into account when communicating." },
      { name: 'Marina Mafikova',      role: 'Parent',                                quote: "In today's world, I believe it is vital to communicate with people from different cultures and countries. It's especially important to give children the opportunity to learn foreign languages from an early age, when learning comes most naturally.\n\nFor our family, a real help has been the unique teaching methods of John Harrigan and his wife Keiko. Their course helps children quickly develop spoken language skills through conversations, games, songs, and stories. The friendly atmosphere makes every lesson feel like a fun adventure." },
    ],
  },

  // ── Contact Section ────────────────────────────────────────
  contact: {
    eyebrow:       'Get in touch',
    sectionTitle:  'Book a Free\nTrial Lesson',
    subtitle:      "Ready to start? Send us a message and we'll schedule your free trial class.",
    formTitle:     'Send us a message',
    formSubtitle:  "We'll get back to you within 24 hours.",
    labelName:     'Your Name',
    placeholderName: 'e.g. Anna Ivanova',
    labelEmail:    'Email Address',
    placeholderEmail: 'e.g. anna@email.com',
    labelMessage:  'Your Message',
    placeholderMessage: "Tell us about your child's age, current level, or any questions you have...",
    submitButton:  'Send Message',
    phoneLabel:    'Phone',
    emailLabel:    'Email',
  },

  // ── Footer ─────────────────────────────────────────────────
  footer: {
    brandDescription: 'Fun online English classes for children and adults — with experienced international teachers who care about your progress.',
    quickLinksLabel:  'Quick Links',
    getInTouch:       'Get in Touch',
    writeTo:          'Write To Us',
    copyright:        '© 2026 Harrigan Academy. All rights reserved.',
    privacy:          'Privacy Policy',
    terms:            'Terms of Service',
    links: {
      whyUs:    'Why Us',
      about:    'About the Program',
      teachers: 'Our Teachers',
      faq:      'FAQ',
      contact:  'Contact Us',
    },
  },

  // ── Statement Banner ───────────────────────────────────────
  statementBanner: {
    heading: 'Focused Attention. Faster Progress.',
  },
}

export default en
