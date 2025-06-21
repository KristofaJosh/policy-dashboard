# Policy Recommendations Dashboard

## Project Overview
This Policy Recommendations Dashboard is a web application designed to help security teams manage and track policy recommendations across cloud environments. The dashboard allows users to view, filter, search, and manage security policy recommendations, including archiving and unarchiving recommendations as needed.

This project demonstrates proficiency in modern React development practices, state management, authentication, and responsive UI design.

## 🚧 Note to Reviewer

This is a **work-in-progress** snapshot, intended to demonstrate my familiarity with the required tools and architecture. It is **not** production-ready—there are known bugs, missing edge-case handling, and many areas marked for improvement. Given more time, I’d prioritize stabilizing the infinite-scroll, polishing the search/filter UX, expanding test coverage, and tightening up authentication/session management.

Thank you for understanding, and I look forward to any feedback!


### Core Features
- Authentication system with login/logout functionality
- Dashboard view with active and archived recommendations
- Detailed view of individual recommendations
- Ability to archive and unarchive recommendations
- Filtering by various criteria (cloud providers, frameworks, risk classes)
- Responsive design for various screen sizes

## Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- Yarn package manager

### Installation Steps
1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Set up environment variables:
   Create a `.env` file with the following:
   ```
   NEXT_PUBLIC_BASE_URL=http://localhost:3001
   ```

### Running the Application
1. Start the mock server:
   ```bash
   yarn dev:mock
   ```
   This will start the MSW (Mock Service Worker) server that simulates the backend API.

2. In a separate terminal, you can start the app only without mock
   ```bash
   yarn dev
   ```
   The application will be available at http://localhost:3000

### Testing
Run the test suite:
```bash
yarn test
```


## Features Implemented

### Authentication System
- **Why**: Secure access to sensitive policy recommendations
- **Advantages**:
    - Server-side authentication with HTTP-only cookies for security
    - Client-side state management with Zustand for persistent sessions
    - Protected routes to prevent unauthorized access

### Dashboard View
- **Why**: Provide an overview of all recommendations with key information at a glance
- **Advantages**:
    - Tabbed interface separating active and archived recommendations
    - Infinite scroll for performance with large datasets
    - Card-based UI for clear visual separation of recommendations
    - Risk classification with visual indicators (colors and icons)

### Recommendation Detail View
- **Why**: Allow users to view comprehensive information about a specific recommendation
- **Advantages**:
    - Responsive layout that works on mobile and desktop
    - Detailed information organized in sections for readability
    - Quick actions for archiving/unarchiving

### Archive Management
- **Why**: Enable users to manage the lifecycle of recommendations
- **Advantages**:
    - Server actions for reliable state updates
    - Optimistic UI updates for better user experience
    - Toast notifications for action feedback

### Search & Filter
- **Why**: Help users find relevant recommendations quickly
- **Advantages**:
    - Multiple filter criteria (cloud providers, frameworks, risk classes)
    - Filter persistence across sessions
    - Debounced search to reduce API calls

## What's Left If There Was More Time

### Enhanced Search Functionality
- Implement fuzzy search for more flexible text matching
- Add advanced search operators (AND, OR, NOT)
- Search within specific fields (title, description, etc.)

### Additional Testing
- Increase unit test coverage
- Add integration tests for key user flows
- Implement end-to-end tests with Playwright or Cypress

### UI/UX Improvements
- Enhance micro-interactions for better feedback
- Add animations for state transitions
- Implement keyboard shortcuts for power users

### Performance Optimizations
- Further optimize bundle size with code splitting
- Implement virtualized lists for very large datasets

### Feature Enhancements
- User management and role-based access control
- Recommendation creation and editing
- Export functionality (CSV, PDF)
- Notification system for new recommendations

## Architecture & Design Decisions

### Tech Stack
- **Next.js**: For server-side rendering, API routes, and modern React features
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For utility-first styling and rapid UI development
- **Zustand**: For lightweight state management
- **React Hook Form**: For form validation and management
- **Zod**: For schema validation
- **MSW**: For API mocking during development

### Folder Structure
- `/app`: Next.js app directory with route groups and components
    - `/auth`: Authentication-related components and server actions
    - `/dashboard`: Dashboard views and recommendation management
- `/components`: Reusable UI components
- `/hooks`: Custom React hooks
- `/lib`: Utility functions and shared code
- `/mocks`: Mock server configuration and data
- `/types`: TypeScript type definitions
- `/utils`: Helper functions

### State Management
- **Context API**: Used for theme and UI state
- **Zustand**: Used for authentication state with persistence
- **Server Components**: Used for data fetching and initial state

### API Interaction
- **Server Actions**: Used for data mutations (login, logout, archive)
- **React Server Components**: Used for initial data fetching
- **Client Components**: Used for interactive UI elements
- **Optimistic Updates**: Used for better UX during mutations

## Testing Strategy

### Current Tests
- Unit tests for utility functions
- Component tests for UI elements
- Mock service worker for API testing

### Testing Tools
- **Vitest**: For fast unit testing
- **React Testing Library**: For component testing
- **MSW**: For API mocking in tests

### Future Testing Improvements
- Increase test coverage for all components
- Add integration tests for key user flows
- Implement end-to-end tests with Playwright or Cypress

## Performance & UX Considerations

### Performance Optimizations
- Server components for reduced client-side JavaScript
- Streaming for progressive rendering
- Infinite scroll for pagination
- Memoization for expensive calculations
- Debounced search to reduce API calls

### UX Enhancements
- Loading states for all async operations
- Error boundaries for graceful error handling
- Toast notifications for user feedback
- Responsive design for all screen sizes

## API Documentation

### Authentication Endpoints

#### POST /auth/login
- **Request Body**: `{ username: string, password: string }`
- **Response**: `{ user: User, token: string }`

#### POST /auth/logout
- **Response**: `{ success: boolean }`

### Recommendations Endpoints

#### GET /recommendations
- **Query Parameters**:
    - `cursor`: Pagination cursor
    - `limit`: Number of items per page
    - `search`: Search term
    - `tags`: Filter by tags
    - `frameworks`: Filter by frameworks
    - `cloudProviders`: Filter by cloud providers
    - `riskClasses`: Filter by risk classes
    - `reasons`: Filter by reasons
    - `tab`: Filter by tab (active/archived)
- **Response**: `{ data: Recommendation[], nextCursor: string }`

#### GET /recommendations/:id
- **Response**: `{ data: Recommendation }`

#### PATCH /recommendations/:id/archive
- **Response**: `{ success: boolean }`

#### PATCH /recommendations/:id/unarchive
- **Response**: `{ success: boolean }`

## Security & Auth

### Authentication Flow
1. User submits login credentials
2. Server validates credentials and returns user data
3. HTTP-only cookie is set with auth token
4. Client stores user data in Zustand store
5. Protected routes check for valid auth token

### Token Management
- HTTP-only cookies for secure token storage
- Token expiration after 24 hours
- Server-side validation of tokens for protected routes


## Additional Notes

### Environment Variables
- `NEXT_PUBLIC_BASE_URL`: API base URL (default: http://localhost:3001)

### Mock Server
The project includes a mock server using MSW (Mock Service Worker) to simulate API responses during development. This allows for development without a real backend.
