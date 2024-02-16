import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Editor() {
  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-2 mb-2">
      <h3 className="text-lg text-trs-blue-light font-normal">Transcription Editor</h3>
            <h3 className="text-sm text-trs-blue font-light">
               Last Saved at 1/19 11:12 am
            </h3>
      </div>
      <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor&nbsp;5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event ) => {
                        console.log( event );
                    } }
                    onBlur={ ( _event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( _event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
    </div>
  )
}
