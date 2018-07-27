import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
    Tabs,
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    message,
    Divider,
    Popconfirm,
    Modal,
    Checkbox,
    Collapse,
    DatePicker,
    Switch,
    List
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardTable from '../../components/StandardTable';
import styles from './ProjectList.less';
const FormItem = Form.Item;
const { Option } = Select;
const TabPane = Tabs.TabPane
const CheckboxGroup  = Checkbox.Group
const Panel = Collapse.Panel
const {  RangePicker } = DatePicker;
function onChange(date, dateString) {
    console.log(date, dateString);
}
@connect(({ projectList, loading }) => ({
    projectList,
    loading: loading.models.projectList,
}))
@Form.create()
export default class ProjectList extends PureComponent {
    state = {
        expandForm: false,
        selectedRows: [],
        formValues: {},
    };
    componentWillUnmount(){
        const {dispatch} = this.props
        dispatch({
            type:'accountList/clear'
        })

    }
    componentWillReceiveProps(nextprops) {
        const {dispatch} = this.props

    }
    componentDidMount() {
        const { dispatch } = this.props;

    }
    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
    }
    toggleForm = () => {
        this.setState({
            expandForm: !this.state.expandForm,
        });
    };
    renderSimpleForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="项目编号">
                            {getFieldDecorator('no')(<Input placeholder="请输入项目编号" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="项目名称">
                            {getFieldDecorator('name')(<Input placeholder="请输入项目名称" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="项目类型">
                            {getFieldDecorator('types')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">交换</Option>
                                    <Option value="1">访问</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
            <div className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </div>
                    </Col>
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
                        <FormItem label="项目编号">
                            {getFieldDecorator('no')(<Input placeholder="请输入项目编号" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="项目名称">
                            {getFieldDecorator('name')(<Input placeholder="请输入项目名称" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="项目类型">
                            {getFieldDecorator('types')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">交换</Option>
                                    <Option value="1">访问</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="起止时间">
                            {getFieldDecorator('times')( <RangePicker onChange={onChange} />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="所在大洲">
                            {getFieldDecorator('types')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">亚洲</Option>
                                    <Option value="1">北美洲</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="国家地区">
                            {getFieldDecorator('country')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">中国</Option>
                                    <Option value="1">北美洲</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="适用人群">
                            {getFieldDecorator('people')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">博生生</Option>
                                    <Option value="1">研究生</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="选择年级">
                            {getFieldDecorator('grade')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">2018</Option>
                                    <Option value="1">2017</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="选择学校">
                            {getFieldDecorator('school')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">北京大学</Option>
                                    <Option value="1">清华大学</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="选择院系">
                            {getFieldDecorator('school')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">计算机科学院</Option>
                                    <Option value="1">航空航天学院</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="有奖/助学金">
                            {getFieldDecorator('school')(
                                <Switch />
                            )}
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

    renderForm() {
        return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    tabsonChange(activeKey){
        console.log(activeKey)
    }

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };
    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;
        const params = {
            page: pagination.current - 1,
            size: pagination.pageSize,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }
    };
    render() {
        const { selectedRows } = this.state
        const column = [
            {
                title:'项目编号',
                dataIndex:'no'
            },
            {
                title:'国家',
                dataiNdex:'country'
            },
            {
                title:'项目名称',
                dataIndex:'name'
            },
            {
                title:'总/退/延',
                dataIndex:'ok'
            },
            {
                title:'项目心得',
                dataIndex:'heart'
            },
            {
                title:'项目归属',
                dataIndex:'ooh'
            },
            {
                title:'项目时间',
                dataIndex:'time'
            },
            {
                title:'操作',
                render:(text,record) =>(
                    <Fragment>
                        <a onClick={this.handleSelectRow}>编辑项目 </a>
                        <a onClick={this.handleSelectRow}>取消发布 </a>
                        <a onClick={this.handleSelectRow}>查看报名 </a>
                        <a onClick={this.handleSelectRow}>添加备注 </a>
                    </Fragment>
                )
            }
        ]
        const columns = [
            {
                title: '项目编号',
                dataIndex: 'no',
            },
            {
                title:'国家',
                dataIndex:'country'
            },
            {
                title:'项目名称',
                dataIndex:'name'
            },
            {
                title:'学期分配',
                dataIndex:'semester'
            },
            {
                title:'总/已/审',
                dataIndex:'number'
            },
            {
                title:'项目归属',
                dataIndex:'ooh'
            },
            {
                title:'开放申请期',
                dataIndex:'time'
            },
            {
                title:'奖/助学金',
                dataIndex:'money'
            },
            {
                title: '操作',
                render: (text, record) => (
                    <Fragment>
                        <a onClick={()=>{
                            this.editArticle(record)
                        }}>编辑项目</a>
                        <a onClick={()=>{
                            this.editArticle(record)
                        }}>取消发布</a>
                        <Divider type="vertical" />
                        <a onClick={()=>{
                            this.editArticle(record)
                        }}>查看报名</a>
                        <a onClick={()=>{
                            this.editArticle(record)
                        }}>添加备注</a>
                    </Fragment>
                )
            }
        ]
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const { getFieldDecorator } = this.props.form
        const { loading } = this.props;
        const data = {
            pagination:{
                total:3,
                size:10
            }
        }
        const paginations = {
            total:data.pagination.total,
            size:data.pagination.size,
            showQuickJumper:true,
            showSizeChanges:true
        }
        return (
            <PageHeaderLayout title="项目列表">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>{this.renderForm()}</div>
                        <div className={styles.buttonBox}>
                            <Button  icon='export'>导出</Button>
                            <Button  icon='file-add'>添加</Button>
                            <Button  icon='file-add'>按模板添加</Button>
                            <Button  icon='delete' type='dashed'>删除</Button>
                        </div>
                        <Tabs
                            defaultActiveKey="1"
                        >
                            <TabPane tab="正在报名中项目" key="1">
                                <StandardTable
                                    selectedRows={selectedRows}
                                    loading={loading}
                                    data={{list:[],pagination:{}}}
                                    columns={columns}
                                    onSelectRow={this.handleSelectRows}
                                    onChange={this.handleStandardTableChange}
                                />
                            </TabPane>
                            <TabPane tab="待出发项目" key="2">
                                <List
                                    rowKey="id"
                                    loading={loading}
                                    grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                                    dataSource={[{id:7432678332},{id:7432678343,},{id:743267835,}]}
                                    pagination = {paginations}
                                    renderItem={item =>
                                        (
                                            <List.Item key={item.id}>
                                                <Card hoverable className={styles.card} >
                                                    <div className={styles.universityInfo}>
                                                        <img src={'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'} className={styles.img} />
                                                        <div>
                                                            <p >哥伦比亚大学</p>
                                                            <p >项目名称</p>
                                                        </div>
                                                    </div>
                                                    <div className={styles.people}>
                                                        <div >
                                                            <p>项目类型:{'项目类型'}</p>
                                                            <p>确认参加:{'确认参加'}</p>
                                                        </div>
                                                        <p>退出人数</p>
                                                    </div>
                                                    <div className={styles.projectInfo}>
                                                        <div>
                                                            <p>离校申请:{'0/1人'}</p>
                                                            <p>住宿信息:{'0/1人'}</p>
                                                            <p>报到信息:{'0/1人'}</p>
                                                        </div>
                                                        <div>
                                                            <p>航班信息:{'0/1人'}</p>
                                                            <p>紧急联系信息:{'0/1人'}</p>
                                                            <p>回国航班信息:{'0/1人'}</p>
                                                        </div>
                                                    </div>
                                                    <div className={styles.projectTime}>
                                                        <p>项目时间:2018-07-12 ~ 2018-07-30</p>
                                                        <p>共 {18} 天 / 离项目开始还有{14}天</p>
                                                    </div>
                                                </Card>
                                            </List.Item>
                                        )
                                    }
                                />
                            </TabPane>
                            <TabPane tab="正在进行中项目" key="3">
                                <List
                                    rowKey="id"
                                    loading={loading}
                                    grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                                    dataSource={[{id:7432678332},{id:7432678343,},{id:743267835,}]}
                                    pagination = {paginations}
                                    renderItem={item =>
                                        (
                                            <List.Item key={item.id}>
                                                <Card hoverable className={styles.card} >
                                                       <div className={styles.universityInfo}>
                                                           <img src={'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'} className={styles.img} />
                                                           <div>
                                                               <p >哥伦比亚大学</p>
                                                               <p >项目名称</p>
                                                           </div>
                                                       </div>
                                                    <div className={styles.people}>
                                                        <div >
                                                            <p>项目类型:{'项目类型'}</p>
                                                            <p>确认参加:{'确认参加'}</p>
                                                        </div>
                                                        <p>退出人数</p>
                                                    </div>
                                                    <div className={styles.projectInfo}>
                                                        <div>
                                                            <p>离校申请:{'0/1人'}</p>
                                                            <p>住宿信息:{'0/1人'}</p>
                                                            <p>报到信息:{'0/1人'}</p>
                                                        </div>
                                                        <div>
                                                            <p>航班信息:{'0/1人'}</p>
                                                            <p>紧急联系信息:{'0/1人'}</p>
                                                            <p>回国航班信息:{'0/1人'}</p>
                                                        </div>
                                                    </div>
                                                    <div className={styles.projectTime}>
                                                        <p>项目时间:2018-07-12 ~ 2018-07-30</p>
                                                        <p>共 {18} 天 / 离项目开始还有{14}天</p>
                                                    </div>
                                                </Card>
                                            </List.Item>
                                        )
                                    }
                                />
                            </TabPane>
                            <TabPane tab="未启动项目" key="4">
                                <StandardTable
                                    selectedRows={selectedRows}
                                    loading={loading}
                                    data={{list:[],pagination:{}}}
                                    columns={columns}
                                    onselectRow={this.handleSelectRows}
                                    onChange={this.handleStandardTableChange}
                                    />
                            </TabPane>
                            <TabPane tab="已完结项目" key="5">
                                <StandardTable
                                    selectedRows={selectedRows}
                                    loading={loading}
                                    data={{list:[],pagination:{}}}
                                    columns={column}
                                    onSelectRow={this.handleSelectRows}
                                    onChange={this.handleStandardTableChange}
                                    />
                            </TabPane>
                            <TabPane tab="全部项目" key="6">
                                <StandardTable
                                    selectedRows={selectedRows}
                                    loading={loading}
                                    data={{list:[],pagination:{}}}
                                    columns={columns}
                                    onSelectRow={this.handleSelectRows}
                                    onChange={this.handleStandardTableChange}
                                    />
                            </TabPane>
                        </Tabs>
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}
