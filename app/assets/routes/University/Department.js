import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Input,
    DatePicker,
    Form,
    Select,
    Button,
    Card,
    Icon,
    Row,
    Col,
    Tag,
    Modal,
    Tree,
    Menu
} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ModalHasForm from '../../components/ModalHasForm';

const { Option } = Select;
const { RangePicker } = DatePicker;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const FormItem = Form.Item

const isEmpty = (obj) => {
    for (let key in obj) {
        return false;
    }
    return true;
}
let x = 3;
let y = 2;
let z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: key, key,data:`yaozhao` });
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    console.log(children,tns)
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(z);

const dataList = [];
const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        dataList.push({ key, title: key });
        if (node.children) {
            generateList(node.children, node.key);
        }
    }
};
console.log(gData)
generateList(gData);

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};
console.log(getParentKey('0-1-0',gData))

@connect(({ department, loading }) => ({
    department,
    loading: loading.models.department,
}))
@Form.create()
export default class Department extends PureComponent {

    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
        rightClickNodeTreeItem:{},
        visible:false,
        selectedRows:[],
        Visible:false
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onChange = (e) => {
        const value = e.target.value;
        const expandedKeys = dataList.map((item) => {
            if (item.title.indexOf(value) > -1) {
                return getParentKey(item.key, gData);
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
            rightClickNodeTreeItem:{}
        });
    }

    treeNodeonRightClick(e) {
        console.log(e.event)
        console.log(e.node)
        this.setState({
            rightClickNodeTreeItem: {
                pageX: e.event.pageX,
                pageY: e.event.pageY,
            }
        });
    }

    getNodeTreeRightClickMenu() {
        if(isEmpty(this.state.rightClickNodeTreeItem)){
            return null
        }else{
            const {pageX, pageY} = {...this.state.rightClickNodeTreeItem};
            const tmpStyle = {
                position: 'absolute',
                left: `${pageX-250 }px`,
                top: `${pageY - 170}px`,
                border:'1px solid #ccc'
            };
            const menu = (
                <Menu
                    onClick={this.handleMenuClick}
                    style={tmpStyle}
                >
                    <Menu.Item key='1'><Icon type='plus-circle'/>{'加同级'}</Menu.Item>
                    <Menu.Item key='2'><Icon type='plus-circle-o'/>{'加下级'}</Menu.Item>
                    <Menu.Item key='4'><Icon type='edit'/>{'修改'}</Menu.Item>
                    <Menu.Item key='3'><Icon type='minus-circle-o'/>{'删除目录'}</Menu.Item>
                </Menu>
            );
            return menu
        }

    }

    onSelect = (node) => {
        this.setState({ rightClickNodeTreeItem: {} }, () => {
            console.log('rightNodeItem hideed');
        })
    }
    handleMenuClick(e){
        const key = e.key
        if (key == 1){
            alert('加同级')
        }else if(key == 2){
            alert('加下级')
        }else if(key == 3){

        }else if(key == 4){

        }
    }

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };
    _renderForm(){
        const { form:{getFieldDecorator} } = this.props;
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
        return(
            <Form >
                <FormItem label="小明"{...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your name!' }],
                    })(
                        <Input  />
                    )}
                </FormItem>
            </Form>
        )
    }

    _renderFormMember(){
        const { form:{getFieldDecorator} } = this.props;
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
        return(
            <Form layout='horizontal'>
                <FormItem label="小明"{...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your name!' }],
                    })(
                        <Input  />
                    )}
                </FormItem>
            </Form>
        )
    }
    render() {
        const { form:{getFieldDecorator} } = this.props;
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
        const _renderFormMember = (
            <Form layout='horizontal'>
                <FormItem label="小明"{...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your name!' }],
                    })(
                        <Input  />
                    )}
                </FormItem>
            </Form>
        );
        const _renderForm = (
            <Form layout='horizontal'>
                <FormItem label="小明"{...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your name!' }],
                    })(
                        <Input  />
                    )}
                </FormItem>
            </Form>
        );
        const { searchValue, expandedKeys, autoExpandParent, selectedRows } = this.state;
        const loop = data => data.map((item) => {
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const title = index > -1 ? (
                <span>
          {beforeStr}
                    <span style={{ color: '#f50' }}>{searchValue}</span>
                    {afterStr}
        </span>
            ) : <span>{item.title}</span>;
            if (item.children) {
                return (
                    <TreeNode key={item.key} title={title} >
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={title} data={item.data}/>;
        });
        const columns = [
            {
                title:'姓名',
                dataIndex:'name'
            },
            {
                title:'年龄',
                dataIndex:'age'
            },
            {
                title:'性别',
                dataIndex:'sex'
            }
        ]

        return (
            <PageHeaderLayout>
                    <Row gutter={24}>
                        <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                            <Card
                                bordered={false}
                            >
                                <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
                                <Tree
                                    onExpand={this.onExpand}
                                    expandedKeys={expandedKeys}
                                    autoExpandParent={autoExpandParent}
                                    onRightClick={this.treeNodeonRightClick.bind(this)}
                                    onSelect={this.onSelect}
                                >
                                    {loop(gData)}
                                </Tree>
                                {this.getNodeTreeRightClickMenu()}
                            </Card>
                        </Col>

                        <Col xl={18} lg={24} md={24} sm={24} xs={24}>
                            <Card
                                bordered={false}
                            >
                                <Button onClick={()=>{this.setState({Visible:true})}}>添加</Button>
                                <Button onClick={()=>{this.setState({visible:true})}}>修改</Button>
                                <StandardTable
                                    selectedRows={selectedRows}
                                    data={[]}
                                    columns={columns}
                                    onSelectRow={this.handleSelectRows}
                                    onChange={this.handleStandardTableChange}
                                />

                                <Modal title="修改部门名称" key={Math.random()} visible={this.state.Visible} width="35%" onCancel={() => { this.setState({ Visible:false }) }}
                                       footer={[<Button key="back" type="primary" size="large" onClick={this.editDepartmentName.bind(this)}>保存</Button>]} >
                                    <ModalHasForm _renderContent = {_renderFormMember} ref='editDepartmentName'/>
                                </Modal>
                                <Modal title="添加成员" key={Math.random()} visible={this.state.visible} width="35%" onCancel={() => { this.setState({ visible:false }) }}
                                       footer={[<Button key="back" type="primary" size="large" onClick={this.addMember.bind(this)}>保存</Button>]} >
                                    <ModalHasForm _renderContent = {_renderForm} ref='addMember'/>
                                </Modal>

                            </Card>
                        </Col>
                    </Row>

            </PageHeaderLayout>
        );
    }
    editDepartmentName(e){
        console.log(this)
        this.refs.editDepartmentName.handleValidator(e,(value)=>{
            console.log(value)
        })
    }
    addMember(e){
        this.refs.addMember.handleValidator(e,(value)=>{
            console.log(value)
        })
    }
}
