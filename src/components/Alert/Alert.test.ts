import { render, screen } from "@testing-library/svelte"
import Alert from "./Alert.svelte"

describe("Alert", () => {
    afterAll(() => {
        vi.clearAllMocks()
    })

    test("if isVisible is false, do not show alert", () => {
        render(Alert, {
            type: "success",
            message: "AlertMessage",
            isVisible: false,
        })

        expect(screen.queryByText("AlertMessage")).not.toBeInTheDocument()
    })

    test("if isVisible is true, show alert", () => {
        render(Alert, {
            type: "success",
            message: "AlertMessage",
            isVisible: true,
        })

        expect(screen.getByText("AlertMessage")).toBeInTheDocument()
    })

    test("if type success, show success alert", () => {
        render(Alert, { type: "success", message: "Success", isVisible: true })

        expect(screen.getByRole("alert")).toHaveClass("success")
    })

    test("if type success, show success alert", () => {
        render(Alert, { type: "error", message: "Error", isVisible: true })

        expect(screen.getByRole("alert")).toHaveClass("error")
    })
})
