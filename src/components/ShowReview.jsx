import * as React from 'react';
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import { Button, Image, Header, Segment, Grid, Rating, Embed, Dimmer } from 'semantic-ui-react'
import { VideoDimmer } from './VideoDimmer.jsx';


export class ShowReview extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            title: ''
        }
        
        this.handleDimmerChange = this.handleDimmerChange.bind(this);
        this.handleDimmerOf = this.handleDimmerOf.bind(this);
        this.handleVideoDimmerChange = this.handleVideoDimmerChange.bind(this);
        this.handleReviewRequest = this.handleReviewRequest.bind(this);
    } 
    
    handleDimmerChange(e){
        this.props.onDimmerChange(true, e.target.src)
    }

    handleDimmerOf(e){
        this.props.onDimmerChange(false, '')
    }  

    handleVideoDimmerChange(e, path){
        this.props.onVideoDimmerChange(true, path)
    }

    handleReviewRequest(id){
        axios.get(`http://localhost:3000/getTitleById/${id}`)
            .then((response) => {
                this.setState({
                    title: response.data 
                });
            })
            .catch((error) => {
                console.log('Что-то пошло не так, а именно ' + error.message);
            });
    }

    componentDidMount(){
        this.handleReviewRequest(this.props.title);
        console.log("componentDidMount");
    }

    render(){
        if(this.state.title){
            //построчный вывод видео
            const rows = [...Array(Math.ceil((this.state.title.video.length) / 4))];
            const itemRows = rows.map( (row, idx) => this.state.title.video.slice(idx * 4, idx * 4 + 4) );
            const videoRows = itemRows.map((row, idx) => (
                <Grid.Row key={idx}>                    
                    {
                        row.map((item, index) => (                        
                            <Grid.Column key={index}>
                                <Embed
                                    icon='play'
                                    placeholder={item.placeholder}
                                    url={item.video_path}
                                    active={false}
                                    onClick={(e) => this.handleVideoDimmerChange(e, item.video_path)}
                                    style={{boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.5)'}}
                                />
                                <h4>Part {item.part}</h4>
                            </Grid.Column>
                        ))
                    }                                     
                </Grid.Row>
            ));            
            
            return(
                <div className="SReview" key={this.state.title.id}>
                    <Header as='h1' dividing>                
                        <Header.Content>
                            {this.state.title.name}                     
                        </Header.Content>
                    </Header>

                    <Grid columns={2}  padded >
                        <Grid.Row >
                            <Grid.Column width={3}>   
                                <Image  src={this.state.title.cover_path} className="coverImage" />

                                <Segment style={{verticalAlign: 'middle'}}>
                                    <Rating maxRating={5} size='huge' clearable defaultRating={this.state.title.rating} floated='left' style={{paddingTop: 3}}/>
                                    <Button color='pink' content='Favorite' icon='heart' floated='right' size='tiny'/>
                                </Segment> 
                            </Grid.Column>                        

                            <Grid.Column width={13} className="titleInfo">    
                                <Grid columns="2"  stretched>
                                    <Grid.Row >
                                        <Grid.Column width={12}>
                                            <Segment>
                                                <Grid>
                                                    <Grid.Row>
                                                        <Grid.Column width={4}>
                                                            <h4>Studios</h4>
                                                            {this.state.title.titleInfo.studios}
                                                        </Grid.Column>
                                                        <Grid.Column width={4}>
                                                            <h4>Episodes</h4>
                                                            {this.state.title.titleInfo.episodes}
                                                        </Grid.Column>
                                                        <Grid.Column width={4}>
                                                            <h4>Release</h4>
                                                            {this.state.title.titleInfo.release}
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row>
                                                        <Grid.Column width={16} style={{textAlign: 'justify'}}>
                                                            <h4>Description</h4>
                                                            {this.state.title.titleInfo.description}
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>                                            
                                            </Segment>                                 
                                        </Grid.Column>
                                        
                                        <Grid.Column width={4}>
                                            <Segment>
                                                <h4>Tags</h4>
                                                <Button basic color='purple' size='tiny' style={{marginBottom: 3 }}>{this.state.title.titleInfo.studios}</Button>
                                                {
                                                    this.state.title.tags.map((item, index) => (
                                                        <Button basic color='pink' size='tiny' key={index} style={{marginBottom: 3 }}>
                                                            {item}
                                                        </Button>
                                                    ))
                                                }
                                            </Segment>                                                                                                                
                                        </Grid.Column>                                    
                                    </Grid.Row>
                                </Grid>                                                       
                                                    
                                <Segment className="screenZone">
                                    <h4>Screenshots</h4>
                                    <Image.Group size='medium'>                                
                                        {                                          
                                            this.state.title.screenshots_paths.map((item, index) => (
                                                <Image src={item} onClick={this.handleDimmerChange} key={index} className="reviewScreenshots"/>
                                            ))                                                                                                                  
                                        }
                                    </Image.Group>
                                </Segment>                                                    
                            </Grid.Column>                        
                        </Grid.Row>
                                            
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Segment className="videoSegment" raised>
                                    <h4>HentaiWatch</h4>
                                    <Grid columns="4" relaxed padded divided>                     
                                        {videoRows}
                                    </Grid>
                                </Segment>
                            </Grid.Column>                         
                        </Grid.Row>                    
                    </Grid>

                    <Dimmer active={this.props.dimmerActive} onClickOutside={this.handleDimmerOf} page>
                        <Image src={this.props.dimmerContent}/>
                    </Dimmer>

                    <VideoDimmer 
                        active={this.props.videoDimmerActive}
                        videoPath={this.props.videoDimmerContent}
                        onVideoDimmerChange={this.props.onVideoDimmerChange}
                    />
                </div>
            ) 

        }        
        return(
            <Header as='h1' dividing>                
                <Header.Content>
                    <div>Loading</div>                   
                </Header.Content>
            </Header>
        )
    }
}