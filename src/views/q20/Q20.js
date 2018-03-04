import React from "react";

export default class Q20 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            api_url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBrTO7yPXtCN0iWkxeDKJGdc1ELDWOxs1M',
            questions: {},
            webDetectionData: undefined,
            playing: false,
            finalGuess: undefined
        }
    }
    
    componentWillMount() {
        let req = {
            "requests":[
                    {
                    "image": {
                        "source": {
                            "imageUri": "gs://info343/pickle_rick.jpg"
                        }
                    },
                    "features":[
                        {
                        "type":"WEB_DETECTION",
                        "maxResults":20
                        },
                        {
                            "type":"LABEL_DETECTION",
                            "maxResults":20
                        },
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
        // .then(data => console.log(data.responses[0]));
        .then(data => this.setState({
            webDetectionData:data.responses[0].webDetection,
            questions: 
                {
                    questionNum: 0,
                    questionString: "",
                    labelDetectionData:data.responses[0].labelAnnotations
                }
        }))
        .catch(err => this.setState({error: err.message}));
    }
    
    handleResponse(response) {
        console.log("getting cloud vision response");
        return response.json();
    }

    handleStartGame() {
        this.setState({playing: true});
        this.handleAskQuestion();
    }

    handleAskQuestion() {
        let data = this.state.questions.labelDetectionData;
        if (this.state.questions.questionNum >= data.length) {
            this.guessFinalAnswer();
        } else {
            let index = this.state.questions.questionNum;
            let description = data[index].description;
            let currentQuestion = "Does your image have to do anything with " + description + "?";
            // console.log(data);
            // console.log(data.length);
            // console.log(index);
            // console.log(currentQuestion);
            index++;
            this.setState({
                questions:
                    {
                        questionNum:index,
                        questionString:currentQuestion,
                        labelDetectionData:data
                    }
            });
        }
    }

    guessFinalAnswer() {
        let data = this.state.webDetectionData;
        let guess = data.bestGuessLabels[0].label;
        this.setState({finalGuess:guess});
    }

    handleWin() {
        console.log("you won against google");
    }

    handleLose() {
        console.log("you lost against google");
    }

    render(){
        return (
            <div className="container">
                {
                    this.state.error ?
                        <div className="alert alert-danger mt-3">
                            {this.state.error}
                        </div> :
                        undefined
                }
                {
                    this.state.playing ? 
                        <div className="container">
                            {
                                this.state.finalGuess ?
                                <div className="container">
                                    <div>Is your image {this.state.finalGuess}?</div>
                                    <div className="btn-group">
                                        <div className="btn btn-danger" onClick={() => this.handleWin()}>No</div>
                                        <div className="btn btn-success" onClick={() => this.handleLose()}>Yes</div>
                                    </div>
                                </div> :
                                <div className="container">
                                    <div className="container question">{this.state.questions.questionString}</div>
                                    <div className="container yes_no">
                                        <div className="btn-group" onClick={() => this.handleAskQuestion()}>
                                            <div className="btn btn-success">Yes</div>
                                            <div className="btn btn-danger">No</div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div> :
                        <div className="container picture">
                            <img className="img-fluid" onClick={() => this.handleStartGame()}
                                src="https://storage.googleapis.com/info343/pickle_rick.jpg" alt="pickle rick"/>
                        </div>
                }
            </div>
        );
    }
}