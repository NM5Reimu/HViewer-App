import * as React from 'react'; 
import 'semantic-ui-css/semantic.min.css'
import { Image, Header, Grid, Icon, Rating, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import axios from 'axios';

export class ShowTitles extends React.Component{
    constructor(props){
        super(props)

        this.handleReviewChange = this.handleReviewChange.bind(this);
    }
    
    handleReviewChange(e) {
        this.props.onReviewRequest(e.target.id)
    }

    render(){
        
        const searchInput = this.props.searchInput;
        const selectedTags = this.props.selectedTags;

        // function searchAllTags(searchTags, titleTags){            
        //     let ans = true;
        //     if(searchTags){
        //         searchTags.map((item) => (
        //             ans = ans * titleTags.includes(item)
        //         ))
        //         return ans
        //     }        
        //     else{
        //         return ans
        //     }               
        // }
       
        // //поиск по имени в db
        // const resultArray = searchInput || selectedTags ?
        //     this.props.allTitles.filter(
        //         (item) => item.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 && searchAllTags(selectedTags, item.tags)
        //     ) : this.props.allTitles; 

        const resultArray = this.props.allTitles;

        //вывод отсортированного списка  
        const rows = [...Array(Math.ceil(resultArray.length / 5))];
        const itemRows = rows.map( (row, idx) => resultArray.slice(idx * 5, idx * 5 + 5) );
        const titleRows = itemRows.map((row, idx) => (
            <Grid.Row key={idx}>                    
                {row.map((item, index) => (
                    <Grid.Column textAlign="center" key={index}> 
                        <Link to={`/title`}>
                            <Image src={item.cover_path} onClick={this.handleReviewChange} id={item.id}/>                                
                        </Link>       


                        <h4 style={{marginTop: 15, marginBottom: 5}}>{item.name}</h4>
                        <Rating maxRating={5} size='tiny' clearable defaultRating={item.rating}/>                                               
                    </Grid.Column>
                ))}                                        
            </Grid.Row>
        ));    

        return(
            <div className="SContent">
                <Header as='h2' dividing>
                    <Icon name='user secret' />
                    <Header.Content>
                        Choose your... Waifu!
                        <Header.Subheader>正 正 正 正 正 正 正</Header.Subheader>
                    </Header.Content>
                    
                    <input
                        type='range'
                        min='1'
                        max='6'
                    />
                    
                </Header>

                <Grid columns={5} relaxed padded divided>
                    {titleRows}                                          
                </Grid>
            </div>            
        )
    }
}