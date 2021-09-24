# Personal Front Page

Base on [xcatliu/123](https://github.com/xcatliu/123)

Hugo version.

## config

add bookmarks to `data/websites.yml`

## download favicon

build updateData tool with golang, then run it in current folder.

new data will locate at `data/new.yml`.

then move `data/new.yml` to `data/websites.yml`, and delete `content/img-old` folder.

## build website

```shell
hugo
```
