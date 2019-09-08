import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails
} from "@material-ui/core";
import { connect } from "react-redux";
import { getArticleDataAsyncAction } from "../actions/articles.actions";
import "@styles/articles.scss";
import ExpandMore from "@material-ui/icons/ExpandMore";
import GenericText from "./shared/genericText";

class ArticlesPage extends Component {
  componentDidMount() {
    this.props.dispatch(getArticleDataAsyncAction());
  }
  state = {
    data: []
  };

  render() {
    const { articleData, isMobile } = this.props;
    return (
      <React.Fragment>
        {isMobile ? (
          articleData &&
          articleData.map(row => (
            <Paper className="article-cont-mb" key={row.id}>
              {row.title}
            </Paper>
          ))
        ) : (
          <React.Fragment>
            {articleData &&
              articleData.map((article, i) => (
                <ExpansionPanel key={i}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                    aria-controls={"panel-" + i + "-content"}
                    id={"panel-" + i}
                  >
                    <Typography>{article.title}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="feed-details">
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
                      <a target="_blank" href={article.link}>{article.link}</a>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))}
          </React.Fragment>
          // <Table>
          //   <TableHead>
          //     <TableRow>
          //       <TableCell>Title</TableCell>
          //       <TableCell align="right">Snippet</TableCell>
          //       <TableCell align="right">Actions</TableCell>
          //     </TableRow>
          //   </TableHead>
          //   <TableBody>
          //     {articleData &&
          //       articleData.map(row => (
          //         <TableRow key={row.id}>
          //           <TableCell component="th" scope="row">
          //             {row.title}
          //           </TableCell>
          //           <TableCell align="right">{row.snippet}</TableCell>
          //           <TableCell align="right">
          //             <a href={row.link}>Visit</a>
          //           </TableCell>
          //         </TableRow>
          //       ))}
          //   </TableBody>
          // </Table>
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
