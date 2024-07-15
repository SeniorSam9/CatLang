import * as fs from "fs";
import { tokenize } from "./src/Lexer/Tokenizer";

const code = fs.readFileSync("test.txt", "utf-8");

for (var token of tokenize(code)) {
  console.log(token);
}
