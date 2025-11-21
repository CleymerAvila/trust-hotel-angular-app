
export interface Room {
  roomId: number;
  type: string;
  number: string;
  currentState: string;
  floor: number;
  capacity: number;
  pricePerNight: number;
}
