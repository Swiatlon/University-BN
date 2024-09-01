import { DataSource } from 'typeorm';
import { Role } from 'entities/Accounts/Role.Entity';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';
import { rolesEnumArray } from 'constants/entities/entities.Constants';

export class CreateRoles extends CustomSeederWithTimer {
    public async seed(dataSource: DataSource): Promise<void> {
        const roleRepository = dataSource.getRepository(Role);

        for (let i = 0; i < rolesEnumArray.length; i++) {
            const role = rolesEnumArray[i];
            const roleExists = await roleRepository.findOneBy({ name: role });

            if (!roleExists) {
                const newRole = roleRepository.create({ name: role });
                await roleRepository.save(newRole);
            }
        }
    }
}
