import {jest} from '@jest/globals';
import {MUTATOR_NAME} from '../../service/state-management/constatns/mutators';
import {SetMetadataAction} from '../../actions/set-metadata-action';

describe('SetMetadataAction', () => {
  test('Should call mutators with changing metadata.', ()=> {
    return new Promise((done) => {
      expect.assertions(2);
      const executor = jest.fn(()=>{});
      const setMetadataAction = new SetMetadataAction({folderId: 'testId'});
      setMetadataAction.execute(executor);
      setTimeout(()=>{
        expect(executor).toHaveBeenCalledTimes(1);
        expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_LOCATION_METADATA, {folderId: 'testId'});
        done();
      });
    });
  });
});
