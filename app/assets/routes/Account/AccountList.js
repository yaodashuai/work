import React, { PureComponent } from 'react';
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
    Collapse
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import * as styles from './AccountList.less';
const FormItem = Form.Item;
const { Option } = Select;
const TabPane = Tabs.TabPane
const CheckboxGroup  = Checkbox.Group
const Panel = Collapse.Panel
let permissionsObject = {}
let permissionsObjects = {}
function callback(key) {
    console.log(key);
}

@connect(({ accountList, loading }) => ({
    accountList,
    loading: loading.models.accountList,
}))
@Form.create()
export default class AccountList extends PureComponent {
    state = {
        visible:false,
        status:'add',
        data:[],
        permissionGroup:[],
        tabsData:{},
        permissionData:[],
        clickCheckboxId:0,
    };
    componentWillUnmount(){
        const {dispatch} = this.props
        dispatch({
            type:'accountList/clear'
        })
        permissionsObject = {}
        permissionsObjects = {}
    }
    componentWillReceiveProps(nextprops) {
        const {dispatch} = this.props
        if (nextprops.accountList.error) {
            message.error(nextprops.accountList.error)
            dispatch({
                type: 'accountList/clearError'
            })
        }else{
            if(Object.keys(nextprops.accountList.data || [])){
                let data = nextprops.accountList.data
                this.setState({ data })
            }
            if(Object.keys(nextprops.accountList.permissionGroup || [])){
                let permissionGroup = nextprops.accountList.permissionGroup
                let permissionData = []
                permissionGroup.map( (item)=>{
                    permissionData = [ ...permissionData,...item.permissions]
                })
                this.setState({ permissionGroup, permissionData })
            }
            if(!nextprops.accountList.hide){
                const { form } = this.props
                this.setState({
                    visible: false,
                });
                form.resetFields()
            }
            if (Object.keys(nextprops.accountList.savePermissions || {}).length) {
                const { permissionData, clickCheckboxId } = this.state
                let data = permissionData.filter((item) =>{
                    return item.id === clickCheckboxId
                })
                message.success(`${(data[0] || {} ).name}启用成功`)
                dispatch({
                    type:'accountList/clearSavePermissions'
                })
            }
            if (Object.keys(nextprops.accountList.deletePermissions || {}).length) {
                console.log(nextprops.accountList.deletePermissions)
                const { permissionData, clickCheckboxId } = this.state
                let data = permissionData.filter((item) =>{
                    return item.id === clickCheckboxId
                })
                message.success(`${(data[0] || {} ).name}禁用成功`)
                dispatch({
                    type:'accountList/clearDeletePermissions'
                })
            }
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type:'accountList/fetchPermissionGroup'
        })
        dispatch({
            type:'accountList/fetchList'
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { status, tabsData } = this.state
        const { dispatch } = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if ( status === 'add'){
                    dispatch({
                        type:'accountList/addRole',
                        payload:values
                    })
                }else{
                    console.log(status)
                    values.roleId = tabsData.id
                    dispatch({
                        type:'accountList/updateRole',
                        payload:values
                    })
                }
            }
        });
    }
    showModal = (status,data) => {
        this.setState({
            visible: true,
            status,
            tabsData:data
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    tabsonChange(activeKey){
        console.log(activeKey)
    }
    processingData(permissions){
        let options = []
        permissions.map((item) =>{
            options.push({  label:item.name, value: item.id })
        })
        return options
    }
    filterData(permissions,name,id,permissionsId){
        let defaultValue = []
         permissions.forEach((item)=>{
            if(item.category === name) {
                defaultValue.push(item.id)
            }
        })
        permissionsObject[permissionsId] = permissionsObject[permissionsId]  === undefined ? {}: permissionsObject[permissionsId]
        permissionsObject[permissionsId][id] = defaultValue
        return defaultValue
    }
    cloneDeep(obj, data={}) {
        for (let key in obj) {
            if (typeof obj[key] == 'object' && Object.keys(obj[key].length > 0)) {
                data[key] = this.cloneDeep(obj[key])
            } else {
                data[key] = obj[key]
            }
        }
        return data
    }
    checkboxGroupChange( roleId,permissionsId,checkedValues) {
        permissionsObjects = Object.keys(permissionsObjects).length ? permissionsObjects : this.cloneDeep(permissionsObject)
        const { dispatch } = this.props
        let arr = permissionsObjects[roleId][permissionsId]
        let clickCheckboxId
        if(arr.length > checkedValues.length ){
            let permissionIds = arr.filter((item) =>{
                return checkedValues.indexOf(item) < 0
            })
            dispatch({
                type:'accountList/deletePermissions',
                    payload:{
                    permissionIds:permissionIds,
                    roleId:roleId
                }
            })
            clickCheckboxId = permissionIds[0]
        }else{
            clickCheckboxId = [...checkedValues].pop()
            dispatch({
                type:'accountList/allocationPermissions',
                payload:{
                    permissionIds:checkedValues,
                    roleId:roleId
                }
            })
        }
        permissionsObjects[roleId][permissionsId] = [...checkedValues]
        this.setState({ clickCheckboxId })
    }
    renderPermissionModule(permissions){
        const { permissionGroup } = this.state
        return(
            <Collapse defaultActiveKey={['1']} onChange={callback}>
                {
                    (permissionGroup || []).map( (item) =>{
                        return <Panel header={ item.name } key={ item.id }>
                            <CheckboxGroup options={this.processingData(item.permissions)} defaultValue={this.filterData(permissions.permissions,item.name,item.id,permissions.id)}  onChange={this.checkboxGroupChange.bind(this,permissions.id,item.id)} />
                        </Panel>
                    })
                }
            </Collapse>
        )
    }
    deleteRole(roleId){
        const { dispatch } = this.props
        dispatch({
            type:'accountList/deleteRole',
            payload:{
                roleId
            }
        })
    }

    render() {
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
        const { data } = this.state
        const { getFieldDecorator } = this.props.form
        const { loading } = this.props;
        const { status, tabsData } = this.state
        return (
            <PageHeaderLayout title="账户列表">
                <Card bordered={false}>
                    <Row style={{ marginBottom : 20 }}>
                        <Col style={{textAlign:'right'}}>
                            <Button  type="primary" onClick={()=>{ this.showModal('add')}}> 添加角色 </Button>
                        </Col>
                    </Row>
                    <Tabs
                        className={styles['account-tabs']}
                        defaultActiveKey="1"
                        tabPosition={'left'}
                        onChange={ this.tabsonChange }
                    >
                        {
                            ( data || [] ).map( (item,index) =>{
                                return <TabPane tab={<p ><span style={{ marginRight: 30 }}>{item.name}</span><span className={styles.editBox}><Icon type="edit" onClick={()=>{this.showModal('edit',item)}}/><Icon type="delete" onClick={()=>{this.deleteRole(item.id)}}/></span></p>} key={index}>{this.renderPermissionModule(item)}</TabPane>
                            })
                        }
                    </Tabs>
                    <Modal
                        title={ status === 'add' ? '添加角色':'编辑角色'}
                        visible={this.state.visible}
                        onOk={this.handleSubmit}
                        onCancel={this.handleCancel}
                    >
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label="角色名称"
                            >
                                {getFieldDecorator('name', {
                                    rules: [ {required: true, message: 'Please input your name!',}],
                                    initialValue: status === 'add' ? '' : tabsData.name
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Form>
                    </Modal>
                </Card>
            </PageHeaderLayout>
        );
    }
}
