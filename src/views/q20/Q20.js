import React from "react";

export default class Q20 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            api_url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBrTO7yPXtCN0iWkxeDKJGdc1ELDWOxs1M',
            questionNum: 0,
            questionString: "",
            playing: false
        }
    }
    
    componentWillMount() {
        let req = {
            "requests":[
                    {
                    "image": {
                        "source": {
                            "imageUri": "gs://info343/myFace.jpg"
                        }
                    },
                    "features":[
                        {
                        "type":"WEB_DETECTION",
                        "maxResults":20
                        }
                    ]
                }
            ]
        }
        req = JSON.stringify(req);
        fetch(this.state.api_url, {
            body: req,
            method: 'POST'
        })
        .then(response => this.handleResponse(response))
        .then(data => console.log(data.responses[0].webDetection));
    }
    
    handleResponse(response) {
        console.log("getting cloud vision response");
        return response.json();
    }

    render(){
        
        return (
            <div className="container">
                {
                    playing ? 
                        <div className="container picture">
                            <img className="img-fluid" onClick={evt => this.setState({playing: true})}
                                src="gs://info343/myFace.jpg" alt="pickle rick"/>
                        </div> :
                        <div className="container question"> </div>
                }
            </div>
        );
    }
}