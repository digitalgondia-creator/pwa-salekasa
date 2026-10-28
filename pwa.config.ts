import type { Config } from './types';

export default {
  id: '/',
  name: 'Digital Salekasa',
  shortName: 'Digital Salekasa',
  description: 'सालेकसा, कचारगड व परिसराची ताजी बातमी, नोकऱ्या, शेती भाव, एसटी बस वेळापत्रक आणि स्थानिक खरेदी-विक्री.',
  direction: 'auto',
  language: 'mr-IN',
  backgroundColor: '#ffffff',
  themeColor: '#0046eb',
  display: 'standalone',
  orientation: 'portrait',
  scope: '/',
  startUrl: '/?utm_source=homescreen',
  appleStatusBarStyle: 'default',
  preferRelatedApplications: false,
  shortcuts: [
    {
      name: 'ताजी बातमी (News)',
      shortName: 'बातमी',
      description: 'सालेकसा व परिसरातील ताज्या घडामोडी',
      url: '/search/label/news?utm_source=homescreen',
    },
    {
      name: 'रोजगार व नोकऱ्या (Jobs)',
      shortName: 'नोकऱ्या',
      description: 'सालेकसा व गोंदिया जिल्ह्यातील जॉब्स',
      url: '/search/label/Jobs?utm_source=homescreen',
    },
    {
      name: 'सरकारी योजना (Schemes)',
      shortName: 'योजना',
      description: 'लाडकी बहीण, शेतकरी व विद्यार्थी योजना',
      url: '/search/label/Schemes?utm_source=homescreen',
    },
    {
      name: 'एसटी बस वेळापत्रक (ST Bus)',
      shortName: 'एसटी बस',
      description: 'सालेकसा बस स्टँड सर्व बसेसचे थेट वेळापत्रक',
      url: '/p/salekasa-bus-timetable.html?utm_source=homescreen',
    },
  ],
  pwa: {
    logs: true,
    oneSignalEnabled: false,
  },
  origin: 'https://digitalsalekasa.blogspot.com/',
};
