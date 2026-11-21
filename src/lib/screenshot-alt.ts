import type { Locale } from '@/i18n-config';

type ScreenshotLabels = Record<string, Record<string, string>>;

const labels: Record<Locale, ScreenshotLabels> = {
  en: {
    'half-life-rus': {
      Configuration: 'game configuration menu',
      'Hazard Course': 'Hazard Course training section',
      Controls: 'keyboard and controls settings',
      'Touch Options': 'touch control options',
      'Touch Buttons': 'on-screen touch controls',
      Gamepad: 'gamepad settings',
    },
    'blue-shift-rus': {
      'Main Menu': 'main menu',
      Configuration: 'game configuration menu',
      'Touch Buttons': 'on-screen touch controls',
      'Touch Options': 'touch control options',
      Controls: 'keyboard and controls settings',
      'Hazard Course': 'Hazard Course training section',
    },
    'cs-16-rus': {
      'Main Menu': 'main menu',
      Crosshair: 'crosshair settings',
      'Team Selection': 'team selection menu',
      'Terrorist Class Selection': 'terrorist model selection menu',
      'Buy Menu': 'weapon purchase menu',
      'Bot Menu - Behavior': 'bot behavior settings',
      'Bot Menu - Weapon Settings': 'bot weapon settings',
      'CMD Menu': 'command menu',
      'CMD Menu - Advanced Crosshair': 'advanced crosshair settings',
    },
    'tfc-rus': {
      'Main Menu': 'main menu',
      'Message of the Day': 'message of the day screen',
      'Team Selection': 'team selection menu',
      'Scout Description': 'Scout class description',
      'Command Menu': 'command menu',
    },
  },
  ru: {
    'half-life-rus': {
      Configuration: 'меню настроек игры',
      'Hazard Course': 'тренировочный курс Hazard Course',
      Controls: 'настройки клавиатуры и управления',
      'Touch Options': 'настройки сенсорного управления',
      'Touch Buttons': 'экранные сенсорные кнопки',
      Gamepad: 'настройки геймпада',
    },
    'blue-shift-rus': {
      'Main Menu': 'главное меню',
      Configuration: 'меню настроек игры',
      'Touch Buttons': 'экранные сенсорные кнопки',
      'Touch Options': 'настройки сенсорного управления',
      Controls: 'настройки клавиатуры и управления',
      'Hazard Course': 'тренировочный курс Hazard Course',
    },
    'cs-16-rus': {
      'Main Menu': 'главное меню',
      Crosshair: 'настройки прицела',
      'Team Selection': 'меню выбора команды',
      'Terrorist Class Selection': 'меню выбора модели террориста',
      'Buy Menu': 'меню покупки оружия',
      'Bot Menu - Behavior': 'настройки поведения ботов',
      'Bot Menu - Weapon Settings': 'настройки оружия ботов',
      'CMD Menu': 'меню команд',
      'CMD Menu - Advanced Crosshair': 'расширенные настройки прицела',
    },
    'tfc-rus': {
      'Main Menu': 'главное меню',
      'Message of the Day': 'экран приветственного сообщения сервера',
      'Team Selection': 'меню выбора команды',
      'Scout Description': 'описание класса Scout',
      'Command Menu': 'меню команд',
    },
  },
};

export function getScreenshotAlt(
  projectSlug: string,
  hint: string,
  lang: Locale,
  projectTitle: string,
): string {
  const description = labels[lang][projectSlug]?.[hint] ?? hint;
  return `${projectTitle}: ${description}`;
}
