// export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";

export type TaskStatus = "Pending" | "In Progress" | "Completed";

export interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assignedUserId: string;
  assignedUserName: string;
  createdBy: string;
  createdAt: FirestoreTimestamp;
}
