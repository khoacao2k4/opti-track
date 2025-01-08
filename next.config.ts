const nextConfig = {

  reactStrictMode: false,

  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      },
    }
  },

  //Use for the BUILD PROD
  webpack(config: any) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: { test: { test: (arg0: string) => any; }; }) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // Convert all other *.svg?icon imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: /icon/, // *.svg?icon
        use: ['@svgr/webpack'],
      },
      // Reapply the existing rule, for all other *.svg imports
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: { not: /icon/ }, // exclude if *.svg?icon
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.giphy.com",
      },
    ],
  },
};

export default nextConfig;