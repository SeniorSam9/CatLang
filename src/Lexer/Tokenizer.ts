import { Token } from "./Token";
import { TokenType } from "./TokenType";

export function tokenize(expr: string): Array<Token> {
  let tokens = new Array<Token>();
  // split the expression by character
  let lexemes = expr.split("");

  // recognize each lexeme until EOF
  while (lexemes.length > 0) {
    /**
     * HANDLING SINGLE-CHARACTER TOKENS
     */
    switch (lexemes[0]) {
      case "(":
        tokens.push(new Token(lexemes.shift(), TokenType.OpenParen));
        break;
      case ")":
        tokens.push(new Token(lexemes.shift(), TokenType.CloseParen));
        break;
      case "+":
      case "-":
      case "*":
      case "/": {
        tokens.push(new Token(lexemes.shift(), TokenType.BinaryOperator));
        break;
      }
      case "=":
        tokens.push(new Token(lexemes.shift(), TokenType.Assignment));
        break;

      /*
       * HANDLING MULTI-CHARACTER TOKENS
       */
      default: {
      }
    }
  }

  return tokens;
}
