import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from '../AceEditor'
import css from './style.css';

function MarkdownEditor({ file, write }) {
  const [fileContent, setFileContent] = React.useState('')
  const editorRef = React.useRef(null);
  React.useEffect(() => {
    file.text().then(content => setFileContent(content))
  }, [])


  return (
    <div className={css.editor}>
      <div className={css.title}>Markdown Editor</div>
      <div className={css.content}>
        <AceEditor
          placeholder="Code Editor"
          mode="md"
          theme="github"
          name="js-editor"
          onChange={(fileContent) => {
            const updatedFile = new File([`${fileContent}`], file.name, { type: file.type, lastModified: new Date() })
            write(updatedFile)
            setFileContent(fileContent)
          }}
          wrapEnabled={true}
          fontSize={16}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={fileContent}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
          editorProps={{ $blockScrolling: true }}
          style={{
            minWidth: '100%',
            minHeight: '90vh',
          }}
        />
      </div>
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func,
};

export default MarkdownEditor;
