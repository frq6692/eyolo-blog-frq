import { createLoader, parseAsInteger } from "nuqs/server";

export const pageParam = parseAsInteger.withDefault(1).withOptions({
  shallow: false,
  clearOnDefault: true,
  scroll: true,
});

export const loadSearchParams = createLoader({
  page: pageParam,
});
