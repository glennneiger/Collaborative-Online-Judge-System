const redisClient = require('../modules/redisClient');
const TIMEOUT_IN_SECONDS = 3600;

module.exports = function (io) {
    const socketIdToSessionId = {};
    const collaborations = {};
    const sessionPath = '/ojserver/'; // for redis

    io.on('connection', (socket) => {
        const sessionId = socket.handshake.query['sessionId'];
        socketIdToSessionId[socket.id] = sessionId;
        
        if (sessionId in collaborations) {
            // if there are some people working on this problem
            collaborations[sessionId]['participants'].push(socket.id);
        } else {
            redisClient.get(sessionPath + sessionId, function (data) {
                if (data) {
                    console.log('session terminated previously, pulling back.....');
                    collaborations[sessionId]= {
                        'cachedInstructions': JSON.parse(data),
                        'participants': []
                    };
                } else {
                    // you are the first one ever
                    console.log('Nobody did this before, creating new session');
                    collaborations[sessionId]= {
                        'cachedInstructions': [],
                        'participants': []
                    };
                }
                collaborations[sessionId]['participants'].push(socket.id);
            });
        }

        // event listeners 
        socket.on('change', delta => {
            console.log('change ' + socketIdToSessionId[socket.id] + ' ' + delta);
            const sessionId = socketIdToSessionId[socket.id];
            if (sessionId in collaborations) {
                collaborations[sessionId]['cachedInstructions'].push(
                    ['change', delta, Date.now()]
                );
            }
            forwardEvent(socket.id, 'change', delta);
        });

        socket.on('cursorMove', (cursor) => {
            console.log('change ' + socketIdToSessionId[socket.id] + ' ' + cursor);
            cursor = JSON.parse(cursor);
            cursor['socketId'] = socket.id;
            forwardEvent(socket.id, 'cursorMove', JSON.stringify(cursor));
        });
 
        socket.on('restoreBuffer', () => {
            const sessionId = socketIdToSessionId[socket.id];
            if (sessionId in collaborations) {
                const cachedInstructions = collaborations[sessionId]['cachedInstructions'];
                for (let ins of cachedInstructions) {
                    socket.emit(ins[0], ins[1]);
                }
            } else {
                console.log('WARNING');
            }
        });

        socket.on('disconnect', () => {
            const sessionId = socketIdToSessionId[socket.id];

            let foundAndRemove = false;
            if (sessionId in collaborations) {
                const participants = collaborations[sessionId]['participants'];
                const index = participants.indexOf(socket.id);
                if (index >= 0) {
                    participants.splice(index, 1);
                    foundAndRemove = true;

                    // check if it is the last one leaved, if so, store data into redis
                    if (participants.length === 0) { 
                        const key = sessionPath + sessionId;
                        const value = JSON.stringify(collaborations[sessionId]['cachedInstructions']);

                        redisClient.set(key, value, redisClient.redisPrint);
                        redisClient.expire(key, TIMEOUT_IN_SECONDS);
                        delete collaborations[sessionId];
                    }
                }
            } else {
                console.log('sessionId is not exist, no need to disconnect');
            }

            if (!foundAndRemove) {
                console.log('error');
            }
        })
    });

    const forwardEvent = function (socketId, eventName, dataString) {
        const sessionId = socketIdToSessionId[socketId];
        if (sessionId in collaborations) {
            const participants = collaborations[sessionId]['participants'];
            for (let participant of participants) {
                if (socketId != participant) {
                    io.to(participant).emit(eventName, dataString);
                }
            }
        } else {
            console.log('You have a bug');
        }
    }
}