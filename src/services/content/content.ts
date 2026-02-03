import { homeContent } from './content.local'
import { HomeContent } from './types'

export async function getHomeContent(): Promise<HomeContent> {
    return Promise.resolve(homeContent)
}

export * from './types'
