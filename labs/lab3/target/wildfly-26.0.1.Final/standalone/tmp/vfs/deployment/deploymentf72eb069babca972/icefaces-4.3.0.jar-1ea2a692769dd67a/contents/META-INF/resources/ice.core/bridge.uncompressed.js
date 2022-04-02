if (!window.ice) {
    window.ice = new Object;
}
if (!window.ice.icefaces) {
    window.ice.globalEval = function(src) {
        if (window.execScript) {
            window.execScript(src);
        } else {
            (function() {
                window.eval.call(window, src);
            })();
        }
    };
    (function(namespace) {
        namespace.icefaces = true;
        namespace.configuration = new Object();
        namespace.disableDefaultErrorPopups = false;
        namespace.submitFunction = function (source, event, options) {
            jsf.ajax.request(source, event, options);
        };
        function detectByReference(ref) {
            return function(o) {
                return o == ref;
            };
        }
        function removeCallbackCallback(callbackList, detector) {
            return function removeCallback() {
                var temp = reject(callbackList, detector);
                empty(callbackList);
                each(temp, curry(append, callbackList));
            }
        }
        var sessionExpiryListeners = [];
        namespace.onSessionExpiry = function(callback) {
            append(sessionExpiryListeners, callback);
            return removeCallbackCallback(sessionExpiryListeners, detectByReference(callback));
        };
        var networkErrorListeners = [];
        namespace.onNetworkError = function(callback) {
            append(networkErrorListeners, callback);
            return removeCallbackCallback(networkErrorListeners, detectByReference(callback));
        };
        var serverErrorListeners = [];
        namespace.onServerError = function(callback) {
            append(serverErrorListeners, callback);
            return removeCallbackCallback(serverErrorListeners, detectByReference(callback));
        };
        var viewDisposedListeners = [];
        namespace.onViewDisposal = function(callback) {
            append(viewDisposedListeners, callback);
            return removeCallbackCallback(viewDisposedListeners, detectByReference(callback));
        };
        var beforeSubmitListeners = [];
        namespace.onBeforeSubmit = function(callback) {
            append(beforeSubmitListeners, callback);
            return removeCallbackCallback(beforeSubmitListeners, detectByReference(callback));
        };
        namespace.onSubmitSend = namespace.onBeforeSubmit;
        var beforeUpdateListeners = [];
        namespace.onBeforeUpdate = function(callback) {
            append(beforeUpdateListeners, callback);
            return removeCallbackCallback(beforeUpdateListeners, detectByReference(callback));
        };
        namespace.onSubmitResponse = namespace.onBeforeUpdate;
        var afterUpdateListeners = [];
        namespace.onAfterUpdate = function(callback) {
            append(afterUpdateListeners, callback);
            return removeCallbackCallback(afterUpdateListeners, detectByReference(callback));
        };
        function configurationOf(element) {
            var result = configurationOfImpl(element);
            if (result) {
                return result;
            }
            result = configurationOfImpl(document.getElementById(element.id));
            if (result) {
                return result;
            }
            debug(logger, 'configuration not found for ' + element.nodeName);
            return {};
        }
        function configurationOfImpl(element) {
            configParent = detect(parents(element),
                function(e) {
                    if (null != e) {
                        return e.configuration;
                    }
                    return {};
                });
            if (null != configParent) {
                return configParent.configuration;
            }
            return null;
        }
        function deltaSubmit(element) {
            return configurationOf(element).deltaSubmit;
        }
        function viewIDOf(element) {
            return configurationOf(element).viewID;
        }
        function formOf(element) {
            try {
                return formOfNode(element);
            } catch (e) {
                return formOfNode(document.getElementById(element.id));
            }
        }
        function formOfNode(element) {
            return toLowerCase(element.nodeName) == 'form' ? element : enclosingForm(element);
        }
        function lookupElementById(id) {
            var e;
            if (id == 'javax.faces.ViewRoot') {
                e = document.documentElement;
            } else if (id == 'javax.faces.ViewBody') {
                e = document.body;
            } else {
                try {
                    e = document.getElementById(id);
                } catch (e) {
                }
            }
            return e;
        }
        function lookupNamedInputElement(form, name) {
            var e = form[name];
            if (!e) {
                e = detect(form.getElementsByTagName('input'), function(input) {
                    return input.name && input.name == name;
                });
            }
            return e;
        }
        function lookupViewStateElement(form) {
            return detect(form.getElementsByTagName('input'), function(input) {
                return input.name && endsWith(input.name, 'javax.faces.ViewState');
            }, function() {
                throw 'cannot find javax.faces.ViewState input element';
            });
        }
        function lookupViewState(element) {
            return lookupViewStateElement(element).value;
        }
        function retrieveUpdateFormID(viewID) {
            return 'v' + viewID.replace(':', '-') + '-retrieve-update';
        }
        function singleSubmitFormID(viewID) {
            return 'v' + viewID.replace(':', '-') + '-single-submit';
        }
        eval(ice.importFrom('ice.lib.functional'));
        eval(ice.importFrom('ice.lib.oo'));
        eval(ice.importFrom('ice.lib.collection'));
        eval(ice.importFrom('ice.lib.hashtable'));
        eval(ice.importFrom('ice.lib.string'));
        eval(ice.importFrom('ice.lib.delay'));
        eval(ice.importFrom('ice.lib.window'));
        eval(ice.importFrom('ice.lib.event'));
        eval(ice.importFrom('ice.lib.element'));
        eval(ice.importFrom('ice.lib.logger'));
        eval(ice.importFrom('ice.lib.query'));
        eval(ice.importFrom('ice.lib.http'));
        namespace.onLoad = curry(onLoad, window);
        namespace.onBeforeUnload = curry(onBeforeUnload, window);
        namespace.onUnload = curry(onUnload, window);
        namespace.onPortletRemove = function(setupID, callback) {
            if (window.Liferay) {
                window.Liferay.bind('closePortlet', function (event) {
                    var container = document.getElementById('_' + event.portletId + '_');
                    var cursor = document.getElementById(setupID);
                    while (cursor) {
                        if (cursor == container) {
                            callback();
                            break;
                        } else {
                            cursor = cursor.parentNode;
                        }
                    }
                });
            }
        };
        var handler = LocalStorageLogHandler(window.console && window.console.log ? ConsoleLogHandler(debug) : WindowLogHandler(debug, window.location.href));
        var logger = Logger([ 'icefaces' ], handler);
        namespace.log = logger;
        namespace.log.debug = debug;
        namespace.log.info = info;
        namespace.log.warn = warn;
        namespace.log.error = error;
        namespace.log.childLogger = childLogger;
var setFocus;
var applyFocus;
var currentFocus = '';
var monitorFocusChanges;
var restoreMonitorFocusChangesOnUpdate;
(function () {
    setFocus = function (id) {
        currentFocus = id ? id : '';
        debug(logger, 'persisted focus for element "' + id + '"');
    };
    function isVisible(element) {
        var invisibleParent = detect(parents(element), function(e) {
            return e.style.visibility == 'hidden' || e.style.display == 'none';
        });
        return !invisibleParent;
    }
    function setCaretTo(element, pos) {
        if (element.createTextRange) {
            var range = element.createTextRange();
            range.move("character", pos);
            range.select();
        } else if ((element.selectionStart || element.selectionStart == 0) && isVisible(element)) {
            element.setSelectionRange(pos, pos);
        }
    }
    function setCaretAtTextEnd(element) {
        if ((toLowerCase(element.nodeName) == 'input' && element.type == 'text') || toLowerCase(element.nodeName) == 'textarea') {
            var text = element.value;
            setCaretTo(element, text.length);
        }
    }
    function isValidID(id) {
        return /^\w[\w\-\:]*$/.test(id);
    }
    var isIE = /MSIE/.test(navigator.userAgent);
    var focusOn = function (id) {
        runOnce(Delay(function () {
            if (id && isValidID(id)) {
                var e = document.getElementById(id);
                if (e && (e != document.activeElement)) {
                    setFocus(id);
                    if (e.focus) {
                        var x = window.scrollX || document.documentElement.scrollLeft;
                        var y = window.scrollY || document.documentElement.scrollTop;
                        try {
                            e.focus();
                            window.scrollTo(x, y);
                        } catch (ex) {
                        } finally {
                            if (isIE) {
                                try {
                                    e.focus();
                                    window.scrollTo(x, y);
                                } catch (ex2) {
                                }
                            }
                            debug(logger, 'focused element "' + id + '"');
                            setCaretAtTextEnd(e);
                        }
                    }
                }
            }
        }, 100));
    };
    var focusStrategy = focusOn;
    applyFocus = function (id) {
        focusStrategy(id);
    };
    if (isIE) {
        var activeElement;
        onLoad(window, function () {
            activeElement = document.activeElement;
        });
        var onBlur = function (callback) {
            registerElementListener(document, 'onfocusout', function () {
                if (activeElement == document.activeElement) {
                    callback();
                } else {
                    activeElement = document.activeElement;
                }
            });
        };
        var onFocus = function (callback) {
            registerElementListener(window, 'onfocus', callback);
        };
        onBlur(function () {
            focusStrategy = setFocus;
        });
        onFocus(function () {
            focusStrategy = focusOn;
        });
    }
    function registerElementListener(element, eventType, listener) {
        var previousListener = element[eventType];
        if (previousListener) {
            element[eventType] = function (e) {
                var args = [e];
                previousListener.apply(element, args);
                listener.apply(element, args);
            };
        } else {
            element[eventType] = listener;
        }
    }
    function saveCurrentFocus(e) {
        var evt = e || window.event;
        var element = evt.srcElement || evt.target;
        setFocus(element.id);
    }
    monitorFocusChanges = function(element) {
        if (element.attachEvent) {
            element.attachEvent('onfocusin', saveCurrentFocus);
        } else {
            element.addEventListener('focus', saveCurrentFocus, true);
            element.addEventListener('click', saveCurrentFocus, true);
        }
        return function() {
            if (element.attachEvent) {
                element.detachEvent('onfocusin', saveCurrentFocus);
            } else {
                element.removeEventListener('focus', saveCurrentFocus);
                element.removeEventListener('click', saveCurrentFocus);
            }
        };
    };
    restoreMonitorFocusChangesOnUpdate = function(element) {
        var id = element.id;
        return namespace.onAfterUpdate(function(updates) {
            if (detect(updates, function(update) {
                return update.getAttribute('id') == id;
            })) {
                monitorFocusChanges(lookupElementById(id));
            }
        });
    };
})();
        namespace.setFocus = setFocus;
        namespace.sf = setFocus;
        namespace.applyFocus = applyFocus;
        namespace.af = applyFocus;
        function appendHiddenInputElement(form, name, value, defaultValue) {
            var hiddenInput = document.createElement('input');
            hiddenInput.setAttribute('name', name);
            hiddenInput.setAttribute('value', value);
            hiddenInput.setAttribute('type', 'hidden');
            hiddenInput.setAttribute('autocomplete', 'off');
            if (defaultValue) {
                hiddenInput.defaultValue = defaultValue;
            }
            form.appendChild(hiddenInput);
            return hiddenInput;
        }
        function appendViewStateInputElement(form, viewState) {
            var prefix = configurationOf(form).parameterPrefix;
            appendHiddenInputElement(form, prefix + 'javax.faces.ViewState', viewState, viewState);
        }
        var viewIDs = [];
        function timedRetryAbort(retryAction, abortAction, timeouts) {
            var index = 0;
            var errorActions = inject(reverse(timeouts), [abortAction], function(actions, interval) {
                return insert(actions, curry(runOnce, Delay(retryAction, interval)));
            });
            return function() {
                if (index < errorActions.length) {
                    apply(errorActions[index], arguments);
                    index++;
                }
            };
        }
        function requestForUpdates(viewID, retries) {
            append(viewIDs, viewID);
            var formID = retrieveUpdateFormID(viewID);
            var form = lookupElementById(formID);
            var parameterPrefix = configurationOf(form).parameterPrefix;
            if (form) {
                try {
                    debug(logger, 'picking updates for view ' + viewID);
                    var options = {
                        'com.sun.faces.namingContainerId': parameterPrefix,
                        'ice.submit.type': 'ice.push',
                        'ice.view': viewID,
                        'ice.window': namespace.window,
                        execute: '@form',
                        render: '@all',
                        onerror: retries
                    };
                    jsf.ajax.request(form, null, options);
                } catch (e) {
                    warn(logger, 'failed to pick updates', e);
                }
            }
        }
        function retrieveUpdate(viewID, retryIntervals) {
            var delayedUpdates = function()  {
                if (eventInProgress)  {
                    setTimeout(delayedUpdates, 20);
                } else {
                    var retries = timedRetryAbort(function () {
                        info(logger, 'retrying to pick updates for view ' + viewID);
                        requestForUpdates(viewID, retries);
                    }, broadcaster(networkErrorListeners), retryIntervals || [1000, 2000, 4000]);
                    requestForUpdates(viewID, retries);
                }
            };
            return delayedUpdates;
        }
        var client = Client();
        function disposeWindow(viewID) {
            return function() {
                var form = lookupElementById(singleSubmitFormID(viewID));
                if (form) {
                    var prefix = configurationOf(form).parameterPrefix;
                    try {
                        var encodedURLElement = lookupNamedInputElement(form, 'javax.faces.encodedURL');
                        var url = encodedURLElement ? encodedURLElement.value : form.action;
                        form.action = url.replace(/(\?|&)cid=[0-9]+/, "$1");
                        debug(logger, 'dispose window and associated views ' + viewIDs);
                        postSynchronously(client, form.action, function(query) {
                            addNameValue(query, prefix + 'ice.submit.type', 'ice.dispose.window');
                            addNameValue(query, prefix + 'ice.window', namespace.window);
                            addNameValue(query, prefix + 'javax.faces.ViewState', lookupViewState(form));
                            each(viewIDs, curry(addNameValue, query, 'ice.view'));
                        }, FormPost, noop);
                    } catch (e) {
                        warn(logger, 'failed to notify window disposal', e);
                    }
                }
            };
        }
        function sessionExpired() {
            requestForUpdates = noop;
            if (namespace.push) {
                each(viewIDs, namespace.push.deregister);
            }
            broadcast(sessionExpiryListeners);
        }
        function containsXMLData(doc) {
            return doc && doc.documentElement;
        }
        function containsHTMLData(doc) {
            return doc.documentElement.nodeName == 'html';
        }
        function submitEventBroadcaster(perRequestOnBeforeSubmitListeners, perRequestOnBeforeUpdateListeners, perRequestOnAfterUpdateListeners) {
            perRequestOnBeforeSubmitListeners = perRequestOnBeforeSubmitListeners || [];
            perRequestOnBeforeUpdateListeners = perRequestOnBeforeUpdateListeners || [];
            perRequestOnAfterUpdateListeners = perRequestOnAfterUpdateListeners || [];
            var viewID;
            return function(submitEvent) {
                var submitElement = submitEvent.source;
                if (submitElement) {
                    submitElement = lookupElementById(submitElement.id);
                    try {
                        viewID = viewIDOf(submitElement);
                    } catch (e) {
                    }
                    if (viewID) {
                        switch (submitEvent.status) {
                            case 'begin':
                                var isUserInitiatedRequest = false;
                                if (submitElement.id != retrieveUpdateFormID(viewIDOf(submitElement))) {
                                    isUserInitiatedRequest = true;
                                }
                                broadcast(perRequestOnBeforeSubmitListeners, [ submitElement, isUserInitiatedRequest ]);
                                break;
                            case 'complete':
                                var xmlContent = submitEvent.responseXML;
                                if (containsXMLData(xmlContent)) {
                                    if (containsHTMLData(xmlContent)) {
                                        document.location = document.location.href;
                                    } else {
                                        broadcast(perRequestOnBeforeUpdateListeners, [ xmlContent, submitElement ]);
                                    }
                                } else {
                                    warn(logger, 'the response does not contain XML data');
                                    if (configurationOf(submitElement).reloadOnUpdateFailure) {
                                        warn(logger, 'reloading page ...');
                                        document.location = document.location.href;
                                    }
                                }
                                break;
                            case 'success':
                                var xmlContent = submitEvent.responseXML;
                                broadcast(perRequestOnAfterUpdateListeners, [ xmlContent, submitElement ]);
                                break;
                        }
                    }
                } else {
                    warn(logger, 'Source element is undefined, cannot determine if this view is ICEfaces enabled.')
                }
            };
        }
        function submitErrorBroadcaster(perRequestNetworkErrorListeners, perRequestServerErrorListeners, sessionExpiredListener) {
            perRequestNetworkErrorListeners = perRequestNetworkErrorListeners || [];
            perRequestServerErrorListeners = perRequestServerErrorListeners || [];
            return function(e) {
                if (e.status == 'serverError') {
                    var xmlContent = e.responseXML;
                    if (containsXMLData(xmlContent) && sessionExpiredListener) {
                        var errorName = xmlContent.getElementsByTagName("error-name")[0].firstChild.nodeValue;
                        if (errorName && contains(errorName, 'org.icefaces.application.SessionExpiredException')) {
                            info(logger, 'received session expired message');
                            sessionExpiredListener();
                            return;
                        }
                    }
                    info(logger, 'received error message [code: ' + e.responseCode + ']: ' + e.responseText);
                    broadcast(perRequestServerErrorListeners, [ e.responseCode, e.responseText, containsXMLData(xmlContent) ? xmlContent : null]);
                } else if (e.status == 'httpError') {
                    warn(logger, 'HTTP error [code: ' + e.responseCode + ']: ' + e.description + '\n' + e.responseText);
                    if (not(e.source && containsSubstring(e.source.id, '-retrieve-update'))) {
                        broadcast(perRequestNetworkErrorListeners, [e.responseCode, e.description]);
                    }
                } else if (e.status == 'malformedXML') {
                    warn(logger, 'HTML parsing or JS evaluation error [code: ' + e.responseCode + ']: ' + e.description + '\n' + e.responseText);
                    if (e.responseCode > 200) {
                        broadcast(perRequestNetworkErrorListeners, [e.responseCode, e.description]);
                    }
                } else {
                    error(logger, 'Error [status: ' + e.status + ' code: ' + e.responseCode + ']: ' + e.description + '\n' + e.responseText);
                }
            };
        }
        namespace.submitCallback = submitEventBroadcaster(beforeSubmitListeners, beforeUpdateListeners, afterUpdateListeners);
        jsf.ajax.addOnEvent(namespace.submitCallback);
        namespace.errorCallback = submitErrorBroadcaster(networkErrorListeners, serverErrorListeners, sessionExpired);
        jsf.ajax.addOnError(namespace.errorCallback);
        var eventInProgress;
        function logReceivedUpdates(e) {
            if ('begin' == e.status)  {
                eventInProgress = e;
            } else {
                eventInProgress = null;
            }
            if ('success' == e.status) {
                var xmlContent = e.responseXML;
                var updates = xmlContent.documentElement.firstChild.childNodes;
                var updateDescriptions = collect(updates, function(update) {
                    var id = update.getAttribute('id');
                    var updateType = update.nodeName;
                    var detail = updateType + (id ? '["' + id + '"]' : '');
                    if ('update' == updateType) {
                        detail += ': ' + substring(update.firstChild.data, 0, 40) + '....';
                    } else if ('insert' == updateType) {
                        var location = update.firstChild.getAttribute('id');
                        var text = update.firstChild.firstChild.data;
                        detail += ': ' + update.firstChild.nodeName + ' ' + location + ': ' + substring(text, 0, 40) + '....';
                    } else if ('eval' == updateType) {
                        detail += ': ' + substring(update.firstChild.data, 0, 40) + '....';
                    }
                    return detail;
                });
                debug(logger, 'applied updates >>\n' + join(updateDescriptions, '\n'));
            }
        }
        jsf.ajax.addOnEvent(logReceivedUpdates);
var singleSubmitExecuteThis;
var singleSubmitExecuteThisRenderThis;
var submit;
var submitExecuteForm;
var fullSubmit;
var singleSubmit;
(function() {
    function idOrElement(e) {
        return isString(e) ? document.getElementById(e) : e;
    }
    function formOf(element) {
        return toLowerCase(element.nodeName) == 'form' ? element : enclosingForm(element);
    }
    function isAjaxDisabled(formID, element) {
        var elementID = element.id;
        var disablingMarker = document.getElementById(formID + ":ajaxDisabled");
        return disablingMarker && contains(split(trim(disablingMarker.value), ' '), elementID);
    }
    function standardFormSerialization(element) {
        return configurationOf(element).standardFormSerialization;
    }
    function serializeEventToOptions(event, options) {
        var collectingQuery = object(function(method) {
            method(addNameValue, function(self, name, value) {
                options[name] = value;
            });
        });
        serializeOn(event, collectingQuery);
    }
    function encodedURLOf(form) {
        return form['javax.faces.encodedURL'] ? form['javax.faces.encodedURL'].value : form.action;
    }
    function serializeAdditionalParameters(additionalParameters, options) {
        if (additionalParameters) {
            additionalParameters(function(name, value) {
                options[name] = value;
            });
        }
    }
    function fixExecuteParameter(execute, element) {
        if (execute && element.name && element.id) {
            var execIds = execute.split(' ');
            for (var i = 0, size = execIds.length; i < size; i++) {
                if (execIds[i] == element.name) {
                    return execute;
                }
            }
            execute = execute + ' ' + element.name;
        }
        return execute;
    }
    function fixAlreadyNamespacedOptions(parameterPrefix, options) {
        var length = parameterPrefix.length;
        var fixedOptions = {};
        for (var p in options) {
            if (startsWith(p, parameterPrefix)) {
                fixedOptions[substring(p, length, p.length)] = options[p];
            } else {
                fixedOptions[p] = options[p];
            }
        }
        return fixedOptions;
    }
    singleSubmit = function(execute, render, event, element, additionalParameters, callbacks) {
        var viewID = viewIDOf(element);
        var form = document.getElementById(singleSubmitFormID(viewID));
        var clonedElements = [];
        try {
            var clonedElement = element.cloneNode(false);
            function cloneChildren(src, dst) {
                each(src.childNodes, function (s) {
                    if (s.nodeName != 'SCRIPT') {
                        var d = dst.appendChild(s.cloneNode(false));
                        cloneChildren(s, d);
                    }
                });
            }
            cloneChildren(element, clonedElement);
            form.appendChild(clonedElement);
            append(clonedElements, clonedElement);
            var tagName = toLowerCase(element.nodeName);
            if (tagName == 'input') {
                if (element.type == 'radio') {
                    clonedElement.checked = element.checked;
                    execute = fixExecuteParameter(execute, element);
                }
                if (element.type == 'checkbox') {
                    clonedElement.checked = element.checked;
                    var name = element.name;
                    each(element.form.elements, function(checkbox) {
                        if (checkbox.name == name && checkbox != element) {
                            var checkboxClone = form.appendChild(checkbox.cloneNode(true));
                            append(clonedElements, checkboxClone);
                            checkboxClone.checked = checkbox.checked;
                        }
                    });
                    execute = fixExecuteParameter(execute, element);
                }
            } else if (tagName == 'select') {
                var clonedOptions = clonedElement.options;
                each(element.options, function(option, i) {
                    clonedOptions[i].selected = option.selected;
                });
            } else if (tagName == 'textarea') {
                clonedElement.value = element.value;
            }
            event = event || null;
            var onBeforeSubmitListeners = [];
            var onBeforeUpdateListeners = [];
            var onAfterUpdateListeners = [];
            var onNetworkErrorListeners = [];
            var onServerErrorListeners = [];
            if (callbacks) {
                callbacks(
                    curry(append, onBeforeSubmitListeners),
                    curry(append, onBeforeUpdateListeners),
                    curry(append, onAfterUpdateListeners),
                    curry(append, onNetworkErrorListeners),
                    curry(append, onServerErrorListeners)
                );
            }
            if (deltaSubmit(element)) {
                append(onAfterUpdateListeners, recalculateFormPreviousParameters(element, form));
            }
            var requestScopedSubmitEventBroadcaster = submitEventBroadcaster(onBeforeSubmitListeners, onBeforeUpdateListeners, onAfterUpdateListeners);
            var requestScopedSubmitErrorBroadcaster = submitErrorBroadcaster(onNetworkErrorListeners, onServerErrorListeners);
            var parameterPrefix = configurationOf(element || form).parameterPrefix;
            var options = {
                execute: execute,
                render: render,
                onevent: requestScopedSubmitEventBroadcaster,
                onerror: requestScopedSubmitErrorBroadcaster,
                'com.sun.faces.namingContainerId': parameterPrefix,
                'ice.window': namespace.window,
                'ice.view': viewID,
                'ice.focus': currentFocus
            };
            var decoratedEvent = $event(event, element);
            if (isKeyEvent(decoratedEvent) && isEnterKey(decoratedEvent)) {
                cancelBubbling(decoratedEvent);
                cancelDefaultAction(decoratedEvent);
            }
            serializeEventToOptions(decoratedEvent, options);
            serializeAdditionalParameters(additionalParameters, options);
            debug(logger, join([
                'partial submit to ' + encodedURLOf(form),
                'javax.faces.execute: ' + execute,
                'javax.faces.render: ' + render,
                'javax.faces.source: ' + element.id,
                'view ID: ' + viewID,
                'event type: ' + type(decoratedEvent)
            ], '\n'));
            namespace.submitFunction(clonedElement, event, fixAlreadyNamespacedOptions(parameterPrefix, options));
        } catch (e) {
            debug(logger, "singleSubmit failed " + e);
        } finally {
            each(clonedElements, function(c) {
                form.removeChild(c);
            });
        }
    };
    singleSubmitExecuteThis = function(event, idorelement, additionalParameters, callbacks) {
        var element = idOrElement(idorelement);
        if (standardFormSerialization(element)) {
            return fullSubmit('@this', '@all', event, element, function(p) {
                p('ice.submit.type', 'ice.se');
                p('ice.submit.serialization', 'form');
                if (additionalParameters) additionalParameters(p);
            }, callbacks);
        } else {
            return singleSubmit('@this', '@all', event, element, function(p) {
                p('ice.submit.type', 'ice.se');
                p('ice.submit.serialization', 'element');
                if (additionalParameters) additionalParameters(p);
            }, callbacks);
        }
    };
    singleSubmitExecuteThisRenderThis = function(event, idorelement, additionalParameters, callbacks) {
        var element = idOrElement(idorelement);
        if (standardFormSerialization(element)) {
            return fullSubmit('@this', '@this', event, element, function(p) {
                p('ice.submit.type', 'ice.ser');
                p('ice.submit.serialization', 'form');
                if (additionalParameters) additionalParameters(p);
            }, callbacks);
        } else {
            return singleSubmit('@this', '@this', event, element, function(p) {
                p('ice.submit.type', 'ice.ser');
                p('ice.submit.serialization', 'element');
                if (additionalParameters) additionalParameters(p);
            }, callbacks);
        }
    };
    var addPrefix = 'patch+';
    var removePrefix = 'patch-';
    function extractTarget(e) {
        if (!e) {
            return null;
        }
        return (e.currentTarget) ? e.currentTarget :
            ( (e.target) ? e.target : e.srcElement );
    }
    function isFormElement(e) {
        var type = toLowerCase(e.nodeName);
        return (type == 'input' && (e.name != 'javax.faces.ViewState')) ||
            type == 'select' ||
            type == 'textarea';
    }
    function recalculateFormPreviousParameters(element, form) {
        return function(updates) {
            var updatedFragments = inject(updates.getElementsByTagName('update'), [], function(result, update) {
                var id = update.getAttribute('id');
                if (contains(id, 'javax.faces.ViewState') || contains(id, 'javax.faces.ClientWindow') || endsWith(id, '_fixviewstate')) {
                    return result;
                } else {
                    return append(result, lookupElementById(id));
                }
            });
            var updatedForms = inject(updatedFragments, [ form ] , function(result, e) {
                if (e) {
                    if (isFormElement(e) && not(contains(result, e.form))) {
                        append(result, e.form);
                    } else {
                        each(e.getElementsByTagName('form'), function (form) {
                            append(result, form);
                        });
                    }
                }
                return result;
            });
            each(updatedForms, function(form) {
                debug(logger, 'recalculate initial parameters for updated form["' + form.id + '"]');
                form.previousParameters = HashSet(jsf.getViewState(form).split('&'));
            });
        };
    }
    fullSubmit = function(execute, render, event, element, additionalParameters, callbacks) {
        var f = null;
        var extractedElement = extractTarget(event);
        var eventElement = (extractedElement) ? extractedElement :
            triggeredBy($event(event, element));
        if (eventElement && (eventElement.tagName) &&
            (toLowerCase(eventElement.tagName) == "form")) {
            eventElement = element;
        }
        if (toLowerCase(element.tagName) == "form") {
            f = element;
        } else {
            f = formOf(element);
        }
        var formID = f.id;
        var ajaxIsDisabled = false;
        var ancestor = eventElement;
        while (null != ancestor) {
            if ((ancestor.tagName) &&
                (toLowerCase(ancestor.tagName) == "form")) {
                break;
            }
            if (isAjaxDisabled(formID, ancestor)) {
                ajaxIsDisabled = true;
                break;
            }
            ancestor = ancestor.parentNode;
        }
        if (ajaxIsDisabled) {
            if (f && f.nativeSubmit) {
                var fakeClick = document.createElement("input");
                fakeClick.setAttribute("type", "hidden");
                fakeClick.setAttribute("name", eventElement.name);
                fakeClick.setAttribute("value", eventElement.value);
                fakeClick.setAttribute("autocomplete", "off");
                f.appendChild(fakeClick);
                f.nativeSubmit();
                f.removeChild(fakeClick);
            }
        } else {
            event = event || null;
            var onBeforeSubmitListeners = [];
            var onBeforeUpdateListeners = [];
            var onAfterUpdateListeners = [];
            var onNetworkErrorListeners = [];
            var onServerErrorListeners = [];
            if (callbacks) {
                callbacks(
                    curry(append, onBeforeSubmitListeners),
                    curry(append, onBeforeUpdateListeners),
                    curry(append, onAfterUpdateListeners),
                    curry(append, onNetworkErrorListeners),
                    curry(append, onServerErrorListeners)
                );
            }
            var parameterPrefix = configurationOf(element || f).parameterPrefix;
            var viewID = viewIDOf(element);
            var requestScopedSubmitEventBroadcaster = submitEventBroadcaster(onBeforeSubmitListeners, onBeforeUpdateListeners, onAfterUpdateListeners);
            var requestScopedSubmitErrorBroadcaster = submitErrorBroadcaster(onNetworkErrorListeners, onServerErrorListeners);
            var options = {
                execute: execute,
                render: render,
                onevent: requestScopedSubmitEventBroadcaster,
                onerror: requestScopedSubmitErrorBroadcaster,
                'com.sun.faces.namingContainerId': parameterPrefix,
                'ice.window': namespace.window,
                'ice.view': viewID,
                'ice.focus': currentFocus};
            var decoratedEvent = $event(event, element);
            if (isKeyEvent(decoratedEvent) && isEnterKey(decoratedEvent)) {
                cancelBubbling(decoratedEvent);
                cancelDefaultAction(decoratedEvent);
            }
            try {
                serializeEventToOptions(decoratedEvent, options);
            } catch (e) {
                debug(logger, "Unable to serialize event " + e);
            }
            serializeAdditionalParameters(additionalParameters, options);
            var form = formOf(element);
            var isDeltaSubmit = deltaSubmit(element);
            debug(logger, join([
                (isDeltaSubmit ? 'delta ' : '') + 'full submit to ' + encodedURLOf(form),
                'javax.faces.execute: ' + execute,
                'javax.faces.render: ' + render,
                'javax.faces.source: ' + element.id,
                'view ID: ' + viewID,
                'event type: ' + type(decoratedEvent)
            ], '\n'));
            if (isDeltaSubmit) {
                append(onAfterUpdateListeners, recalculateFormPreviousParameters(element, f));
                var previousParameters = form.previousParameters || HashSet();
                var currentParameters = HashSet(jsf.getViewState(form).split('&'));
                var addedParameters = complement(currentParameters, previousParameters);
                var removedParameters = complement(previousParameters, currentParameters);
                function splitStringParameter(f) {
                    return function(p) {
                        var parameter = split(p, '=');
                        f(decodeURIComponent(parameter[0]), decodeURIComponent(parameter[1]));
                    };
                }
                var deltaSubmitForm = document.getElementById(singleSubmitFormID(viewID));
                var appendedElements = [];
                var clonedElement;
                if (toLowerCase(element.nodeName) == 'form') {
                    clonedElement = document.createElement('input');
                    clonedElement.setAttribute('id', element.id);
                    clonedElement.setAttribute('name', element.id);
                    clonedElement.setAttribute('value', element.id);
                    clonedElement.setAttribute('type', 'hidden');
                    clonedElement.setAttribute('autocomplete', 'off');
                } else {
                    clonedElement = element.cloneNode(true);
                    clonedElement.value = element.value;
                }
                clonedElement._original = element;
                append(appendedElements, deltaSubmitForm.appendChild(clonedElement));
                function addSubmitParameter(name, value) {
                    options[name] = value;
                }
                addSubmitParameter('ice.deltasubmit.form', form.id);
                addSubmitParameter(form.id, form.id);
                try {
                    addSubmitParameter('ice.deltasubmit.form', form.id);
                    each(addedParameters, splitStringParameter(function(name, value) {
                        addSubmitParameter(addPrefix + name, value);
                    }));
                    each(removedParameters, splitStringParameter(function(name, value) {
                        addSubmitParameter(removePrefix + name, value);
                    }));
                    namespace.submitFunction(clonedElement, event, fixAlreadyNamespacedOptions(parameterPrefix, options));
                } finally {
                    each(appendedElements, function(element) {
                        deltaSubmitForm.removeChild(element);
                    });
                }
            } else {
                namespace.submitFunction(element, event, fixAlreadyNamespacedOptions(parameterPrefix, options));
            }
        }
    };
    submit = function(event, element, additionalParameters, callbacks) {
        return fullSubmit('@all', '@all', event, idOrElement(element), function(p) {
            p('ice.submit.type', 'ice.s');
            p('ice.submit.serialization', 'form');
            if (additionalParameters) additionalParameters(p);
        }, callbacks);
    };
    submitExecuteForm = function(event, element, additionalParameters, callbacks) {
        return fullSubmit('@form', '@all', event, idOrElement(element), function(p) {
            p('ice.submit.type', 'ice.s');
            p('ice.submit.serialization', 'form');
            if (additionalParameters) additionalParameters(p);
        }, callbacks);
    };
})();
var startBlockingUI;
(function() {
    var off = operator();
    function Overlay(element) {
        var container = element || document.body;
        var overlay = container.ownerDocument.createElement('iframe');
        overlay.setAttribute('src', 'about:blank');
        overlay.setAttribute('frameborder', '0');
        var overlayStyle = overlay.style;
        overlayStyle.position = 'absolute';
        overlayStyle.filter = 'alpha(opacity=0)';
        overlayStyle.top = '0';
        overlayStyle.left = '0';
        overlayStyle.zIndex = 3000;
        var stylingOverlay = container.ownerDocument.createElement('div');
        stylingOverlay.className = 'ice-blockui-overlay';
        var stylingOverlayStyle = stylingOverlay.style;
        stylingOverlayStyle.position = 'absolute';
        stylingOverlayStyle.top = '0';
        stylingOverlayStyle.left = '0';
        stylingOverlayStyle.zIndex = 3001;
        if (container.tagName.toLowerCase() == 'body') {
            overlayStyle.width = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) + 'px';
            overlayStyle.height = Math.max(document.documentElement.offsetHeight, document.documentElement.scrollHeight, document.body.scrollHeight) + 'px';
            stylingOverlayStyle.width = overlayStyle.width;
            stylingOverlayStyle.height = overlayStyle.height;
        } else {
            overlayStyle.width = container.offsetWidth + 'px';
            overlayStyle.height = container.offsetHeight + 'px';
            stylingOverlayStyle.width = overlayStyle.width;
            stylingOverlayStyle.height = overlayStyle.height;
        }
        container.appendChild(overlay);
        container.appendChild(stylingOverlay);
        return object(function(method) {
            method(off, function(self) {
                if (overlay) {
                    try {
                        container.removeChild(overlay);
                        container.removeChild(stylingOverlay);
                    } catch (e) {
                    }
                }
            });
        });
    }
    function isBlockUIEnabled(source) {
        return configurationOf(source).blockUIOnSubmit;
    }
    function eventSink(element) {
        return function(e) {
            var ev = $event(e, element);
            var evenType = type(ev);
            var triggeringElement = triggeredBy(ev);
            var capturingElement = capturedBy(ev);
            cancel(ev);
            debug(logger, 'event [type: ' + evenType +
                ', triggered by: ' + (identifier(triggeringElement) || triggeringElement) +
                ', captured in: ' + (identifier(capturingElement) || capturingElement) + '] was discarded.');
        }
    }
    function isBlurEvent() {
        var c = arguments.callee.caller;
        while (c) {
            if (c == namespace.fullSubmit) {
                var eventArgument = c.arguments[2];
                if (eventArgument)  {
                    return eventArgument.type == 'blur';
                } else {
                    return false;
                }
            }
            try {
                c = c.arguments.callee.caller;
            } catch (ex) {
                break;
            }
        }
        return false;
    }
    startBlockingUI = function() {
        debug(logger, 'blocking UI');
        var blockUIOverlay = Overlay();
        var rollbacks = inject(['input', 'select', 'textarea', 'button', 'a'], [], function(result, type) {
            return concatenate(result, asArray(collect(document.body.getElementsByTagName(type), function(e) {
                var sink = eventSink(e);
                var onkeypress = e.onkeypress;
                var onkeyup = e.onkeyup;
                var onkeydown = e.onkeydown;
                var onclick = e.onclick;
                e.onkeypress = sink;
                e.onkeyup = sink;
                e.onkeydown = sink;
                e.onclick = sink;
                return function() {
                    try {
                        e.onkeypress = onkeypress;
                        e.onkeyup = onkeyup;
                        e.onkeydown = onkeydown;
                        e.onclick = onclick;
                    } catch (ex) {
                    }
                };
            })));
        });
        return function() {
            broadcast(rollbacks);
            off(blockUIOverlay);
            debug(logger, 'unblocked UI');
        };
    };
    var lock = false;
    var originalSubmitFunction = ice.submitFunction;
    ice.submitFunction = function(element, event, options) {
        if (isBlockUIEnabled(element) && not(isBlurEvent())) {
            if (!lock) {
                lock = true;
                var originalOnEvent = options.onevent;
                options.onevent = function (submitEvent) {
                    if (submitEvent.status == 'success') {
                        lock = false;
                    }
                    if (originalOnEvent) {
                        originalOnEvent(submitEvent);
                    }
                };
                originalSubmitFunction(element, event, options);
            }
        } else {
            originalSubmitFunction(element, event, options);
        }
    };
    var stopBlockingUI = noop;
    namespace.onBeforeSubmit(function(source, isClientRequest) {
        if (isClientRequest && isBlockUIEnabled(source) && not(isBlurEvent())) {
            stopBlockingUI = startBlockingUI();
        } else {
            stopBlockingUI = noop;
        }
    });
    namespace.onBeforeUpdate(function() {
        stopBlockingUI();
    });
})();
        namespace.se = singleSubmitExecuteThis;
        namespace.ser = singleSubmitExecuteThisRenderThis;
        namespace.submit = submit;
        namespace.s = submit;
        namespace.sef = submitExecuteForm;
        namespace.fullSubmit = fullSubmit;
        namespace.ajaxRefresh = function(viewID, retryIntervals) {
            viewID = viewID || (document.body.configuration ? document.body.configuration.viewID : null);
            if (!viewID) {
                throw 'viewID parameter required';
            }
            var c = configurationOf(lookupElementById(retrieveUpdateFormID(viewID)));
            if (!c.ajaxRefresh) {
                c.ajaxRefresh = retrieveUpdate(viewID, retryIntervals);
            }
            c.ajaxRefresh();
        };
        function objectToString(o) {
            var result = [];
            for (var prop in o) {
                if (o.hasOwnProperty(prop)) {
                    append(result, prop);
                    append(result, o[prop]);
                }
            }
            return result.join('');
        }
        var unsetupBridge = noop;
        namespace.setupBridge = function(setupID, viewID, windowID, configuration) {
            var container = document.getElementById(setupID).parentNode;
            if (objectToString(configuration) != objectToString(container.configuration)) {
                unsetupBridge();
                var rollbacks = [];
                container.configuration = configuration;
                container.configuration.viewID = viewID;
                namespace.window = windowID;
                if (configuration.sendDisposeWindow) {
                    append(rollbacks, onBeforeUnload(window, disposeWindow(viewID)));
                }
                if (configuration.focusManaged) {
                    append(rollbacks, monitorFocusChanges(container));
                    append(rollbacks, restoreMonitorFocusChangesOnUpdate(container));
                }
                if (configuration.clientSideElementUpdateDetermination) {
                    append(rollbacks, switchToClientSideElementUpdateDetermination());
                }
                if (configuration.blockUIOnSubmit) {
                    append(rollbacks, onBeforeUnload(window, function() {
                        startBlockingUI();
                    }));
                }
                unsetupBridge = broadcaster(rollbacks);
            }
            container.setupCount = container.setupCount ? (container.setupCount + 1) : 1;
            if (container.setupCount == 1) {
                setupDefaultIndicators(container);
                clearEventHandlersOnUnload(container);
            }
        };
        namespace.setupPush = function(setupID, viewID, retryIntervals, fetchPendingNotifications) {
            var intervals = asArray(collect(split(retryIntervals, ' '), Number));
            var retrieveViewUpdate = retrieveUpdate(viewID, intervals);
            ice.push.register([viewID], retrieveViewUpdate);
            if (fetchPendingNotifications) {
                ice.onBlockingConnectionReEstablished(retrieveViewUpdate);
            }
            var unsetupPush = curry(namespace.unsetupPush, viewID);
            namespace.onSessionExpiry(unsetupPush);
            namespace.onNetworkError(unsetupPush);
            namespace.onServerError(unsetupPush);
            namespace.onUnload(unsetupPush);
            namespace.onPortletRemove(setupID, unsetupPush);
        };
        namespace.unsetupPush = function(viewID) {
            ice.push.deregister([viewID]);
        };
        namespace.setupRefresh = function(viewID, interval, duration, id, retryIntervals) {
            var times = duration < 0 ? null : Math.floor(duration / interval);
            var intervals = asArray(collect(split(retryIntervals, ' '), Number));
            var requestUpdate = retrieveUpdate(viewID, intervals);
            var delay = Delay(requestUpdate, interval);
            run(delay, times);
            var stopDelay = curry(stop, delay);
            namespace.onSessionExpiry(stopDelay);
            namespace.onNetworkError(stopDelay);
            namespace.onServerError(stopDelay);
            namespace.onUnload(stopDelay);
            namespace.onElementUpdate(id, stopDelay);
        };
        namespace.calculateInitialParameters = function(id) {
            var f = document.getElementById(id);
            f.previousParameters = HashSet(jsf.getViewState(f).split('&'));
        };
        onBeforeUnload(window, function() {
            empty(networkErrorListeners);
        });
        onKeyPress(document, function(ev) {
            var e = $event(ev);
            if (isEscKey(e)) cancelDefaultAction(e);
        });
(function() {
    var beforeSessionExpiryListeners = [];
    namespace.onBeforeSessionExpiry = function(callback) {
        append(beforeSessionExpiryListeners, callback);
        return removeCallbackCallback(beforeSessionExpiryListeners, detectByReference(callback));
    };
    var beforeSessionExpiryTimeoutBomb = object(function(method) {
        method(stop, noop);
    });
    var sessionExpiryTimeoutBomb = object(function(method) {
        method(stop, noop);
    });
    namespace.resetSessionExpiryTimeout = function(deltaTime, timeLeft) {
        stop(beforeSessionExpiryTimeoutBomb);
        stop(sessionExpiryTimeoutBomb);
        var timeInSeconds = Math.round(timeLeft / 1000);
        beforeSessionExpiryTimeoutBomb = runOnce(Delay(function() {
            broadcast(beforeSessionExpiryListeners, [timeInSeconds]);
            runOnce(Delay(function() {
                sessionExpiryTimeoutBomb = broadcast(sessionExpiryListeners);
            }, timeLeft));
        }, deltaTime));
    };
})();
var clearEventHandlersOnUnload;
(function() {
    function clearEventHandlers(element) {
        element.onkeypress = null;
        element.onmousedown = null;
        element.onmousemove = null;
        element.onmouseout = null;
        element.onmouseover = null;
        element.onclick = null;
        element.oncontextmenu = null;
        element.onchange = null;
        element.onfocus = null;
        element.onblur = null;
        element.submit = null;
        element.onsubmit = null;
        element.onkeydown = null;
        element.onkeyup = null;
        element.ondblclick = null;
        element.onfocusout = null;
    }
    clearEventHandlersOnUnload = function(container) {
        onUnload(window, function() {
            container.configuration = null;
            each(['a', 'iframe'], function(type) {
                each(container.getElementsByTagName(type), clearEventHandlers);
            });
            each(container.getElementsByTagName('form'), function(form) {
                try {
                    form.submit = null;
                } catch (ex) {
                }
                form.onsubmit = null;
                var elements = form.elements;
                if (elements) {
                    each(elements, clearEventHandlers);
                }
            });
        });
    };
    namespace.onBeforeUpdate(function(updates) {
        each(updates.getElementsByTagName('update'), function(update) {
            var id = update.getAttribute('id');
            var e = lookupElementById(id);
            if (e) {
                clearEventHandlers(e);
                each(['a', 'iframe', 'input', 'select', 'button', 'textarea'], function(type) {
                    each(e.getElementsByTagName(type), clearEventHandlers);
                });
                each(e.getElementsByTagName('form'), function(form) {
                    clearEventHandlers(form);
                    form.submit = null;
                    form.onsubmit = null;
                });
            }
        });
    });
})();
(function() {
    namespace.captureKeypress = function(id, keyMap) {
        var f = document.getElementById(id);
        var captureKeypress = function(ev) {
            var e = $event(ev, f);
            var element = triggeredBy(e);
            var type = toLowerCase(element.nodeName);
            if (type != 'textarea' && type != 'a') {
                if (keyMap) {
                    var elementID = keyMap[keyCode(e)];
                    if (elementID) {
						if (!element.preventDefaultAction) {
							element = lookupElementById(elementID);
							cancel(e);
							submitExecuteForm(ev || window.event, element);
						}
                        return false;
                    }
                }
                if (isEnterKey(e)) {
                    var cursor = element;
                    while (cursor && !cursor.submitOnEnter) {
                        cursor = cursor.parentNode;
                    }
                    if (cursor && cursor.submitOnEnter == 'disabled') {
                        return false;
                    } else {
                        if (element && element.id) {
                            submit(ev || window.event, element);
                        }
                        return false;
                    }
                }
                return true;
            }
        };
        if (f.addEventListener) {
            f.addEventListener('keydown', captureKeypress, true);
        } else {
            f.attachEvent('onkeydown', captureKeypress);
        }
    };
    namespace.captureSubmit = function(id) {
        var f = document.getElementById(id);
        if (f.enctype != 'multipart/form-data') {
            f.nativeSubmit = f.submit;
            f.submit = function() {
                var theEvent;
                if (window.event) {
                    theEvent = window.event;
                } else {
                    var maybeCaller = arguments.callee.caller;
                    var originalEvent;
                    while (!(maybeCaller && originalEvent && (originalEvent.target || originalEvent.srcElement))) {
                        maybeCaller = maybeCaller.caller;
                        originalEvent = maybeCaller.arguments[0];
                    }
                    theEvent = originalEvent;
                }
                submit(theEvent, f);
            }
        }
        each(['onkeydown', 'onkeypress', 'onkeyup', 'onclick', 'ondblclick', 'onchange'], function(name) {
            f[name] = function(e) {
                var event = e || window.event;
                var element = event.target || event.srcElement;
                var removeCallback = namespace.onAfterUpdate(function() {
                    f.onsubmit = null;
                    Delay(removeCallback, 1);
                });
                f.onsubmit = function() {
                    if (element.name && !element.id) {
                        var lookedUpElement = document.getElementById(element.name);
                        if (!lookedUpElement || !lookedUpElement.id) {
                            element.id = element.name;
                        }
                    }
                    if (window.mojarra && arguments.callee.caller == window.mojarra.jsfcljs) {
                        submit(null, f);
                        return false;
                    } else {
                        var elementExists = document.getElementById(element.id);
                        submit(event, elementExists ? elementExists : f);
                        f.onsubmit = null;
                        return false;
                    }
                    return false;
                };
            };
        });
    };
})();
(function() {
    function isComponentRendered(form) {
        return lookupNamedInputElement(form, 'javax.faces.encodedURL') ||
            lookupNamedInputElement(form, 'javax.faces.ViewState') ||
            lookupNamedInputElement(form, 'ice.window') ||
            lookupNamedInputElement(form, 'ice.view') ||
            (form.id && form[form.id] && form.id == form[form.id].value);
    }
    function ifViewStateUpdated(updates, callback) {
        var viewStateUpdate = detect(updates.getElementsByTagName('update'), function(update) {
            return contains(update.getAttribute('id'), 'javax.faces.ViewState');
        });
        if (viewStateUpdate) {
            callback(viewStateUpdate.firstChild.data);
        }
    }
    function collectUpdatedForms(updates, iterator) {
        each(updates.getElementsByTagName('update'), function(update) {
            var id = update.getAttribute('id');
            var e = lookupElementById(id);
            if (e) {
                if (toLowerCase(e.nodeName) == 'form') {
                    if (isComponentRendered(e)) {
                        iterator(e);
                    }
                } else {
                    var markup = join(collect(update.childNodes, function(cdata) {
                        return cdata.data;
                    }), '');
                    var formStartTags = markup.match(/\<form[^\<]*\>/g);
                    if (formStartTags) {
                        each(formStartTags, function(formStartTag) {
                            var match = formStartTag.match(/id="([\S]*?)"/im);
                            if (match && match[1]) {
                                var id = match[1];
                                var form = document.getElementById(id);
                                if (form && isComponentRendered(form)) {
                                    iterator(form);
                                }
                            }
                        });
                    }
                }
            }
        });
    }
    namespace.onAfterUpdate(function(updates) {
        ifViewStateUpdated(updates, function(viewState) {
            collectUpdatedForms(updates, function(form) {
                try {
                    var viewStateElement = lookupViewStateElement(form);
                    if (viewStateElement.value != viewState) {
                        viewStateElement.value = viewState;
                    }
                } catch (ex) {
                    appendViewStateInputElement(form, viewState);
                    debug(logger, 'append missing "javax.faces.ViewState" input element to form["' + form.id + '"]');
                }
            });
        });
    });
    var formViewID;
    namespace.onBeforeSubmit(function(source) {
        var inputElement = lookupNamedInputElement(formOf(source), 'ice.view');
        formViewID = inputElement ? inputElement.value : null;
    });
    namespace.onAfterUpdate(function(updates) {
        ifViewStateUpdated(updates, function(viewState) {
            each(document.getElementsByTagName('form'), function(form) {
                var viewIDElement = lookupNamedInputElement(form, 'ice.view');
                var viewStateElement = lookupNamedInputElement(form, 'javax.faces.ViewState');
                if (viewStateElement && viewIDElement && viewIDElement.value == formViewID) {
                    viewStateElement.value = viewState;
                }
            });
        });
    });
    function fixViewState(id, viewState) {
        var form = lookupElementById(id);
        try {
            var viewStateElement = lookupViewStateElement(form);
            if (viewStateElement.value != viewState) {
                viewStateElement.value = viewState;
            }
        } catch (ex) {
            appendViewStateInputElement(form, viewState);
        }
    }
    namespace.fixViewStates = function(formIds, viewState) {
        for( var i = 0; i < formIds.length; i++){
            fixViewState(formIds[i],viewState);
        }
    };
})();
var switchToClientSideElementUpdateDetermination;
(function() {
    var elementUpdateListeners = [];
    function serverSideOnElementUpdate(id, callback) {
        var element = lookupElementById(id);
        if (element) {
            element['data-onElementUpdate'] = callback;
        } else {
            warn(logger, 'Cannot find element [' + id + '] to assign onElementUpdate callback.');
        }
    }
    function clientSideOnElementUpdate(id, callback) {
        var element = lookupElementById(id);
        var ancestorIDs = [];
        var cursor = element;
        while (cursor) {
            var cursorID;
            if (cursor == document.body) {
                cursorID = 'javax.faces.ViewBody';
            } else if (cursor == document.documentElement) {
                cursorID = 'javax.faces.ViewRoot';
            } else if (cursor == document.getElementsByTagName('head')[0]) {
                cursorID = 'javax.faces.ViewHead';
            } else {
                cursorID = cursor.id;
            }
            if (cursorID) {
                ancestorIDs.push(cursorID);
            }
            cursor = cursor.parentNode;
        }
        append(elementUpdateListeners, {identifier: id, handler: callback, ancestors: ('*' + ancestorIDs.join('*') + '*')});
        return removeCallbackCallback(elementUpdateListeners, function(c) {
            return id == c.id;
        });
    }
    namespace.onElementUpdate = serverSideOnElementUpdate;
    switchToClientSideElementUpdateDetermination = function() {
        namespace.onElementUpdate = clientSideOnElementUpdate;
        var removeOnBeforeUpdate = namespace.onBeforeUpdate(function(updates) {
            each(updates.getElementsByTagName('update'), findAndNotifyUpdatedElements);
            each(updates.getElementsByTagName('delete'), findAndNotifyUpdatedElements);
        });
        return function() {
            namespace.onElementUpdate = serverSideOnElementUpdate;
            removeOnBeforeUpdate();
        }
    };
    function findAndNotifyUpdatedElements(update) {
        var updatedElementId = update.getAttribute('id');
        if (contains(updatedElementId, 'javax.faces.ViewState')) {
            return;
        }
        var fvsTail = updatedElementId.substr(updatedElementId.length - 13);
        if ('_fixviewstate' === fvsTail) {
            return;
        }
        var updatedElement = lookupElementById(updatedElementId);
        if (updatedElement) {
            elementUpdateListeners = reject(elementUpdateListeners, function(idCallbackTuple) {
                var updated = contains(idCallbackTuple.ancestors, '*' + updatedElementId + '*');
                if (updated) {
                    var id = idCallbackTuple.identifier;
                    var element = lookupElementById(id);
                    if (element) {
                        var callback = idCallbackTuple.handler;
                        try {
                            callback(element);
                        } catch (e) {
                        }
                    }
                    return true;
                } else {
                    return false;
                }
            });
        }
    }
    namespace.notifyOnElementUpdateCallbacks = function(ids) {
        each(ids, function(id) {
            var e = lookupElementById(id);
            if (e) {
                var callback = e['data-onElementUpdate'];
                if (callback) {
                    try {
                        callback(id);
                    } catch (ex) {
                        warn(logger, 'onElementUpdate callback for [' + id + '] failed to run properly', ex);
                    } finally {
                        e['data-onElementUpdate'] = null;
                    }
                }
            }
        });
    };
    namespace.notifyAllOnElementUpdateCallbacks = function() {
        var elements = document.body.getElementsByTagName('*');
        for (var i = 0, l = elements.length; i < l; i++) {
            var e = elements[i];
            var callback;
			if (e) callback = e['data-onElementUpdate'];
            if (callback) {
                var id = e.id;
                try {
                    callback(id);
                } catch (ex) {
                    warn(logger, 'onElementUpdate callback for [' + id + '] failed to run properly', ex);
                } finally {
                    if (e) e['data-onElementUpdate'] = null;
                }
            }
        }
    };
})();
(function() {
    var elementRemoveListeners = [];
    namespace.onElementRemove = function(id, callback) {
        append(elementRemoveListeners, {i: id, c: callback});
        return removeCallbackCallback(elementRemoveListeners, detectByReference(callback));
    };
    namespace.onAfterUpdate(function() {
        each(elementRemoveListeners, function(tuple) {
            var notFound = true;
            try {
                notFound = !document.getElementById(tuple.i);
            } catch (ex) {
                notFound = true;
            }
            if (notFound) {
                try {
                    tuple.c();
                } catch (ex) {
                    warn(logger, 'failed to execute onElementRemove callback for element ' + tuple.i);
                }
            }
        });
    });
})();
(function() {
    var userInactivityListeners = [];
    var notifiedUserInactivityListeners = [];
    var isUserInactivityMonitorStarted = false;
    namespace.onUserInactivity = function(timeout, idleUserCallback, activeUserCallback, userActiveEvents) {
        if (!isUserInactivityMonitorStarted) {
            isUserInactivityMonitorStarted = true;
            observeUserInactivity(userActiveEvents || [ 'keydown', 'mouseover' ]);
        }
        var tuple = {interval: (timeout * 1000), idleCallback: idleUserCallback, activeCallback: activeUserCallback};
        append(userInactivityListeners, tuple);
        return removeCallbackCallback(userInactivityListeners, detectByReference(tuple));
    };
    function observeUserInactivity(userActiveEvents) {
        var userActivityMonitor = Delay(function() {
            var now = (new Date).getTime();
            var additionalNotifiedListeners = select(userInactivityListeners, function(tuple) {
                var interval = tuple.interval;
                var runCallback = now > lastActivityTime + interval;
                if (runCallback) {
                    var callback = tuple.idleCallback;
                    try {
                        callback();
                    } catch (ex) {
                        warn(logger, 'onUserInactivity idle user callback failed to run', ex);
                    }
                }
                return runCallback;
            });
            userInactivityListeners = complement(userInactivityListeners, additionalNotifiedListeners);
            notifiedUserInactivityListeners = concatenate(notifiedUserInactivityListeners, additionalNotifiedListeners);
        }, 3 * 1000);
        run(userActivityMonitor);
        var stopActivityMonitor = curry(stop, userActivityMonitor);
        namespace.onSessionExpiry(stopActivityMonitor);
        namespace.onNetworkError(stopActivityMonitor);
        namespace.onServerError(stopActivityMonitor);
        namespace.onUnload(stopActivityMonitor);
        var lastActivityTime = (new Date).getTime();
        function resetUserInactivity() {
            lastActivityTime = (new Date).getTime();
            if (notEmpty(notifiedUserInactivityListeners)) {
                each(notifiedUserInactivityListeners, function(tuple) {
                    var callback = tuple.activeCallback;
                    if (callback) {
                        try {
                            callback();
                        } catch (ex) {
                            warn(logger, 'onUserInactivity active user callback failed to run', ex);
                        }
                    }
                });
                userInactivityListeners = concatenate(userInactivityListeners, notifiedUserInactivityListeners);
                notifiedUserInactivityListeners = [];
            }
        }
        each(userActiveEvents, function(e) {
            registerListener(e, document, resetUserInactivity);
        });
    }
})();
var setupDefaultIndicators;
(function () {
    var off = operator();
    function PopupIndicator(message, description, panel) {
        var backPanel = panel();
        var messageContainer = document.body.appendChild(document.createElement('div'));
        messageContainer.className = 'ice-status-indicator';
        var messageContainerStyle = messageContainer.style;
        messageContainerStyle.position = 'absolute';
        messageContainerStyle.textAlign = 'center';
        messageContainerStyle.zIndex = '28001';
        messageContainerStyle.color = 'black';
        messageContainerStyle.backgroundColor = 'white';
        messageContainerStyle.paddingLeft = '10px';
        messageContainerStyle.paddingRight = '10px';
        messageContainerStyle.paddingTop = '15px';
        messageContainerStyle.paddingBottom = '15px';
        messageContainerStyle.borderBottomColor = 'gray';
        messageContainerStyle.borderRightColor = 'gray';
        messageContainerStyle.borderTopColor = 'silver';
        messageContainerStyle.borderLeftColor = 'silver';
        messageContainerStyle.borderWidth = '2px';
        messageContainerStyle.borderStyle = 'solid';
        var messageElement = messageContainer.appendChild(document.createElement('div'));
        messageElement.appendChild(document.createTextNode(message));
        messageElement.className = 'ice-status-indicator-message';
        var messageElementStyle = messageElement.style;
        messageElementStyle.textAlign = 'left';
        messageElementStyle.fontSize = '14px';
        messageElementStyle.fontSize = '14px';
        messageElementStyle.fontWeight = 'bold';
        var descriptionElement = messageElement.appendChild(document.createElement('div'));
        descriptionElement.innerHTML = description;
        descriptionElement.className = 'ice-status-indicator-description';
        var descriptionElementStyle = descriptionElement.style;
        descriptionElementStyle.fontSize = '11px';
        descriptionElementStyle.marginTop = '7px';
        descriptionElementStyle.marginBottom = '7px';
        descriptionElementStyle.fontWeight = 'normal';
        var resize = function () {
            messageContainerStyle.left = ((window.width() - messageContainer.clientWidth) / 2) + 'px';
            messageContainerStyle.top = ((window.height() - messageContainer.clientHeight) / 2) + 'px';
        };
        resize();
        var clearOnResize = onResize(window, resize);
        return object(function (method) {
            method(off, function (self) {
                if (messageContainer) {
                    try {
                        document.body.removeChild(messageContainer);
                        clearOnResize();
                        off(backPanel);
                    } finally {
                        messageContainer = null;
                    }
                }
            });
        });
    }
    function BackgroundOverlay(container) {
        return function () {
            var overlay = container.ownerDocument.createElement('iframe');
            overlay.setAttribute('src', 'about:blank');
            overlay.setAttribute('frameborder', '0');
            overlay.className = 'ice-status-indicator-overlay';
            var overlayStyle = overlay.style;
            overlayStyle.top = '0';
            overlayStyle.left = '0';
            container.appendChild(overlay);
            var resize = container.tagName.toLowerCase() == 'body' ?
                function () {
                    overlayStyle.width = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) + 'px';
                    overlayStyle.height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) + 'px';
                } :
                function () {
                    overlayStyle.width = container.offsetWidth + 'px';
                    overlayStyle.height = container.offsetHeight + 'px';
                };
            resize();
            var clearOnResize = onResize(window, resize)
            return object(function (method) {
                method(off, function (self) {
                    if (overlay) {
                        try {
                            container.removeChild(overlay);
                            clearOnResize();
                        } finally {
                            overlay = null;
                        }
                    }
                });
            });
        }
    }
    function extractTagContent(tag, html) {
        var start = new RegExp('\<' + tag + '[^\<]*\>', 'g').exec(html);
        var end = new RegExp('\<\/' + tag + '\>', 'g').exec(html);
        var tagWithContent = html.substring(start.index, end.index + end[0].length);
        return tagWithContent.substring(tagWithContent.indexOf('>') + 1, tagWithContent.lastIndexOf('<'));
    }
    setupDefaultIndicators = function (container) {
        var overlay = BackgroundOverlay(container);
        var beforeSessionExpiryIndicator = object(function (method) {
            method(off, noop);
        });
        function showIndicators() {
            return !(namespace.disableDefaultErrorPopups || container.configuration.disableDefaultErrorPopups);
        }
        namespace.onServerError(function (code, html, xmlContent) {
            if (showIndicators()) {
                var message;
                var description;
                if (xmlContent) {
                    message = xmlContent.getElementsByTagName("error-message")[0].firstChild.nodeValue;
                    description = xmlContent.getElementsByTagName("error-name")[0].firstChild.nodeValue;
                } else {
                    message = extractTagContent('title', html);
                    description = extractTagContent('body', html);
                }
                PopupIndicator(message, description, overlay);
            }
        });
        namespace.onNetworkError(function () {
            if (showIndicators()) {
                PopupIndicator("Network Connection Interrupted", "Reload this page to try to reconnect.", overlay);
            }
        });
        namespace.onSessionExpiry(function () {
            if (showIndicators()) {
                off(beforeSessionExpiryIndicator);
                PopupIndicator("User Session Expired", "Reload this page to start a new user session.", overlay);
            }
        });
        namespace.onBeforeSessionExpiry(function (time) {
            if (showIndicators()) {
                beforeSessionExpiryIndicator = PopupIndicator("User Session is about to expire in " + time + " seconds.", "Reload this page to keep your current user session.", overlay);
            }
        });
    }
})();
(function() {
    if (window.addEventListener) {
        function defineRegistrationCallback(name) {
            return function registration(callback) {
                window.addEventListener(name, callback, false);
                return function removeCallbackCallback() {
                    window.removeEventListener(name, callback);
                };
            };
        }
        namespace.onOffline = defineRegistrationCallback('offline');
        namespace.onOnline = defineRegistrationCallback('online');
    } else {
        namespace.onOffline = noop;
        namespace.onOnline = noop;
    }
})();
(function() {
    function extractTagContent(tag, html) {
        var start = new RegExp('\<' + tag + '[^\<]*\>', 'g').exec(html);
        var end = new RegExp('\<\/' + tag + '\>', 'g').exec(html);
        if (start && end && start.index && end.index) {
            var tagWithContent = html.substring(start.index, end.index + end[0].length);
            return tagWithContent.substring(tagWithContent.indexOf('>') + 1, tagWithContent.lastIndexOf('<'));
        } else {
            return '';
        }
    }
    function extractAttributeValue(html, name, defaultValue) {
        var re = new RegExp(name + '="([\\S]*?)"', 'im');
        var result = html.match(re);
        return result ? result[1] : defaultValue;
    }
    function extractSrcAttribute(html) {
        return extractAttributeValue(html, 'src');
    }
    function unescapeHtml(text) {
        if (text) {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var result = temp.firstChild.data;
            temp.removeChild(temp.firstChild);
            return result;
        } else {
            return text;
        }
    }
    function stripPathParameters(url) {
        try {
            var semicolonPosition = indexOf(url, ';');
            var newURL = substring(url, 0, semicolonPosition);
            try {
                var questionPosition = indexOf(url, '?');
                return newURL + substring(url, questionPosition, url.length);
            } catch (e) {
                return newURL;
            }
        } catch (e) {
            return url;
        }
    }
    var client = Client();
    var scriptElementMatcher = /<script[^>]*>([\S\s]*?)<\/script>/igm;
    function extractAndEvaluateScripts(content) {
        var scriptTags = content.match(scriptElementMatcher);
        if (scriptTags) {
            var scripts = collect(scriptTags, function(script) {
                var src = extractSrcAttribute(script);
                var code;
                if (src) {
                    src = stripPathParameters(unescapeHtml(src));
                    if (contains(scriptRefs, src)) {
                        code = '';
                    } else {
                        getSynchronously(client, src, noop, noop, function(response) {
                            code = contentAsText(response);
                        });
                        append(scriptRefs, src);
                    }
                } else {
                    code = unescapeHtml(extractTagContent('script', script));
                }
                return code;
            });
            each(select(scripts, identity), namespace.globalEval);
        }
    }
    var linkElementMatcher = /<link[^>]*>/igm;
    function extractAndAppendStyles(content) {
        var linkTags = content.match(linkElementMatcher);
        if (linkTags) {
            var newLinkRefs = collect(select(linkTags,
                function(linkTag) {
                    return extractAttributeValue(linkTag, 'type') == 'text/css';
            }), function(linkTag) {
                    return replace(extractAttributeValue(linkTag, 'href'), '&amp;', '&');
            });
            var headElement = document.getElementsByTagName("head")[0];
            var addedLinkRefs = complement(newLinkRefs, linkRefs);
            each(addedLinkRefs, function(src) {
                var code;
                getSynchronously(client, src, noop, noop, function(response) {
                    code = contentAsText(response);
                });
                var styleElement = document.createElement('style');
                styleElement.type = 'text/css';
                headElement.appendChild(styleElement);
                if (styleElement.styleSheet) {   
                    styleElement.styleSheet.cssText = code;
                } else {                
                    var textNode = document.createTextNode(code);
                    styleElement.appendChild(textNode);
                }
            });
            linkRefs = newLinkRefs;
        }
    }
    var scriptRefs = [];
    var linkRefs = [];
    function createResourceMatching(attribute) {
        return function(result, s) {
            var src = s.getAttribute(attribute);
            if (src) {
                append(result, stripPathParameters(src));
            }
            return result;
        };
    }
    onLoad(window, function() {
        var scriptElements = document.documentElement.getElementsByTagName('script');
        inject(scriptElements, scriptRefs, createResourceMatching('src'));
    });
    onLoad(window, function() {
        var linkElements = document.documentElement.getElementsByTagName('link');
        inject(linkElements, linkRefs, createResourceMatching('href'));
    });
    function findViewRootUpdate(content) {
        return detect(content.getElementsByTagName('update'), function(update) {
            return update.getAttribute('id') == 'javax.faces.ViewRoot';
        });
    }
    onLoad(window, function() {
        document.documentElement.isHeadUpdateSuccessful = null;
    });
    namespace.onBeforeUpdate(function(content) {
        var headUpdate = detect(content.getElementsByTagName('extension'), function(update) {
            return update.getAttribute('type') == 'javax.faces.ViewHead';
        });
        var originalDocumentWrite = document.write;
        document.write = noop;
        if (headUpdate) {
            var innerContent = headUpdate.firstChild.data;
            extractAndEvaluateScripts(innerContent);
            extractAndAppendStyles(innerContent);
            document.title = extractTagContent('title', innerContent);
        }
        document.write = originalDocumentWrite;
    });
    namespace.onAfterUpdate(function(content) {
        var rootUpdate = findViewRootUpdate(content);
        if (rootUpdate && !document.documentElement.isHeadUpdateSuccessful) {
            var headContent = extractTagContent('head', rootUpdate.firstChild.data);
            extractAndEvaluateScripts(headContent);
            extractAndAppendStyles(headContent);
        } else {
            document.documentElement.isHeadUpdateSuccessful = null;
        }
        if (rootUpdate) {
            document.title = extractTagContent('title', rootUpdate.firstChild.data);
        }
    });
    namespace.onBeforeUpdate(function(updates) {
        each(updates.getElementsByTagName('update'), function(update) {
            var id = update.getAttribute('id');
            var updatedElement = lookupElementById(id);
            if (updatedElement) {
                each(updatedElement.getElementsByTagName('iframe'), function(iframe) {
                    if (iframe && iframe.parentNode) {
                        iframe.parentNode.removeChild(iframe);
                    }
                });
            }
        });
    });
    if (!/MSIE/.test(navigator.userAgent)) {
        namespace.onBeforeUpdate(function(content) {
            var rootUpdate = findViewRootUpdate(content);
            if (rootUpdate) {
                var configuration = document.body.configuration;
                if (configuration) {
                    document.documentElement.configuration = configuration;
                }
            }
        });
    }
    try {
        document.execCommand("BackgroundImageCache", false, true);
    } catch(err) {
    }
})();
    })(window.ice);
}
