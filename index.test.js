import firebase from 'firebase';

describe('jest with firebase', () => {
  it('is at least loadable', () => {
    expect(firebase).not.toBeUndefined()
  })
})
