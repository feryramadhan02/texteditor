import { useState } from "react";
import axios from "axios";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { Form, Input, Button, Checkbox } from "antd";

const CkEditors = () => {
  const [content, setContent] = useState("");
  const [input, setInput] = useState({
    content: "",
  });

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onChangeData = (e, editor) => {
    const value = editor.getData();
    setContent(value);
    setInput({
      ...input,
      content: value,
    });
    console.log({ editor, content, value });
  };

  const handleChange = (changeEvent) => {
    const data = changeEvent.target.value;
    setContent(data);
  };

  const send = (values) => {
    let tes = { ...values, ...input };
    axios({
      method: "post",
      url: "https://api-internal-beta.kioser.com/v3/dashboard/promo/",
      data: tes,
    });
    console.log(tes);
  };

  return (
    <div className="App">
      <h2>Using CKEditor 5 build in React</h2>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={send}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <CKEditor
          // config={{
          //   toolbar: [
          //     "heading",
          //     "|",
          //     "bold",
          //     "italic",
          //     "link",
          //     "bulletedList",
          //     "numberedList",
          //     "blockQuote",
          //     "insertimage",
          //     "alignment",
          //   ],
          // }}
          editor={ClassicEditor}
          data={content}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={onChangeData}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <label>
        Change value:
        <textarea value={content} onChange={handleChange} />
      </label>
      {/* <Button variant="primary" type="submit" onClick={send}>
        Submit
      </Button> */}
    </div>
  );
};

export default CkEditors;
