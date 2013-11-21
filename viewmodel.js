/// <reference path="../lib/jquery-2.0.3.min.js" />
/// <reference path="../lib/knockout-3.0.0.min.js" />
/// <reference path="../lib/underscore.js" />


ViewModel = (function () {
    'use strict';

    /**
    * Initializes a new instance of the ViewModel class
    * @constructor
    */
    function ViewModel()
    {
        this.catsResolvedStatus = ko.observable('');
        this.dogsResolvedStatus = ko.observable('');
        this.imgUrl = ko.observable('');
        this.reset();
    }

    ViewModel.prototype.reset = function () {
        var self = this;
        self.catsResolvedStatus('');
        self.dogsResolvedStatus('');
        self.imgUrl('');

        self.cats = new $.Deferred();
        self.dogs = new $.Deferred();
        self.ready = new $.Deferred();

        self.cats.always(function () {
            if (self.cats.state() === 'resolved')
                self.catsResolvedStatus('The cats are in a good mood.');
            else
                self.catsResolvedStatus('The cats are in a bad mood!');
        })

        self.dogs.always(function () {
            if (self.dogs.state() === 'resolved')
                self.dogsResolvedStatus('The dogs are in a good mood.');
            else
                self.dogsResolvedStatus('The dogs are in a bad mood!');
        })

        $.when(self.cats, self.dogs, self.ready).done(function () {
            self.imgUrl('success.jpg');
        })
        .fail(function () {
            self.imgUrl('failure.jpg');
        });
    }

    ViewModel.prototype.badCatsClick = function () {
        this.cats.reject();
    };


    ViewModel.prototype.goodCatsClick = function () {
        this.cats.resolve();
    };

    ViewModel.prototype.badDogsClick = function () {
        this.dogs.reject();
    };

    ViewModel.prototype.goodDogsClick = function () {
        this.dogs.resolve();
    };

    ViewModel.prototype.badCatsClick = function () {
        this.cats.reject();
    };

    ViewModel.prototype.readyClick = function () {
        this.ready.resolve();
    };

    return ViewModel;
}());