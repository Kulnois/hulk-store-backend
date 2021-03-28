import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Cesar Villegas',
        email: 'cesar@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Maria Rojas',
        email: 'maria@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users;