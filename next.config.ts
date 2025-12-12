import withLinaria, { LinariaConfig } from 'next-with-linaria';

// List the packages that need transpiling (react-day-picker & date-fns)
const transpilePackages = ['react-day-picker', 'date-fns'];

const nextConfig: LinariaConfig = {
  transpilePackages,
  reactStrictMode: true,
  linaria: {
    fastCheck: false,
  },
};

export default withLinaria(nextConfig);
