import { KEYWORDS } from "./Keywords";
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
        // building number token
        if (isInt(lexemes[0])) {
          let num = "";
          while (lexemes.length > 0 && isInt(lexemes[0])) {
            num += lexemes.shift();
          }
          tokens.push(new Token(num, TokenType.Number));
        }
        // test again keywords
        else if (isAlpha(lexemes[0])) {
          let identifier = "";
          while (lexemes.length > 0 && isAlpha(lexemes[0])) {
            identifier += lexemes.shift();
          }
          const reserved = KEYWORDS[identifier];
          if (reserved === undefined) {
            tokens.push(new Token(identifier, TokenType.Identifier));
          } else {
            tokens.push(new Token(identifier, reserved));
          }
        } else if (isSkippableLexeme(lexemes[0])) {
          // move to enxt character
          lexemes.shift();
        }
        // will be more detailed in future
        else {
          console.warn("Unrecognized character at: ", lexemes[0]);
          process.exit(0);
        }
        break;
      }
    }
  }
  tokens.push(new Token("EOF", TokenType.EOF));
  return tokens;
}

const isAlpha = (lexeme: string): boolean => {
  return lexeme.toUpperCase() !== lexeme.toLowerCase();
};

// to be tested
const isInt = (lexeme: string): boolean => {
  if (lexeme.length !== 1) return false;
  return !isNaN(Number(lexeme));
};

const isSkippableLexeme = (lexeme: string): boolean => {
  return lexeme === " " || lexeme === "\n" || lexeme === "\t";
};
