import {Client} from '@notionhq/client'
import * as core from '@actions/core'

const notion = new Client({
  auth: 'test'
})

const databaseId = 'test'

export async function addItem(text: string) {
  try {
    const response = await notion.pages.create({
      parent: {database_id: databaseId},
      properties: {
        title: {
          title: [
            {
              text: {
                content: text
              }
            }
          ]
        }
      }
    })

    core.debug(JSON.stringify(response, null, 2))
    core.debug('Success! Entry added.')
  } catch (error: any) {
    core.error(error.body)
  }
}
