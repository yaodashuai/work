import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    InputNumber,
    DatePicker,
    message,
    Divider,
    Popconfirm,
    Modal
} from 'antd';
const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';
import TopForm from './TopForm'

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ universityInfo, loading }) => ({
    universityInfo,
    loading: loading.models.universityInfo,
}))
@Form.create()
export default class UniversityInfo extends PureComponent {
    state = {
        expandForm: false,
        selectedRows: [],
        formValues: {},
        data: {},
        visible: false,
        country:[],
        status:'add',
        initData:{}

    };
    componentWillUnmount(){
        const {dispatch} = this.props
        dispatch({
            type:'universityInfo/clear'
        })
    }
    componentWillReceiveProps(nextprops) {
        if (nextprops.universityInfo.error) {
            message.error(nextprops.universityInfo.error)
            const {dispatch} = this.props
            dispatch({
                type: 'universityInfo/clearError'
            })
        }else{
            if(!nextprops.universityInfo.hide){
                const {form} = this.props
                this.setState({
                    visible: false,
                });
                form.resetFields()
            }
            if(nextprops.universityInfo.country){
                let country = nextprops.universityInfo.country
                this.setState({country})
            }
            if(nextprops.universityInfo.data){
                let data = nextprops.universityInfo.data
                this.setState({ data })
            }
        }

    }
    componentDidMount(){
        const { id } = this.props.match.params
        const { dispatch } = this.props;
        dispatch({
            type:'universityInfo/fetchCountry',
            payload:{
                page:0,
                size:300
            }
        })
        dispatch({
            type:'universityInfo/fetchArea',
            payload:{
                page:0,
                size:3400
            }
        })
        dispatch({
            type:'universityInfo/fetchUniversityInfo',
            payload:{
                universityId:id
            }
        })
        dispatch({
            type:'universityInfo/fetchDepartment',
            payload:{
                universityId:id,
                page:0,
                size:500
            }
        })
        dispatch({
            type: 'universityInfo/fetchRank',
            payload:{
                page:0,
                size:10,
                universityId:id
            }
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props
                const { status , initData = {} } =this.state
                let QS = (initData.rankings || []).filter((item) => item.organisation === 'QS')[0]
                let USNEWS = (initData.rankings || []).filter((item) => item.organisation === 'USNEWS')[0]
                let TIMES = (initData.rankings || []).filter((item) => item.organisation === 'TIMES')[0]
                let ARWU = (initData.rankings || []).filter((item) => item.organisation === 'ARWU')[0]
                let data = {
                    "universityId":this.props.match.params.id,
                    "rankings": [
                        {
                            "organisation": "QS",
                            "ranking": values.QS,
                            "year": values.year,
                            "id": status === 'edit' ? QS.id :''
                        },
                        {
                            "organisation": "USNEWS",
                            "ranking": values.USNEWS,
                            "year": values.year,
                            "id": status === 'edit' ? USNEWS.id :''
                        },
                        {
                            "organisation": "TIMES",
                            "ranking": values.TIMES,
                            "year": values.year,
                            "id": status === 'edit' ? TIMES.id :''
                        },
                        {
                            "organisation": "ARWU",
                            "ranking": values.ARWU,
                            "year": values.year,
                            "id": status === 'edit' ? ARWU.id :''
                        },
                    ]
                }
                if (status === 'add'){
                    dispatch({
                        type:'universityInfo/addRank',
                        payload:data
                    })
                } else{
                    dispatch({
                        type:'universityInfo/updatedRank',
                        payload:data
                    })
                }

                console.log('Received values of form: ', data);
            }
        });
    }
    showModal = (status,record) => {
       console.log(record)
        this.setState({
            visible: true,
            initData:record,
            status
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            status:  'add'
        });
    }
    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };
    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch,match:{ params :{ id }} } = this.props;
        const { formValues } = this.state;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});
        const params = {
            page: pagination.current - 1,
            size: pagination.pageSize,
            // ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }
        params.universityId = id
            dispatch({
                type: 'universityInfo/fetchRank',
                payload:params
            });
    };

    removeItem =(record) =>{
        this.props.dispatch({
            type:'universityInfo/removeItem',
            payload:{
                universityId:this.props.match.params.id,
                year:record.year
            }
        })
    }
    render() {
        const { loading, form:{getFieldDecorator} } = this.props;
        const { selectedRows, country, data, initData = {} , status } = this.state;
        data && data.list && data.list.map((item) =>{
            item.key = item.year
        })
        let QS = (initData.rankings || []).filter((item) => item.organisation === 'QS')[0]
        let USNEWS = (initData.rankings || []).filter((item) => item.organisation === 'USNEWS')[0]
        let TIMES = (initData.rankings || []).filter((item) => item.organisation === 'TIMES')[0]
        let ARWU = (initData.rankings || []).filter((item) => item.organisation === 'ARWU')[0]
        const arr = []
        let d  = 2000
        while( d <= new Date().getFullYear()){
            arr.push(d)
            d++
        }
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };

        const columns = [
            {
                title: '年份',
                dataIndex: 'year',
            },
            {
                title:'USNEWS排名',
                render:(text, record, index)=> {
                    return(
                        <span>{(record.rankings || []).filter((item) => item.organisation === 'USNEWS')[0].ranking}</span>
                    )
            }
            },
            {
                title: 'TIMES排名',
                render:(text, record, index)=> {
                    return(
                        <span>{(record.rankings || []).filter((item) => item.organisation === 'TIMES')[0].ranking}</span>
                    )
                }
            },
            {
                title: 'ARWU排名',
                render:(text, record, index)=> {
                    return(
                        <span>{(record.rankings || []).filter((item) => item.organisation === 'ARWU')[0].ranking}</span>
                    )
                }
            },
            {
                title: 'QS排名',
                render:(text, record, index)=> {
                    return(
                        <span>{(record.rankings || []).filter((item) => item.organisation === 'QS')[0].ranking}</span>
                    )
                }
            },
            {
                title: '操作',
                render: (text, record) => (
                    <Fragment>
                        <a onClick={()=>{
                            this.showModal('edit',record)
                        }}>编辑</a>
                        <Divider type="vertical" />
                        <Popconfirm title="确认删除吗？" onConfirm={()=>{
                            this.removeItem(record)
                        }} okText="yes" cancelText="No">
                            <a >删除</a>
                        </Popconfirm>
                    </Fragment>
                ),
            },
        ];
        return (
            <PageHeaderLayout>
                <Card title={'高校基本信息'} bordered={false}>
                   <TopForm id={this.props.match.params.id}/>
                </Card>
                <Card bordered={false} title={'高校历年四大排名信息'}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListOperator}>
                            <span>
                                <Button onClick={()=>{
                                    this.showModal('add')
                                }}>录入排名信息</Button>
                            </span>
                        </div>
                            <StandardTable
                                selectedRows={selectedRows}
                                loading={loading}
                                data={data}
                                columns={columns}
                                onSelectRow={this.handleSelectRows}
                                onChange={this.handleStandardTableChange}
                            />
                    </div>
                </Card>
                <Modal
                    title={ this.state.status === 'edit'? `编辑高校四大排名`:`新建高校四大排名`}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayout} label="排名年份">
                            {getFieldDecorator('year', {
                                rules: [{required: true, message: '请选择排名年份',}],
                                initialValue:status === 'edit' ? initData.year :''
                            })(
                                <Select >
                                    {
                                        arr.map((item) =>{
                                            return <Option value={item} key={item} >{item}</Option>
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="USNEWS排名">
                            {getFieldDecorator('USNEWS', {
                                rules: [{required: true, message: '请填写USNEWS排名',}],
                                initialValue:status === 'edit' ? USNEWS.ranking :''
                            })(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="TIMES排名">
                            {getFieldDecorator('TIMES', {
                                rules: [{required: true, message: '请填写TIMES排名',}],
                                initialValue:status === 'edit' ? TIMES.ranking :''
                            })(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="ARWU排名">
                            {getFieldDecorator('ARWU', {
                                rules: [{required: true, message: '请填写ARWU排名',}],
                                initialValue:status === 'edit' ? ARWU.ranking :''
                            })(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="QS排名">
                            {getFieldDecorator('QS', {
                                rules: [{required: true, message: '请填写QS排名',}],
                                initialValue:status === 'edit' ? QS.ranking :''
                            })(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </PageHeaderLayout>
        );
    }
}
