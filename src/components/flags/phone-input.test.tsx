import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { PhoneInput } from "./phone-input"

describe("PhoneInput", () => {
  it("emits E.164 and validation metadata", () => {
    const onValueChange = vi.fn()
    render(<PhoneInput defaultCountry="ae" onValueChange={onValueChange} aria-label="Phone number" />)

    fireEvent.change(screen.getByRole("textbox", { name: "Phone number" }), { target: { value: "+971501234567" } })

    expect(onValueChange).toHaveBeenLastCalledWith(
      "+971501234567",
      expect.objectContaining({ country: "ae", e164: "+971501234567", possible: true, valid: true }),
    )
  })

  it("infers the country and displays a controlled E.164 value nationally", () => {
    render(<PhoneInput value="+971501234567" aria-label="Phone number" />)

    expect(screen.getByRole("combobox", { name: "Country calling code" })).toHaveTextContent("+971")
    expect(screen.getByRole("textbox", { name: "Phone number" })).toHaveValue("050 123 4567")
  })

  it("normalizes an international 00 prefix", () => {
    const onValueChange = vi.fn()
    render(<PhoneInput defaultCountry="gb" onValueChange={onValueChange} aria-label="Phone number" />)

    fireEvent.change(screen.getByRole("textbox", { name: "Phone number" }), { target: { value: "00971501234567" } })

    expect(onValueChange).toHaveBeenLastCalledWith(
      "+971501234567",
      expect.objectContaining({ country: "ae", e164: "+971501234567", valid: true }),
    )
  })

  it("renders genuinely distinct field sizes", () => {
    const { rerender } = render(<PhoneInput size="sm" aria-label="Phone number" />)

    expect(screen.getByRole("textbox", { name: "Phone number" })).toHaveClass("h-8", "text-xs", "md:text-xs")
    expect(screen.getByRole("combobox", { name: "Country calling code" })).toHaveClass("h-8", "text-xs")

    rerender(<PhoneInput aria-label="Phone number" />)
    expect(screen.getByRole("textbox", { name: "Phone number" })).toHaveClass("h-9")

    rerender(<PhoneInput size="lg" aria-label="Phone number" />)
    expect(screen.getByRole("textbox", { name: "Phone number" })).toHaveClass("h-10", "text-base")
    expect(screen.getByRole("combobox", { name: "Country calling code" })).toHaveClass("h-10", "sm:h-10")
  })

  it("keeps read-only and disabled states semantically real", () => {
    const { rerender } = render(<PhoneInput value="+14155552671" readOnly aria-label="Phone number" />)

    expect(screen.getByRole("textbox", { name: "Phone number" })).toHaveValue("(415) 555-2671")
    expect(screen.getByRole("textbox", { name: "Phone number" })).toHaveAttribute("readonly")
    expect(screen.getByRole("combobox", { name: "Country calling code" })).toBeDisabled()

    rerender(<PhoneInput value="+4930123456" disabled aria-label="Phone number" />)
    expect(screen.getByRole("textbox", { name: "Phone number" })).toBeDisabled()
    expect(screen.getByRole("combobox", { name: "Country calling code" })).toBeDisabled()
  })

  it("forwards accessible descriptions and validation errors to the phone field", () => {
    render(
      <>
        <PhoneInput
          aria-label="Phone number"
          aria-describedby="phone-help"
          aria-errormessage="phone-error"
          aria-invalid
        />
        <p id="phone-help">Include the calling code.</p>
        <p id="phone-error">Enter a valid number.</p>
      </>,
    )

    const input = screen.getByRole("textbox", { name: "Phone number" })
    expect(input).toHaveAccessibleDescription("Include the calling code.")
    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(input).toHaveAttribute("aria-errormessage", "phone-error")
  })
})
