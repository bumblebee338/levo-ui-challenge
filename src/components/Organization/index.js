import { useLocation } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import Reports from '../Reports';
import Sidebar from '../Sidebar';
import useGetData from '../../helper/useGetData';
import styles from './styles.module.scss';

const { Header, Sider, Content } = Layout;

const Organization = () => {
    const { pathname } = useLocation();

    const ENDPOINT = `https://my.api.mockaroo.com/organizations/${pathname.split('/')[2]}.json?key=78fbcc90`;

    const { data, loading } = useGetData(ENDPOINT);   
    
    if (loading) {
        return <section className="loading_wrapper"><Spin tip="Loading" size="large"></Spin></section>
      }

    return <div>
        <Layout className={styles.layout}>
            <Sider width="15%" className={styles.slider}>
                <Sidebar orgData={data} />
            </Sider>
            <Layout>
                <Header className={styles.header}>
                   Test Reports
                </Header>
                <Content className={styles.content}>
                    <Reports orgData={data} />
                </Content>
            </Layout>
        </Layout>
    </div>

}

export default Organization;