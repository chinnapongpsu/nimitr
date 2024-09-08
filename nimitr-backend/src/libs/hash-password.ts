import bcrypt from 'bcrypt'

export async function hashPassword(plaintextPassword: string) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    //ex.: "$2b$10$/irVVNP3wpa71RyFtgCKV.6m50uuvZkf5W3XTUEoGEYSom90HU90K"
    return hash
}

export async function comparePassword(plaintextPassword: string, hash: string) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}