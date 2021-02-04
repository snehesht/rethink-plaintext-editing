import React from 'react';
import PropTypes from 'prop-types';
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-regex";
import 'prismjs/themes/prism-dark.css';

import css from './style.css';

function JavascriptEditor({ name, file, write }) {
  const [fileContent, setFileContent] = React.useState('')
  const editorRef = React.useRef(null);
  React.useEffect(() => {
    file.text().then(content => setFileContent(content))
  }, [])
  

  return (
    <div className={css.editor}>
      <div className={css.title}>Javascript Editor</div>
      <div className={css.content}>
        <Editor
          value={fileContent}
          textareaId={file.name}
          defaultValue="// Write your code here"
          onValueChange={(fileContent) => {
            const updatedFile = new File([`${fileContent}`], file.name, { type: file.type, lastModified: new Date() })
            write(updatedFile)
            setFileContent(fileContent)
          }}
          highlight={fileContent => highlight(fileContent, languages.js)}
          padding={20}
          tabSize={2}
          insertSpaces={true}
          className={css.content}
          ref={editorRef}
        />
      </div>
    </div>
  );
}

JavascriptEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func,
  name: PropTypes.string,
};

export default JavascriptEditor;
