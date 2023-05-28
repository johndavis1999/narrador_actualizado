document.addEventListener('DOMContentLoaded', function() {
  const textos = document.querySelectorAll('.texto');
  const imagenes = document.querySelectorAll('img[alt]');
  const elementosAriaLabel = document.querySelectorAll('[aria-label]');

  let ultimoElementoNarrado = null;

  function decir(texto) {
    var mensaje = new SpeechSynthesisUtterance(texto);
    mensaje.onend = function() {
      console.log('Terminó de reproducir');
    };
    speechSynthesis.speak(mensaje);
  }

  function detener() {
    speechSynthesis.cancel();
  }

  function iniciarNarrador(elemento) {
    if (elemento.getAttribute('aria-label')) {
      decir(elemento.getAttribute('aria-label'));
      ultimoElementoNarrado = elemento.getAttribute('aria-label');
    } else {
      if (elemento.innerText) {
        decir(elemento.innerText);
        ultimoElementoNarrado = elemento.innerText;
      } else if (elemento.alt) {
        decir(elemento.alt);
        ultimoElementoNarrado = elemento.alt;
      }
    }
  }

  function detenerNarrador() {
    detener();
    ultimoElementoNarrado = null;
  }

  function esMismoElemento(elemento) {
    return ultimoElementoNarrado === elemento;
  }

  textos.forEach((texto) => {
    texto.addEventListener('mouseover', function() {
      if (!esMismoElemento(texto)) {
        iniciarNarrador(texto);
      }
    });
    texto.addEventListener('mouseout', function() {
      detenerNarrador();
    });
  });

  imagenes.forEach((imagen) => {
    imagen.addEventListener('mouseover', function() {
      if (!esMismoElemento(imagen)) {
        iniciarNarrador(imagen);
      }
    });
    imagen.addEventListener('mouseout', function() {
      detenerNarrador();
    });
  });

  elementosAriaLabel.forEach((elemento) => {
    elemento.addEventListener('mouseover', function() {
      if (!esMismoElemento(elemento)) {
        iniciarNarrador(elemento);
      }
    });
    elemento.addEventListener('mouseout', function() {
      detenerNarrador();
    });
  });
});
