import { Arguments } from "./types";

export const parser = (argv: string[]): Arguments => {
  return {
    node: '',
    bin: '',
    path: '',
    command: '',
    options: {}
  }
}