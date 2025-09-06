# MultiStepForm Project

This project is a **React + TypeScript + React Hook Form** multi-step form with Zod validation, field analytics, and keyboard navigation support.

---

## How to Run the Project

1. **Clone the repository**

```sh
git clone https://github.com/Mirza-Md-Golam-Nabi/employee.git
```

And

```sh
cd employee
```

2. **Install dependencies**

```sh
npm install
```

3. **Run the development server**

```sh
npm run dev
```

4. **Open this URL in your browser**

```sh
http://localhost:3000
```

5. Fill out the form step by step.

- Press Enter to move to the next step.
- Use Tab to navigate between fields.
- On the last step, confirm your information and submit.

## Complex Logic Handling
1. Multi-Step Validation
- Each step validates only its relevant fields using React Hook Form’s trigger method.
- handleNext function triggers validation and moves to the next step only if the current step is valid.
- Keyboard Enter key triggers handleNext dynamically, respecting the current step.

2. Field Analytics (Time Tracking)

- I track how long the user spends on each field.
- On each input field:
  - onFocus stores the current timestamp.
  - onBlur calculates the duration and adds it to a central fieldTimers object.
- This helps measure user interaction and time spent on each input.

3. Dynamic Form Handling

- Each step is a separate component: **PersonalInfo**, **JobDetails**, **SkillsPreferences**, **EmergencyContact**, **ReviewSubmit**.
- Parent component **MultiStepForm** passes **onFocus** and **onBlur** to child components as props.
- Fields are grouped by step, allowing flexible validation and navigation.

4. Keyboard Navigation

- Tab navigation works naturally with HTML inputs.
- Enter key triggers **handleNext** instead of submitting the form prematurely.

5. Zod Validation

- Complex validation logic handled via Zod schema.
  - Full Name: at least 2 words.
  - Phone: custom format validation.
  - Date of Birth: must be at least 18 years old.

- React Hook Form integrates with Zod using zodResolver.

## Assumptions Made

- Users must be at least 18 years old to submit the form.
- Profile picture is optional and must be JPG or PNG with max size 2MB.
- All steps must be completed in order; skipping is not allowed.
- Keyboard Enter triggers “Next” for steps 1–4 and works globally across input fields.
- Field analytics only tracks focus/blur durations and does not track partial edits.
- Radio buttons and checkboxes are considered a single field for timing analytics (all options share one timer).

## Notes

- You can inspect field analytics in the console after submission.
- Validation errors are displayed inline.
- The ReviewSubmit step allows users to confirm all data before final submission.
