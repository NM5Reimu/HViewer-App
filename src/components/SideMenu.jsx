import * as React from 'react'; 
import 'semantic-ui-css/semantic.min.css'
import { Button, Image, Menu, Input } from 'semantic-ui-react'
import { Link } from "react-router-dom";

const TAGS = require('./db/hentaiTags.json');

export class SideMenu extends React.Component{
    constructor(props){
        super(props)

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleTagSearchChange = this.handleTagSearchChange.bind(this);
    }

    handleTagSearchChange(e){
        this.props.onTagSearchChange(e.target.value)
    }
      
    handleSearchChange(e) {
        this.props.onSearchChange(e.target.value);
    }

    render(){
        return (
            <div className="SMenu">
                <Menu vertical inverted compact borderless fluid >  
                    <Menu.Item>
                        <Link to="/">
                            <Image src='/src/public/Logo1.png' className="mainLogo" size="small" onClick={this.props.onHome}/>
                        </Link>
                        <h1>HViewer</h1>                            
                    </Menu.Item>   
                    
                    <Menu.Item>
                        <Input placeholder='Search...'
                            inverted
                            value={this.props.searchInput}
                            onChange={this.handleSearchChange}
                         />
                    </Menu.Item>

                    <Button basic='false' color='pink' content='Favorites' icon='heart' size='tiny'/>

                    <Menu.Item>
                        <h4>Tags</h4>    

                        {
                            TAGS.map((item, index) =>(
                                this.props.selectedTags.includes(item) ? 
                                    <Button
                                        compact
                                        active={true}
                                        color='teal' 
                                        size='small' 
                                        key={index}
                                        value={item} 
                                        style={{margin: 3 }}
                                        onClick={this.handleTagSearchChange}
                                        >
                                        {item}
                                    </Button> :                                    
                                
                                    <Button
                                        compact  
                                        basic
                                        toggle 
                                        active={true}
                                        color='grey' 
                                        size='small' 
                                        key={index}
                                        value={item} 
                                        style={{margin: 3 }}
                                        onClick={this.handleTagSearchChange}
                                        >
                                        {item}
                                    </Button>
                            ))
                        }
                    </Menu.Item>      
                </Menu>
            </div>
        )
    }
}