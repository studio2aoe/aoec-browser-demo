#!/usr/bin/env bash
DIR_CRATE=$(realpath $(dirname $0))
DIR_RELEASE=${DIR_CRATE}/target/wasm32-unknown-unknown/release

DIR_APP=$(realpath ${DIR_CRATE}/../)
DIR_PUBLIC=${DIR_APP}/public/static/wasm

printf "source crate: $(realpath ${DIR_CRATE})\n"
printf "wasm destination: $(realpath ${DIR_PUBLIC})\n\n"

mkdir -p ${DIR_PUBLIC}

printf "Build the crate to wasm...\n\n"
cargo build\
  --release\
  --target wasm32-unknown-unknown\
  --manifest-path ${DIR_CRATE}/Cargo.toml

cp\
  ${DIR_RELEASE}/soundchip.wasm\
  ${DIR_PUBLIC}/soundchip.wasm
printf "\n"
