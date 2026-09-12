import 'dotenv/config';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import connectDB from './db/connection.js';

const seedAdmin = async () => {
    try {
        await connectDB();

        const email = 'admin@gmail.com';
        const password = 'admin';

        const existingAdmin = await User.findOne({ email });

        if (existingAdmin) {
            console.log('Admin already exists.');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new User({
            name: 'admin',
            email,
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();

        console.log('================================');
        console.log('Admin created successfully!');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Role: admin');
        console.log('================================');

        process.exit(0);
    } catch (error) {
        console.error('Failed to create admin:', error);
        process.exit(1);
    }
};

seedAdmin();
