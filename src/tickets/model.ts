export interface Ticket {
  TicketId?: number;
  SubmittedBy?: string;
  SubmittedDate?: Date;
  EmailAddress?: string;
  Subject?: string;
  Description?: string;
  Attachments?: string[];
  Status?: Status;
  AssignedTo?: string;
  EscalatedTo?: string;
  ResolvedBy?: string;
  ResolvedDate?: Date;
  Category?: Category;
  Answer?: string;
  CategoryString?: string;
  StatusString?: string;
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