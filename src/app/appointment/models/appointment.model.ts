export interface Appointment {
  id: number;
  advisorId: number;
  farmerId: number;
  message: string;
  status: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  meetingUrl?: string;
}
