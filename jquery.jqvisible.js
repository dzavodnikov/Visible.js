/*
 * jQVisible -- jQuery Visible/Unvisible Plug-in.
 *
 * Version 2.1.0.
 *
 * Copyright (c) 2014-2015 Dmitriy Zavodnikov.
 *
 * Licensed under the MIT License.
 */
var BECAME_VISIBLE_MESSAGE   = 'becameVisible';
var BECAME_UNVISIBLE_MESSAGE = 'becameUnvisible';

var unvisibleSet = [];

function isVisible(element) {
    return $(element).is(':visible');
}

function isElement(element) {
    return element.nodeType == 1;
}

function inUnvisibleSet(element) {
    return unvisibleSet.indexOf(element) != -1;
}

function addToUnvisibleSet(element) {
    if (! inUnvisibleSet(element) && isElement(element)) {
        unvisibleSet.push(element);
    }
}

function removeFromUnvisibleSet(element) {
    var pos = unvisibleSet.indexOf(element);
    if (pos != -1) {
        unvisibleSet.splice(pos, 1);
    }
}

function initUnvisibleSet(root) {
    var nodes = root.childNodes;
    for (var i = 0; i < nodes.length; ++i) {
        var element = nodes[i];
        if (! isVisible(element)) {
            sendMessage(element, BECAME_UNVISIBLE_MESSAGE);
            
            addToUnvisibleSet(element);
        } else {
            sendMessage(element, BECAME_VISIBLE_MESSAGE);
            
            initUnvisibleSet(element);
        }
    }
}

function sendMessage(element, message) {
    $(element).trigger(message);
}

function sendTreeMessage(root, message) {
    sendMessage(root, message);

    var nodes = root.childNodes;
    for (var i = 0; i < nodes.length; ++i) {
        sendTreeMessage(nodes[i], message);
    }
}

function becameVisible(element) {
    removeFromUnvisibleSet(element);

    sendTreeMessage(element, BECAME_VISIBLE_MESSAGE);
}

function becameUnvisible(element) {
    addToUnvisibleSet(element);

    sendTreeMessage(element, BECAME_UNVISIBLE_MESSAGE);
}

function bindVisibleUnvisible() {
    /* See:
     *  http://blog.whiteoctober.co.uk/2012/12/07/keeping-track-of-dom-manipulation/
     *  https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver?redirectlocale=en-US&redirectslug=DOM%2FDOM_Mutation_Observers
     */
    // Select the target node.
    var target = document.querySelector('body');

    // Choose browser-specific MutationObserver.
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    // Create an observer instance.
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            var node = mutation.target;
            if (inUnvisibleSet(node)) {
                if (isVisible(node)) {
                    becameVisible(node);
                }
            } else {
                if (! isVisible(node)) {
                    becameUnvisible(node);
                }
            }
        });

    });

    // Configuration of the observer.
    var config = {
        childList:              false,
        attributes:             true,
        characterData:          false,
        subtree:                true,
        attributeOldValue:      false,
        characterDataOldValue:  false,
        attributeFilter:        [ 'class', 'style' ]
    };

    // Pass in the target node, as well as the observer options.
    observer.observe(target, config);
}

$(document).ready(function() {
    initUnvisibleSet(document.querySelector('body'));

    bindVisibleUnvisible();
});
