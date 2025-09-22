# Onboarding Management System

## Overview

The Onboarding Management System provides a comprehensive interface for managing new employee onboarding processes. This feature includes tracking candidate progress through a 5-step onboarding workflow, managing candidate information, and providing detailed activity status views.

## Features

### 1. Onboarding Dashboard

- **Location**: `/onboarding`
- **Description**: Main dashboard displaying all onboarding candidates in a table format
- **Columns**: Name, Position, Email, Status, Progress, Actions

### 2. Candidate Management

- **Search Functionality**: Filter candidates by name, position, or email
- **Status Tracking**: Four status types:
  - `pending`: Just started, waiting to begin
  - `in-progress`: Currently working through steps
  - `completed`: Successfully finished all steps
  - `paused`: Temporarily halted

### 3. Action Buttons

Each candidate row includes the following actions:

#### Add to Employee

- **Purpose**: Convert onboarding candidate to full employee
- **Behavior**: Updates status to "completed" and sets progress to 100%
- **Visibility**: Hidden for already completed candidates

#### Activity Status

- **Purpose**: View detailed 5-step progress
- **Behavior**: Opens modal showing step-by-step progress
- **Features**: Progress visualization, step descriptions, completion dates

#### Edit

- **Purpose**: Modify candidate information
- **Current State**: Placeholder functionality (shows alert)
- **Future Enhancement**: Open edit modal/form

#### Delete

- **Purpose**: Remove candidate from system
- **Behavior**: Confirmation dialog before removal
- **Safety**: Requires user confirmation

### 4. 5-Step Onboarding Process

#### Step 1: Documentation Review

- **Description**: Review and sign employment documents, contracts, and company policies
- **Typical Duration**: 1-2 days

#### Step 2: IT Setup

- **Description**: Account creation, equipment assignment, and software access setup
- **Typical Duration**: 1 day

#### Step 3: Team Introduction

- **Description**: Meet team members, understand team structure and communication channels
- **Typical Duration**: 2-3 days

#### Step 4: Training & Orientation

- **Description**: Complete required training modules and attend orientation sessions
- **Typical Duration**: 1 week

#### Step 5: Final Assessment

- **Description**: Complete onboarding assessment and feedback collection
- **Typical Duration**: 1 day

### 5. Activity Status Modal

- **Progress Bar**: Visual representation of overall completion
- **Step Details**: Each step shows:
  - Status icon (completed, current, pending)
  - Title and description
  - Completion date (for completed steps)
  - Current progress indicator
- **Candidate Info**: Name, position, join date, current status

## Technical Implementation

### File Structure

```
src/
├── app/onboarding/
│   └── page.tsx                 # Main onboarding page route
├── components/pagesUI/onboarding/
│   ├── index.ts                 # Export barrel
│   ├── OnboardingMainArea.tsx   # Main table component
│   └── ActivityStatusModal.tsx  # Progress modal
└── data/
    └── onboarding-data.ts       # Mock data and interfaces
```

### Key Components

#### OnboardingMainArea

- **Purpose**: Main container component
- **Features**: Table rendering, search, action handling
- **State Management**: Local state for candidates and modal

#### ActivityStatusModal

- **Purpose**: Progress visualization
- **Props**: `isOpen`, `onClose`, `candidate`, `steps`
- **Features**: Step-by-step progress, status indicators

### Data Structures

#### OnboardingCandidate Interface

```typescript
interface OnboardingCandidate {
  id: number;
  name: string;
  position: string;
  email: string;
  status: "pending" | "in-progress" | "completed" | "paused";
  currentStep: number;
  totalSteps: number;
  joinDate: string;
  phone?: string;
  department?: string;
}
```

#### OnboardingStep Interface

```typescript
interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  completedDate?: string;
}
```

## Sidebar Integration

- **Menu Item**: "Onboarding" with user-plus icon
- **Route**: `/onboarding`
- **Position**: After "Designations", before "Attendance"

## Styling

- **Framework**: Tailwind CSS
- **Theme**: Consistent with existing HRMS design
- **Icons**: FontAwesome icons throughout
- **Colors**:
  - Blue: Primary actions and progress
  - Green: Success states (completed)
  - Yellow: Warning states (paused)
  - Red: Danger actions (delete)
  - Gray: Neutral states (pending)

## Future Enhancements

1. **Backend Integration**: Replace mock data with API calls
2. **Real-time Updates**: WebSocket integration for live progress updates
3. **Email Notifications**: Automated step completion notifications
4. **Custom Workflows**: Configurable onboarding steps per role/department
5. **Document Management**: File upload and document tracking
6. **Reporting**: Analytics and completion rate reports
7. **Mobile Responsiveness**: Enhanced mobile experience

## Usage Instructions

1. Navigate to `/onboarding` from the sidebar
2. View all candidates in the table format
3. Use search to filter candidates
4. Click "Activity" to view detailed progress
5. Use "Add to Employee" when onboarding is complete
6. Edit or delete candidates as needed

## Dependencies

- React 18+
- Next.js 13+
- Tailwind CSS
- FontAwesome icons
- TypeScript
