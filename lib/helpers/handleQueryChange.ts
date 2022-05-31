import { NextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

type QueryObject = { location?: string } | { type?: string } | ParsedUrlQuery;
const changeQuery = (router: NextRouter, queryObject?: QueryObject) => {
  router.replace(
    {
      query: { ...router.query, ...queryObject },
    },
    undefined,
    {
      shallow: true,
    }
  );
};
export const handleChange = (value: string, router: NextRouter, queryParam: string) => {
  if (value !== 'all') {
    changeQuery(router, { [queryParam]: value });
  } else {
    delete router.query[queryParam];
    changeQuery(router, router.query);
  }
};
