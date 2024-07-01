import { DataSource } from 'typeorm';
import { Roles } from 'constants/entities/entities.Constants';
import { Role } from 'entities/Accounts/Role.Entity';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';

export class CreateRoles extends CustomSeederWithTimer {
    public async seed(dataSource: DataSource): Promise<void> {
        const roleRepository = dataSource.getRepository(Role);

        for (let i = 0; i < Roles.length; i++) {
            const role = Roles[i];
            const roleExists = await roleRepository.findOneBy({ name: role });

            if (!roleExists) {
                const newRole = roleRepository.create({ name: role });
                await roleRepository.save(newRole);
            }
        }
    }
}
