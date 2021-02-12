import fetch from 'node-fetch'
import { v4 as uuidv4 } from 'uuid'

const agent = (url, options, customs) => {
  'use strict'

  url = 'https://www.clubhouseapi.com/api' + (url || '')

  options.headers = options?.headers || {}

  options.headers['User-Agent'] = customs?.userAgent || 'clubhouse/297 (iPhone; iOS 14.4; Scale/2.00)'
  options.headers['CH-Languages'] = customs?.languages || 'en-US'
  options.headers['CH-Locale'] = customs?.locale || 'en_US'
  options.headers['CH-AppVersion'] = customs?.appVersion || '0.1.27'
  options.headers['CH-AppBuild'] = customs?.appBuild || '297'
  options.headers['CH-DeviceId'] = customs?.deviceId || uuidv4().toUpperCase()
  options.headers['CH-UserID'] = customs?.userId || '(null)'
  options.headers.Authorization = customs?.token
  options.headers.Accept = customs?.accept || 'application/json'
  options.headers['Accept-Encoding'] = customs?.acceptEncodings || 'gzip, deflate, br'
  options.headers['Accept-Language'] = customs?.acceptLanguages || 'ko-KR;q=1'
  options.headers.Connection = 'keep-alive'

  if (options.body && typeof options.body === 'object') {
    options.headers['Content-Type'] = 'application/json; charset=utf-8'
    options.body = JSON.stringify(options.body)
  }

  return fetch(url, options)
}

export default agent
