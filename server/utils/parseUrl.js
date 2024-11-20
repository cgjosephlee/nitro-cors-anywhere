import { tldList } from "./tldList.js";

/**
 * Parse target URL
 * @param {H3Event} event
 * @returns {string | false}
 */
export function parseUrl(event) {
  let rawTargetUrl = decodeURIComponent(event.path.substring(1));
  try {
    if (!rawTargetUrl) {
      return false;
    }
    if (!rawTargetUrl.startsWith("http")) {
      rawTargetUrl = `https://${rawTargetUrl}`;
    }
    const targetUrl = new URL(rawTargetUrl);
    if (!isValidTLD(targetUrl) && !isIP(targetUrl)) {
      return false;
    }
    return targetUrl.toString();
  } catch {
    return false;
  }
}

/**
 * Check if the URL has a valid top-level domain (TLD)
 * @param {URL} url
 * @returns {boolean}
 */
function isValidTLD(url) {
const hostname = url.hostname;
  if (hostname.includes(".") && !hostname.startsWith(".") && !hostname.endsWith(".")) {
  const tld = url.hostname.split(".").pop().toUpperCase();
  return tldList.has(tld);
} else {
    return false;
  }
}

/**
 * Check if the URL is an IP address
 * @param {URL} url
 * @returns {boolean}
 */
function isIP(url) {
  // ref: https://github.com/nodejs/node/blob/v20.x/lib/internal/net.js
  // IPv4 Segment
  const v4Seg = "(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])";
  const v4Str = `(?:${v4Seg}\\.){3}${v4Seg}`;
  const IPv4Reg = new RegExp(`^${v4Str}$`);

  // IPv6 Segment
  const v6Seg = "(?:[0-9a-fA-F]{1,4})";
  const IPv6Reg = new RegExp(
    "^(?:" +
      `(?:${v6Seg}:){7}(?:${v6Seg}|:)|` +
      `(?:${v6Seg}:){6}(?:${v4Str}|:${v6Seg}|:)|` +
      `(?:${v6Seg}:){5}(?::${v4Str}|(?::${v6Seg}){1,2}|:)|` +
      `(?:${v6Seg}:){4}(?:(?::${v6Seg}){0,1}:${v4Str}|(?::${v6Seg}){1,3}|:)|` +
      `(?:${v6Seg}:){3}(?:(?::${v6Seg}){0,2}:${v4Str}|(?::${v6Seg}){1,4}|:)|` +
      `(?:${v6Seg}:){2}(?:(?::${v6Seg}){0,3}:${v4Str}|(?::${v6Seg}){1,5}|:)|` +
      `(?:${v6Seg}:){1}(?:(?::${v6Seg}){0,4}:${v4Str}|(?::${v6Seg}){1,6}|:)|` +
      `(?::(?:(?::${v6Seg}){0,5}:${v4Str}|(?::${v6Seg}){1,7}|:))` +
      ")(?:%[0-9a-zA-Z-.:]{1,})?$",
  );

  return IPv4Reg.test(url.hostname) || IPv6Reg.test(url.hostname);
}
