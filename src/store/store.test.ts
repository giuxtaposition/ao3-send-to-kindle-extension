import chrome from "sinon-chrome"

const mockedChrome = chrome
mockedChrome.runtime.id = "test"

vi.stubGlobal("chrome", mockedChrome)

import { localStore } from "./store"

describe("store", () => {
    afterAll(() => {
        vi.clearAllMocks()
    })

    test("should save and get data correctly", () => {
        console.log(mockedChrome.chrome)
        const key = "test"
        const value = "test"
        localStore.set(key, value)
        expect(localStore.get(key)).resolves.toEqual(value)
    })
})

export {}
