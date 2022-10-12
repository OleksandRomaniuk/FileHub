import {validateRegistration} from '../../validation/validate-forms.js';

const {module, test} = QUnit;

module('validateRegistration', (hooks) =>{
  let form;
  let button;
  hooks.beforeEach((assert)=>{
    const fixture = document.getElementById('qunit-fixture');
    fixture.innerHTML = `
         <form action="registration-error.html" method="post" id="registration-form">
            <div class="fields-wrapper registration">
                <label for="email">
                    Email
                </label>
                <div>
                    <input id="email" name="email" class="input-text" placeholder="Email" >
                </div>
                <label for="password" class="grid-password">
                    Password
                </label>
                <div>
                    <input id="password" type="password" name="password" placeholder="Password"  class="input-text">
                </div>
                <label for="confirm-password">
                    Confirm Password
                </label>
                <div>
                     <input  id="confirm-password" type="password" placeholder="Confirm Password" 
                     name="confirm-password" class="input-text">
                </div>
            </div>

            <div class="buttons-wrapper">
                <div>
                    <button class="button primary" title="Sign Up">Sign Up</button>
                </div>
                <div class="blue-text account">
                    <a href="authorization.html" class="blue-text link" title="Already have an account?">
                        Already have an account?</a>
                </div>
            </div>
        </form>`;
    form = fixture.firstElementChild;
    validateRegistration(form);
    button = form.querySelector('button.primary');
  });


  test('Should add submit event listener', async function(assert) {
    const done = assert.async();
    assert.expect(1);
    button.click();
    setTimeout(()=>{
      const errors = document.getElementsByClassName('error-text');
      assert.strictEqual(errors.length, 3, 'Should show 3 errors');
      done();
    }, 100);
  });

  test('Should validate incorrect password', (assert) =>{
    const done = assert.async();
    assert.expect(3);

    const inputPassword = form.querySelector('input#password');
    inputPassword.value = 'asd';

    const inputEmail = form.querySelector('input#email');
    inputEmail.value = 'mariia@gmail.com';

    const inputConfirmPassword = form.querySelector('input#confirm-password');
    inputConfirmPassword.value = 'asd';

    button.click();

    setTimeout(()=>{
      const errors =[...document.getElementsByClassName('error-text')];
      assert.strictEqual(errors.length, 1, 'Should show 1 errors.');
      assert.strictEqual(errors[0].innerText, 'have to be more than 6', 'Should show error text.');
      const input = errors[0].previousElementSibling;
      assert.strictEqual(input.id, 'password', 'Should show sibling element input.');

      done();
    }, 100);
  });

  test('Should validate incorrect email size', (assert) =>{
    const done = assert.async();
    assert.expect(3);

    const inputPassword = form.querySelector('input#password');
    inputPassword.value = 'password';

    const inputConfirmPassword = form.querySelector('input#confirm-password');
    inputConfirmPassword.value = 'password';


    const inputEmail = form.querySelector('input#email');
    inputEmail.value = 'gm';
    button.click();


    setTimeout(()=>{
      const errors =[...document.getElementsByClassName('error-text')];
      assert.strictEqual(errors.length, 1, 'Should show 1 errors.');
      assert.strictEqual(errors[0].innerText, 'have to be more than 5', 'Should show error text.');
      const input = errors[0].previousElementSibling;
      assert.strictEqual(input.id, 'email', 'Should show sibling element input.');

      done();
    }, 100);
  });
  test('Should validate incorrect email symbol input', (assert) =>{
    const done = assert.async();
    assert.expect(3);

    const inputPassword = form.querySelector('input#password');
    inputPassword.value = 'a64514cxzsdsd';


    const inputConfirmPassword = form.querySelector('input#confirm-password');
    inputConfirmPassword.value = 'a64514cxzsdsd';

    const inputEmail = form.querySelector('input#email');
    inputEmail.value = 'mari$%^&#@';
    button.click();


    setTimeout(()=>{
      const errors =[...document.getElementsByClassName('error-text')];
      assert.strictEqual(errors.length, 1, 'Should show 1 errors.');

      assert.strictEqual(errors[0].innerText,
          'only Latin, numbers and symbols +.-_@ are allowed in email', 'Should show error text.');
      const input = errors[0].previousElementSibling;
      assert.strictEqual(input.id, 'email', 'Should show sibling element input.');
      done();
    }, 100);
  });
  test('Should validate incorrect confirm password', (assert) =>{
    const done = assert.async();
    assert.expect(3);

    const inputPassword = form.querySelector('input#password');
    inputPassword.value = 'a64514cxzsdsd';

    const inputConfirmPassword = form.querySelector('input#confirm-password');
    inputConfirmPassword.value = 'a';

    const inputEmail = form.querySelector('input#email');
    inputEmail.value = 'mari@gmail.com';
    button.click();


    setTimeout(()=>{
      const errors =[...document.getElementsByClassName('error-text')];
      assert.strictEqual(errors.length, 1, 'Should show 1 errors.');

      assert.strictEqual(errors[0].innerText,
          'Passwords aren\'nt equals');
      const input = errors[0].previousElementSibling;
      assert.strictEqual(input.id, 'confirm-password', 'Should show sibling element input.');
      done();
    }, 100);
  });
  test('Should validate incorrect confirm password and invalid password', (assert) =>{
    const done = assert.async();
    assert.expect(5);

    const inputPassword = form.querySelector('input#password');
    inputPassword.value = 'at';

    const inputConfirmPassword = form.querySelector('input#confirm-password');
    inputConfirmPassword.value = 'a';

    const inputEmail = form.querySelector('input#email');
    inputEmail.value = 'mari@gmail.com';
    button.click();


    setTimeout(()=>{
      const errors =[...document.getElementsByClassName('error-text')];
      assert.strictEqual(errors.length, 2, 'Should show 2 errors.');

      assert.strictEqual(errors[0].innerText, 'have to be more than 6');
      assert.strictEqual(errors[1].innerText, 'Passwords aren\'nt equals');
      let input = errors[0].previousElementSibling;
      assert.strictEqual(input.id, 'password', 'Should show sibling element input.');
      input = errors[1].previousElementSibling;
      assert.strictEqual(input.id, 'confirm-password', 'Should show sibling element input.');
      done();
    }, 100);
  });

  test('Should clear error texts after entering correct values.', (assert) =>{
    const done = assert.async();
    assert.expect(9);

    const inputPassword = form.querySelector('input#password');
    inputPassword.value = 'pass';

    const inputConfirmPassword = form.querySelector('input#confirm-password');
    inputConfirmPassword.value = 'a';

    const inputEmail = form.querySelector('input#email');
    inputEmail.value = 'mari@gmail.com';
    button.click();


    setTimeout(()=>{
      let errors =[...document.getElementsByClassName('error-text')];
      assert.strictEqual(errors.length, 2, 'Should show 2 errors.');

      assert.strictEqual(errors[0].innerText, 'have to be more than 6', 'should show text of error');
      assert.strictEqual(errors[1].innerText, 'Passwords aren\'nt equals', 'should show text of error');
      let input = errors[0].previousElementSibling;
      assert.strictEqual(input.id, 'password', 'Should show sibling element input.');
      input = errors[1].previousElementSibling;
      assert.strictEqual(input.id, 'confirm-password', 'Should show sibling element input.');

      inputPassword.value = 'password';
      inputConfirmPassword.value = 'password';
      button.click();

      errors =[...document.getElementsByClassName('error-text')];
      assert.strictEqual(errors.length, 0, 'Should show 0 errors.');

      const inputs = form.querySelectorAll('div>input');

      inputs.forEach((input) => {
        const parentOfInput = input.parentElement;
        const children = parentOfInput.children;
        assert.strictEqual(children.length, 1, 'Should show 1 child element.');
      });
      done();
    }, 1000);
  });
});
