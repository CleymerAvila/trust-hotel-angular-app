import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { StorageService } from "../services/storage.service";

export const guestGuard: CanActivateFn = () => {
    const storage = inject(StorageService);
    const router = inject(Router);

    // Si NO tiene token válido, puede acceder (es invitado)
    if (!storage.isTokenValid()) {
        return true;
    }

    // Si tiene token válido, redirige a dashboard
    return router.createUrlTree(['/dashboard']);
}
