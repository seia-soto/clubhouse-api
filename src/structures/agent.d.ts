import fetch  from "cross-fetch"
import { Profile } from "../profiles"

export default function agent(url: string, options: any, customs: Profile): ReturnType<typeof fetch>
