import Link from "next/link";

export default function SidebarLinkMain({
  link,
  active = false,
  children,
  isOut = true,
  // key,
  icon,
}) {
  const sidebarActiveMenu =
    active == true ? "sidebar-link active" : "sidebar-link";
  return (
    <li className="sidebar-item">
      <Link className={sidebarActiveMenu} href={link} aria-expanded="false">
        {isOut == true ? (
          <span style={{ transform: "scaleX(-1)" }}>
            <i className={icon} />
          </span>
        ) : (
          <span>
            <i className={icon} />
          </span>
        )}
        <span className="hide-menu">{children}</span>
      </Link>
    </li>
  );
}
