import { Profile } from "../profiles";

type ClubhouseApiResult<T> = ({ success: true } & T) |
  { success: false, error_message: string }

export declare class Client {
  constructor (options: { profile: Profile })
  [k: string]: <T>(...params: any) => Promise<ClubhouseApiResult<T>>
}
