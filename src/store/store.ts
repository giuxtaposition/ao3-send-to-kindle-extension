import browser from "webextension-polyfill"

export const localStore = {
    get: async (key: string) => {
        const storedInfo = await browser.storage.local.get()
        return storedInfo[key]
    },

    set: async (key: string, value: any) => {
        await browser.storage.local.set({
            [key]: value,
        })
    },
}
