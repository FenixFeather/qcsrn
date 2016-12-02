/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import request from 'superagent/superagent';
import Queue from './Queue';
import QDrawer from './QDrawer';
import _ from 'underscore';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
} from 'react-native';

export default class qcsrn extends Component {
    static state = {
	queueId: 24,
	queues: [],
    }

    constructor(props) {
	super(props);
	this.state = {
	    queueId: 24,
	    queues: [],
	};
    }

    componentDidMount() {
	this.loadQueuesFromServer();
	console.log(this.state.queues);
    }

    handleSelectQueue = (queueId) => {
	console.log(queueId);
	this.setState({queueId: queueId});
    }

    loadQueuesFromServer = () => {
	request
	    .get("https://cs233-queue.studentspace.cs.illinois.edu/class/1")
	    .accept('json')
	    .end((err, res) => {
		if (err) {
		    console.log(err);
		}
		else {
		    console.log(res);
		    console.log(res.body);
		    this.setState({queues: res.body});
		}
	    });
    }

    render() {
        return (
	    <View style={{flex: 1}}>
		<Queue queueUrl={`https://cs233-queue.studentspace.cs.illinois.edu/queue/${this.state.queueId}`}
		       iQueueUrl={`https://cs233-queue.studentspace.cs.illinois.edu/instructor/queue/${this.state.queueId}`}
		       loginUrl="https://cs233-queue.studentspace.cs.illinois.edu/auth"
		       queueId={this.state.queueId}
		/>

		<QDrawer onSelectQueue={this.handleSelectQueue}
			 queues={this.state.queues}
			 queueInfoUrl=""
		/>
	    </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('qcsrn', () => qcsrn);
