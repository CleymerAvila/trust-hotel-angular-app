export type String =
  | 'Pendiente'
  | 'En Progreso'
  | 'Completado'
  | 'Rechazado'
  | 'Confirmado'
  | 'Cancelado'
  | 'Finalizado';

export interface BadgeConfig {
  label: string;
  icon: string; // Tabler icon class
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export const BADGE_CONFIG: Record<String, BadgeConfig> = {
  'Pendiente': {
    label: 'Pendiente',
    icon: 'ti-alert-triangle',
    bgColor: '#FFF3E0',
    textColor: '#E65100',
    borderColor: '#FFB74D',
  },
  'En Progreso': {
    label: 'En Progreso',
    icon: 'ti-loader',
    bgColor: '#E3F2FD',
    textColor: '#1565C0',
    borderColor: '#64B5F6',
  },
  'Completado' : {
    label: 'Completada',
    icon: 'ti-send',
    bgColor: '#EDE7F6',
    textColor: '#4527A0',
    borderColor: '#9575CD',
  },
  'Rechazado': {
    label: 'In review',
    icon: 'ti-refresh',
    bgColor: '#FFFDE7',
    textColor: '#F57F17',
    borderColor: '#FFD54F',
  },
  'Confirmado': {
    label: 'Confirmada',
    icon: 'ti-circle-check',
    bgColor: '#E8F5E9',
    textColor: '#1B5E20',
    borderColor: '#81C784',
  },
  'Cancelado': {
    label: 'Cancelada',
    icon: 'ti-circle-x',
    bgColor: '#FFEBEE',
    textColor: '#B71C1C',
    borderColor: '#EF9A9A',
  },
  'Finalizado': {
    label: 'Finalizado',
    icon: 'ti-clock',
    bgColor: '#F5F5F5',
    textColor: '#424242',
    borderColor: '#BDBDBD',
  },
};
