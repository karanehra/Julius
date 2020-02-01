import React, { Component } from 'react'
import { callGetArticlesApi } from '@utils/apis/apiService'
import ArticleCard from './articleCard/'
import ArticleQueryToolbar from './queryToolbar/'
import '@styles/views/articles.scss'

class ArticlesPage extends Component {
  state = {
    isContentDialogOpen: false,
    dialogData: null,
    page: 1,
    pageSize: 10,
    query: '',
    articleData: []
  }

  async componentDidMount() {
    const { page, pageSize, query } = this.state
    let res = await callGetArticlesApi({ page, pageSize, query })
    if (res.status === 200) {
      this.setState({ articleData: res.data })
    }
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

  render() {
    const { pageSize, page, query, articleData } = this.state
    const queryProps = {
      pageSize,
      page,
      query,
      handleQueryChange: this.handleQueryChange,
      handleQueryStringChange: this.handleQueryStringChange
    }
    return (
      <React.Fragment>
        {articleData && articleData.length > 0 ? (
          <React.Fragment>
            <ArticleQueryToolbar {...queryProps} />

            {articleData.map((article, i) => (
              <ArticleCard data={article} key={i} />
            ))}
          </React.Fragment>
        ) : (
          <div className='no-data'>No articles available</div>
        )}
      </React.Fragment>
    )
  }
}

export default ArticlesPage
