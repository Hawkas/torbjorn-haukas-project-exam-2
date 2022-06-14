import { NextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

type QueryObject = { location?: string } | { type?: string } | ParsedUrlQuery;
const changeQuery = (router: NextRouter, queryObject?: QueryObject) => {
  const query = queryObject;
  router.replace(
    {
      query,
    },
    undefined,
    {
      shallow: true,
    }
  );
};
export const handleChange = (
  value: string,
  router: NextRouter,
  queryParam: 'type' | 'location'
) => {
  const queryObject = { ...router };
  if (value !== 'all') {
    queryObject.query = { ...queryObject.query, [queryParam]: value };
    changeQuery(router, { ...queryObject.query });
  } else {
    delete queryObject.query[queryParam];
    changeQuery(router, { ...queryObject.query });
  }
};
