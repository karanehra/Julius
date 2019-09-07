export const isAppLoading = state => {
  return (
    state.dashboardReducer.loading ||
    state.feedsReducer.loading ||
    state.articlesReducer.loading||
    state.cronReducer.loading || 
    state.logsReducer.loading
  );
};
