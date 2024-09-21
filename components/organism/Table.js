export default function Table({ className = '', children }) {
    return (
        <div className={`table-responsive`}>
            <table style={{width:"100%"}}className={`table text-nowrap align-middle mb-0 ${className}`}>
                {children}
            </table>
        </div>
    )
}
