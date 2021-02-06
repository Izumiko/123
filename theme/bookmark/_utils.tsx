// @deno-types="https://denopkg.com/DefinitelyTyped/DefinitelyTyped/types/pinyin/index.d.ts";
import pinyin from "https://cdn.skypack.dev/pinyin@2.9.1";

export function addPinyin(str: string) {
  const CHINESE = /[\u4e00-\u9fa5]/;
  if (!CHINESE.test(str)) {
    return str;
  }

  return str + ' ' + pinyin(str, {
    style: pinyin.STYLE_NORMAL,
  }).join('');
}

export function domainName(url: string) {
  const reg = /(?:\w+\.)+\w+/g;
  const host = url.match(reg);

  if (host) {
    var name = host[0].split(".").slice(-2);
    return ' ' + name[0] + '.' + name[1];
  } else {
    return '';
  }
}
