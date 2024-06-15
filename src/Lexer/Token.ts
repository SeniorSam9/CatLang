import { TokenType } from "./TokenType";

export class Token {
  // value should have been a string but typescript is dumb
  private value: string | undefined;
  private type: TokenType;

  constructor(value: string | undefined, type: TokenType) {
    this.value = value;
    this.type = type;
  }
}
