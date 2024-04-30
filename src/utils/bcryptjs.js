import bcryptjs from 'bcryptjs'

export const hashPassword = (plainPassword) => {
    const saltRound = 15;
    return bcryptjs.hashSync(plainPassword, saltRound);
}