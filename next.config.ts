import type { NextConfig } from "next";
import withLinaria, { LinariaConfig } from 'next-with-linaria';

const nextConfig: LinariaConfig = {
  /* config options here */
  linaria: {
    fastCheck: false,
  },
};

export default withLinaria(nextConfig);;
