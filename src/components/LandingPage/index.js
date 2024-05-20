import { useContext } from "react"
import { Link } from 'react-router-dom';
import OrganizationsContext from "../../context/organizationsContext"
import styles from './styles.module.scss';

const LandingPage = () => {
    const orgData = useContext(OrganizationsContext);

    if (!orgData) {
        return <div>Context not created</div>
    }

    const { data } = orgData;

    return (
        <section>
            <h1 className={styles.header}>
                Levo
            </h1>
            <div className={styles.container}>
                <h2>Organizations</h2>
                <p>Pick the organization you want to access</p>
                {data.map(item => {
                    return <Link to={`organization/${item.id}`} >
                        <div className={styles.org_card}>
                            <img src={item.owner_picture} alt="owner" />
                            <h3>{item.name}</h3>
                        </div>
                    </Link>
                })}

            </div>
        </section>
    )
}

export default LandingPage;