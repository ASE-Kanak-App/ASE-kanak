import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaPlus, FaSignOutAlt } from 'react-icons/fa';

function NavigationBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/mainpage"><FaHome /> Home</Link></li>
                <li><Link to="/profile"><FaUser /> Profile</Link></li>
                <li><Link to="/posts"><FaPlus /> Post</Link></li>
                <li><Link to="/logout"><FaSignOutAlt /> Logout</Link></li>
            </ul>
        </nav>
    );
}

export default NavigationBar;
