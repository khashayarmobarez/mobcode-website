# Custom tools

opencode does not load tools from a `tools/` directory. Custom tools are
defined via **plugins** — see the `plugin` field in `opencode.json` and the
auto-discovery directory `.opencode/plugin/`.

Any `*.ts` or `*.js` file placed in `.opencode/plugin/` is loaded as a plugin
automatically. A plugin exports a function returning hooks such as
`tool.execute.before` / `tool.execute.after`, or registers new tools via the
`tool` object shape.

When you are ready to add custom tools, create them in `.opencode/plugin/`
(suggested: `mobcode-tools.ts`) and register them in
`.opencode/opencode.json`.