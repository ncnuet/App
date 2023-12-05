/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.qrserver.com',
                port: '',
                pathname: '/**',
            },
        ]
    }
}

module.exports = nextConfig
