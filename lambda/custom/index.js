/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const STREAMS = [
  {
    "token": "stream-12",
    "url": "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/black-metal.mp3",
  },
  {
    "token": "stream-12",
    "url": "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/bought-a-new-part.mp3"
  },
  {
    "token": "stream-12",
    "url": "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/challenge-to-a-duel.mp3"
  },
  {
    "token": "stream-12",
    "url":   "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/clamy-feeling.mp3"
  },
  {
    "token": "stream-12",
    "url": "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/futons-instead-of-pews.mp3"
  },
  {
    "token": "stream-12",
    "url": "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/hahaha.mp3"
  },
  {
    "token": "stream-12",
    "url": "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/hot-damn.mp3"
  },
  {
    "token": "stream-12",
    "url": "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/large-can-of-beer.mp3"
  },
  {
    "token": "stream-12",
    "url": "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/pansy-immune-system.mp3"
  },
  {
    "token": "stream-12",
    "url": "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/pessimistic.mp3"
  },
  {
    "token": "stream-12",
    "url": "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/smooth-as-silk.mp3"
  },
  {
    "token": "stream-12",
    "url": "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/upper-football.mp3"
  },
  {
    "token": "stream-12",
    "url": "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/where-you-going.mp3"
  },
  {
    "token": "stream-12",
    "url": "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/wheres-the-buffet.mp3"
  },
  {
    "token": "stream-12",
    "url": "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/who-is-this.mp3"
  },
  {
    "token": "stream-12",
    "url": "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/william-butterfield.mp3"
  }
];

const PlayStreamIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest' ||
        (handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'PlayStreamIntent') ||
        (handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ResumeIntent');
  },
  handle(handlerInput) {

    let steam = STREAMS[Math.floor(Math.random() * clips.length)];

    handlerInput.responseBuilder
      .addAudioPlayerPlayDirective('REPLACE_ALL', stream.url, stream.token, 0, null, stream.metadata);

    return handlerInput.responseBuilder
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'This skill just plays a clip of what Dave said. You can ask what did dave say?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const AboutIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AboutIntent';
  },
  handle(handlerInput) {
    const speechText = 'This is what Dave said';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent');
  },
  handle(handlerInput) {

    handlerInput.responseBuilder
      .addAudioPlayerClearQueueDirective('CLEAR_ALL')
      .addAudioPlayerStopDirective();

    return handlerInput.responseBuilder
      .getResponse();
  },
};

const PlaybackStoppedIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStopped';
  },
  handle(handlerInput) {
    return true;
  },
};

//AudioPlayer.PlaybackStarted
const PlaybackStartedIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStarted';
  },
  handle(handlerInput) {
    handlerInput.responseBuilder
      .addAudioPlayerClearQueueDirective('CLEAR_ENQUEUED');

    return handlerInput.responseBuilder
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder
      .getResponse();
  },
};

//System.ExceptionEncountered
const ExceptionEncounteredRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'System.ExceptionEncountered';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return true;
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .addAudioPlayerClearQueueDirective('CLEAR_ALL')
      .addAudioPlayerStopDirective()
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    PlayStreamIntentHandler,
    PlaybackStartedIntentHandler,
    CancelAndStopIntentHandler,
    PlaybackStoppedIntentHandler,
    AboutIntentHandler,
    HelpIntentHandler,
    ExceptionEncounteredRequestHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
