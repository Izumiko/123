# Personal Front Page

Base on [xcatliu/123](https://github.com/xcatliu/123)

## install deno and pagic

```shell
# Install deno https://deno.land/#installation
curl -fsSL https://deno.land/x/install/install.sh | sh
# Install Pagic
deno install --unstable --allow-read --allow-write --allow-net --allow-run --name=pagic https://deno.land/x/pagic/mod.ts
```

## config

add bookmarks to pagic.config.ts

## download favicon

```shell
deno run --allow-net --allow-read --allow-write update-favicon.ts
```

then copy content of `pagic.config.json` to `pagic.config.ts`

## run pagic

```shell
pagic build --watch --serve
```
