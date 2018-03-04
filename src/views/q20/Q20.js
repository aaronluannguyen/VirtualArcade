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
        }));
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
                                src="https://00e9e64bacbbf177388b67ddfe6a5d3afbff5f5d826472a8c2-apidata.googleusercontent.com/download/storage/v1/b/info343/o/pickle_rick.jpg?qk=AD5uMEsM9wJhMSSl6JXcprUbDQ4axLI-fKYlCTBRGTS-yF_UhsiWn2n4xbU2yDVFy2R1UpdiUQkR_xkWf15N88YjeEMVOT3yCS1aFaIwK5Ebr7qMKHfJk5h6mvaK7x3ACR94U2yx6EZem2zsiPWGLw7Z13gcrycK5DGEnw8nuEoPBDXwTmeOI4ABVQ_q2gcgOYu5dQiFXrmyjEDrNvZu6HP6VCYOkzO-Yx45jQoMX7-5gm0MD2HtMRMvFUq3yiu-KK8FjarfMtdSW1Wk3V_i_ARL86b4H_u_-uuTkXGU3Z_iVvip4MAB-VYw9m2e3xwL-bHLszoT0yLez7h4FxZo9zXxP8wkTst7ss3qplxc8S_Vo01_lvKkvEkpNIE7BfNQzeOIJPwzfojv7nCmSrOhOU96M_bsUYrU9yihw4MdddrFz_oUBKYRaHNunc3ppFqkhbhG6N4sKJ7Q9K_Iu7lyaXdEZ0kLLmknQtLfNeVPZyuqnRWGDMOes-tou1Lxgu-_9NwDhR8nwudBTdaPNGGkESftHyPYWX-iy91_zmvrVvcDQXyCzhNLKd5ZptZUh4Xg_VHiJeXZW5wSQV9F4vSAWqjAryGZ6Fb4NtGZklkoFP52F50I62whzttwpKGJ06va8-F0rrVQOL3YYsoWQKj9DEIGcWxhh3_SsWpoJD1Y87cvoYKEyWZxVRmNg6Ji3VXgPHrcAAHnAi7oGDNaP4nIAK8CWVuh4vaOjQ" alt="pickle rick"/>
                        </div>
                }
            </div>
        );
    }
}