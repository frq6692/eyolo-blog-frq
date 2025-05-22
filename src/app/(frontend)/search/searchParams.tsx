import { createLoader, parseAsString } from "nuqs/server";

export const queryParam = parseAsString.withDefault("").withOptions({
  shallow: false,
  clearOnDefault: true,
  // scroll: true,
  throttleMs: 250,
});

export const loadSearchParams = createLoader({
  q: queryParam,
});
