import Loadable from 'react-loadable'
import Loader from '@shared/loader'
import {
  DASHBOARD_ROUTE_PATH,
  FEEDS_ROUTE_PATH,
  ARTICLES_ROUTE_PATH,
  CRONJOBS_ROUTE_PATH,
  LOGS_ROUTE_PATH,
  HOME_ROUTE_PATH,
  BOARDS_ROUTE_PATH,
  HOMEPAGE_ROUTE_PATH
} from './routeUrls'

export const juliusRoutes = [
  {
    path: HOMEPAGE_ROUTE_PATH,
    component: Loadable({
      loader: () => import('@views/auth'),
      loading: Loader
    })
  },
  {
    path: DASHBOARD_ROUTE_PATH,
    component: Loadable({
      loader: () => import('@views/dashboard'),
      loading: Loader
    })
  }
]

export const juliusDashboardRoutes = [
  {
    path: HOME_ROUTE_PATH,
    component: Loadable({
      loader: () => import('@views/dashboard/components/home'),
      loading: Loader
    })
  },
  {
    path: FEEDS_ROUTE_PATH,
    component: Loadable({
      loader: () => import('@views/dashboard/components/feeds/index'),
      loading: Loader
    })
  },
  {
    path: ARTICLES_ROUTE_PATH,
    component: Loadable({
      loader: () => import('@views/dashboard/components/articles/index'),
      loading: Loader
    })
  },
  {
    path: CRONJOBS_ROUTE_PATH,
    component: Loadable({
      loader: () => import('@views/dashboard/components/jobs/'),
      loading: Loader
    })
  },
  {
    path: LOGS_ROUTE_PATH,
    component: Loadable({
      loader: () => import('@views/dashboard/components/logs'),
      loading: Loader
    })
  },
  {
    path: BOARDS_ROUTE_PATH,
    component: Loadable({
      loader: () => import('@views/dashboard/components/boards'),
      loading: Loader
    })
  },
]
