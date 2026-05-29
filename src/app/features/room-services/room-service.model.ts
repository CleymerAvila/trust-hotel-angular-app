export interface RoomService {
  roomServiceId?: number;
  name: string;
  description: string;
  price: number;
  type: string;
}

export interface RoomServiceRequest {
  requestId: number;
  stayingId: number;
  roomServiceId: number;
  clientId: number;
  employeeId?: number | null;
  status: string;
  notes?: string;
  quantity: number;
  unitPrice: number;
  requestedAt?: string;
  assignedAt?: string;
  completedAt?: string;
}

export const ROOM_SERVICE_TYPES: { [key: string]: string } = {
  HOUSEKEEPING: 'Limpieza y Lavandería',
  MAINTENANCE: 'Mantenimiento',
  FOODS_AND_BEVERAGE: 'Alimentos y Bebidas',
  PERSONALIZED_ASSISTANCE: 'Asistencia Personalizada',
};

export const REQUEST_STATUSES: { [key: string]: { label: string; color: string } } = {
  PENDING: { label: 'Pendiente', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  ASSIGNED: { label: 'Asignado', color: 'bg-sky-100 text-sky-800 border-sky-200' },
  ON_PROGRESS: { label: 'En Progreso', color: 'bg-violet-100 text-violet-800 border-violet-200' },
  COMPLETED: { label: 'Completado', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  CANCELED: { label: 'Cancelado', color: 'bg-rose-100 text-rose-800 border-rose-200' },
};
