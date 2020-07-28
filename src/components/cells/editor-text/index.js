import React from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'; // ES6
import './styles.scss';

export class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: this.props.instructionData, meta: this.props.meta }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.instructionData !== this.props.instructionData) {
            this.setState({ text: nextProps.instructionData })
        }
        if (nextProps.meta !== this.props.meta) {
            this.setState({ meta: nextProps.meta })
        }
    }

    validationSpan = () =>
        !!this.state && !!this.state.meta && !!this.state.meta.touched && !!this.state.meta.error ?
            (<span className="error_msg text-danger">{this.state.meta.error}</span>) : null
    render() {
        return (
            <div className="form-group">
                {this.props.label && <label>{this.props.label}</label>}
                <ReactQuill
                    placeholder={'Type here...'}
                    value={this.state.text}
                    onChange={this.props.onHandle} />
                {this.validationSpan()}
            </div>

        )
    }
}