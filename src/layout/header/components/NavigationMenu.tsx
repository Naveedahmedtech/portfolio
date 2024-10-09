import NavLinks from './NavLinks';
import ThemeToggle from '../../../components/ThemeToggle';

interface NavigationMenuProps {
    isMobile?: boolean; // Optional prop to handle mobile-specific layout
}

export default function NavigationMenu({ isMobile = false }: NavigationMenuProps) {
    return (
        <div className={`flex ${isMobile ? 'flex-col space-y-8 items-center' : 'space-x-8'} transition-all duration-300`}>
            <NavLinks isMobile={isMobile} /> <ThemeToggle /> 
        </div>
    );
}
