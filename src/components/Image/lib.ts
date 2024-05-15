export function extratText(text: string): string[] {
  const palavras: string[] = [];
  let palavraAtual = "";

  for (let i = 0; i < text.length; i++) {
    if (text[i] !== " ") {
      palavraAtual += text[i];
    } else {
      palavras.push(palavraAtual);
      palavraAtual = "";
    }
  }

  if (palavraAtual !== "") {
    palavras.push(palavraAtual);
  }
  return palavras;
}
