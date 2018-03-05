import React from "react";

export default class Q20 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            api_url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBrTO7yPXtCN0iWkxeDKJGdc1ELDWOxs1M',
            questions: {},
            working: false,
            webDetectionData: undefined,
            playing: false,
            // gameEnd: false,
            finalGuess: undefined
        }
    }

    componentWillReceiveProps() {
        this.props.pC.getGame().getGameInfo().addDataCallback(() => {this.forceUpdate()});
    }
    
    handleResponse(response) {
        console.log("getting cloud vision response");
        return response.json();
    }

    handleStartGame(evt) {
        this.setState({img:evt.target.src});
        let req = {
            "requests":[
                    {
                    "image": {
                        "source": {
                            "imageUri": evt.target.src
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
        this.setState({working: true});
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
        .catch(err => this.setState({error: err.message}))
        .then(() => this.setState({working: false, playing: true}))
        .then(() => this.handleAskQuestion());
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

    handleGameEnd(gameWon) {
        let result = undefined;
        if (gameWon) {
            result = "won";
            this.props.pC.getGame().getGameInfo().updateInfo({
                winnerPlayerId: this.props.pC.getPlayerId()
            });
            this.props.pC.handleUIUpdate();
        } else {
            result = "lost";
            this.props.pC.getGame().getGameInfo().updateInfo({
                winnerPlayerId: undefined
            });            
            this.props.pC.handleUIUpdate();
        }
        // this.setState({
        //     playing: false,
        //     gameEnd: true,
        //     gameOutcome: result
        // })
    }

    // handleNewGame() {
    //     this.setState({
    //         playing: false,
    //         questions: {},
    //         gameEnd: false,
    //         finalGuess: undefined
    //     });
    // }

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
                    this.state.working ?
                        <div className="progress">
                            <div style={{width:'100%'}} className="progress-bar progress-bar-striped progress-bar-animated"></div>
                        </div> :
                        ""
                }
                {
                    this.state.playing && !this.state.working ? 
                        <div className="container">
                            {
                                this.state.finalGuess ?
                                <div className="container">
                                    <div>Is your image {this.state.finalGuess}?</div>
                                    <div className="btn-group">
                                        <div className="btn btn-success" onClick={(evt) => this.handleGameEnd(true)}>No</div>
                                        <div className="btn btn-danger" onClick={(evt) => this.handleGameEnd(false)}>Yes</div>
                                    </div>
                                </div> :
                                <div className="container">
                                    <div className="container question">{this.state.questions.questionString}</div>
                                    <div className="container yes_no">
                                        <div className="btn-group" onClick={() => this.handleAskQuestion()}>
                                            <div className="btn btn-success" value="yes">Yes</div>
                                            <div className="btn btn-danger" value="no">No</div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div> :
                        ""
                }
                {/* {
                    this.state.gameEnd ?
                        <div className="container">
                            <div>You {this.state.gameOutcome}!</div>
                            <h4>Play again?</h4>
                            <div className="btn-group">
                                <div className="btn btn-success" onClick={() => this.handleNewGame()}>Yes</div>
                                <div className="btn btn-danger">No</div>
                            </div>
                        </div> :
                        ""
                } */}
                {
                    !this.state.playing && !this.state.gameEnd && !this.state.working ?
                    <div className="container picture">
                        <img className="img-fluid" onClick={(evt) => this.handleStartGame(evt)}
                            src="https://storage.googleapis.com/info343/pickle_rick.jpg" alt="pickle rick"/>
                    </div> :
                    ""
                }
            </div>
        );
    }
}