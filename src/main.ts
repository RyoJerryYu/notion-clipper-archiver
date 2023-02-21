import * as core from '@actions/core'
import * as io from '@actions/io'
import * as path from 'path'
import * as fs from 'fs'
import * as util from 'util'
import {Client} from '@notionhq/client'
import {PageObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import {NotionToMarkdown} from 'notion-to-md'
import {forEachPages, getMetaFromPage} from './notion'

const writeFileAsync = util.promisify(fs.writeFile)

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
    const dbId: string = core.getInput('database_id', {required: true})
    core.info(`querying database ${dbId}`)
    const notionToken: string = core.getInput('notion_token', {required: true})
    core.setSecret(notionToken)
    core.info(`using token ${notionToken}`)
    const save_dir = core.getInput('save_dir', {required: true})
    core.info(`saving to ${save_dir}`)
    const file_name = core.getInput('file_name', {required: true})
    core.info(`saving to ${file_name}`)
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
      if (!pageMeta) {
        return
      }
      const content = await n2m.pageToMarkdown(page.id)
      const mdString = n2m.toMarkdownString(content)
      return {...pageMeta, content: mdString}
    }

    core.debug('querying database')
    const allReses = await forEachPages(queryDatabase, getWantedFromPage)
    core.debug('querying database done')

    core.info(`found ${allReses.length} pages`)

    await io.mkdirP(save_dir)
    const save_path = path.join(save_dir, file_name)
    core.info(`saving to ${save_path}`)

    await writeFileAsync(save_path, JSON.stringify(allReses, null, 2))

    core.setOutput('db_id', dbId)
    core.setOutput('save_path', save_path)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed(`unknown error: ${error}`)
    }
  }
}

run()
