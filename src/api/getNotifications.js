import agent from '../structures/agent'

const getNotifications = async (profile, opts) => { // NOTE: opts = Number | Object;
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

export default getNotifications

export const specification = {
  count: Number,
  next: Number,
  notifications: [
    { // NOTE: Type 16 = When event created;
      event_id: Number,
      is_unread: Boolean,
      message: String,
      notification_id: Number,
      time_created: String, // 2021-02-12T15:20:00+00:00
      type: 16,
      user_profile: {
        name: String,
        photo_url: String,
        user_id: Number,
        username: String
      }
    },
    { // NOTE: Type 3 = When someone started channel;
      channel: String,
      is_unread: Boolean,
      message: String,
      notification_id: Number,
      time_created: String, // 2021-02-12T15:20:00+00:00
      typed: 3,
      user_profile: {
        name: String,
        photo_url: String,
        user_id: Number,
        username: String
      }
    },
    { // NOTE: Type 1 = When someone followed me;
      is_unread: Boolean,
      message: String,
      notification_id: Number,
      time_created: String, // 2021-02-12T15:20:00+00:00
      type: 1,
      user_profile: {
        name: String,
        photo_url: String,
        user_id: Number,
        username: String
      }
    }
  ],
  previous: Number,
  success: Boolean
}
