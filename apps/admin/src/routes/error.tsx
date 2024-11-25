import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export const ErrorRoute = () => {
  const error = useRouteError();
  console.error(error);

  let errorMessage = "";
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-y-8">
      <h1 className="text-xl">Something went wrong.</h1>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
};
