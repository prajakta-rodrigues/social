import React from 'react'

export default class UploadComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    file_changed(ev) {
        let img = ev.target.files[0]
        console.log(img)
        let reader = new FileReader()
        reader.readAsDataURL(img)
        reader.addEventListener('load', () => {
            console.log(reader.result)
        })
    }
    render() {
        return(
            <div className="upload-btn">
                <div className="form-group">
                    <input type="file" 
                        onChange={(ev) => {this.file_changed(ev)}}
                    />
                    <button className="btn btn-primary">Upload</button>
                </div>
            </div>
        )
    }
}