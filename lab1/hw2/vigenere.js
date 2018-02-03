//encrypt takes a string and an array of numbers and returns the Vigenere ciphertext
function encrypt(str, key) {
  var encrypted = key.map(function(shift, i) {
    var normalized = str.charCodeAt(i) - 'a'.charCodeAt(0);
    var shifted = (normalized + shift) % 26;
    return String.fromCharCode('a'.charCodeAt(0) + shifted);
  });
  return encrypted.join("");
}

//findKey determines an array of numbers that will result in the ciphertext when encrypted by the string
function findKey(str, ciphertext) {
  var key = str.split('').map(function(char, i) {
    var distance = ciphertext.charCodeAt(i) - char.charCodeAt(0)  ;
    if (distance < 0) {
      return 26 + distance;
    } else {
      return distance
    }
  });
  return key;
}

//decrypt returns the plaintext from the ciphertext and key.
function decrypt(str, key) {
  var encrypted = key.map(function(shift, i) {
    var normalized = str.charCodeAt(i) - 'a'.charCodeAt(0);
    var shifted = (normalized - shift);
    if (shifted < 0) {
      shifted = 26 + shifted;
    }
    return String.fromCharCode('a'.charCodeAt(0) + shifted);
  });
  return encrypted.join("");
}

var encrypted = encrypt('sendmoremoney', [9,0,1,7,23,15,21,14,11,11,2,8,9])
var test1 = decrypt(encrypted, [9,0,1,7,23,15,21,14,11,11,2,8,9]);
console.log(encrypted);
console.log("Test 1: Decrypt ciphertext", test1, test1 === 'sendmoremoney');
var newKey = findKey('cashnotneeded', encrypted);
var test2 = decrypt(encrypted, newKey);
console.log(newKey);
console.log("Test 2: Decrpyted ciphertext is now 'cashnotneeded'", test2, test2 === 'cashnotneeded');
var test3 = encrypt('cashnotneeded', newKey);
console.log("Test 3: 'cashnotneeded' has the same ciphertext as 'sendmoremoney'", test3, test3 === encrypted);
