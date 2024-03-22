import { Role } from 'entities/RoleEntity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Roles } from 'constants/general/generalConstants';

export class CreateRoles implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const roleRepository = dataSource.getRepository(Role);

        for (let i = 0; i < Roles.length; i++) {
            const role = Roles[i];
            const roleExists = await roleRepository.findOneBy({
                name: role,
            });

            if (!roleExists) {
                const newRole = roleRepository.create({ name: role });
                await roleRepository.save(newRole);
            }
        }
    }
}
