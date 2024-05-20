import { useLocation } from "react-router-dom";
import { Layout, Breadcrumb, Spin } from 'antd';
import Sidebar from "../Sidebar";
import styles from './styles.module.scss';
import getDuration from "../../helper/getDuration";
import getTimeAgo from "../../helper/getTimeAgo";
import { FieldTimeOutlined, CalendarOutlined, CodeSandboxOutlined, GithubOutlined, BranchesOutlined, ForkOutlined, GlobalOutlined } from '@ant-design/icons';
import Endpoints from "./Endpoints";
import useGetData from "../../helper/useGetData";

const { Header, Sider, Content } = Layout;

const headerStyle = {
    height: 'auto',
    backgroundColor: '#fff',
    marginTop: 12,
    padding: 8
};

const contentStyle = {
    minHeight: 120,
    backgroundColor: '#fff',
    padding: '12px'
};

const siderStyle = {
    textAlign: 'center',
    backgroundColor: '#8080803b',
    minHeight: '100vh'
};


const ReportDetails = () => {
    const { pathname } = useLocation();

    const ENDPOINT = `https://my.api.mockaroo.com/organizations/1/reports/${pathname.split('/')[4]}/details.json?key=78fbcc90`;

    const ENDPOINT1 = `https://my.api.mockaroo.com/organizations/${pathname.split('/')[2]}.json?key=78fbcc90`;

    const { data: orgData } = useGetData(ENDPOINT1);
    const { data, loading } = useGetData(ENDPOINT);

    if(loading){
        return <section className="loading_wrapper"><Spin tip="Loading" size="large">
        Please hang on, report data is coming...
      </Spin></section>
    }

    return <section className={styles.container}>
        <Layout>
            <Sider width="15%" style={siderStyle}>
                <Sidebar orgData={orgData} />
            </Sider>
            <Layout>
                <Header style={headerStyle}>
                    <Breadcrumb
                        separator=">"
                        items={[
                            {
                                title: 'Test Reports',
                                href: `/organization/${orgData?.id}`
                            },
                            {
                                title: `Execution #${data?.id}`,
                            }
                        ]}
                    />
                </Header>
                <Content style={contentStyle}>
                    <div className={styles.details}>
                        <div className={styles.date_time}>
                            <span><FieldTimeOutlined />{getDuration(data?.duration)}</span>
                            <span><CalendarOutlined />{getTimeAgo(data?.end_date)}</span>
                        </div>
                        <div className={styles.job_name}>
                            <CodeSandboxOutlined />{data?.job_name}
                        </div>
                        <div>
                            <span><BranchesOutlined />{data?.branch}</span>
                            <span><ForkOutlined />{data?.commit}</span>
                            <span><GithubOutlined />{data?.github_user}</span>
                        </div>
                        <div>
                            <GlobalOutlined />{data?.environment_url}
                        </div>
                    </div>
                    <div className={styles.endpoints_list}>
                        <h2>Results</h2>
                        <Endpoints endpoints={data?.endpoints} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    </section>
}

export default ReportDetails;