import Link from "next/link";

export default function SidebarLink({
  link,
  active = false,
  children,
  // key,
}) {
  const sidebarActiveMenu =
    active == true ? "sidebar-link active" : "sidebar-link";
  // console.log(key);
  return (
    <li className="sidebar-item">
      <Link className={sidebarActiveMenu} href={link} aria-expanded="false">
        <span>
          <i className="ti ti-circle" />
        </span>
        <span className="hide-menu">{children}</span>
      </Link>
    </li>
  );
}
