import type { NextConfig } from "next";
import { withLinaria } from "next-with-linaria";

const nextConfig: NextConfig = {
  /* config options here */
  linaria: {
    fastCheck: false,
    evaluate: false,
    displayName: false,
  },
};

export default withLinaria(nextConfig);
