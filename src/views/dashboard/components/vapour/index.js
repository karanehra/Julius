import React, { useEffect } from 'react'
import { callGetVapourStatusApi } from '../../../../utils/apis/vapour'
import { Typography } from '@material-ui/core'

const Vapour = () => {
  const [isOnline, setIsOnline] = React.useState(false)

  const getStatus = async () => {
    let res = await callGetVapourStatusApi()
    console.log(res)
    setIsOnline(res.status === 200)
  }
  useEffect(() => {
    getStatus()
  }, [])
  return (
    <>
      <Typography>Status:{isOnline ? 'ONLINE' : 'OFFLINE'}</Typography>
    </>
  )
}

export default Vapour
