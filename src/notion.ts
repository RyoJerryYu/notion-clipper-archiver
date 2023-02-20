import {isFullPage} from '@notionhq/client'
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse
} from '@notionhq/client/build/src/api-endpoints'
import * as core from '@actions/core'

function isFullPageOrWarning(
  result: PartialPageObjectResponse
): result is PageObjectResponse {
  if (!isFullPage(result)) {
    core.warning(
      `unexpected object type ${result.id}: ${JSON.stringify(result)}`
    )
    return false
  }
  return true
}

export async function forEachPages<Res>(
  queryDatabase: (cursor?: string) => Promise<QueryDatabaseResponse>,
  handlePages: (
    page: PageObjectResponse
  ) => Promise<{res: Res; ok: true} | {ok: false}>
): Promise<Res[]> {
  const handledReses: Res[] = []

  const filterAndHandleResults = async (queryRes: QueryDatabaseResponse) => {
    if (queryRes.results) {
      const pages = queryRes.results.filter(isFullPageOrWarning)
      for (const page of pages) {
        const handledRes = await handlePages(page)
        if (handledRes.ok) {
          handledReses.push(handledRes.res)
        }
      }
    }
  }

  let res = await queryDatabase()
  await filterAndHandleResults(res)

  while (res.has_more && res.next_cursor) {
    const cursor = res.next_cursor
    res = await queryDatabase(cursor)
    await filterAndHandleResults(res)
  }
  return handledReses
}

type WantedPage = {
  id: string
  title: string
  url: string
  tags?: string[]
  created_time?: string
}

export async function getResultFromPageResponse(
  page: PageObjectResponse
): Promise<{res: WantedPage; ok: true} | {ok: false}> {
  const titleProperty = page.properties.Name
  if (!titleProperty || titleProperty.type !== 'title') {
    core.warning(
      `no title for page ${page.id}: ${JSON.stringify(titleProperty)}}`
    )
    return {ok: false}
  }
  const title = titleProperty.title
    .filter(t => t.type === 'text')
    .map(t => t.plain_text)
    .join('')
  core.info(`found page ${title}`)

  const urlProperty = page.properties.URL
  if (!urlProperty || urlProperty.type !== 'url' || !urlProperty.url) {
    core.warning(`no url for page ${page.id}: ${JSON.stringify(urlProperty)}}`)
    return {ok: false}
  }
  const url = urlProperty.url

  const wantedRes: WantedPage = {
    id: page.id,
    title,
    url
  }

  const tagsProperty = page.properties.Tags
  if (tagsProperty && tagsProperty.type === 'multi_select') {
    const tags = tagsProperty.multi_select.map(t => t.name)
    wantedRes.tags = tags
  }

  const createdTimeProperty = page.properties.Created
  if (createdTimeProperty && createdTimeProperty.type === 'created_time') {
    wantedRes.created_time = createdTimeProperty.created_time
  }

  return {res: wantedRes, ok: true}
}
