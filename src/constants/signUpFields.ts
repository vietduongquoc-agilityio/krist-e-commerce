type InputField = {
  name: string;
  placeholder: string;
  type: string;
  required?: string;
};

export const SIGNUPFIELDS: InputField[] = [
  {
    name: 'firstName',
    placeholder: 'First Name',
    type: 'text',
    required: 'First name is required',
  },
  {
    name: 'lastName',
    placeholder: 'Last Name',
    type: 'text',
    required: 'Last name is required',
  },
  {
    name: 'email',
    placeholder: 'Email',
    type: 'email',
    required: 'Email is required',
  },
  {
    name: 'phone',
    placeholder: 'Phone',
    type: 'tel',
    required: 'Phone number is required',
  },
  {
    name: 'password',
    placeholder: 'Password',
    type: 'password',
    required: 'Password is required',
  },
  {
    name: 'confirmPassword',
    placeholder: 'Confirm Password',
    type: 'password',
    required: 'Password confirmation is required',
  },
];
