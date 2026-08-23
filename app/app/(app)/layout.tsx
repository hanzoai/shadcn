import { Document } from "@/components/document"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export { metadata, viewport } from "@/components/document"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Document>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </Document>
  )
}
