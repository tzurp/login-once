import { SevereServiceError } from "webdriverio";
import { ServiceOptions } from "./service-options";
import LocalStorage from "./local-storage";
import Cookies from "./cookies";
import { Cookie } from "@wdio/protocols";

export default class LoginOnceService {
    _browser: WebdriverIO.Browser;
    _serviceOptions: ServiceOptions;
    _localStorageMap: Map<string, string>;
    _cookies: Array<Cookie>;
    _eachCounter = 0;

    /**
     * `serviceOptions` contains all options specific to the service
     * e.g. if defined as follows:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * the `serviceOptions` parameter will be: `{ foo: 'bar' }`
     */
    constructor(serviceOptions: ServiceOptions, capabilities: any, config: any, browser: WebdriverIO.Browser) {
        this._browser = browser;
        this._serviceOptions = serviceOptions;
    }

    async before(config: any, capabilities: any) {
        // Before all hook

        if (!this._serviceOptions || !this._serviceOptions.loginMethod || !this._serviceOptions.mainUrl) {
            throw new SevereServiceError(`Login-once error: Login-once options: loginMethod and mainUrl are mandatory!`);
        }

        // TODO: login
        await this._serviceOptions.loginMethod();

        try {
            // TODO: save cache
            await this.saveStorageData();
        }
        catch (err) {
            throw new SevereServiceError(`Login-once error: getStorageData faild: ${err}`);
        }
    }

    async beforeTest(test: any, context: any) {
        await this.beforeTestInternal();
    }

    async beforeScenario(test: any, context: any) {
        await this.beforeTestInternal();
    }

    async afterTest(test: any, context: any, { error, result, duration, passed, retries }: any) {
        // TODO: delete log
        console.log(`Test: ${this._eachCounter} finished`);
    }

    async afterScenario({ result }: any) {

    }

    async after(exitCode: any, config: any, capabilities: any) {
        this._localStorageMap = null;

        this._cookies = null;
    }

    private async beforeTestInternal() {
        if (this._eachCounter++ > 0) {
            // TODO: delete logging
            console.log("Cleaning cache...");
            await this.clearAllCache();
            // TODO: restore cache
            await this.restoreStorageData();
            // TODO: Navigate to main URL
            // TODO: delet logging
            console.log(`Navigating to: ${this._serviceOptions.mainUrl}`);
            await this._browser.url(this._serviceOptions.mainUrl);
        }

        // TODO: delete log
        console.log(`*** This is test count: ${this._eachCounter} ***`);
    }

    private async clearAllCache() {
        await LocalStorage.clear();

        await Cookies.clearAll()
    }

    private async saveStorageData() {
        this._localStorageMap = await LocalStorage.getAllItems();

        this._cookies = await Cookies.getAllCookies();
    }

    private async restoreStorageData() {
        try {
            await LocalStorage.setAllItems(this._localStorageMap);

            await Cookies.setAllCookies(this._cookies);
        }
        catch (err) {
            throw new SevereServiceError(`Login-once error: restoreStorageData faild: ${err}`)
        }
    }
}
