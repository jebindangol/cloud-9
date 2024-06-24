import MenuItems from './MenuItems';
const Dropdown = ({ submenus, depthLevel }) => {
    depthLevel = depthLevel + 1;
    return (
        <ul className='dropdown-menu'>
            {submenus.map((submenu, index) => (
                <MenuItems
                    items={submenu}
                    key={index}
                    depthLevel={depthLevel}
                />
            ))}
        </ul>
    );
};

export default Dropdown;