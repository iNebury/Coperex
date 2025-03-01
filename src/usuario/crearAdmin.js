import User from '../usuario/usuario.model.js'
import {hash} from 'argon2'

const createAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: 'ADMIN' })

        if (!existingAdmin) {
            const aEmail = 'admin@gmail.com'
            const aPassword = 'admin123'

            const encryptedPassword = await hash(aPassword)

            const aUser = new User({
                name: 'Admin',
                surname: 'Admin',
                username: 'admin1',
                email: aEmail,
                password: encryptedPassword,
                phone: "87654321",
                role: 'ADMIN'
            })

            await aUser.save()
            console.log('El administrador a sido creado satisfactoriamente')
        } else {
            console.log('Actualmente se encuentra creado el administrador')
        }
    } catch (err) {
        console.error('Error al crear el admin:', err)
    }
}

export default createAdmin