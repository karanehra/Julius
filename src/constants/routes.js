import Loadable from 'react-loadable'
import Loader from '@shared/loader'
import {
  DASHBOARD_ROUTE_PATH,
  FEEDS_ROUTE_PATH,
  ARTICLES_ROUTE_PATH,
  CRONJOBS_ROUTE_PATH,
  LOGS_ROUTE_PATH,
  LOGIN_ROUTE_PATH,
  SIGNUP_ROUTE_PATH,
  HOME_ROUTE_PATH,
  BOARDS_ROUTE_PATH,
  TREES_ROUTE_PATH,
  TREE_DETAIL_ROUTE_PATH
} from './routeUrls'

export const juliusRoutes = [
  {
    path: LOGIN_ROUTE_PATH,
    component: Loadable({
      loader: () => import('@views/auth'),
      loading: Loader
    })
  },
  {
    path: SIGNUP_ROUTE_PATH,
    component: Loadable({
      loader: () => import('@views/signup'),
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
      loader: () => import('@views/dashboard/components/feeds'),
      loading: Loader
    })
  },
  {
    path: ARTICLES_ROUTE_PATH,
    component: Loadable({
      loader: () => import('@views/dashboard/components/articles'),
      loading: Loader
    })
  },
  {
    path: CRONJOBS_ROUTE_PATH,
    component: Loadable({
      loader: () => import('@views/dashboard/components/cron'),
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
  {
    path: TREES_ROUTE_PATH,
    component: Loadable({
      loader: () => import('@views/dashboard/components/trees/listing'),
      loading: Loader
    })
  },
  {
    path: TREE_DETAIL_ROUTE_PATH,
    component: Loadable({
      loader: () => import('@views/dashboard/components/trees/detailNew'),
      loading: Loader
    })
  }
]
