/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.module.rules.push({
            test: /\.pdf$/,
            use: [{
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'static/pdfs/', 
              }
            }],
          });
        }
        return config;
      },
 }


module.exports = nextConfig

// module.exports = {
//     webpack: (config, { isServer }) => {
//       // Only apply on the client-side
//       if (!isServer) {
//         config.module.rules.push({
//           test: /\.pdf$/,
//           use: ['file-loader'],
//         });
//       }
//       return config;
//     },
//   };