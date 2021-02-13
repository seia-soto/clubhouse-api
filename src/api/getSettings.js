import agent from '../structures/agent'

const getSettings = async profile => {
  'use strict'

  const response = await agent('/get_settings', {}, profile)
  const data = await response.json()

  return data
}

export default getSettings

export const specification = {
  notification_enabled: Boolean,
  notification_frequency: Number, // minus-two to plus-two including zero
  notification_is_paused: Boolean,
  success: Boolean
}
