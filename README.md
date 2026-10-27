# refresh-labels

Hosting for the Refresh Computers price label app (self-updating). It is served by GitHub Pages at
https://refreshcomputers.github.io/refresh-labels/

- `app.js`: the label app. It is loaded by the `labels.html` launcher that staff keep on each shop PC.
- `version.json`: the current version and the sha256 of `app.js`. The launcher checks this file every time it opens.

There are no secrets here. Each PC's RepairShopr API key stays in that PC's browser.
Don't edit these files by hand. They are generated and pushed by `publish.sh` from the source project.
