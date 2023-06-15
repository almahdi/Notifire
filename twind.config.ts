import  typography from "https://esm.sh/@twind/typography@0.0.2"
import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  plugins: {
    ...typography(),
  }

} as Options;
