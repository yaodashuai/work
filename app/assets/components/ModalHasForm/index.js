import React,{Component} from 'react'


class ModalHasForm extends Component{
    constructor(props){
      super(props)
    }

    handleValidator = (e, callback) => {
        if (e) e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (callback instanceof Function){
                callback()
            }
        })
    }

    render(){

        return(

                this.props._renderContent

        )
    }
}

export default  ModalHasForm
