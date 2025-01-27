export type EventType = 'UserCreated' | 'OrganizationCreated' | 'OrganizationUserAdded' | 'OrganizationUserRemoved' | 'OrganizationUserUpdated';

export type Role = 'admin' | 'writer' | 'reader';

export interface Event {
  eventId: string;
  type: EventType;
  payload: any;
  retry: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Organization {
  id: string;
  name: string;
}

export interface OrganizationUser {
  organizationId: string;
  userId: string;
  role: Role;
}
