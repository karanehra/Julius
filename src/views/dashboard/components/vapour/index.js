import React, { useEffect } from 'react'
import {
  callGetVapourStatusApi,
  callGetVapourShardsApi
} from '../../../../utils/apis/vapour'
import { Typography, Button } from '@material-ui/core'

const Vapour = () => {
  const [isOnline, setIsOnline] = React.useState(false)
  const [shards, setShards] = React.useState([])

  const getStatus = async () => {
    let res = await callGetVapourStatusApi()
    setIsOnline(res.status === 200)
    if (res.status === 200) {
      let shardsResp = await callGetVapourShardsApi()
      if (shardsResp.status === 200) {
        setShards(shardsResp.data.shards)
      }
    }
  }

  useEffect(() => {
    getStatus()
  }, [])

  return (
    <>
      <Typography variant='h4'>Vapour</Typography>
      <Typography>Status:{isOnline ? 'ONLINE' : 'OFFLINE'}</Typography>
      <Button>Refresh</Button>
      {shards.length && (
        <div>
          <div>Filled shards: {shards.length}</div>
          {shards.map((shard, i) => (
            <div key={i}>{shard}</div>
          ))}
        </div>
      )}
    </>
  )
}

export default Vapour
