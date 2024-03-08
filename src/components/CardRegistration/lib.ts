export function getError(error: string) {
  switch (true) {
    case error.includes("email"):
      return "errorEmail";
    default:
      return "errorDefault";
  }
}
