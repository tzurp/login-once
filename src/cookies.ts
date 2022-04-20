import {Cookie} from "@wdio/protocols";

class Cookies {
    async clearAll() {
        await browser.deleteAllCookies();
    }

    async getAllCookies(): Promise<Array<Cookie>> {
        const cookies = await browser.getAllCookies();
        
        // TODO: delete logging
        console.log("*getAllCookies*");
        for(let cookie of cookies) {
            console.log("cookie = " + JSON.stringify(cookie));
        }
        return cookies;
    }

    async setAllCookies(cookies: Array<Cookie>): Promise<void> {
        console.log("*setAllCookies*");
        for(let cookie of cookies) {
            console.log("cookie = " + JSON.stringify(cookie));
        }
        await browser.setCookies(cookies);
    }
}
export default new Cookies();