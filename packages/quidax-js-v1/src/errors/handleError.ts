const handleError = (error: any) => {
  if (error.response) {
    const { status, data } = error.response;
    const errorMessage = data.message || 'An unknown error occurred';
    const errorCode = data.data.code || 'UNKNOWN_ERROR';
    console.error(
      `Error Code: ${errorCode}, Status Code: ${status}, Message: ${errorMessage}`
    );
    return {
      success: false,
      statusCode: status,
      message: errorMessage,
      code: errorCode,
    };
  } else if (error.request) {
    const errorMessage = 'No response received from the server';
    console.error(errorMessage);
    return {
      success: false,
      statusCode: 0,
      message: errorMessage,
      code: 'NO_RESPONSE',
    };
  } else {
    const errorMessage = error.message;
    console.error(errorMessage);
    return {
      success: false,
      statusCode: 0,
      message: errorMessage,
      code: 'REQUEST_SETUP_ERROR',
    };
  }
};

export default handleError;
