export interface AuthFormProps {
  heading: string;
  onSubmit: (formData: FormData) => Promises<any>;
}
