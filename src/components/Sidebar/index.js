import { CaretRightOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const Sidebar = ({orgData}) =>{
    return <div className={styles.container}>
        <Link to="/">Levo</Link>
        <h3>{orgData?.name}</h3>
        <div className={styles.heading}>
            <CaretRightOutlined />Test Reports
        </div>
    </div>
}

export default Sidebar;
