import * as React from "react"

import { cn } from "@/lib/utils"

import { Label } from "./label"

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field-group" className={cn("flex w-full flex-col gap-5", className)} {...props} />
}

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="field"
      className={cn("group/field flex min-w-0 w-full flex-col gap-2 data-[invalid=true]:text-destructive", className)}
      {...props}
    />
  )
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return <Label data-slot="field-label" className={cn("w-fit font-medium leading-snug", className)} {...props} />
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn("text-xs/relaxed font-normal text-muted-foreground", className)}
      {...props}
    />
  )
}

function FieldError({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="alert" data-slot="field-error" className={cn("text-xs font-normal text-destructive", className)} {...props} />
}

export { Field, FieldDescription, FieldError, FieldGroup, FieldLabel }
