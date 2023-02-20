import * as core from '@actions/core'
import {Client} from '@notionhq/client'
import {PageObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import {forEachPages} from './notion'

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

    const handlePages = (page: PageObjectResponse) => {
      const title = page.properties.Name
      if (!title || title.type !== 'title') {
        core.warning(`no title for page ${page.id}: ${JSON.stringify(title)}}`)
        return {res: '', ok: false}
      }

      const titleText = title.title
        .filter(t => t.type === 'text')
        .map(t => t.plain_text)
        .join('')
      core.info(`found page ${titleText}`)
      return {res: titleText, ok: true}
    }

    core.debug('querying database')
    const allTitles = await forEachPages(queryDatabase, handlePages)
    core.debug('querying database done')

    core.info(`found ${allTitles.length} pages`)

    core.setOutput('db_id', dbId)
    core.setOutput('titles', allTitles.join(','))
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed(`unknown error: ${error}`)
    }
  }
}

run()
