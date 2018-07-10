// Actions
// FIXME: Move these to seperate file?
const SET_PROJECT_FILTER = "SET_PROJECT_FILTER";
const SET_PROJECT_SEARCHTERM = "SET_PROJECT_SEARCHTERM";
const SET_PROJECT_SORT = "SET_PROJECT_SORT";

// Action constants
export const ProjectFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_OUTSTANDING: 'SHOW_OUTSTANDING',
  SHOW_WON: 'SHOW_WON',
  SHOW_LOST: 'SHOW_LOST',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_CLOSED: 'SHOW_CLOSED'
}

const initialState = {
  filter: ProjectFilters.SHOW_ALL,
  term: '',
  sort: 'alphabetical'
}

// Reducer
const interfaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT_FILTER:
      return Object.assign({}, state, {
        filter: action.filter
      });
    case SET_PROJECT_SEARCHTERM:
      return Object.assign({}, state, {
        term: action.term
      });
    case SET_PROJECT_SORT:
      return Object.assign({}, state, {
        sort: action.sort
      });
    default:
      return state;
  }
}

export default interfaceReducer;

// Action Creators
export function setProjectFilter (filter) {
  return { type: SET_PROJECT_FILTER, filter }
}

export function setProjectSearchTerm (term) {
  return { type: SET_PROJECT_SEARCHTERM, term }
}

export function setProjectSort (sortorder) {
  return { type: SET_PROJECT_SORT, sortorder }
}