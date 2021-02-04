import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';

import css from './style.css';

function PlainTextEditor({ file, write }) {
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
        highlight={(fileContent) => fileContent}
        padding={10}
        tabSize={2}
        insertSpaces={true}
        className={css.content}
      />
    </div>
  );
}

PlainTextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlainTextEditor;
