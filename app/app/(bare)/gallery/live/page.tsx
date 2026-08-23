import { Hanzo } from "@hanzo/ui"
import { Gallery } from "@hanzo/ui/gallery"

export const dynamic = "force-static"

/** The gallery, in a document of its own. `/gallery` frames this. */
export default function GalleryLive() {
  return (
    <Hanzo>
      <Gallery />
    </Hanzo>
  )
}
