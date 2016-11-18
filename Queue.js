/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TextInput,
    Button,
} from 'react-native';
import request from 'superagent/superagent';
import {Card} from 'react-native-material-design';
import _ from 'underscore';

export default class Queue extends Component {
    // Initialize the hardcoded data
    constructor(props) {
	super(props);
	const ds = new ListView.DataSource({
	    rowHasChanged: (r1, r2) => _.isEqual(r1, r2)
	});
	this.state = {
	    dataSource: ds.cloneWithRows([
	    ]),
	    announcement: null,
	    paused: false,
	    rev: 0,
	    name: '',
	    id: '',
	    question: '',
	    room: '',
	};
    }

    componentDidMount() {
	this.logIn();
	this.loadQueueFromServer();
    }

    handleSubmitQuestion = (question) => {
	request
	    .post(this.props.iQueueUrl)
	    .withCredentials()
	    .accept('json')
	    .send({id: this.state.id,
		   question: this.state.question,
		   name: this.state.name,
		   room: this.state.room,
	    })
	    .end((err, res) => {
		console.log(res);
		if (err) {
		    console.log(err);
		}
	    });
    }

    handleDeleteQuestion = (id) => {
	request
	    .del(this.props.iQueueUrl)
	    .withCredentials()
	    .type('json')
	    .accept('json')
	    .send({id: id})
	    .end((err, res) => {
		if (err) {
		    console.log(err);
		}
	    });
    }

    logIn = () => {
	request
	    .post(this.props.loginUrl)
	    .withCredentials()
	    .accept('json')
	    .send({username: 'tfliu2'})
	    .end((err, res) => {
		if (!err) {
		    this.setState({username: res.body.username});
		}
		else {
		    console.log(err);
		}
	    });
    }

    loadQueueFromServer = () => {
	request
	    .get(this.props.queueUrl)
	    .withCredentials()
	    .query({ rev: 0 })
	    .accept('json')
	    .end(function(err, res) {
		if (!err) {
		    this.setState({
			dataSource: this.state.dataSource
					.cloneWithRows(res.body.queue),
		    });
		}
		setTimeout(this.loadQueueFromServer, 2000);
	    }.bind(this));
    }

    render() {
	return (
	    <View style={{flex: 1, paddingTop: 22}}>
		<ListView
		    dataSource={this.state.dataSource}
		    renderRow={(rowdata) =>
			<Card>
			    <Card.Body><Text>{rowdata.name}</Text></Card.Body>
			    <Card.Actions position="right">
				<Button onPress={() => {this.handleDeleteQuestion(rowdata.id)}}
					title="Delete"
					accessibilityLabel="Delete Question"
				/>
			    </Card.Actions>
			</Card>}
		/>
		<TextInput
		    onChangeText={(text) => this.setState({id: text})}
		    value={this.state.id}
		/>
		<TextInput
		    onChangeText={(text) => this.setState({name: text})}
		    value={this.state.name}
		/>
		<TextInput
		    onChangeText={(text) => this.setState({question: text})}
		    value={this.state.question}
		/>
		<TextInput
		    onChangeText={(text) => this.setState({room: text})}
		    value={this.state.room}
		/>
		<Button onPress={this.handleSubmitQuestion}
			title="Submit"
			accessibilityLabel="Submit Question"
		/>
	    </View>
	);
    }
}
