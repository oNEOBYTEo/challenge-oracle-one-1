(() => {
  const form = document.querySelector('.form');
  const [encryptButton, decryptButton] = document.querySelectorAll('.form-btn');
  const output = document.querySelector('.container-output');

  let canEncrypt = true;

  const encrypter = (words = []) => {
    return words
      .map((word) => {
        return word
          .split('')
          .map((letter) => {
            switch (letter) {
              case 'e':
                return 'enter';

              case 'i':
                return 'imes';

              case 'a':
                return 'ai';

              case 'o':
                return 'ober';

              case 'u':
                return 'ufat';

              default:
                return letter;
            }
          })
          .join('');
      })
      .join(' ');
  };

  const decrypter = (words = []) => {
    return words
      .map((word) => {
        const letters = word.split('');
        letters.forEach((letter, i) => {
          switch (letter) {
            case 'e':
              if (letters.slice(i, i + 5).join('') === 'enter') {
                letters.splice(i, 5, 'e');
              }
              break;

            case 'i':
              if (letters.slice(i, i + 4).join('') === 'imes') {
                letters.splice(i, 4, 'i');
              }

              break;

            case 'a':
              if (letters.slice(i, i + 2).join('') === 'ai') {
                letters.splice(i, 2, 'a');
              }
              break;

            case 'o':
              if (letters.slice(i, i + 4).join('') === 'ober') {
                letters.splice(i, 4, 'o');
              }
              break;

            case 'u':
              if (letters.slice(i, i + 4).join('') === 'ufat') {
                letters.splice(i, 4, 'u');
              }
              break;

            default:
              break;
          }
        });
        return letters.join('');
      })
      .join(' ');
  };

  const copyToClickboard = (text) => {
    const textArea = document.querySelector('.output-result');
    textArea.select();
    document.execCommand('copy');
  };

  const handlerResult = (e) => {
    e.preventDefault();

    const text = document.querySelector('.form-input').value.toLowerCase();
    const words = text.split(' ');

    const textModified = canEncrypt ? encrypter(words) : decrypter(words);

    output.innerHTML = `
    <textarea class="output-result" readonly>${textModified}</textarea>
    <button class="btn output-btn" >Copiar</button>
    `;

    document.querySelector('.output-btn').addEventListener('click', () => {
      copyToClickboard();
    });
  };

  encryptButton.addEventListener('click', () => {
    canEncrypt = true;
  });

  decryptButton.addEventListener('click', () => {
    canEncrypt = false;
  });

  form.addEventListener('submit', handlerResult);
})();
