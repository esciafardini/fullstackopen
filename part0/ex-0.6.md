sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
  activate server
  server-->>browser: 201 Status Code response containing '{"message":"note created"}'
  deactivate server

  Note: browser adds new li element to notes list with message entered by user
