import agent from '../structures/agent'

const getProfile = async (profile, id) => {
  'use strict'

  const response = await agent(
    '/get_profile',
    {
      body: {
        user_id: id
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default getProfile

export const specification = {
  user_profile: {
    user_id: Number,
    name: String,
    displayname: String,
    photo_url: String,
    username: String,
    bio: String,
    twitter: String,
    instagram: String,
    num_followers: Number,
    num_followings: Number,
    time_created: String, // 2021-02-06T19:52:57.099981+00:00
    follows_me: Boolean,
    is_blocked_by_network: Boolean,
    mutual_follows_count: Number,
    mutual_follows: [], // unknown;
    notification_type: null, // unknown;
    invited_by_user_profile: {
      user_id: Number,
      name: String,
      photo_url: String,
      username: String
    },
    clubs: [
      {
        club_id: Number,
        name: String,
        description: String,
        photo_url: String,
        num_members: Number,
        num_followers: Number,
        enable_private: Boolean,
        is_follow_allowed: Boolean,
        is_membership_private: Boolean,
        is_community: Boolean,
        rules: [], // unknown;
        num_online: Number
      }
    ],
    has_verified_email: Boolean,
    can_edit_username: Boolean,
    can_edit_name: Boolean,
    can_edit_displayname: Boolean,
    topics: [
      {
        title: String,
        id: Number,
        abbreviated_title: String
      }
    ]
  },
  success: Boolean
}
