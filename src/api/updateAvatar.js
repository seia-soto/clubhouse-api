import FormData from 'form-data'
import { customAlphabet } from 'nanoid'

import agent from '../structures/agent'

const random = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 16)

const updateAvatar = async (profile, buffer) => {
  'use strict'

  const form = new FormData()
  const boundary = 'Boundary+' + random()

  form._boundary = boundary // NOTE: `form.setBoundary` isn't implemented, yet.
  form.append('file', buffer, {
    // NOTE: I recommend you not to change below to make sure you're not in a third party client.
    /*
    <RAW>
      --Boundary+2086F1E6D4069AD2 // NOTE: The string after + sign should be random.
      Content-Disposition: form-data; name="file"; filename="image.jpg"
      Content-Type: image/jpeg // INFO: Clubhouse server isn't accepting any format except for JPEG. (Don't know why)
    */
    contentType: 'image/jpeg',
    name: 'file',
    filename: 'image.jpg'
  })

  const response = await agent(
    '/update_photo',
    {
      method: 'POST',
      body: form
    },
    {
      ...profile,
      _preventBodySerialization: true
    }
  )
  const data = await response.json()

  return data
}

export default updateAvatar

export const specification = {
  photo_url: String,
  success: Boolean
}
