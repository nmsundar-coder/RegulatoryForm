import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import {addImmediateRelative,deleteImmediateRelative, updateImmediateRelative} from '../../actions/immediateRelative.js'
import { Table, Input, Button, Popconfirm, Form } from 'antd';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
  state = {
    editing: true,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      
      {
        title: 'Name',
        dataIndex: 'name',
        editable: true
      },
      {
        title: 'Relation',
        dataIndex: 'relation',
        editable: true
      },
      {
        title: 'Permanent Account NO',
        dataIndex: 'pan',
        editable: true
      },
      {
        title: 'Other Govt Id',
        dataIndex: 'otherGovtId',
        editable: true
      },
      {
        title: 'Other Govt Id No',
        dataIndex: 'otherGovtIdNo',
        editable: true
      },
      {
        title: 'Phone No',
        dataIndex: 'phoneNo',
        editable: true
        
      },
      {
        title: 'Mobile No',
        dataIndex: 'mobileNo',
        editable: true
      },
      {
        title: '',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [
        
      ],
      count: 0,
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    this.props.deleteImmediateRelative({ dataSource: dataSource.filter(item => item.key !== key) })
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: '',
      relation: '',
      pan:"",
      otherGovtId:"  ",
      otherGovtIdNo:"   ",
      phoneNo:"  ",
      mobileNo:""
      
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
    console.log("Handle Add")
    console.log(this.state.dataSource)
    console.log([...dataSource, newData])
    this.props.addImmediateRelative([...dataSource, newData])
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    console.log("Handle Save")
    this.setState({ dataSource: newData });

    this.props.updateImmediateRelative({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <table>
          <tr>
          
      <td style={{textAlign:"left",width:"70%"}}>
        <label className="textStyle">Immediate Relatives : </label>
        </td>
        <td style={{textAlign:"left" , paddingLeft:"180px", paddingBottom:"12px", width:"50%"}}>
        <Button onClick={this.handleAdd} type="primary" className="buttonStyle1">
          Add Immediate Relative
        </Button>
        </td>
        </tr>
      </table>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        <table>
      
      <tr>
        <p style={{textAlign:"justify"}}><b>Note: <i> “Immediate Relative” </i></b>means a spouse of a person, and includes parent, sibling, and child of such person or of the spouse, any of whom is either dependent financially on such person, or consults such person in taking decisions relating to trading in securities</p>
      </tr>
        </table>  
      </div>
    );
  }
}

EditableTable.propTypes = {
  addImmediateRelative: PropTypes.func.isRequired,
  updateImmediateRelative: PropTypes.func.isRequired,
  deleteImmediateRelative: PropTypes.func.isRequired,
  immediateRelatives: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  immediateRelatives: state.immediateRelatives.immediateRelatives

});

export default connect(mapStateToProps, { addImmediateRelative , deleteImmediateRelative, updateImmediateRelative })(EditableTable);

          