import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Form,
    Input,
    DatePicker,
    Select,
    Button,
    Card,
    InputNumber,
    Radio,
    Icon,
    Tooltip,
    Switch,
    Row,
    Col,
    Tag,
    Upload,
    Modal,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../University/TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ addNews, loading }) => ({
    addNews,
    loading: loading.models.addNews,
}))
@Form.create()
export default class AddNews extends PureComponent {
    state = {
        isChecked:true,
        tags: ['添加标签'],
        inputVisible: false,
        inputValue: '',
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    }
    handleSubmit = e => {
        e.preventDefault();
        const { form, dispatch } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({
                    type: 'form/submitRegularForm',
                    payload: values,
                });
            }
        });
    };
    checkSwitch = (checked)=>{
        this.setState({isChecked:checked})
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
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    }

    saveInputRef = input => this.input = input


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

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })
    renderUpload =()=>{
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }

    render() {
        const { submitting, form } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        const { isChecked } = this.state

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 }
        };
        const formItemLayouts = {
            labelCol: { span: 1 },
            wrapperCol: { span: 23 }
        };

        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };
        const editorProps = {
            // initialContent:acticleData.content,
            height: 300,
            contentFormat: 'html',
            onChange: this.handleChanges,
            onRawChange: this.handleRawChanges,
            controls:[
                'undo', 'redo', 'split',
                'text-color', 'bold', 'italic', 'underline', 'strike-through',
                'superscript', 'subscript', 'remove-styles', 'emoji', 'text-align', 'split', 'headings', 'list_ul',
                'list_ol', 'blockquote', 'code', 'split', 'link', 'split', 'hr', 'split', 'media', 'clear'
            ]
        }


        return (
            <PageHeaderLayout>
                <Card title={'新闻添加'} bordered={false}>
                    <Form onSubmit={this.handleSubmit} layout={'horizontal'}>
                        <Row gutter={24}  gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={8} sm={24}>
                                <FormItem
                                    label="标题"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('name', {

                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col md={8} sm={24}>
                                <FormItem
                                    label="分类"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('continent', {

                                    })(
                                        <Select>
                                            <Option value="0">选择分类</Option>
                                            <Option value="1">新闻动态</Option>
                                            <Option value="2">通知公告</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col md={8} sm={24}>
                                <FormItem
                                    label="阅读量"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('name', {

                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col md={8} sm={24}>
                                <FormItem
                                    label="时间"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('name', {

                                    })(
                                        <RangePicker />
                                    )}
                                </FormItem>
                            </Col>
                            <Col md={8} sm={24}>
                                <FormItem
                                    label="是否置顶"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('name', {

                                    })(
                                        <Switch checkedChildren="是" unCheckedChildren="否"  onChange = {this.checkSwitch} checked={isChecked}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col md={8} sm={24}>
                                <FormItem
                                    label="简介"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('name', {

                                    })(
                                        <TextArea   rows={4} placeholder={'请输入简介'} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <BraftEditor {...editorProps} />
                        <Row gutter={24}  gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={24} sm={24}>
                                <FormItem
                                    label="标签"
                                    {...formItemLayouts}
                                >
                                    {this.renderTag()}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={24}  gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <Col md={24} sm={24}>
                                <FormItem
                                    label='图片'
                                    {...formItemLayouts}
                                >
                                    {this.renderUpload()}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={24}  gutter={{ md: 8, lg: 24, xl: 48 }}>
                            <div className={styles.submitBtn}>
                                <Button type={'dashed'}>返回</Button>
                                <Button type={'primary'}>保存为草稿</Button>
                                <Button type={'primary'}>确认发布</Button>
                            </div>
                        </Row>
                    </Form>
                </Card>
            </PageHeaderLayout>
        );
    }
}
