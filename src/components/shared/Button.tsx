interface Props {
  children: React.ReactNode;
  version: string;
  isDisabled: boolean;
  type?: "submit" | "reset" | "button";
}

function Button({ children, version, isDisabled, type }: Props) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  );
}

export default Button;
