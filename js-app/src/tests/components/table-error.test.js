import {TableError} from '../../components/table-error.js';

describe('Table error state', () => {
  let fixture;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
  });

  test('Should render table with error message', () => {
    expect.assertions(1);

    new TableError(fixture, 'Test error message');

    expect(fixture.innerHTML).toBe(`<div class="file-table-wrapper table-state">
                <div class="error-label table-error-label">
                    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <span>Test error message</span>
                </div>
            </div>`);
  });
});
