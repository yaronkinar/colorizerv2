import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../upload.css';
const deepai = require("deepai")
class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.image = React.createRef();
        this.state = {file: '',imagePreviewUrl: '',imageResult:''};
    }

    _handleSubmit= (e) => {
        e.preventDefault();
        console.log(deepai)
        deepai.setApiKey('292a51da-6e6d-41da-9eaa-e8dd12ea0b04');
        const node = this.image.current;
        (async ()=> {
            var resp = await deepai.callStandardApi("colorizer", {
                image: node,
            });
            console.log(resp)

            this.setState({
                imageResult:resp.output_url
            })
         //   $("#container").attr('src', resp.output_url)

        })()
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let {imageResult} = this.state;
        let $imagePreview = null;
        let $imageResultPreview = null;

        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        if(imageResult){
            $imageResultPreview = (<img src={imageResult} />)
        }

        return (
            <div className="previewComponent">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                    <input className="fileInput"
                           type="file"
                           ref={this.image}
                           onChange={(e)=>this._handleImageChange(e)} />
                    <button className="submitButton"
                            type="submit"
                            onClick={(e)=>this._handleSubmit(e)}>Color Image</button>
                </form>
                <Container>
                    <Row className="justify-content-md-center">

                        <Col md="auto">
                            <div className="imgPreview justify-content-md-center" >
                                {$imagePreview}
                            </div>
                            <div className="imgPreview justify-content-md-center" >
                                {$imageResultPreview}
                            </div>
                    </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}
export default ImageUpload