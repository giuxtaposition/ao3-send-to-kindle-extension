import browser from "webextension-polyfill"

export const localStore = {
    get: async (key: string) => {
        const storedInfo = await browser.storage.local.get(key)
        return storedInfo
    },

    set: async (key: string, value: any) => {
        await browser.storage.local.set({
            [key]: value,
        })
    },
}
