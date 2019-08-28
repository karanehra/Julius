import React, { Component } from "react";
import Axios from "axios";
import { Table, TableHead, TableCell, TableBody, TableRow } from "@material-ui/core";

class ArticlesPage extends Component {
  componentWillMount() {
    Axios.get("http://35.202.10.179/articles")
      .then(res => {
        console.log(res);
        this.setState({
          data:res.data
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
  state = {
    data:[]
  };
  render() {
    return (
      <React.Fragment>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Content</TableCell>
              <TableCell align="right">Snippet</TableCell>
              <TableCell align="right">Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.content}</TableCell>
                <TableCell align="right">{row.snippet}</TableCell>
                <TableCell align="right">{row.link}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default ArticlesPage;
