import agent from '../structures/agent'

const getActionableNotifications = async (profile, opts) => { // NOTE: opts = Number | Object;
  'use strict'

  if (typeof opts === 'number') {
    opts = {
      userId: opts
    }
  }

  opts = opts || {}

  const response = await agent(
    '/follow',
    {
      page_size: opts.size || 20,
      page: opts.page || 1
    },
    profile
  )
  const data = await response.json()

  return data
}

export default getActionableNotifications

export const specification = {
  count: Number,
  next: Number,
  notifications: [],
  previous: Number,
  success: Boolean
}
