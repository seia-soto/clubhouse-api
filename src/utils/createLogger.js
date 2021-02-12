import debug from 'debug'

const name = 'sfa-p#clubhouse-api'

export default domain => {
  if (domain) {
    return debug(name + ':' + domain)
  }

  return debug(name)
}
