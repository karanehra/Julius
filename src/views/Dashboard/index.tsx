import { AppBar } from '@material-ui/core'
import React, { FC } from 'react'
import { useStore } from '../../store/index'
import './index.scss'

const DashboardView: FC = () => {
  const { store } = useStore()
  return (
    <div>
      <AppBar>Hello</AppBar>
    </div>
  )
}

export default DashboardView
