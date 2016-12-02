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
import {Card, Drawer, Divider} from 'react-native-material-design';
import _ from 'underscore';

export default class QDrawer extends Component {
    constructor(props) {
	super(props);
	const ds = new ListView.DataSource({
	    rowHasChanged: (r1, r2) => _.isEqual(r1, r2)
	});
	this.state = {
	    queues: [],
	};
    }

    componentDidMount() {
	console.log(this.generateQueueList());
    }

    shouldComponentUpdate(nextProps, nextState) {
	return nextProps.queues != this.props.queues;
    }

    generateQueueList = () => {
	console.log(this.props.queues);
	return (_.map(_.keys(this.props.queues), (key) => {
	    return {
		/* icon: 'home',*/
		value: this.props.queues[key],
		active: true,
		onPress: () => {this.props.onSelectQueue(key)},
	    };
	}));
    }

    render() {
	return (
	    <Drawer theme='light'>
		<Drawer.Section
		    title="Queues"
		    items={this.generateQueueList()}
		/>

		<Divider style={{ marginTop: 8 }} />
	    </Drawer>

	);
    }

}
