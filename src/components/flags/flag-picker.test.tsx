import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { FlagPicker } from "./flag-picker"

describe("FlagPicker", () => {
  it("filters by name and selects a typed code", () => {
    const onValueChange = vi.fn()
    render(<FlagPicker onValueChange={onValueChange} kinds={["country"]} />)

    fireEvent.click(screen.getByRole("combobox"))
    fireEvent.change(screen.getByRole("textbox", { name: /search by name or code/i }), {
      target: { value: "Armenia" },
    })
    fireEvent.click(screen.getByRole("option", { name: /Armeniaam/i }))

    expect(onValueChange).toHaveBeenCalledWith("am")
    expect(screen.getByRole("combobox")).toHaveTextContent("Armenia")
  })

  it("writes the selected code to a hidden form field", () => {
    const { container } = render(<FlagPicker defaultValue="ae" name="market" />)
    expect(container.querySelector('input[name="market"]')).toHaveValue("ae")
  })

  it("searches country aliases and respects constrained and disabled codes", () => {
    const onValueChange = vi.fn()
    render(<FlagPicker onValueChange={onValueChange} codes={["ae", "sa"]} disabledCodes={["sa"]} />)

    fireEvent.click(screen.getByRole("combobox"))
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "UAE" } })
    expect(screen.getByRole("option", { name: /United Arab Emirates/i })).toBeEnabled()

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Saudi" } })
    expect(screen.getByRole("option", { name: /Saudi Arabia/i })).toBeDisabled()
  })
})
