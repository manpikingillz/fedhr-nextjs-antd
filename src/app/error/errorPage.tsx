'use client';

import { Result } from 'antd';

const ErrorPage = ({ error }: { error: any }) => {
  const statusCode = error?.response?.status;
  if (statusCode) {
    if (statusCode === 403) {
      return (
        <Result
          status="403"
          title="403 - Forbidden"
          subTitle="Sorry, you are not authorized to access this information."
        />
      );
    } else if (statusCode === 404) {
      return (
        <Result
          status="404"
          title="404 - Not Found"
          subTitle="Sorry, resource not found."
        />
      );
    } else if (statusCode === 500) {
      return (
        <Result
          status="500"
          title="500 - Server Error"
          subTitle="Sorry, something went wrong ."
        />
      );
    }
  } else if (error.code === 'ERR_NETWORK') {
    return (
      <Result
        status="500"
        title="Network Error"
        subTitle="Sorry, we couldn't connect to the server."
      />
    );
  }
  return <Result status="warning" title="Sorry, something went wrong!" />;
};

export default ErrorPage;
