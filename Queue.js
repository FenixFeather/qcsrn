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
} from 'react-native';
import request from 'superagent/superagent';
import _ from 'underscore';

export default class Queue extends Component {
    // Initialize the hardcoded data
    constructor(props) {
	super(props);
	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	this.state = {
	    dataSource: ds.cloneWithRows([
	    ]),
	    announcement: null,
	    paused: false,
	    rev: 0,
	};
    }

    componentDidMount() {
	this.loadQueueFromServer();
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
					.cloneWithRows(_.pluck(res.body.queue, 'name')),
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
		    renderRow={(rowdata) => <Text>{rowdata}</Text>}
		/>
	    </View>
	);
    }
}
