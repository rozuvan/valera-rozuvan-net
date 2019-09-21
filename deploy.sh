#!/bin/bash

WORKING_DIR=`pwd`
GH_PAGES_PATH="${1%/}"

if [ ! -d "${GH_PAGES_PATH}" ]; then
  echo "ERROR! Directory '${GH_PAGES_PATH}' does not exist! Exiting..."
  exit 0
fi

if [ -z "${2}" ]; then
  echo "ERROR! You must provide blog address as a 2nd argument! Exiting..."
  exit 0
fi

BLOG_ADDRESS="${2}"
DEPLOY_REQUIRED="${3}"

# First, create a build directory, and copy raw source there.
rm -rf ./build
mkdir ./build
cp --recursive ./src/* ./build/

# Second, perform some modifications on the `build` folder.
node scripts/replace-str.js SITE_ADDRESS_REPLACE_STR $BLOG_ADDRESS

# Third, copy `build` folder to `gh-pages` folder.
cd $GH_PAGES_PATH
rm -rf *
cp --recursive "${WORKING_DIR}"/build/* .
git checkout CNAME

# Fourth, deploy if 3rd param to shell script is `true`.
if [ "${DEPLOY_REQUIRED}" == "true" ]; then
  git add .
  git commit -m "upd"
  git push origin gh-pages
fi

cd $WORKING_DIR
echo "Done!"

exit 0
