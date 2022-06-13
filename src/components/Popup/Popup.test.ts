import { render, screen, waitFor } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import { localStore } from "../../store/store"
import Popup from "./Popup.svelte"

vi.mock("../../store/store", () => {
    return {
        localStore: vi.fn(),
    }
})

describe("Popup", () => {
    afterAll(() => {
        vi.clearAllMocks()
    })

    test("has an input for email and a save button", () => {
        localStore.get = vi.fn().mockReturnValue({ email: "" })
        render(Popup)

        expect(screen.getByRole("textbox")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
    })

    test("loads the email from local storage", async () => {
        localStore.get = vi.fn().mockReturnValue({ email: "an@email.com" })

        render(Popup)

        await waitFor(() => {
            expect(screen.getByRole("textbox")).toHaveValue("an@email.com")
        })
    })

    test("on save click, saves the email to local storage", async () => {
        localStore.get = vi.fn().mockReturnValue({ email: "" })
        localStore.set = vi.fn()

        render(Popup)

        const input = screen.getByRole("textbox")
        const button = screen.getByText("Save")
        await userEvent.type(input, "another@email.com")
        await userEvent.click(button)

        expect(localStore.set).toHaveBeenCalledWith(
            "email",
            "another@email.com"
        )
    })

    test("on enter, saves the email to local storage", async () => {
        localStore.get = vi.fn().mockReturnValue({ email: "" })
        localStore.set = vi.fn()

        render(Popup)

        const input = screen.getByRole("textbox")
        await userEvent.type(input, "another@email.com")
        await userEvent.type(input, "{enter}")

        expect(localStore.set).toHaveBeenCalledWith(
            "email",
            "another@email.com"
        )
    })
})
