function argumentitive(number, letter) {
  if(typeof number !== Number || (typeof letter !== String && letter.length === 1)) {
    return console.error(new Error("Illegal Argument"));
  }
  console.log('not illegal');
}

argumentitive(2, 'a');
