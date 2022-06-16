import { render, screen } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import { localStore } from "../../store/store"
import SendToKindle from "./SendToKindle.svelte"

describe("SendToKindle", () => {
    beforeAll(() => {
        vi.stubGlobal("fetch", vi.fn())
        vi.mock("../../store/store", () => {
            return {
                localStore: vi.fn(),
            }
        })
    })

    afterAll(() => {
        vi.clearAllMocks()
    })

    test("has a send to kindle button", () => {
        localStore.get = vi.fn().mockReturnValue("")
        render(SendToKindle, {
            workUrl: "workUrl",
        })
        expect(screen.getByRole("button")).toBeInTheDocument()
    })

    test("on hover shows tooltip", async () => {
        localStore.get = vi.fn().mockReturnValue("")
        render(SendToKindle, {
            workUrl: "workUrl",
        })
        const button = screen.getByRole("button")
        await userEvent.hover(button)
        expect(screen.getByRole("tooltip")).toBeInTheDocument()
    })

    test("on hover out hides tooltip", async () => {
        localStore.get = vi.fn().mockReturnValue("")
        render(SendToKindle, {
            workUrl: "workUrl",
        })
        const button = screen.getByRole("button")
        await userEvent.hover(button)
        await userEvent.unhover(button)
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
    })

    test("on click, sends the email", async () => {
        localStore.get = vi.fn().mockReturnValue("email@kindle.com")
        render(SendToKindle, {
            workUrl: "workUrl",
        })
        const button = screen.getByRole("button")
        await userEvent.click(button)
        expect(fetch).toHaveBeenCalledWith(
            "https://ao3-send-to-kindle.herokuapp.com/emailer/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    workUrl: "workUrl",
                    emailTo: "email@kindle.com",
                }),
            }
        )
    })

    test("if email empty do not send email", async () => {
        localStore.get = vi.fn().mockReturnValue("")
        render(SendToKindle, {
            workUrl: "workUrl",
        })
        const button = screen.getByRole("button")
        await userEvent.click(button)
        expect(fetch).not.toBeCalled()
    })
})
