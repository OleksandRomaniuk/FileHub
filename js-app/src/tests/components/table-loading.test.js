import {TableLoading} from '../../components/table-loading.js';

describe('Table loading', () => {
  let fixture;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
  });

  test('Should render loading table', () => {
    expect.assertions(1);

    new TableLoading(fixture);

    expect(fixture.innerHTML).toBe(`<div class="file-table-wrapper table-state">
              <div class="table-loading">
                  <span class="glyphicon glyphicon-loader" aria-hidden="true"></span>
              </div>
            </div>`);
  });
});
