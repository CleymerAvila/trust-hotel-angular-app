import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { StorageService } from "../services/storage.service";

export const guestGuard: CanActivateFn = () => {
    const storage = inject(StorageService);
    const router = inject(Router);

    // Si NO tiene token, puede acceder (es invitado)
    if (!storage.getToken()) {
        return true;
    }

    // Si tiene token (está logeado), redirige a dashboard
    router.navigate(['/dashboard']);
    return false;
}
