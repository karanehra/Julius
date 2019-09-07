import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow
} from "@material-ui/core";
import { connect } from "react-redux";
import { getArticleDataAsyncAction } from "../actions/articles.actions";

class ArticlesPage extends Component {
  componentDidMount() {
    this.props.dispatch(getArticleDataAsyncAction());
  }
  state = {
    data: []
  };

  render() {
    const { articleData } = this.props;
    return (
      <React.Fragment>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Snippet</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articleData &&
              articleData.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.snippet}</TableCell>
                  <TableCell align="right">
                    <a href={row.link}>Visit</a>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  articleData: state.articlesReducer.articleData
});

export default connect(mapStateToProps)(ArticlesPage);
