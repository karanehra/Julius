import React, { useEffect } from 'react'
import {
  callGetVapourStatusApi,
  callGetVapourShardsApi
} from '@utils/apis/vapour'
import { Typography, Button } from '@material-ui/core'
import './index.scss'
import { Paper } from '@material-ui/core/'

const Vapour = () => {
  const [isOnline, setIsOnline] = React.useState(false)
  const [shards, setShards] = React.useState([])
  const [keyCount, setKeyCount] = React.useState(0)

  const getStatus = async () => {
    let res = await callGetVapourStatusApi()
    setIsOnline(res.status === 200)
    if (res.status === 200) {
      let shardsResp = await callGetVapourShardsApi()
      let {
        status,
        data: { shards, totalKeyCount }
      } = shardsResp
      if (status === 200) {
        setShards(shards)
        setKeyCount(totalKeyCount)
      }
    }
  }

  useEffect(() => {
    getStatus()
  }, [])

  return (
    <>
      <Paper className='status-bar'>
        <Typography variant='h3'>Vapour</Typography>
        <div className='keycount'>
          <div className='text'>Key Count:</div>
          <div className='count'>{keyCount}</div>
        </div>
        <Button color='primary' variant='contained' onClick={getStatus}>
          Refresh
        </Button>
      </Paper>

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
