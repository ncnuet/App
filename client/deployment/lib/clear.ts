
import axios, { AxiosError } from "axios"

const token = process.env.ACCESS_TOKEN

if (!token) {
  throw new Error("No token")
}

const base = "https://api.vercel.com"

let dryRun = true
if (process.env.NO_DRY_RUN === "true") {
  dryRun = false
}

const team_id = "team_XXX"
const project_id = "prj_dpOL1BDRXVdgXkyBdBacwXI1FWB0"

const vercelRestRequest = async <T>(
  method: "GET" | "DELETE",
  endpoint: string,
  otherParams?: Record<string, string | number>,
) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
    //   teamId: team_id,
      projectId: project_id,
      ...otherParams,
    },
  }

  const axiosFn = method === "DELETE" ? axios.delete : axios.get

  return axiosFn<T>(base + endpoint, config)
    .catch((error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        console.log(" error.response?.data: ", error.response?.data)
      } else {
        throw error
      }
    })
    .then((e) => {
      if (e) {
        return e.data
      } else {
        throw new Error("no data")
      }
    })
}

const getAliases = async (deploymentUid: string) => {
  const res = await vercelRestRequest<{ aliases: Alias[] }>(
    "GET",
    `/v2/deployments/${deploymentUid}/aliases`,
  )

  return res.aliases
}

const deleteDeployment = async (deploymentUid: string) => {
  const res = await vercelRestRequest<{ uid: string; state: "DELETED" }>(
    "DELETE",
    `/v13/deployments/${deploymentUid}`,
  )

  return res
}

const go = async () => {
  const aWeekAgo = new Date(new Date().setDate(new Date().getDate() - 2))

  const { deployments } = await vercelRestRequest<{
    deployments: Deployment[]
  }>("GET", "/v6/deployments", {
    target: "preview",
    until: aWeekAgo.getTime(),
  })

  for (const deployment of deployments) {
    const aliases = await getAliases(deployment.uid)

    if (aliases.length === 0) {
      console.log(
        "❌ deleting deployment: ",
        deployment.url,
        "aliases: ",
        aliases.length,
        dryRun ? "(dry run)" : "",
      )

      if (!dryRun) {
        await deleteDeployment(deployment.uid)
      }
    } else {
      console.log(
        "🌳 not deleting deployment: ",
        deployment.url,
        "aliases: ",
        aliases.length,
      )
    }
  }
}

void go()

// types stolen from cli package (https://github.dev/vercel/vercel/tree/main/packages/cli)

export type Alias = {
  uid: string
  alias: string
  createdAt: number
  deployment: {
    id: string
    url: string
  }
  creator: {
    uid: string
    username: string
    email: string
  }
  deploymentId?: string
}

export type Deployment = {
  uid: string
  url: string
  name: string
  type: "LAMBDAS"
  state: "BUILDING" | "ERROR" | "INITIALIZING" | "QUEUED" | "READY" | "CANCELED"
  version?: number
  created: number
  createdAt: number
  creator: { uid: string; username: string }
  target: string | null
  ownerId: string
  projectId: string
  inspectorUrl: string
  meta: {
    [key: string]: unknown
  }
}