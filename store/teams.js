// Actions
const TOGGLE_ACTIVE_TEAM = "TOGGLE_ACTIVE_TEAM";

// Reducer

// Action Creators
export function toggleActiveTeam(team) {
  return { type: TOGGLE_ACTIVE_TEAM, team }
}