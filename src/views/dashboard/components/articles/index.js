import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Dialog,
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
import { callParseArticleApi } from '@utils/apis/apiService'
import GenericText from '@shared/genericText'
import '@styles/views/articles.scss'
import { callPurgeArticleApi } from '../../../../utils/apis/apiService'
import ArticleCard from './articleCard/'

class ArticlesPage extends Component {
  state = {
    isContentDialogOpen: false,
    dialogData: null,
    page: 1,
    pageSize: 10,
    query: ''
  }

  parseArticle = article => event => {
    event.preventDefault()
    event.stopPropagation()
    callParseArticleApi({
      url: article.link
    }).then(res => {
      let data = {
        article,
        parsed: res.data
      }
      this.setState({ dialogData: data })
      this.switchContentDialog()
    })
  }

  switchContentDialog = () => {
    this.setState({
      isContentDialogOpen: !this.state.isContentDialogOpen
    })
  }

  handleQueryChange = event => {
    const { name, value } = event.target
    this.setState(
      { [name]: value },
      value !== '' ? this.componentDidMount : () => {}
    )
  }

  handleQueryStringChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value })

  purgeArticles = async () => {
    try {
      let res = await callPurgeArticleApi()
      if (res.status === 200) {
        this.componentDidMount()
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { articleData } = this.props
    const {
      isContentDialogOpen,
      dialogData,
      pageSize,
      page,
      query
    } = this.state
    return (
      <React.Fragment>
        {articleData && articleData.length > 0 && (
          <FormGroup className='query-toolbar'>
            <div className='control'>
              <FormControl fullWidth variant='outlined'>
                <InputLabel>Page Size</InputLabel>
                <Select
                  name='pageSize'
                  value={pageSize}
                  onChange={this.handleQueryChange}
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
                onChange={this.handleQueryChange}
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
                onChange={this.handleQueryStringChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      onClick={this.handleQueryChange}
                      position='end'
                    >
                      <Search />
                    </InputAdornment>
                  )
                }}
              />
            </div>
          </FormGroup>
        )}
        <Button onClick={this.purgeArticles}>Purge</Button>

        {articleData && articleData.length > 0 ? (
          articleData.map((article, i) => (
            <ArticleCard data={article} key={i} />
          ))
        ) : (
          <div className='no-data'>No articles available</div>
        )}
        {isContentDialogOpen && (
          <Dialog
            classes={{ paper: 'dialog-cont' }}
            open={isContentDialogOpen}
            onClose={this.switchContentDialog}
          >
            <GenericText size={22} gutters={10} bold>
              {dialogData.article.title}
            </GenericText>
            {dialogData.parsed}
          </Dialog>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  articleData: state.articlesReducer.articleData,
  isMobile: state.deviceReducer.isMobile
})

export default connect(mapStateToProps)(ArticlesPage)
