import Loadable from "react-loadable";
import Loader from "@components/shared/loader";
import {
  DASHBOARD_ROUTE_PATH,
  FEEDS_ROUTE_PATH,
  ARTICLES_ROUTE_PATH,
  CRONJOBS_ROUTE_PATH,
  LOGS_ROUTE_PATH,
  LOGIN_ROUTE_PATH,
  SIGNUP_ROUTE_PATH
} from "./routeUrls";

const juliusRoutes = [
  {
    path: LOGIN_ROUTE_PATH,
    component: Loadable({
      loader: () => import("@views/login"),
      loading: Loader
    })
  },
  {
    path: SIGNUP_ROUTE_PATH,
    component: Loadable({
      loader: () => import("@views/signup"),
      loading: Loader
    })
  },
  {
    path: DASHBOARD_ROUTE_PATH,
    component: Loadable({
      loader: () => import("@views/dashboard"),
      loading: Loader
    })
  }
  // {
  //   path: DASHBOARD_ROUTE_PATH,
  // component: Loadable({
  //   loader: () => import("../components/dashboard"),
  //   loading: Loader
  // })
  // },
  // {
  //   path: FEEDS_ROUTE_PATH,
  //   component: Loadable({
  //     loader: () => import("@components/feeds"),
  //     loading: Loader
  //   })
  // },
  // {
  //   path: ARTICLES_ROUTE_PATH,
  //   component: Loadable({
  //     loader: () => import("@components/articles"),
  //     loading: Loader
  //   })
  // },
  // {
  //   path: CRONJOBS_ROUTE_PATH,
  //   component: Loadable({
  //     loader: () => import("@components/cron"),
  //     loading: Loader
  //   })
  // },
  // {
  //   path: LOGS_ROUTE_PATH,
  //   component: Loadable({
  //     loader: () => import("@components/logs"),
  //     loading: Loader
  //   })
  // }
];
export default juliusRoutes;
