import { CaretRightOutlined, CheckCircleFilled, ExclamationCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Collapse, Input } from 'antd';
import styles from './styles.module.scss';
import getDuration from '../../../helper/getDuration';
import { useState } from 'react';

const { Search } = Input;

const ICON_MAPPING = {
    'SUCCESS': <CheckCircleFilled style={{ color: 'green' }} />,
    'ERROR': <ExclamationCircleFilled style={{ color: 'orange' }} />,
    'FAILURE': <CloseCircleFilled style={{ color: 'red' }} />
}

const Endpoints = ({ endpoints }) => {
    const [searchQuery, setSearchQuery] = useState('');


    const groupedData = (endpoints || [])?.reduce((groups, item) => {
        const status = item.status;
        if (!groups[status]) {
            groups[status] = [];
        }
        groups[status].push(item);
        return groups;
    }, {});

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const getFilteredData = (data) => {
        if (!searchQuery) return data;
        return data.filter(item => item.url.toLowerCase().includes(searchQuery));
    };

    const getItems = (data, status) => {
        const filteredData = getFilteredData(data);

        return [{
            key: status,
            label: <div className={styles.collapse_header}>
                {ICON_MAPPING[status]} {status} Tests ({filteredData.length}/ {endpoints.length})
            </div>,
            children: (
                filteredData.map(obj => <div className={styles.url_card}>
                    <p>GET {obj.url}</p>
                    <p>{getDuration(obj.duration)}</p></div>
                )
            ),
        }];
    };

    return <>
        <Search
            placeholder="Search URLs"
            onChange={handleSearch}
            style={{ marginBottom: 16 }}
        />

        {Object.keys(groupedData).map(status => (
            <div key={status}>
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    items={getItems(groupedData[status], status)}
                />
            </div>
        ))}
    </>
}

export default Endpoints;