import React, { Component } from 'react';
import API from '../../util/API';
import List from './List';
import "../SearchWidget/searchbar.css"



class SearchWidget extends Component {
    state = {
        query: '',
        apiReturn: []
    }

    onMouseEnter() {

    }

    fetchData = () => {
        console.log(this.state.query)
        API.search(this.state.query)
            .then(res => {
                console.log(res.data)
                let dataFilter = res.data.filter(el => el.release_dates[el.release_dates.length - 1].date > 1549842737)
                this.setState({ apiReturn: dataFilter });
                console.log(dataFilter)
            })
            .catch(error => { console.log(error) });
    }

    handleInputChange = event => {
        this.setState({ query: event.target.value });
        if (event.target.value.length <= 5) {
            return;
        } else {
            setTimeout(this.fetchData, 300)
        }
    }


    render() {
        return (

            <div className="holderDiv">
                <form>
                    <input className="searchBar"
                        type="text"
                        placeholder="Search"
                        value={this.state.query}
                        onChange={this.handleInputChange}
                    />
                </form>
                <div className="container"
                    style={{
                        position: "absolute",
                        zIndex: "3",
                        width: "70vw",
                        backgroundColor: "white",
                        borderRadius: "5px",
                        border: "black 1px solid"
                    }}
                    >

                    {this.state.apiReturn.map((elem) => <List apiReturn={elem} key={elem.id} />)}

                </div>
            </div>
        )
    }
}

export default SearchWidget
