import * as React from 'react'; 
import ReactDOM from 'react-dom';
import { Switch, Route, Router, Link, HashRouter } from 'react-router-dom';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { SideMenu } from './components/SideMenu.jsx';
import { ShowTitles } from './components/ShowTitles.jsx';
import { ShowReview } from './components/ShowReview.jsx';
import "./styles";

class App extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            titles: [],
            selectedTags: [],
            favorites: false,
            searchInput: '',
            review: '',

            dimmerContent: '',
            dimmerActive: false,

            videoDimmerActive: false,
            videoDimmerContent: '',
        }

        this.getTitlesBySearch = this.getTitlesBySearch.bind(this);

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleReviewRequest = this.handleReviewRequest.bind(this);
        this.handleFavoritesButtonChange = this.handleFavoritesButtonChange.bind(this);


        this.handleDimmerChange = this.handleDimmerChange.bind(this);
        this.handleVideoDimmerChange = this.handleVideoDimmerChange.bind(this);

        this.handleTagSearchChange = this.handleTagSearchChange.bind(this);

        this.handleHome = this.handleHome.bind(this);
    }

    getTitlesBySearch(){
        axios.get(`http://localhost:3000/getSearched/${JSON.stringify({searchField: this.state.searchInput, tags: this.state.selectedTags, favs: this.state.favorites})}`)
            .then((response) => {
                this.setState({
                    titles: response.data
                });
            })
            .catch((error) => {
                console.log('Something went wrong: ' + error.message);
            });
            console.log(`Request:  searchField: ${this.state.searchInput} tags: ${this.state.selectedTags}`);
    }

    handleReviewRequest(title){
        this.setState({
            review: title
        })
    }
    
    handleSearchChange(searchInput){
        this.setState({
            searchInput: searchInput
        })
    }

    handleFavoritesButtonChange(value){
        console.log(value);
        if(value === 'true'){
            this.setState({
                favorites: true
            })
        } else{
            this.setState({
                favorites: false
            })
        }
    }

    handleTagSearchChange(tag){
        let array = this.state.selectedTags.slice();
        if(this.state.selectedTags.includes(tag)){
            let index = array.indexOf(tag);
            if (index > -1) {
                array.splice(index, 1);
                this.setState({
                    selectedTags: array
                })
            }
        } else{
            this.setState({
                selectedTags: [...this.state.selectedTags, tag]
            })
        }
    }

    handleHome(){
        this.setState({
            // selectedTags: [],
            // searchInput: '',
            review: ''
        })
    }

    handleDimmerChange(dimmerActive, dimmerContent){
        this.setState({
            dimmerContent: dimmerContent,
            dimmerActive: dimmerActive
        })
    }

    handleVideoDimmerChange(videoDimmerActive, videoDimmerContent){
        this.setState({
            videoDimmerActive: videoDimmerActive,
            videoDimmerContent: videoDimmerContent
        })
    }

    componentDidUpdate(prevProps, prevState) {
        //debugger;
        
        if(prevState.searchInput !== this.state.searchInput || prevState.selectedTags.length !== this.state.selectedTags.length || 
            prevState.favorites !== this.state.favorites) {
            this.getTitlesBySearch();
            console.log(`Старый поиск: ${prevState.searchInput}`);
            console.log(`Новый поиск: ${this.state.searchInput}`);
            console.log(`-----------------------------------`);
            console.log(`Старая длина: ${prevState.selectedTags.length}`);
            console.log(`Новая длина: ${this.state.selectedTags.length}`);
          
        }
      }

    componentDidMount(){
        this.getTitlesBySearch();
        console.log("componentDidMount()");
    }

    render () {    
        return (
            <div>
                <SideMenu 
                    searchInput={this.state.searchInput}  
                    selectedTags={this.state.selectedTags}   
                    favorites={this.state.favorites}
                    onFavoriteChange={this.handleFavoritesButtonChange}
                    onSearchChange={this.handleSearchChange}
                    onTagSearchChange={this.handleTagSearchChange}
                    onHome={this.handleHome}     
                />

                <Switch>
                    <Route exact path='/' render={(props) => (
                        <ShowTitles 
                            {...props}

                            allTitles={this.state.titles} 
                            searchInput={this.state.searchInput}
                            selectedTags={this.state.selectedTags} 
                            onReviewRequest={this.handleReviewRequest}                                
                        />
                    )}/>

                    <Route path='/title' render={(props) => (
                        <ShowReview 
                            {...props}

                            title={this.state.review}

                            dimmerActive={this.state.dimmerActive}
                            dimmerContent={this.state.dimmerContent}
                            onDimmerChange={this.handleDimmerChange}

                            videoDimmerActive={this.state.videoDimmerActive}
                            videoDimmerContent={this.state.videoDimmerContent}
                            onVideoDimmerChange={this.handleVideoDimmerChange}                          
                        /> 
                    )}/>
                </Switch>
            </div>
        )
    }
}

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
     document.getElementById("root")
);