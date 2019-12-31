import React, { Component } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
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
} from "@material-ui/core";
import { connect } from "react-redux";
import { getArticleDataAsyncAction } from "@actions/articles.actions";
import ExpandMore from "@material-ui/icons/ExpandMore";
import GenericText from "@shared/genericText";
import { callParseArticleApi } from "@utils/apis/apiService";
import { Search } from "@material-ui/icons";
import "@styles/views/articles.scss";

class ArticlesPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { page, pageSize, query } = this.state;
    dispatch(getArticleDataAsyncAction({ page, pageSize, query }));
  }

  state = {
    isContentDialogOpen: false,
    dialogData: null,
    page: 1,
    pageSize: 10,
    query: ""
  };

  parseArticle = article => event => {
    event.preventDefault();
    event.stopPropagation();
    callParseArticleApi({
      url: article.link
    }).then(res => {
      let data = {
        article,
        parsed: res.data
      };
      this.setState({ dialogData: data });
      this.switchContentDialog();
    });
  };

  switchContentDialog = () => {
    this.setState({
      isContentDialogOpen: !this.state.isContentDialogOpen
    });
  };

  handleQueryChange = event => {
    const { name, value } = event.target;
    this.setState(
      { [name]: value },
      value !== "" ? this.componentDidMount : () => {}
    );
  };

  handleQueryStringChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  render() {
    const { articleData, isMobile } = this.props;
    const {
      isContentDialogOpen,
      dialogData,
      pageSize,
      page,
      query
    } = this.state;
    return (
      <React.Fragment>
        <FormGroup className="query-toolbar">
          <div className="control">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Page Size</InputLabel>
              <Select
                name="pageSize"
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
          <div className="control">
            <TextField
              variant="outlined"
              label="Page number"
              value={page}
              name="page"
              onChange={this.handleQueryChange}
              fullWidth
            />
          </div>
          <div className="control">
            <TextField
              variant="outlined"
              label="Query"
              value={query}
              name="query"
              fullWidth
              onChange={this.handleQueryStringChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    onClick={this.handleQueryChange}
                    position="end"
                  >
                    <Search />
                  </InputAdornment>
                )
              }}
            />
          </div>
        </FormGroup>
        {articleData && articleData.length > 0 ? (
          articleData.map((article, i) => (
            <ExpansionPanel key={i}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls={"panel-" + i + "-content"}
                id={"panel-" + i}
                classes={{
                  content: "article-summary"
                }}
              >
                <Typography className="article-title">
                  {article.title}
                </Typography>
                {!isMobile && (
                  <Button
                    variant="outlined"
                    onClick={this.parseArticle(article)}
                    color="primary"
                  >
                    Get Content
                  </Button>
                )}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="article-details">
                {isMobile && (
                  <Button
                    variant="outlined"
                    onClick={this.parseArticle(article)}
                    color="primary"
                    fullWidth
                    classes={{
                      root: "action-btn"
                    }}
                  >
                    Get Content
                  </Button>
                )}
                <div>
                  <GenericText size={14} bold indent>
                    Source:
                  </GenericText>
                  <GenericText size={12}>{article.feedTitle}</GenericText>
                </div>
                <div>
                  <GenericText size={14} bold indent>
                    Snippet:
                  </GenericText>
                  <GenericText size={12}>
                    {article.description || article.content}
                  </GenericText>
                </div>
                <div>
                  <GenericText size={14} bold indent>
                    Added At:
                  </GenericText>
                  <GenericText size={12}>{article.createdAt}</GenericText>
                </div>
                <div>
                  <GenericText size={14} bold indent>
                    Url:
                  </GenericText>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={article.URL}
                  >
                    Visit
                  </a>
                </div>
                <div>
                  <GenericText size={14} bold indent>
                    Id:
                  </GenericText>
                  <GenericText size={12}>{article._id}</GenericText>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))
        ) : (
          <div>No articles available</div>
        )}
        {isContentDialogOpen && (
          <Dialog
            classes={{ paper: "dialog-cont" }}
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
    );
  }
}

const mapStateToProps = state => ({
  articleData: state.articlesReducer.articleData,
  isMobile: state.deviceReducer.isMobile
});

export default connect(mapStateToProps)(ArticlesPage);
