import axios from "axios"
import { GetServerSidePropsContext, PreviewData } from "next"
import { parseCookies } from "nookies"
import { ParsedUrlQuery } from "querystring"

export const controller = new AbortController()

export function api(
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  const { "nextauth.token": token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
  })

  // api.interceptors.request.use((config) => {
  //   console.log(config)
  //   return config
  // })

  api.defaults.headers.common["Acess-Control-Allow-Origin"] = "*"
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`

  return api
}
