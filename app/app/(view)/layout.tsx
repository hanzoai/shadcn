import { Document } from "@/components/document"

export { metadata, viewport } from "@/components/document"

/** A single registry component, full-bleed, for the block viewer. */
export default function ViewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Document>{children}</Document>
}
