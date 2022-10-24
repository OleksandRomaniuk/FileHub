import {validateAuthorization} from '../../validation/validate-forms.js';


const {module, test} = QUnit;

module('validateAuthorization', (hooks) => {
  let form;
  let button;
  hooks.beforeEach((assert) => {
    const fixture = document.getElementById('qunit-fixture');
    fixture.innerHTML = `
        <form  id="authorization-form" >
            <div class="fields-wrapper">
                <label for="email" > Email</label>
                <div>
                    <input name="email" id="email" class="input-text" placeholder="Email"  >
                </div>
                <label for="password" class="password">Password</label>
                <div>
                    <input class ="input-text" name="password" id="password" placeholder="Password">
                </div>
            </div>
            <div class="buttons-wrapper">
                <div>
                    <button type="submit" class="button primary" title = "Sign In">Sign In</button>
                </div>
                <a href="registration.html" class="blue-text" title="Don't have an account yet?">
                        Don't have an account yet?
                </a>
            </div>
        </form>`;
    form = fixture.firstElementChild;
    validateAuthorization(form);
    button = form.querySelector('button.primary');
  });


  test('Should add submit event listener', async function(assert) {
    const done = assert.async();
    assert.expect(1);
    button.click();
    setTimeout(() => {
      const errors = document.getElementsByClassName('error-text');
      assert.strictEqual(errors.length, 3, 'Should show 3 errors');
      done();
    }, 100);
  });

  test('Should validate incorrect password', (assert) => {
    const done = assert.async();
    assert.expect(3);

    const inputPassword = form.querySelector('input#password');
    inputPassword.value = 'asd';

    const inputEmail = form.querySelector('input#email');
    inputEmail.value = 'mariia@gmail.com';

    button.click();

    setTimeout(() => {
      const errors = [...document.getElementsByClassName('error-text')];
      assert.strictEqual(errors.length, 1, 'Should show 1 errors.');
      assert.strictEqual(errors[0].innerText, 'have to be more than 6', 'Should show error text.');
      const input = errors[0].previousElementSibling;
      assert.strictEqual(input.id, 'password', 'Should show sibling element input.');

      done();
    }, 100);
  });
  test('Should validate incorrect email size', (assert) => {
    const done = assert.async();
    assert.expect(3);

    const inputPassword = form.querySelector('input#password');
    inputPassword.value = 'a64514cxzsdsd';

    const inputEmail = form.querySelector('input#email');
    inputEmail.value = 'mari';
    button.click();


    setTimeout(() => {
      const errors = [...document.getElementsByClassName('error-text')];
      assert.strictEqual(errors.length, 1, 'Should show 1 errors.');
      assert.strictEqual(errors[0].innerText, 'have to be more than 5', 'Should show error text.');
      const input = errors[0].previousElementSibling;
      assert.strictEqual(input.id, 'email', 'Should show sibling element input.');

      done();
    }, 100);
  });
  test('Should validate incorrect email symbol input', (assert) => {
    const done = assert.async();
    assert.expect(3);

    const inputPassword = form.querySelector('input#password');
    inputPassword.value = 'a64514cxzsdsd';

    const inputEmail = form.querySelector('input#email');
    inputEmail.value = 'mari$%^&#@';
    button.click();


    setTimeout(() => {
      const errors = [...document.getElementsByClassName('error-text')];
      assert.strictEqual(errors.length, 1, 'Should show 1 errors.');

      assert.strictEqual(errors[0].innerText,
          'only Latin, numbers and symbols +.-_@ are allowed in email', 'Should show error text.');
      const input = errors[0].previousElementSibling;
      assert.strictEqual(input.id, 'email', 'Should show sibling element input.');
      done();
    }, 100);
  });
});


