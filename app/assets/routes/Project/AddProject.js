import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
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

function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
}
@connect(({ addProject, loading }) => ({
    addProject,
    loading: loading.models.addProject,
}))
@Form.create()
export default class AddProject extends React.Component {
    state = {
        hide:false
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

    handleChange = (content) => {
    };
    handleRawChange = (rawContent) => {
        console.log(rawContent)
    };

    render() {
        const { getFieldDecorator } = this.props.form;
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
        const options = [
            { label: '奖学金', value: '奖学金' },
            { label: '助学金', value: '助学金' },
        ];
        const projectOptions = [
            { label: 'BAC认证', value: 'BAC认证' },
            { label: '国内学分', value: '国内学分' },
            { label: '海外学分', value: '海外学分' },
            // { label: '其他认证', value: '其他认证' },
        ];
        const editorProps = {
            height: 150,
            contentFormat: 'html',
            onChange: this.handleChange,
            onRawChange: this.handleRawChange,
            controls:[
                'undo', 'redo', 'split',
                'text-color', 'bold', 'italic', 'underline', 'strike-through',
                'superscript', 'subscript', 'remove-styles', 'emoji', 'text-align', 'split', 'headings', 'list_ul',
                'list_ol', 'blockquote', 'code', 'split', 'link', 'split', 'hr', 'split', 'media', 'clear'
            ]
        }
        return (
            <PageHeaderLayout>
                <Card title={'高校基本信息'} bordered={false}>
                    <Form onSubmit={this.handleSubmit}>
                        <Row gutter={24}>
                            <Col span={8}>
                                <FormItem
                                    label="所在大洲"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('continent', {

                                    })(
                                        <Select>
                                            <Option value="0">亚洲</Option>
                                            <Option value="1">北美洲</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="国家"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('country', {

                                    })(
                                        <Select>
                                            <Option value="0">中国</Option>
                                            <Option value="1">日本</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="学校"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('school', {

                                    })(
                                        <Select>
                                            <Option value="0">西安交通大学</Option>
                                            <Option value="1">陕西师范大学</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="项目类型"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('types', {

                                    })(
                                        <Select>
                                            <Option value="0">交换</Option>
                                            <Option value="1">访问</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="学期分配"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('type', {

                                    })(
                                        <Select>
                                            <Option value="0">春季学期</Option>
                                            <Option value="1">秋季学期</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="项目时间"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('time', {

                                    })(
                                        <RangePicker />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="选择院系"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('times', {

                                    })(
                                        <Select>
                                            <Option value="0">计算机科学院</Option>
                                            <Option value="1">体院</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="项目名称"
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
                                    label="总名额"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('nameq', {

                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="年级"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('namew', {

                                    })(
                                        <Select>
                                            <Option value="0">2018级</Option>
                                            <Option value="1">2017级</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="项目费用"
                                    {...formItemLayout}
                                >

                                        <InputGroup compact>
                                            <Select style={{ width : '30%' }}>
                                                <Option value="人民币">人民币</Option>
                                                <Option value="日元">日元</Option>
                                            </Select>
                                            <Input style={{ width: '50%' }}  />
                                        </InputGroup>

                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="适合人群"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('pepole', {

                                    })(
                                        <Select>
                                            <Option value="0">博士生</Option>
                                            <Option value="1">研究生</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="奖/助学金"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('pepolers', {

                                    })(
                                        <CheckboxGroup options={options}  onChange={onChange} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="项目认证"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('uisjfyd', {

                                    })(
                                        <CheckboxGroup options={projectOptions}  onChange={onChange} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="GPA分数范围"
                                    {...formItemLayout}
                                >
                                        <InputGroup size="large">
                                            <Col span={5}>
                                                <Input />
                                            </Col>
                                            <Col span={8}>
                                                <Input  />
                                            </Col>
                                        </InputGroup>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="上传审核表"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('ffrfrfr', {

                                    })(
                                        <RadioGroup>
                                            <RadioButton value="true">是</RadioButton>
                                            <RadioButton value="false">否</RadioButton>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="出国项目评估报告"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('fkdhfk', {

                                    })(
                                        <RadioGroup>
                                            <RadioButton value="true">是</RadioButton>
                                            <RadioButton value="false">否</RadioButton>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="缴纳保证金"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('fkdhfk', {

                                    })(
                                        <RadioGroup>
                                            <RadioButton value="true">是</RadioButton>
                                            <RadioButton value="false">否</RadioButton>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="百分制平均分"
                                    {...formItemLayout}
                                >

                                        <InputGroup size="large">
                                            <Col span={5}>
                                                <Input  />
                                            </Col>
                                            <Col span={8}>
                                                <Input  />
                                            </Col>
                                        </InputGroup>

                                </FormItem>
                            </Col>
                        </Row>
                        <Card title={'项目目的'} bordered={true}>
                            <BraftEditor {...editorProps}   />
                        </Card>
                        <Card title={'开放专业'} bordered={true}>
                            <BraftEditor {...editorProps}  />
                        </Card>
                        <Card title={'基地高校简介'} bordered={true}>
                            <BraftEditor {...editorProps}  />
                        </Card>
                        <Card title={'选拔要求'} bordered={true}>
                            <BraftEditor {...editorProps}  />
                        </Card>
                        <Card title={'费用描述（选填）'} bordered={true}>
                            <BraftEditor {...editorProps}  />
                        </Card>
                        <Card title={'费用包含（选填）'} bordered={true}>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <FormItem
                                        label="学费"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('continentk', {

                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="材料费"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('continentj', {

                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="项目期间活动费"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('continenth', {

                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="项目期间住宿费"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('continentgg', {

                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="项目期间早餐"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('continentg', {

                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="项目期间午餐"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('continentff', {

                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="项目期间晚餐"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('continendt', {

                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="项目期间交通费"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('continentd', {

                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="生活与数学指导"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('continentaa', {

                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="签证费"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('continenta', {

                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="国际往返机票"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('continentss', {

                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="接送机费用"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('continents', {

                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="保险费"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('continentww', {

                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="参观门票费"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('continent', {

                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="签证指导费"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('continentw', {

                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Card>



                        <Card title={'项目特点'} bordered={true}>
                            <BraftEditor {...editorProps}  />
                        </Card>
                        <Card title={'特别提示'} bordered={true}>
                            <BraftEditor {...editorProps}  />
                        </Card>
                        <Card title={'审核流程'} bordered={true}>
                            <BraftEditor {...editorProps}  />
                        </Card>
                        <Card title={'外语水平要求'} bordered={true}>
                            <BraftEditor {...editorProps}  />
                        </Card>
                        <Card title={'奖学金申请要求'} bordered={true}>
                            <BraftEditor {...editorProps}  />
                        </Card>
                        <Card title={'项目咨询'} bordered={true}>
                            <BraftEditor {...editorProps}  />
                        </Card>
                    </Form>
                </Card>
            </PageHeaderLayout>
        );
    }
}
