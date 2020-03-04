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
  const [shards, setShards] = React.useState({})
  const [keyCount, setKeyCount] = React.useState(0)
  const [shardData, setShardData] = React.useState({
    keyCount: 0,
    cacheHits: 0,
    cacheMisses: 0,
    startupMS: 0
  })

  const getStatus = async () => {
    let res = await callGetVapourStatusApi()
    setIsOnline(res.status === 200)
    if (res.status === 200) {
      let shardsResp = await callGetVapourShardsApi()
      let {
        status,
        data: {
          shards,
          totalKeyCount,
          hits: cacheHits,
          misses: cacheMisses,
          startupMS
        }
      } = shardsResp
      if (status === 200) {
        setShards(shards)
        setKeyCount(totalKeyCount)
        setShardData({ ...shardData, cacheHits, cacheMisses, startupMS })
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
        <div className='metric'>
          <div className='text'>Key Count:</div>
          <div className='data'>{keyCount}</div>
        </div>
        <div className='metric'>
          <div className='text'>Cache Hit Ratio:</div>
          <div className='data'>
            {shardData.cacheHits / shardData.cacheMisses || '-'}
          </div>
        </div>
        <div className='metric'>
          <div className='text'>StartUp Time:</div>
          <div className='data'>{shardData.startupMS}</div>
        </div>
        <div className='metric'>
          <div className='text'>Cache Hits:</div>
          <div className='data'>{shardData.cacheHits}</div>
        </div>
        <Button color='primary' variant='contained' onClick={getStatus}>
          Refresh
        </Button>
      </Paper>
      <div className='shard-cells'>
        {Object.keys(shards).map((shardID, i) => (
          <div className={shards[shardID] ? 'cell filled' : 'cell'} key={i}>
            {shards[shardID] || '0'}
          </div>
        ))}
      </div>
    </>
  )
}

export default Vapour
