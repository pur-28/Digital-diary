import "react-quill/dist/quill.snow.css";
import {useState, useRef} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  

  const recognition = useRef(null);

   // Function to start speech recognition
   const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition.current = new SpeechRecognition();

    recognition.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setContent(prevContent => prevContent + transcript); // Append spoken text to the existing content
    };

    recognition.current.start();
  };

  // Function to stop speech recognition
  const stopListening = () => {
    if (recognition.current) {
      recognition.current.stop();
    }
  };
 
  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();

    try {
    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } 
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form onSubmit={createNewPost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
     
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      
      <Editor value={content} onChange={setContent} />

      <button style={{ marginTop: '5px' }} type="button" onClick={startListening}>
        Start Voice Input
      </button>
      <button style={{ marginTop: '5px' }} type="button" onClick={stopListening}>
        Stop Voice Input
      </button>

      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
  );
}