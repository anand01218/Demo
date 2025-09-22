# Employee Application Form

A comprehensive 5-stage employee application form with clean UI and validation.

## Features

### 🎯 **5-Stage Application Process**

1. **Personal Information**
   - Basic details (name, DOB, gender, nationality)
   - Emergency contact information
   - Marital status and blood group

2. **Contact Details**
   - Email and phone numbers
   - Current and permanent addresses
   - Option to copy current address to permanent

3. **Education Background**
   - Multiple education records
   - Degree, institution, field of study
   - Graduation year and percentage/CGPA
   - Optional certifications

4. **Work Experience**
   - Multiple work experiences
   - Company, position, dates
   - Key responsibilities
   - Current job checkbox
   - Fresh graduate friendly

5. **Documents & Review**
   - File uploads (resume, photo, certificates)
   - Job application details
   - Application summary and validation checklist

### ✨ **Key Features**

- **Progressive Stepper**: Visual progress indicator showing completed and current stages
- **Form Validation**: Comprehensive validation for each stage
- **Dark Mode Support**: Full dark mode compatibility
- **Responsive Design**: Works on desktop, tablet, and mobile
- **File Upload**: Support for documents and images
- **Auto-save**: Form data persists across stages
- **Error Handling**: Clear error messages and validation
- **Fresh Graduate Friendly**: Optional experience section

### 🎨 **UI/UX Features**

- Clean, modern design with consistent styling
- Smooth transitions between stages
- Interactive file upload areas
- Dynamic form fields (add/remove education/experience)
- Validation checklist before submission
- Loading states for form submission

### 📱 **Responsive Design**

- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly interactions
- Optimized for all device types

### 🔧 **Technical Features**

- TypeScript for type safety
- React hooks for state management
- Modular component architecture
- Form validation with real-time feedback
- File handling for document uploads

## File Structure

```
src/
├── app/application-form/
│   └── page.tsx                 # Main application form page
├── components/
│   ├── common/
│   │   └── Stepper.tsx         # Progress stepper component
│   └── pagesUI/application-form/
│       ├── PersonalInfoStage.tsx
│       ├── ContactDetailsStage.tsx
│       ├── EducationStage.tsx
│       ├── ExperienceStage.tsx
│       └── DocumentsReviewStage.tsx
└── interface/
    └── applicationForm.interface.ts  # TypeScript interfaces
```

## Usage

1. Navigate to `/application-form`
2. Fill out each stage progressively
3. Use navigation buttons to move between stages
4. Complete all required fields
5. Upload necessary documents
6. Review and submit application

## Validation Rules

- **Personal Info**: All fields except blood group are required
- **Contact Details**: Email format validation, all address fields required
- **Education**: At least one education record required
- **Experience**: Optional but if added, all fields are required
- **Documents**: Resume and photo are required

## Customization

The form is highly customizable:

- Add/remove form fields
- Modify validation rules
- Change stage order or add new stages
- Customize styling and themes
- Integrate with backend APIs
