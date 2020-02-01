import React from 'react'
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  TextField,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { callPurgeArticleApi } from '@utils/apis/apiService'

const ArticleQueryToolbar = props => {
  const {
    pageSize,
    page,
    query,
    handleQueryChange,
    handleQueryStringChange
  } = props

  const purgeArticles = async () => {
    try {
      let res = await callPurgeArticleApi()
      if (res.status === 200) {
        this.componentDidMount()
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <FormGroup className='query-toolbar'>
      <div className='control'>
        <FormControl fullWidth variant='outlined'>
          <InputLabel>Page Size</InputLabel>
          <Select
            name='pageSize'
            value={pageSize}
            onChange={handleQueryChange}
            input={<OutlinedInput />}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={50}>Twenty</MenuItem>
            <MenuItem value={100}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className='control'>
        <TextField
          variant='outlined'
          label='Page number'
          value={page}
          name='page'
          onChange={handleQueryChange}
          fullWidth
        />
      </div>
      <div className='control'>
        <TextField
          variant='outlined'
          label='Query'
          value={query}
          name='query'
          fullWidth
          onChange={handleQueryStringChange}
          InputProps={{
            endAdornment: (
              <InputAdornment onClick={handleQueryChange} position='end'>
                <Search />
              </InputAdornment>
            )
          }}
        />
      </div>
      <Button onClick={purgeArticles}>Purge</Button>
    </FormGroup>
  )
}

export default ArticleQueryToolbar
