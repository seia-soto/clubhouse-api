import agent from '../structures/agent'

const block = async (profile, user) => {
  'use strict'

  const response = await agent(
    '/block',
    {
      body: {
        user_id: user || -1
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default block

export const specification = {
  success: Boolean
}
