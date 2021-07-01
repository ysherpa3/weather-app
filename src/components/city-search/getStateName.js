// Returns full state name given a states' 2-letter abbreviation

import statesList from "../../../content/us-states.json"

export const getStateName = abbr => {
  const stateName = statesList
    .filter(state => state.abbreviation === abbr)
    .map(state => state.name)

  return stateName
}
