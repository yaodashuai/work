import React, { PureComponent  } from 'react';
import {  Button, Form,Input, Select, Tag, Icon } from 'antd';
import styles from './style.less';
import { connect } from 'dva';
const fieldLabels = {
    name: '高校名称',
    country: '所属国家',
    area: '所属地区',
};
const FormItem = Form.Item;
const { Option } = Select
@connect(({ universityList, loading }) => ({
    universityList,
    loading: loading.models.universityList,
}))
@Form.create()
export default class Modals extends PureComponent{
    state={
        visible:false,
        country:[],
        area:[],
        tags: ['计算机科学院'],
        inputVisible: false,
        inputValue: '',
        tag: ['计算机科学院'],
        inputVisibles: false,
        inputValues: '',
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                let { tags, tag } = this.state
                values.colleges  = tags
                values.faculties  = tag
                this.props.dispatch({
                    type:'universityList/createUniversity',
                    payload:values
                })
            }
        });
    };
    componentWillReceiveProps(nextprops){
        if (nextprops.universityList.error) {

        }else {
            if(nextprops.universityList.country){
                let country = nextprops.universityList.country
                this.setState({country})
            }
            if(nextprops.universityList.area){
                let area = nextprops.universityList.area
                this.setState({area})
            }
            if (nextprops.universityList.closed){
                const {form} = this.props
                form.resetFields()
                this.setState({ tags : ['计算机科学院'] })
            }
        }
    }
    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    }

    saveInputRef = input => this.input = input

    handleCloses = (removedTag) => {
        const tag = this.state.tag.filter(tag => tag !== removedTag);
        console.log(tag);
        this.setState({ tag });
    }

    showInputs = () => {
        this.setState({ inputVisibles: true }, () => this.input.focus());
    }

    handleInputChanges = (e) => {
        this.setState({ inputValues: e.target.value });
    }

    handleInputConfirms = () => {
        const state = this.state;
        const inputValues = state.inputValues;
        let tag = state.tag;
        if (inputValues && tag.indexOf(inputValues) === -1) {
            tag = [...tag, inputValues];
        }
        this.setState({
            tag,
            inputVisibles: false,
            inputValues: '',
        });
    }

    saveInputRefs = input => this.input = input
    renderTag =()=>{
        let { tags, inputVisible, inputValue } = this.state;

        return(
            <div>
                {tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                })}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                    >
                        <Icon type="plus" /> add departments
                    </Tag>
                )}
            </div>
        )
    }
    renderTags =()=>{
        let { tag, inputVisibles, inputValues } = this.state;

        return(
            <div>
                {tag.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag key={tag} closable={index !== -1} afterClose={() => this.handleCloses(tag)}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                })}
                {inputVisibles && (
                    <Input
                        ref={this.saveInputRefs}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValues}
                        onChange={this.handleInputChanges}
                        onBlur={this.handleInputConfirms}
                        onPressEnter={this.handleInputConfirms}
                    />
                )}
                {!inputVisibles && (
                    <Tag
                        onClick={this.showInputs}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                    >
                        <Icon type="plus" /> add departments
                    </Tag>
                )}
            </div>
        )
    }
    render(){
        const { getFieldDecorator,  } = this.props.form;
        const { country, area, department } = this.props
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

                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="高校中文名" >
                        {getFieldDecorator('nameZH', {
                            rules: [{ required: true, message: '请输入高校中文名!' }],
                        })(
                            <Input  />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="高校英文名" >
                        {getFieldDecorator('nameEN', {
                            rules: [{ required: true, message: '请输入高校英文名!' }],
                        })(
                            <Input  />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="所属国家" >
                        {getFieldDecorator('countryId',{
                            rules:[{required:true,message:'请输入所属国家'}],
                        })(
                            <Select placeholder="请选择" style={{ width: '100%' }} showSearch  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                {
                                    country.map((item) =>{
                                        return <Option value={item.id} key={item.id} >{item.name}</Option>
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="所属地区" >
                        {getFieldDecorator('administrativeDivisionId',{
                            rules:[{required:true,message:'请选择所属地区'}]
                        })(
                            <Select placeholder="请选择" style={{ width: '100%' }} showSearch  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                {
                                    area.map((item) =>{
                                        return <Option value={item.id} key={item.id} >{item.name}</Option>
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="学校院系" >
                        {this.renderTag()}
                    </FormItem>
                    <FormItem {...formItemLayout} label="学校部门" >
                        {this.renderTags()}
                    </FormItem>
                        <Form.Item className={styles.button}>
                            <Button type="primary" onClick={this.handleSubmit}>
                                确认添加
                            </Button>
                        </Form.Item>

                </Form>

        )
    }
}

