import Loadable from "react-loadable";
import Loader from '@components/shared/loader';

const juliusRoutes = [
  {
    path: "/",
    component: Loadable({
      loader: () => import("../components/dashboard"),
      loading: Loader
    })
  },
  {
    path: "/feeds",
    component: Loadable({
      loader: () => import("@components/feeds"),
      loading: Loader
    })
  },
  {
    path: "/articles",
    component: Loadable({
      loader: () => import("@components/articles"),
      loading: Loader
    })
  },
  {
    path: "/cronjobs",
    component: Loadable({
      loader: () => import("@components/cron"),
      loading: Loader
    })
  },
  {
    path: "/logs",
    component: Loadable({
      loader: () => import("@components/logs"),
      loading: Loader
    })
  }
]
export default juliusRoutes;