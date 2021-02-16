import agent from '../structures/agent'

const checkWaitlistStatus = async (profile, name) => {
  'use strict'

  const response = await agent(
    '/check_waitlist_status',
    {},
    {
      ...profile,
      userId: '(null)'
    }
  )
  const data = await response.json()

  return data
}

export default checkWaitlistStatus

export const specification = {
  is_onborading: Boolean,
  is_waitlisted: Boolean,
  success: Boolean
}
