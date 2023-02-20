import * as core from '@actions/core'
import {Client, isFullPage} from '@notionhq/client'

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

    const allTitles: string[] = []
    core.debug('querying database')
    let res = await notionCli.databases.query({
      database_id: dbId,
      filter: queryFilter(),
      sorts: querySorts()
    })
    core.debug('querying database done')
    core.info(JSON.stringify(res))

    if (res.results) {
      for (const result of res.results) {
        if (!isFullPage(result)) {
          core.warning(`unexpected object type ${result.id}`)
          continue
        }

        const title = result.properties.Name
        if (!title || title.type !== 'title') {
          core.warning(
            `no title for page ${result.id}: ${JSON.stringify(title)}}`
          )
          continue
        }

        const titleText = title.title
          .filter(t => t.type === 'text')
          .map(t => t.plain_text)
          .join('')
        core.info(`found page ${titleText}`)
        allTitles.push(titleText)
      }
    }

    core.info(`found ${allTitles.length} pages`)

    while (res.has_more && res.next_cursor) {
      core.warning('has more')
      const cursor = res.next_cursor

      res = await notionCli.databases.query({
        database_id: dbId,
        start_cursor: cursor
      })

      if (res.results) {
        for (const result of res.results) {
          if (!isFullPage(result)) {
            core.warning(`unexpected object type ${result.id}`)
            continue
          }

          const title = result.properties.Name
          if (!title || title.type !== 'title') {
            core.warning(
              `no title for page ${result.id}: ${JSON.stringify(title)}`
            )
            continue
          }

          const titleText = title.title
            .filter(t => t.type === 'text')
            .map(t => t.plain_text)
            .join('')
          core.info(`found page ${titleText}`)
          allTitles.push(titleText)
        }
      }
    }

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
