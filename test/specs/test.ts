import LoginOnceService from "../../src/service";
import LocalStorage from "../../src/local-storage";
import Cookies from "../../src/cookies";

let service: LoginOnceService;


before(async () => {
    browser.maximizeWindow();

    service = new LoginOnceService({ loginMethod: async () => { await login() }, mainUrl: "https://webdriver.io/docs/gettingstarted" }, undefined, undefined, browser);

    await service.before(undefined, undefined);
});

beforeEach(async () => {
    await service.beforeTest(undefined, undefined);
});

afterEach(async () => {
    await service.afterTest(undefined, undefined, {});
});

describe('Login only once', () => {
    it('Test1', async () => {
        console.log("This is test 1");
        await browser.pause(1000);
    });

    it("Test 2", async () => {
        console.log("This is test 2");

        await browser.pause(1000);
    })
});

async function login(): Promise<void> {
    await browser.url("https://webdriver.io/");

    console.log("Login methods invoked!!!!!!!");

    await browser.pause(1000);

    await $('=Get Started').click();
}