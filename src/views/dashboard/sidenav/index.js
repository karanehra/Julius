import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ControlCamera from '@material-ui/icons/ControlCamera'
import RssFeed from '@material-ui/icons/RssFeed'
import ListIcon from '@material-ui/icons/List'
import CloudDownload from '@material-ui/icons/CloudDownload'
import Info from '@material-ui/icons/Info'
import {
  FEEDS_ROUTE_PATH,
  ARTICLES_ROUTE_PATH,
  CRONJOBS_ROUTE_PATH,
  LOGS_ROUTE_PATH,
  BOARDS_ROUTE_PATH,
  TREES_ROUTE_PATH
} from '@constants/routeUrls'
import { Note, Timer } from '@material-ui/icons'
import history from '@utils/history'
import { useLocation } from 'react-router-dom'

const Sidenav = () => {
  const location = useLocation()
  const getActiveClass = link => {
    return link === location.pathname ? 'active' : ''
  }

  const routeTo = route => () => {
    history.push(route)
  }

  return (
    <List component='nav'>
      <ListItem
        button
        className={getActiveClass('/dashboard/home')}
        onClick={routeTo('/dashboard/home')}
      >
        <ListItemIcon classes={{ root: 'white' }}>
          <ControlCamera />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItem>
      <ListItem
        button
        className={getActiveClass(FEEDS_ROUTE_PATH)}
        onClick={routeTo(FEEDS_ROUTE_PATH)}
      >
        <ListItemIcon classes={{ root: 'white' }}>
          <RssFeed />
        </ListItemIcon>
        <ListItemText primary='Feeds' />
      </ListItem>
      <ListItem
        button
        className={getActiveClass(ARTICLES_ROUTE_PATH)}
        onClick={routeTo(ARTICLES_ROUTE_PATH)}
      >
        <ListItemIcon classes={{ root: 'white' }}>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary='Articles' />
      </ListItem>
      <ListItem
        button
        className={getActiveClass(CRONJOBS_ROUTE_PATH)}
        onClick={routeTo(CRONJOBS_ROUTE_PATH)}
      >
        <ListItemIcon classes={{ root: 'white' }}>
          <Timer />
        </ListItemIcon>
        <ListItemText primary='Cron' />
      </ListItem>
      <ListItem
        button
        className={getActiveClass('/dumps')}
        onClick={routeTo('/dumps')}
      >
        <ListItemIcon classes={{ root: 'white' }}>
          <CloudDownload />
        </ListItemIcon>
        <ListItemText primary='Dumps' />
      </ListItem>
      <ListItem
        button
        className={getActiveClass(LOGS_ROUTE_PATH)}
        onClick={routeTo(LOGS_ROUTE_PATH)}
      >
        <ListItemIcon classes={{ root: 'white' }}>
          <Info />
        </ListItemIcon>
        <ListItemText primary='Logs' />
      </ListItem>
      <ListItem
        button
        className={getActiveClass(BOARDS_ROUTE_PATH)}
        onClick={routeTo(BOARDS_ROUTE_PATH)}
      >
        <ListItemIcon classes={{ root: 'white' }}>
          <Note />
        </ListItemIcon>
        <ListItemText primary='Boards' />
      </ListItem>
      <ListItem
        button
        className={getActiveClass(TREES_ROUTE_PATH)}
        onClick={routeTo(TREES_ROUTE_PATH)}
      >
        <ListItemIcon classes={{ root: 'white' }}>
          <Note />
        </ListItemIcon>
        <ListItemText primary='Trees' />
      </ListItem>
    </List>
  )
}

export default Sidenav
