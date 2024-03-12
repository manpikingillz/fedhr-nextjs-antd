'use client';

import { Alert, Result } from 'antd';

export const ErrorPage = ({ error }: { error: any }) => {
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
          subTitle="Sorry, something went wrong."
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

export const ErrorMessage = ({ error, closable = false }: { error: any, closable?: boolean }) => {
  const statusCode = error?.response?.status;
  if (statusCode) {
    if (statusCode === 403) {
      return (
        <Alert
          message="403 - Forbidden"
          description="Sorry, you are not authorized to access this information."
          type="warning"
          closable
        />
      );
    } else if (statusCode === 404) {
      return (
        <Alert
          message="404 - Not Found"
          description="Sorry, resource not found."
          type="error"
          closable={closable}
        />
      );
    } else if (statusCode === 500) {
      return (
        <Alert
          message="500 - Server Error"
          description="Sorry, something went wrong."
          type="error"
          closable={closable}
        />
      );
    }
  } else if (error.code === 'ERR_NETWORK') {
    return (
      <Alert
        message="500 - Network Error"
        description="Sorry, we couldn't connect to the server."
        type="error"
        closable={closable}
      />
    );
  }
  return (
    <Alert
      message="Error occured!"
      description="Sorry, something went wrong!"
      type="warning"
      closable
    />
  );
};
