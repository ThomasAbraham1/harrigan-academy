/**
 * Japanese locale (ja)
 * ⚠️  All strings below are PLACEHOLDER — they duplicate the English text
 * and need to be replaced with proper Japanese translations.
 * Search for "TODO_JA:" comments to find strings that still need translation.
 */
import en from './en.js'

const ja = {
  nav: {
    logo:          'Harrigan Academy', // Keep brand name
    whyUs:         '選ばれる理由',              // TODO_JA: review
    about:         'プログラムについて',          // TODO_JA: review
    teachers:      '講師紹介',                   // TODO_JA: review
    faq:           'よくある質問',               // TODO_JA: review
    contact:       'お問い合わせ',               // TODO_JA: review
    langAriaLabel: '言語を切り替える',
  },

  hero: {
    cta: '今すぐ始める',                         // TODO_JA: review
    slides: en.hero.slides, // TODO_JA: replace with Japanese text
  },

  features: {
    virtualClasses:        'ライブ \n オンライン授業',    // TODO_JA: review
    internationalTeachers: '国際的な \n 講師陣',          // TODO_JA: review
    ageRanges:             '全年齢 \n 対応',              // TODO_JA: review
    anytime:               'いつでも \n どこでも学べる',   // TODO_JA: review
  },

  whyUs: en.whyUs, // TODO_JA: translate entire section together

  about: en.about, // TODO_JA: translate entire section together

  testimonials: {
    eyebrow:      '保護者と生徒の声',
    sectionTitle: '生徒たちの成功ストーリー',
    items: en.testimonials.items, // Testimonials always stay in original language
  },

  contact: {
    eyebrow:          'お問い合わせ',
    sectionTitle:     '無料体験レッスンを\n予約する',       // TODO_JA: review
    subtitle:         'ご興味をお持ちですか？メッセージをお送りください。無料体験レッスンをご案内します。', // TODO_JA
    formTitle:        'メッセージを送る',
    formSubtitle:     '24時間以内にご返信いたします。',
    labelName:        'お名前',
    placeholderName:  '例：山田 花子',
    labelEmail:       'メールアドレス',
    placeholderEmail: '例：hanako@email.com',
    labelMessage:     'メッセージ',
    placeholderMessage: 'お子さまの年齢、レベル、またはご質問をお書きください...',
    submitButton:     '送信する',
    phoneLabel:       '電話番号',
    emailLabel:       'メール',
  },

  footer: {
    brandDescription: '子どもから大人まで、経験豊富な国際的講師によるオンライン英語レッスン。', // TODO_JA
    quickLinksLabel:  'クイックリンク',
    getInTouch:       'お問い合わせ',
    writeTo:          'メールで連絡',
    copyright:        '© 2026 Harrigan Academy. 全著作権所有。',
    privacy:          'プライバシーポリシー',
    terms:            '利用規約',
    links: {
      whyUs:    '選ばれる理由',
      about:    'プログラムについて',
      teachers: '講師紹介',
      faq:      'よくある質問',
      contact:  'お問い合わせ',
    },
  },
}

export default ja
