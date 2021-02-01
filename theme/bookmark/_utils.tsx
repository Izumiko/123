import pinyin from "https://deno.land/x/pinyin/mod.ts";

export function addPinyin(str: string) {
  const CHINESE = /[\u4e00-\u9fa5]/;
  if (!CHINESE.test(str)) {
    return str;
  }

  return str + ' ' + pinyin(str, {
    style: pinyin.STYLE_NORMAL,
  }).join('');
}