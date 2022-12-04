import {Breadcrumb} from '../../components/breadcrumb.js';
import {expect} from '@jest/globals';

describe('Breadcrumb', () => {
  let fixture;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
  });

  test('Should render breadcrumb with home folder', () => {
    expect.assertions(1);

    new Breadcrumb(fixture, {});

    expect(fixture.innerHTML).toBe(`<li>Home</li>`);
  });

  test('Should render error message inside breadcrumb', () => {
    expect.assertions(1);

    new Breadcrumb(fixture, {breadcrumbError: 'Test error'});

    expect(fixture.innerHTML)
        .toBe(`<li><slot data-td="content"><p class="error-label">
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                Test error
            </p></slot></li>`);
  });

  test('Should render loading icon inside breadcrumb', () => {
    expect.assertions(1);

    new Breadcrumb(fixture, {isBreadcrumbLoading: true});

    expect(fixture.innerHTML)
        // Disable es lint rule because snapshot is more than 120 symbols
        // eslint-disable-next-line max-len
        .toBe(`<li><slot data-td="content"><span class="glyphicon glyphicon-loader" aria-hidden="true"></span></slot></li>`);
  });
});
