import Link from "next/link";

export default function SidebarSingleMenu({
  url,
  icon,
  active = false,
  children,
}) {
  const sidebarActiveSingleMemu =
    active == true ? "sidebar-link active" : "sidebar-link";
  return (
    <>
      <li className="sidebar-item">
        <Link
          className={sidebarActiveSingleMemu}
          href={url}
          aria-expanded="false"
        >
          <span>
            <i className={icon} />
          </span>
          <span className="hide-menu">{children}</span>
        </Link>
      </li>
    </>
  );
}
