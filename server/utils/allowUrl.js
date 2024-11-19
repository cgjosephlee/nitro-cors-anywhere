/**
 * Check if the URL is in the environment list
 * @param {string} url
 * @param {string} param
 * @returns {boolean}
 */
function isInEnvList(url, param) {
  const envList = param.split(",");
  return envList.indexOf(url) !== -1;
}

/**
 * Check if the URL is allowed
 * @param {string} origin
 * @param {string} allowParam
 * @param {string} banParam
 * @returns {boolean}
 */
function allowUrl(origin, allowParam, banParam) {
  let a, b;
  if (!allowParam || allowParam === "*" || allowParam === "null") {
    a = true;
  } else {
    a = isInEnvList(origin, allowParam);
  }
  if (!banParam || banParam === "null") {
    b = true;
  } else if (banParam === "*") {
    b = false;
  } else {
    b = !isInEnvList(origin, banParam);
  }
  return a && b;
}

/**
 * Check if Origin URL is allowed
 * @param {H3Event} event
 * @returns {boolean}
 */
export function isAllowedOrigin(event) {
  const origin = getHeader(event, "origin");
  const envAllowed = useRuntimeConfig(event).allowedOrigins;
  const envBanned = useRuntimeConfig(event).bannedOrigins;
  if (!origin) {
    // server side request
    return true;
  }
  return allowUrl(origin, envAllowed, envBanned);
}

/**
 * Check if Target URL is allowed
 * @param {H3Event} event
 * @param {string} target
 * @returns {boolean}
 */
export function isAllowedTarget(event, target) {
  const origin = new URL(target).origin;
  const envAllowed = useRuntimeConfig(event).allowedTargets;
  const envBanned = useRuntimeConfig(event).bannedTargets;
  return allowUrl(origin, envAllowed, envBanned);
}
