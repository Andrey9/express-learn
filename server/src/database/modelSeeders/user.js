const faker = require('faker')
const User = require('../../app/models/User')

module.exports = async (count) => {
  console.log('User seeder')
  let usersArray = []
  for (let i = 0; i < count; i++) {
    const user = new User({
      email: faker.internet.email(),
      password: 'secret',
      userInfo: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        birthDate: faker.date.past(),
        avatar: faker.image.avatar()
      }
    })

    await user.save()
    usersArray.push(user)
  }

  return usersArray
}
