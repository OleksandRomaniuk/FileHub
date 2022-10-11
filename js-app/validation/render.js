/**
 * Add error text in html.
 * @param {string} input - name of input in HTML
 * @param {string} message
 */
export function renderError(input, message) {
  const inputElement = document.getElementsByName(input)[0];
  inputElement.classList.add('input-error');
  const messageElement = document.createElement('p');
  messageElement.classList.add('error-text');
  messageElement.textContent = message;
  inputElement.parentElement.append(messageElement);
}

/**
 * Delete error text in HTML.
 */
export function clearError() {
  const messageElement = document.querySelectorAll('p.error-text');
  messageElement.forEach((element) => {
    element.remove();
  });
  const errorInputs = [...document.getElementsByClassName('input-error')];
  errorInputs.forEach((element) => element.classList.remove('input-error'));
}
