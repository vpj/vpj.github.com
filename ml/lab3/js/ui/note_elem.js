define(["require", "exports", "./markdown", "../lib/weya/weya"], function (require, exports, markdown_1, weya_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NoteEditElem = /** @class */ (function () {
        function NoteEditElem(saveListener) {
            var _this = this;
            this.elem = weya_1.Weya('div.edit', function ($) {
                _this.start = $('input', { type: 'number' });
                _this.end = $('input', { type: 'number' });
                _this.textArea = $('textarea');
                _this.button = $('button', 'Save', { on: { click: saveListener } });
            });
        }
        NoteEditElem.prototype.focusEdit = function () {
            this.textArea.focus();
        };
        NoteEditElem.prototype.setContent = function (text, match) {
            this.textArea.value = text;
            this.start.value = "" + (match.start + 1);
            this.end.value = "" + (match.end + 1);
        };
        NoteEditElem.prototype.getContent = function () {
            return this.textArea.value;
        };
        NoteEditElem.prototype.getStart = function () {
            return parseInt(this.start.value) - 1;
        };
        NoteEditElem.prototype.getEnd = function () {
            return parseInt(this.end.value) - 1;
        };
        NoteEditElem.prototype.setStart = function (lineNo) {
            return this.start.value = "" + (lineNo + 1);
        };
        NoteEditElem.prototype.setEnd = function (lineNo) {
            return this.end.value = "" + (lineNo + 1);
        };
        return NoteEditElem;
    }());
    var NoteViewControls = /** @class */ (function () {
        function NoteViewControls(editListener, removeListener, collapseListener, codeCollapseListener, viewCodeListener) {
            this.elem = weya_1.Weya('div.view_controls', function ($) {
                $('i.fa.fa-compress-arrows-alt', { on: { click: collapseListener } });
                $('i.fa.fa-expand-arrows-alt', { on: { click: collapseListener } });
                $('i.fa.fa-minus-square', { on: { click: codeCollapseListener } });
                $('i.fa.fa-plus-square', { on: { click: codeCollapseListener } });
                $('i.fa.fa-code', { on: { click: viewCodeListener } });
                $('i.fa.fa-edit', { on: { click: editListener } });
                $('i.fa.fa-trash', { on: { click: removeListener } });
            });
        }
        return NoteViewControls;
    }());
    var CodeElem = /** @class */ (function () {
        function CodeElem(note) {
            var _this = this;
            this.elem = weya_1.Weya('div.node_code', function ($) {
                $('pre', function ($) {
                    _this.createLines($, '.pre', note.pre);
                    _this.createLines($, '.note_code', note.code);
                    _this.createLines($, '.post', note.post);
                });
            });
        }
        CodeElem.prototype.createLines = function ($, className, lines) {
            $("div" + className, function ($) {
                for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                    var line = lines_1[_i];
                    line = line === '' ? ' ' : line;
                    $('div.line', line);
                }
            });
        };
        return CodeElem;
    }());
    var NoteElem = /** @class */ (function () {
        function NoteElem(key, note, match, clickListener, updateListener, collapseListener) {
            var _this = this;
            this.onViewCode = function () {
                if (!_this.isViewCode) {
                    _this.elem.classList.add('viewing_code');
                }
                else {
                    _this.elem.classList.remove('viewing_code');
                }
            };
            this.onCodeCollapse = function () {
                _this.note.codeCollapsed = !_this.note.codeCollapsed;
                _this.setCodeCollapseCss();
                _this.collapseListener(_this.note.path, _this.key);
            };
            this.onCollapse = function () {
                _this.note.collapsed = !_this.note.collapsed;
                _this.setCollapseCss();
                _this.updateListener(_this, true, null, null, null);
            };
            this.onEdit = function () {
                _this.edit();
            };
            this.onRemove = function () {
                _this.updateListener(_this, false, null, null, null);
            };
            this.onSave = function () {
                var start = _this.editElem.getStart();
                var end = _this.editElem.getEnd();
                var content = _this.editElem.getContent();
                _this.updateListener(_this, false, start, end, content);
            };
            this.onClick = function () {
                _this.clickListener(_this.note.path, _this.key);
            };
            this.key = key;
            this.note = note;
            this.match = match;
            this.clickListener = clickListener;
            this.updateListener = updateListener;
            this.collapseListener = collapseListener;
            this.elem = null;
        }
        NoteElem.prototype.render = function () {
            var _this = this;
            this.elem = weya_1.Weya('div.note', function ($) {
                _this.view = $('div.view');
            });
            if (this.match.codeScore < 1) {
                this.elem.classList.add('code_mismatch');
            }
            else if (this.match.score < 1) {
                this.elem.classList.add('mismatch');
            }
            this.viewControls = new NoteViewControls(this.onEdit, this.onRemove, this.onCollapse, this.onCodeCollapse, this.onViewCode);
            this.elem.appendChild(this.viewControls.elem);
            this.editElem = new NoteEditElem(this.onSave);
            this.elem.appendChild(this.editElem.elem);
            this.codeElem = new CodeElem((this.note));
            this.elem.appendChild((this.codeElem.elem));
            this.view.addEventListener('click', this.onClick);
            this.setCollapseCss();
            this.setCodeCollapseCss();
        };
        NoteElem.prototype.isRendered = function () {
            return this.elem !== null;
        };
        NoteElem.prototype.isEditing = function () {
            if (!this.isRendered()) {
                return false;
            }
            return this.elem.classList.contains('editing');
        };
        Object.defineProperty(NoteElem.prototype, "isViewCode", {
            get: function () {
                return this.elem.classList.contains('viewing_code');
            },
            enumerable: true,
            configurable: true
        });
        NoteElem.prototype.setCollapseCss = function () {
            if (this.note.collapsed) {
                this.elem.classList.remove('editing');
                this.elem.classList.add('collapsed');
            }
            else {
                this.elem.classList.remove('collapsed');
            }
        };
        NoteElem.prototype.setCodeCollapseCss = function () {
            if (this.note.codeCollapsed) {
                this.elem.classList.remove('editing');
                this.elem.classList.add('code_collapsed');
            }
            else {
                this.elem.classList.remove('code_collapsed');
            }
        };
        NoteElem.prototype.resetTransform = function () {
            this.elem.style.transform = null;
        };
        NoteElem.prototype.setTransform = function (y) {
            this.elem.style.transform = "translateY(" + y + "px)";
        };
        NoteElem.prototype.edit = function (isFocus) {
            if (isFocus === void 0) { isFocus = true; }
            this.elem.classList.add('editing');
            this.elem.classList.remove('viewing_code');
            this.editElem.setContent(this.note.note, this.match);
            if (isFocus) {
                this.editElem.focusEdit();
            }
        };
        NoteElem.prototype.update = function () {
            var _this = this;
            var html = markdown_1.MarkDown.render(this.note.note);
            this.view.innerHTML = html;
            var scripts = this.view.getElementsByTagName('script');
            for (var i = 0; i < scripts.length; ++i) {
                var s = scripts[i];
                s.innerText = s.innerHTML.replace(/&amp;/g, '&');
            }
            window.requestAnimationFrame(function () {
                return markdown_1.MathJax.Hub.Queue(['Typeset', markdown_1.MathJax.Hub, _this.view]);
            });
        };
        NoteElem.prototype.remove = function () {
            this.elem.parentElement.removeChild(this.elem);
            this.elem = null;
        };
        NoteElem.prototype.getY = function () {
            return this.elem.offsetTop;
        };
        NoteElem.prototype.select = function () {
            this.elem.classList.add("selected");
            if (this.match.score < 1) {
                this.edit(false);
            }
        };
        NoteElem.prototype.unselect = function () {
            this.elem.classList.remove('editing');
            this.elem.classList.remove("selected");
            this.elem.classList.remove('viewing_code');
        };
        NoteElem.prototype.setNoteLines = function (path, start, end) {
            if (this.note.path != path) {
                return false;
            }
            if (!this.isEditing()) {
                return false;
            }
            this.editElem.setStart(start);
            this.editElem.setEnd(end);
            return true;
        };
        return NoteElem;
    }());
    exports.NoteElem = NoteElem;
});
