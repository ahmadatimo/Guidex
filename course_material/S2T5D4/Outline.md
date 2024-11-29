**Architectural Style**

The system follows a Client-Server architectural style with a 3-tier model. This structure ensures separation of concerns, modularity, and maintainability by dividing responsibilities across three layers: Client (frontend), Application Logic (backend), and Data Access (database). Each layer has distinct roles and communicates with adjacent layers, providing a scalable and efficient design.  
 Typical Layers

1. Client (Frontend):
   - Tools: React + Vite
   - Purpose: Provides an intuitive interface for end users (students, counselors, and staff) to interact with the system. Focuses on intuitive UI/UX for managing tours, appointments, and feedback.
2. Application Logic (Backend):
   - Tools: Python (FastAPI)
   - Purpose: Handles core business logic, such as authentication, appointment scheduling, and feedback processing. Acts as the intermediary between the client and database layers.
3. Data Access (Database):
   - Tools: MySQL with SQLAlchemy ORM
   - Purpose: Manages the storage and retrieval of system data, including users, appointments, and feedback. Abstracts low-level database interactions to ensure maintainability and performance.

---

Benefits of 3-Tier Architecture

1. Modularity:
   - Clear separation of responsibilities across tiers simplifies debugging, updates, and collaboration.
2. Scalability:
   - Allows easy extension for new features, e.g., adding a mobile client or analytics dashboards.
3. Maintainability:
   - Changes to one tier, such as the backend logic, do not directly impact other tiers.
4. Testability:
   - Enables independent testing of UI components, business logic, and database queries.
5. Reusability:
   - Backend services and database models can be reused across different client interfaces (e.g., mobile apps or web).
6. Alignment with Project Needs:
   - Effectively supports multi-role workflows for students, counselors, and staff.
   - Simplifies handling of complex requirements like authentication and feedback.

---

Comparison to Alternatives

1. Microservices:
   - Overkill for the current project scope and team size. The 3-tier model is simpler to implement and manage.
2. Event-Driven:
   - Unsuitable for this project as synchronous workflows dominate, such as booking appointments and immediate feedback submission.
3. Monolithic:
   - While easier to start, it lacks the modularity and scalability offered by the 3-tier architecture, especially for potential growth like integrating a mobile client or adding advanced analytics.  
      Conclusion  
     The chosen 3-tier architecture—with React + Vite for the client, Python (FastAPI) for application logic, and MySQL with SQLAlchemy for data access—offers a robust and flexible structure. It aligns with project needs and ensures scalability, maintainability, and testability. This architecture is well-suited to the current development team and project scope while being adaptable to future enhancements.

---

**Connectors:**

Connectors in Our System
In our software system, connectors are the mechanisms that enable communication between different components, ensuring smooth interaction and data flow. For our project, we used the following connectors:

HTTP API for Frontend-Backend Communication
We employed FastAPI to serve as the connector between the React TypeScript frontend and the Python backend. The frontend communicates with the backend through RESTful API calls over HTTP. This connector was chosen for its simplicity, scalability, and the clear separation of concerns it provides. FastAPI was specifically selected due to its high performance & speed (Fast), automatic generation of API documentation (using Swagger), and ease of integration with modern frontend frameworks like React.

Database Connector (SQLAlchemy)
We used SQLAlchemy To bridge the backend logic with the PostgreSQL database as an Object Relational Mapper (ORM). This connector provides a clean interface for database operations. SQLAlchemy was chosen because of its mature ecosystem, flexibility in handling complex queries, and seamless compatibility with FastAPI.

Asynchronous Communication in the Backend
FastAPI's support for asynchronous programming allows for efficient handling of multiple requests concurrently. This internal connector mechanism ensures non-blocking I/O operations, which is particularly beneficial when interacting with the database or serving multiple API requests.

Why We Chose These Connectors
Each connector was selected based on careful consideration of tradeoffs such as performance, maintainability, and ease of use:

FastAPI and SQLAlchemy enable rapid development without sacrificing performance.
Asynchronous communication in FastAPI was crucial for optimizing response times in a web application.
Overall, these connectors align with our design goals of scalability, performance, and developer productivity.

**Guidex Design Goals**

Guidex is designed to create a seamless system for booking, managing, and assigning appointments at Bilkent University. Our five key goals are:

### 1. **Availability**

- Ensure reliable, always-accessible service to support time-sensitive tasks.

### 2. **Usability**

- Provide an intuitive interface for visitors, coordinators, and guides to simplify bookings and management.

### 3. **Modifiability**

- Build a flexible system that supports updates and future expansions with minimal effort.

### 4. **Security**

- Protect user data with robust measures, ensuring privacy and compliance with standards.

### 5. **Performance**

- Optimize for fast response times and smooth operation under heavy usage.

These goals ensure Guidex remains reliable, user-friendly, and adaptable to meet stakeholder needs effectively.
