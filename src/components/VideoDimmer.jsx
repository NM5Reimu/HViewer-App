import * as React from 'react'; 
import 'semantic-ui-css/semantic.min.css'
import { Dimmer } from 'semantic-ui-react'

export class VideoDimmer extends React.Component {
    constructor(props){
        super(props)

        this.handleVideoDimmerOff = this.handleVideoDimmerOff.bind(this)
    } 
    
    handleVideoDimmerOff(e){
        this.props.onVideoDimmerChange(false, '')
    }
    

    render(){
        return(
            <Dimmer active={this.props.active}  onClickOutside={this.handleVideoDimmerOff} page >                    
                <video autoPlay='autoplay' width="1280" height="720" controls="controls" className="dimmerPlayer">
                    <source src={this.props.videoPath} type='video/mp4' />
                </video>
                {/* <h4>{this.props.name} - {this.props.part}</h4> */}
            </Dimmer>
        )
    }
}