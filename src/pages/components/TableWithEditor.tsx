import { Button, Input, InputNumber, Modal, Table } from 'antd';
import ProForm, { ProFormList } from '@ant-design/pro-form'
import React, { useState } from 'react';
import { FormLayout } from "antd/es/form/Form";
import { FormLabelAlign } from "antd/es/form/interface";

// 让ProForm支持水平布局 并对齐label
const formItemLayout = {
  layout: 'horizontal' as FormLayout,
  labelAlign: 'right' as FormLabelAlign,
  labelCol: {
    xs: { span: 10 },
    sm: { span: 14 },
  },
  wrapperCol: {
    xs: { span: 10 },
    sm: { span: 14 },
  },
};

const tableDataSource = [...Array(5).keys()].map(personItem => {
  const personIndex = personItem + 1;
  return {
    name: `person-${personIndex}`,
    age: personIndex,
    money: personIndex,
    books: [...Array(3).keys()].map(bookItem => {
      const bookIndex = bookItem + 1;
      return {
        bookName: `book-${personIndex}-${bookIndex}`,
        bookAmount: personIndex * bookIndex,
        bookPrice: personIndex * bookIndex,
      };
    }),
  };
});

const BookFormPart = ({ name }: { name: any }) => {
  return <>
    <ProForm.Item {...formItemLayout} name={'bookName'} label={'书名'}>
      <Input></Input>
    </ProForm.Item>
    <ProForm.Item {...formItemLayout} name={'bookAmount'} label={'数量'}>
      <InputNumber></InputNumber>
    </ProForm.Item>
    <ProForm.Item {...formItemLayout} name={'bookPrice'} label={'价格'}>
      <InputNumber></InputNumber>
    </ProForm.Item>
  </>;
};


const LineDataForm = ({ currentId }) => {
  return <ProForm
    {...formItemLayout}
    onFinish={(values) => {
      console.log('onFinish:values:', values)
      return Promise.resolve()
    }}
    params={{
      currentId
    }}
    request={(params) => {
      console.log('params:', params)
      return Promise.resolve(tableDataSource.find((item) => {
        return item.name === params.currentId
      }))
    }}
  >
    <ProForm.Item {...formItemLayout} name={'name'} label={'姓名'}>
      <Input></Input>
    </ProForm.Item>
    <ProForm.Item {...formItemLayout} name={'age'} label={'年龄'}>
      <InputNumber></InputNumber>
    </ProForm.Item>
    <ProForm.Item {...formItemLayout} name={'money'} label={'资金'}>
      <InputNumber></InputNumber>
    </ProForm.Item>
    <ProFormList name={'books'}>
      {
        (field) => {
          return <BookFormPart key={field.fieldKey} {...field}></BookFormPart>;
        }
      }
    </ProFormList>
  </ProForm>;
};

const TableWithEditor = () => {
  const [currentId, setCurrentId] = useState('')
  const [showEditor, setShowEditor] = useState(false);
  const tableColumns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '资金',
    dataIndex: 'money',
    key: 'money',
  }, {
    title: '操作',
    render: (text: any, record: any) => {
      // @ts-ignore
      return <Button onClick={() => {
        console.log('currentData:', record)
        // 要先把form搞出来才行
        setShowEditor(true);
        setCurrentId(record.name)

      }}>编辑</Button>;
    },
  }];

  return <>
    <Table dataSource={tableDataSource} columns={tableColumns} rowKey={'name'}></Table>
    <Modal title={'行编辑'} visible={showEditor} onCancel={() => {
      setShowEditor(false);
    }}>
      <LineDataForm currentId={currentId}></LineDataForm>
    </Modal>
  </>;
};

export default TableWithEditor;
