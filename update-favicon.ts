import config from './pagic.config.ts';
import { makeRunWithLimit } from "./run_with_limit.ts";
import {existsSync } from "https://deno.land/std/fs/mod.ts";

const { runWithLimit } = makeRunWithLimit(6);
var downloadlist: any = [];
var force = false;

async function download(source: string, destination: string): Promise<void> {
    const response = await fetch(source);
    const blob = await response.blob();
    const buf = await blob.arrayBuffer();
    const data = new Uint8Array(buf);

    const file = await Deno.create(destination);
    await Deno.writeAll(file, data);

    Deno.close(file.rid);
  }

function getFavicon(url: string): string {
    const reg = /(?:\w+\.)+\w+/g;
    const host = url.match(reg);
    const favdown = 'https://s2.googleusercontent.com/s2/favicons?domain_url=';
    if (host) {
        //var name = host[0].split(".").slice(-2)[0];
        var name = host;
        downloadlist.push(runWithLimit(() => download(favdown+url,'./src/img/'+name+'.png')));
        //download(favdown+url,'./src/img/'+name+'.png');
        return name+'.png';
    } else {
        return '';
    };
}

function processItem(item: any, force: boolean) {
    if ( item.category === undefined ) {
        if (!force && existsSync("src/imgold/"+item.favicon)) {
            Deno.copyFileSync("src/imgold/"+item.favicon, "src/img/"+item.favicon);
            return {name: item.name, url: item.url, favicon: item.favicon};
        } else {
            return {name: item.name, url: item.url, favicon: getFavicon(item.url)};
        }
    } else {
        return item;
    }
}

let newBM = [];
if (Deno.args.length > 0 && Deno.args[0] == "--force") {
    force = true;
}
Deno.renameSync("src/img", "src/imgold");
Deno.mkdirSync("src/img");

for (let bookmark of config.bookmarks) {
    newBM.push(processItem(bookmark, force));
}

(async () => {
    const result = await Promise.all(downloadlist);
})();

config.bookmarks = newBM;

const encoder = new TextEncoder();
const data = encoder.encode(JSON.stringify(config, null, 2));
Deno.writeFile('./pagic.config.json',data);
