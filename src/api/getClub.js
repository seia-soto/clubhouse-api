import agent from '../structures/agent'

const getClub = async (profile, opts) => { // NOTE: opts = Number | Object;
  'use strict'

  if (typeof opts === 'number') {
    opts = {
      clubId: opts
    }
  }

  opts = opts || {}

  const response = await agent(
    '/get_club',
    {
      body: {
        club_id: opts.clubId || -1,
        source_topic_id: opts.sourceTopicId || null
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default getClub

export const specification = {
  added_by_user_profile: null,
  club: {
    club_id: Number,
    description: String,
    enable_private: Boolean,
    is_community: Boolean,
    is_follow_allowed: Boolean,
    is_membership_private: Boolean,
    name: String,
    num_followers: Number,
    num_members: Number,
    num_online: Number,
    photo_url: String,
    rules: [
      {
        desc: String,
        title: String
      }
    ]
  },
  invite_link: null,
  is_admin: Boolean,
  is_follower: Boolean,
  is_member: Boolean,
  is_pending_accept: Boolean,
  is_pending_approval: Boolean,
  member_user_ids: [
    Number // User ID;
  ],
  num_invites: Number,
  success: Boolean,
  topics: [
    {
      abbreviated_title: String,
      id: Number,
      title: String
    }
  ]
}
