import fetch from 'cross-fetch'
import qs from 'qs'

const getStatic = (profile, url, options) => {
  'use strict'

  url = url || ''

  options = options || {}
  options.headers = options.headers || {}

  // NOTE: Clubhouse;
  options.headers['User-Agent'] = profile.userAgentStatic || 'Clubhouse/297 CFNetwork/1220.1 Darwin/20.3.0'
  // NOTE: Application;
  options.headers.Accept = profile.accept || 'application/json'
  options.headers['Accept-Encoding'] = profile.acceptEncodings || 'gzip, deflate, br'
  options.headers['Accept-Language'] = profile.acceptLanguages || 'ko-KR;q=1'
  // NOTE: Specification;
  options.headers.Connection = 'keep-alive'

  // NOTE: Body;
  if (options.body && typeof options.body === 'object') {
    options.method = 'POST'
    options.headers['Content-Type'] = 'application/json; charset=utf-8'
    options.body = JSON.stringify(options.body)
  }

  // NOTE: Querystring;
  if (options.query) {
    if (typeof options.query === 'object') {
      options.query = qs.stringify(options.query)
    }

    url += '?' + options.query

    delete options.query
  }

  return fetch(url, options)
}

export default getStatic
