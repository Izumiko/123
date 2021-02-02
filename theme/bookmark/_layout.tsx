import { React, PagicLayout } from 'https://deno.land/x/pagic/mod.ts';
import { lowerCase } from "https://deno.land/x/case/mod.ts";
import { addPinyin, domainName } from './_utils.tsx';

const Layout: PagicLayout = ({ config }) => (
  <html>
    <head>
      <meta charSet="utf-8"/>
      <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
      
      <title>{config.title}</title>

      <link rel="shortcut icon" type="image/png" href="/favicon.ico"/>
      <link rel="stylesheet" href="/assets/mobi.css/mobi.min.css" />
      <link rel="stylesheet" href="/assets/site.css" />
    </head>
    <body>
      <div className="flex-center">
        <div className="container">
          <style id="search-style"></style>
          <form id="search-form" className="form">
            <input id="search-input" type="search" placeholder="Type to search" autoComplete="off" tabIndex={1} />
          </form>
          <ul className="site-bookmark-ul flex-left flex-wrap units-gap">
            {config.bookmarks.map((item: any) => (
                <li
                  className={item.category === undefined ? "site-bookmark-li unit-0": "site-bookmark-li site-bookmark-category unit-1 top-gap text-muted text-small"}
                  data-name={item.category === undefined ? lowerCase(addPinyin(item.name) + domainName(item.url)) : ''}
                >
                  {item.category === undefined?
                  <a href={item.url} className="site-bookmark-a flex-middle" tabIndex={9} target="_blank" >
                    {item.favicon === undefined ? '' : <img className="site-bookmark-img" src={`${config.root}img/${item.favicon}`} height="16" width="16" />}
                    <span>{item.name}</span>
                  </a>
                  :<span>{item.category}</span>}
                </li>
            ))}
          </ul>
          <footer className="text-center top-gap-big text-muted text-small">
            <hr/>
            <p>Like this page? <a className="text-muted" href="https://github.com/xcatliu/123">Fork me</a> to create your own!</p>
          </footer>
        </div>
      </div>

      <script src="/assets/search.js"></script>
    </body>
  </html>
  );

  
export default Layout;
