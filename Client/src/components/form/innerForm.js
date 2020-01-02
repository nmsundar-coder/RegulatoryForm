import React from "react";
import "antd/dist/antd.css";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {saveAnnualDisclosure} from '../../actions/annualDisclosure'
import { createNotification } from "../../utils/helpers";
import lang from "../../langs";


import {
  Form,
  Input,
  Icon,
  Select,
  Checkbox,
  Button
} from "antd";
import EditableTable from "./EditableContext";
import OtherPerson from "./OtherPerson";

const { Option } = Select;
let id = 0;
let id1 = 0;


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(values.agreement===true){
          values.immediateRelatives= this.props.immediateRelatives
          values.otherPersons= this.props.otherPersons
          values.mobileNumber = values.prefix+' '+values.mobileNumber;
          this.props.saveAnnualDisclosure(values)
          createNotification("success", lang("formsubmitted"));
          this.props.history.push("/innerform");

          
        }else{
          alert("Please select the declaration before submitting the form")
        }
        
        
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  remove1 = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys1 = form.getFieldValue("keys1");
    // We need at least one passenger
    if (keys1.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys1: keys1.filter(key => key !== k)
    });
  };

  add1 = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys1");
    const nextKeys = keys.concat(id1++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys1: nextKeys
    });
  };



  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;


    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 10 },
        sm: { span: 10 }
      }
    };
    const formItemLayoutTable = {
      labelCol: {
        xs: { span: 100 },
        sm: { span:100 }
      },
      wrapperCol: {
        xs: { span: 100 },
        sm: { span: 100}
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 10,
          offset: 0
        },
        sm: {
          span: 10,
          offset: 8
        }
      }
    };
    const tailFormItemLayout1 = {
      wrapperCol: {
        xs: {
          span: 100,
          offset: 0
        },
        sm: {
          span: 100,
          offset: 2
        }
      }
    };
    
    const formItemLayoutDynamic = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    const formItemLayoutWithOutLabelDynamic = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "+91"
    })(
      <Select style={{ width: 70 }}>
        <Option value="+91">+91</Option>
      </Select>
    );
    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0
          ? formItemLayoutDynamic
          : formItemLayoutWithOutLabelDynamic)}
        label={index === 0 ? "Employer" : ""}
        required={false}
        key={k}
      >
        {getFieldDecorator(`employers[${k}]`, {
          validateTrigger: ["onChange", "onBlur"],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input Employer's name or delete this field."
            }
          ]
        })(
          <Input
            placeholder="Employer Name"
            style={{ width: "60%", marginRight: 8 }}
          />
        )}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));

    getFieldDecorator("keys1", { initialValue: [] });
    const keys1 = getFieldValue("keys1");
    const formItems1 = keys1.map((k, index) => (
      <Form.Item
        {...(index === 0
          ? formItemLayoutDynamic
          : formItemLayoutWithOutLabelDynamic)}
        label={index === 0 ? "Educational Institutes" : ""}
        required={false}
        key={k}
      >
        {getFieldDecorator(`educationalInstitutes[${k}]`, {
          validateTrigger: ["onChange", "onBlur"],
          rules: [
            {
              required: true,
              whitespace: true,
              message:
                "Please input Eductional Institute's name or delete this field."
            }
          ]
        })(
          <Input
            placeholder="Educational Institute Name"
            style={{ width: "60%", marginRight: 8 }}
          />
        )}
        {keys1.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove1(k)}
          />
        ) : null}
      </Form.Item>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} layout="vertical">
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input your Name"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Designation">
          {getFieldDecorator("designation", {
            rules: [
              {
                required: true,
                message: "Please input your Designation"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Director Identification No	">
          {getFieldDecorator("directorIdentificationNo", {})(<Input />)}
        </Form.Item>
        <Form.Item label="Permanent Account No ">
          {getFieldDecorator("pan", {
            rules: [
              {
                required: true,
                message: "Please input your Permanent Account No"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Other Govt Id">
          {getFieldDecorator("otherGovtId", {
            rules: [
              {
                required: false,
                message: "Please input your Permanent Account No"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Other Govt Id No">
          {getFieldDecorator("otherGovtIdNo", {
            rules: [
              {
                required: false,
                message: "Please input your Permanent Account No"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="DP ID / Client ID ">
          {getFieldDecorator("clientId", {})(<Input />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator("phoneNumber", {
            rules: []
          })(<Input style={{ width: "100%" }} />)}
        </Form.Item>
        <Form.Item label="Mobile Number">
          {getFieldDecorator("mobileNumber", {
            rules: [
              { required: true, message: "Please input your Mobile number!" }
            ]
          })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
        </Form.Item>
        <label style={{padding:"10px"}}>List of Past Employers </label>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabelDynamic}>
          <Button onClick={this.add} style={{ width: "30%" }}>
            <Icon type="plus" /> Add Employer
          </Button>
        </Form.Item>
        <label style={{padding:"10px"}}>
          Name of educational Institution from where I graduated :
        </label>
        {formItems1}
        <Form.Item {...formItemLayoutWithOutLabelDynamic}>
          <Button onClick={this.add1} style={{ width: "30%" }}>
            <Icon type="plus" /> Add Educational Institue
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayoutTable}> 
        <EditableTable></EditableTable>
        </Form.Item>
        <Form.Item {...formItemLayoutTable}> 
        <OtherPerson></OtherPerson>
        </Form.Item>
        <Form.Item {...tailFormItemLayout1}>
          {getFieldDecorator("agreement", {
            valuePropName: "checked"
          })(
            <Checkbox className="declarationStyle">
              I declare that above details are true, correct and complete in all
              respect.
            </Checkbox>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);


WrappedRegistrationForm.propTypes = {
  otherPersons: PropTypes.array.isRequired,
  immediateRelatives: PropTypes.array.isRequired,
  saveAnnualDisclosure: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  otherPersons: state.otherPersons.otherPersons,
  immediateRelatives: state.immediateRelatives.immediateRelatives
});

export default connect(mapStateToProps, {saveAnnualDisclosure  })(WrappedRegistrationForm);


