```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
  activate server
  server-->>browser: 201 Status Code response containing '{"message":"note created"}'
  Note right of browser: The browser adds new li element to notes list with message entered by user
  deactivate server
```
