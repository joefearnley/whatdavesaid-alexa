'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "";
var SKILL_NAME = 'What Dave Said';

/**
 * Array containing feanrley facts.
 */
var clips = [
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetClip');
    },
    'GetNewClipIntent': function () {
        this.emit('GetClip');
    },
    'GetClip': function () {
        var clip = clips[Math.floor(Math.random() * clips.length)];
        var speechOutput = "Here's what dave said: " + clip;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can ask what dave said, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};