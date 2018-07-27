import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
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
    Dropdown,
    Menu,
    InputNumber,
    DatePicker,
    Modal,
    message,
    Badge,
    Divider,
    Popconfirm
} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from '../University/TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

const CreateForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            handleAdd(fieldsValue);
        });
    };
    return (
        <Modal
            title="新建规则"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
                {form.getFieldDecorator('desc', {
                    rules: [{ required: true, message: 'Please input some description...' }],
                })(<Input placeholder="请输入" />)}
            </FormItem>
        </Modal>
    );
});

@connect(({ newsList, loading }) => ({
    newsList,
    loading: loading.models.newsList,
}))
@Form.create()
export default class NewsList extends PureComponent {
    state = {
        modalVisible: false,
        expandForm: false,
        selectedRows: [],
        formValues: {},
    };

    componentDidMount() {
        const { dispatch } = this.props;

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
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'rule/fetch',
            payload: params,
        });
    };

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
        dispatch({
            type: 'rule/fetch',
            payload: {},
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

        form.validateFields((err, fieldsValue) => {
            if (err) return;

            const values = {
                ...fieldsValue,
                updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
            };

            this.setState({
                formValues: values,
            });

            dispatch({
                type: 'rule/fetch',
                payload: values,
            });
        });
    };

    handleModalVisible = flag => {
        this.setState({
            modalVisible: !!flag,
        });
    };

    handleAdd = fields => {
        const { dispatch } = this.props;
        dispatch({
            type: 'rule/add',
            payload: {
                description: fields.desc,
            },
        });

        message.success('添加成功');
        this.setState({
            modalVisible: false,
        });
    };

    renderSimpleForm() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="选择栏目">
                            {getFieldDecorator('status')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">选择栏目</Option>
                                    <Option value="1">新闻动态</Option>
                                    <Option value="2">通知公告</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="标题">
                            {getFieldDecorator('no')(<Input placeholder="请输入标题" />)}
                        </FormItem>
                    </Col>

                    <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    renderAdvancedForm() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="选择栏目">
                            {getFieldDecorator('status')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">选择栏目</Option>
                                    <Option value="1">新闻动态</Option>
                                    <Option value="2">通知公告</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="标题">
                            {getFieldDecorator('no')(<Input placeholder="请输入标题" />)}
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
          </span>
                </div>
            </Form>
        );
    }

    renderForm() {
        const { expandForm } = this.state;
        return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }

    render() {
        const data = {
            list:[],
            pagination:{
                page:0,
                size:10
            }
        }
        const {loading} = this.props
        const { selectedRows, modalVisible } = this.state;

        const columns = [
            {
                title: '序号',
                dataIndex: 'no',
            },
            {
                title: '标题',
                dataIndex: 'description',
            },
            {
                title: '分类',
                dataIndex: 'callNo',
            },
            {
                title: '时间',
                dataIndex: 'updatedAt',
                render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },
            {
                title: '阅读量',
                dataIndex: 'a',
            },
            {
                title: '状态',
                dataIndex: 'c',
            },
            {
                title: '操作',
                render: () => (
                    <Fragment>
                        <a href="">编辑</a>
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

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };

        return (
            <PageHeaderLayout title="新闻列表">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>{this.renderForm()}</div>
                        <div className={styles.tableListOperator}>
                           <Button type={'dashed'}>添加</Button>
                           <Button type={'danger'}>删除</Button>
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
                <CreateForm {...parentMethods} modalVisible={modalVisible} />
            </PageHeaderLayout>
        );
    }
}
