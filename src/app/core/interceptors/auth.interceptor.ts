import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { StorageService } from "../services/storage.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);
  const token = storage.getToken();

  console.log("---- INTERCEPTOR ----");
  console.log("URL:", req.url);
  console.log("Método:", req.method);
  console.log("Token encontrado:", token ? "SÍ" : "NO");
  console.log("Token completo:", token);  // Usa esto para ver si está vacío
  console.log("----------------------");

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Header Authorization agregado:");
    console.log(req.headers.get("Authorization"));
  } else {
    console.warn("⚠️ No se agregó Authorization, token nulo");
  }

  return next(req);
};
