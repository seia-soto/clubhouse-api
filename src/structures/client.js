import { v4 as uuidv4 } from 'uuid'

export default class Client {
  constructor (opts) {
    opts = opts || {}

    opts.uuid = opts.uuid || uuidv4()
  }
}
