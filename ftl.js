(function () {
    var _prehoveredElement, _lastPos, _cursorPos = _lastPos = {
        'x': 0,
        'y': 0
    }, _Math = Math, _pow = _Math.pow, _lock200 = function (_value) { return _Math.min(200, _Math.max(-200, _value)); }, _document = document, _dispatchEventOnObject = function (_object, _trigger, _func) {
        return _object.dispatchEvent(new CustomEvent(_trigger, {
            'detail': _func
        }));
    }, _parentNode = 'parentNode', _analyzePrediction = function (_prediction) {
        var _elementAtPoint = _document.elementFromPoint(_prediction.x, _prediction.y), _prehoveredAncestors, _lastAncestors = _prehoveredAncestors = [], _currentElement = _prehoveredElement, _classList = 'classList', _prehoverClass = 'prehover';
        if (_prehoveredElement && (!_elementAtPoint || _elementAtPoint !== _prehoveredElement)) {
            _prehoveredElement[_classList].remove(_prehoverClass);
            _dispatchEventOnObject(_prehoveredElement, "erphover");
        }
        if (_elementAtPoint && _prehoveredElement !== _elementAtPoint) {
            while (_currentElement)
                _lastAncestors.push(_currentElement = _currentElement[_parentNode]);
            _currentElement = _elementAtPoint;
            while (_currentElement)
                _prehoveredAncestors.push(_currentElement = _currentElement[_parentNode]);
            for (var _i = 0, _lastAncestors_1 = _lastAncestors; _i < _lastAncestors_1.length; _i++) {
                _currentElement = _lastAncestors_1[_i];
                if (_currentElement && _prehoveredAncestors.indexOf(_currentElement) < 0) {
                    _currentElement[_classList].remove(_prehoverClass);
                }
            }
            for (var _a = 0, _prehoveredAncestors_1 = _prehoveredAncestors; _a < _prehoveredAncestors_1.length; _a++) {
                _currentElement = _prehoveredAncestors_1[_a];
                if (_currentElement && _lastAncestors.indexOf(_currentElement) < 0) {
                    _currentElement[_classList].add(_prehoverClass);
                }
            }
            _elementAtPoint[_classList].add(_prehoverClass);
            _dispatchEventOnObject(_elementAtPoint, _prehoverClass, {
                'd': _prediction.d
            });
            _prehoveredElement = _elementAtPoint;
        }
    }, _generatePrediction = function () {
        var _delta = {
            'x': _lock200((_cursorPos.x - _lastPos.x) * 8),
            'y': _lock200((_cursorPos.y - _lastPos.y) * 8)
        }, _predictedPos = {
            'x': _cursorPos.x + _delta.x,
            'y': _cursorPos.y + _delta.y,
            'd': _pow(_pow(_delta.x, 2) + _pow(_delta.y, 2), .5)
        };
        _dispatchEventOnObject(_document, "precursormove", {
            'x': _predictedPos.x,
            'y': _predictedPos.y,
            'd': _predictedPos.d
        });
        _analyzePrediction(_predictedPos);
        _lastPos = _cursorPos;
    }, _processMouseMove = function (_event) {
        _cursorPos = {
            'x': _event.clientX,
            'y': _event.clientY
        };
        _generatePrediction();
    };
    _document.addEventListener("mousemove", _processMouseMove);
})();
