# IAM Backend Exercise

Welcome to the IAM (Identity and Access Management) Backend Exercise! This repository contains a simple structure to help you implement and work with an event-driven backend system. The exercise focuses on handling events that manipulate and maintain data related to Organizations and Users within an IAM system.

This exercise is using an event-driven approach following a producer-consumer pattern.
We are providing the producer, you will be implementing the consumer, located in src/consumer/index.ts.
The goal is to process received events and react according to the business logic.


## Purpose
The goal of this exercise is to implement an event handler capable of consuming and processing events to materialize the state of the data into a database. The system simulates real-world scenarios where:
- Users belong to multiple Organizations.
- Users can have different roles within each Organization.
- Events dynamically update the state of the system.

The producer may send erroneous or out-of-order payload, just like it could happen in a real world environment.

## Entities
The system revolves around two main entities:

### User
Represents an individual within the IAM system.
- **id** (string): Unique identifier for the User.
- **name** (string): Full name of the User.
- **email** (string): Email address of the User.

### Organization
Represents a group or entity within the IAM system.
- **id** (string): Unique identifier for the Organization.
- **name** (string): Name of the Organization.

### OrganizationUser
Represents the relationship between a User and an Organization.
- **organizationId** (string): ID of the Organization.
- **userId** (string): ID of the User.
- **role** (string): Role of the User within the Organization. Possible values are:
  - `admin`
  - `writer`
  - `reader`

## Events
The system uses an event-driven architecture. The following event types are consumed:

1. **UserCreated**
   - Triggered when a new User is created.
   - Payload includes the User's details.

2. **OrganizationCreated**
   - Triggered when a new Organization is created.
   - Payload includes the Organization's details.

3. **OrganizationUserAdded**
   - Triggered when a User is added to an Organization with a specific role.
   - Payload includes the `organizationId`, `userId`, and `role`.

4. **OrganizationUserRemoved**
   - Triggered when a User is removed from an Organization.
   - Payload includes the `organizationId` and `userId`.

5. **OrganizationUserUpdated**
   - Triggered when a User's role within an Organization is updated.
   - Payload includes the `organizationId`, `userId`, and updated `role`.

## Exercise
Your task is to implement an event handler that:
1. Consumes the events in random order.
2. Materializes the data into a database to reflect the current state of the system.
3. Ensures relationships between Users, Organizations, and their roles are consistent.

### Guidelines
1. Use the provided entities and events structure to create your solution.
2. Implement validation and error handling for event processing.
3. Store the state in a way that allows querying Users by Organization and vice versa.

### Additional Notes
- You may use any database or in-memory store for state materialization.
- Focus on writing clean, maintainable code.
- Consider edge cases, such as duplicate events or events with missing data.

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/ageras-com/iam-backend-exercise.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start implementing your solution in the appropriate files.

4. Run tests (if any):
   ```bash
   npm test
   ```

## Example Workflow
1. A `UserCreated` event is received with the payload:
   ```json
   {
     "id": "user-1",
     "name": "Alice",
     "email": "alice@example.com"
   }
   ```
   The event handler creates a new User entry in the database.

2. An `OrganizationCreated` event is received with the payload:
   ```json
   {
     "id": "org-1",
     "name": "TechCorp"
   }
   ```
   The event handler creates a new Organization entry in the database.

3. An `OrganizationUserAdded` event is received with the payload:
   ```json
   {
     "organizationId": "org-1",
     "userId": "user-1",
     "role": "admin"
   }
   ```
   The event handler associates the User with the Organization and assigns the `admin` role.

## Conclusion
This exercise is designed to test your ability to work with event-driven systems, data modeling, and backend architecture. Good luck, and feel free to be creative with your implementation!

