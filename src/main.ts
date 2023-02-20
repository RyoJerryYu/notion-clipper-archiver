import * as core from '@actions/core'
import {Client} from '@notionhq/client'
import {forEachPages, getResultFromPageResponse} from './notion'

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

    core.debug('querying database')
    const allReses = await forEachPages(
      queryDatabase,
      getResultFromPageResponse
    )
    core.debug('querying database done')

    core.info(`found ${allReses.length} pages`)

    core.setOutput('db_id', dbId)
    core.info(`allreses: ${JSON.stringify(allReses)}`)

    core.info(`start test get content`)
    const pageId = allReses[0].id
    core.info(`pageId: ${pageId}`)

    const retrieveBlockResponse = await notionCli.blocks.children.list({
      block_id: pageId
    })
    core.info(`retrieveBlockResponse: ${JSON.stringify(retrieveBlockResponse)}`)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed(`unknown error: ${error}`)
    }
  }
}

run()
