#!/usr/bin/env bash
DIR_CALLER=$(realpath $(pwd))
DIR_PROCESSOR=$(realpath $(dirname $0))
DIR_APP=$(realpath ${DIR_PROCESSOR}/../)

cd ${DIR_PROCESSOR}
npx webpack

mkdir -p ${DIR_APP}/public/static/js
cp \
  ${DIR_PROCESSOR}/dist/processor.* \
  ${DIR_APP}/public/static/js/

cd ${DIR_CALLER}