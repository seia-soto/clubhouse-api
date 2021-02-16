import agent from '../structures/agent'

const updateUsername = async (profile, name) => {
  'use strict'

  const response = await agent(
    '/update_username',
    {
      body: {
        twitter_secret: null,
        twitter_token: null,
        username: name || null // NOTE: Max 16 character.
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default updateUsername

export const specification = {
  error_message: String,
  success: Boolean
}
