/**
 * `cn` — the one class-name composer, vendored.
 *
 * `clsx` resolves conditional/array/object class inputs; `tailwind-merge` then
 * collapses conflicting Tailwind utilities so the LAST wins (e.g. a caller's
 * `bg-background` overrides a component's default `bg-popover`). Every component
 * here merges through this single function.
 *
 * This is a copy, not an import. @hanzo/shadcn was extracted OUT of @hanzo/ui;
 * importing those seventeen lines back from @hanzo/ui would undo the extraction
 * and put a cycle between the two packages. Seventeen lines is cheaper.
 */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
