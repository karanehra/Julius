import React, { useState } from 'react'
import { Paper } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { TextField } from '@material-ui/core'

const FeedCard = props => {
  const { data: feed } = props
  const [tagEditOpen, setTagEdit] = useState(false)
  const [tagstring, changeTagstring] = useState(
    feed.tags ? feed.tags.join('') : ''
  )
  return (
    <Paper className='feed-details'>
      <div className='title'>
        {feed.title} <a href={feed.URL}>Visit</a>
      </div>
      <div className='description'>{feed.description}</div>
      {tagEditOpen ? (
        <TextField
          value={tagstring}
          onChange={({ target: { value } }) => changeTagstring(value)}
        />
      ) : (
        <div className='description'>Tags: {feed.tags}</div>
      )}
      <Button onClick={() => setTagEdit(!tagEditOpen)}>Add Tags</Button>
    </Paper>
  )
}

export default FeedCard
