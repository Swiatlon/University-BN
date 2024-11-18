import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';
import { rolesEnumArray } from 'constants/entities/entities.Constants';
import { RolesRepository } from 'repositories/roles/Roles.Repository';

export class CreateRoles extends CustomSeederWithTimer {
    protected async beforeSeed(): Promise<boolean> {
        const existingRoleCount = await RolesRepository().getRolesAmount();

        return existingRoleCount === 0;
    }

    protected async seed(): Promise<void> {
        for (const roleName of rolesEnumArray) {
            await RolesRepository().createAndSaveRole(roleName);
        }
    }
}
