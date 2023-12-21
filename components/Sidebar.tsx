import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { Routes } from '@/utils/constants';
import Image from 'next/image';

export type NavItem = {
  id: number;
  label: string;
  href: string;
  icon: React.ReactNode;
};

type Props = {
  navItems?: NavItem[];
};

const defaultNavItems: NavItem[] = [
  {
    id: 1,
    label: 'Comics',
    href: Routes.COMICS,
    icon: <div className="w-6 h-6" />,
  },
  {
    id: 2,
    label: 'Properties',
    href: Routes.PROPERTIES,
    icon: <div className="w-6 h-6" />,
  },
  {
    id: 3,
    label: 'Settings',
    href: Routes.SETTINGS,
    icon: <div className="w-6 h-6" />,
  },
];

const ActiveMenuLink = ({ children, href }: { children: any; href: string }) => {
  const pathname = usePathname() || '';
  const active = href === pathname || pathname.startsWith(href);
  return (
    <Link href={href} className={`menu ${active ? 'active' : ''}`}>
      {children}
    </Link>
  );
};

const Sidebar = ({ navItems = defaultNavItems }: Props) => {
  const router = useRouter();
  return (
    <div
      className="drawer-side z-40"
      style={{
        scrollBehavior: 'smooth',
        scrollPaddingTop: '5rem',
      }}
    >
      <label htmlFor="drawer" className="drawer-overlay" aria-label="Close Menu"></label>
      <aside className="bg-base-100 w-80 h-full">
        <div className="bg-base-100 sticky top-0 z-20 items-center bg-opacity-90 px-4 py-2 backdrop-blur lg:flex">
          <Link href={Routes.COMICS} className="flex-0 btn btn-ghost px-2">
            <Image src={'/next.svg'} alt="icon" width={30} height={30} />{' '}
            <div className="font-title inline-flex text-lg md:text-2xl">
              <span className="uppercase text-[#1AD1A5]">CMS</span>
            </div>
          </Link>
          <div className="divider" />
        </div>
        <ul className="menu p-4 bg-base-100 text-base-content sticky top-0">
          {navItems.map((item: NavItem) => (
            <li
              key={item.id}
              onClick={() => {
                router.push(item.href);
              }}
              className="mb-2"
            >
              <ActiveMenuLink href={item.href}>{item.label}</ActiveMenuLink>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
