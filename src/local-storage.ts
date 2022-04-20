class LocalStorage {
    async getAllItems(): Promise<Map<string, string>> {
        // TODO: delete logging
        console.log("****** getAllItems *******");
        const localStorage = await browser.execute(`return localStorage;`) as Storage;

        const localStorageMap = new Map<string, string>();

        for (let i = 0; i < localStorage.length; i++) {
            const key = await this.getKey(i);

            const value = localStorage[key];
            // TODO: delete logging
            console.log(`Key= ${key}, Value= ${value}`);

            localStorageMap.set(key, value);
        }

        return localStorageMap;
    }

    async setAllItems(localStorageMap: Map<string, string>): Promise<void> {
        // TODO: delete logging
        console.log("****** setAllLocalStorageItems *******");

        for (const mapElement of localStorageMap.entries()) {
            const key = mapElement[0];
            const value = mapElement[1];
            // TODO: delete logging
            console.log(`Key= ${key}, Value= ${value}`);

            await this.setItem(key, value);
        };
    }

    async clear(): Promise<void> {
        return await browser.execute(() => {
            return localStorage.clear();
        });
    }

    // /**
    //  * Returns the current value associated with the given key, or null if the given key does not exist.
    //  * @param itemKey 
    //  * @returns 
    //  */
    // async getItem(itemKey: string): Promise<string | null> {
    //     let itemValue = "";

    //     try {
    //         itemValue = await browser.execute(`return localStorage.getItem('${itemKey}');`);
    //     }
    //     catch (err) {
    //         console.log(`Login-once error: getItem for key: '${itemKey}' failed: ${err}`);
    //     }

    //     return itemValue;
    // }

    private async getKey(index: number): Promise<string> {
        let key = "";

        try {
            key = await browser.execute(`return localStorage.key(${index});`);
        }
        catch (err) {
            console.log(`Login-once error: getKey error: ${err}`);
        }

        return key;
    }

    private async setItem(key: string, value: string): Promise<void> {
        try {
            await browser.execute(
                `localStorage.setItem('${key}', '${value}');`
            );
        }
        catch (err) {
            console.log(`Login-once error: setItem error: Setting key: '${key}' and value: '${value}' failed: ${err}`);
        }
    }
}
export default new LocalStorage();