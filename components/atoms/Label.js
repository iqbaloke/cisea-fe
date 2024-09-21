export default function Label({ children, isRequired, ...props }) {
  return (
    <div className="d-flex">
      <label {...props} className="mb-2">
        {children}
      </label>
      {isRequired == null ? <></> : <div className="text-danger">*</div>}
    </div>
  );
}
