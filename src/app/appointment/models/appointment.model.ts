export interface Appointment {
  id: number;
  farmerId: number;
  message: string;
  availableDateId: number;
  status: string;
  meetingUrl?: string;
}
