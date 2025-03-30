#!/bin/bash
set -euo pipefail
# Change the manifest version first
version=$(jq -r .version manifest.json)
echo "generate KeepZotero ${version}."

rm -f keepzotero-*.xpi
rm -f keepzotero-update.json
zip -r keepzotero-${version}-fx.xpi *

jq ".addons[\"keepzotero@yhmtsai\"].updates[0].update_hash = \"sha256:`shasum -a 256 keepzotero-${version}-fx.xpi | cut -d' ' -f1`\"" keepzotero-update.json.tmpl | \
    jq ".addons[\"keepzotero@yhmtsai\"].updates[0].update_link = \"https://github.com/yhmtsai/KeepZotero/releases/download/v${version}/keepzotero-${version}-fx.xpi\"" | \
	jq ".addons[\"keepzotero@yhmtsai\"].updates[0].version = \"${version}\"" > keepzotero-update.json

echo "generate xpi and prepare keepzotero-update.json successfully."
echo "push the keepzotero-update.json to repo, and use release to upload xpi."
