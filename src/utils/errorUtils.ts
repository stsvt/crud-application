export const handleError = function (
  err: unknown,
  setError: (error: string) => void,
  defaultMessage = "Unknown error"
) {
  const message =
    err &&
    typeof err === "object" &&
    "message" in err &&
    typeof err.message === "string"
      ? err.message
      : defaultMessage;

  setError(message);
};
