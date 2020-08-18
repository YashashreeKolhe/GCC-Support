export interface Ticket {
  id?: number;
  submittedBy?: string;
  submittedDate?: Date;
  email?: string;
  subject?: string;
  contestantId?: string;
  description?: string;
  attachments?: string[];
  ticketStatus?: string;
  assignee?: string;
  escalatedTo?: string;
  resolvedBy?: string;
  resolvedDate?: Date;
  category?: string;
  answer?: string;
  notes?: string[];
}

export enum Status {
  Unassigned,
  Pending,
  Resolved,
  Escalated,
  Rejected
}

export enum Category {
  Questions,
  Registrations,
  Scores,
  Unassigned,
}

export interface ITab {
  id: number;
  title: string;
}