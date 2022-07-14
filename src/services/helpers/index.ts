async function formsErrorMessage(err: unknown) {
    let message: string = '';
    if (typeof err === "string") {
      message = err;
  } else if (err instanceof Error) {
      message = err.message;
  }
    console.error(err);
    return message;
}

export { formsErrorMessage };