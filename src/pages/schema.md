layout

- tableToolbar
- batchToolbar
- tableColumn dataSource

fields

actions/buttons

- tableToolbar : Actions
- batchToolbar : Actions
- batchToolbarTrashed : Actions
- addAction : Actions
- listAction : Actions
- editAction : Actions
- fields : Fields (fields.hideInColumn !== true => tableColumn)

---Actions---

- text type action uri method

---Fields---

- title name type hideInColumn editDisabled sorter

{

    tableToolbar:{

        text type action uri method

        text type action uri method

        text type action uri method

    }

    batchToolbar:{

        text type action uri method

        text type action uri method

        text type action uri method

    }

    fields:{

        title name type hideInColumn editDisabled sorter

        title name type hideInColumn editDisabled sorter

        title name type hideInColumn editDisabled sorter

    }

}

| Jsx        |    `<Form>`    | `<Field component>`               |
| :--------- | :------------: | :-------------------------------- |
| JsxSchema  | `<SchemaForm>` | `<SchemaMarkupField x-component>` |
| JsonSchema | `<SchemaForm>` | `<SchemaField>`                   |
