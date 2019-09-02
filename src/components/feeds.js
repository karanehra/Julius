import React, { Component } from "react";
import { connect } from "react-redux";
import { getFeedDataAsyncAction } from "../actions/feeds.actions";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails
} from "@material-ui/core";

import ExpandMore from "@material-ui/icons/ExpandMore";

class FeedsPage extends Component {
  state = {
    expandedPanel: null
  };

  componentDidMount() {
    this.props.dispatch(getFeedDataAsyncAction());
  }

  expandPanel = event => {
    this.setState({ expandedPanel: event.target.id });
  };

  render() {
    const { feedData } = this.props;
    const { expandedPanel } = this.state;
    return (
      <React.Fragment>
        {feedData &&
          feedData.map((feed, i) => (
            <ExpansionPanel key={i}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls={"panel-" + i + "-content"}
                id={"panel-" + i}
                expanded={expandedPanel === "panel-" + i}
                onClick={this.expandPanel}
              >
                <Typography>{feed.title}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  feedData: state.feedsReducer.feedData
});

export default connect(mapStateToProps)(FeedsPage);
