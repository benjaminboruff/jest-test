import Firebase from 'firebase'

describe('jest with firebase', () => {
  it('is at least loadable', () => {
    expect(Firebase).not.toBeUndefined()
  })
})
