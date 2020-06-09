export const whoAmI = '/auth/whoami/';
export const whoAmIWithNext = (nextUrl) => `/auth/whoami/?next=${nextUrl}`;
export const logoutEndpoint = '/auth/logout/';
export const userProfileRoute = '/profile';
export const loginRoute = '/login/';

export const mySurveysRoute = '/mysurveys';
export const surveysRoute = '/surveys';


export const divider = 'divider';

export const urlPages = [
  {
    // TODO вынеси урлы отсюда и из роутера в константы
    title: 'Мой профиль',
    url: userProfileRoute,
  },
  {
    title: 'Назначенные мне опросы',
    url: '/mysurveys',
  },
  {
    title: divider,
  },
  {
    title: 'Управление опросами',
    url: '/surveys',
  },
  {
    title: divider,
  },
  {
    title: 'Управление пользователями',
    url: '/user-search',
  },
  // {
  //   title: 'Управление опросами',
  //   url: '/surveys',
  // },
];
