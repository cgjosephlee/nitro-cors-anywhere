/* eslint-disable no-undef */
import { parseUrl } from "../utils/parseUrl";
import { isAllowedOrigin, isAllowedTarget } from "~/utils/allowUrl";

export default eventHandler(async (event) => {
  // ref: https://h3.unjs.io/utils/advanced#handlecorsevent-options
  const didHandleCors = handleCors(event, {
    origin: getHeader(event, "origin"),
    // exposeHeaders: [],
    // credentials: false,
    preflight: { statusCode: 204 },
    methods: event.method,
    // allowHeaders: [],
    // maxAge: false,
  });
  if (didHandleCors) {
    // is preflight request
    return;
  }

  // check if origin is allowed
  if (!isAllowedOrigin(event)) {
    throw createError({ status: 403, message: "Forbidden" });
  }

  // parse url
  const targetUrl = parseUrl(event);
  if (!targetUrl) {
    throw createError({ status: 400, message: "Invalid URL" });
  }
  console.log(`targetUrl: ${targetUrl}`);

  // check if target is allowed
  if (!isAllowedTarget(event, targetUrl)) {
    throw createError({ status: 403, message: "Forbidden" });
  }

  return proxyRequest(event, targetUrl);
});
