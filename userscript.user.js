// ==UserScript==
// @name         Krunker Serverlist Filter
// @version      0.1
// @description  Filters maps on the server list using a blacklist
// @updateURL    https://github.com/j4k0xb/Krunker-Serverlist-Filter/blob/master/userscript.user.js
// @downloadURL  https://github.com/j4k0xb/Krunker-Serverlist-Filter/blob/master/userscript.user.js
// @include      /^(https?:\/\/)?(www\.)?(.+)krunker\.io\/(\?game=.*)?$/
// @run-at       document-start
// ==/UserScript==

const blacklist = ['infect', 'trade', 'trading', 'fun-parkour'];

const _fetch = fetch;
unsafeWindow.fetch = async (url, ...args) => {
    const response = await _fetch(url, ...args);
    if (url === 'https://matchmaker.krunker.io/game-list?hostname=krunker.io') {
        const json = await response.json();
        json.games = json.games.filter(
            game => !blacklist.some(x => game[4].i.toLowerCase().includes(x))
        );
        response.json = () => json;
    }
    return response;
};