import { Button } from "./button";

interface SubmitButtonProps {
  loading: boolean;
  text: string;
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <Button type="submit" className="w-full" disabled={props.loading}>
      {props.text}
    </Button>
  );
};

export default SubmitButton;
