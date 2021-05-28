// import {Editor, EditorState, RichUtils} from 'draft-js';
// import 'draft-js/dist/Draft.css';
// import { useState } from 'react';

// const Editors = () => {
//     const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);

//     const onChange = (editorState) => setEditorState(editorState);
//     console.log("text", editorState)

//     const _onBoldClick=()=> {
//         onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
//       }

//     return (
//         <>
//             <div style={{maxWidth: '1440px', margin: "0 auto"}}>
//             <h1>hahah</h1>
//             <button onClick={_onBoldClick}>Bold</button>
//                 <Editor editorState={editorState} onChange={onChange} />
//             </div>
//         </>
//     )
// }

// export default Editors;

import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { useHistory } from "react-router";

const Editors = () => {
  const [content, setContent] = useState(() => EditorState.createEmpty());
  const add = (editorState) => {
    setContent(editorState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      content: convertToRaw(content.getCurrentContent()),
    };
    console.log("POST: ", newPost);
    fetch("https://api-internal-beta.kioser.com/v3/dashboard/promo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setContent(EditorState.createEmpty());
      })
      .catch((err) => console.log("ERROR:", err));
  };

  console.log(content);

  return (
    <>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <h1>hahah</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Editor</Form.Label>
            <Editor editorState={content} onEditorStateChange={add} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Editors;
