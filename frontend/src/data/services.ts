export type ServiceId =
  | 'mixing'
  | 'private_channel'
  | 'month_engineer'
  | 'course'

export interface Tariff {
  id: string
  name: string
  label: string
  price: number
  oldPrice?: number
  badge?: string
  deadline: string
  description: string
  paymentFlow: string[]
  contact: string
  slots?: number
}

export interface Service {
  id: ServiceId
  slug: string
  title: string
  subtitle: string
  icon: string
  tag: string
  price: number
  oldPrice?: number
  slots?: number
  description: string
  tariffs?: Tariff[]
}

export const MIXING_TARIFFS: Tariff[] = [
  {
    id: 'basic',
    name: 'БАЗОВОЕ',
    label: 'BASIC.exe',
    price: 1000,
    oldPrice: 1500,
    deadline: '2 дня',
    description:
      'Сведение и мастеринг трека до состояния приятного звучания. Без саунд-дизайна, автоматизаций и правок.',
    paymentFlow: [
      'Кидаешь дороги / проект (чтобы я не искал что основа, что бэки)',
      'Свожу часть трека и кидаю тебе предпросмотр',
      'Нравится — платишь всю сумму, я доделываю',
      'Возврат средств не возможен',
    ],
    contact: '@rizzie044',
  },
  {
    id: 'advanced',
    name: 'ПРОДВИНУТОЕ',
    label: 'ADVANCED.exe',
    price: 3500,
    deadline: '3–7 дней',
    description:
      'Сведение и мастеринг трека до состояния звука по вашим предпочтениям, с выбонами и автоматизациями.',
    paymentFlow: [
      'Кидаешь дороги / проект',
      'Свожу часть трека и кидаю тебе предпросмотр',
      'Нравится — платишь всю сумму, я доделываю',
      'Возврат средств не возможен',
    ],
    contact: '@rizzie044',
  },
  {
    id: 'advanced_24h',
    name: '(24ч⚡) ПРОДВИНУТОЕ',
    label: 'ADVANCED_24H.exe',
    price: 5000,
    badge: '24H',
    deadline: '24 часа',
    description:
      'Сведение и мастеринг по твоим предпочтениям с выбонами и автоматизациями. Результат — в течение 24 часов.',
    paymentFlow: [
      'Кидаешь дороги / проект',
      'Свожу часть трека и кидаю тебе предпросмотр',
      'Нравится — платишь всю сумму, я доделываю',
      'Возврат средств не возможен',
    ],
    contact: '@rizzie044',
  },
  {
    id: 'experimental',
    name: '(EXPERIMENTAL)',
    label: 'EXPERIMENTAL.exe',
    price: 8000,
    badge: 'EXPERIMENTAL',
    deadline: 'зависит от объёма',
    description:
      'Сведение чисто по моему виденью, слуху и задумке. Все выбоны — мои. Для тех, кто ищет что-то новое и необычное.',
    paymentFlow: [
      'Кидаешь дороги (НЕ ПРОЕКТ)',
      'Предоплата 100%',
      'Возврат не возможен',
    ],
    contact: '@rizzie044',
  },
  {
    id: 'economy',
    name: '(ECONOMY −42%)',
    label: 'ECONOMY_PACK.exe',
    price: 20000,
    badge: '−42%',
    deadline: '2 месяца',
    description:
      'Пачка до 10 треков за 2 месяца со скидкой 42%. Постоянная связь, можно смотреть процесс в Discord.',
    paymentFlow: [
      'Платишь 20 000₽ за раз',
      'Скидываешь треки по одному — до 10 штук за 2 месяца',
      '10 треков по отдельности стоят 35 000₽ (выгода 42%)',
      'Постоянная связь, можно наблюдать процесс в Discord',
      'Возврат средств не возможен',
    ],
    contact: '@rizzie044',
  },
]

export const SERVICES: Service[] = [
  {
    id: 'mixing',
    slug: 'mixing',
    title: 'СВЕДЕНИЕ / МАСТЕРИНГ',
    subtitle: 'MIXING & MASTERING',
    icon: '🎛',
    tag: 'CORE_SERVICE',
    price: 1000,
    description: 'Профессиональное сведение и мастеринг твоего трека. 5 тарифов — от базового до эксперимента.',
    tariffs: MIXING_TARIFFS,
  },
  {
    id: 'private_channel',
    slug: 'private-channel',
    title: 'ПРИВАТ КАНАЛ',
    subtitle: 'PRIVATE.channel',
    icon: '🔒',
    tag: 'ACCESS',
    price: 1500,
    oldPrice: 2000,
    slots: 3,
    description: 'Доступ к закрытому каналу с пресетами, проектами и материалами. Только 3 места.',
  },
  {
    id: 'month_engineer',
    slug: 'month-engineer',
    title: 'ЗВУКАРЬ НА МЕСЯЦ',
    subtitle: 'ENGINEER_AS_A_SERVICE',
    icon: '📡',
    tag: 'SUBSCRIPTION',
    price: 40000,
    oldPrice: 60000,
    description:
      'Я становлюсь твоим личным звукарём на месяц. До 30 треков, неограниченные правки, присутствие в Discord.',
  },
  {
    id: 'course',
    slug: 'course',
    title: 'ИНДИВИДУАЛЬНЫЙ КУРС',
    subtitle: 'SOUND.DESIGN_COURSE',
    icon: '📼',
    tag: 'EDUCATION',
    price: 12000,
    slots: 3,
    description:
      'Онлайн-обучение сведению, мастерингу и саунд-дизайну. Всё от плагинов до своего звука.',
  },
]

export const COURSE_INCLUDES = [
  'Онлайн уроки в Discord',
  'Вопросы — Ответы',
  'Выдам плагины',
  'Все аспекты сведения и мастеринга',
  'Саунд дизайн и автоматизации',
  'Доступ к приватке с материалами',
  'Доступ к шаблону проекта',
  'Около недели обучения в среднем',
]

export const MONTH_ENGINEER_INCLUDES = [
  'До 30 треков за месяц',
  'Неограниченное кол-во правок',
  'Присутствие в Discord во время работы',
  'Постоянная связь',
]
