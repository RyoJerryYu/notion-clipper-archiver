import {
  PageObjectResponse,
  QueryDatabaseResponse
} from '@notionhq/client/build/src/api-endpoints'
import {forEachPages, getMetaFromPage} from '../src/notion'

const queryDatabaseResponseExample: QueryDatabaseResponse = {
  object: 'list',
  results: [
    {
      object: 'page',
      id: '72f156b1-ceeb-4243-8765-8b9660542da4',
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      cover: null,
      icon: null,
      parent: {
        type: 'database_id',
        database_id: 'e5ad3b3b-703d-4d13-878d-d9c86f0b14e2'
      },
      archived: false,
      properties: {
        URL: {
          id: 'c%3AsY',
          type: 'url',
          url: 'https://docs.ipfs.tech/install/command-line/#system-requirements'
        },
        Created: {
          id: 'c%3Dh%60',
          type: 'created_time',
          created_time: '2023-02-16T07:42:00.000Z'
        },
        Tags: {
          id: 'ofPZ',
          type: 'multi_select',
          multi_select: [
            {
              id: '5855d0d7-db54-4337-afe8-1f3bea87b5d2',
              name: 'ipfs',
              color: 'default'
            }
          ]
        },
        Name: {
          id: 'title',
          type: 'title',
          title: [
            {
              type: 'text',
              text: {content: 'Kubo | IPFS Docs', link: null},
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default'
              },
              plain_text: 'Kubo | IPFS Docs',
              href: null
            }
          ]
        }
      },
      url: 'https://www.notion.so/Kubo-IPFS-Docs-72f156b1ceeb424387658b9660542da4'
    }
  ],
  next_cursor: null,
  has_more: false,
  type: 'page',
  page: {}
}

test('forEachPages', async () => {
  const queryDatabase = async (cursor?: string) => {
    return queryDatabaseResponseExample
  }

  const handlePages = async (page: PageObjectResponse) => {
    const title = page.properties.Name
    if (!title || title.type !== 'title') {
      return {res: '', ok: false}
    }

    const titleText = title.title
      .filter(t => t.type === 'text')
      .map(t => t.plain_text)
      .join('')
    return {res: titleText, ok: true}
  }

  const allTitles = await forEachPages(queryDatabase, handlePages)
  expect(allTitles).toEqual(['Kubo | IPFS Docs'])
})

const pageObjectResponseExample: PageObjectResponse = {
  object: 'page',
  id: '72f156b1-ceeb-4243-8765-8b9660542da4',
  created_time: '2023-02-16T07:42:00.000Z',
  last_edited_time: '2023-02-16T07:42:00.000Z',
  created_by: {
    object: 'user',
    id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
  },
  last_edited_by: {
    object: 'user',
    id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
  },
  cover: null,
  icon: null,
  parent: {
    type: 'database_id',
    database_id: 'e5ad3b3b-703d-4d13-878d-d9c86f0b14e2'
  },
  archived: false,
  properties: {
    URL: {
      id: 'c%3AsY',
      type: 'url',
      url: 'https://docs.ipfs.tech/install/command-line/#system-requirements'
    },
    Created: {
      id: 'c%3Dh%60',
      type: 'created_time',
      created_time: '2023-02-16T07:42:00.000Z'
    },
    Tags: {
      id: 'ofPZ',
      type: 'multi_select',
      multi_select: [
        {
          id: '5855d0d7-db54-4337-afe8-1f3bea87b5d2',
          name: 'ipfs',
          color: 'default'
        }
      ]
    },
    Name: {
      id: 'title',
      type: 'title',
      title: [
        {
          type: 'text',
          text: {content: 'Kubo | IPFS Docs', link: null},
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default'
          },
          plain_text: 'Kubo | IPFS Docs',
          href: null
        }
      ]
    }
  },
  url: 'https://www.notion.so/Kubo-IPFS-Docs-72f156b1ceeb424387658b9660542da4'
}

test('getMetaFromPage', async () => {
  const meta = await getMetaFromPage(pageObjectResponseExample)
  expect(meta.ok).toBe(true)
  if (!meta.ok) {
    return
  }

  expect(meta.res).toEqual({
    id: '72f156b1-ceeb-4243-8765-8b9660542da4',
    title: 'Kubo | IPFS Docs',
    url: 'https://docs.ipfs.tech/install/command-line/#system-requirements',
    created_time: '2023-02-16T07:42:00.000Z',
    tags: ['ipfs']
  })
})
