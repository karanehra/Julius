import React, { FC } from 'react'
import { useStore } from '../../store/index'
import './index.scss'

const DashboardView: FC = () => {
  const { store } = useStore()
  return <div>Hey {store.user}</div>
}

export default DashboardView
