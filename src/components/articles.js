import React, { Component } from "react";
import {
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Button,
  Dialog
} from "@material-ui/core";
import { connect } from "react-redux";
import { getArticleDataAsyncAction } from "../actions/articles.actions";
import ExpandMore from "@material-ui/icons/ExpandMore";
import GenericText from "./shared/genericText";
import { callParseArticleApi } from "../utils/apiService";
import "@styles/articles.scss";

class ArticlesPage extends Component {
  componentDidMount() {
    this.props.dispatch(getArticleDataAsyncAction());
  }
  state = {
    isContentDialogOpen: false,
    dialogContent: null
  };

  parseArticle = link => event => {
    event.preventDefault();
    event.stopPropagation();
    callParseArticleApi({
      url: link
    }).then(res => {
      this.setState({ dialogContent: res.data });
      this.switchContentDialog();
    });
  };

  switchContentDialog = () => {
    this.setState({
      isContentDialogOpen: !this.state.isContentDialogOpen
    });
  };

  render() {
    const { articleData, isMobile } = this.props;
    const { isContentDialogOpen, dialogContent } = this.state;
    return (
      // <React.Fragment>
      //   {isMobile ? (
      //     articleData &&
      //     articleData.map(row => (
      //       <Paper className="article-cont-mb" key={row.id}>
      //         {row.title}
      //       </Paper>
      //     ))
      //   ) : (
      <React.Fragment>
        {articleData &&
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
                <Typography>{article.title}</Typography>
                {!isMobile && (
                  <Button
                    variant="outlined"
                    onClick={this.parseArticle(article.link)}
                    color="primary"
                  >
                    Get Content
                  </Button>
                )}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="feed-details">
                {isMobile && (
                  <Button
                    variant="outlined"
                    onClick={this.parseArticle(article.link)}
                    color="primary"
                    fullWidth
                  >
                    Get Content
                  </Button>
                )}
                <div>
                  <GenericText size={14} bold>
                    Id:
                  </GenericText>
                  <GenericText size={12}>{article.id}</GenericText>
                </div>
                <div>
                  <GenericText size={14} bold>
                    Snippet:
                  </GenericText>
                  <GenericText size={12}>{article.snippet}</GenericText>
                </div>
                <div>
                  <GenericText size={14} bold>
                    Added At:
                  </GenericText>
                  <GenericText size={12}>{article.createdAt}</GenericText>
                </div>
                <div>
                  <GenericText size={14} bold>
                    Url:
                  </GenericText>
                  <a target="_blank" href={article.link}>
                    Visit
                  </a>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        <Dialog open={isContentDialogOpen} onClose={this.switchContentDialog}>
          {dialogContent}
        </Dialog>
      </React.Fragment>
      //   )}
      // </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  articleData: state.articlesReducer.articleData,
  isMobile: state.deviceReducer.isMobile
});

export default connect(mapStateToProps)(ArticlesPage);
