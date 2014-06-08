#!/usr/bin/env node
"use strict";

var viewCountService = require("./../lib/Services/ViewCount");
var nconf = require("nconf");
var accounting = require("accounting");
var schedule = require("node-schedule");
var Emailer = require("./../lib/Services/Emailer");
var util = require("util");
var commandLineArguments = require("minimist")(process.argv);

var PREVIOUS_NUMBER_OF_VIEWS_KEY = "previousNumberOfViews";
var RPM_KEY = "rpm";

// Setup the application
if(!commandLineArguments || !commandLineArguments.p) { return new Error("Configuration file not specified"); }
nconf.file({ file: commandLineArguments.p });

var rule = new schedule.RecurrenceRule();
rule.hour = nconf.get("schedule:hour");
rule.minute = nconf.get("schedule:minute");
rule.second = nconf.get("schedule:second");
var emailer = new Emailer(nconf);

// Run the application
schedule.scheduleJob(rule, function() {
    viewCountService.getViewCount(nconf.get("video:id"), function(viewCount) {
        var numberOfViewsSinceLastChecked = getNumberOfViewsSinceLastChecked(nconf.get(PREVIOUS_NUMBER_OF_VIEWS_KEY), viewCount);
        var moneyEarned = calculateMoneyEarned(nconf.get(RPM_KEY), numberOfViewsSinceLastChecked);
        updatePreviousNumberOfViews(parseInt(viewCount));
        sendEmail(numberOfViewsSinceLastChecked, moneyEarned);
    });

    function getNumberOfViewsSinceLastChecked(previousNumberOfViews, currentNumberOfViews) {
        if(currentNumberOfViews <= previousNumberOfViews) return 0;
        return currentNumberOfViews - previousNumberOfViews;
    }

    function calculateMoneyEarned(rpm, numberOfViewsSinceLastChecked) {
        return ((numberOfViewsSinceLastChecked)/1000 * rpm).toFixed(2);
    }

    function updatePreviousNumberOfViews(previousNumberOfViews) {
        nconf.set(PREVIOUS_NUMBER_OF_VIEWS_KEY, previousNumberOfViews);
        nconf.save();
    }

    function sendEmail(numberOfViewsSinceLastChecked, moneyEarned) {
        emailer.send("You've earned money!", getEmailBody(numberOfViewsSinceLastChecked, accounting.formatMoney(moneyEarned)));
    }

    function getEmailBody(numberOfViewsSinceLastChecked, moneyEarned) { return util.format("Number of views: %d\n Money earned: %s", numberOfViewsSinceLastChecked, moneyEarned); }
});