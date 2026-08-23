import { createMDX } from "@hanzo/docs-mdx/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile packages that might have issues with pnpm symlinks
  transpilePackages: ["chrono-node", "@hanzo/ui-shadcn"],

  // WEBPACK, and both scripts say so.
  //
  // @hanzo/ui renders through @hanzo/gui, which is react-native-web here, and
  // the react-native-* packages in that graph choose a platform by FILE
  // EXTENSION rather than by an exports condition: `./elements` means
  // `elements.web.js` on the web and `elements.js` on a device, both shipped in
  // the same tarball. A resolver that does not try `.web.*` first takes the
  // device build and dies inside Fabric's TurboModuleRegistry, a native binding
  // that cannot exist in a browser.
  //
  // Turbopack's `resolveExtensions` does not reach into node_modules — measured:
  // with `.web.js` first it still resolved `react-native-svg/lib/module/
  // ReactNativeSVG.js`, the device build. Webpack's does, which is why the site
  // builds and serves on webpack. `react-native$` is exact-match: the deep
  // `react-native/Libraries/…` paths a device build reaches for must stay
  // unresolved rather than be silently pointed at react-native-web.
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-native$": "react-native-web",
    }
    config.resolve.extensions = [
      ".web.tsx",
      ".web.ts",
      ".web.jsx",
      ".web.js",
      ".web.mjs",
      ...config.resolve.extensions,
    ]
    // @wagmi/core reaches an optional connector through `import('accounts')`
    // marked `turbopackOptional`, a comment only Turbopack reads. The package
    // already handles the module being absent; webpack needs to be told it is.
    config.resolve.fallback = { ...config.resolve.fallback, accounts: false }
    return config
  },

  // The docs site is a static export, wherever it is built. It is served by
  // hanzoai/static; `next dev` is unaffected by this.
  output: "export",

  // Directory-style URLs, so a static server resolves /docs/button/index.html.
  trailingSlash: true,

  // Asset prefix for proper loading on custom domain
  assetPrefix: process.env.NEXT_PUBLIC_APP_URL || "",

  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingIncludes: {
    "/*": ["./registry/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  redirects() {
    return [
      {
        source: "/components",
        destination: "/docs/components/accordion",
        permanent: true,
      },
      {
        source: "/docs/components",
        destination: "/docs/components/accordion",
        permanent: true,
      },
      {
        source: "/docs/primitives/:path*",
        destination: "/docs/components/:path*",
        permanent: true,
      },
      {
        source: "/figma",
        destination: "/docs/figma",
        permanent: true,
      },
      {
        source: "/docs/forms",
        destination: "/docs/components/form",
        permanent: false,
      },
      {
        source: "/docs/forms/react-hook-form",
        destination: "/docs/components/form",
        permanent: false,
      },
      {
        source: "/sidebar",
        destination: "/docs/components/sidebar",
        permanent: true,
      },
      {
        source: "/react-19",
        destination: "/docs/react-19",
        permanent: true,
      },
      {
        source: "/view/styles/:style/:name",
        destination: "/view/:name",
        permanent: true,
      },
      {
        source: "/docs/:path*.mdx",
        destination: "/docs/:path*.md",
        permanent: true,
      },
      {
        source: "/mcp",
        destination: "/docs/mcp",
        permanent: false,
      },
    ]
  },
  rewrites() {
    return [
      {
        source: "/docs/:path*.md",
        destination: "/llm/:path*",
      },
    ]
  },
}

const withMDX = createMDX({
  configPath: "source.config.ts",
  outDir: ".source",
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      // Keep background color from theme
      keepBackground: false,
    },
  },
})

export default withMDX(nextConfig)