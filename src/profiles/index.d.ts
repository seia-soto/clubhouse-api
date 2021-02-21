type Locale = { languages: string, locale: string, acceptLanguages: string }
type Application = {
  apiRoot: string;
  userAgnet: string;
  userAgentStatic: string;
  appVersion: string;
  appBuild: string;
  agoraKey: string;
  pubnubRoot: string;
  pubnubPubKey: string;
  pubnubSubKey: string;
  pubnubSDK: string;
}

export declare const application: { a297: Application, a304: Application };
export declare const locales: { English: Locale, Korean: Locale };
