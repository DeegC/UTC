#!/bin/bash

# Pushes the current .deb to github as a release.

source ~/.github-api-token
tag=1.1
asset="../debian/build/distributions/utc_$tag-1_all.deb"

set -e

GH_API="https://api.github.com"
GH_REPO="$GH_API/repos/DeegC/UTC"
GH_TAGS="$GH_REPO/releases/tags/$tag"
AUTH="-u DeegC:$github_api_token"

# Validate token.
response=$(curl -s "$AUTH" $GH_REPO)
echo "$response" | grep -iq "Bad credentials" && { echo "Error: Invalid repo, token or network issue!"; echo "$response"; exit 1; }

# Read asset tags.
response=$(curl -s "$AUTH" $GH_TAGS)

upload_url=$(echo "$response" | jq -r ".upload_url")
asset_id=$(echo "$response" | jq -r ".assets[] | select(.name | contains(\"utc_$tag-1_all.deb\")) | .id")
if [ -n "$asset_id" ]; then
    echo "Found an asset; deleting."
    curl -X DELETE -s "$AUTH" "$GH_REPO/releases/assets/$asset_id"
fi

upload_url=$(echo $upload_url | grep -o "^[^{]*") # Remove {...} at the end.

# Upload asset
echo "Uploading asset... "

# Construct url
filename=$(basename $asset)
GH_ASSET="$upload_url?name=$filename"
curl --data-binary @"$asset" "$AUTH" -H "Content-Type: application/octet-stream" $GH_ASSET
echo ""
echo "Done."
