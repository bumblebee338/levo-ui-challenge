import styles from './styles.module.scss';
import { Link, useLocation } from "react-router-dom";
import getDuration from "../../helper/getDuration";
import getTimeAgo from "../../helper/getTimeAgo";
import useGetData from "../../helper/useGetData";
import { Spin } from 'antd';

const Reports = ({ orgData }) => {
    const { pathname } = useLocation();

    const ENDPOINT = `https://my.api.mockaroo.com/organizations/${pathname.split('/')[2]}/reports.json?key=78fbcc90`;

    const { data, loading, error } = useGetData(ENDPOINT);

    if(error){
        return <div>
            Error
        </div>
    }

    if(loading){
        return <section className="loading_wrapper"><Spin tip="Loading" size="large">
        Please hang on, report list is coming...
      </Spin></section>
    }
    return <section>
        {(data || []).map(item => {
            return <Link to={`/organization/${pathname.split('/')[2]}/report/${item.id}`} className={styles.card}>
                <div>
                    <h3>Execution #{item?.id}</h3>
                    <div className={styles.times}>
                        {getTimeAgo(item.start_date)} - {getDuration(item.duration)}
                    </div>
                </div>
                <div className={styles.test_data}>
                    <span className={styles.success}>
                        {item?.succeed_tests} passed
                    </span>
                    <span className={styles.failed}>
                        {item?.failed_tests} failed
                    </span>
                </div>
            </Link>
        })}
    </section>
}

export default Reports