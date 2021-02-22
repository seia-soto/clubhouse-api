interface Locale { languages?: string, locale?: string, acceptLanguages?: string }
interface Application {
  apiRoot?: string
  userAgent?: string
  userAgentStatic?: string
  appVersion?: string
  appBuild?: string
  agoraKey?: string
  pubnubRoot?: string
  pubnubPubKey?: string
  pubnubSubKey?: string
  pubnubSDK?: string
  acceptEncodings?: string
}

type Profile = Application & Locale & {
  token?: string
  userId?: string
  deviceId?: string
  fetchOptions?: any
}

export declare const application: { a297: Application, a304: Application }
export declare const locales: { English: Locale, Korean: Locale }
