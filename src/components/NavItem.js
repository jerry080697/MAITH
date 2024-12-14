import Link from 'next/link';

export default function NavItem({ icon, href, children }) {
  return (
    <li>
      <Link className="flex items-center gap-2 py-1 transition bg-secondary hover:-translate-y-0.5 px-4 rounded-lg" href={href}>
        <i className={icon}></i>
        <span className="whitespace-nowrap break-keep text-ellipsis">{children}</span>
      </Link>
    </li>
  )
}