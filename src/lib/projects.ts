
import type { Locale } from '@/i18n-config';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  downloadUrl: string;
  screenshots: {
    src: string;
    alt: string;
    hint: string;
  }[];
  installation?: string[];
  changelog?: {
    date: string;
    changes: string[];
  }[];
  addons?: {
    title: string;
    description: string;
    downloadUrl: string;
  }[];
}

type ProjectBase = Omit<Project, 'title' | 'shortDescription' | 'description' | 'changelog' | 'installation' | 'addons'> & {
  screenshots: {
    src: string;
    alt: string;
    hint: string;
  }[];
  changelog?: ({ date: string; changes: { [key in Locale]: string[] } })[];
  installation?: { [key in Locale]: string[] };
  addons?: (Omit<NonNullable<Project['addons']>[0], 'title' | 'description'> & {
    title: { [key in Locale]: string };
    description: { [key in Locale]: string };
  })[];
};

const projectsBase: ProjectBase[] = [
  {
    slug: 'half-life-rus',
    downloadUrl: 'https://disk.yandex.ru/d/IEPicAW3mQQSrw',
    screenshots: [
      { src: '/images/projects/half-life-rus/HLRus_1.jpg', alt: 'Half-Life screenshot 1', hint: 'Configuration' },
      { src: '/images/projects/half-life-rus/HLRus_2.jpg', alt: 'Half-Life screenshot 2', hint: 'Hazard Course' },
      { src: '/images/projects/half-life-rus/HLRus_3.jpg', alt: 'Half-Life screenshot 3', hint: 'Controls' },
      { src: '/images/projects/half-life-rus/HLRus_4.jpg', alt: 'Half-Life screenshot 4', hint: 'Touch Options' },
      { src: '/images/projects/half-life-rus/HLRus_5.jpg', alt: 'Half-Life screenshot 5', hint: 'Touch Buttons' },
      { src: '/images/projects/half-life-rus/HLRus_6.jpg', alt: 'Half-Life screenshot 6', hint: 'Gamepad' },
    ],
    installation: {
      en: [
        "For Xash3D FWGS 0.21 and newer:",
        "Place the HLRusFull.pk3 file into the 'valve/custom' directory without extracting its contents.",
        "",
        "For Xash3D FWGS 0.19.x and older:",
        "Extract the contents of the pk3 archive into the 'valve/custom' directory."
      ],
      ru: [
          "Для Xash3D FWGS 0.21 и новее:",
          "Положить файл HLRusFull.pk3 в папку valve/custom не извлекая содержимое.",
          "",
          "Для Xash3D FWGS 0.19.x и ниже:",
          "Извлечь содержимое pk3 архива в папку valve/custom."
      ]
    },
    changelog: [
      {
        date: '2025-10-02',
        changes: {
          en: ['Fixes in the MainUI translation', 'Removed MainUI localization strings for the old engine (Xash3D FWGS 0.19.x)', 'Added translation for MainTUI (text-based interface)'],
          ru: ['Исправления в переводе MainUI', 'Удалены строки локализации MainUI для старого движка (Xash3D FWGS 0.19.x)', 'Добавлен перевод MainTUI (текстовый интерфейс)']
        }
      },
      {
        date: '2025-08-20',
        changes: {
          en: ['Added translation for new lines', 'Added new images with translated menu buttons - "Add to Favorites/Remove from Favorites"', 'Updated translation for gameui_russian.txt and valve_russian.txt to support the latest Half-Life 25th anniversary update.'],
          ru: ['Добавлен перевод новых строк', 'Добавлены новые изображения с переводом кнопок меню - "Добавить в избранные/Убрать из избранных"', 'Обновлён перевод для gameui_russian.txt и valve_russian.txt с поддержкой последнего обновления Half-Life в честь 25-летия игры.']
        }
      },
      {
        date: '2023-07-31',
        changes: {
          en: ['Text translation fixes, added translation for new lines for Xash3D FWGS 0.20.x/0.21.x'],
          ru: ['Исправление текстового перевода, добавлен перевод новых строк для Xash3D FWGS 0.20.x/0.21.x']
        }
      },
      {
        date: '2021-07-30',
        changes: {
          en: ['More minor text corrections', 'Shortened or rephrased text to fit in menus (in character, video, and sound settings)', 'Added translation for the new "Exit Game" line in gameui_russian.txt which appeared in the Half-Life 1 build 8684 update from August 3, 2020, on Steam', 'Updated images with WON/Xash3D menu translation, also added images in TGA format to support the beta version of Xash3D FWGS 0.20.1'],
          ru: ['Снова мелкие исправления текста', 'Укорачивание или переиначивание текста чтобы влезал в меню (в настройках персонажа, видео и звука)', 'Добавлен перевод новой строчки "Покинуть игру" в gameui_russian.txt которая появилась в обновлении Half-Life 1 build 8684 от 3 августа 2020 года в Steam', 'Обновлены картинки с переводом WON/Xash3D меню, также добавил картинки в TGA формате для поддержки бета версии Xash3D FWGS 0.20.1']
        }
      },
      {
        date: '2020-07-18',
        changes: {
          en: ['Added some missing lines in MainUI, translation fixes, moved config to userconfig.d folder (to avoid replacing user\'s userconfig.cfg)'],
          ru: ['Добавлены некоторые отсутствующие строчки в MainUI, исправления перевода, перенос конфига в папку userconfig.d (чтобы не заменять пользовательский userconfig.cfg)']
        }
      },
      {
        date: '2020-05-31',
        changes: {
          en: ['Added MainUI translation (explanatory text next to menu buttons and pop-up messages)', 'Minor text adjustments'],
          ru: ['Добавлен перевод MainUI (пояснительный текст возле кнопок меню и всплывающие сообщения)', 'Мелкая корректировка текста']
        }
      },
      {
        date: '2019-05-17',
        changes: {
          en: ['Added main menu translation and HD voice-over for H.E.V. suit'],
          ru: ['Добавлен перевод главного меню и HD озвучка H.E.V костюма']
        }
      },
      {
        date: '2018-07-15',
        changes: {
          en: ['First release of the localization'],
          ru: ['Первый релиз русификатора']
        }
      }
    ],
    addons: [
      {
        downloadUrl: 'https://disk.yandex.ru/d/xri8dtho8KpzeQ',
        title: {
          en: 'Hi-Res Voices',
          ru: 'Hi-Res озвучка'
        },
        description: {
          en: 'High-quality voiceovers (16 bit 44,1 KHz) for Human Grunts and Black Mesa announcements.',
          ru: 'Высококачественная озвучка (16 бит 44,1 КГц) для военного отряда HECU и оповещений Чёрной Мезы.'
        }
      }
    ]
  },
  {
    slug: 'blue-shift-rus',
    downloadUrl: 'https://disk.yandex.ru/d/j8bWc1SM0etb-g',
    screenshots: [
    { src: '/images/projects/blue-shift-rus/BSRus_1.png', alt: 'Blue Shift screenshot 1', hint: 'Main Menu' },
    { src: '/images/projects/blue-shift-rus/BSRus_2.png', alt: 'Blue Shift screenshot 2', hint: 'Configuration' },
    { src: '/images/projects/blue-shift-rus/BSRus_3.png', alt: 'Blue Shift screenshot 3', hint: 'Touch Buttons' },
    { src: '/images/projects/blue-shift-rus/BSRus_4.png', alt: 'Blue Shift screenshot 4', hint: 'Touch Options' },
    { src: '/images/projects/blue-shift-rus/BSRus_5.png', alt: 'Blue Shift screenshot 5', hint: 'Controls' },
    { src: '/images/projects/blue-shift-rus/BSRus_6.png', alt: 'Blue Shift screenshot 6', hint: 'Hazard Course' },
    ],
    installation: {
      en: ["Place the BSRusFull.pk3 file into the 'bshift/custom' directory."],
      ru: ["Положите файл BSRusFull.pk3 в папку bshift/custom."]
    },
    changelog: [
      {
        date: '2025-10-13',
        changes: {
          en: [
            'Renamed the audio file ba_canal_death1.wav to ba_canal_wound1.wav, as instead of Barney\'s death moans and cries, the line about a leg injury was played',
            'Fixes in the MainUI translation',
            'Removed MainUI localization strings for the old engine (Xash3D FWGS 0.19.x)',
            'Translated new strings for MainTUI'
          ],
          ru: [
            'Переименован аудиофайл ba_canal_death1.wav в ba_canal_wound1.wav, так как вместо предсмертных стонов и криков Барни воспроизводилась реплика о ранении ноги',
            'Исправления в переводе MainUI',
            'Удалены строки локализации MainUI для старого движка (Xash3D FWGS 0.19.x)',
            'Переведены новые строки для MainTUI'
          ]
        }
      },
      {
        date: '2025-08-27',
        changes: {
          en: [
            'Replaced an incorrect Otis phrase in sentences.txt with another one made for Blue Shift. The same phrase can be translated into Russian differently depending on the context.',
            'Added mainui.cfg which enables the Russian language (cvar ui_language russian). Now the menu translation should definitely work in a freshly installed game where the default language was English.'
          ],
          ru: [
            'Заменена неверная фраза Отиса в sentences.txt на другую, сделанную для Blue Shift. Одна и та же фраза, может переводится на русский по разному в зависимости от контекста.',
            'Добавлен mainui.cfg который включает русский язык (квар ui_language russian). Теперь в меню точно должен работать перевод на русский язык на свежеустановленной игре, где по умолчанию был английский язык.'
          ]
        }
      },
      {
        date: '2025-08-26',
        changes: {
          en: ['First release of the localization.'],
          ru: ['Первый релиз русификатора.']
        }
      }
    ]
  },
  {
    slug: 'cs-16-rus',
    downloadUrl: 'https://disk.yandex.ru/d/m_rSjtOa4nYq-A',
    screenshots: [
    { src: '/images/projects/cs-16-rus/CSRus_1.png', alt: 'CS 1.6 screenshot 1', hint: 'Main Menu' },
    { src: '/images/projects/cs-16-rus/CSRus_2.png', alt: 'CS 1.6 screenshot 2', hint: 'Crosshair' },
    { src: '/images/projects/cs-16-rus/CSRus_3.png', alt: 'CS 1.6 screenshot 3', hint: 'Team Selection' },
    { src: '/images/projects/cs-16-rus/CSRus_4.png', alt: 'CS 1.6 screenshot 4', hint: 'Terrorist Class Selection' },
    { src: '/images/projects/cs-16-rus/CSRus_5.png', alt: 'CS 1.6 screenshot 5', hint: 'Buy Menu' },
    { src: '/images/projects/cs-16-rus/CSRus_6.png', alt: 'CS 1.6 screenshot 6', hint: 'Bot Menu - Behavior' },
    { src: '/images/projects/cs-16-rus/CSRus_7.png', alt: 'CS 1.6 screenshot 7', hint: 'Bot Menu - Weapon Settings' },
    { src: '/images/projects/cs-16-rus/CSRus_8.png', alt: 'CS 1.6 screenshot 8', hint: 'CMD Menu' },
    { src: '/images/projects/cs-16-rus/CSRus_9.png', alt: 'CS 1.6 screenshot 9', hint: 'CMD Menu - Advanced Crosshair' },
    ],
    installation: {
      en: [
        "Counter-Strike 1.6 Russian Localization:",
        "Place the CSRusFull.pk3 file into the 'cstrike/custom' directory.",
        "",
        "Addon with bot chatter and nicknames by BoBa_KoMaTo3HuK:",
        "Place the Reallite_Bot_Chatter_and_Nicknames.pk3 file into the 'cstrike/custom' directory."
      ],
      ru: [
        "Русификатор Counter-Strike 1.6:",
        "Положите файл CSRusFull.pk3 в папку cstrike/custom.",
        "",
        "Дополнение с озвучкой ботов и никнеймами от BoBa_KoMaTo3HuK:",
        "Положите файл Reallite_Bot_Chatter_and_Nicknames.pk3 в папку cstrike/custom."
      ]
    },
    changelog: [
      {
        date: '2025-12-16',
        changes: {
          en: [
            'The defuse kit in the equipment purchase menu is now grayed out on maps that do not belong to the bomb plant/defuse scenario.',
            'Fixed text overlapping in the radio selector.',
            'Added translation of the DM Menu for the Lemita Project server.',
            'Completely redone the translation from scratch for files such as cstrike_english.txt, titles.txt, and map description files in the maps folder.',
            'Minor translation fixes in valve_russian.txt.'
          ],
          ru: [
            'Пункт с набором сапёра в меню покупки снаряжения на картах, которые не относятся к сценарию установки/обезвреживания бомбы, теперь не активен для покупки.',
            'Исправлены наложения текста в радиоселекторе.',
            'Добавлен перевод DM Menu для сервера Lemita Project.',
            'Полностью переделан перевод с нуля таких файлов, как cstrike_english.txt, titles.txt и файлов описания карт в папке maps.',
            'Мелкие исправления перевода в valve_russian.txt.'
          ],
        }
      },
      {
        date: '2025-08-11',
        changes: {
          en: [
            'Added chatter.cfg for YaPB to the voice-over archive by BoBa_KoMaTo3HuK.',
            'Disabled sniper-related phrases for ZBot in the BoBa_KoMaTo3HuK voice archive, as they are missing, to prevent bots from using a different voice for sniper reports.',
            'Translated new strings from the latest version of CS16Client.',
          ],
          ru: [
            'Добавлен chatter.cfg для YaPB в архив с озвучкой от BoBa_KoMaTo3HuK.',
            'Отключены фразы о снайпере у ZBot в архиве озвучкой от BoBa_KoMaTo3HuK, так как там их нет, чтобы боты не сообщали о снайпере с помощью другой озвучки.',
            'Переведены новые строки с последней версии CS16Client.',
          ],
        }
      },
      {
        date: '2025-07-20',
        changes: {
          en: [
            'The localization is now in a pk3 archive (supported only on Xash3D FWGS 0.21).',
            'Updated main menu item images with fonts and effects close to the original.',
            'Translated updated touch menus for weapon purchase, team change, cmd menu, and bot menu.',
            'Bot voice-over by BoBa_KoMaTo3HuK is now downloaded and installed separately from the localization (Russian bot voiceover is present here, but different).',
            'Removed files not related to the localization - .nav files for ZBot, instructions for ZBot, etc.',
            'Completed full translation of the main menu, including hint text (supported only on the new engine).',
          ],
          ru: [
            'Русификатор теперь лежит в pk3 архиве (поддерживается только на Xash3D FWGS 0.21).',
            'Обновлены картинки пунктов главного меню с шрифтом и эффектами близкими к оригиналу.',
            'Переведены обновлённые тач меню покупки оружия, смены команды, cmd menu, bot menu.',
            'Озвучка ботов от BoBa_KoMaTo3HuK теперь скачивается и устанавливается отдельно от русификатора (русская озвучка ботов здесь присутствует, но другая).',
            'Удалены файлы не относящиеся к русификатору - .nav файлы ZBot, инструкции для ZBot и т.д.',
            'Выполнен полный перевод главного меню, включая текст подсказок (поддерживается только на новом движке).',
          ],
        }
      },
      {
        date: '2022-10-18',
        changes: {
          en: [
            'Localization files moved to the custom folder to avoid replacing original game files.',
            'Added utf-8_charset.cfg config in the custom/userconfig.d folder to enable UTF-8 encoding in chat and HUD to fix garbled text in Russian menus (console commands from recommendations are no longer needed).',
            'Full translation of menu images (gfx/shell) from scratch, now menu headers are also in Russian.',
            'Full translation from scratch with corrected errors for team selection/weapon purchase/cmd/bot menu.',
            'Fixed non-functional "Himodels" (High quality models) and "Minmodels" (Minimum models) buttons, as in the previous localization version from another author they were written as console commands a not cvars.',
            'Fixed issues in the weapon purchase menu:',
            'You can now buy the MAC-10 on the terrorist team.',
            'Fixed incorrect pistol name from Dual Elites to ES Five-Seven in the special forces store.',
            'Fixed issue with the interrupted "Tactical Shield" line in the special forces equipment store.',
            'Now in the store are displayed the correct characteristics of the weapon. For example earlier was written weapon weight with empty magazine, but in the store it was specified as if it was weighed with the full one. It was an error in the weapon purchase menu in CS16Client, even on the English language. Made as it is in the original PC version of Counter-Strike 1.6. (Apparently it was an error by the author of the original purchase menu, he simply copied and pasted one and the same text without editing).',
          ],
          ru: [
            'Файлы русификатора перемещены в папку custom чтобы не заменять оригинальные файлы игры.',
            'Добавлен конфиг utf-8_charset.cfg в папке custom/userconfig.d для включения кодировки UTF-8 в чате и HUD чтобы исправить крякозябры в текстовых меню на русском языке (консольные команды из рекомендаций теперь вводить не надо).',
            'Полный перевод картинок в меню (gfx/shell) с нуля, теперь заголовки в меню тоже на русском языке.',
            'Полный перевод с нуля с исправленными ошибками для меню выбора команд/покупки оружия/cmd/bot menu.',
            'Исправлены недействующие кнопки "Himodels" (Модели, выс. качество) и "Minmodels" (Минимум моделей), так как в предыдущей версии русификатора от другого автора они были записаны как консольные команды а не квары.',
            'Исправлены проблемы в меню покупки оружия:',
            'Теперь вы можете покупать MAC-10 в команде террористов.',
            'Исправлено неверное название пистолета Dual Elites на ES Five-Seven в магазине у спецназовцев.',
            'Исправлена проблема с прерывающейся строкой "Тактический щит" в магазине экипировки у спецназовцев.',
            'Теперь в магазине отображаются верные характеристики оружия. Например раньше был написан вес оружия с пустым магазином, но в магазине он был указан как будто он был взвешен с полным магазином. Это была ошибка в меню покупки оружия в CS16Client, даже на английском языке. Сделал так как есть в оригинальной ПК версии Counter-Strike 1.6. (Видимо это была ошибка автора оригинального меню закупки, он тупо копировал и вставлял один и тот же текст без редактирования).',
          ],
        }
      },
      {
        date: '2018-07-10',
        changes: {
          en: ['First release of the localization.'],
          ru: ['Первый выпуск русификатора.'],
        }
      },
    ],
    addons: [
      {
        downloadUrl: 'https://disk.yandex.ru/d/Y2hTD3HPzqkcVQ',
        title: {
          en: 'Bot Voiceover by BoBa_KoMaTo3HuK',
          ru: 'Озвучка ботов от BoBa_KoMaTo3HuK'
        },
        description: {
          en: 'Bot voiceover and nicknames by BoBa_KoMaTo3HuK from Reallite Labs. Replaces the built-in bot voiceover from the localization.',
          ru: 'Озвучка и никнеймы ботов от BoBa_KoMaTo3HuK из Reallite Labs. Заменяет встроенную в русификатор озвучку ботов.'
        }
      }
    ]
  },
  {
    slug: 'tfc-rus',
    downloadUrl: 'https://github.com/Vladislav4KZ/tfc-russian/releases/download/latest/TFCRusFull.pk3',
    screenshots: [
    { src: '/images/projects/tfc-rus/TFCRus_1.png', alt: 'TFC screenshot 1', hint: 'Main Menu' },
    { src: '/images/projects/tfc-rus/TFCRus_2.png', alt: 'TFC screenshot 2', hint: 'Message of the Day' },
    { src: '/images/projects/tfc-rus/TFCRus_3.png', alt: 'TFC screenshot 3', hint: 'Team Selection' },
    { src: '/images/projects/tfc-rus/TFCRus_4.png', alt: 'TFC screenshot 4', hint: 'Scout Description' },
    { src: '/images/projects/tfc-rus/TFCRus_5.png', alt: 'TFC screenshot 5', hint: 'Command Menu' },
    ],
    installation: {
      en: ["Place TFCRusFull.pk3 in the tfc/custom folder"],
      ru: ["Положите TFCRusFull.pk3 в папку tfc/custom"]
    },
    changelog: [
      {
        date: '2022-07-21',
        changes: {
          en: ['Translation fixes'],
          ru: ['Исправление перевода']
        }
      },
      {
        date: '2022-05-30',
        changes: {
          en: ['Fixes for typos and phrasing'],
          ru: ['Исправление опечаток, формулировки']
        }
      },
      {
        date: '2021-07-19',
        changes: {
          en: ['Added missing audio file with the word "командную" for the announcer'],
          ru: ['Добавлен отсутствующий аудиофайл со словом "командную" для диктора']
        }
      },
      {
        date: '2021-05-16',
        changes: {
          en: ['First release of the localization'],
          ru: ['Первый релиз русификатора']
        }
      }
    ]
  },
  /*
  {
    slug: 'opposing-force-rus',
    ...
  },
  */
  /*
  {
    slug: 'yapb-graphs',
    ...
  }
  */
];

const translations: { [slug: string]: { [key in Locale]: Omit<Project, keyof ProjectBase> } } = {
  'half-life-rus': {
    en: {
      title: 'Half-Life Russian Localization',
      shortDescription: 'Full Russian localization for the original Half-Life.',
      description: 'Authors:\nText localization: $_Vladislav\nVoice localization: "XXI Century", Triada Games, Buka Entertainment, 7Wolf, Fargus, and Kudos.\n\nHuman Grunts voice-over: Pyotr Boyko\nBlack Mesa announcements voice-over: Evgeny Sinelnikov\nMain menu localization for Xash3D (WON-Style): Vladislav Sukhov ($_Vladislav)\nH.E.V. suit HD voice-over: Buka Entertainment\nMainUI Xash3D localization: $_Vladislav\n\nIncludes:\n- Text localization\n- Voice localization\n- Russian fonts\n- Main menu localization\n\n**If you liked the translation, support me on Boosty!**\nhttps://boosty.to/rasstaman1337',
    },
    ru: {
      title: 'Русификатор Half-Life',
      shortDescription: 'Полная русская локализация оригинальной Half-Life.',
      description: 'Авторы:\nРусификатор текста: $_Vladislav\nРусификатор озвучки: «XXI век», Triada Games, Buka Entertainment, 7Wolf, Fargus и Kudos.\n\nОзвучка солдатов: Пётр Бойко\nОзвучка оповещений Чёрной Мезы: Евгений Синельников\nРусификатор главного меню для Xash3D (WON-Style): Владислав Сухов ($_Vladislav)\nОзвучка H.E.V костюма в HD качестве: Buka Entertainment\nРусификатор MainUI Xash3D: $_Vladislav\n\nВ него входит:\n- Русификатор текста\n- Русификатор озвучки\n- Русские шрифты\n- Русификатор главного меню\n\n**Если понравился перевод, поддержите меня на Boosty!**\nhttps://boosty.to/rasstaman1337',
    }
  },
  'blue-shift-rus': {
    en: {
      title: 'Blue Shift Russian Localization',
      shortDescription: 'Full Russian localization for Half-Life: Blue Shift.',
      description: 'Voices:\nBarney Hologram/Live Barney: Unnamed actor from "Kyiv-12", published by Triada\nOtis: Stanislav Cherskov\nScientists: Evgeny Sinelnikov + additional voice by Ivan Titov\nHuman Grunts: Pyotr Boyko + additional voice by Ivan Titov\nDr. Rosenberg: Philipp Burenin\nBlack Mesa Transit System Announcements: Elena Polonetskaya\nBlack Mesa Announcement System: "Microsoft Dmitry" neural voice with further processing and intonation/stress control by $_Vladislav\n\nText:\nMainUI/MainTUI translation for Xash3D FWGS: $_Vladislav\nTranslation of WON/Xash3D menu button images: $_Vladislav\nTranslation of other in-game text: $_Vladislav\n\nIncludes:\n- Fonts with Cyrillic support (fonts.wad, gfx.wad)\n- Translated loading screens (cached.wad, gfx.wad)\n- Text translation\n- Voiceover translation\n- Patched maps to support localization\n\n**If you liked the translation, support me on Boosty!**\nhttps://boosty.to/rasstaman1337',
    },
    ru: {
      title: 'Русификатор Blue Shift',
      shortDescription: 'Полная русская локализация для Half-Life: Blue Shift.',
      description: 'Голоса:\nГолограмма Барни/Живой Барни: Безымянный актёр «Киев-12», издатель Triada\nОтис: Станислав Черсков\nУчёные: Евгений Синельников + дополнительный голос от Ивана Титова\nВоенные HECU: Пётр Бойко + дополнительный голос от Ивана Титова\nДоктор Розенберг: Филипп Буренин\nОповещения транспортной системы Чёрной Мезы: Елена Полонецкая\nСистема оповещений Чёрной Мезы: Нейронный голос "Майкрософт Дмитрий" с дальнейшей обработкой и контролем интонации/ударений от $_Vladislav\n\nТекст:\nПеревод MainUI/MainTUI для Xash3D FWGS: $_Vladislav\nПеревод изображений кнопок меню WON/Xash3D: $_Vladislav\nПеревод остального внутриигрового текста: $_Vladislav\n\nВ состав русификатора входит:\n- Шрифты с поддержкой кириллицы (fonts.wad, gfx.wad)\n- Переведённые загрузочные экраны (cached.wad, gfx.wad)\n- Перевод текста\n- Перевод озвучки\n- Патченные карты для поддержки локализации\n\n**Если понравился перевод, поддержите меня на Boosty!**\nhttps://boosty.to/rasstaman1337',
    }
  },
  'cs-16-rus': {
    en: {
      title: 'CS 1.6 Russian Localization',
      shortDescription: 'Full Russian localization for Counter-Strike 1.6.',
      description: 'Authors:\nText translation: $_Vladislav\nRussian voice-over for radio commands: Unknown\nRussian voice-over for bots: Unknown\n\nIncludes:\n- Text translation\n- Radio command translation\n- Xash3D FWGS menu translation\n- Fonts with Cyrillic support\n- Russian voice-over for YaPB and zBot bots\n\n**Support me on Boosty!**\nhttps://boosty.to/rasstaman1337',
    },
    ru: {
      title: 'Русификатор CS 1.6',
      shortDescription: 'Полная русская локализация для Counter-Strike 1.6.',
      description: 'Авторы:\nПеревод текста: $_Vladislav\nРусская озвучка радиокоманд: Неизвестно\nРусская озвучка ботов: Неизвестно\n\nВ него входит:\n- Перевод текста\n- Перевод радиокоманд\n- Перевод меню Xash3D FWGS\n- Шрифты с поддержкой кириллицы\n- Русская озвучка ботов YaPB и zBot\n\n**Поддержите меня на Boosty!**\nhttps://boosty.to/rasstaman1337',
    }
  },
  'tfc-rus': {
    en: {
      title: 'TFC Russian Localization',
      shortDescription: 'Russian localization for Team Fortress Classic.',
      description: `Text translation: $_Vladislav
Voice translation: $_Vladislav

Voices:
Male announcer: "Microsoft Dmitry" neural voice
Female announcer: "Microsoft Daria" neural voice

Includes:
* Fonts with Cyrillic support (fonts.wad, gfx.wad)
* Translated loading screens (cached.wad, gfx.wad)
* Text translation
* Voice translation

**If you like the translation, support me on Boosty!**
https://boosty.to/rasstaman1337`,
    },
    ru: {
      title: 'Русификатор TFC',
      shortDescription: 'Русская локализация для Team Fortress Classic.',
      description: `Перевод текста: $_Vladislav
Перевод озвучки: $_Vladislav

Голоса:
Мужской голос диктора: Нейронный голос "Майкрософт Дмитрий"
Женский голос диктора: Нейронный голос "Майкрософт Дария"

В состав русификатора входит:
* Шрифты с поддержкой кириллицы (fonts.wad, gfx.wad)
* Переведённые загрузочные экраны (cached.wad, gfx.wad)
* Перевод текста
* Перевод озвучки

**Если понравился перевод, поддержите меня на Boosty!**
https://boosty.to/rasstaman1337`,
    }
  },
};


export function getProjects(lang: Locale): Project[] {
  return projectsBase.map(baseProject => {
    const translation = translations[baseProject.slug]?.[lang];
    if (!translation) {
      // Fallback or error handling if a translation is missing
      return null as any; // Should not happen if data is consistent
    }

    const localizedChangelog = baseProject.changelog?.map(entry => ({
      date: entry.date,
      changes: entry.changes[lang] || [],
    }));

    const localizedAddons = baseProject.addons?.map(addon => ({
      downloadUrl: addon.downloadUrl,
      title: addon.title[lang],
      description: addon.description[lang],
    }));

    return {
      ...baseProject,
      ...translation,
      installation: baseProject.installation ? baseProject.installation[lang] : undefined,
      changelog: localizedChangelog,
      addons: localizedAddons,
      // Ensure alt tags for screenshots are translated if needed, for now they are generic
      screenshots: baseProject.screenshots.map(s => {
        const src = s.src.startsWith('https://') ? s.src : `${basePath}${s.src}`;
        return {...s, src, alt: `${translation.title} screenshot`};
      }),
    };
  }).filter(Boolean);
}

export function getProjectBySlug(slug: string, lang: Locale): Project | undefined {
    const projects = getProjects(lang);
    return projects.find(p => p.slug === slug);
}

    