/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googleapis.com vercel.com *.vercel.com assets.vercel.com *.vercel.sh vercel.live *.stripe.com twitter.com *.twitter.com *.google.com *.github.com *.codesandbox.io https://risk.clearbit.com wss://*.vercel.com localhost:* chrome-extension://*",
              "style-src 'self' 'unsafe-inline' *.googleapis.com vercel.com *.vercel.com assets.vercel.com *.vercel.sh vercel.live *.stripe.com twitter.com *.twitter.com *.google.com *.github.com *.codesandbox.io https://risk.clearbit.com wss://*.vercel.com localhost:* chrome-extension://* https://www.gstatic.com",
              "font-src 'self' data: *.googleapis.com *.gstatic.com",
              "img-src 'self' data: blob: *.googleapis.com *.gstatic.com",
              "connect-src 'self' *.googleapis.com vercel.com *.vercel.com"
            ].join('; ')
          }
        ]
      }
    ]
  }
}

export default nextConfig
