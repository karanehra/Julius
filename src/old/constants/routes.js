import React from 'react'
import {
  DASHBOARD_ROUTE_PATH,
  FEEDS_ROUTE_PATH,
  ARTICLES_ROUTE_PATH,
  CRONJOBS_ROUTE_PATH,
  LOGS_ROUTE_PATH,
  HOME_ROUTE_PATH,
  BOARDS_ROUTE_PATH,
  HOMEPAGE_ROUTE_PATH,
  VAPOUR_ROUTE_PATH
} from './routeUrls'

const homepageComponent = React.lazy(() => import('@views/auth'))
const dashboardComponent = React.lazy(() => import('@views/dashboard'))

export const juliusRoutes = [
  {
    path: HOMEPAGE_ROUTE_PATH,
    component: homepageComponent
  },
  {
    path: DASHBOARD_ROUTE_PATH,
    component: dashboardComponent
  }
]

export const juliusDashboardRoutes = [
  {
    path: HOME_ROUTE_PATH,
    component: React.lazy(() => import('@views/dashboard/components/home'))
  },
  {
    path: FEEDS_ROUTE_PATH,
    component: React.lazy(() =>
      import('@views/dashboard/components/feeds/index')
    )
  },
  {
    path: ARTICLES_ROUTE_PATH,
    component: React.lazy(() =>
      import('@views/dashboard/components/articles/index')
    )
  },
  {
    path: CRONJOBS_ROUTE_PATH,
    component: React.lazy(() => import('@views/dashboard/components/jobs/'))
  },
  {
    path: LOGS_ROUTE_PATH,
    component: React.lazy(() => import('@views/dashboard/components/logs'))
  },
  {
    path: BOARDS_ROUTE_PATH,
    component: React.lazy(() => import('@views/dashboard/components/boards'))
  },
  {
    path: VAPOUR_ROUTE_PATH,
    component: React.lazy(() => import('@views/dashboard/components/vapour'))
  }
]
