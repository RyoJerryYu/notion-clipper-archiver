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
  handlePages: (pages: PageObjectResponse) => {res: Res; ok: boolean}
): Promise<Res[]> {
  const handledReses: Res[] = []

  const filterAndHandleResults = (queryRes: QueryDatabaseResponse) => {
    if (queryRes.results) {
      const pages = queryRes.results.filter(isFullPageOrWarning)
      for (const page of pages) {
        const {res: handledRes, ok} = handlePages(page)
        if (ok) {
          handledReses.push(handledRes)
        }
      }
    }
  }

  let res = await queryDatabase()
  filterAndHandleResults(res)

  while (res.has_more && res.next_cursor) {
    const cursor = res.next_cursor
    res = await queryDatabase(cursor)
    filterAndHandleResults(res)
  }
  return handledReses
}
