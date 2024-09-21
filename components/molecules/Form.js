export default function FormInput({children, className = ''}) {
  return (
    <div className={`form-group ${className}`}>
        {children}
    </div>
  )
}
