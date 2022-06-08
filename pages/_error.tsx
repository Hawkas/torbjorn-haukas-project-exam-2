import React from 'react';
import { NextPage } from 'next';
import ErrorTemplate from '@components/Error';

interface ErrorProps {
  statusCode: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => <ErrorTemplate statusCode={statusCode} />;

Error.getInitialProps = ({ res, err }): ErrorProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode: statusCode || 404 };
};

export default Error;
