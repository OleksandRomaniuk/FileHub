import {registry} from '../../application/registry';

describe('Decorators', () => {
  test('Should check changing fixture by router.', () => {
    expect.assertions(1);
    const name = 'unknownName';
    expect(()=> {
      registry.getInstance(name);
    }).toThrow(new Error('Unknown component name: ' + name));
  });
});


