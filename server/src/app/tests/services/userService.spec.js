const mongoose = require('mongoose')
const MongodbMemoryServer = require('mongodb-memory-server').default
const User = require('../../models/User')
const UserService = require('../../services/UserService')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000

let mongoServer

describe('user service', () => {
  beforeAll(async () => {
    mongoServer = new MongodbMemoryServer()
    const mongoUrl = await mongoServer.getConnectionString()
    await mongoose.connect(mongoUrl)
  })

  afterAll(() => {
    mongoose.disconnect()
    mongoServer.stop()
  })

  /* -------------------------------- */
  describe('Sign in function', () => {
    const nextMock = jest.fn()
    const user = new User({
      email: 'testuser@example.com',
      password: 'supersecret',
      userInfo: {}
    })

    beforeAll(async () => {
      await user.save()
    })

    beforeEach(async () => {
      nextMock.mockReset()
    })

    it('should fail: no user with such email', async () => {
      await UserService.signIn('wrong', 'wrong', nextMock)

      expect(nextMock).toBeCalledWith(
        new Error('User with such email not found'),
        false
      )
      expect(nextMock.mock.calls[0].length).toBeGreaterThan(0)
    })

    it('should fail: wrong password', async () => {
      await UserService.signIn('testuser@example.com', 'wrong password', nextMock)

      expect(nextMock).toBeCalledWith(
        new Error('Password is incorrect'),
        false
      )
      expect(nextMock.mock.calls[0].length).toBeGreaterThan(0)
    })

    it('should success: user found and password correct', async () => {
      await UserService.signIn('testuser@example.com', 'supersecret', nextMock)

      expect(nextMock).toBeCalledWith(null, user.toJSON())
      expect(nextMock.mock.calls[0].length).toBeGreaterThan(0)
    })
  })
})
