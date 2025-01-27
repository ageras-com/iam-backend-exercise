import { v4 as uuid } from 'uuid';
import {
  Event, EventType, Organization, OrganizationUser, Role, User,
} from '../types';

const EVENT_TYPES = [
  'UserCreated',
  'OrganizationCreated',
  'OrganizationUserAdded',
  'OrganizationUserRemoved',
  'OrganizationUserUpdated',
] as const;

const getRandomEventType = (): EventType => {
  const randomIndex = Math.floor(Math.random() * EVENT_TYPES.length);
  return EVENT_TYPES[randomIndex];
};

const getRandomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

const getRandomRole = (): Role => {
  const roles: Role[] = ['admin', 'writer', 'reader'];
  return roles[Math.floor(Math.random() * roles.length)];
};

export class EventProducer {
  private userPool: User[] = [
    { id: 'user-1', name: 'Alice', email: 'alice@example.com' },
    { id: 'user-2', name: 'Bob', email: 'bob@example.com' },
    { id: 'user-3', name: 'Charlie', email: 'charlie@example.com' },
  ];

  private organizationPool: Organization[] = [
    { id: 'org-1', name: 'TechCorp' },
    { id: 'org-2', name: 'EduCorp' },
    { id: 'org-3', name: 'HealthInc' },
  ];

  private organizationUsers: OrganizationUser[] = [];

  generateEvent(): Event {
    const type = getRandomEventType();

    switch (type) {
      case 'UserCreated':
        return this.createUserEvent();
      case 'OrganizationCreated':
        return this.createOrganizationEvent();
      case 'OrganizationUserAdded':
        return this.addOrganizationUserEvent();
      case 'OrganizationUserRemoved':
        return this.removeOrganizationUserEvent();
      case 'OrganizationUserUpdated':
        return this.updateOrganizationUserEvent();
      default:
        throw new Error('Unknown event type');
    }
  }

  private createUserEvent(): Event {
    const user = getRandomItem(this.userPool);

    return {
      type: 'UserCreated', payload: user, eventId: uuid(), retry: 0,
    };
  }

  private createOrganizationEvent(): Event {
    const organization = getRandomItem(this.organizationPool);

    return {
      type: 'OrganizationCreated', payload: organization, eventId: uuid(), retry: 0,
    };
  }

  private addOrganizationUserEvent(): Event {
    const user = getRandomItem(this.userPool);
    const organization = getRandomItem(this.organizationPool);
    const role = getRandomRole();

    const organizationUser: OrganizationUser = {
      organizationId: organization.id,
      userId: user.id,
      role,
    };

    this.organizationUsers.push(organizationUser);

    return {
      type: 'OrganizationUserAdded', payload: organizationUser, eventId: uuid(), retry: 0,
    };
  }

  private removeOrganizationUserEvent(): Event {
    if (this.organizationUsers.length === 0) {
      throw new Error('No organization-user relationships to remove');
    }

    const index = Math.floor(Math.random() * this.organizationUsers.length);
    const [removed] = this.organizationUsers.splice(index, 1);

    return {
      type: 'OrganizationUserRemoved', payload: removed, eventId: uuid(), retry: 0,
    };
  }

  private updateOrganizationUserEvent(): Event {
    if (this.organizationUsers.length === 0) {
      throw new Error('No organization-user relationships to update');
    }

    const organizationUser = getRandomItem(this.organizationUsers);
    organizationUser.role = getRandomRole();

    return {
      type: 'OrganizationUserUpdated', payload: organizationUser, eventId: uuid(), retry: 0,
    };
  }
}
