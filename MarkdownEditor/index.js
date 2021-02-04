import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';

import css from './style.css';

function MarkdownEditor({ file, write }) {
  const [fileContent, setFileContent] = React.useState('')
  React.useEffect(() => {
    file.text().then(content => setFileContent(content))
  }, [])
  return (
    <div className={css.editor}>
      <div className={css.title}> Markdown Editor</div>
      <div className={css.content}>
        <Editor
          value={fileContent}
          onValueChange={(fileContent) => {
            const updatedFile = new File([`${fileContent}`], file.name, { type: file.type, lastModified: new Date() })
            write(updatedFile)
            setFileContent(fileContent)
          }}
          highlight={fileContent => fileContent}
          padding={20}
          tabSize={4}
          insertSpaces={false}
          className={css.content}
        />
      </div>
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
