"use strict";
const Alexa = require("alexa-sdk");

const appId = process.end.appId;
const skillName = process.end.skillName;

const clips = [
  "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/black-metal.mp3",
  "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/bought-a-new-part.mp3",
  "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/challenge-to-a-duel.mp3",
  "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/clamy-feeling.mp3",
  "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/futons-instead-of-pews.mp3",
  "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/hahaha.mp3",
  "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/hot-damn.mp3",
  "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/large-can-of-beer.mp3",
  "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/pansy-immune-system.mp3",
  "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/pessimistic.mp3",
  "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/smooth-as-silk.mp3",
  "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/upper-football.mp3",
  "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/where-you-going.mp3",
  "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/wheres-the-buffet.mp3",
  "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/who-is-this.mp3",
  "https://github.com/joefearnley/whatdavesaid/blob/2afc862124937cc7355fe5d6e63eadc0b733fc38/audio/william-butterfield.mp3"
];

const handlers = {
  LaunchRequest: () => {
    this.emit("PlayAudio");
  },
  PlayAudio: () => {
    const clip = clips[Math.floor(Math.random() * clips.length)];
    const speechOutput = "Here's what dave said: " + clip;
    this.emit(":tellWithCard", speechOutput, skillName, speechOutput);
  },
  "AMAZON.HelpIntent": () => {
    const speechOutput = "You can ask what dave said, or, you can say exit... What can I help you with?";
    const reprompt = "What can I help you with?";
    this.emit(":ask", speechOutput, reprompt);
  },
  "AMAZON.CancelIntent": () => {
    this.emit(":tell", "Goodbye!");
  },
  "AMAZON.StopIntent": () => {
    this.emit(":tell", "Goodbye!");
  }
};

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context);
  alexa.appId = appId;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
