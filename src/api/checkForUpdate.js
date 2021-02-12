import agent from '../structures/agent'

const checkForUpdate = async (profiles, isTestFlight) => {
  const response = await agent('/check_for_update', {
    query: {
      is_testflight: Number(!!isTestFlight)
    }
  }, profiles)
  const data = await response.json()

  return data
}

export default checkForUpdate
