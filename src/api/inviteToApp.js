import agent from '../structures/agent'

const inviteToApp = async (profile, contactName, phoneNumber) => {
  'use strict'

  const response = await agent('/invite_to_app', {
    body: {
      name: contactName,
      phone_number: phoneNumber
    }
  }, profile)
  const data = await response.json()

  return data
}

export default inviteToApp

export const specification = {
  success: Boolean
}