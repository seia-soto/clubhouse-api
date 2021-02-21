type ClubhouseApiResult<T> = ({ success: true } & T) |
  { success: false, error_message: string };

export declare class Client {
  constructor(params: { profile: any });
  [k: string]: <T>(...params: any) => Promise<ClubhouseApiResult<T>>;
}
