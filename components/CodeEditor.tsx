import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

const CodeEditor = ({ generatedCode }: { generatedCode: string }) => {
// State to store code input by the user
const [code, setCode] = useState<string>(generatedCode);

// Handle the change of code in the editor
const handleCodeChange = (value: string) => {
    setCode(value);
};


const resetCode = () => {
    setCode(generatedCode);
};



// Function to copy the code to the clipboard
const copyCode = () => {
    navigator.clipboard.writeText(code).then(
    () => alert('Code copied to clipboard!'),
    () => alert('Failed to copy code!')
    );
};

return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-full mx-auto">
    <h2 className="text-white text-xl text-center mb-4">Code Editor</h2>
    <CodeMirror
        value={code}  // Current code (can be from state or generated)
        height="400px"
        extensions={[javascript()]}  // Enable JavaScript syntax highlighting
        theme={oneDark}  // Dark theme
        onChange={(value) => handleCodeChange(value)}  // Handle user code changes
        basicSetup={{
        lineNumbers: true,  // Show line numbers
        highlightActiveLine: true,  // Highlight the active line
        }}
        style={{
        borderRadius: '8px',
        fontFamily: 'Monaco, monospace',
        fontSize: '16px',
        lineHeight: '1.5',
        cursor: 'text', // Custom cursor style
        }}
    />
    <div className="mt-4 flex space-x-4">
        <button
            onClick={resetCode}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
            Reset Code
        </button>
        <button
            onClick={copyCode}
            className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none"
        >
            Copy Code
        </button>
    </div>
    </div>
);
};

export default CodeEditor;
