export function getSuccessView(data) {
  return {
    data
  };
}

export function getErrorView(data) {
  return {
    error: {
      message: data
    }
  };
}
