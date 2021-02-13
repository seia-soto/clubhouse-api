import agent from '../structures/agent'

const completeMobileAuth = async (profile, phoneNumber, code) => {
  'use strict'

  const response = await agent('/complete_phone_number_auth', {
    body: {
      verification_code: code,
      phone_number: phoneNumber // NOTE: +(Nation)(Numbers) e.g. Korean 010 1234 5678 -> +821012345678
    }
  }, profile)
  const data = await response.json()

  return data
}

export default completeMobileAuth

export const specification = {
  success: Boolean,
  is_verified: Boolean,
  user_profile: {
    user_id: Number,
    name: String,
    photo_url: String,
    username: String
  },
  auth_token: String, // (approx) MD5 hash of Token
  refresh_token: String, // JsonWebToken
  access_token: String, // JsonWebToken
  is_waitlisted: Boolean,
  is_onboarding: Boolean, // isFirstLogin
  number_of_attempts_remaining: Number // (approx) applied when only 3 times remained
}
