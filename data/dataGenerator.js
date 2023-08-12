import {faker} from '@faker-js/faker';

class DataGenerator {
    generateDefaultUser() {
        return {
            name: faker.person.fullName(),
            gender: faker.person.sexType(),
            email: faker.internet.email({provider: 'gmail.com'}),
            status: 'active'
        };
    }
}

module.exports = DataGenerator;