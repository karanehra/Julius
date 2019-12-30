import React, { Component } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Button,
  Dialog
} from "@material-ui/core";
import { connect } from "react-redux";
import { getArticleDataAsyncAction } from "@actions/articles.actions";
import ExpandMore from "@material-ui/icons/ExpandMore";
import GenericText from "@shared/genericText";
import { callParseArticleApi } from "@utils/apis/apiService";
import "@styles/views/articles.scss";

class ArticlesPage extends Component {
  componentDidMount() {
    this.props.dispatch(getArticleDataAsyncAction({ page: 1, pageSize: 10 }));
  }
  state = {
    isContentDialogOpen: false,
    dialogData: null
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

  render() {
    const { articleData, isMobile } = this.props;
    const { isContentDialogOpen, dialogData } = this.state;
    return (
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
              <ExpansionPanelDetails className="feed-details">
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
                  <GenericText size={12}>{article.feedId}</GenericText>
                </div>
                <div>
                  <GenericText size={14} bold indent>
                    Snippet:
                  </GenericText>
                  <GenericText size={12}>{article.snippet}</GenericText>
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
                    href={article.link}
                  >
                    Visit
                  </a>
                </div>
                <div>
                  <GenericText size={14} bold indent>
                    Id:
                  </GenericText>
                  <GenericText size={12}>{article.id}</GenericText>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
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
