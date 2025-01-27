import { handle } from '../../src/consumer';

describe('consumer', () => {
  it('should return true', async () => {
    const result = await handle({});

    expect(result).toEqual(true);
  });
});
