import React from 'react'
import { Typography, Paper } from '@material-ui/core/'

const ArticleCard = props => {
  const {
    data: { title, content, description }
  } = props
  return (
    <Paper>
      <Typography variant='h4'>{title}</Typography>
      <Typography variant='subtitle1'>{content}</Typography>
      <Typography variant='subtitle1'>{description}</Typography>
    </Paper>
  )
}

export default ArticleCard
