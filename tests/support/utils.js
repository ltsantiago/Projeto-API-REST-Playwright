export function generateULID() {
  const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford Base32
  const TIME_LEN = 10;
  const RANDOM_LEN = 16;

  function encodeTime(time) {
    let output = "";
    for (let i = 0; i < TIME_LEN; i++) {
      output = ENCODING[time % 32] + output;
      time = Math.floor(time / 32);
    }
    return output;
  }

  function encodeRandom() {
    let output = "";
    for (let i = 0; i < RANDOM_LEN; i++) {
      const rand = Math.floor(Math.random() * 32);
      output += ENCODING[rand];
    }
    return output;
  }

  const time = Date.now();
  return encodeTime(time) + encodeRandom();
}