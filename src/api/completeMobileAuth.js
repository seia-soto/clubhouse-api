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
