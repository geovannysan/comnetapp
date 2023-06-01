import  {useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
export function EditorConvertToHTML () {
  const [content, setContent] = useState('');

  const handleChange = (value) => {
    console.log(value)
    setContent(value);
  };

  return (
    <div style={{  height: '250px' }}>
    <ReactQuill
      placeholder="Escribe aquí..."
      value={content}
      onChange={handleChange}
      
      formats={[
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]}
      style={{ height: '100%' }}
    />
    </div>
  );
}