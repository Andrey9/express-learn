const requestValidation = require('../../middleware/requestValidation')
const Joi = require('joi')

describe('Request validation middleware', () => {
  const nextMock = jest.fn()
  const schema = {
    field1: Joi.string().required(),
    field2: Joi.number().required()
  }

  beforeEach(() => {
    nextMock.mockReset()
  })

  it('should fail: no body given', () => {
    const result = Joi.validate({}, schema, {abortEarly: false})
    requestValidation(schema)({}, undefined, nextMock)
    expect(nextMock).toBeCalledWith(result.error)
    expect(nextMock.mock.calls[0].length).toBeGreaterThan(0)
  })

  it('should fail: empty body', () => {
    const result = Joi.validate({}, schema, {abortEarly: false})
    requestValidation(schema)({body: {}}, undefined, nextMock)
    expect(nextMock).toBeCalledWith(result.error)
    expect(nextMock.mock.calls[0].length).toBeGreaterThan(0)
  })

  it('should fail: validation fail', () => {
    const body = {
      field1: '',
      field2: ''
    }
    const result = Joi.validate(body, schema, {abortEarly: false})
    requestValidation(schema)({body: body}, undefined, nextMock)
    expect(nextMock).toBeCalledWith(result.error)
    expect(nextMock.mock.calls[0].length).toBeGreaterThan(0)
  })

  it('should succeed', () => {
    const body = {
      field1: 'string',
      field2: '123'
    }
    requestValidation(schema)({body: body}, undefined, nextMock)
    expect(nextMock).toBeCalled()
    expect(nextMock.mock.calls[0]).toHaveLength(0)
  })
})
