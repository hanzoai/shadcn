import { Document } from "@/components/document"

export { metadata, viewport } from "@/components/document"

/**
 * Embedded examples — the registry document with no header and no footer, so an
 * iframe shows the example and nothing around it.
 */
export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Document>{children}</Document>
}
