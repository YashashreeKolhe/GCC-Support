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
  timestamp?: Date;
}

export enum Status {
  Open,
  In_Progress,
  Closed,
}

export enum Category {
  Universities,
  Questions,
  Registrations,
  Scores_Evaluation,
  Submissions,
  Others,
}

export interface ITab {
  id: number;
  title: string;
}