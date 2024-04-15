export function getEnvironmentVariable(name: string): string {
  if (import.meta.env[name]) {
    return import.meta.env[name];
  } else {
    throw new Error(`Environment variable ${name} is not defined.`);
  }
}
