import React from "react";

export default class Q20 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            api_url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBrTO7yPXtCN0iWkxeDKJGdc1ELDWOxs1M',
            questions: 0
        }
    }
    
    handleResponse(response) {
        console.log("getting cloud vision response");
        console.log(response.json());
    }
    render(){
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
        .then(response => this.handleResponse(response));
        return (<h1>Q20 Placeholder</h1>);
    }
}