import React, { Component } from 'react';
import {
  ReactiveBase,
  DataSearch,
  RangeSlider,
  SingleRange,
  SelectedFilters,
  ResultCard,
} from '@appbaseio/reactivesearch';
import './App.css';

class App extends Component {
  render() {
    return (
      <ReactiveBase
        app="n-search-1"
        credentials="oLEuUnUTD:971aff4a-7784-48e8-a362-2afa5930d20f"
      >
        <div className="navbar">
          <div className="logo">
            <img alt="ebay logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/EBay_logo.png/800px-EBay_logo.png"
            width="300" height="90"/>
          </div>
          <DataSearch
            className="datasearch"
            componentId="mainSearch"
            dataField={["Title", "Title.search"]}
            queryFormat="or"
            highlight={true}
            placeholder="Search for items"
            innerClass={{
              "input": "searchbox",
              "list": "suggestionlist"
            }}
            autoSuggest={true} 
            iconPosition="right"
            filterLabel="search"
          />
        </div>
        <div className={"display"}>
          <div className={"leftSidebar"}>
            <SingleRange
              componentId="ratingsFilter"
              dataField="average_rating_rounded"
              title="Filter by rating"
              data={[
                { start: 4, end: 5, label: "★★★★ & up" },
                { start: 3, end: 5, label: "★★★ & up" },
                { start: 2, end: 5, label: "★★ & up" },
                { start: 1, end: 5, label: "★ & up" },
              ]}
              react={{
                and: "mainSearch"
              }}
              filterLabel="Ratings"
            />  
            <RangeSlider
              componentId="semanticFilter"
              dataField="semanticScore"
              title="Filter by semanticScore"
              range={{
                start: 0,
                end: 20
              }}
              rangeLabels={{
                start: "0",
                end: "20"
              }}
              interval={1}
            />
          </div>

          <div className={"rightSidebar"}>
            <p>you may like...</p>
          </div>

          <div className={"mainBar"} >
            <SelectedFilters style={{backgroundColor: '#afafaf'}}/>
            <ResultCard
              componentId="results"
              dataField={["Title", "semanticScore"]}
              react={{
                "and": ["mainSearch", "semanticFilter"]
              }}
              pagination={true}
              size={12}
              onData={(res)=>(
                {
                  "image": res.imageURL,
                  "title": res.Title,
                  "description": "<span style='float:left;'> <b>semanticScore: </b>" + res.semanticScore +"<span style='float:right; margin-right:5px;'><b>Price:</b> " + res.Price,
                  "url": "https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313.TR12.TRC2.A0.H0.Xnike.TRS0&_nkw=" + res.Title + "&_sacat=0"
                }
              )}
              className="result-data"
              innerClass={{
                "image": "result-image",
                "resultStats": "result-stats"
              }}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }
}

export default App;
