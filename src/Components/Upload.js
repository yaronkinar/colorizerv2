import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import BeforeAfterSlider from 'react-before-after-slider'
import Spinner from "react-bootstrap/Spinner";
import '../upload.css';
const deepai = require("deepai")
class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.image = React.createRef();
        this.state = {file: '',imagePreviewUrl: '',imageResult:'',loading:false};
    }

    _handleSubmit= (e) => {
        e.preventDefault();
        console.log(deepai)
        deepai.setApiKey('292a51da-6e6d-41da-9eaa-e8dd12ea0b04');
        const node = this.image.current;
        (async ()=> {

            this.setState({
                loading:true
            })
            var resp = await deepai.callStandardApi("colorizer", {
                image: node,
            });
            console.log(resp)

            this.setState({
                imageResult:resp.output_url,
                loading:false
            })
         //   $("#container").attr('src', resp.output_url)

        })()
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }
    toonify= (e) => {
        e.preventDefault();
        console.log(deepai)
        deepai.setApiKey('292a51da-6e6d-41da-9eaa-e8dd12ea0b04');
        const node = this.image.current;
        (async ()=> {

            this.setState({
                loading:true
            })
            var resp = await deepai.callStandardApi("toonify", {
                image: node,
            });
            console.log(resp)

            this.setState({
                imageResult:resp.output_url,
                loading:false
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
        let {loading} = this.state;
        let $imagePreview = null;
        let $imageResultPreview = null;
        let link = null;
        let before = imagePreviewUrl;
        let after = imageResult
        // eslint-disable-next-line no-unused-vars
        let beaforAfter = null
        if (imagePreviewUrl) {
            $imagePreview = (<Image fluid src={imagePreviewUrl} />);
            beaforAfter = (<BeforeAfterSlider
                before={before}
                after={after}
                width={640}
                height={480}
            />)
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        if(imageResult){
            $imageResultPreview = (<Image fluid src={imageResult} />)
            link = (<a href={imageResult} download>Open Image</a>)

        }
        if(loading){
            $imageResultPreview = (<Spinner animation="border" />)
        }


        return (
            <div className="previewComponent">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                    <input className="fileInput"
                           type="file"
                           ref={this.image}
                           onChange={(e)=>this._handleImageChange(e)} />

{/*
                    <Button as="input" size="sm"  type="submit" disabled={!this.state.imagePreviewUrl}  value="{loading ? 'Loading…' : 'Color Image'} " onClick={(e)=>this._handleSubmit(e)}/>
*/}
                    <Button
                        variant="primary"
                        disabled={!this.state.imagePreviewUrl}
                        onClick={!loading ? (e)=>this._handleSubmit(e) : null}
                    >
                        {loading ? 'Loading…' : 'Color Image'}
                    </Button>
                    <Button className="ml-1"
                        variant="secondary"
                        disabled={!this.state.imagePreviewUrl}
                        onClick={!loading ? (e)=>this.toonify(e) : null}
                    >
                        {loading ? 'Loading…' : 'toonify'}
                    </Button>
                   {/* <button className="submitButton"
                            type="submit"
                            onClick={(e)=>this._handleSubmit(e)}>Color Image</button>*/}

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
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            {link}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                           {/* <BeforeAfterSlider
                                before={before}
                                after={after}
                                width={640}
                                height={480}
                            />*/}
                        </Col>
                    </Row>

                </Container>

            </div>
        )
    }
}
export default ImageUpload