import {
  PageObjectResponse,
  QueryDatabaseResponse
} from '@notionhq/client/build/src/api-endpoints'
import {forEachPages} from '../src/notion'

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

const retrieveBlockChildrenResponseExample = {
  object: 'list',
  results: [
    {
      object: 'block',
      id: '062ff6ce-010a-4cbb-a26f-fe593b969c40',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'WARNING', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'WARNING',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: 'bf0202db-ab9c-4ad3-a466-646e890150b1',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'Building from source is only recommended if you are running Kubo on a system with severe resource constraints, or are contributing to the Kubo project.',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              'Building from source is only recommended if you are running Kubo on a system with severe resource constraints, or are contributing to the Kubo project.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '7d07bf00-5499-4f04-bac1-957a1caa129e',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'heading_2',
      heading_2: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'System requirements', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'System requirements',
            href: null
          }
        ],
        is_toggleable: false,
        color: 'default'
      }
    },
    {
      object: 'block',
      id: 'b93c1441-d238-4864-9a67-3ada41ae0e1d',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'Kubo runs on most Windows, MacOS, Linux, FreeBSD and OpenBSD systems that meet the following requirements:',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              'Kubo runs on most Windows, MacOS, Linux, FreeBSD and OpenBSD systems that meet the following requirements:',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '17862e72-3f05-4616-9a23-eab99bd80145',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          {
            type: 'text',
            text: {content: '6 GiB of memory.', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '6 GiB of memory.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: 'c779196d-83c3-4166-ab1f-405788965028',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: '2 CPU cores (kubo is highly parallel).',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '2 CPU cores (kubo is highly parallel).',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '20a1bb27-b9a2-4a71-94e4-c93c36f28e60',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'Note the following:', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Note the following:',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '39e42d2c-bd09-4d43-b712-f7d8281687d5',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                "The amount of disk space your IPFS installation uses depends on how much data you're sharing. A base installation uses around 12MB of disk space.",
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              "The amount of disk space your IPFS installation uses depends on how much data you're sharing. A base installation uses around 12MB of disk space.",
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '4ada861a-7070-459b-8872-ad9550bfce18',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: 'You can enable automatic garbage collection via ',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'You can enable automatic garbage collection via ',
            href: null
          },
          {
            type: 'text',
            text: {
              content: '-enable-gc',
              link: {
                url: 'https://docs.ipfs.tech/reference/kubo/cli/#ipfs-daemon'
              }
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '-enable-gc',
            href: 'https://docs.ipfs.tech/reference/kubo/cli/#ipfs-daemon'
          },
          {
            type: 'text',
            text: {content: ' and adjust using ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' and adjust using ',
            href: null
          },
          {
            type: 'text',
            text: {
              content: 'default maximum disk storage',
              link: {
                url: 'https://github.com/ipfs/kubo/blob/v0.18.1/docs/config.md#datastorestoragemax'
              }
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'default maximum disk storage',
            href: 'https://github.com/ipfs/kubo/blob/v0.18.1/docs/config.md#datastorestoragemax'
          },
          {
            type: 'text',
            text: {
              content: ' for data retrieved from other peers.',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' for data retrieved from other peers.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: 'cc60fb67-154c-4ebb-ab2e-11ae3d4d440f',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'heading_3',
      heading_3: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'Kubo on resource-constrained systems', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Kubo on resource-constrained systems',
            href: null
          }
        ],
        is_toggleable: false,
        color: 'default'
      }
    },
    {
      object: 'block',
      id: 'c0effdd6-9731-4251-a20e-6ffdd71c6748',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'If you are running Kubo on a resource-constrained system (such as a Raspberry Pi), you should initialize your daemon with the ',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              'If you are running Kubo on a resource-constrained system (such as a Raspberry Pi), you should initialize your daemon with the ',
            href: null
          },
          {
            type: 'text',
            text: {content: 'lowpower', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: 'lowpower',
            href: null
          },
          {
            type: 'text',
            text: {content: ' profile.', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' profile.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '7f499273-efcb-4eb6-b964-0476fa582a9d',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'code',
      code: {
        caption: [],
        rich_text: [
          {
            type: 'text',
            text: {content: 'ipfs init --profile=lowpower\n', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'ipfs init --profile=lowpower\n',
            href: null
          }
        ],
        language: 'plain text'
      }
    },
    {
      object: 'block',
      id: '7d044a11-cb0d-46f5-8cb4-13b17ae21bd5',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'This reduces daemon overhead on the system but may degrade content discovery and data fetching performance.',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              'This reduces daemon overhead on the system but may degrade content discovery and data fetching performance.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: 'c24bac98-d79e-49e0-83d2-1c2866b592e8',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'heading_2',
      heading_2: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: 'Install official binary distributions',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Install official binary distributions',
            href: null
          }
        ],
        is_toggleable: false,
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '6a1b8de8-3b7b-4edc-b337-2e0360bf7050',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'This section describes how to download and install the Kubo binary from ',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              'This section describes how to download and install the Kubo binary from ',
            href: null
          },
          {
            type: 'text',
            text: {content: 'dist.ipfs.tech', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: 'dist.ipfs.tech',
            href: null
          },
          {
            type: 'text',
            text: {
              content:
                ' on Windows, MacOS, Linux, FreeBSD and OpenBSD operating systems. The IPFS team publishes the latest, official prebuilt Kubo binaries on the ',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              ' on Windows, MacOS, Linux, FreeBSD and OpenBSD operating systems. The IPFS team publishes the latest, official prebuilt Kubo binaries on the ',
            href: null
          },
          {
            type: 'text',
            text: {
              content: 'dist.ipfs.tech website',
              link: {url: 'https://dist.ipfs.tech/#kubo'}
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'dist.ipfs.tech website',
            href: 'https://dist.ipfs.tech/#kubo'
          },
          {
            type: 'text',
            text: {
              content:
                '. New IPFS Kubo binary releases are automatically shown on the Kubo page on ',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              '. New IPFS Kubo binary releases are automatically shown on the Kubo page on ',
            href: null
          },
          {
            type: 'text',
            text: {content: 'dist.ipfs.tech', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: 'dist.ipfs.tech',
            href: null
          },
          {
            type: 'text',
            text: {content: '.', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '46e9163d-2c36-4e78-8bd0-25188625ff7c',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'If you are unable to access ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'If you are unable to access ',
            href: null
          },
          {
            type: 'text',
            text: {
              content: 'dist.ipfs.tech',
              link: {url: 'https://dist.ipfs.tech/#kubo'}
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'dist.ipfs.tech',
            href: 'https://dist.ipfs.tech/#kubo'
          },
          {
            type: 'text',
            text: {
              content:
                ", you can also download Kubo (go-ipfs) from the project's GitHub ",
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              ", you can also download Kubo (go-ipfs) from the project's GitHub ",
            href: null
          },
          {
            type: 'text',
            text: {
              content: 'releases',
              link: {url: 'https://github.com/ipfs/kubo/releases/latest'}
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'releases',
            href: 'https://github.com/ipfs/kubo/releases/latest'
          },
          {
            type: 'text',
            text: {content: ' page or ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' page or ',
            href: null
          },
          {
            type: 'text',
            text: {content: '/ipns/dist.ipfs.tech', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: '/ipns/dist.ipfs.tech',
            href: null
          },
          {
            type: 'text',
            text: {content: ' at the ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' at the ',
            href: null
          },
          {
            type: 'text',
            text: {
              content: 'dweb.link',
              link: {url: 'https://dweb.link/ipns/dist.ipfs.tech#kubo'}
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'dweb.link',
            href: 'https://dweb.link/ipns/dist.ipfs.tech#kubo'
          },
          {
            type: 'text',
            text: {content: ' gateway.', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' gateway.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: 'cfbcefc7-0eee-46a4-b4b4-564cfc6f7e46',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'Binaries are available for the following operating systems:',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              'Binaries are available for the following operating systems:',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '3b301967-3466-4105-9d7b-585788e8e440',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: true,
      archived: false,
      type: 'table',
      table: {table_width: 5, has_column_header: false, has_row_header: false}
    },
    {
      object: 'block',
      id: '396c2be1-a0b4-4e45-8a98-de9a7c47cfbf',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'For installation instructions for your operating system, select the appropriate tab.',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              'For installation instructions for your operating system, select the appropriate tab.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '2dd0b3bd-a7a8-4e4c-8002-e9173c70d0d7',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'heading_3',
      heading_3: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'Windows', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Windows',
            href: null
          }
        ],
        is_toggleable: false,
        color: 'default'
      }
    },
    {
      object: 'block',
      id: 'b1fb8736-91a7-4919-b6b4-ff5ad8ee2562',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: true,
      archived: false,
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'Download the Windows binary from ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Download the Windows binary from ',
            href: null
          },
          {
            type: 'text',
            text: {
              content: 'dist.ipfs.tech',
              link: {url: 'https://dist.ipfs.tech/#kubo'}
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: 'dist.ipfs.tech',
            href: 'https://dist.ipfs.tech/#kubo'
          },
          {
            type: 'text',
            text: {content: '.', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '.',
            href: null
          },
          {
            type: 'text',
            text: {content: '', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '3f9adabf-7dd9-4b1f-8e65-ce3c0fa04f25',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: true,
      archived: false,
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: 'Unzip the file to a sensible location, such as ',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Unzip the file to a sensible location, such as ',
            href: null
          },
          {
            type: 'text',
            text: {content: '~\\Apps\\kubo_v0.18.1', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: '~\\Apps\\kubo_v0.18.1',
            href: null
          },
          {
            type: 'text',
            text: {content: '.', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '.',
            href: null
          },
          {
            type: 'text',
            text: {content: '', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '5fea3fcf-43b9-4e34-ad1c-0dbef0759618',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: true,
      archived: false,
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'Move into the ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Move into the ',
            href: null
          },
          {
            type: 'text',
            text: {content: 'kubo_v0.18.1', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: 'kubo_v0.18.1',
            href: null
          },
          {
            type: 'text',
            text: {content: ' folder', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' folder',
            href: null
          },
          {
            type: 'text',
            text: {content: '', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '7123f7ff-9909-4565-b25f-69b1ecee7f17',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: true,
      archived: false,
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'Check that the ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Check that the ',
            href: null
          },
          {
            type: 'text',
            text: {content: 'ipfs.exe', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: 'ipfs.exe',
            href: null
          },
          {
            type: 'text',
            text: {content: ' works:', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' works:',
            href: null
          },
          {
            type: 'text',
            text: {content: '', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '4d476a32-08b3-4bb1-a0c2-f932fc986db6',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: true,
      archived: false,
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'Save the current working directory into a temporary variable:',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              'Save the current working directory into a temporary variable:',
            href: null
          },
          {
            type: 'text',
            text: {content: '', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: 'f5011963-b8bd-4148-8b07-b21f47583f69',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: true,
      archived: false,
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'Create a powershell profile:', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Create a powershell profile:',
            href: null
          },
          {
            type: 'text',
            text: {content: ' ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' ',
            href: null
          },
          {
            type: 'text',
            text: {content: '', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: 'e93aea83-532b-49d2-b10f-e6e0f0ad370d',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: true,
      archived: false,
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                "Add the location of your Kubo daemon and add it to PowerShell's ",
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              "Add the location of your Kubo daemon and add it to PowerShell's ",
            href: null
          },
          {
            type: 'text',
            text: {content: 'PATH', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: 'PATH',
            href: null
          },
          {
            type: 'text',
            text: {
              content:
                ' by truncating it to the end of your PowerShell profile:',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              ' by truncating it to the end of your PowerShell profile:',
            href: null
          },
          {
            type: 'text',
            text: {content: '', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '1a86f755-be2d-4ad2-9b34-eff6f3020cf1',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: true,
      archived: false,
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'Load your ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Load your ',
            href: null
          },
          {
            type: 'text',
            text: {content: '$PROFILE', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: '$PROFILE',
            href: null
          },
          {
            type: 'text',
            text: {content: ':', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ':',
            href: null
          },
          {
            type: 'text',
            text: {content: '', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '9cf7faf0-b328-4a19-900f-ca3b6d310b78',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: true,
      archived: false,
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'Navigate to your home folder', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Navigate to your home folder',
            href: null
          },
          {
            type: 'text',
            text: {content: '', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '4e6644bd-6a5f-4311-ab22-ecad7f5e2b5e',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'heading_2',
      heading_2: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'Build Kubo from source', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Build Kubo from source',
            href: null
          }
        ],
        is_toggleable: false,
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '319e2cd4-fd77-421d-bab5-581d4cefc242',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'For the current instructions on how to manually download, compile and build Kubo from source, see the ',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              'For the current instructions on how to manually download, compile and build Kubo from source, see the ',
            href: null
          },
          {
            type: 'text',
            text: {
              content: 'Build from Source',
              link: {
                url: 'https://github.com/ipfs/kubo/blob/v0.18.1/README.md#build-from-source'
              }
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Build from Source',
            href: 'https://github.com/ipfs/kubo/blob/v0.18.1/README.md#build-from-source'
          },
          {
            type: 'text',
            text: {content: ' section in the Kubo repository.', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' section in the Kubo repository.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '6ac5c9c4-9061-4aff-9c03-f6f23c8e6033',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'heading_2',
      heading_2: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: 'Determining which node to use with the command line',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Determining which node to use with the command line',
            href: null
          }
        ],
        is_toggleable: false,
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '2152a1e1-f717-4346-a5b5-7d32430cb6b4',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                "The command line can detect and use any node that's running, unless it's configured to use an external binary file. Here's which node to use for the local daemon or a remote client:",
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              "The command line can detect and use any node that's running, unless it's configured to use an external binary file. Here's which node to use for the local daemon or a remote client:",
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '87ac5d03-c0ae-4238-96bb-12d44603ef20',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'heading_3',
      heading_3: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'Local daemon', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Local daemon',
            href: null
          }
        ],
        is_toggleable: false,
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '4fbf7ae2-0781-4a9e-a151-c33b9129a014',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'The local daemon process is automatically started in the CLI with the command ',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              'The local daemon process is automatically started in the CLI with the command ',
            href: null
          },
          {
            type: 'text',
            text: {content: 'ipfs daemon', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: 'ipfs daemon',
            href: null
          },
          {
            type: 'text',
            text: {content: '. It creates an ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '. It creates an ',
            href: null
          },
          {
            type: 'text',
            text: {content: '$IPFS_PATH/api', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: '$IPFS_PATH/api',
            href: null
          },
          {
            type: 'text',
            text: {content: ' file with an ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' file with an ',
            href: null
          },
          {
            type: 'text',
            text: {
              content: 'RPC API',
              link: {
                url: 'https://docs.ipfs.tech/reference/kubo/rpc/#http-rpc-api-reference'
              }
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'RPC API',
            href: 'https://docs.ipfs.tech/reference/kubo/rpc/#http-rpc-api-reference'
          },
          {
            type: 'text',
            text: {content: ' address.', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' address.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: 'e765d04f-6513-4306-9104-d6699f72b83b',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'heading_3',
      heading_3: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'Remote client', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Remote client',
            href: null
          }
        ],
        is_toggleable: false,
        color: 'default'
      }
    },
    {
      object: 'block',
      id: 'f33447ae-97e8-4079-9b0a-448cb6c75ce2',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'You can install the standalone IPFS CLI client independently and use it to talk to an IPFS Desktop node or a Brave node. Use the ',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              'You can install the standalone IPFS CLI client independently and use it to talk to an IPFS Desktop node or a Brave node. Use the ',
            href: null
          },
          {
            type: 'text',
            text: {
              content: 'RPC API',
              link: {
                url: 'https://docs.ipfs.tech/reference/kubo/rpc/#http-rpc-api-reference'
              }
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'RPC API',
            href: 'https://docs.ipfs.tech/reference/kubo/rpc/#http-rpc-api-reference'
          },
          {
            type: 'text',
            text: {content: ' to talk to the ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' to talk to the ',
            href: null
          },
          {
            type: 'text',
            text: {content: 'ipfs', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: 'ipfs',
            href: null
          },
          {
            type: 'text',
            text: {content: ' daemon.', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' daemon.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '2107cdf3-02da-4aa1-85a2-fe3889dd7b34',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'When an IPFS command executes without parameters, the CLI client checks whether the ',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              'When an IPFS command executes without parameters, the CLI client checks whether the ',
            href: null
          },
          {
            type: 'text',
            text: {content: '$IPFS_PATH/api', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: '$IPFS_PATH/api',
            href: null
          },
          {
            type: 'text',
            text: {
              content: ' file exists and connects to the address listed there.',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              ' file exists and connects to the address listed there.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '9d436765-7595-4e9c-9114-04556eed72c5',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'If an ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'If an ',
            href: null
          },
          {
            type: 'text',
            text: {content: '$IPFS_PATH', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: '$IPFS_PATH',
            href: null
          },
          {
            type: 'text',
            text: {
              content: ' is in the default location (for example, ',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' is in the default location (for example, ',
            href: null
          },
          {
            type: 'text',
            text: {content: '~/.ipfs', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: '~/.ipfs',
            href: null
          },
          {
            type: 'text',
            text: {
              content:
                ' on Linux), then it works automatically and the IPFS CLI client talks to the locally running ',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              ' on Linux), then it works automatically and the IPFS CLI client talks to the locally running ',
            href: null
          },
          {
            type: 'text',
            text: {content: 'ipfs', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: 'ipfs',
            href: null
          },
          {
            type: 'text',
            text: {
              content: ' daemon without any extra configuration.',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' daemon without any extra configuration.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '5cadcfe6-6053-45dd-a42d-fdab7f4818d4',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'If an ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'If an ',
            href: null
          },
          {
            type: 'text',
            text: {content: '$IPFS_PATH', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: '$IPFS_PATH',
            href: null
          },
          {
            type: 'text',
            text: {
              content: " isn't in the default location, use the ",
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: " isn't in the default location, use the ",
            href: null
          },
          {
            type: 'text',
            text: {content: '-api <rpc-api-addr>', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: '-api <rpc-api-addr>',
            href: null
          },
          {
            type: 'text',
            text: {
              content:
                ' command-line argument. Alternatively, you can set the environment variable to ',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              ' command-line argument. Alternatively, you can set the environment variable to ',
            href: null
          },
          {
            type: 'text',
            text: {content: 'IPFS_PATH', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: 'IPFS_PATH',
            href: null
          },
          {
            type: 'text',
            text: {content: '. ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '. ',
            href: null
          },
          {
            type: 'text',
            text: {content: 'IPFS_PATH', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: 'IPFS_PATH',
            href: null
          },
          {
            type: 'text',
            text: {
              content:
                ' will point to a directory with the api file with the existing ',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              ' will point to a directory with the api file with the existing ',
            href: null
          },
          {
            type: 'text',
            text: {content: 'ipfs', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: 'ipfs',
            href: null
          },
          {
            type: 'text',
            text: {content: ' daemon instance.', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' daemon instance.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '082b70bc-a7ae-4f58-ae31-7e033090dc90',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'heading_3',
      heading_3: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'Most common examples', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Most common examples',
            href: null
          }
        ],
        is_toggleable: false,
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '59e45b41-cf35-4e98-96d8-61d437701b27',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'If you are an IPFS Desktop user, you can install CLI tools and an ',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              'If you are an IPFS Desktop user, you can install CLI tools and an ',
            href: null
          },
          {
            type: 'text',
            text: {content: '.ipfs/api', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: '.ipfs/api',
            href: null
          },
          {
            type: 'text',
            text: {content: ' file is automatically picked up.', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' file is automatically picked up.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '78d003ab-ce61-44a7-a9cc-35c77d8abf57',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                "If you're not running IPFS Desktop, specify a custom port with ",
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              "If you're not running IPFS Desktop, specify a custom port with ",
            href: null
          },
          {
            type: 'text',
            text: {
              content: 'ipfs --api /ip4/127.0.0.1/tcp/<port> id',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: 'ipfs --api /ip4/127.0.0.1/tcp/<port> id',
            href: null
          },
          {
            type: 'text',
            text: {content: ' in the CLI.', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' in the CLI.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: '4567b38c-434f-42ec-9c33-1c1017a00845',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'For example, Brave RPC API runs on port 45001, so the CLI can talk to the Brave daemon using ',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              'For example, Brave RPC API runs on port 45001, so the CLI can talk to the Brave daemon using ',
            href: null
          },
          {
            type: 'text',
            text: {
              content: 'ipfs --api /ip4/127.0.0.1/tcp/45001 id',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: 'ipfs --api /ip4/127.0.0.1/tcp/45001 id',
            href: null
          },
          {
            type: 'text',
            text: {content: '. You can use ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: '. You can use ',
            href: null
          },
          {
            type: 'text',
            text: {
              content:
                'mkdir -p ~/.ipfs && echo "/ip4/<ip>/tcp/<rpc-port>" > ~/.ipfs/api',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text:
              'mkdir -p ~/.ipfs && echo "/ip4/<ip>/tcp/<rpc-port>" > ~/.ipfs/api',
            href: null
          },
          {
            type: 'text',
            text: {content: ' to avoid passing ', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' to avoid passing ',
            href: null
          },
          {
            type: 'text',
            text: {content: '--api', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: true,
              color: 'default'
            },
            plain_text: '--api',
            href: null
          },
          {
            type: 'text',
            text: {content: ' every time.', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: ' every time.',
            href: null
          }
        ],
        color: 'default'
      }
    },
    {
      object: 'block',
      id: 'ec5b67be-47f5-4ce2-916e-3f8a1a1b08c7',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'heading_2',
      heading_2: {
        rich_text: [
          {
            type: 'text',
            text: {content: 'Next steps', link: null},
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Next steps',
            href: null
          }
        ],
        is_toggleable: false,
        color: 'default'
      }
    },
    {
      object: 'block',
      id: 'f5a62832-373b-4515-980b-81710c5afde3',
      parent: {
        type: 'page_id',
        page_id: '72f156b1-ceeb-4243-8765-8b9660542da4'
      },
      created_time: '2023-02-16T07:42:00.000Z',
      last_edited_time: '2023-02-16T07:42:00.000Z',
      created_by: {object: 'user', id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'},
      last_edited_by: {
        object: 'user',
        id: '9e193199-a3f6-49b4-aaa0-43fb0461018b'
      },
      has_children: false,
      archived: false,
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: "Now that you've installed IPFS Kubo, check out the ",
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: "Now that you've installed IPFS Kubo, check out the ",
            href: null
          },
          {
            type: 'text',
            text: {
              content: 'IPFS Kubo Tutorial in Guides',
              link: {
                url: 'https://docs.ipfs.tech/how-to/command-line-quick-start/'
              }
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'IPFS Kubo Tutorial in Guides',
            href: 'https://docs.ipfs.tech/how-to/command-line-quick-start/'
          },
          {
            type: 'text',
            text: {
              content:
                ', which will guide you through taking a Kubo node online and interacting with the network.',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text:
              ', which will guide you through taking a Kubo node online and interacting with the network.',
            href: null
          }
        ],
        color: 'default'
      }
    }
  ],
  next_cursor: null,
  has_more: false,
  type: 'block',
  block: {}
}
