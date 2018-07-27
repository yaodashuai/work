
import React from 'react';
import { connect } from 'dva';
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
    Modal,
    Checkbox,
    Radio
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
const FormItem = Form.Item;
const { Option } = Select;
const RangePicker  = DatePicker.RangePicker
const InputGroup = Input.Group;
const CheckboxGroup = Checkbox.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {TextArea} = Input

function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
}
@connect(({ overseasVisitInfo, loading }) => ({
    overseasVisitInfo,
    loading: loading.models.overseasVisitInfo,
}))
@Form.create()
export default class OverseasVisitInfo extends React.Component {
    constructor(props){
        super(props)
        this.uuid = 1
        this.visitorsId = 1
        this.inviterId = 1
    }
    state = {
        hide:false,
        visitors:[{id:1}],
        company:[{id:1}],
        inviter:[{id:1}],
    };
    componentWillUnmount(){
        const {dispatch} = this.props

    }
    componentWillReceiveProps(nextprops) {


    }
    componentDidMount(){
        const { dispatch } = this.props;

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

            }
        });
    }
    remove = (k) => {
        const { form } = this.props
        const keys = form.getFieldValue('keys')
        if (keys.length === 1) {
            return
        }
        form.setFieldsValue({
            keys: keys.filter(key => key.id !== k.id)
        })
    }
    add = () => {
        this.uuid++
        const { form } = this.props
        const keys = form.getFieldValue('keys')
        const nextKeys = keys.concat({
            id: this.uuid
        })
        form.setFieldsValue({
            keys: nextKeys
        })
    }
    removeVisitors = (k) => {
        const { form } = this.props
        const visitors = form.getFieldValue('visitors')
        if (visitors.length === 1) {
            return
        }
        form.setFieldsValue({
            visitors: visitors.filter(key => key.id !== k.id)
        })
    }
    addVisitors = () => {
        this.visitorsId++
        const { form } = this.props
        const visitors = form.getFieldValue('visitors')
        const nextVisitors = visitors.concat({
            id: this.visitorsId
        })
        form.setFieldsValue({
            visitors: nextVisitors
        })
    }
    removeInviter = (k) => {
        const { form } = this.props
        const inviter = form.getFieldValue('inviter')
        if (inviter.length === 1) {
            return
        }
        form.setFieldsValue({
            inviter: inviter.filter(key => key.id !== k.id)
        })
    }
    addInviter = () => {
        this.inviterId++
        const { form } = this.props
        const inviter = form.getFieldValue('inviter')
        const nextVisitors = inviter.concat({
            id: this.inviterId
        })
        form.setFieldsValue({
            inviter: nextVisitors
        })
    }
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
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
        // getFieldDecorator('otherInviter',{initialValue:this.state.otherInviter})
        // const otherInviter = getFieldValue('otherInviter')
        // const OtherInviter = otherInviter.map((k,index)=>{
        //     return(
        //         <Row key={k.id}>
        //             <Col span={4}>
        //                 <FormItem>
        //                     {getFieldDecorator(`name[${k.id}]`, {
        //
        //                     })(
        //                         <Input placeholder='名字'/>
        //                     )}
        //                 </FormItem>
        //             </Col>
        //             <Col span={3}>
        //                 <FormItem>
        //                     {getFieldDecorator(`position[${k.id}]`, {
        //
        //                     })(
        //                         <Input placeholder='职位'/>
        //                     )}
        //                 </FormItem>
        //             </Col>
        //             <Col span={4}>
        //                 <FormItem>
        //                     {getFieldDecorator(`email[${k.id}]`, {
        //
        //                     })(
        //                         <Input placeholder='邮箱'/>
        //                     )}
        //                 </FormItem>
        //             </Col>
        //             <Col span={4}>
        //                 <FormItem>
        //                     {getFieldDecorator(`phone[${k.id}]`, {
        //
        //                     })(
        //                         <Input placeholder='电话'/>
        //                     )}
        //                 </FormItem>
        //             </Col>
        //             <Col span={1}>
        //                 {index === 0 ? <Icon type='plus' onClick={thia.addInviter}/> : <Icon type='minus' onClck={()=>{this.removeInviter(k)}}/>}
        //             </Col>
        //         </Row>
        //     )
        // })
        getFieldDecorator('inviter',{initialValue:this.state.inviter})
        const inviter = getFieldValue('inviter')
        const Inviter = inviter.map((k,index) =>{
            return(
                <Row key={k.id}>
                    <Col span={4}>
                        <FormItem>
                            {getFieldDecorator(`name[${k.id}]`, {

                            })(
                                <Input placeholder='名字'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <FormItem>
                            {getFieldDecorator(`position[${k.id}]`, {

                            })(
                                <Input placeholder='职位'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem>
                            {getFieldDecorator(`email[${k.id}]`, {

                            })(
                                <Input placeholder='邮箱'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem>
                            {getFieldDecorator(`phone[${k.id}]`, {

                            })(
                                <Input placeholder='电话'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={1}>
                        {index === 0 ? <Icon type='plus' onClick={thia.addInviter}/> : <Icon type='minus' onClck={()=>{this.removeInviter(k)}}/>}
                    </Col>
                </Row>
            )
        })
        getFieldDecorator('visitors',{initialValue:this.state.visitors})
        const Visitors = getFieldValue('visitors')
        const visitorss = Visitors.map((k,index)=>{
            return(
                <Row key={k.id}>
                    <Col span={4}>
                        <FormItem>
                            {getFieldDecorator(`name[${k.id}]`, {

                            })(
                                <Input placeholder='名称'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <FormItem>
                            {getFieldDecorator(`position[${k.id}]`, {

                            })(
                                <Input placeholder='职位'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem>
                            {getFieldDecorator(`workUnit[${k.id}]`, {

                            })(
                                <Input placeholder='工作单位及部门'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={1}>
                        {index === 0 ? <Icon type='plus' onClick={thia.addVisitors}/> : <Icon type='minus' onClck={()=>{this.removeVisitors(k)}}/>}
                    </Col>
                </Row>
            )
        })
        getFieldDecorator('keys', { initialValue: this.state.company })
        const keys = getFieldValue('keys')
        const formItems = keys.map((k,index)=>{
            return(
                <Row key={k.id}>
                    <Col span={4}>
                        <FormItem>
                            {getFieldDecorator(`country[${k.id}]`, {

                            })(
                                <Input placeholder='国家'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <FormItem>
                            {getFieldDecorator(`area[${k.id}]`, {

                            })(
                                <Input placeholder='地区'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem>
                            {getFieldDecorator(`school[${k.id}]`, {

                            })(
                                <Input placeholder='学校'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <FormItem>
                            {getFieldDecorator(`day[${k.id}]`, {

                            })(
                                <Input placeholder='天数'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={1}>
                        {index === 0 ? <Icon type='plus' onClick={thia.add}/> : <Icon type='minus' onClck={()=>{this.remove(k)}}/>}
                    </Col>
                </Row>
            )
        })
        return (
            <PageHeaderLayout>
                <Card title={'高校基本信息'} bordered={false}>
                    <Form onSubmit={this.handleSubmit}>
                        <Row gutter={24}>
                            <Col span={8}>
                                <FormItem
                                    label="出访起始时间"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('continent', {

                                    })(
                                        <DatePicker/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="出访结束时间"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('country', {

                                    })(
                                       <DatePicker />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="出访人"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('school', {

                                    })(
                                       <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        {formItems}
                        {visitorss}
                        <Row gutter={24}>
                            <Col span={8}>
                                <FormItem
                                    label="学院"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('types', {

                                    })(
                                        <Select>
                                            <Option value="0">国家文化学院</Option>
                                            <Option value="1">国际英语学院</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="职称"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('type', {

                                    })(
                                       <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="性别"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('time', {

                                    })(
                                       <Select>
                                           <Option value={0}>男</Option>
                                           <Option value={1}>女</Option>
                                       </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="学校红头号"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('times', {

                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="省批文件号"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('name', {

                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="经费来源"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('nameq', {

                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="出访目的"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('namew', {

                                    })(
                                        <Select>
                                            <Option value="0">参加国际会议</Option>
                                            <Option value="1">研修访学</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="目的详述"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('a')(
                                        <TextArea rows = {4}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="访问收获"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('a')(
                                        <TextArea rows = {4}/>
                                    )}
                                </FormItem>
                            </Col>

                        </Row>
                        {Inviter}

                    </Form>
                </Card>
            </PageHeaderLayout>
        );
    }
}
