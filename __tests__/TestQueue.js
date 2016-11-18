import React from 'react';
import {mount, shallow} from 'enzyme';
import Queue '../Queue';
import _ from 'underscore';
import request from 'superagent';

jest.unmock('../Queue');

const props = {
    queueUrl="https://cs233-queue.studentspace.cs.illinois.edu/queue/24"
    iQueueUrl="https://cs233-queue.studentspace.cs.illinois.edu/instructor/queue/24"
    loginUrl="https://cs233-queue.studentspace.cs.illinois.edu/auth"
}

const testResponse = {
    "announcement": null,
    "paused": false,
    "queue": [
        {
	    "answer": false,
	    "id": "user",
	    "name": "sfd",
	    "question": "sa",
	    "room": "sfd"
        },
        {
	    "answer": false,
	    "id": "j9BLKevYeVtUwaX0v9YT6o9KulNKrTLO",
	    "name": "sdflk",
	    "question": "f",
	    "room": "f"
        }
    ],
    "rev": 49,
    "timestamps": [
        1477865410558.0,
        1477865831165.0
    ]
}

describe('requests', () => {
    it('loads queue correctly', () => {
	const queueWrapper = shallow(<Queue {...props}
				     />);
	_.last(request.end.mock.calls)[0](null, testResponse);
	expect(queueWrapper.state().dataSource.length).toBe(2);
    });
})
