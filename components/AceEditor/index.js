import dynamic from "next/dynamic";

const AceEditor = dynamic(
  async () => {
    const reactAce = await import("react-ace");

    // prevent warning in console about misspelled props name.
    await import("ace-builds/src-min-noconflict/ext-language_tools");

    // import your theme/mode here. <AceEditor mode="javascript" theme="solarized_dark" />
    await import("ace-builds/src-min-noconflict/mode-javascript");
    await import("ace-builds/src-min-noconflict/mode-markdown");
    await import("ace-builds/src-min-noconflict/theme-solarized_dark");

    // as @Holgrabus commented you can paste these file into your /public folder.
    // You will have to set basePath and setModuleUrl accordingly.
    let ace = require("ace-builds/src-min-noconflict/ace");
    ace.config.set(
      "basePath",
      "https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/"
    );
    ace.config.setModuleUrl(
      "ace/mode/javascript_worker",
      "https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/worker-javascript.js"
    );

    return reactAce;
  },
  {
    ssr: false // react-ace doesn't support server side rendering as it uses the window object.
  }
);

export default AceEditor;