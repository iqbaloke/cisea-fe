export default function SidebarTitle({...props}) {
    return (
        <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4" />
            <span className="hide-menu">{props.children}</span>
        </li>
    )
}
