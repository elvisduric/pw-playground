// Import the faker library
import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';

// Create a function that generates random user data using the faker library
export const userData = () => ({
    "name": faker.person.fullName(),
    "gender": faker.person.sexType(),
    "email": faker.internet.email({provider: 'gmail.com'}),
    "status": 'active'
});