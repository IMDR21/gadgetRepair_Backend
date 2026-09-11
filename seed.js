import bcrypt from 'bcrypt';
import User from './models/User.js';
import connectDB from './db/connection.js';

const register = async () => {
    try {
        connectDB();
        const hashedPassword = await bcrypt.hash('admin', 10);
        const newUser = new User({
            name: 'admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            role: 'admin'
        })
        const user = await newUser.save();
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}

register();