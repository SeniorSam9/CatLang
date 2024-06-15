import { Token } from "./Token";
import { TokenType } from "./TokenType";

export function tokenize(expr: string) {
  let tokens = new Array<Token>();
  // split the expression by character
  let lexemes = expr.split("");

  // recognize each lexeme until EOF
  while (lexemes.length > 0) {
    if (lexemes[0] === "(") {
      tokens.push(new Token(lexemes.shift(), TokenType.OpenParen));
    } else if (lexemes[0] === "(") {
      tokens.push(new Token(lexemes.shift(), TokenType.CloseParen));
    }
  }
}
