import Dropdown from './Dropdown';

import Link from '../../utils/ActiveLink';

const MenuItems = ({ items, depthLevel }) => {
    return (
        <li className="nav-item">
            {items.subMenu ? (
                <>
                    <Link legacyBehavior 
                        activeClassName="active"
                        href={items.url}
                    >
                        <a className="nav-link">
                            {items.title} <i className="flaticon-down-arrow"></i>
                        </a>
                    </Link>
                    <Dropdown
                        depthLevel={depthLevel}
                        submenus={items.subMenu}
                    />
                </>
            ) : (
                <Link legacyBehavior 
                    activeClassName="active" 
                    href={items.url}
                >   
                    <a className="nav-link " >{items.title}</a>
                </Link>
            )}
        </li>
    );
};

export default MenuItems;
