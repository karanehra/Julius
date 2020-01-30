import Axios from './interceptors'
const API_BASE_URL = 'http://localhost:3007'
const CRON_SERVER_BASE_URL = API_BASE_URL + ':8800'

export const callGetArticlesApi = ({
  page = '',
  pageSize = '',
  query = ''
}) => {
  return Axios.get(
    API_BASE_URL + `/articles?page=${page}&size=${pageSize}&query=${query}`
  )
}

export const callGetStatusDataApi = () => {
  return Axios.get(API_BASE_URL + '/dataset')
}

/**
 * Fetches feeds from the BE
 */
export const callGetFeedsApi = () => {
  return Axios.get(API_BASE_URL + '/feeds')
}

/**
 * Adds a feed to DB
 * @param {object} payload The payload
 * @param {string} payload.URL The feed URL
 * @param {string} payload.title The feed title
 */
export const callAddFeedApi = payload => {
  return Axios.post(API_BASE_URL + '/feeds', payload)
}

/**
 * Empties feeds from DB
 */
export const callPurgeFeedsApi = () => {
  return Axios.delete(API_BASE_URL + '/feeds')
}

/**
 * Empties articles from DB
 */
export const callPurgeArticleApi = () => {
  return Axios.delete(API_BASE_URL + '/articles')
}

/**
 * Updates a single feed in DB against payload provided
 * @param {string} feedID The ID against which update is issued
 * @param {Object} payload The updated feed payload
 */
export const callUpdateFeedByIDApi = (feedID, payload) => {
  return Axios.post(API_BASE_URL + `/feeds/${feedID}`, payload)
}

export const callGetProcessDataApi = () => {
  return Axios.get(API_BASE_URL + `/process`)
}

/**
 * Updates the given process ID
 * @param {string} processID The ID of the process being updated
 * @param {string} payload The updated payload
 */
export const callUpdateProcessByIDApi = (processID, payload) => {
  return Axios.patch(API_BASE_URL + `/process/${processID}`, payload)
}

export const callPostProcessApi = payload => {
  return Axios.post(API_BASE_URL + `/process`, payload)
}

export const callGetCronDataApi = () => {
  return Axios.get(CRON_SERVER_BASE_URL)
}

export const callGetGraphDataApi = () => {
  return Axios.get(API_BASE_URL + '/dataset')
}

export const callStopCronApi = id => {
  return Axios.get(CRON_SERVER_BASE_URL + `/stop/${id}`)
}
export const callStartCronApi = id => {
  return Axios.get(CRON_SERVER_BASE_URL + `/start/${id}`)
}

export const callGetLogsApi = () => {
  return Axios.get(API_BASE_URL + '/logs')
}

export const callClearLogsApi = () => {
  return Axios.get(API_BASE_URL + '/logs/clear')
}

export const callParseArticleApi = payload => {
  return Axios.post(API_BASE_URL + '/articles/parse', payload)
}

export const callGetNotesApi = payload => {
  return Axios.get(API_BASE_URL + '/notes', payload)
}

export const callPostCardApi = payload => {
  return Axios.post(API_BASE_URL + '/cards', payload)
}

export const callPutCardApi = (payload, cardId) => {
  return Axios.put(API_BASE_URL + `/cards/${cardId}`, payload)
}

export const callGetUserBoardsApi = userId => {
  return Axios.get(API_BASE_URL + `/boards/${userId}`)
}

export const callPostBoardApi = payload => {
  return Axios.post(API_BASE_URL + '/boards', payload)
}

export const callDeleteUserBoardApi = boardId => {
  return Axios.delete(API_BASE_URL + `/boards/${boardId}`)
}

/**
 * Calls the create new tree endpoint
 * @param {Object} payload Request payload
 * @param {string} payload.title Tree title
 * @param {string} payload.userID Tree owner userID
 * @param {Object} payload.representation Tree object representation
 */
export const callPostTreeApi = payload => {
  return Axios.post(API_BASE_URL + '/tree', payload)
}

/**
 * Fetches the tree with the provided ID
 * @param {string} treeID The ID of the tree being fetched
 */
export const callGetTreeByIdApi = treeID => {
  return Axios.get(API_BASE_URL + `/tree/${treeID}`)
}

/**
 * Calls the create new tree node endpoint
 * @param {Object} payload Request payload
 * @param {string} payload.title Node title
 * @param {string} payload.parent Node parent's nodeID
 * @param {Array<string>} payload.children Node's children nodeIDs
 */
export const callPostTreeNodeApi = payload => {
  return Axios.post(API_BASE_URL + '/node', payload)
}

/**
 * Gets all trees associated with the given userID
 * @param {string} userID The userID whose trees to get
 */
export const callGetUserTreesApi = userID => {
  return Axios.get(API_BASE_URL + `/tree/user/${userID}`)
}

/**
 * Updates the tree with given ID with the provided payload
 * @param {string} treeID The treeID to update
 * @param {Object} payload The treeID to update
 * @param {string=} payload.title The tree title
 * @param {Object=} payload.representation The tree object representation
 */
export const callPatchTreeApi = (treeID, payload) => {
  return Axios.patch(API_BASE_URL + `/tree/${treeID}`, payload)
}

export const callGetTagsApi = () => {
  return Axios.get('http://localhost:3007/tags')
}
