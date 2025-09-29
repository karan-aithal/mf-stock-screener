import React, { useState } from 'react';

// import { Avatar } from '@base-ui-components/react/avatar';
// import { SunIcon, MoonIcon } from '@base-ui-components/react/icons';


// const menuItems = [
//   { label: 'Crypto', items: ['Bitcoin', 'Ethereum', 'DeFi', 'NFTs'] },
//   { label: 'Mutual Funds', items: ['Equity', 'Debt', 'Hybrid', 'ELSS'] },
//   { label: 'Wallet', items: ['Transactions', 'Balance', 'Security'] },
//   { label: 'Credit Cards', items: ['Offers', 'Bills', 'Limits'] },
//   { label: 'Stox', items: ['Portfolio', 'Watchlist', 'Analytics'] },
// ];

// const BentoDropdown = ({ label, items }) => (
//   <Dropdown>
//     <Button className="nav-button">{label}</Button>
//     <DropdownMenu className="dropdown-menu">
//       {items.map((item, idx) => (
//         <DropdownItem key={idx} className="dropdown-item">
//           {item}
//         </DropdownItem>
//       ))}
//     </DropdownMenu>
//   </Dropdown>
// );

interface MenuItem {
    label: string;
    items: string[];
}

const menuItems: MenuItem[] = [
    { label: 'Crypto', items: ['Bitcoin', 'Ethereum', 'DeFi', 'NFTs'] },
    { label: 'Mutual Funds', items: ['Equity', 'Debt', 'Hybrid', 'ELSS'] },
    { label: 'Wallet', items: ['Transactions', 'Balance', 'Security'] },
    { label: 'Credit Cards', items: ['Offers', 'Bills', 'Limits'] },
    { label: 'Stox', items: ['Portfolio', 'Watchlist', 'Analytics'] },
];

const Navbar: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.body.setAttribute('data-theme', newTheme);
    };

    const toggleDropdown = (label: string) => {
        setActiveDropdown(prev => (prev === label ? null : label));
    };

    return (
        <nav className="navbar">
            <div className="brand">
                <img src="/brand-icon.svg" alt="Brand" className="brand-icon" />
                <span className="brand-text">FinGrid</span>
            </div>

            <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>

            <div className={`menu ${menuOpen ? 'open' : ''}`}>
                {menuItems.map(({ label, items }) => (
                    <div
                        key={label}
                        className="dropdown"
                        onMouseEnter={() => setActiveDropdown(label)}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button className="nav-button">{label}</button>
                        <div className={`dropdown-menu ${activeDropdown === label ? 'visible' : ''}`}>
                            {items.map((item, idx) => (
                                <div key={idx} className="dropdown-item">{item}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="controls">
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                <img src="/user-avatar.png" alt="User" className="avatar" />
            </div>
        </nav>
    );
};

export default Navbar;
