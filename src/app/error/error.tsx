'use client';

import { message } from 'antd';

// TODO: Fix this console warning
//  Warning: [antd: message] Static function can not consume
// context like dynamic theme. Please use 'App' component instead.

export function showError(error: any) {
  let errorMessage = 'An unknown error occurred';

  if (error.response && error.response.data && error.response.data.message) {
    errorMessage = error.response.data.message;
  } else if (error.message) {
    errorMessage = error.message;
  }

  message.error(errorMessage);
}

export function showSuccess(response: any) {
  let successMessage = 'Saved successfully';

  if (response.request.responseURL.includes("delete")) {
    successMessage = 'Deleted Successfully'
  }

  if (response.data && response.data.message) {
    successMessage = response.data.message;
  }

  message.success(successMessage);
}

export function showRequestError(error: any) {
  let errorMessage = 'An issue occurred before sending the request.';

  if (error.message) {
    errorMessage = error.message;
  }

  else if (error.config && error.config.error) {
    errorMessage = error.config.error;
  }

  message.error(errorMessage);
}
