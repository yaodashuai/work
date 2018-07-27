import React, { PureComponent  } from 'react';
import {  Button, Form,  Col, Row,Input,Select, Tag, Icon } from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
const { Option } = Select;
@connect(({ universityInfo, loading }) => ({
    universityInfo,
    loading: loading.models.universityInfo,
}))
@Form.create()
export default class TopForm extends PureComponent{
    state={
        country:[],
        area:[],
        universityData:{},
        tags: [],
        inputVisible: false,
        inputValue: '',
        department:[],
        tag: [],
        inputVisibles: false,
        inputValues: '',
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                const { tags, tag } = this.state
                values.colleges  = tags
                values.faculties  = tag
                values.nameEN = values.nameEN || ''
                const { id } = this.props
                values.universityId = id
                this.props.dispatch({
                    type:'universityInfo/editUniversityInfo',
                    payload:values
                })
            }
        });
    };
    componentWillReceiveProps(nextprops){
        if (nextprops.universityInfo.error) {

        }else {
            if(nextprops.universityInfo.country){
                let country = nextprops.universityInfo.country
                this.setState({country})
            }
            if(nextprops.universityInfo.area){
                let area = nextprops.universityInfo.area
                this.setState({area})
            }
            if(nextprops.universityInfo.universityData){
                let universityData = nextprops.universityInfo.universityData
                this.setState({ universityData })
            }
            if(nextprops.universityInfo.department){
                let tags = [];
                let tag = [];
                let data = nextprops.universityInfo.department || []
                data.forEach( (item) => {
                    if (item.type === 'COLLEGE' ){

                        tags.push(item.name)
                    }
                });
                data.forEach( (item) => {
                    if (item.type === 'FACULTY' ){
                        tag.push(item.name)
                    }
                })
                this.setState({ tags, tag })
            }
        }
    }
    renderTag =()=>{
        let { tags, inputVisible, inputValue } = this.state;

        return(
            <div>
                {(tags || [] ).map((tag, index) => {
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
                        <Icon type="plus" /> add department
                    </Tag>
                )}
            </div>
        )
    }
    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
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
    renderTags =()=>{
        let { tag, inputVisibles, inputValues } = this.state;

        return(
            <div>
                {(tag || [] ).map((tag, index) => {
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
    render(){
        const { getFieldDecorator,  } = this.props.form;
        const { country, area, universityData } = this.state
        return(
            <Form onSubmit={this.handleSubmit}>
                <Row gutter={24}>
                    <Col span={6} >
                        <FormItem label="高校中文名" >
                            {getFieldDecorator('nameZH',{
                                initialValue:universityData && universityData.nameZH,
                                rules:[ {require:true, message:'请输入高校中文名'}]
                            })(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col span={6} >
                        <FormItem label="高校英文名称" >
                            {getFieldDecorator('nameEN',{
                                initialValue:universityData && universityData.nameEN
                            })(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="所属国家">
                            {getFieldDecorator('countryId',{
                                rules:[{required:true,message:'请输入所属国家'}],
                                initialValue:universityData && universityData.country && universityData.country.id
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
                    </Col>
                    <Col span={6}>
                        <FormItem label="所属地区" >
                            {getFieldDecorator('administrativeDivisionId',{
                                rules:[{ required:true,message:'请输入所属地区' }],
                                initialValue:universityData && universityData.administrativeDivision && universityData.administrativeDivision.id
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
                    </Col>
                    <Col span={24} >
                        <FormItem label="高校院系" >
                            {this.renderTag()}
                        </FormItem>
                    </Col>
                    <Col span={24} >
                        <FormItem label="高校部门" >
                            {this.renderTags()}
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span={24} style={{ textAlign: 'right' }}>
                      <Button type="primary" onClick={ (e) =>{ this.handleSubmit(e) }}>
                        修改
                      </Button>
                    </Col>
                </Row>
            </Form>

        )
    }
}

