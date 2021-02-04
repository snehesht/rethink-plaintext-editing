import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';

import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-markdown';
import "prismjs/themes/prism.css";

import css from './style.css';

function MarkdownEditor({ file, write }) {
  const [fileContent, setFileContent] = React.useState('')
  React.useEffect(() => {
    file.text().then(content => setFileContent(content))
  }, [])
  return (
    <div className={css.editor}>
      <Editor
        value={fileContent}
        onValueChange={(fileContent) => {
          const updatedFile = new File([`${fileContent}`], file.name, { type: file.type, lastModified: new Date() })
          write(updatedFile)
          setFileContent(fileContent)
        }}
        highlight={fileContent => highlight(fileContent, languages.markup, 'markup')}
        padding={12}
        className={css.content}
      />
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
