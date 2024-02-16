import Editor from "./Editor";
import EditorVideo from "./EditorVideo";

export default function EditorComponent() {
  return (
    <div className='nav-container container mt-5'>
      <div className="grid grid-cols-2 gap-4 mt-10">
      <EditorVideo />
      <Editor />
      </div>
    </div>
  )
}
