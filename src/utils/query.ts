import qs from 'qs';

export type IQuery = {
  limit?: number;
  page?: number;
  fields?: string | string[];
  filter?: { [key: string]: string };
  populate?: { [key: string]: string | string[] };
};

export function stringifyQuery(query: IQuery) {
  const queryString = qs.stringify(query, {
    arrayFormat: 'comma',
    encode: false,
    addQueryPrefix: true,
    sort: (a, b) => a.localeCompare(b),
    indices: true,
    encodeValuesOnly: true,
    strictNullHandling: true,
    skipNulls: true,
    serializeDate: (d) => d.toISOString(),
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
  });
  return queryString;
}

export function parseQuery(queryString: string): IQuery {
  const parsedQuery = qs.parse(queryString, {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: true,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: true,
    interpretNumericEntities: true,
    parameterLimit: 1000,
    parseArrays: false,
    plainObjects: false,
    strictNullHandling: true,
  });
  return parsedQuery;
}
