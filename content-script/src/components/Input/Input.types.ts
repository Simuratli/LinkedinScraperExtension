export interface InputPropTypes {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  id: string;
  label: string;
  name?: string;
  readOnly?: boolean;
}
