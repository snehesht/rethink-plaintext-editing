import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import css from './style.css';

function JavascriptEditor({ file, write }) {
  const [fileContent, setFileContent] = React.useState('')
  React.useEffect(() => {
    file.text().then(content => setFileContent(content))
  }, [])
  return (
    <div className={css.editorbase}>
      <Editor
        value={fileContent}
        onValueChange={(fileContent) => {
          const updatedFile = new File([`${fileContent}`], file.name, { type: file.type, lastModified: new Date() })
          write(updatedFile)
          setFileContent(fileContent)
        }}
        highlight={(fileContent) => highlight(fileContent, languages.js)}
        padding={10}
        tabSize={2}
        insertSpaces={true}
        className={css.editor}
      />
    </div>
  );
}

JavascriptEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default JavascriptEditor;
