import * as core from '@actions/core'
import {Client} from '@notionhq/client'
import {PageObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import {NotionToMarkdown} from 'notion-to-md'
import {forEachPages, getMetaFromPage} from './notion'

function queryFilter() {
  return {
    property: 'Tags',
    multi_select: {
      contains: 'ipfs'
    }
  }
}

function querySorts(): {property: string; direction: 'descending'}[] {
  return [
    {
      property: 'Created',
      direction: 'descending'
    }
  ]
}

async function run(): Promise<void> {
  try {
    const dbId: string = core.getInput('database_id')
    core.info(`querying database ${dbId}`)
    const notionToken: string = core.getInput('notion_token')
    core.setSecret(notionToken)
    core.info(`using token ${notionToken}`)
    const notionCli = new Client({auth: notionToken})

    const queryDatabase = async (cursor?: string) => {
      const res = await notionCli.databases.query({
        database_id: dbId,
        start_cursor: cursor,
        filter: queryFilter(),
        sorts: querySorts()
      })

      core.info(`querying database ${dbId} done: ${JSON.stringify(res)}`)
      return res
    }

    const n2m = new NotionToMarkdown({
      notionClient: notionCli
    })

    const getWantedFromPage = async (page: PageObjectResponse) => {
      const pageMeta = await getMetaFromPage(page)
      const content = await n2m.pageToMarkdown(page.id)
      const mdString = n2m.toMarkdownString(content)
      return {...pageMeta, content: mdString}
    }

    core.debug('querying database')
    const allReses = await forEachPages(queryDatabase, getWantedFromPage)
    core.debug('querying database done')

    core.info(`found ${allReses.length} pages`)

    core.setOutput('db_id', dbId)
    core.info(`allreses: ${JSON.stringify(allReses)}`)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed(`unknown error: ${error}`)
    }
  }
}

run()
