import agent from '../structures/agent'

const requestMobileAuthAgain = async (profile, phoneNumber) => {
  'use strict'

  const response = await agent('/resend_phone_number_auth', {
    body: {
      phone_number: phoneNumber // NOTE: +(Nation)(Numbers) e.g. Korean 010 1234 5678 -> +821012345678
    }
  }, profile)
  const data = await response.json()

  return data
}

export default requestMobileAuthAgain

export const specification = {
  success: Boolean,
  error_message: String
}
