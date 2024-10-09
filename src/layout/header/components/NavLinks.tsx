import { Link } from 'react-router-dom';

interface NavLink {
    label: string;
    to: string;
}

export default function NavLinks({ isMobile = false }: { isMobile?: boolean }) {
    const links: NavLink[] = [
        { label: 'Home', to: '/' },
        { label: 'Projects', to: '/projects' },
    ];

    return (
        <nav className={`${isMobile ? 'flex flex-col space-y-8 items-center' : 'flex space-x-8'}`}>
            {links.map((link) => (
                <Link
                    key={link.to}
                    to={link.to}
                    className={`${isMobile ? 'text-2xl font-bold' : 'text-lg font-medium'} text-textSecondary hover:text-primary dark:text-textSecondary dark:hover:text-primary transition-colors duration-300 relative group`}
                >
                    {link.label}
                    <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${isMobile ? '' : 'w-0 group-hover:w-full'}`}
                    ></span>
                </Link>
            ))}
        </nav>
    );
}
