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
import Modals from './Modal'

const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ universityList, loading }) => ({
    universityList,
    loading: loading.models.universityList,
}))
@Form.create()
export default class UniversityList extends PureComponent {
    state = {
        expandForm: false,
        selectedRows: [],
        formValues: {},
        data: {},
        visible: false,
        area:[],
        country:[],
        department:[]
    };
    componentWillUnmount(){
        const {dispatch} = this.props
        dispatch({
            type:'universityList/clear'
        })
    }
    componentWillReceiveProps(nextprops) {
        if (nextprops.universityList.error) {
            message.error(nextprops.universityList.error)
            const {dispatch} = this.props
            dispatch({
                type: 'universityList/clear'
            })
        }else{
            if(nextprops.universityList.country){
                let country = nextprops.universityList.country
                this.setState({country})
            }
            if(nextprops.universityList.area){
                let area = nextprops.universityList.area
                this.setState({area})
            }
            if(nextprops.universityList.department){
                let department = nextprops.universityList.department
                this.setState({department})
            }
            if(nextprops.universityList.data){
                let data = nextprops.universityList.data
                this.setState({data})
            }
            if (nextprops.universityList.closed){
                this.setState({
                    visible: false,
                });
            }
        }

    }
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch({
            type:'universityList/fetchCountry',
            payload:{
                page:0,
                size:300
            }
        })
        dispatch({
            type:'universityList/fetchArea',
            payload:{
                page:0,
                size:3400
            }
        })
        // dispatch({
        //     type:'universityList/fetchDepartment'
        // })
        dispatch({
            type: 'universityList/fetchUniversityList',
            payload:{
                page:0,
                size:10
            }
        });
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
        dispatch({
            type: 'universityList/fetch',
            payload: {
                page:0,
                size:10
            },
        });
    };

    toggleForm = () => {
        this.setState({
            expandForm: !this.state.expandForm,
        });
    };

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

    handleSearch = e => {
        e.preventDefault();

        const { dispatch, form } = this.props;

        form.validateFields((err, values) => {
            if (err) return;
            this.setState({formValues:values})
            dispatch({
                type:'universityList/fetchCategoryList',
                payload:{
                    categoryId:Object.values(values)[0],
                    size:10,
                    page:0
                }
            })
        });
    };

    renderSimpleForm() {
        const { getFieldDecorator } = this.props.form;
        const { country } = this.state
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="高校id">
                            {getFieldDecorator('id')(<Input placeholder="请输入" />)}b
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="高校名称">
                            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                            <FormItem label="所属国家">
                                {getFieldDecorator('country ',{
                                    rules:[{required:true,message:'请选择所属国家'}]
                                })(
                                    <Select placeholder="请选择" style={{ width: '100%' }} showSearch  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                        {
                                            country.map((item) =>{
                                                return <Option value={`${item.id}`} key={item.id} >{item.name}</Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                    </Col>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
                </Row>
            </Form>
        );
    }

    renderAdvancedForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="调用次数">
                            {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
                        </FormItem>
                    </Col>
                </Row>
                <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
                </div>
            </Form>
        );
    }
    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
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
        if (Object.keys(formValues).length) {
            params.categoryId = formValues["categoryId "]
            dispatch({
                type: 'universityList/fetchCategoryList',
                payload:params
            });
        }else{
            dispatch({
                type: 'universityList/fetchUniversityList',
                payload:params
            });
        }
    };
    renderForm() {
        return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }
    editArticle =(record) =>{
        const { dispatch } = this.props
        dispatch(routerRedux.push(`/university/universityInfo/${record.id}`))
    }

    removeItem =(record) =>{
        this.props.dispatch({
            type:'universityList/removeItem',
            payload:{
                universityId:record.id,
            }
        })
    }
    render() {
        const { loading } = this.props;
        const { selectedRows, area, country, department, data } = this.state;
        data && data.list && data.list.map((item) =>{
            item.key = item.id
        })

        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title:'高校名称',
                dataIndex:'nameZH'
            },
            {
                title: '国家',
                dataIndex: 'country.name',
            },
            {
                title: '地区',
                dataIndex: 'administrativeDivision.name',
            },
            {
                title: '操作',
                render: (text, record) => (
                    <Fragment>
                        <a onClick={()=>{
                            this.editArticle(record)
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
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>{this.renderForm()}</div>
                        <div className={styles.tableListOperator}>
                            <span>
                                <Button onClick={this.showModal}>添加高校</Button>
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
                    title="添加高校"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Modals country={Object.keys(country).length ? country : [] }  area={Object.keys(area).length ? area : [] } department={Object.keys(department).length ? department : [] }/>
                </Modal>
            </PageHeaderLayout>
        );
    }
}
