import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6
import EditorToolbar, { formats } from "../EditorToolbar/EditorToolbar";

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

const EditorComponent = (props) => {
  const modules = {
    toolbar: {
      container: `#${props.id}`,
      handlers: {
        undo: undoChange,
        redo: redoChange
      }
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    }
  };
  return (
    <div>
      <EditorToolbar
      id={props.id} />
      <ReactQuill 
        value={props.item}
        placeholder={"Write text here..."}
        modules={modules}
        formats={formats}
        className="rounded mb-10 validate w-full"
        onChange={props.handleItem} />
    </div>
  )
}

export default EditorComponent
