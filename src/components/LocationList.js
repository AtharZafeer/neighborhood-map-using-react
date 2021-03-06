
import React, {Component} from 'react';
import LocationItem from './LocationItem';

class LocationList extends Component {
    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            'placelocations': '',
            'searchquery': '',
            'suggest': true,
        };

        this.filterLocations = this.filterLocations.bind(this);
        this.toggleSuggestions = this.toggleSuggestions.bind(this);
    }

    /**
     * Filter Locations based on user query
     */
    filterLocations(event) {
        this.props.closeInfoWindow();
        const {value} = event.target;
        var locations = [];
        this.props.alllocations.forEach(function (location) {
            if (location.longname.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                location.marker.setVisible(true);
                locations.push(location);
            } else {
                location.marker.setVisible(false);
            }
        });

        this.setState({
            'placelocations': locations,
            'searchquery': value
        });
    }

    componentWillMount() {
        this.setState({
            'placelocations': this.props.alllocations
        });
    }

    /**
     * Show and hide suggestions
     */
    toggleSuggestions() {
        this.setState({
            'suggest': !this.state.suggest
        });
    }

    /**
     * Render function of LocationList
     */
    render() {
        var locationlist = this.state.placelocations.map(function (listItem, index) {
            return (
                <LocationItem key={index} openInfoWindow={this.props.openInfoWindow.bind(this)} data={listItem}/>
            );
        }, this);

        return (
            <div className="search">
                <input role="search" aria-labelledby="filter" id="search-field" className="search-field" type="text" placeholder="Filter"
                       value={this.state.searchquery} onChange={this.filterLocations}/>
                <ul>
                    {this.state.suggest && locationlist}
                </ul>
                <button className="button" onClick={this.toggleSuggestions}>Show/Hide Suggestions</button>
            </div>
        );
    }
}

export default LocationList;