import agent from '../structures/agent'

const getSuggestedInvites = async (profile, contacts) => {
  'use strict'

  const response = await agent(
    '/get_suggested_invites',
    {
      body: {
        club_id: null, // NOTE: This API is still private even for normal user;
        upload_contacts: true,
        contacts/*: [
          phone_number: String // +821012345678
        ]
        */
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default getSuggestedInvites

export const specification = {
  num_invites: Number,
  suggested_invites: [
    {
      phone_number: String, // +821012345678
      in_app: Boolean,
      is_invited: Boolean,
      num_friends: Number
    }
  ],
  success: Boolean
}
