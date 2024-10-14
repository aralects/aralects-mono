import { useRouter } from "next/router";

function useUrlQueryParam(paramName: string): string | undefined;

function useUrlQueryParam(paramName: string, defaultValue: string): string;

/**
 * Parses a query parameter from the current URL.
 * @param paramName The name of the query parameter.
 * @param defaultValue The default value to return if the query parameter is not present or invalid.
 * @returns The value of the query parameter, or the default value.
 */
function useUrlQueryParam(paramName: string, defaultValue?: string) {
  const router = useRouter();
  const paramValue = router.query[paramName];

  // check if the parameter exists and is a string
  if (paramValue && typeof paramValue === "string") {
    return paramValue;
  }

  return defaultValue;
}

export default useUrlQueryParam;
