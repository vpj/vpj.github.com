var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "./note", "./note_elem", "./project"], function (require, exports, note_1, note_elem_1, project_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PADDING = 5;
    var MARGIN_FIRST = 30;
    var MARGIN_OTHER = 5;
    var Notes = /** @class */ (function () {
        function Notes(container) {
            var _this = this;
            this.onSearch = function () {
                var search = _this.searchElem.value;
                if (search === _this.searchTerm) {
                    return;
                }
                project_1.Project.instance().searchNotes(search);
            };
            this.onNoteClick = function (path, key) { return __awaiter(_this, void 0, void 0, function () {
                var note, lineNo, y;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            note = this.notes[path][key];
                            if (!(this.selected === note)) return [3 /*break*/, 1];
                            this.clearSelected();
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, this.select(path, key)];
                        case 2:
                            lineNo = _a.sent();
                            y = note.elem.getBoundingClientRect().top;
                            // note.elem.style.transform = 'translateY(0px)'
                            // let transformStyle = note.elem.style.transform;
                            // y = parseInt(transformStyle.replace(/[^\d.]/g, ''))
                            if (lineNo != null) {
                                project_1.Project.instance().sourceView.scroll(path, lineNo, y);
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            this.onUpdate = function (note, isSaveOnly, start, end, content) {
                if (!isSaveOnly) {
                    if (_this.selected === note) {
                        _this.clearSelected();
                    }
                    _this.remove(note);
                    if (content != null && content.trim() != '') {
                        var newNote = _this.create(note.note.path, content, start, end, note.note.toJSON());
                        _this.select(newNote.note.path, newNote.key).then(function () {
                        });
                    }
                }
                project_1.Project.instance().updateNotes(note.note.path, _this.toJSON());
            };
            this.onCollapseCode = function (path, key) {
                var note = _this.notes[path][key];
                var match = note.match;
                if (note.note.codeCollapsed) {
                    project_1.Project.instance().sourceView.setCollapsedHeader(note.note.path, match.start, true);
                    for (var i = match.start + 1; i <= match.end; ++i) {
                        project_1.Project.instance().sourceView.setCollapsed(note.note.path, i, true);
                    }
                }
                else {
                    project_1.Project.instance().sourceView.setCollapsedHeader(note.note.path, match.start, false);
                    for (var i = match.start + 1; i <= match.end; ++i) {
                        project_1.Project.instance().sourceView.setCollapsed(note.note.path, i, false);
                    }
                }
                project_1.Project.instance().updateNotes(note.note.path, _this.toJSON());
            };
            this.notes = {};
            this.notesCount = 0;
            this.container = container;
            this.selected = null;
            this.selectedFile = null;
            this.renderedNotes = [];
            this.searchElem = document.getElementById('notes_search');
            this.searchElem.addEventListener('keyup', this.onSearch);
            this.searchElem.addEventListener('change', this.onSearch);
            this.searchElem.addEventListener('paste', this.onSearch);
            this.state = 0;
        }
        Notes.prototype.search = function (search) {
            this.searchTerm = search;
            this.selectedFile = null;
            var selected = [];
            for (var path in this.notes) {
                var notes = this.notes[path];
                for (var key in notes) {
                    var note = notes[key];
                    if (note.note.note.toLowerCase().indexOf(search) !== -1) {
                        selected.push(note);
                    }
                }
            }
            project_1.Project.instance().sourceView.searchMode();
            this.renderSelectedLines(selected);
        };
        Notes.prototype.selectDefault = function () {
            var _this = this;
            var note = null;
            var collapsedNote = null;
            for (var _i = 0, _a = this.renderedNotes; _i < _a.length; _i++) {
                var n = _a[_i];
                if (n.note.collapsed || n.note.codeCollapsed) {
                    if (collapsedNote == null) {
                        collapsedNote = n;
                    }
                }
                else {
                    if (note == null) {
                        note = n;
                    }
                }
            }
            if (note == null) {
                note = collapsedNote;
            }
            if (note == null) {
                return;
            }
            var state = this.state;
            window.requestAnimationFrame(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (state !== this.state) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.select(note.note.path, note.key)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        Notes.prototype.renderNote = function (note) {
            this.state++;
            note.render();
            var nextNoteIdx = null;
            var match = note.match;
            var path = note.note.path;
            var rank = project_1.Project.instance().sourceView.getRenderedLineRank(path, match.start);
            for (var i = 0; i < this.renderedNotes.length; ++i) {
                var n = this.renderedNotes[i];
                var r = project_1.Project.instance().sourceView.getRenderedLineRank(n.note.path, n.match.start);
                if (r > rank) {
                    nextNoteIdx = i;
                    break;
                }
            }
            note.update();
            if (nextNoteIdx == null) {
                this.container.appendChild(note.elem);
                this.renderedNotes.push(note);
            }
            else {
                this.container.insertBefore(note.elem, this.renderedNotes[nextNoteIdx].elem);
                this.renderedNotes.splice(nextNoteIdx, 0, note);
            }
            if (match.start > match.end) {
                return;
            }
            for (var i = match.start; i <= match.start; ++i) {
                project_1.Project.instance().sourceView.addComment(path, i, note.key);
            }
            if (note.note.codeCollapsed) {
                project_1.Project.instance().sourceView.setCollapsedHeader(path, match.start, true);
                for (var i = match.start + 1; i <= match.end; ++i) {
                    project_1.Project.instance().sourceView.setCollapsed(path, i, true);
                }
            }
        };
        Notes.prototype.addNote = function (note) {
            var match = project_1.Project.instance().sourceMatcher.match(note);
            var key = "" + this.notesCount;
            var elem = new note_elem_1.NoteElem(key, note, match, this.onNoteClick, this.onUpdate, this.onCollapseCode);
            this.notesCount++;
            if (!(note.path in this.notes)) {
                this.notes[note.path] = {};
            }
            this.notes[note.path][key] = elem;
            return elem;
        };
        Notes.prototype.load = function (notes) {
            this.notes = {};
            this.notesCount = 0;
            this.selected = null;
            this.container.innerHTML = '';
            for (var path in notes) {
                for (var _i = 0, _a = notes[path]; _i < _a.length; _i++) {
                    var n = _a[_i];
                    var note = new note_1.Note(path, n);
                    this.addNote(note);
                }
            }
        };
        Notes.prototype.removeAll = function () {
            this.state++;
            for (var _i = 0, _a = this.renderedNotes; _i < _a.length; _i++) {
                var n = _a[_i];
                n.remove();
            }
            this.renderedNotes = [];
            this.selected = null;
        };
        Notes.prototype.selectFile = function (path) {
            this.selectedFile = path;
            this.searchTerm = null;
            this.removeAll();
            var notes = this.notes[path];
            for (var k in notes) {
                this.renderNote(notes[k]);
            }
            this.selectDefault();
        };
        Notes.prototype.selectLines = function (selectedLines) {
            this.searchTerm = null;
            this.selectedFile = null;
            var selected = [];
            for (var path in selectedLines) {
                var notes = this.notes[path];
                var lines = selectedLines[path];
                for (var key in notes) {
                    var note = notes[key];
                    if (lines[note.match.start]) {
                        selected.push(note);
                    }
                }
            }
            this.renderSelectedLines(selected);
        };
        Notes.prototype.renderSelectedLines = function (selected) {
            for (var _i = 0, selected_1 = selected; _i < selected_1.length; _i++) {
                var note = selected_1[_i];
                project_1.Project.instance().sourceView.selectLines(note.note.path, note.match.start - 3, note.match.end + 3);
            }
            project_1.Project.instance().sourceView.renderSelectedLines();
            this.removeAll();
            for (var _a = 0, selected_2 = selected; _a < selected_2.length; _a++) {
                var note = selected_2[_a];
                this.renderNote(note);
            }
            this.selectDefault();
        };
        Notes.prototype.create = function (path, text, start, end, opt) {
            var pre = [];
            var code = [];
            var post = [];
            for (var i = -PADDING; i < 0; ++i) {
                var line = project_1.Project.instance().sourceView.getCode(path, start + i);
                if (line != null) {
                    pre.push(line.code);
                }
            }
            for (var i = start; i <= end; ++i) {
                code.push(project_1.Project.instance().sourceView.getCode(path, i).code);
            }
            for (var i = 1; i <= PADDING; ++i) {
                var line = project_1.Project.instance().sourceView.getCode(path, end + i);
                if (line != null) {
                    post.push(line.code);
                }
            }
            var note = note_1.Note.create(path, pre, post, code, text, opt);
            var noteElem = this.addNote(note);
            this.renderNote(noteElem);
            return noteElem;
        };
        Notes.prototype.remove = function (note) {
            if (!note.isRendered()) {
                return;
            }
            var path = note.note.path;
            delete this.notes[path][note.key];
            note.remove();
            for (var i = 0; i < this.renderedNotes.length; ++i) {
                if (this.renderedNotes[i] === note) {
                    this.renderedNotes.splice(i, 1);
                    break;
                }
            }
            var match = note.match;
            if (match.start > match.end) {
                return;
            }
            for (var i = match.start; i <= match.start; ++i) {
                project_1.Project.instance().sourceView.removeComment(path, i, note.key);
            }
            if (note.note.codeCollapsed) {
                project_1.Project.instance().sourceView.setCollapsedHeader(path, match.start, false);
                for (var i = match.start + 1; i <= match.end; ++i) {
                    project_1.Project.instance().sourceView.setCollapsed(path, i, false);
                }
            }
        };
        Notes.prototype.newNote = function (path, start, end) {
            var noteElem = this.create(path, '', start, end, {});
            this.select(path, noteElem.key).then(function () {
            });
            noteElem.edit();
        };
        Notes.prototype.setNoteLines = function (path, start, end) {
            if (!this.selected) {
                return false;
            }
            var selected = this.selected;
            return selected.setNoteLines(path, start, end);
        };
        Notes.prototype.moveToLine = function (path, lineNo) {
            var commentKeys = project_1.Project.instance().sourceView.getCommentKeys(path, lineNo);
            var key = commentKeys.keys()[0];
            this.select(path, key).then(function () {
            });
        };
        Notes.prototype.clearSelected = function () {
            if (this.selected) {
                var oldNote = this.notes[this.selected.note.path][this.selected.key];
                oldNote.unselect();
                for (var i = oldNote.match.start; i <= oldNote.match.end; ++i) {
                    project_1.Project.instance().sourceView.setSelected(this.selected.note.path, i, false);
                }
                this.selected = null;
                if (oldNote.note.note.trim() == '') {
                    this.remove(oldNote);
                }
            }
        };
        Notes.prototype.resetTransforms = function () {
            for (var _i = 0, _a = this.renderedNotes; _i < _a.length; _i++) {
                var note = _a[_i];
                note.resetTransform();
            }
        };
        Notes.prototype.getAlignmentTransform = function (note) {
            if (note.match.start > note.match.end) {
                return 0.;
            }
            var start = note.match.start;
            // let isFirst = this.renderedNotes[0] === note && this.selected == note
            var isFirst = this.renderedNotes[0] === this.selected;
            var path = note.note.path;
            var y = project_1.Project.instance().sourceView.getY(path, start);
            var yn = note.getY();
            var transform = y - yn;
            if (isFirst)
                transform -= MARGIN_FIRST;
            else
                transform -= MARGIN_OTHER;
            return transform;
        };
        Notes.prototype.align = function (note) {
            var transform = this.getAlignmentTransform(note);
            note.setTransform(transform);
            var idx = this.renderedNotes.length;
            for (var i = 0; i < this.renderedNotes.length; ++i) {
                if (this.renderedNotes[i] == note) {
                    idx = i;
                    break;
                }
            }
            var prev = transform;
            for (var i = idx - 1; i >= 0; --i) {
                var n = this.renderedNotes[i];
                var t = this.getAlignmentTransform(n);
                t = Math.min(prev, t);
                n.setTransform(t);
                prev = t;
            }
            prev = transform;
            for (var i = idx + 1; i < this.renderedNotes.length; ++i) {
                var n = this.renderedNotes[i];
                var t = this.getAlignmentTransform(n);
                t = Math.max(prev, t);
                n.setTransform(t);
                prev = t;
            }
        };
        Notes.prototype.select = function (path, key) {
            var _this = this;
            this.clearSelected();
            var note = this.notes[path][key];
            note.select();
            for (var i = note.match.start; i <= note.match.end; ++i) {
                project_1.Project.instance().sourceView.setSelected(path, i, true);
            }
            this.selected = note;
            this.resetTransforms();
            var state = this.state;
            return new Promise(function (resolve) {
                window.requestAnimationFrame(function () {
                    if (_this.state !== state) {
                        return resolve(null);
                    }
                    _this.align(note);
                    // let transform = this.getAlignmentTransform(note)
                    // note.setTransform(transform)
                    // this.container.style.transform = `translateY(${transform}px)`
                    if (note.match.start > note.match.end) {
                        return resolve(null);
                    }
                    resolve(note.match.start);
                });
            });
        };
        Notes.prototype.toJSON = function () {
            var allNotes = {};
            for (var path in this.notes) {
                var json = [];
                for (var k in this.notes[path]) {
                    var n = this.notes[path][k];
                    json.push(n.note.toJSON());
                }
                allNotes[path] = json;
            }
            return allNotes;
        };
        return Notes;
    }());
    exports.Notes = Notes;
});
