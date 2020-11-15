import React, { FC, useContext } from 'react'
import './index.scss'
import { Store } from '../../store/index'

const DashboardView: FC = () => {
  const data: any = useContext(Store)
  return <div>Hey {data.user}</div>
}

export default DashboardView
