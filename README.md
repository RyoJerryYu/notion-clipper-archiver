<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Notion Clipper Archiver

This action archives the notion pages in a notion database to a json file.

This action aims to be well integrated with Notion API and Notion Web Clipper.

## Example usage

This action work with the official [Notion API](https://developers.notion.com/), so you need to create a new integration in Notion and get the token before using this action. You can find the detailed instructions [here](https://developers.notion.com/docs/create-a-notion-integration).

This action will fetch the notion pages properties in a database, and save them to a json file. Generally, you would combine this action with some other actions to handle the json file.

Here is an example for use this action with [Upload Artifact](https://github.com/actions/upload-artifact) action to upload the json file to Github Actions.

```yaml
- name: Archive Notion Clips
  uses: RyoJerryYu/notion-clipper-archiver@v1
  with:
    notion_token: ${{ secrets.NOTION_TOKEN }}
    database_id: ${{ secrets.DATABASE_ID }}
    save_dir: ./data
    save_file: clips.json
- name: Upload clips.json
  uses: actions/upload-artifact@v3
  with:
    name: results
    path: ${{ steps.notion_clipper_archiver.outputs.save_path }}
```

The json file would look like this:

```json
{
  "achived_at": "2021-02-16T07:42:00.000Z",
  "pages": [
    {...},
    {...},
    {...}
  ]
}
```

Each page should be saved with the following format:

```json
{
  "id": "uuid",
  "title": "Page Title",
  "url": "url",
  "tags": ["tag1", "This field is optional"],
  "created_time": "2023-02-16T07:42:00.000Z"
}
```

## Inputs

### `notion_token`

**required** The Notion token. You can get it by [create a new integration in Notion](https://developers.notion.com/docs/create-a-notion-integration).

### `database_id`

**required** The id of the database where your clips are stored. You should share the database with the integration you created. More information about database id can be found [here](https://developers.notion.com/docs/getting-started).

### `save_dir`

**required** The directory where the json file will be saved.

### `save_file`

**required** The name of the json file.

### `need_content`

**optional** Whether the clips should contain content. Default is `false`.

By default, this action does not fetch the page content. If you want to fetch the page content, you can set the `need_content` input to `true`.
```yaml
- name: Archive Notion Clips
  uses: RyoJerryYu/notion-clipper-archiver@v1
  with:
    need_content: true
    ...
```

The page content will be saved as a markdown string in the `content` field. You can use [remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) or something else to handle the markdown string.

```json
{
  "id": "uuid",
  "title": "Page Title",
  "url": "url",
  "tags": ["tag1", "This field is optional"],
  "created_time": "2023-02-16T07:42:00.000Z",
  "content": "# Page Content\n\nParagraph\n\n## Sub..."
}
```

### `contains_tags` and `not_contains_tags`

**optional** The tags that the clips should contain or should not contain.

If `contains_tags` not specified, all tags can be contained. If `not_contains_tags` not specified, no tags can not be contained.

Since Github Actions does not support array input, you should use multiple lines input to specify each tag in a line.

```yaml
- name: Archive Notion Clips
  uses: RyoJerryYu/notion-clipper-archiver@v1
  with:
    contains_tags: |
      tag1
      tag2
    not_contains_tags: |
      tag3
      tag4
    ...
```

For the above example, only the pages that satisfy the following conditions will be saved:

```
(
  (pages contains tag1)
  or 
  (pages contains tag2)
)
and
(
  (pages not contains tag3)
  and
  (pages not contains tag4)
)
```

## Outputs

### `save_path`

The path of the json file. You can use this output to upload the json file to somewhere or use it in other actions.

