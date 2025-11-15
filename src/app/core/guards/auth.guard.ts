import { inject } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = () => {
  const storage = inject(StorageService)
    const router = inject(Router)

    if(storage.getToken()){
      return true;
    }

    router.navigate(['/login'])
    return false;
};
