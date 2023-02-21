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

function queryFilter(contains_tags: string[], not_contains_tags: string[]) {
  if (contains_tags.length === 0 && not_contains_tags.length === 0) {
    return undefined
  }
  const contains_tags_filter = contains_tags.map(t => ({
    property: 'Tags',
    multi_select: {
      contains: t
    }
  }))
  const not_contains_tags_filter = not_contains_tags.map(t => ({
    property: 'Tags',
    multi_select: {
      does_not_contain: t
    }
  }))
  if (contains_tags.length === 0) {
    return {
      and: not_contains_tags_filter
    }
  }
  if (not_contains_tags.length === 0) {
    return {
      or: contains_tags_filter
    }
  }

  return {
    and: [
      {
        or: contains_tags_filter
      },
      {
        and: not_contains_tags_filter
      }
    ]
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
    const contains_tags = core
      .getMultilineInput('contains_tags', {
        required: false
      })
      .map(l => l.trim())
      .filter(l => l.length > 0)
    if (contains_tags) {
      core.info(`contains_tags: ${contains_tags.map(t => `"${t}"`).join(',')}`)
    } else {
      core.info(`contains_tags: none`)
    }
    const not_contains_tags = core
      .getMultilineInput('not_contains_tags', {
        required: false
      })
      .map(l => l.trim())
      .filter(l => l.length > 0)
    if (not_contains_tags) {
      core.info(
        `not_contains_tags: ${not_contains_tags.map(t => `"${t}"`).join(',')}`
      )
    } else {
      core.info(`not_contains_tags: none`)
    }
    const need_content = core.getBooleanInput('need_content', {required: false})

    const notionCli = new Client({auth: notionToken})

    const queryDatabase = async (cursor?: string) => {
      const res = await notionCli.databases.query({
        database_id: dbId,
        start_cursor: cursor,
        filter: queryFilter(contains_tags, not_contains_tags),
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
      if (!need_content) {
        return pageMeta
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
