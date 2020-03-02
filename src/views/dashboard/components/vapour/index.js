import React, { useEffect } from 'react'
import {
  callGetVapourStatusApi,
  callGetVapourShardsApi
} from '@utils/apis/vapour'
import { Typography, Button } from '@material-ui/core'
import './index.scss'

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
      <div className='status-bar'>
        <Typography variant='h4'>Vapour</Typography>
        <div>Filled shards: {shards.length}</div>
        <Typography>Status:{isOnline ? 'ONLINE' : 'OFFLINE'}</Typography>
        <Button>Refresh</Button>
      </div>

      {shards.length && (
        <div>
          <div className='shard-cells'>
            {new Array(256).fill(0).map((shard, i) => (
              <div className={shards[i] ? 'cell filled' : 'cell'} key={i}>
                {shards[i]}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Vapour
