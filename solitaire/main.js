var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("util/Point", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Point = /** @class */ (function () {
        function Point(x, y) {
            this.x = 0;
            this.y = 0;
            this.x = x;
            this.y = y;
        }
        Point.prototype.distance = function (point) {
            return Math.sqrt((point.x - this.x) * (point.x - this.x) +
                (point.y - this.y) * (point.y - this.y));
        };
        return Point;
    }());
    exports.Point = Point;
});
define("views/View", ["require", "exports", "util/Point"], function (require, exports, Point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var View = /** @class */ (function () {
        function View() {
            this.position = new Point_1.Point(0, 0);
            this.size = new Point_1.Point(0, 0);
            this.g = document.createElementNS(View.SVG_NAMESPACE, "g");
        }
        View.prototype.render = function () {
            while (this.g.lastChild) {
                this.g.removeChild(this.g.lastChild);
            }
            this.g.setAttribute("transform", "translate(" + this.position.x + ", " + this.position.y + ")");
        };
        View.prototype.setTransform = function (position) {
            this.g.style.transform = "matrix3d(\n            1, 0, 0, 0,\n            0, 1, 0, 0,\n            0, 0, 1, 0,\n            " + position.x + ", " + position.y + ", 0, 1)";
        };
        View.prototype.clearTransform = function () {
            this.g.style.removeProperty("transform");
        };
        View.SVG_NAMESPACE = "http://www.w3.org/2000/svg";
        return View;
    }());
    exports.View = View;
});
define("views/Draggable", ["require", "exports", "views/View"], function (require, exports, View_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Draggable = /** @class */ (function (_super) {
        __extends(Draggable, _super);
        function Draggable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isDragging = false;
            return _this;
        }
        return Draggable;
    }(View_1.View));
    exports.Draggable = Draggable;
});
define("views/PileView", ["require", "exports", "views/View"], function (require, exports, View_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PileView = /** @class */ (function (_super) {
        __extends(PileView, _super);
        function PileView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PileView.prototype.clearDragged = function () {
        };
        return PileView;
    }(View_2.View));
    exports.PileView = PileView;
});
define("models/Suit", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Suit;
    (function (Suit) {
        Suit[Suit["Club"] = 0] = "Club";
        Suit[Suit["Diamond"] = 1] = "Diamond";
        Suit[Suit["Heart"] = 2] = "Heart";
        Suit[Suit["Spade"] = 3] = "Spade";
    })(Suit || (Suit = {}));
    exports.Suit = Suit;
    var SuitUtil = /** @class */ (function () {
        function SuitUtil() {
        }
        SuitUtil.getSymbol = function (suit) {
            switch (suit) {
                case Suit.Club:
                    return "♣";
                case Suit.Diamond:
                    return "♦";
                case Suit.Heart:
                    return "♥";
                case Suit.Spade:
                    return "♠";
            }
        };
        SuitUtil.isRed = function (suit) {
            switch (suit) {
                case Suit.Club:
                case Suit.Spade:
                    return false;
                case Suit.Diamond:
                case Suit.Heart:
                    return true;
            }
        };
        SuitUtil.Suits = [Suit.Club, Suit.Diamond, Suit.Heart, Suit.Spade];
        return SuitUtil;
    }());
    exports.SuitUtil = SuitUtil;
});
define("models/Rank", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Rank;
    (function (Rank) {
        Rank[Rank["Ace"] = 0] = "Ace";
        Rank[Rank["Two"] = 1] = "Two";
        Rank[Rank["Three"] = 2] = "Three";
        Rank[Rank["Four"] = 3] = "Four";
        Rank[Rank["Five"] = 4] = "Five";
        Rank[Rank["Six"] = 5] = "Six";
        Rank[Rank["Seven"] = 6] = "Seven";
        Rank[Rank["Eight"] = 7] = "Eight";
        Rank[Rank["Nine"] = 8] = "Nine";
        Rank[Rank["Ten"] = 9] = "Ten";
        Rank[Rank["Jack"] = 10] = "Jack";
        Rank[Rank["Queen"] = 11] = "Queen";
        Rank[Rank["King"] = 12] = "King";
    })(Rank || (Rank = {}));
    exports.Rank = Rank;
    var RankUtil = /** @class */ (function () {
        function RankUtil() {
        }
        RankUtil.getSymbol = function (rank) {
            switch (rank) {
                case Rank.Ace:
                    return "A";
                case Rank.Jack:
                    return "J";
                case Rank.Queen:
                    return "Q";
                case Rank.King:
                    return "K";
                default:
                    return "" + (rank + 1);
            }
        };
        RankUtil.Ranks = [Rank.Ace,
            Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten,
            Rank.Jack, Rank.Queen, Rank.King];
        return RankUtil;
    }());
    exports.RankUtil = RankUtil;
});
define("models/Card", ["require", "exports", "models/Suit"], function (require, exports, Suit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Card = /** @class */ (function () {
        function Card(suit, rank) {
            this.suit = suit;
            this.rank = rank;
        }
        Card.prototype.canFan = function (next) {
            if (this.rank != next.rank + 1) {
                return false;
            }
            if (Suit_1.SuitUtil.isRed(this.suit) == Suit_1.SuitUtil.isRed(next.suit)) {
                return false;
            }
            return true;
        };
        Card.prototype.canPile = function (next) {
            if (this.suit != next.suit) {
                return false;
            }
            if (this.rank + 1 != next.rank) {
                return false;
            }
            return true;
        };
        return Card;
    }());
    exports.Card = Card;
});
define("views/CardView", ["require", "exports", "views/Draggable", "views/View", "models/Rank", "models/Suit"], function (require, exports, Draggable_1, View_3, Rank_1, Suit_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CardView = /** @class */ (function (_super) {
        __extends(CardView, _super);
        function CardView(card) {
            var _this = _super.call(this) || this;
            _this.isOpen = false;
            _this.card = card;
            return _this;
        }
        CardView.prototype.close = function () {
            this.isOpen = false;
            if (this.g != null) {
                this.g.setAttribute("class", "card card-close");
            }
        };
        CardView.prototype.open = function () {
            this.isOpen = true;
            if (this.g != null) {
                this.g.setAttribute("class", "card card-open");
            }
        };
        CardView.prototype.render = function () {
            _super.prototype.render.call(this);
            var rect = document.createElementNS(View_3.View.SVG_NAMESPACE, "rect");
            rect.setAttribute("width", this.size.x.toString());
            rect.setAttribute("height", this.size.y.toString());
            this.g.appendChild(rect);
            if (this.isOpen) {
                this.g.setAttribute("class", "card suit-" + Suit_2.Suit[this.card.suit] + " card-open");
                rect.setAttribute("fill", "red");
                var yTop = this.size.x / 2.2;
                this.g.appendChild(this.createText(Rank_1.RankUtil.getSymbol(this.card.rank), this.size.x * 0.25, yTop));
                this.g.appendChild(this.createText(Suit_2.SuitUtil.getSymbol(this.card.suit), this.size.x * 0.75, yTop));
                this.g.appendChild(this.createText(Suit_2.SuitUtil.getSymbol(this.card.suit), this.size.x * 0.5, yTop + this.size.y * 0.5));
            }
            else {
                this.g.setAttribute("class", "card card-close");
                rect.setAttribute("fill", "black");
            }
        };
        CardView.prototype.createText = function (text, x, y) {
            var elem = document.createElementNS(View_3.View.SVG_NAMESPACE, "text");
            elem.textContent = text;
            elem.style.fontSize = "" + this.size.x / 2.2;
            elem.setAttribute("x", x.toString());
            elem.setAttribute("y", y.toString());
            return elem;
        };
        CardView.prototype.isInside = function (x, y) {
            return x >= this.position.x && y >= this.position.y &&
                x < this.position.x + this.size.x && y < this.position.y + this.size.y;
        };
        CardView.createHolder = function (size) {
            var rect = document.createElementNS(View_3.View.SVG_NAMESPACE, "rect");
            rect.setAttribute("class", "holder");
            rect.setAttribute("width", size.x.toString());
            rect.setAttribute("height", size.y.toString());
            return rect;
        };
        return CardView;
    }(Draggable_1.Draggable));
    exports.CardView = CardView;
});
define("models/Fan", ["require", "exports", "models/Rank"], function (require, exports, Rank_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Fan = /** @class */ (function () {
        function Fan() {
        }
        Object.defineProperty(Fan.prototype, "first", {
            get: function () {
                return this.card;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Fan.prototype, "last", {
            get: function () {
                if (this.fan == null) {
                    return this.card;
                }
                else {
                    return this.fan.last;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Fan.prototype, "isEmpty", {
            get: function () {
                return this.card == null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Fan.prototype, "isSingle", {
            get: function () {
                return this.card != null && this.fan == null;
            },
            enumerable: true,
            configurable: true
        });
        Fan.prototype.addFan = function (fan) {
            if (this.card == null) {
                this.card = fan.card;
                this.fan = fan.fan;
            }
            else if (this.fan == null) {
                this.fan = fan;
            }
            else {
                this.fan.addFan(fan);
            }
        };
        Fan.prototype.addCard = function (card) {
            if (this.card == null) {
                this.card = card;
            }
            else if (this.fan == null) {
                this.fan = new Fan();
                this.fan.addCard(card);
            }
            else {
                this.fan.addCard(card);
            }
        };
        Fan.prototype.removeFan = function () {
            this.fan = null;
        };
        Fan.prototype.canFanCard = function (card) {
            if (this.card == null) {
                return card.rank == Rank_2.Rank.King;
            }
            else if (this.fan == null) {
                return this.card.canFan(card);
            }
            else {
                return this.fan.canFanCard(card);
            }
        };
        Fan.prototype.canFanFan = function (fan) {
            if (fan.isEmpty) {
                return false;
            }
            if (this.card == null) {
                return fan.card.rank == Rank_2.Rank.King;
            }
            else if (this.fan == null) {
                return this.card.canFan(fan.card);
            }
            else {
                return this.fan.canFanFan(fan);
            }
        };
        return Fan;
    }());
    exports.Fan = Fan;
});
define("util/Consts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Consts = /** @class */ (function () {
        function Consts() {
        }
        Consts.FanGapFactor = 0.3;
        Consts.ClosedGapFactor = 0.1;
        Consts.Margin = 16;
        Consts.AnimationVelocity = 1 / 30;
        return Consts;
    }());
    exports.Consts = Consts;
});
define("views/FanView", ["require", "exports", "views/Draggable", "views/LayoutView", "models/Fan", "util/Point", "util/Consts"], function (require, exports, Draggable_2, LayoutView_1, Fan_1, Point_2, Consts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FanView = /** @class */ (function (_super) {
        __extends(FanView, _super);
        function FanView(fan) {
            var _this = _super.call(this) || this;
            _this.card = null;
            _this.child = null;
            _this._isDragging = false;
            _this.fan = fan;
            return _this;
        }
        Object.defineProperty(FanView.prototype, "isDragging", {
            get: function () {
                return this._isDragging;
            },
            set: function (value) {
                this._isDragging = value;
                if (this.card != null) {
                    this.card.isDragging = value;
                }
                if (this.child != null) {
                    this.child.isDragging = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        FanView.prototype.canAddCard = function (card) {
            return this.fan.canFanCard(card.card);
        };
        FanView.prototype.addCard = function (card) {
            /*if(!this.canAddCard(card)) {
                throw new Error("Can't add card")
            }*/
            if (this.card == null) {
                this.card = card;
                this.fan.addCard(card.card);
                this.render();
            }
            else if (this.child == null) {
                var fan = new Fan_1.Fan();
                this.child = new FanView(fan);
                this.child.addCard(card);
                this.fan.addFan(fan);
                this.render();
            }
            else {
                this.child.addCard(card);
            }
        };
        FanView.prototype.canAddFan = function (fan) {
            return this.fan.canFanFan(fan.fan);
        };
        FanView.prototype.addFan = function (fan) {
            if (!this.canAddFan(fan)) {
                throw new Error("Can't add fan");
            }
            if (this.card == null) {
                throw new Error("Can't add to a empty fan");
            }
            if (this.child == null) {
                this.child = fan;
                this.fan.addFan(fan.fan);
                this.render();
            }
            else {
                this.child.addFan(fan);
            }
        };
        FanView.prototype.render = function () {
            _super.prototype.render.call(this);
            if (this.card != null) {
                this.card.position = new Point_2.Point(0, 0);
                this.card.size = this.size;
                this.card.render();
                this.g.appendChild(this.card.g);
            }
            if (this.child != null) {
                this.child.position = new Point_2.Point(0, Consts_1.Consts.FanGapFactor * this.size.y);
                this.child.size = this.size;
                this.child.render();
                this.g.appendChild(this.child.g);
            }
        };
        FanView.prototype.isInside = function (x, y) {
            x -= this.position.x;
            y -= this.position.y;
            if (this.child != null && this.child.isInside(x, y)) {
                return true;
            }
            if (this.card != null && this.card.isInside(x, y)) {
                return true;
            }
            return false;
        };
        FanView.prototype.getDraggable = function (x, y) {
            x -= this.position.x;
            y -= this.position.y;
            if (this.child == null) {
                return null;
            }
            if (this.child.isInside(x, y)) {
                var draggable = this.child.getDraggable(x, y);
                if (draggable != null) {
                    return draggable;
                }
                this.fan.removeFan();
                draggable = this.child;
                this.child = null;
                draggable.position = LayoutView_1.LayoutView.getAbsolutePosition(draggable.g);
                this.render();
                return draggable;
            }
            else {
                return null;
            }
        };
        Object.defineProperty(FanView.prototype, "dropPoint", {
            get: function () {
                if (this.card == null) {
                    return this.position;
                }
                if (this.child == null) {
                    return new Point_2.Point(0, Consts_1.Consts.FanGapFactor * this.size.y);
                }
                else {
                    var point = this.child.dropPoint;
                    return new Point_2.Point(point.x + this.child.position.x, point.y + this.child.position.y);
                }
            },
            enumerable: true,
            configurable: true
        });
        FanView.prototype.removeLast = function () {
            if (this.child.fan.isSingle) {
                this.fan.removeFan();
                var card = this.child.card;
                this.child = null;
                card.position = LayoutView_1.LayoutView.getAbsolutePosition(card.g);
                this.render();
                return card;
            }
            else {
                return this.child.removeLast();
            }
        };
        return FanView;
    }(Draggable_2.Draggable));
    exports.FanView = FanView;
});
define("models/FoundationPile", ["require", "exports", "models/Rank"], function (require, exports, Rank_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FoundationPile = /** @class */ (function () {
        function FoundationPile() {
            this.cards = new Array();
        }
        FoundationPile.prototype.canAdd = function (card) {
            var length = this.cards.length;
            if (length == 0) {
                return card.rank == Rank_3.Rank.Ace;
            }
            else {
                return this.cards[length - 1].canPile(card);
            }
        };
        FoundationPile.prototype.add = function (card) {
            this.cards.push(card);
        };
        FoundationPile.prototype.removeLast = function () {
            this.cards.splice(-1, 1);
        };
        return FoundationPile;
    }());
    exports.FoundationPile = FoundationPile;
});
define("views/FoundationPileView", ["require", "exports", "views/PileView", "views/CardView", "views/FanView", "views/LayoutView", "util/Point"], function (require, exports, PileView_1, CardView_1, FanView_1, LayoutView_2, Point_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FoundationPileView = /** @class */ (function (_super) {
        __extends(FoundationPileView, _super);
        function FoundationPileView(foundationPile) {
            var _this = _super.call(this) || this;
            _this.cards = new Array();
            _this.foundationPile = foundationPile;
            for (var _i = 0, _a = foundationPile.cards; _i < _a.length; _i++) {
                var card = _a[_i];
                var cardView = new CardView_1.CardView(card);
                cardView.close();
                _this.cards.push(cardView);
            }
            return _this;
        }
        FoundationPileView.prototype.render = function () {
            _super.prototype.render.call(this);
            if (this.cards.length == 0) {
                var holder = CardView_1.CardView.createHolder(this.size);
                this.g.appendChild(holder);
            }
            else {
                var card = this.cards[this.cards.length - 1];
                card.position = new Point_3.Point(0, 0);
                card.size = this.size;
                card.render();
                this.g.appendChild(card.g);
            }
        };
        FoundationPileView.prototype.addCard = function (card) {
            this.cards.push(card);
            this.foundationPile.add(card.card);
            this.render();
        };
        FoundationPileView.prototype.canAdd = function (draggable) {
            if (draggable instanceof CardView_1.CardView) {
                return this.foundationPile.canAdd(draggable.card);
            }
            else if (draggable instanceof FanView_1.FanView) {
                if (!draggable.fan.isSingle) {
                    return false;
                }
                return this.foundationPile.canAdd(draggable.card.card);
            }
            else {
                return false;
            }
        };
        FoundationPileView.prototype.add = function (draggable) {
            if (!this.canAdd(draggable)) {
                throw new Error("Cannot add to foundation");
            }
            if (draggable instanceof CardView_1.CardView) {
                draggable.open();
                this.addCard(draggable);
            }
            else if (draggable instanceof FanView_1.FanView) {
                this.addCard(draggable.card);
            }
        };
        FoundationPileView.prototype.removeLast = function () {
            if (this.cards.length == 0) {
                return null;
            }
            this.foundationPile.removeLast();
            var card = this.cards[this.cards.length - 1];
            this.cards.splice(-1, 1);
            card.position = LayoutView_2.LayoutView.getAbsolutePosition(card.g);
            this.render();
            return card;
        };
        FoundationPileView.prototype.isInside = function (x, y) {
            return x >= this.position.x && y >= this.position.y &&
                x < this.position.x + this.size.x && y < this.position.y + this.size.y;
        };
        FoundationPileView.prototype.getDraggable = function (x, y) {
            if (!this.isInside(x, y)) {
                return null;
            }
            return this.removeLast();
        };
        Object.defineProperty(FoundationPileView.prototype, "dropPoint", {
            get: function () {
                return new Point_3.Point(0, 0);
            },
            enumerable: true,
            configurable: true
        });
        return FoundationPileView;
    }(PileView_1.PileView));
    exports.FoundationPileView = FoundationPileView;
});
define("models/Tableau", ["require", "exports", "models/Fan"], function (require, exports, Fan_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Tableau = /** @class */ (function () {
        function Tableau() {
            this.closed = new Array();
            this.fan = new Fan_2.Fan();
        }
        Tableau.prototype.addClosed = function (card) {
            this.closed.push(card);
        };
        Tableau.prototype.open = function () {
            if (!this.fan.isEmpty) {
                return false;
            }
            var length = this.closed.length;
            if (length == 0) {
                return false;
            }
            this.closed.splice(-1, 1);
            return true;
        };
        Tableau.prototype.removeFan = function () {
            this.fan = new Fan_2.Fan();
        };
        Object.defineProperty(Tableau.prototype, "isEmpty", {
            get: function () {
                return this.fan.isEmpty && this.closed.length == 0;
            },
            enumerable: true,
            configurable: true
        });
        return Tableau;
    }());
    exports.Tableau = Tableau;
});
define("views/TableauView", ["require", "exports", "views/PileView", "views/LayoutView", "views/CardView", "views/FanView", "util/Consts", "util/Point"], function (require, exports, PileView_2, LayoutView_3, CardView_2, FanView_2, Consts_2, Point_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TableauView = /** @class */ (function (_super) {
        __extends(TableauView, _super);
        function TableauView(tableau) {
            var _this = _super.call(this) || this;
            _this.closed = new Array();
            if (!tableau.isEmpty) {
                throw new Error("Non empty tableau");
            }
            _this.tableau = tableau;
            _this.fan = new FanView_2.FanView(tableau.fan);
            return _this;
        }
        TableauView.prototype.addClosed = function (card) {
            this.tableau.addClosed(card.card);
            this.closed.push(card);
        };
        TableauView.prototype.open = function () {
            if (!this.tableau.open()) {
                return;
            }
            var card = this.closed[this.closed.length - 1];
            this.closed.splice(-1, 1);
            card.open();
            this.fan.addCard(card);
            this.render();
        };
        Object.defineProperty(TableauView.prototype, "yClosed", {
            get: function () {
                return Consts_2.Consts.ClosedGapFactor * this.size.y * this.closed.length;
            },
            enumerable: true,
            configurable: true
        });
        TableauView.prototype.render = function () {
            _super.prototype.render.call(this);
            if (this.tableau.isEmpty) {
                var holder = CardView_2.CardView.createHolder(this.size);
                this.g.appendChild(holder);
                return;
            }
            for (var i = 0; i < this.closed.length; ++i) {
                var card = this.closed[i];
                card.position = new Point_4.Point(0, Consts_2.Consts.ClosedGapFactor * this.size.y * i);
                card.size = this.size;
                card.render();
                this.g.appendChild(card.g);
            }
            this.fan.position = new Point_4.Point(0, this.yClosed);
            this.fan.size = this.size;
            this.fan.render();
            this.g.appendChild(this.fan.g);
        };
        TableauView.prototype.isInside = function (x, y) {
            x -= this.position.x;
            y -= this.position.y;
            if (this.fan.isInside(x, y)) {
                return true;
            }
            if (this.closed.length == 0) {
                return false;
            }
            var height = Consts_2.Consts.ClosedGapFactor * this.size.y * (this.closed.length - 1) + this.size.y;
            return x >= 0 && y >= 0 &&
                x < this.size.x && y < height;
        };
        TableauView.prototype.getDraggable = function (x, y) {
            x -= this.position.x;
            y -= this.position.y;
            var draggable = this.fan.getDraggable(x, y);
            if (draggable != null) {
                return draggable;
            }
            if (this.fan.fan.isEmpty) {
                return null;
            }
            if (this.fan.isInside(x, y)) {
                draggable = this.fan;
                this.tableau.removeFan();
                this.fan = new FanView_2.FanView(this.tableau.fan);
                draggable.position = LayoutView_3.LayoutView.getAbsolutePosition(draggable.g);
                this.render();
                return draggable;
            }
            return null;
        };
        Object.defineProperty(TableauView.prototype, "dropPoint", {
            get: function () {
                if (this.fan.fan.isEmpty) {
                    return new Point_4.Point(0, this.yClosed);
                }
                else {
                    var point = this.fan.dropPoint;
                    return new Point_4.Point(point.x + this.fan.position.x, point.y + this.fan.position.y);
                }
            },
            enumerable: true,
            configurable: true
        });
        TableauView.prototype.canAdd = function (draggable) {
            if (draggable instanceof CardView_2.CardView) {
                return this.fan.canAddCard(draggable);
            }
            else if (draggable instanceof FanView_2.FanView) {
                return this.fan.canAddFan(draggable);
            }
            else {
                return false;
            }
        };
        TableauView.prototype.add = function (draggable) {
            if (!this.canAdd(draggable)) {
                //throw new Error("Cannot add to tableau")
            }
            if (draggable instanceof CardView_2.CardView) {
                draggable.open();
                this.fan.addCard(draggable);
                this.render();
            }
            else if (draggable instanceof FanView_2.FanView) {
                if (this.fan.fan.isEmpty) {
                    this.fan = draggable;
                    this.tableau.fan = this.fan.fan;
                    this.render();
                }
                else {
                    this.fan.addFan(draggable);
                }
            }
        };
        TableauView.prototype.clearDragged = function () {
            if (this.fan.fan.isEmpty) {
                this.open();
            }
        };
        TableauView.prototype.removeLast = function () {
            if (this.fan.fan.isSingle) {
                this.tableau.removeFan();
                var card = this.fan.card;
                this.fan = new FanView_2.FanView(this.tableau.fan);
                card.position = LayoutView_3.LayoutView.getAbsolutePosition(card.g);
                this.render();
                return card;
            }
            else {
                return this.fan.removeLast();
            }
        };
        return TableauView;
    }(PileView_2.PileView));
    exports.TableauView = TableauView;
});
define("models/Hand", ["require", "exports", "models/Card", "models/Rank", "models/Suit"], function (require, exports, Card_1, Rank_4, Suit_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Hand = /** @class */ (function () {
        function Hand() {
            this.cards = new Array();
            for (var _i = 0, _a = Suit_3.SuitUtil.Suits; _i < _a.length; _i++) {
                var suit = _a[_i];
                for (var _b = 0, _c = Rank_4.RankUtil.Ranks; _b < _c.length; _b++) {
                    var rank = _c[_b];
                    this.cards.push(new Card_1.Card(suit, rank));
                }
            }
        }
        Hand.prototype.add = function (card) {
            this.cards.push(card);
        };
        Hand.prototype.shuffle = function () {
            var length = this.cards.length;
            if (length <= 1) {
                return;
            }
            for (var i = 0; i < length; ++i) {
                var j = Math.floor(Math.random() * (length - i)) + i;
                var tmp = this.cards[i];
                this.cards[i] = this.cards[j];
                this.cards[j] = tmp;
            }
        };
        Hand.prototype.removeLast = function () {
            this.cards.splice(-1, 1);
        };
        return Hand;
    }());
    exports.Hand = Hand;
});
define("views/HandView", ["require", "exports", "views/View", "views/CardView", "views/LayoutView", "util/Point"], function (require, exports, View_4, CardView_3, LayoutView_4, Point_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HandView = /** @class */ (function (_super) {
        __extends(HandView, _super);
        function HandView(hand) {
            var _this = _super.call(this) || this;
            _this.cards = new Array();
            _this.hand = hand;
            for (var _i = 0, _a = hand.cards; _i < _a.length; _i++) {
                var card = _a[_i];
                var cardView = new CardView_3.CardView(card);
                cardView.close();
                _this.cards.push(cardView);
            }
            return _this;
        }
        HandView.prototype.render = function () {
            _super.prototype.render.call(this);
            if (this.cards.length == 0) {
                var holder = CardView_3.CardView.createHolder(this.size);
                this.g.appendChild(holder);
            }
            else {
                var card = this.cards[this.cards.length - 1];
                card.position = new Point_5.Point(0, 0);
                card.size = this.size;
                card.render();
                this.g.appendChild(card.g);
            }
        };
        HandView.prototype.add = function (card) {
            card.close();
            this.cards.push(card);
            this.hand.add(card.card);
            this.render();
        };
        HandView.prototype.removeLast = function () {
            this.hand.removeLast();
            var card = this.cards[this.cards.length - 1];
            this.cards.splice(-1, 1);
            card.position = LayoutView_4.LayoutView.getAbsolutePosition(card.g);
            this.render();
            return card;
        };
        HandView.prototype.isInside = function (x, y) {
            return x >= this.position.x && y >= this.position.y &&
                x < this.position.x + this.size.x && y < this.position.y + this.size.y;
        };
        Object.defineProperty(HandView.prototype, "isEmpty", {
            get: function () {
                return this.cards.length == 0;
            },
            enumerable: true,
            configurable: true
        });
        return HandView;
    }(View_4.View));
    exports.HandView = HandView;
});
define("models/WastePile", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WastePile = /** @class */ (function () {
        function WastePile() {
            this.cards = new Array();
        }
        WastePile.prototype.add = function (card) {
            this.cards.push(card);
        };
        WastePile.prototype.removeLast = function () {
            this.cards.splice(-1, 1);
        };
        WastePile.prototype.removeAll = function () {
            this.cards = new Array();
        };
        Object.defineProperty(WastePile.prototype, "last", {
            get: function () {
                var length = this.cards.length;
                if (length == 0) {
                    return null;
                }
                return this.cards[length - 1];
            },
            enumerable: true,
            configurable: true
        });
        return WastePile;
    }());
    exports.WastePile = WastePile;
});
define("views/WastePileView", ["require", "exports", "views/PileView", "views/CardView", "views/LayoutView", "util/Point"], function (require, exports, PileView_3, CardView_4, LayoutView_5, Point_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WastePileView = /** @class */ (function (_super) {
        __extends(WastePileView, _super);
        function WastePileView(waste) {
            var _this = _super.call(this) || this;
            _this.cards = new Array();
            _this.waste = waste;
            for (var _i = 0, _a = waste.cards; _i < _a.length; _i++) {
                var card = _a[_i];
                var cardView = new CardView_4.CardView(card);
                cardView.close();
                _this.cards.push(cardView);
            }
            return _this;
        }
        WastePileView.prototype.render = function () {
            _super.prototype.render.call(this);
            if (this.cards.length == 0) {
                var holder = CardView_4.CardView.createHolder(this.size);
                this.g.appendChild(holder);
            }
            else {
                var card = this.cards[this.cards.length - 1];
                card.position = new Point_6.Point(0, 0);
                card.size = this.size;
                card.render();
                this.g.appendChild(card.g);
            }
        };
        WastePileView.prototype.canAdd = function (draggable) {
            return false;
        };
        WastePileView.prototype.add = function (draggable) {
            if (draggable instanceof CardView_4.CardView) {
                draggable.open();
                this.cards.push(draggable);
                this.waste.add(draggable.card);
                this.render();
            }
            else {
                throw new Error("Cannot add to waste pile");
            }
        };
        WastePileView.prototype.removeLast = function () {
            if (this.cards.length == 0) {
                return null;
            }
            this.waste.removeLast();
            var card = this.cards[this.cards.length - 1];
            this.cards.splice(-1, 1);
            card.position = LayoutView_5.LayoutView.getAbsolutePosition(card.g);
            this.render();
            return card;
        };
        WastePileView.prototype.removeAll = function () {
            var removed = this.cards;
            this.cards = new Array();
            this.waste.removeAll();
            this.render();
            return removed;
        };
        WastePileView.prototype.isInside = function (x, y) {
            return x >= this.position.x && y >= this.position.y &&
                x < this.position.x + this.size.x && y < this.position.y + this.size.y;
        };
        WastePileView.prototype.getDraggable = function (x, y) {
            if (!this.isInside(x, y)) {
                return null;
            }
            return this.removeLast();
        };
        Object.defineProperty(WastePileView.prototype, "dropPoint", {
            get: function () {
                return new Point_6.Point(0, 0);
            },
            enumerable: true,
            configurable: true
        });
        return WastePileView;
    }(PileView_3.PileView));
    exports.WastePileView = WastePileView;
});
define("models/Layout", ["require", "exports", "models/FoundationPile", "models/Tableau", "models/WastePile"], function (require, exports, FoundationPile_1, Tableau_1, WastePile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Layout = /** @class */ (function () {
        function Layout(hand) {
            this.foundations = new Array();
            this.tableaus = new Array();
            this.waste = new WastePile_1.WastePile();
            this.hand = hand;
            for (var i = 0; i < 4; ++i) {
                this.foundations.push(new FoundationPile_1.FoundationPile());
            }
            for (var i = 0; i < 7; ++i) {
                this.tableaus.push(new Tableau_1.Tableau());
            }
        }
        return Layout;
    }());
    exports.Layout = Layout;
});
define("views/LayoutView", ["require", "exports", "views/View", "views/FoundationPileView", "views/TableauView", "views/HandView", "views/WastePileView", "util/Point", "util/Consts"], function (require, exports, View_5, FoundationPileView_1, TableauView_1, HandView_1, WastePileView_1, Point_7, Consts_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LayoutView = /** @class */ (function (_super) {
        __extends(LayoutView, _super);
        function LayoutView(layout) {
            var _this = _super.call(this) || this;
            _this.foundations = new Array();
            _this.tableaus = new Array();
            _this.piles = new Array();
            _this.time = 0;
            _this.free = null;
            _this.destination = null;
            _this.touchStart = new Point_7.Point(0, 0);
            _this.dragged = null;
            LayoutView.gLayout = _this.g;
            _this.layout = layout;
            _this.hand = new HandView_1.HandView(layout.hand);
            _this.waste = new WastePileView_1.WastePileView(layout.waste);
            _this.piles.push(_this.waste);
            for (var _i = 0, _a = layout.foundations; _i < _a.length; _i++) {
                var f = _a[_i];
                var v = new FoundationPileView_1.FoundationPileView(f);
                _this.foundations.push(v);
                _this.piles.push(v);
            }
            for (var _b = 0, _c = layout.tableaus; _b < _c.length; _b++) {
                var t = _c[_b];
                var v = new TableauView_1.TableauView(t);
                _this.tableaus.push(v);
                _this.piles.push(v);
            }
            return _this;
        }
        LayoutView.getAbsolutePosition = function (g) {
            var p = new Point_7.Point(0, 0);
            while (g != null && g != LayoutView.gLayout) {
                var translate = g.getAttribute("transform");
                if (translate == null) {
                    translate = "translate(0,0)";
                }
                translate = translate.substr("translate".length);
                translate = translate.replace("(", "");
                translate = translate.replace(")", "");
                var split = translate.split(",");
                if (split.length != 2) {
                    split = ["", ""];
                }
                var x = parseFloat(split[0]);
                var y = parseFloat(split[1]);
                if (isNaN(x)) {
                    x = 0;
                }
                if (isNaN(y)) {
                    y = 0;
                }
                p.x += x;
                p.y += y;
                var parent_1 = g.parentElement;
                if (parent_1 instanceof SVGGElement) {
                    g = parent_1;
                }
                else {
                    break;
                }
            }
            return p;
        };
        LayoutView.prototype.setSize = function (size) {
            this.size = size;
            var cardWidth = (size.x - 2 * Consts_3.Consts.Margin) / 7 * 0.9;
            this.cardSize = new Point_7.Point(cardWidth, cardWidth * 1.618);
            this.blockSize = new Point_7.Point(this.cardSize.x / 0.9, this.cardSize.y / 0.9);
        };
        LayoutView.prototype.render = function () {
            _super.prototype.render.call(this);
            this.renderHand();
            this.renderWaste();
            this.renderFoundations();
            this.renderTableaus();
        };
        LayoutView.prototype.renderHand = function () {
            this.hand.position = new Point_7.Point(6 * this.blockSize.x + Consts_3.Consts.Margin, 0.5 * this.blockSize.y);
            this.hand.size = this.cardSize;
            this.hand.render();
            this.g.appendChild(this.hand.g);
        };
        LayoutView.prototype.renderWaste = function () {
            this.waste.position = new Point_7.Point(4.5 * this.blockSize.x + Consts_3.Consts.Margin, 0.5 * this.blockSize.y);
            this.waste.size = this.cardSize;
            this.waste.render();
            this.g.appendChild(this.waste.g);
        };
        LayoutView.prototype.renderFoundations = function () {
            for (var i = 0; i < this.foundations.length; ++i) {
                var foundation = this.foundations[i];
                foundation.position = new Point_7.Point(i * this.blockSize.x + Consts_3.Consts.Margin, 0.5 * this.blockSize.y);
                foundation.size = this.cardSize;
                foundation.render();
                this.g.appendChild(foundation.g);
            }
        };
        LayoutView.prototype.renderTableaus = function () {
            for (var i = 0; i < this.tableaus.length; ++i) {
                var tableau = this.tableaus[i];
                tableau.position = new Point_7.Point(i * this.blockSize.x + Consts_3.Consts.Margin, 2 * this.blockSize.y);
                tableau.size = this.cardSize;
                tableau.render();
                this.g.appendChild(tableau.g);
            }
        };
        LayoutView.prototype.renderGameover = function () {
            var text = document.createElementNS(View_5.View.SVG_NAMESPACE, "text");
            text.textContent = "Game Over!";
            this.g.appendChild(text);
        };
        LayoutView.prototype.setFree = function (free) {
            var prev = this.free;
            if (prev != null) {
                prev.isDragging = false;
                prev.clearTransform();
                this.g.removeChild(prev.g);
            }
            if (free != null) {
                free.isDragging = true;
                free.render();
                free.g.removeAttribute("transform");
                this.g.appendChild(free.g);
                free.setTransform(free.position);
            }
            this.free = free;
        };
        LayoutView.prototype.isInside = function (x, y) {
            return false;
        };
        return LayoutView;
    }(View_5.View));
    exports.LayoutView = LayoutView;
});
define("status/StatusType", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StatusType;
    (function (StatusType) {
        StatusType[StatusType["Ready"] = 0] = "Ready";
        StatusType[StatusType["Dealing"] = 1] = "Dealing";
        StatusType[StatusType["Opening"] = 2] = "Opening";
        StatusType[StatusType["Animating"] = 3] = "Animating";
        StatusType[StatusType["Dragging"] = 4] = "Dragging";
        StatusType[StatusType["Autoplay"] = 5] = "Autoplay";
        StatusType[StatusType["Gameover"] = 6] = "Gameover";
    })(StatusType || (StatusType = {}));
    exports.StatusType = StatusType;
});
define("status/Status", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Status = /** @class */ (function () {
        function Status(gameView) {
            this.startTime = 0;
            this.gameView = gameView;
            this.layoutView = gameView.layout;
        }
        Status.prototype.elapsedTime = function (time) {
            return time - this.startTime;
        };
        Status.prototype.start = function (time) {
            this.startTime = time;
        };
        Status.prototype.touchStarted = function (x, y) {
        };
        Status.prototype.touchMoved = function (x, y) {
        };
        Status.prototype.touchEnded = function () {
        };
        Status.prototype.touchCancelled = function () {
        };
        return Status;
    }());
    exports.Status = Status;
});
define("status/ReadyStatus", ["require", "exports", "status/Status", "status/StatusType", "util/Point"], function (require, exports, Status_1, StatusType_1, Point_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ReadyStatus = /** @class */ (function (_super) {
        __extends(ReadyStatus, _super);
        function ReadyStatus(gameView) {
            return _super.call(this, gameView) || this;
        }
        ReadyStatus.prototype.start = function (time) {
            _super.prototype.start.call(this, time);
            this.layoutView.setFree(null);
            this.layoutView.destination = null;
            this.layoutView.dragged = null;
            if (this.isFinished()) {
                this.finish();
            }
        };
        ReadyStatus.prototype.isFinished = function () {
            for (var _i = 0, _a = this.layoutView.tableaus; _i < _a.length; _i++) {
                var t = _a[_i];
                if (t.closed.length > 0) {
                    return false;
                }
            }
            return true;
        };
        ReadyStatus.prototype.finish = function () {
            this.gameView.setStatus(StatusType_1.StatusType.Autoplay);
        };
        ReadyStatus.prototype.handTapped = function () {
            //SoundPlayer.instance().play(SoundId.drag)
            if (this.layoutView.hand.isEmpty) {
                var cards = this.layoutView.waste.removeAll();
                cards.reverse();
                for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
                    var card = cards_1[_i];
                    this.layoutView.hand.add(card);
                }
            }
            else {
                var last = this.layoutView.hand.removeLast();
                last.open();
                this.layoutView.setFree(last);
                this.layoutView.destination = this.layoutView.waste;
                this.gameView.setStatus(StatusType_1.StatusType.Animating);
            }
        };
        ReadyStatus.prototype.touchStarted = function (x, y) {
            if (this.layoutView.hand.isInside(x, y)) {
                this.handTapped();
                return;
            }
            for (var i = 0; i < this.layoutView.piles.length; ++i) {
                var pile = this.layoutView.piles[i];
                var draggable = pile.getDraggable(x, y);
                if (draggable == null) {
                    continue;
                }
                this.layoutView.setFree(draggable);
                this.layoutView.touchStart = new Point_8.Point(x, y);
                this.layoutView.dragged = pile;
                this.gameView.setStatus(StatusType_1.StatusType.Dragging);
                return;
            }
        };
        return ReadyStatus;
    }(Status_1.Status));
    exports.ReadyStatus = ReadyStatus;
});
define("status/DealingStatus", ["require", "exports", "status/Status", "status/StatusType"], function (require, exports, Status_2, StatusType_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DealingStatus = /** @class */ (function (_super) {
        __extends(DealingStatus, _super);
        function DealingStatus(gameView) {
            return _super.call(this, gameView) || this;
        }
        DealingStatus.prototype.open = function () {
            //SoundPlayer.instance().play(SoundId.shuffle)
            this.gameView.setStatus(StatusType_2.StatusType.Opening);
        };
        DealingStatus.prototype.start = function (time) {
            _super.prototype.start.call(this, time);
            for (var i = 0; i < this.layoutView.tableaus.length; ++i) {
                for (var j = i; j < this.layoutView.tableaus.length; ++j) {
                    var card = this.layoutView.hand.removeLast();
                    this.layoutView.tableaus[j].addClosed(card);
                }
            }
            setTimeout(this.open.bind(this), 300);
        };
        return DealingStatus;
    }(Status_2.Status));
    exports.DealingStatus = DealingStatus;
});
define("status/OpeningStatus", ["require", "exports", "status/Status", "status/StatusType"], function (require, exports, Status_3, StatusType_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OpeningStatus = /** @class */ (function (_super) {
        __extends(OpeningStatus, _super);
        function OpeningStatus(gameView) {
            return _super.call(this, gameView) || this;
        }
        OpeningStatus.prototype.start = function (time) {
            _super.prototype.start.call(this, time);
            for (var i = 0; i < this.layoutView.tableaus.length; ++i) {
                this.layoutView.tableaus[i].open();
            }
            window.requestAnimationFrame(this.ready.bind(this));
        };
        OpeningStatus.prototype.ready = function () {
            this.gameView.setStatus(StatusType_3.StatusType.Ready);
        };
        return OpeningStatus;
    }(Status_3.Status));
    exports.OpeningStatus = OpeningStatus;
});
define("status/AnimatingStatus", ["require", "exports", "status/Status", "status/StatusType", "util/Point", "util/Consts", "views/LayoutView"], function (require, exports, Status_4, StatusType_4, Point_9, Consts_4, LayoutView_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AnimatingStatus = /** @class */ (function (_super) {
        __extends(AnimatingStatus, _super);
        function AnimatingStatus(gameView) {
            var _this = _super.call(this, gameView) || this;
            _this.distance = 0;
            _this.origin = new Point_9.Point(0, 0);
            _this.dropPoint = new Point_9.Point(0, 0);
            return _this;
        }
        AnimatingStatus.prototype.start = function (time) {
            _super.prototype.start.call(this, time);
            var free = this.layoutView.free;
            if (free == null) {
                throw new Error("No free element");
            }
            var destination = this.layoutView.destination;
            if (destination == null) {
                throw new Error("No destination");
            }
            this.origin = new Point_9.Point(free.position.x, free.position.y);
            this.dropPoint = LayoutView_6.LayoutView.getAbsolutePosition(destination.g);
            this.dropPoint.x += destination.dropPoint.x;
            this.dropPoint.y += destination.dropPoint.y;
            this.distance = this.origin.distance(this.dropPoint);
            window.requestAnimationFrame(this.process.bind(this));
        };
        AnimatingStatus.prototype.process = function (time) {
            var elapsed = this.elapsedTime(time);
            var free = this.layoutView.free;
            if (free == null) {
                throw new Error("No free element");
            }
            var moved = elapsed * Consts_4.Consts.AnimationVelocity * this.layoutView.cardSize.x;
            if (moved >= this.distance) {
                this.finish();
                return;
            }
            var ratio = moved / this.distance;
            free.position = new Point_9.Point(this.origin.x * (1 - ratio) + this.dropPoint.x * ratio, this.origin.y * (1 - ratio) + this.dropPoint.y * ratio);
            free.setTransform(free.position);
            window.requestAnimationFrame(this.process.bind(this));
        };
        AnimatingStatus.prototype.finish = function () {
            var free = this.layoutView.free;
            this.layoutView.setFree(null);
            this.layoutView.destination.add(free);
            if (this.layoutView.dragged != null) {
                this.layoutView.dragged.clearDragged();
            }
            this.gameView.setStatus(StatusType_4.StatusType.Ready);
        };
        return AnimatingStatus;
    }(Status_4.Status));
    exports.AnimatingStatus = AnimatingStatus;
});
define("status/DraggingStatus", ["require", "exports", "status/Status", "status/StatusType", "util/Point", "views/LayoutView"], function (require, exports, Status_5, StatusType_5, Point_10, LayoutView_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DraggingStatus = /** @class */ (function (_super) {
        __extends(DraggingStatus, _super);
        function DraggingStatus(gameView) {
            var _this = _super.call(this, gameView) || this;
            _this.origin = new Point_10.Point(0, 0);
            _this.time = 0;
            _this.requestId = 0;
            return _this;
        }
        DraggingStatus.prototype.start = function (time) {
            _super.prototype.start.call(this, time);
            var free = this.layoutView.free;
            if (free == null) {
                throw new Error("No free element");
            }
            //SoundPlayer.instance().play(SoundId.drag)
            this.origin = new Point_10.Point(free.position.x, free.position.y);
            this.requestId = window.requestAnimationFrame(this.animate.bind(this));
        };
        DraggingStatus.prototype.animate = function (time) {
            this.time = time;
            var free = this.layoutView.free;
            free.setTransform(free.position);
            this.requestId = window.requestAnimationFrame(this.animate.bind(this));
        };
        DraggingStatus.prototype.touchMoved = function (x, y) {
            var free = this.layoutView.free;
            if (free == null) {
                throw new Error("No free element");
            }
            free.position = new Point_10.Point(this.origin.x + x - this.layoutView.touchStart.x, this.origin.y + y - this.layoutView.touchStart.y);
        };
        DraggingStatus.prototype.touchCancelled = function () {
            window.cancelAnimationFrame(this.requestId);
            this.cancel();
        };
        DraggingStatus.prototype.touchEnded = function () {
            window.cancelAnimationFrame(this.requestId);
            if (this.elapsedTime(this.time) < 20) {
                this.drop(true);
            }
            else {
                this.drop(false);
            }
        };
        DraggingStatus.prototype.cancel = function () {
            var dragged = this.layoutView.dragged;
            if (dragged == null) {
                throw new Error("Where was it dragged from");
            }
            this.layoutView.dragged = null;
            this.layoutView.destination = dragged;
            this.gameView.setStatus(StatusType_5.StatusType.Animating);
        };
        DraggingStatus.prototype.drop = function (tapped) {
            var free = this.layoutView.free;
            if (free == null) {
                throw new Error("No free element");
            }
            var dragged = this.layoutView.dragged;
            if (dragged == null) {
                throw new Error("Where was it dragged from");
            }
            var piles = new Array();
            for (var _i = 0, _a = this.layoutView.piles; _i < _a.length; _i++) {
                var p = _a[_i];
                piles.push(p);
            }
            if (!tapped) {
                piles.sort(function (it1, it2) {
                    var dp1 = LayoutView_7.LayoutView.getAbsolutePosition(it1.g);
                    dp1.x += it1.dropPoint.x;
                    dp1.y += it1.dropPoint.y;
                    var dp2 = LayoutView_7.LayoutView.getAbsolutePosition(it2.g);
                    dp2.x += it2.dropPoint.x;
                    dp2.y += it2.dropPoint.y;
                    return free.position.distance(dp1) - free.position.distance(dp2);
                });
            }
            for (var _b = 0, piles_1 = piles; _b < piles_1.length; _b++) {
                var p = piles_1[_b];
                if (p != dragged && p.canAdd(free)) {
                    this.finish(p);
                    return;
                }
            }
            this.cancel();
        };
        DraggingStatus.prototype.finish = function (pile) {
            this.layoutView.destination = pile;
            this.gameView.setStatus(StatusType_5.StatusType.Animating);
            //SoundPlayer.instance().play(SoundId.land)
        };
        return DraggingStatus;
    }(Status_5.Status));
    exports.DraggingStatus = DraggingStatus;
});
define("status/AutoplayStatus", ["require", "exports", "status/Status", "status/StatusType"], function (require, exports, Status_6, StatusType_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AutoplayStatus = /** @class */ (function (_super) {
        __extends(AutoplayStatus, _super);
        function AutoplayStatus(gameView) {
            return _super.call(this, gameView) || this;
        }
        AutoplayStatus.prototype.start = function (time) {
            _super.prototype.start.call(this, time);
            if (this.autoPlayTableau()) {
                return;
            }
            if (this.autoPlayWaste()) {
                return;
            }
            if (this.autoPlayHand()) {
                return;
            }
            this.gameView.setStatus(StatusType_6.StatusType.Gameover);
        };
        AutoplayStatus.prototype.animate = function (card, pile) {
            this.layoutView.setFree(card);
            this.layoutView.destination = pile;
            this.gameView.setStatus(StatusType_6.StatusType.Animating);
        };
        AutoplayStatus.prototype.autoPlayTableau = function () {
            for (var _i = 0, _a = this.layoutView.tableaus; _i < _a.length; _i++) {
                var tableau = _a[_i];
                var last = tableau.fan.fan.last;
                if (last == null) {
                    continue;
                }
                for (var _b = 0, _c = this.layoutView.foundations; _b < _c.length; _b++) {
                    var foundation = _c[_b];
                    if (foundation.foundationPile.canAdd(last)) {
                        this.animate(tableau.removeLast(), foundation);
                        return true;
                    }
                }
            }
            return false;
        };
        AutoplayStatus.prototype.autoPlayWaste = function () {
            var last = this.layoutView.waste.waste.last;
            if (last == null) {
                return false;
            }
            for (var _i = 0, _a = this.layoutView.foundations; _i < _a.length; _i++) {
                var foundation = _a[_i];
                if (foundation.foundationPile.canAdd(last)) {
                    this.animate(this.layoutView.waste.removeLast(), foundation);
                    return true;
                }
            }
            return false;
        };
        AutoplayStatus.prototype.autoPlayHand = function () {
            if (this.layoutView.hand.isEmpty) {
                var cards = this.layoutView.waste.removeAll();
                if (cards.length == 0) {
                    return false;
                }
                cards.reverse();
                for (var _i = 0, cards_2 = cards; _i < cards_2.length; _i++) {
                    var card = cards_2[_i];
                    this.layoutView.hand.add(card);
                }
                this.gameView.setStatus(StatusType_6.StatusType.Ready);
                return true;
            }
            else {
                var last = this.layoutView.hand.removeLast();
                last.open();
                this.animate(last, this.layoutView.waste);
                return true;
            }
        };
        return AutoplayStatus;
    }(Status_6.Status));
    exports.AutoplayStatus = AutoplayStatus;
});
define("status/GameoverStatus", ["require", "exports", "status/Status"], function (require, exports, Status_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GameoverStatus = /** @class */ (function (_super) {
        __extends(GameoverStatus, _super);
        function GameoverStatus(gameView) {
            return _super.call(this, gameView) || this;
        }
        GameoverStatus.prototype.start = function (time) {
            _super.prototype.start.call(this, time);
            this.layoutView.renderGameover();
            setTimeout(this.finish.bind(this), 3000);
        };
        GameoverStatus.prototype.finish = function () {
            this.gameView.newGame();
        };
        return GameoverStatus;
    }(Status_7.Status));
    exports.GameoverStatus = GameoverStatus;
});
define("status/StatusFactory", ["require", "exports", "status/StatusType", "status/ReadyStatus", "status/DealingStatus", "status/OpeningStatus", "status/AnimatingStatus", "status/DraggingStatus", "status/AutoplayStatus", "status/GameoverStatus"], function (require, exports, StatusType_7, ReadyStatus_1, DealingStatus_1, OpeningStatus_1, AnimatingStatus_1, DraggingStatus_1, AutoplayStatus_1, GameoverStatus_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StatusFactory = /** @class */ (function () {
        function StatusFactory() {
        }
        StatusFactory.create = function (type, gameView) {
            switch (type) {
                case StatusType_7.StatusType.Ready: return new ReadyStatus_1.ReadyStatus(gameView);
                case StatusType_7.StatusType.Dealing: return new DealingStatus_1.DealingStatus(gameView);
                case StatusType_7.StatusType.Opening: return new OpeningStatus_1.OpeningStatus(gameView);
                case StatusType_7.StatusType.Animating: return new AnimatingStatus_1.AnimatingStatus(gameView);
                case StatusType_7.StatusType.Dragging: return new DraggingStatus_1.DraggingStatus(gameView);
                case StatusType_7.StatusType.Autoplay: return new AutoplayStatus_1.AutoplayStatus(gameView);
                case StatusType_7.StatusType.Gameover: return new GameoverStatus_1.GameoverStatus(gameView);
            }
        };
        return StatusFactory;
    }());
    exports.StatusFactory = StatusFactory;
});
define("GameView", ["require", "exports", "util/Point", "views/LayoutView", "status/StatusType", "status/StatusFactory", "models/Hand", "models/Layout"], function (require, exports, Point_11, LayoutView_8, StatusType_8, StatusFactory_1, Hand_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GameView = /** @class */ (function () {
        function GameView(svg, tt, size) {
            this.startTime = null;
            this.time = null;
            this.touchEvents = {
                'start': this.handleTouchStart.bind(this),
                'move': this.handleTouchMove.bind(this),
                'end': this.handleTouchEnd.bind(this),
                'cancel': this.handleTouchCancel.bind(this),
            };
            this.svg = svg;
            this.size = size;
            this.touchOverlay = tt;
            this.position = GameView.getAbsolutePosition(svg.parentElement);
        }
        GameView.getAbsolutePosition = function (elem) {
            var point = new Point_11.Point(0, 0);
            while (elem != null) {
                point.x += elem.offsetLeft;
                point.y += elem.offsetTop;
                elem = elem.offsetParent;
            }
            return point;
        };
        GameView.prototype.start = function () {
            var _this = this;
            this.load();
            this.render();
            window.requestAnimationFrame(function (time) {
                _this.startTime = time;
                _this.setStatus(StatusType_8.StatusType.Dealing);
            });
        };
        GameView.prototype.newGame = function () {
            this.start();
        };
        GameView.prototype.load = function () {
            var deck = new Hand_1.Hand();
            deck.shuffle();
            this.layout = new LayoutView_8.LayoutView(new Layout_1.Layout(deck));
            this.layout.setSize(this.size);
        };
        GameView.prototype.render = function () {
            while (this.svg.lastChild) {
                this.svg.removeChild(this.svg.lastChild);
            }
            this.layout.render();
            this.svg.appendChild(this.layout.g);
            var g = document.createElementNS(LayoutView_8.LayoutView.SVG_NAMESPACE, "g");
            var rect = document.createElementNS(LayoutView_8.LayoutView.SVG_NAMESPACE, "rect");
            rect.setAttribute("class", "touch-overlay");
            rect.setAttribute("width", this.size.x.toString());
            rect.setAttribute("height", this.size.y.toString());
            g.appendChild(rect);
            this.svg.appendChild(g);
            //this.touchOverlay = document
            this.setEvents();
        };
        GameView.prototype.handleTouchStart = function (e) {
            console.log("handleTouchStart");
            e.stopPropagation();
            e.preventDefault();
            this.addTouchEvents();
            if (e.touches.length < 1) {
                return;
            }
            var touch = e.touches[0];
            this.status.touchStarted(touch.pageX - this.position.x, touch.pageY - this.position.y);
        };
        GameView.prototype.handleTouchEnd = function (e) {
            console.log("handleTouchEnd");
            e.stopPropagation();
            e.preventDefault();
            this.removeTouchEvents();
            this.status.touchEnded();
        };
        GameView.prototype.handleTouchCancel = function (e) {
            console.log("handleTouchCancel");
            e.stopPropagation();
            e.preventDefault();
            this.removeTouchEvents();
            this.status.touchCancelled();
        };
        GameView.prototype.handleTouchMove = function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (e.touches.length < 1) {
                return;
            }
            var touch = e.touches[0];
            this.status.touchMoved(touch.pageX - this.position.x, touch.pageY - this.position.y);
        };
        GameView.prototype.setEvents = function () {
            this.touchOverlay.addEventListener("touchstart", this.touchEvents.start, true);
        };
        GameView.prototype.addTouchEvents = function () {
            this.touchOverlay.addEventListener("touchend", this.touchEvents.end, true);
            this.touchOverlay.addEventListener("touchcancel", this.touchEvents.cancel, true);
            this.touchOverlay.addEventListener("touchmove", this.touchEvents.move, true);
        };
        GameView.prototype.removeTouchEvents = function () {
            this.touchOverlay.removeEventListener("touchend", this.touchEvents.end, true);
            this.touchOverlay.removeEventListener("touchcancel", this.touchEvents.cancel, true);
            this.touchOverlay.removeEventListener("touchmove", this.touchEvents.move, true);
        };
        GameView.prototype.setStatus = function (type) {
            var _this = this;
            this.statusType = type;
            this.status = StatusFactory_1.StatusFactory.create(type, this);
            window.requestAnimationFrame(function (time) {
                _this.time = time;
                _this.status.start(time);
            });
        };
        GameView.prototype.deal = function () {
            this.setStatus(StatusType_8.StatusType.Dealing);
        };
        return GameView;
    }());
    exports.GameView = GameView;
});
define("main", ["require", "exports", "views/View", "util/Point", "GameView"], function (require, exports, View_6, Point_12, GameView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function main() {
        console.log("Woot");
        var body = document.body;
        var svg = document.createElementNS(View_6.View.SVG_NAMESPACE, "svg");
        var size = new Point_12.Point(window.innerWidth, window.innerHeight);
        svg.setAttribute("width", size.x.toString());
        svg.setAttribute("height", size.y.toString());
        var div = document.createElement("div");
        div.style.width = "100%";
        div.style.height = "100%";
        body.appendChild(svg);
        body.appendChild(div);
        var gameView = new GameView_1.GameView(svg, div, size);
        gameView.start();
        /*
            window.addEventListener("touchstart", (e) => {
                e.preventDefault()
            })*/
        function handleTouchStart(event) {
            event.preventDefault();
            console.log("windowStart");
        }
        function handleTouchEnd(event) {
            event.preventDefault();
            console.log("windowEnd");
        }
        function handleTouchCancel(event) {
            event.preventDefault();
            console.log("windowCancel");
        }
        function handleTouchMove(event) {
            event.preventDefault();
            console.log("windowMove");
        }
        /*
        document.addEventListener("touchstart", handleTouchStart, true)
        document.addEventListener("touchend", handleTouchEnd, true)
        document.addEventListener("touchcancel", handleTouchCancel, true)
        document.addEventListener("touchmove", handleTouchMove, true)
        */
    }
    exports.main = main;
});
/*
let circle = document.createElementNS(View.SVG_NAMESPACE, "circle")
circle.setAttribute("cx", "10")
circle.setAttribute("cy", "10")
circle.setAttribute("r", "8")
circle.setAttribute("fill", "red")
circle.setAttribute("stroke", "blue")
circle.setAttribute("stroke-width", "2")
//circle.style.stro
svg.appendChild(circle)

function handleTouchStart(event: TouchEvent) {
    event.stopPropagation()
    circle.setAttribute("fill", "green")
}

function handleTouchEnd(event: TouchEvent) {
    event.stopPropagation()
    circle.setAttribute("fill", "red")
}

function handleTouchCancel(event: TouchEvent) {
    event.stopPropagation()
    circle.setAttribute("fill", "yellow")
}

function handleTouchMove(event: TouchEvent) {
    event.stopPropagation()
    if(event.touches.length < 1) {
        return
    }

    let touch = event.touches[0]
    circle.style.transform = `matrix3d(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        ${touch.clientX + 20}, ${touch.clientY + 20}, 0, 1)`
    //circle.setAttribute("cx", `${touch.clientX + 20}`)
    //circle.setAttribute("cy", `${touch.clientY + 20}`)
}

circle.addEventListener("touchstart", handleTouchStart, true)
circle.addEventListener("touchend", handleTouchEnd, true)
circle.addEventListener("touchcancel", handleTouchCancel, true)
circle.addEventListener("touchmove", handleTouchMove, true)
*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwvUG9pbnQudHMiLCJ2aWV3cy9WaWV3LnRzIiwidmlld3MvRHJhZ2dhYmxlLnRzIiwidmlld3MvUGlsZVZpZXcudHMiLCJtb2RlbHMvU3VpdC50cyIsIm1vZGVscy9SYW5rLnRzIiwibW9kZWxzL0NhcmQudHMiLCJ2aWV3cy9DYXJkVmlldy50cyIsIm1vZGVscy9GYW4udHMiLCJ1dGlsL0NvbnN0cy50cyIsInZpZXdzL0ZhblZpZXcudHMiLCJtb2RlbHMvRm91bmRhdGlvblBpbGUudHMiLCJ2aWV3cy9Gb3VuZGF0aW9uUGlsZVZpZXcudHMiLCJtb2RlbHMvVGFibGVhdS50cyIsInZpZXdzL1RhYmxlYXVWaWV3LnRzIiwibW9kZWxzL0hhbmQudHMiLCJ2aWV3cy9IYW5kVmlldy50cyIsIm1vZGVscy9XYXN0ZVBpbGUudHMiLCJ2aWV3cy9XYXN0ZVBpbGVWaWV3LnRzIiwibW9kZWxzL0xheW91dC50cyIsInZpZXdzL0xheW91dFZpZXcudHMiLCJzdGF0dXMvU3RhdHVzVHlwZS50cyIsInN0YXR1cy9TdGF0dXMudHMiLCJzdGF0dXMvUmVhZHlTdGF0dXMudHMiLCJzdGF0dXMvRGVhbGluZ1N0YXR1cy50cyIsInN0YXR1cy9PcGVuaW5nU3RhdHVzLnRzIiwic3RhdHVzL0FuaW1hdGluZ1N0YXR1cy50cyIsInN0YXR1cy9EcmFnZ2luZ1N0YXR1cy50cyIsInN0YXR1cy9BdXRvcGxheVN0YXR1cy50cyIsInN0YXR1cy9HYW1lb3ZlclN0YXR1cy50cyIsInN0YXR1cy9TdGF0dXNGYWN0b3J5LnRzIiwiR2FtZVZpZXcudHMiLCJtYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFBQTtRQUlJLGVBQVksQ0FBUyxFQUFFLENBQVM7WUFIaEMsTUFBQyxHQUFHLENBQUMsQ0FBQTtZQUNMLE1BQUMsR0FBRyxDQUFDLENBQUE7WUFHRCxJQUFJLENBQUMsQ0FBQyxHQUFHLENB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QTtRQUM5QixDQUFDO1FBRUQsd0JBQXdCLEtBQWlCO1lBQ3JDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQTtZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQzVCLENBQUM7UUFFRCwyQkFBMkIsS0FBaUI7WUFDeEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFBO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDL0IsQ0FBQztRQUVELHlCQUF5QixLQUFpQjtZQUN0QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUE7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUM3QixDQUFDO1FBRUQ7Ozs7O1VBS0U7SUFDTixDQUFDO0lBRVEsb0JBQUk7O0FBRWI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE4Q0UiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQb2ludCB7XG4gICAgeCA9IDBcbiAgICB5ID0gMFxuXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54ID0geFxuICAgICAgICB0aGlzLnkgPSB5XG4gICAgfVxuXG4gICAgZGlzdGFuY2UocG9pbnQ6IFBvaW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCgocG9pbnQueCAtIHRoaXMueCkgKiAocG9pbnQueCAtIHRoaXMueCkgK1xuICAgICAgICAgICAgKHBvaW50LnkgLSB0aGlzLnkpICogKHBvaW50LnkgLSB0aGlzLnkpKVxuICAgIH1cbn1cblxuZXhwb3J0IHsgUG9pbnQgfSIsImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL3V0aWwvUG9pbnRcIlxuXG5hYnN0cmFjdCBjbGFzcyBWaWV3IHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgU1ZHX05BTUVTUEFDRSA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuXG4gICAgcG9zaXRpb24gPSBuZXcgUG9pbnQoMCwgMClcblxuICAgIHNpemUgPSBuZXcgUG9pbnQoMCwgMClcblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgd2hpbGUodGhpcy5nLmxhc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5nLnJlbW92ZUNoaWxkKHRoaXMuZy5sYXN0Q2hpbGQpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nLnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7dGhpcy5wb3NpdGlvbi54fSwgJHt0aGlzLnBvc2l0aW9uLnl9KWApXG4gICAgfVxuXG4gICAgYWJzdHJhY3QgaXNJbnNpZGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuXG5cbiAgICByZWFkb25seSBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFZpZXcuU1ZHX05BTUVTUEFDRSwgXCJnXCIpXG5cbiAgICBzZXRUcmFuc2Zvcm0ocG9zaXRpb246IFBvaW50KSB7XG4gICAgICAgIHRoaXMuZy5zdHlsZS50cmFuc2Zvcm0gPSBgbWF0cml4M2QoXG4gICAgICAgICAgICAxLCAwLCAwLCAwLFxuICAgICAgICAgICAgMCwgMSwgMCwgMCxcbiAgICAgICAgICAgIDAsIDAsIDEsIDAsXG4gICAgICAgICAgICAke3Bvc2l0aW9uLnh9LCAke3Bvc2l0aW9uLnl9LCAwLCAxKWBcbiAgICB9XG5cbiAgICBjbGVhclRyYW5zZm9ybSgpIHtcbiAgICAgICAgdGhpcy5nLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNmb3JtXCIpXG4gICAgfVxufVxuXG5leHBvcnQgeyBWaWV3IH0iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vVmlld1wiXG5cbmFic3RyYWN0IGNsYXNzIERyYWdnYWJsZSBleHRlbmRzIFZpZXcge1xuICAgICBpc0RyYWdnaW5nID0gZmFsc2Vcbn1cblxuZXhwb3J0IHsgRHJhZ2dhYmxlIH0iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vVmlld1wiXG5pbXBvcnQgeyBEcmFnZ2FibGUgfSBmcm9tIFwiLi9EcmFnZ2FibGVcIlxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vdXRpbC9Qb2ludFwiXG5cbmFic3RyYWN0IGNsYXNzIFBpbGVWaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgYWJzdHJhY3QgcmVhZG9ubHkgZHJvcFBvaW50OiBQb2ludFxuICAgIGFic3RyYWN0IGFkZChkcmFnZ2FibGU6IERyYWdnYWJsZSk6IHZvaWRcbiAgICBhYnN0cmFjdCBnZXREcmFnZ2FibGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBEcmFnZ2FibGVcbiAgICBhYnN0cmFjdCBjYW5BZGQoZHJhZ2dhYmxlOiBEcmFnZ2FibGUpOiBCb29sZWFuXG5cbiAgICBjbGVhckRyYWdnZWQoKSB7XG4gICAgfVxufVxuXG5leHBvcnQgeyBQaWxlVmlldyB9IiwiZW51bSBTdWl0IHtcbiAgICBDbHViID0gMCxcbiAgICBEaWFtb25kID0gMSxcbiAgICBIZWFydCA9IDIsXG4gICAgU3BhZGUgPSAzXG59XG5cbmNsYXNzIFN1aXRVdGlsIHtcbiAgICBzdGF0aWMgZ2V0U3ltYm9sKHN1aXQ6IFN1aXQpOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKHN1aXQpIHtcbiAgICAgICAgICAgIGNhc2UgU3VpdC5DbHViOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIuKZo1wiXG4gICAgICAgICAgICBjYXNlIFN1aXQuRGlhbW9uZDpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLimaZcIlxuICAgICAgICAgICAgY2FzZSBTdWl0LkhlYXJ0OlxuICAgICAgICAgICAgICAgIHJldHVybiBcIuKZpVwiXG4gICAgICAgICAgICBjYXNlIFN1aXQuU3BhZGU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi4pmgXCJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBpc1JlZChzdWl0OiBTdWl0KTogYm9vbGVhbiB7XG4gICAgICAgIHN3aXRjaCAoc3VpdCkge1xuICAgICAgICAgICAgY2FzZSBTdWl0LkNsdWI6XG4gICAgICAgICAgICBjYXNlIFN1aXQuU3BhZGU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBjYXNlIFN1aXQuRGlhbW9uZDpcbiAgICAgICAgICAgIGNhc2UgU3VpdC5IZWFydDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHJlYWRvbmx5IFN1aXRzID0gW1N1aXQuQ2x1YiwgU3VpdC5EaWFtb25kLCBTdWl0LkhlYXJ0LCBTdWl0LlNwYWRlXVxufVxuXG5leHBvcnQgeyBTdWl0LCBTdWl0VXRpbCB9IiwiZW51bSBSYW5rIHtcbiAgICBBY2UgPSAwLFxuICAgIFR3bywgVGhyZWUsIEZvdXIsIEZpdmUsIFNpeCwgU2V2ZW4sIEVpZ2h0LCBOaW5lLCBUZW4sXG4gICAgSmFjaywgUXVlZW4sIEtpbmdcbn1cblxuY2xhc3MgUmFua1V0aWwge1xuICAgIHN0YXRpYyBnZXRTeW1ib2wocmFuazogUmFuayk6IHN0cmluZyB7XG4gICAgICAgIHN3aXRjaCAocmFuaykge1xuICAgICAgICAgICAgY2FzZSBSYW5rLkFjZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJBXCJcbiAgICAgICAgICAgIGNhc2UgUmFuay5KYWNrOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkpcIlxuICAgICAgICAgICAgY2FzZSBSYW5rLlF1ZWVuOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIlFcIlxuICAgICAgICAgICAgY2FzZSBSYW5rLktpbmc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiS1wiXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtyYW5rICsgMX1gXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgUmFua3MgPSBbUmFuay5BY2UsXG4gICAgUmFuay5Ud28sIFJhbmsuVGhyZWUsIFJhbmsuRm91ciwgUmFuay5GaXZlLCBSYW5rLlNpeCwgUmFuay5TZXZlbiwgUmFuay5FaWdodCwgUmFuay5OaW5lLCBSYW5rLlRlbixcbiAgICBSYW5rLkphY2ssIFJhbmsuUXVlZW4sIFJhbmsuS2luZ11cbn1cblxuZXhwb3J0IHsgUmFuaywgUmFua1V0aWwgfSIsImltcG9ydCB7IFN1aXQsIFN1aXRVdGlsIH0gZnJvbSBcIi4vU3VpdFwiXG5pbXBvcnQgeyBSYW5rIH0gZnJvbSBcIi4vUmFua1wiXG5cbmNsYXNzIENhcmQge1xuICAgIHJlYWRvbmx5IHN1aXQ6IFN1aXRcbiAgICByZWFkb25seSByYW5rOiBSYW5rXG5cbiAgICBjb25zdHJ1Y3RvcihzdWl0OiBTdWl0LCByYW5rOiBSYW5rKSB7XG4gICAgICAgIHRoaXMuc3VpdCA9IHN1aXRcbiAgICAgICAgdGhpcy5yYW5rID0gcmFua1xuICAgIH1cblxuICAgIGNhbkZhbihuZXh0OiBDYXJkKTogYm9vbGVhbiB7XG4gICAgICAgIGlmKHRoaXMucmFuayAhPSBuZXh0LnJhbmsgKyAxKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKFN1aXRVdGlsLmlzUmVkKHRoaXMuc3VpdCkgPT0gU3VpdFV0aWwuaXNSZWQobmV4dC5zdWl0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGNhblBpbGUobmV4dDogQ2FyZCk6IGJvb2xlYW4ge1xuICAgICAgICBpZih0aGlzLnN1aXQgIT0gbmV4dC5zdWl0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMucmFuayArIDEgIT0gbmV4dC5yYW5rKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxufVxuXG5leHBvcnQgeyBDYXJkIH0iLCJpbXBvcnQgeyBEcmFnZ2FibGUgfSBmcm9tIFwiLi9EcmFnZ2FibGVcIlxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL1ZpZXdcIlxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vdXRpbC9Qb2ludFwiXG5pbXBvcnQgeyBDYXJkIH0gZnJvbSBcIi4uL21vZGVscy9DYXJkXCJcbmltcG9ydCB7IFJhbmtVdGlsIH0gZnJvbSBcIi4uL21vZGVscy9SYW5rXCJcbmltcG9ydCB7IFN1aXQsIFN1aXRVdGlsIH0gZnJvbSBcIi4uL21vZGVscy9TdWl0XCJcblxuY2xhc3MgQ2FyZFZpZXcgZXh0ZW5kcyBEcmFnZ2FibGUge1xuICAgIGlzT3BlbiA9IGZhbHNlXG4gICAgcmVhZG9ubHkgY2FyZDogQ2FyZFxuXG4gICAgY29uc3RydWN0b3IoY2FyZDogQ2FyZCkge1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuY2FyZCA9IGNhcmRcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZVxuICAgICAgICBpZiAodGhpcy5nICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImNhcmQgY2FyZC1jbG9zZVwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3BlbigpIHtcbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlXG4gICAgICAgIGlmICh0aGlzLmcgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5nLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiY2FyZCBjYXJkLW9wZW5cIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgc3VwZXIucmVuZGVyKClcblxuICAgICAgICBsZXQgcmVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhWaWV3LlNWR19OQU1FU1BBQ0UsIFwicmVjdFwiKVxuICAgICAgICByZWN0LnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHRoaXMuc2l6ZS54LnRvU3RyaW5nKCkpXG4gICAgICAgIHJlY3Quc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIHRoaXMuc2l6ZS55LnRvU3RyaW5nKCkpXG4gICAgICAgIHRoaXMuZy5hcHBlbmRDaGlsZChyZWN0KVxuXG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5nLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGBjYXJkIHN1aXQtJHtTdWl0W3RoaXMuY2FyZC5zdWl0XX0gY2FyZC1vcGVuYClcbiAgICAgICAgICAgIHJlY3Quc2V0QXR0cmlidXRlKFwiZmlsbFwiLCBcInJlZFwiKVxuXG4gICAgICAgICAgICBsZXQgeVRvcCA9IHRoaXMuc2l6ZS54IC8gMi4yXG4gICAgICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVUZXh0KFJhbmtVdGlsLmdldFN5bWJvbCh0aGlzLmNhcmQucmFuayksIHRoaXMuc2l6ZS54ICogMC4yNSwgeVRvcCkpXG4gICAgICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVUZXh0KFN1aXRVdGlsLmdldFN5bWJvbCh0aGlzLmNhcmQuc3VpdCksIHRoaXMuc2l6ZS54ICogMC43NSwgeVRvcCkpXG4gICAgICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVUZXh0KFN1aXRVdGlsLmdldFN5bWJvbCh0aGlzLmNhcmQuc3VpdCksIHRoaXMuc2l6ZS54ICogMC41LCB5VG9wICsgdGhpcy5zaXplLnkgKiAwLjUpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiY2FyZCBjYXJkLWNsb3NlXCIpXG4gICAgICAgICAgICByZWN0LnNldEF0dHJpYnV0ZShcImZpbGxcIiwgXCJibGFja1wiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVUZXh0KHRleHQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIpOiBTVkdUZXh0RWxlbWVudCB7XG4gICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFZpZXcuU1ZHX05BTUVTUEFDRSwgXCJ0ZXh0XCIpXG4gICAgICAgIGVsZW0udGV4dENvbnRlbnQgPSB0ZXh0XG4gICAgICAgIGVsZW0uc3R5bGUuZm9udFNpemUgPSBgJHt0aGlzLnNpemUueCAvIDIuMn1gXG4gICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKFwieFwiLCB4LnRvU3RyaW5nKCkpXG4gICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKFwieVwiLCB5LnRvU3RyaW5nKCkpXG5cbiAgICAgICAgcmV0dXJuIGVsZW1cbiAgICB9XG5cbiAgICBpc0luc2lkZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4geCA+PSB0aGlzLnBvc2l0aW9uLnggJiYgeSA+PSB0aGlzLnBvc2l0aW9uLnkgJiYgXG4gICAgICAgIHggPCB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLnNpemUueCAmJiB5IDwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLnlcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlSG9sZGVyKHNpemU6IFBvaW50KTogU1ZHUmVjdEVsZW1lbnQge1xuICAgICAgICBsZXQgcmVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhWaWV3LlNWR19OQU1FU1BBQ0UsIFwicmVjdFwiKVxuICAgICAgICByZWN0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaG9sZGVyXCIpXG4gICAgICAgIHJlY3Quc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgc2l6ZS54LnRvU3RyaW5nKCkpXG4gICAgICAgIHJlY3Quc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIHNpemUueS50b1N0cmluZygpKVxuXG4gICAgICAgIHJldHVybiByZWN0XG4gICAgfVxufVxuXG5leHBvcnQgeyBDYXJkVmlldyB9IiwiaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuL0NhcmRcIlxuaW1wb3J0IHsgUmFuayB9IGZyb20gXCIuL1JhbmtcIlxuXG5jbGFzcyBGYW4ge1xuICAgIGNhcmQ6IENhcmRcbiAgICBmYW46IEZhblxuXG4gICAgZ2V0IGZpcnN0KCk6IENhcmQge1xuICAgICAgICByZXR1cm4gdGhpcy5jYXJkXG4gICAgfVxuXG4gICAgZ2V0IGxhc3QoKTogQ2FyZCB7XG4gICAgICAgIGlmICh0aGlzLmZhbiA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJkXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mYW4ubGFzdFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhcmQgPT0gbnVsbFxuICAgIH1cblxuICAgIGdldCBpc1NpbmdsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FyZCAhPSBudWxsICYmIHRoaXMuZmFuID09IG51bGxcbiAgICB9XG5cbiAgICBhZGRGYW4oZmFuOiBGYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuY2FyZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNhcmQgPSBmYW4uY2FyZFxuICAgICAgICAgICAgdGhpcy5mYW4gPSBmYW4uZmFuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5mYW4gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5mYW4gPSBmYW5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmFuLmFkZEZhbihmYW4pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRDYXJkKGNhcmQ6IENhcmQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FyZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNhcmQgPSBjYXJkXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5mYW4gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5mYW4gPSBuZXcgRmFuKClcbiAgICAgICAgICAgIHRoaXMuZmFuLmFkZENhcmQoY2FyZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmFuLmFkZENhcmQoY2FyZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUZhbigpIHtcbiAgICAgICAgdGhpcy5mYW4gPSBudWxsXG4gICAgfVxuXG4gICAgY2FuRmFuQ2FyZChjYXJkOiBDYXJkKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmNhcmQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhcmQucmFuayA9PSBSYW5rLktpbmdcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZhbiA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJkLmNhbkZhbihjYXJkKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmFuLmNhbkZhbkNhcmQoY2FyZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbkZhbkZhbihmYW46IEZhbik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZmFuLmlzRW1wdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FyZCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFuLmNhcmQucmFuayA9PSBSYW5rLktpbmdcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZhbiA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJkLmNhbkZhbihmYW4uY2FyZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZhbi5jYW5GYW5GYW4oZmFuKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgeyBGYW4gfSIsImNsYXNzIENvbnN0cyB7XG4gICAgc3RhdGljIEZhbkdhcEZhY3RvciA9IDAuM1xuICAgIHN0YXRpYyBDbG9zZWRHYXBGYWN0b3IgPSAwLjFcbiAgICBzdGF0aWMgTWFyZ2luID0gMTZcblxuICAgIHN0YXRpYyBBbmltYXRpb25WZWxvY2l0eSA9IDEgLyAzMFxufVxuXG5leHBvcnQgeyBDb25zdHMgfSIsImltcG9ydCB7IFBpbGVWaWV3IH0gZnJvbSBcIi4vUGlsZVZpZXdcIlxuaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSBcIi4vRHJhZ2dhYmxlXCJcbmltcG9ydCB7IENhcmRWaWV3IH0gZnJvbSBcIi4vQ2FyZFZpZXdcIlxuaW1wb3J0IHsgTGF5b3V0VmlldyB9IGZyb20gXCIuL0xheW91dFZpZXdcIlxuaW1wb3J0IHsgRmFuIH0gZnJvbSBcIi4uL21vZGVscy9GYW5cIlxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vdXRpbC9Qb2ludFwiXG5pbXBvcnQgeyBDb25zdHMgfSBmcm9tIFwiLi4vdXRpbC9Db25zdHNcIlxuXG5jbGFzcyBGYW5WaWV3IGV4dGVuZHMgRHJhZ2dhYmxlIHtcbiAgICBjYXJkOiBDYXJkVmlldyA9IG51bGxcbiAgICBjaGlsZDogRmFuVmlldyA9IG51bGxcbiAgICBmYW46IEZhblxuXG4gICAgY29uc3RydWN0b3IoZmFuOiBGYW4pIHtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLmZhbiA9IGZhblxuICAgIH1cblxuICAgIHByaXZhdGUgX2lzRHJhZ2dpbmcgPSBmYWxzZVxuICAgIGdldCBpc0RyYWdnaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEcmFnZ2luZ1xuICAgIH1cbiAgICBzZXQgaXNEcmFnZ2luZyh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gdmFsdWVcbiAgICAgICAgaWYgKHRoaXMuY2FyZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNhcmQuaXNEcmFnZ2luZyA9IHZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2hpbGQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jaGlsZC5pc0RyYWdnaW5nID0gdmFsdWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbkFkZENhcmQoY2FyZDogQ2FyZFZpZXcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmFuLmNhbkZhbkNhcmQoY2FyZC5jYXJkKVxuICAgIH1cblxuICAgIGFkZENhcmQoY2FyZDogQ2FyZFZpZXcpIHtcbiAgICAgICAgLyppZighdGhpcy5jYW5BZGRDYXJkKGNhcmQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBhZGQgY2FyZFwiKVxuICAgICAgICB9Ki9cblxuICAgICAgICBpZih0aGlzLmNhcmQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jYXJkID0gY2FyZFxuICAgICAgICAgICAgdGhpcy5mYW4uYWRkQ2FyZChjYXJkLmNhcmQpXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpXG4gICAgICAgIH0gZWxzZSBpZih0aGlzLmNoaWxkID09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBmYW4gPSBuZXcgRmFuKClcbiAgICAgICAgICAgIHRoaXMuY2hpbGQgPSBuZXcgRmFuVmlldyhmYW4pXG4gICAgICAgICAgICB0aGlzLmNoaWxkLmFkZENhcmQoY2FyZClcbiAgICAgICAgICAgIHRoaXMuZmFuLmFkZEZhbihmYW4pXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkLmFkZENhcmQoY2FyZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbkFkZEZhbihmYW46IEZhblZpZXcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmFuLmNhbkZhbkZhbihmYW4uZmFuKVxuICAgIH1cblxuICAgIGFkZEZhbihmYW46IEZhblZpZXcpIHtcbiAgICAgICAgaWYoIXRoaXMuY2FuQWRkRmFuKGZhbikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGFkZCBmYW5cIilcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmNhcmQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgYWRkIHRvIGEgZW1wdHkgZmFuXCIpXG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLmNoaWxkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGQgPSBmYW5cbiAgICAgICAgICAgIHRoaXMuZmFuLmFkZEZhbihmYW4uZmFuKVxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGlsZC5hZGRGYW4oZmFuKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBzdXBlci5yZW5kZXIoKVxuXG4gICAgICAgIGlmKHRoaXMuY2FyZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNhcmQucG9zaXRpb24gPSBuZXcgUG9pbnQoMCwgMClcbiAgICAgICAgICAgIHRoaXMuY2FyZC5zaXplID0gdGhpcy5zaXplXG4gICAgICAgICAgICB0aGlzLmNhcmQucmVuZGVyKClcbiAgICAgICAgICAgIHRoaXMuZy5hcHBlbmRDaGlsZCh0aGlzLmNhcmQuZylcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmNoaWxkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGQucG9zaXRpb24gPSBuZXcgUG9pbnQoMCwgQ29uc3RzLkZhbkdhcEZhY3RvciAqIHRoaXMuc2l6ZS55KVxuICAgICAgICAgICAgdGhpcy5jaGlsZC5zaXplID0gdGhpcy5zaXplXG4gICAgICAgICAgICB0aGlzLmNoaWxkLnJlbmRlcigpXG4gICAgICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQodGhpcy5jaGlsZC5nKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNJbnNpZGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgeCAtPSB0aGlzLnBvc2l0aW9uLnhcbiAgICAgICAgeSAtPSB0aGlzLnBvc2l0aW9uLnlcbiAgICAgICAgaWYodGhpcy5jaGlsZCAhPSBudWxsICYmIHRoaXMuY2hpbGQuaXNJbnNpZGUoeCwgeSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5jYXJkICE9IG51bGwgJiYgdGhpcy5jYXJkLmlzSW5zaWRlKHgsIHkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgZ2V0RHJhZ2dhYmxlKHg6IG51bWJlciwgeTogbnVtYmVyKTogRHJhZ2dhYmxlIHtcbiAgICAgICAgeCAtPSB0aGlzLnBvc2l0aW9uLnhcbiAgICAgICAgeSAtPSB0aGlzLnBvc2l0aW9uLnlcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuY2hpbGQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuY2hpbGQuaXNJbnNpZGUoeCwgeSkpIHtcbiAgICAgICAgICAgIGxldCBkcmFnZ2FibGUgPSB0aGlzLmNoaWxkLmdldERyYWdnYWJsZSh4LCB5KVxuICAgICAgICAgICAgaWYoZHJhZ2dhYmxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZHJhZ2dhYmxlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZhbi5yZW1vdmVGYW4oKVxuICAgICAgICAgICAgZHJhZ2dhYmxlID0gdGhpcy5jaGlsZFxuICAgICAgICAgICAgdGhpcy5jaGlsZCA9IG51bGxcbiAgICAgICAgICAgIGRyYWdnYWJsZS5wb3NpdGlvbiA9IExheW91dFZpZXcuZ2V0QWJzb2x1dGVQb3NpdGlvbihkcmFnZ2FibGUuZylcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKClcblxuICAgICAgICAgICAgcmV0dXJuIGRyYWdnYWJsZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBkcm9wUG9pbnQoKTogUG9pbnQge1xuICAgICAgICBpZih0aGlzLmNhcmQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb25cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuY2hpbGQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQb2ludCgwLCBDb25zdHMuRmFuR2FwRmFjdG9yICogdGhpcy5zaXplLnkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcG9pbnQgPSB0aGlzLmNoaWxkLmRyb3BQb2ludFxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQb2ludChwb2ludC54ICsgdGhpcy5jaGlsZC5wb3NpdGlvbi54LCBwb2ludC55ICsgdGhpcy5jaGlsZC5wb3NpdGlvbi55KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlTGFzdCgpOiBDYXJkVmlldyB7XG4gICAgICAgIGlmKHRoaXMuY2hpbGQuZmFuLmlzU2luZ2xlKSB7XG4gICAgICAgICAgICB0aGlzLmZhbi5yZW1vdmVGYW4oKVxuICAgICAgICAgICAgbGV0IGNhcmQgPSB0aGlzLmNoaWxkLmNhcmRcbiAgICAgICAgICAgIHRoaXMuY2hpbGQgPSBudWxsXG4gICAgICAgICAgICBjYXJkLnBvc2l0aW9uID0gTGF5b3V0Vmlldy5nZXRBYnNvbHV0ZVBvc2l0aW9uKGNhcmQuZylcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKClcbiAgICAgICAgICAgIHJldHVybiBjYXJkXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZC5yZW1vdmVMYXN0KClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHsgRmFuVmlldyB9IiwiaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuL0NhcmRcIlxuaW1wb3J0IHsgUmFuayB9IGZyb20gXCIuL1JhbmtcIlxuXG5jbGFzcyBGb3VuZGF0aW9uUGlsZSB7XG4gICAgY2FyZHMgPSBuZXcgQXJyYXk8Q2FyZD4oKVxuXG4gICAgY2FuQWRkKGNhcmQ6IENhcmQpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMuY2FyZHMubGVuZ3RoXG4gICAgICAgIGlmKGxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FyZC5yYW5rID09IFJhbmsuQWNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJkc1tsZW5ndGggLSAxXS5jYW5QaWxlKGNhcmQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGQoY2FyZDogQ2FyZCkge1xuICAgICAgICB0aGlzLmNhcmRzLnB1c2goY2FyZClcbiAgICB9XG5cbiAgICByZW1vdmVMYXN0KCkge1xuICAgICAgICB0aGlzLmNhcmRzLnNwbGljZSgtMSwgMSlcbiAgICB9XG59XG5cbmV4cG9ydCB7IEZvdW5kYXRpb25QaWxlIH0iLCJpbXBvcnQgeyBQaWxlVmlldyB9IGZyb20gXCIuL1BpbGVWaWV3XCJcbmltcG9ydCB7IERyYWdnYWJsZSB9IGZyb20gXCIuL0RyYWdnYWJsZVwiXG5pbXBvcnQgeyBDYXJkVmlldyB9IGZyb20gXCIuL0NhcmRWaWV3XCJcbmltcG9ydCB7IEZhblZpZXcgfSBmcm9tIFwiLi9GYW5WaWV3XCJcbmltcG9ydCB7IExheW91dFZpZXcgfSBmcm9tIFwiLi9MYXlvdXRWaWV3XCJcbmltcG9ydCB7IEZvdW5kYXRpb25QaWxlIH0gZnJvbSBcIi4uL21vZGVscy9Gb3VuZGF0aW9uUGlsZVwiXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi91dGlsL1BvaW50XCJcblxuY2xhc3MgRm91bmRhdGlvblBpbGVWaWV3IGV4dGVuZHMgUGlsZVZpZXcge1xuICAgIGNhcmRzID0gbmV3IEFycmF5PENhcmRWaWV3PigpXG4gICAgZm91bmRhdGlvblBpbGU6IEZvdW5kYXRpb25QaWxlXG5cbiAgICBjb25zdHJ1Y3Rvcihmb3VuZGF0aW9uUGlsZTogRm91bmRhdGlvblBpbGUpIHtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLmZvdW5kYXRpb25QaWxlID0gZm91bmRhdGlvblBpbGVcbiAgICAgICAgZm9yKGxldCBjYXJkIG9mIGZvdW5kYXRpb25QaWxlLmNhcmRzKSB7XG4gICAgICAgICAgICBsZXQgY2FyZFZpZXcgPSBuZXcgQ2FyZFZpZXcoY2FyZClcbiAgICAgICAgICAgIGNhcmRWaWV3LmNsb3NlKClcbiAgICAgICAgICAgIHRoaXMuY2FyZHMucHVzaChjYXJkVmlldylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgc3VwZXIucmVuZGVyKClcbiAgICAgICAgaWYodGhpcy5jYXJkcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgbGV0IGhvbGRlciA9IENhcmRWaWV3LmNyZWF0ZUhvbGRlcih0aGlzLnNpemUpXG4gICAgICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQoaG9sZGVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGNhcmQgPSB0aGlzLmNhcmRzW3RoaXMuY2FyZHMubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgIGNhcmQucG9zaXRpb24gPSBuZXcgUG9pbnQoMCwgMClcbiAgICAgICAgICAgIGNhcmQuc2l6ZSA9IHRoaXMuIHNpemVcbiAgICAgICAgICAgIGNhcmQucmVuZGVyKClcbiAgICAgICAgICAgIHRoaXMuZy5hcHBlbmRDaGlsZChjYXJkLmcpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRDYXJkKGNhcmQ6IENhcmRWaWV3KSB7XG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChjYXJkKVxuICAgICAgICB0aGlzLmZvdW5kYXRpb25QaWxlLmFkZChjYXJkLmNhcmQpXG4gICAgICAgIHRoaXMucmVuZGVyKClcbiAgICB9XG5cbiAgICBjYW5BZGQoZHJhZ2dhYmxlOiBEcmFnZ2FibGUpOiBCb29sZWFuIHtcbiAgICAgICAgaWYoZHJhZ2dhYmxlIGluc3RhbmNlb2YgQ2FyZFZpZXcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvdW5kYXRpb25QaWxlLmNhbkFkZChkcmFnZ2FibGUuY2FyZClcbiAgICAgICAgfSBlbHNlIGlmIChkcmFnZ2FibGUgaW5zdGFuY2VvZiBGYW5WaWV3KSB7XG4gICAgICAgICAgICBpZighZHJhZ2dhYmxlLmZhbi5pc1NpbmdsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm91bmRhdGlvblBpbGUuY2FuQWRkKGRyYWdnYWJsZS5jYXJkISEuY2FyZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkKGRyYWdnYWJsZTogRHJhZ2dhYmxlKSB7XG4gICAgICAgIGlmKCF0aGlzLmNhbkFkZChkcmFnZ2FibGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWRkIHRvIGZvdW5kYXRpb25cIilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGRyYWdnYWJsZSBpbnN0YW5jZW9mIENhcmRWaWV3KSB7XG4gICAgICAgICAgICBkcmFnZ2FibGUub3BlbigpXG4gICAgICAgICAgICB0aGlzLmFkZENhcmQoZHJhZ2dhYmxlKVxuICAgICAgICB9IGVsc2UgaWYgKGRyYWdnYWJsZSBpbnN0YW5jZW9mIEZhblZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2FyZChkcmFnZ2FibGUuY2FyZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlTGFzdCgpOiBDYXJkVmlldyB7XG4gICAgICAgIGlmKHRoaXMuY2FyZHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvdW5kYXRpb25QaWxlLnJlbW92ZUxhc3QoKVxuICAgICAgICBsZXQgY2FyZCA9IHRoaXMuY2FyZHNbdGhpcy5jYXJkcy5sZW5ndGggLSAxXVxuICAgICAgICB0aGlzLmNhcmRzLnNwbGljZSgtMSwgMSlcbiAgICAgICAgY2FyZC5wb3NpdGlvbiA9IExheW91dFZpZXcuZ2V0QWJzb2x1dGVQb3NpdGlvbihjYXJkLmcpXG4gICAgICAgIHRoaXMucmVuZGVyKClcbiAgICAgICAgcmV0dXJuIGNhcmRcbiAgICB9XG5cbiAgICBpc0luc2lkZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4geCA+PSB0aGlzLnBvc2l0aW9uLnggJiYgeSA+PSB0aGlzLnBvc2l0aW9uLnkgJiYgXG4gICAgICAgIHggPCB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLnNpemUueCAmJiB5IDwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLnlcbiAgICB9XG5cbiAgICBnZXREcmFnZ2FibGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBEcmFnZ2FibGUge1xuICAgICAgICBpZighdGhpcy5pc0luc2lkZSh4LCB5KSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUxhc3QoKVxuICAgIH1cblxuICAgIGdldCBkcm9wUG9pbnQoKTogUG9pbnQge1xuICAgICAgICByZXR1cm4gbmV3IFBvaW50KDAsIDApXG4gICAgfVxufVxuXG5leHBvcnQgeyBGb3VuZGF0aW9uUGlsZVZpZXcgfSIsImltcG9ydCB7IENhcmQgfSBmcm9tIFwiLi9DYXJkXCJcbmltcG9ydCB7IEZhbiB9IGZyb20gXCIuL0ZhblwiXG5cbmNsYXNzIFRhYmxlYXUge1xuICAgIGNsb3NlZCA9IG5ldyBBcnJheTxDYXJkPigpXG4gICAgZmFuID0gbmV3IEZhbigpXG5cbiAgICBhZGRDbG9zZWQoY2FyZDogQ2FyZCkge1xuICAgICAgICB0aGlzLmNsb3NlZC5wdXNoKGNhcmQpXG4gICAgfVxuXG4gICAgb3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgaWYoIXRoaXMuZmFuLmlzRW1wdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMuY2xvc2VkLmxlbmd0aFxuXG4gICAgICAgIGlmKGxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xvc2VkLnNwbGljZSgtMSwgMSlcblxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJlbW92ZUZhbigpIHtcbiAgICAgICAgdGhpcy5mYW4gPSBuZXcgRmFuKClcbiAgICB9XG5cbiAgICBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmFuLmlzRW1wdHkgJiYgdGhpcy5jbG9zZWQubGVuZ3RoID09IDBcbiAgICB9XG59XG5cbmV4cG9ydCB7IFRhYmxlYXUgfSIsImltcG9ydCB7IFBpbGVWaWV3IH0gZnJvbSBcIi4vUGlsZVZpZXdcIlxuaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSBcIi4vRHJhZ2dhYmxlXCJcbmltcG9ydCB7IExheW91dFZpZXcgfSBmcm9tIFwiLi9MYXlvdXRWaWV3XCJcbmltcG9ydCB7IENhcmRWaWV3IH0gZnJvbSBcIi4vQ2FyZFZpZXdcIlxuaW1wb3J0IHsgRmFuVmlldyB9IGZyb20gXCIuL0ZhblZpZXdcIlxuaW1wb3J0IHsgVGFibGVhdSB9IGZyb20gXCIuLi9tb2RlbHMvVGFibGVhdVwiXG5pbXBvcnQgeyBDb25zdHMgfSBmcm9tIFwiLi4vdXRpbC9Db25zdHNcIlxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vdXRpbC9Qb2ludFwiXG5cbmNsYXNzIFRhYmxlYXVWaWV3IGV4dGVuZHMgUGlsZVZpZXcge1xuICAgIGNsb3NlZCA9IG5ldyBBcnJheTxDYXJkVmlldz4oKVxuICAgIGZhbjogRmFuVmlld1xuICAgIHRhYmxlYXU6IFRhYmxlYXVcblxuICAgIGNvbnN0cnVjdG9yKHRhYmxlYXU6IFRhYmxlYXUpIHtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICBpZiAoIXRhYmxlYXUuaXNFbXB0eSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm9uIGVtcHR5IHRhYmxlYXVcIilcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGFibGVhdSA9IHRhYmxlYXVcbiAgICAgICAgdGhpcy5mYW4gPSBuZXcgRmFuVmlldyh0YWJsZWF1LmZhbilcbiAgICB9XG5cbiAgICBhZGRDbG9zZWQoY2FyZDogQ2FyZFZpZXcpIHtcbiAgICAgICAgdGhpcy50YWJsZWF1LmFkZENsb3NlZChjYXJkLmNhcmQpXG4gICAgICAgIHRoaXMuY2xvc2VkLnB1c2goY2FyZClcbiAgICB9XG5cbiAgICBvcGVuKCkge1xuICAgICAgICBpZiAoIXRoaXMudGFibGVhdS5vcGVuKCkpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCBjYXJkID0gdGhpcy5jbG9zZWRbdGhpcy5jbG9zZWQubGVuZ3RoIC0gMV1cbiAgICAgICAgdGhpcy5jbG9zZWQuc3BsaWNlKC0xLCAxKVxuICAgICAgICBjYXJkLm9wZW4oKVxuICAgICAgICB0aGlzLmZhbi5hZGRDYXJkKGNhcmQpXG4gICAgICAgIHRoaXMucmVuZGVyKClcbiAgICB9XG5cbiAgICBnZXQgeUNsb3NlZCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gQ29uc3RzLkNsb3NlZEdhcEZhY3RvciAqIHRoaXMuc2l6ZS55ICogdGhpcy5jbG9zZWQubGVuZ3RoXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBzdXBlci5yZW5kZXIoKVxuXG4gICAgICAgIGlmICh0aGlzLnRhYmxlYXUuaXNFbXB0eSkge1xuICAgICAgICAgICAgbGV0IGhvbGRlciA9IENhcmRWaWV3LmNyZWF0ZUhvbGRlcih0aGlzLnNpemUpXG4gICAgICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQoaG9sZGVyKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2xvc2VkLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgY2FyZCA9IHRoaXMuY2xvc2VkW2ldXG4gICAgICAgICAgICBjYXJkLnBvc2l0aW9uID0gbmV3IFBvaW50KDAsIENvbnN0cy5DbG9zZWRHYXBGYWN0b3IgKiB0aGlzLnNpemUueSAqIGkpXG4gICAgICAgICAgICBjYXJkLnNpemUgPSB0aGlzLnNpemVcbiAgICAgICAgICAgIGNhcmQucmVuZGVyKClcbiAgICAgICAgICAgIHRoaXMuZy5hcHBlbmRDaGlsZChjYXJkLmcpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZhbi5wb3NpdGlvbiA9IG5ldyBQb2ludCgwLCB0aGlzLnlDbG9zZWQpXG4gICAgICAgIHRoaXMuZmFuLnNpemUgPSB0aGlzLnNpemVcbiAgICAgICAgdGhpcy5mYW4ucmVuZGVyKClcbiAgICAgICAgdGhpcy5nLmFwcGVuZENoaWxkKHRoaXMuZmFuLmcpXG4gICAgfVxuXG4gICAgaXNJbnNpZGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgeCAtPSB0aGlzLnBvc2l0aW9uLnhcbiAgICAgICAgeSAtPSB0aGlzLnBvc2l0aW9uLnlcblxuICAgICAgICBpZiAodGhpcy5mYW4uaXNJbnNpZGUoeCwgeSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jbG9zZWQubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGhlaWdodCA9IENvbnN0cy5DbG9zZWRHYXBGYWN0b3IgKiB0aGlzLnNpemUueSAqICh0aGlzLmNsb3NlZC5sZW5ndGggLSAxKSArIHRoaXMuc2l6ZS55XG4gICAgICAgIHJldHVybiB4ID49IDAgJiYgeSA+PSAwICYmXG4gICAgICAgICAgICB4IDwgdGhpcy5zaXplLnggJiYgeSA8IGhlaWdodFxuICAgIH1cblxuICAgIGdldERyYWdnYWJsZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IERyYWdnYWJsZSB7XG4gICAgICAgIHggLT0gdGhpcy5wb3NpdGlvbi54XG4gICAgICAgIHkgLT0gdGhpcy5wb3NpdGlvbi55XG5cbiAgICAgICAgbGV0IGRyYWdnYWJsZSA9IHRoaXMuZmFuLmdldERyYWdnYWJsZSh4LCB5KVxuICAgICAgICBpZiAoZHJhZ2dhYmxlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBkcmFnZ2FibGVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZhbi5mYW4uaXNFbXB0eSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZhbi5pc0luc2lkZSh4LCB5KSkge1xuICAgICAgICAgICAgZHJhZ2dhYmxlID0gdGhpcy5mYW5cbiAgICAgICAgICAgIHRoaXMudGFibGVhdS5yZW1vdmVGYW4oKVxuICAgICAgICAgICAgdGhpcy5mYW4gPSBuZXcgRmFuVmlldyh0aGlzLnRhYmxlYXUuZmFuKVxuICAgICAgICAgICAgZHJhZ2dhYmxlLnBvc2l0aW9uID0gTGF5b3V0Vmlldy5nZXRBYnNvbHV0ZVBvc2l0aW9uKGRyYWdnYWJsZS5nKVxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKVxuXG4gICAgICAgICAgICByZXR1cm4gZHJhZ2dhYmxlXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGdldCBkcm9wUG9pbnQoKTogUG9pbnQge1xuICAgICAgICBpZiAodGhpcy5mYW4uZmFuLmlzRW1wdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9pbnQoMCwgdGhpcy55Q2xvc2VkKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBvaW50ID0gdGhpcy5mYW4uZHJvcFBvaW50XG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvaW50KHBvaW50LnggKyB0aGlzLmZhbi5wb3NpdGlvbi54LCBwb2ludC55ICsgdGhpcy5mYW4ucG9zaXRpb24ueSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbkFkZChkcmFnZ2FibGU6IERyYWdnYWJsZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZHJhZ2dhYmxlIGluc3RhbmNlb2YgQ2FyZFZpZXcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZhbi5jYW5BZGRDYXJkKGRyYWdnYWJsZSlcbiAgICAgICAgfSBlbHNlIGlmIChkcmFnZ2FibGUgaW5zdGFuY2VvZiBGYW5WaWV3KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mYW4uY2FuQWRkRmFuKGRyYWdnYWJsZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkKGRyYWdnYWJsZTogRHJhZ2dhYmxlKSB7XG4gICAgICAgIGlmICghdGhpcy5jYW5BZGQoZHJhZ2dhYmxlKSkge1xuICAgICAgICAgICAgLy90aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWRkIHRvIHRhYmxlYXVcIilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkcmFnZ2FibGUgaW5zdGFuY2VvZiBDYXJkVmlldykge1xuICAgICAgICAgICAgZHJhZ2dhYmxlLm9wZW4oKVxuICAgICAgICAgICAgdGhpcy5mYW4uYWRkQ2FyZChkcmFnZ2FibGUpXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpXG4gICAgICAgIH0gZWxzZSBpZiAoZHJhZ2dhYmxlIGluc3RhbmNlb2YgRmFuVmlldykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmFuLmZhbi5pc0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mYW4gPSBkcmFnZ2FibGVcbiAgICAgICAgICAgICAgICB0aGlzLnRhYmxlYXUuZmFuID0gdGhpcy5mYW4uZmFuXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZhbi5hZGRGYW4oZHJhZ2dhYmxlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJEcmFnZ2VkKCkge1xuICAgICAgICBpZiAodGhpcy5mYW4uZmFuLmlzRW1wdHkpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbigpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVMYXN0KCk6IENhcmRWaWV3IHtcbiAgICAgICAgaWYodGhpcy5mYW4uZmFuLmlzU2luZ2xlKSB7XG4gICAgICAgICAgICB0aGlzLnRhYmxlYXUucmVtb3ZlRmFuKClcbiAgICAgICAgICAgIGxldCBjYXJkID0gdGhpcy5mYW4uY2FyZFxuICAgICAgICAgICAgdGhpcy5mYW4gPSBuZXcgRmFuVmlldyh0aGlzLnRhYmxlYXUuZmFuKVxuICAgICAgICAgICAgY2FyZC5wb3NpdGlvbiA9IExheW91dFZpZXcuZ2V0QWJzb2x1dGVQb3NpdGlvbihjYXJkLmcpXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpXG4gICAgICAgICAgICByZXR1cm4gY2FyZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmFuLnJlbW92ZUxhc3QoKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgeyBUYWJsZWF1VmlldyB9IiwiaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuL0NhcmRcIlxuaW1wb3J0IHsgUmFua1V0aWwgfSBmcm9tIFwiLi9SYW5rXCJcbmltcG9ydCB7IFN1aXRVdGlsIH0gZnJvbSBcIi4vU3VpdFwiXG5cbmNsYXNzIEhhbmQge1xuICAgIGNhcmRzID0gbmV3IEFycmF5PENhcmQ+KClcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBmb3IobGV0IHN1aXQgb2YgU3VpdFV0aWwuU3VpdHMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgcmFuayBvZiBSYW5rVXRpbC5SYW5rcykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FyZHMucHVzaChuZXcgQ2FyZChzdWl0LCByYW5rKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZChjYXJkOiBDYXJkKSB7XG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChjYXJkKVxuICAgIH1cblxuICAgIHNodWZmbGUoKSB7XG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLmNhcmRzLmxlbmd0aFxuXG4gICAgICAgIGlmKGxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobGVuZ3RoIC0gaSkpICsgaVxuICAgICAgICAgICAgbGV0IHRtcCA9IHRoaXMuY2FyZHNbaV1cbiAgICAgICAgICAgIHRoaXMuY2FyZHNbaV0gPSB0aGlzLmNhcmRzW2pdXG4gICAgICAgICAgICB0aGlzLmNhcmRzW2pdID0gdG1wXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVMYXN0KCkge1xuICAgICAgICB0aGlzLmNhcmRzLnNwbGljZSgtMSwgMSlcbiAgICB9XG59XG5cbmV4cG9ydCB7IEhhbmQgfSIsImltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi9WaWV3XCJcbmltcG9ydCB7IENhcmRWaWV3IH0gZnJvbSBcIi4vQ2FyZFZpZXdcIlxuaW1wb3J0IHsgTGF5b3V0VmlldyB9IGZyb20gXCIuL0xheW91dFZpZXdcIlxuaW1wb3J0IHsgSGFuZCB9IGZyb20gXCIuLi9tb2RlbHMvSGFuZFwiXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi91dGlsL1BvaW50XCJcblxuY2xhc3MgSGFuZFZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBoYW5kOiBIYW5kO1xuICAgIGNhcmRzID0gbmV3IEFycmF5PENhcmRWaWV3PigpXG5cbiAgICBjb25zdHJ1Y3RvcihoYW5kOiBIYW5kKSB7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5oYW5kID0gaGFuZFxuICAgICAgICBmb3IobGV0IGNhcmQgb2YgaGFuZC5jYXJkcykge1xuICAgICAgICAgICAgbGV0IGNhcmRWaWV3ID0gbmV3IENhcmRWaWV3KGNhcmQpXG4gICAgICAgICAgICBjYXJkVmlldy5jbG9zZSgpXG4gICAgICAgICAgICB0aGlzLmNhcmRzLnB1c2goY2FyZFZpZXcpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHN1cGVyLnJlbmRlcigpXG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLmNhcmRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBsZXQgaG9sZGVyID0gQ2FyZFZpZXcuY3JlYXRlSG9sZGVyKHRoaXMuc2l6ZSlcbiAgICAgICAgICAgIHRoaXMuZy5hcHBlbmRDaGlsZChob2xkZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgY2FyZCA9IHRoaXMuY2FyZHNbdGhpcy5jYXJkcy5sZW5ndGggLSAxXVxuICAgICAgICAgICAgY2FyZC5wb3NpdGlvbiA9IG5ldyBQb2ludCgwLCAwKVxuICAgICAgICAgICAgY2FyZC5zaXplID0gdGhpcy5zaXplXG4gICAgICAgICAgICBjYXJkLnJlbmRlcigpXG4gICAgICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQoY2FyZC5nKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkKGNhcmQ6IENhcmRWaWV3KSB7XG4gICAgICAgIGNhcmQuY2xvc2UoKVxuICAgICAgICB0aGlzLmNhcmRzLnB1c2goY2FyZClcbiAgICAgICAgdGhpcy5oYW5kLmFkZChjYXJkLmNhcmQpXG4gICAgICAgIHRoaXMucmVuZGVyKClcbiAgICB9XG5cbiAgICByZW1vdmVMYXN0KCk6IENhcmRWaWV3IHtcbiAgICAgICAgdGhpcy5oYW5kLnJlbW92ZUxhc3QoKVxuICAgICAgICBsZXQgY2FyZCA9IHRoaXMuY2FyZHNbdGhpcy5jYXJkcy5sZW5ndGggLSAxXVxuICAgICAgICB0aGlzLmNhcmRzLnNwbGljZSgtMSwgMSlcbiAgICAgICAgY2FyZC5wb3NpdGlvbiA9IExheW91dFZpZXcuZ2V0QWJzb2x1dGVQb3NpdGlvbihjYXJkLmcpXG4gICAgICAgIHRoaXMucmVuZGVyKClcbiAgICAgICAgcmV0dXJuIGNhcmRcbiAgICB9XG5cbiAgICBpc0luc2lkZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4geCA+PSB0aGlzLnBvc2l0aW9uLnggJiYgeSA+PSB0aGlzLnBvc2l0aW9uLnkgJiYgXG4gICAgICAgIHggPCB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLnNpemUueCAmJiB5IDwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLnlcbiAgICB9XG5cbiAgICBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FyZHMubGVuZ3RoID09IDBcbiAgICB9XG59XG5cbmV4cG9ydCB7IEhhbmRWaWV3IH0iLCJpbXBvcnQgeyBDYXJkIH0gZnJvbSBcIi4vQ2FyZFwiXG5cbmNsYXNzIFdhc3RlUGlsZSB7XG4gICAgY2FyZHMgPSBuZXcgQXJyYXk8Q2FyZD4oKVxuXG4gICAgYWRkKGNhcmQ6IENhcmQpIHtcbiAgICAgICAgdGhpcy5jYXJkcy5wdXNoKGNhcmQpXG4gICAgfVxuXG4gICAgcmVtb3ZlTGFzdCgpIHtcbiAgICAgICAgdGhpcy5jYXJkcy5zcGxpY2UoLTEsIDEpXG4gICAgfVxuXG4gICAgcmVtb3ZlQWxsKCkge1xuICAgICAgICB0aGlzLmNhcmRzID0gbmV3IEFycmF5PENhcmQ+KClcbiAgICB9XG5cbiAgICBnZXQgbGFzdCgpOiBDYXJkIHtcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMuY2FyZHMubGVuZ3RoXG4gICAgICAgIGlmKGxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNhcmRzW2xlbmd0aCAtIDFdXG4gICAgfVxufVxuXG5leHBvcnQgeyBXYXN0ZVBpbGUgfSIsImltcG9ydCB7IFBpbGVWaWV3IH0gZnJvbSBcIi4vUGlsZVZpZXdcIlxuaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSBcIi4vRHJhZ2dhYmxlXCJcbmltcG9ydCB7IENhcmRWaWV3IH0gZnJvbSBcIi4vQ2FyZFZpZXdcIlxuaW1wb3J0IHsgTGF5b3V0VmlldyB9IGZyb20gXCIuL0xheW91dFZpZXdcIlxuaW1wb3J0IHsgV2FzdGVQaWxlIH0gZnJvbSBcIi4uL21vZGVscy9XYXN0ZVBpbGVcIlxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vdXRpbC9Qb2ludFwiXG5cbmNsYXNzIFdhc3RlUGlsZVZpZXcgZXh0ZW5kcyBQaWxlVmlldyB7XG4gICAgd2FzdGU6IFdhc3RlUGlsZVxuICAgIGNhcmRzID0gbmV3IEFycmF5PENhcmRWaWV3PigpXG5cbiAgICBjb25zdHJ1Y3Rvcih3YXN0ZTogV2FzdGVQaWxlKSB7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy53YXN0ZSA9IHdhc3RlXG5cbiAgICAgICAgZm9yKGxldCBjYXJkIG9mIHdhc3RlLmNhcmRzKSB7XG4gICAgICAgICAgICBsZXQgY2FyZFZpZXcgPSBuZXcgQ2FyZFZpZXcoY2FyZClcbiAgICAgICAgICAgIGNhcmRWaWV3LmNsb3NlKClcbiAgICAgICAgICAgIHRoaXMuY2FyZHMucHVzaChjYXJkVmlldylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgc3VwZXIucmVuZGVyKClcblxuICAgICAgICBpZih0aGlzLmNhcmRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBsZXQgaG9sZGVyID0gQ2FyZFZpZXcuY3JlYXRlSG9sZGVyKHRoaXMuc2l6ZSlcbiAgICAgICAgICAgIHRoaXMuZy5hcHBlbmRDaGlsZChob2xkZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgY2FyZCA9IHRoaXMuY2FyZHNbdGhpcy5jYXJkcy5sZW5ndGggLSAxXVxuICAgICAgICAgICAgY2FyZC5wb3NpdGlvbiA9IG5ldyBQb2ludCgwLCAwKVxuICAgICAgICAgICAgY2FyZC5zaXplID0gdGhpcy5zaXplXG4gICAgICAgICAgICBjYXJkLnJlbmRlcigpXG4gICAgICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQoY2FyZC5nKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuQWRkKGRyYWdnYWJsZTogRHJhZ2dhYmxlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGFkZChkcmFnZ2FibGU6IERyYWdnYWJsZSkge1xuICAgICAgICBpZihkcmFnZ2FibGUgaW5zdGFuY2VvZiBDYXJkVmlldykge1xuICAgICAgICAgICAgZHJhZ2dhYmxlLm9wZW4oKVxuICAgICAgICAgICAgdGhpcy5jYXJkcy5wdXNoKGRyYWdnYWJsZSlcbiAgICAgICAgICAgIHRoaXMud2FzdGUuYWRkKGRyYWdnYWJsZS5jYXJkKVxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGFkZCB0byB3YXN0ZSBwaWxlXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVMYXN0KCk6IENhcmRWaWV3IHtcbiAgICAgICAgaWYodGhpcy5jYXJkcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud2FzdGUucmVtb3ZlTGFzdCgpXG4gICAgICAgIGxldCBjYXJkID0gdGhpcy5jYXJkc1t0aGlzLmNhcmRzLmxlbmd0aCAtIDFdXG4gICAgICAgIHRoaXMuY2FyZHMuc3BsaWNlKC0xLCAxKVxuICAgICAgICBjYXJkLnBvc2l0aW9uID0gTGF5b3V0Vmlldy5nZXRBYnNvbHV0ZVBvc2l0aW9uKGNhcmQuZylcbiAgICAgICAgdGhpcy5yZW5kZXIoKVxuICAgICAgICByZXR1cm4gY2FyZFxuICAgIH1cblxuICAgIHJlbW92ZUFsbCgpOiBBcnJheTxDYXJkVmlldz4ge1xuICAgICAgICBsZXQgcmVtb3ZlZCA9IHRoaXMuY2FyZHNcbiAgICAgICAgdGhpcy5jYXJkcyA9IG5ldyBBcnJheTxDYXJkVmlldz4oKVxuICAgICAgICB0aGlzLndhc3RlLnJlbW92ZUFsbCgpXG4gICAgICAgIHRoaXMucmVuZGVyKClcblxuICAgICAgICByZXR1cm4gcmVtb3ZlZFxuICAgIH1cblxuICAgIGlzSW5zaWRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB4ID49IHRoaXMucG9zaXRpb24ueCAmJiB5ID49IHRoaXMucG9zaXRpb24ueSAmJiBcbiAgICAgICAgeCA8IHRoaXMucG9zaXRpb24ueCArIHRoaXMuc2l6ZS54ICYmIHkgPCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnNpemUueVxuICAgIH1cblxuXG4gICAgZ2V0RHJhZ2dhYmxlKHg6IG51bWJlciwgeTogbnVtYmVyKTogRHJhZ2dhYmxlIHtcbiAgICAgICAgaWYoIXRoaXMuaXNJbnNpZGUoeCwgeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVMYXN0KClcbiAgICB9XG5cblxuICAgZ2V0IGRyb3BQb2ludCgpOiBQb2ludCB7XG4gICAgICAgcmV0dXJuIG5ldyBQb2ludCgwLCAwKVxuICAgfVxufVxuXG5leHBvcnQgeyBXYXN0ZVBpbGVWaWV3IH0iLCJpbXBvcnQgeyBIYW5kIH0gZnJvbSBcIi4vSGFuZFwiXG5pbXBvcnQgeyBGb3VuZGF0aW9uUGlsZSB9IGZyb20gXCIuL0ZvdW5kYXRpb25QaWxlXCJcbmltcG9ydCB7IFRhYmxlYXUgfSBmcm9tIFwiLi9UYWJsZWF1XCJcbmltcG9ydCB7IFdhc3RlUGlsZSB9IGZyb20gXCIuL1dhc3RlUGlsZVwiXG5cbmNsYXNzIExheW91dCB7XG4gICAgZm91bmRhdGlvbnMgPSBuZXcgQXJyYXk8Rm91bmRhdGlvblBpbGU+KClcbiAgICB0YWJsZWF1cyA9IG5ldyBBcnJheTxUYWJsZWF1PigpXG4gICAgaGFuZDogSGFuZFxuICAgIHdhc3RlID0gbmV3IFdhc3RlUGlsZSgpXG5cbiAgICBjb25zdHJ1Y3RvcihoYW5kOiBIYW5kKSB7XG4gICAgICAgIHRoaXMuaGFuZCA9IGhhbmRcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5mb3VuZGF0aW9ucy5wdXNoKG5ldyBGb3VuZGF0aW9uUGlsZSgpKVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA3OyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMudGFibGVhdXMucHVzaChuZXcgVGFibGVhdSgpKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgeyBMYXlvdXQgfSIsImltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi9WaWV3XCJcbmltcG9ydCB7IERyYWdnYWJsZSB9IGZyb20gXCIuL0RyYWdnYWJsZVwiXG5pbXBvcnQgeyBGb3VuZGF0aW9uUGlsZVZpZXcgfSBmcm9tIFwiLi9Gb3VuZGF0aW9uUGlsZVZpZXdcIlxuaW1wb3J0IHsgVGFibGVhdVZpZXcgfSBmcm9tIFwiLi9UYWJsZWF1Vmlld1wiXG5pbXBvcnQgeyBIYW5kVmlldyB9IGZyb20gXCIuL0hhbmRWaWV3XCJcbmltcG9ydCB7IFdhc3RlUGlsZVZpZXcgfSBmcm9tIFwiLi9XYXN0ZVBpbGVWaWV3XCJcbmltcG9ydCB7IFBpbGVWaWV3IH0gZnJvbSBcIi4vUGlsZVZpZXdcIlxuaW1wb3J0IHsgTGF5b3V0IH0gZnJvbSBcIi4uL21vZGVscy9MYXlvdXRcIlxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vdXRpbC9Qb2ludFwiXG5pbXBvcnQgeyBDb25zdHMgfSBmcm9tIFwiLi4vdXRpbC9Db25zdHNcIlxuXG5jbGFzcyBMYXlvdXRWaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgZm91bmRhdGlvbnMgPSBuZXcgQXJyYXk8Rm91bmRhdGlvblBpbGVWaWV3PigpXG4gICAgdGFibGVhdXMgPSBuZXcgQXJyYXk8VGFibGVhdVZpZXc+KClcbiAgICBoYW5kOiBIYW5kVmlld1xuICAgIHdhc3RlOiBXYXN0ZVBpbGVWaWV3XG4gICAgcGlsZXMgPSBuZXcgQXJyYXk8UGlsZVZpZXc+KClcbiAgICBsYXlvdXQ6IExheW91dFxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ0xheW91dDogU1ZHR0VsZW1lbnRcbiAgICBzdGF0aWMgZ2V0QWJzb2x1dGVQb3NpdGlvbihnOiBTVkdHRWxlbWVudCk6IFBvaW50IHtcbiAgICAgICAgbGV0IHAgPSBuZXcgUG9pbnQoMCwgMClcbiAgICAgICAgd2hpbGUoZyAhPSBudWxsICYmIGcgIT0gTGF5b3V0Vmlldy5nTGF5b3V0KSB7XG4gICAgICAgICAgICBsZXQgdHJhbnNsYXRlID0gZy5nZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIilcbiAgICAgICAgICAgIGlmKHRyYW5zbGF0ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlID0gXCJ0cmFuc2xhdGUoMCwwKVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmFuc2xhdGUgPSB0cmFuc2xhdGUuc3Vic3RyKFwidHJhbnNsYXRlXCIubGVuZ3RoKVxuICAgICAgICAgICAgdHJhbnNsYXRlID0gdHJhbnNsYXRlLnJlcGxhY2UoXCIoXCIsIFwiXCIpXG4gICAgICAgICAgICB0cmFuc2xhdGUgPSB0cmFuc2xhdGUucmVwbGFjZShcIilcIiwgXCJcIilcbiAgICAgICAgICAgIGxldCBzcGxpdCA9IHRyYW5zbGF0ZS5zcGxpdChcIixcIilcbiAgICAgICAgICAgIGlmKHNwbGl0Lmxlbmd0aCAhPSAyKSB7XG4gICAgICAgICAgICAgICAgc3BsaXQgPSBbXCJcIiwgXCJcIl1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHggPSBwYXJzZUZsb2F0KHNwbGl0WzBdKVxuICAgICAgICAgICAgbGV0IHkgPSBwYXJzZUZsb2F0KHNwbGl0WzFdKVxuICAgICAgICAgICAgaWYoaXNOYU4oeCkpIHtcbiAgICAgICAgICAgICAgICB4ID0gMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoaXNOYU4oeSkpIHtcbiAgICAgICAgICAgICAgICB5ID0gMFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwLnggKz0geFxuICAgICAgICAgICAgcC55ICs9IHlcblxuICAgICAgICAgICAgbGV0IHBhcmVudCA9IGcucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgaWYocGFyZW50IGluc3RhbmNlb2YgU1ZHR0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBnID0gcGFyZW50XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcFxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGxheW91dDogTGF5b3V0KSB7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgTGF5b3V0Vmlldy5nTGF5b3V0ID0gdGhpcy5nXG4gICAgICAgIHRoaXMubGF5b3V0ID0gbGF5b3V0XG4gICAgICAgIHRoaXMuaGFuZCA9IG5ldyBIYW5kVmlldyhsYXlvdXQuaGFuZClcbiAgICAgICAgdGhpcy53YXN0ZSA9IG5ldyBXYXN0ZVBpbGVWaWV3KGxheW91dC53YXN0ZSlcbiAgICAgICAgdGhpcy5waWxlcy5wdXNoKHRoaXMud2FzdGUpXG4gICAgICAgIGZvciAobGV0IGYgb2YgbGF5b3V0LmZvdW5kYXRpb25zKSB7XG4gICAgICAgICAgICBsZXQgdiA9IG5ldyBGb3VuZGF0aW9uUGlsZVZpZXcoZilcbiAgICAgICAgICAgIHRoaXMuZm91bmRhdGlvbnMucHVzaCh2KVxuICAgICAgICAgICAgdGhpcy5waWxlcy5wdXNoKHYpXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgdCBvZiBsYXlvdXQudGFibGVhdXMpIHtcbiAgICAgICAgICAgIGxldCB2ID0gbmV3IFRhYmxlYXVWaWV3KHQpXG4gICAgICAgICAgICB0aGlzLnRhYmxlYXVzLnB1c2godilcbiAgICAgICAgICAgIHRoaXMucGlsZXMucHVzaCh2KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0aW1lOiBudW1iZXIgPSAwXG4gICAgY2FyZFNpemU6IFBvaW50XG4gICAgcHJpdmF0ZSBibG9ja1NpemU6IFBvaW50XG5cbiAgICBzZXRTaXplKHNpemU6IFBvaW50KSB7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemVcbiAgICAgICAgbGV0IGNhcmRXaWR0aCA9IChzaXplLnggLSAyICogQ29uc3RzLk1hcmdpbikgLyA3ICogMC45XG4gICAgICAgIHRoaXMuY2FyZFNpemUgPSBuZXcgUG9pbnQoY2FyZFdpZHRoLCBjYXJkV2lkdGggKiAxLjYxOClcbiAgICAgICAgdGhpcy5ibG9ja1NpemUgPSBuZXcgUG9pbnQodGhpcy5jYXJkU2l6ZS54IC8gMC45LFxuICAgICAgICAgICAgdGhpcy5jYXJkU2l6ZS55IC8gMC45KVxuXG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHN1cGVyLnJlbmRlcigpXG4gICAgICAgIHRoaXMucmVuZGVySGFuZCgpXG4gICAgICAgIHRoaXMucmVuZGVyV2FzdGUoKVxuICAgICAgICB0aGlzLnJlbmRlckZvdW5kYXRpb25zKClcbiAgICAgICAgdGhpcy5yZW5kZXJUYWJsZWF1cygpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJIYW5kKCkge1xuICAgICAgICB0aGlzLmhhbmQucG9zaXRpb24gPSBuZXcgUG9pbnQoNiAqIHRoaXMuYmxvY2tTaXplLnggKyBDb25zdHMuTWFyZ2luLFxuICAgICAgICAgICAgMC41ICogdGhpcy5ibG9ja1NpemUueSlcbiAgICAgICAgdGhpcy5oYW5kLnNpemUgPSB0aGlzLmNhcmRTaXplXG4gICAgICAgIHRoaXMuaGFuZC5yZW5kZXIoKVxuICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQodGhpcy5oYW5kLmcpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJXYXN0ZSgpIHtcbiAgICAgICAgdGhpcy53YXN0ZS5wb3NpdGlvbiA9IG5ldyBQb2ludCg0LjUgKiB0aGlzLmJsb2NrU2l6ZS54ICsgQ29uc3RzLk1hcmdpbixcbiAgICAgICAgICAgIDAuNSAqIHRoaXMuYmxvY2tTaXplLnkpXG4gICAgICAgIHRoaXMud2FzdGUuc2l6ZSA9IHRoaXMuY2FyZFNpemVcbiAgICAgICAgdGhpcy53YXN0ZS5yZW5kZXIoKVxuICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQodGhpcy53YXN0ZS5nKVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyRm91bmRhdGlvbnMoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5mb3VuZGF0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGZvdW5kYXRpb24gPSB0aGlzLmZvdW5kYXRpb25zW2ldXG4gICAgICAgICAgICBmb3VuZGF0aW9uLnBvc2l0aW9uID0gbmV3IFBvaW50KGkgKiB0aGlzLmJsb2NrU2l6ZS54ICsgQ29uc3RzLk1hcmdpbixcbiAgICAgICAgICAgICAgICAwLjUgKiB0aGlzLmJsb2NrU2l6ZS55KVxuICAgICAgICAgICAgZm91bmRhdGlvbi5zaXplID0gdGhpcy5jYXJkU2l6ZVxuICAgICAgICAgICAgZm91bmRhdGlvbi5yZW5kZXIoKVxuICAgICAgICAgICAgdGhpcy5nLmFwcGVuZENoaWxkKGZvdW5kYXRpb24uZylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyVGFibGVhdXMoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJsZWF1cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IHRhYmxlYXUgPSB0aGlzLnRhYmxlYXVzW2ldXG4gICAgICAgICAgICB0YWJsZWF1LnBvc2l0aW9uID0gbmV3IFBvaW50KGkgKiB0aGlzLmJsb2NrU2l6ZS54ICsgQ29uc3RzLk1hcmdpbixcbiAgICAgICAgICAgICAgICAyICogdGhpcy5ibG9ja1NpemUueSlcbiAgICAgICAgICAgIHRhYmxlYXUuc2l6ZSA9IHRoaXMuY2FyZFNpemVcbiAgICAgICAgICAgIHRhYmxlYXUucmVuZGVyKClcbiAgICAgICAgICAgIHRoaXMuZy5hcHBlbmRDaGlsZCh0YWJsZWF1LmcpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJHYW1lb3ZlcigpIHtcbiAgICAgICAgbGV0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoVmlldy5TVkdfTkFNRVNQQUNFLCBcInRleHRcIilcbiAgICAgICAgdGV4dC50ZXh0Q29udGVudCA9IFwiR2FtZSBPdmVyIVwiXG4gICAgICAgIHRoaXMuZy5hcHBlbmRDaGlsZCh0ZXh0KVxuICAgIH1cblxuICAgIGZyZWU6IERyYWdnYWJsZSA9IG51bGxcbiAgICBzZXRGcmVlKGZyZWU6IERyYWdnYWJsZSkge1xuICAgICAgICBsZXQgcHJldiA9IHRoaXMuZnJlZVxuICAgICAgICBpZiAocHJldiAhPSBudWxsKSB7XG4gICAgICAgICAgICBwcmV2LmlzRHJhZ2dpbmcgPSBmYWxzZVxuICAgICAgICAgICAgcHJldi5jbGVhclRyYW5zZm9ybSgpXG4gICAgICAgICAgICB0aGlzLmcucmVtb3ZlQ2hpbGQocHJldi5nKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyZWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgZnJlZS5pc0RyYWdnaW5nID0gdHJ1ZVxuICAgICAgICAgICAgZnJlZS5yZW5kZXIoKVxuICAgICAgICAgICAgZnJlZS5nLnJlbW92ZUF0dHJpYnV0ZShcInRyYW5zZm9ybVwiKVxuICAgICAgICAgICAgdGhpcy5nLmFwcGVuZENoaWxkKGZyZWUuZylcbiAgICAgICAgICAgIGZyZWUuc2V0VHJhbnNmb3JtKGZyZWUucG9zaXRpb24pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZyZWUgPSBmcmVlXG4gICAgfVxuXG4gICAgaXNJbnNpZGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgZGVzdGluYXRpb246IFBpbGVWaWV3ID0gbnVsbFxuICAgIHRvdWNoU3RhcnQgPSBuZXcgUG9pbnQoMCwgMClcbiAgICBkcmFnZ2VkOiBQaWxlVmlldyA9IG51bGxcbn1cblxuZXhwb3J0IHsgTGF5b3V0VmlldyB9IiwiZW51bSAgU3RhdHVzVHlwZSB7XG4gICAgUmVhZHksIERlYWxpbmcsIE9wZW5pbmcsIEFuaW1hdGluZywgRHJhZ2dpbmcsIEF1dG9wbGF5LCBHYW1lb3ZlclxufVxuXG5leHBvcnQgeyBTdGF0dXNUeXBlIH0iLCJpbXBvcnQgeyBTdGF0dXNUeXBlIH0gZnJvbSBcIi4vU3RhdHVzVHlwZVwiXG5pbXBvcnQgeyBHYW1lVmlldyB9IGZyb20gXCIuLi9HYW1lVmlld1wiXG5pbXBvcnQgeyBMYXlvdXRWaWV3IH0gZnJvbSBcIi4uL3ZpZXdzL0xheW91dFZpZXdcIlxuXG5hYnN0cmFjdCBjbGFzcyBTdGF0dXMge1xuICAgIGdhbWVWaWV3OiBHYW1lVmlld1xuICAgIGxheW91dFZpZXc6IExheW91dFZpZXdcbiAgICBzdGFydFRpbWUgPSAwXG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lVmlldzogR2FtZVZpZXcpIHtcbiAgICAgICAgdGhpcy5nYW1lVmlldyA9IGdhbWVWaWV3XG4gICAgICAgIHRoaXMubGF5b3V0VmlldyA9IGdhbWVWaWV3LmxheW91dFxuICAgIH1cbiAgICBcbiAgICBlbGFwc2VkVGltZSh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGltZSAtIHRoaXMuc3RhcnRUaW1lXG4gICAgfVxuXG4gICAgc3RhcnQodGltZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGltZVxuICAgIH1cblxuICAgIHRvdWNoU3RhcnRlZCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgIH1cblxuICAgIHRvdWNoTW92ZWQoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICB9XG5cbiAgICB0b3VjaEVuZGVkKCkge1xuICAgIH1cblxuICAgIHRvdWNoQ2FuY2VsbGVkKCkge1xuICAgIH1cbn1cblxuZXhwb3J0IHsgU3RhdHVzIH0iLCJpbXBvcnQgeyBTdGF0dXMgfSBmcm9tIFwiLi9TdGF0dXNcIlxuaW1wb3J0IHsgU3RhdHVzVHlwZSB9IGZyb20gXCIuL1N0YXR1c1R5cGVcIlxuaW1wb3J0IHsgR2FtZVZpZXcgfSBmcm9tIFwiLi4vR2FtZVZpZXdcIlxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vdXRpbC9Qb2ludFwiXG5cbmNsYXNzIFJlYWR5U3RhdHVzIGV4dGVuZHMgU3RhdHVzIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lVmlldzogR2FtZVZpZXcpIHtcbiAgICAgICAgc3VwZXIoZ2FtZVZpZXcpXG4gICAgfVxuXG4gICAgc3RhcnQodGltZTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KHRpbWUpXG4gICAgICAgIHRoaXMubGF5b3V0Vmlldy5zZXRGcmVlKG51bGwpXG4gICAgICAgIHRoaXMubGF5b3V0Vmlldy5kZXN0aW5hdGlvbiA9IG51bGxcbiAgICAgICAgdGhpcy5sYXlvdXRWaWV3LmRyYWdnZWQgPSBudWxsXG5cbiAgICAgICAgaWYodGhpcy5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZmluaXNoKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNGaW5pc2hlZCgpOiBib29sZWFuIHtcbiAgICAgICAgZm9yKGxldCB0IG9mIHRoaXMubGF5b3V0Vmlldy50YWJsZWF1cykge1xuICAgICAgICAgICAgaWYodC5jbG9zZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmlzaCgpIHtcbiAgICAgICAgdGhpcy5nYW1lVmlldy5zZXRTdGF0dXMoU3RhdHVzVHlwZS5BdXRvcGxheSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRUYXBwZWQoKSB7XG4gICAgICAgIC8vU291bmRQbGF5ZXIuaW5zdGFuY2UoKS5wbGF5KFNvdW5kSWQuZHJhZylcblxuICAgICAgICBpZiAodGhpcy5sYXlvdXRWaWV3LmhhbmQuaXNFbXB0eSkge1xuICAgICAgICAgICAgbGV0IGNhcmRzID0gdGhpcy5sYXlvdXRWaWV3Lndhc3RlLnJlbW92ZUFsbCgpXG4gICAgICAgICAgICBjYXJkcy5yZXZlcnNlKClcbiAgICAgICAgICAgIGZvciAobGV0IGNhcmQgb2YgY2FyZHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dFZpZXcuaGFuZC5hZGQoY2FyZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBsYXN0ID0gdGhpcy5sYXlvdXRWaWV3LmhhbmQucmVtb3ZlTGFzdCgpXG4gICAgICAgICAgICBsYXN0Lm9wZW4oKVxuICAgICAgICAgICAgdGhpcy5sYXlvdXRWaWV3LnNldEZyZWUobGFzdClcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Vmlldy5kZXN0aW5hdGlvbiA9IHRoaXMubGF5b3V0Vmlldy53YXN0ZVxuICAgICAgICAgICAgdGhpcy5nYW1lVmlldy5zZXRTdGF0dXMoU3RhdHVzVHlwZS5BbmltYXRpbmcpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b3VjaFN0YXJ0ZWQoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMubGF5b3V0Vmlldy5oYW5kLmlzSW5zaWRlKHgsIHkpKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRUYXBwZWQoKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGF5b3V0Vmlldy5waWxlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IHBpbGUgPSB0aGlzLmxheW91dFZpZXcucGlsZXNbaV1cbiAgICAgICAgICAgIGxldCBkcmFnZ2FibGUgPSBwaWxlLmdldERyYWdnYWJsZSh4LCB5KVxuICAgICAgICAgICAgaWYgKGRyYWdnYWJsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5sYXlvdXRWaWV3LnNldEZyZWUoZHJhZ2dhYmxlKVxuICAgICAgICAgICAgdGhpcy5sYXlvdXRWaWV3LnRvdWNoU3RhcnQgPSBuZXcgUG9pbnQoeCwgeSlcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Vmlldy5kcmFnZ2VkID0gcGlsZVxuICAgICAgICAgICAgdGhpcy5nYW1lVmlldy5zZXRTdGF0dXMoU3RhdHVzVHlwZS5EcmFnZ2luZylcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgeyBSZWFkeVN0YXR1cyB9IiwiaW1wb3J0IHsgU3RhdHVzIH0gZnJvbSBcIi4vU3RhdHVzXCJcbmltcG9ydCB7IFN0YXR1c1R5cGUgfSBmcm9tIFwiLi9TdGF0dXNUeXBlXCJcbmltcG9ydCB7IEdhbWVWaWV3IH0gZnJvbSBcIi4uL0dhbWVWaWV3XCJcblxuY2xhc3MgRGVhbGluZ1N0YXR1cyBleHRlbmRzIFN0YXR1cyB7XG4gICAgY29uc3RydWN0b3IoZ2FtZVZpZXc6IEdhbWVWaWV3KSB7XG4gICAgICAgIHN1cGVyKGdhbWVWaWV3KVxuICAgIH1cblxuICAgIHByaXZhdGUgb3BlbigpIHtcbiAgICAgICAgLy9Tb3VuZFBsYXllci5pbnN0YW5jZSgpLnBsYXkoU291bmRJZC5zaHVmZmxlKVxuICAgICAgICB0aGlzLmdhbWVWaWV3LnNldFN0YXR1cyhTdGF0dXNUeXBlLk9wZW5pbmcpXG4gICAgfVxuXG4gICAgc3RhcnQodGltZTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KHRpbWUpXG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubGF5b3V0Vmlldy50YWJsZWF1cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgZm9yKGxldCBqID0gaTsgaiA8IHRoaXMubGF5b3V0Vmlldy50YWJsZWF1cy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgIGxldCBjYXJkID0gdGhpcy5sYXlvdXRWaWV3LmhhbmQucmVtb3ZlTGFzdCgpXG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRWaWV3LnRhYmxlYXVzW2pdLmFkZENsb3NlZChjYXJkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCh0aGlzLm9wZW4uYmluZCh0aGlzKSwgMzAwKVxuICAgIH1cbn1cblxuZXhwb3J0IHsgRGVhbGluZ1N0YXR1cyB9IiwiaW1wb3J0IHsgU3RhdHVzIH0gZnJvbSBcIi4vU3RhdHVzXCJcbmltcG9ydCB7IFN0YXR1c1R5cGUgfSBmcm9tIFwiLi9TdGF0dXNUeXBlXCJcbmltcG9ydCB7IEdhbWVWaWV3IH0gZnJvbSBcIi4uL0dhbWVWaWV3XCJcblxuY2xhc3MgT3BlbmluZ1N0YXR1cyBleHRlbmRzIFN0YXR1cyB7XG4gICAgY29uc3RydWN0b3IoZ2FtZVZpZXc6IEdhbWVWaWV3KSB7XG4gICAgICAgIHN1cGVyKGdhbWVWaWV3KVxuICAgIH1cblxuICAgIHN0YXJ0KHRpbWU6IG51bWJlcikge1xuICAgICAgICBzdXBlci5zdGFydCh0aW1lKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXlvdXRWaWV3LnRhYmxlYXVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dFZpZXcudGFibGVhdXNbaV0ub3BlbigpXG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVhZHkuYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlYWR5KCkge1xuICAgICAgICB0aGlzLmdhbWVWaWV3LnNldFN0YXR1cyhTdGF0dXNUeXBlLlJlYWR5KVxuICAgIH1cbn1cblxuZXhwb3J0IHsgT3BlbmluZ1N0YXR1cyB9IiwiaW1wb3J0IHsgU3RhdHVzIH0gZnJvbSBcIi4vU3RhdHVzXCJcbmltcG9ydCB7IFN0YXR1c1R5cGUgfSBmcm9tIFwiLi9TdGF0dXNUeXBlXCJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL3V0aWwvUG9pbnRcIlxuaW1wb3J0IHsgQ29uc3RzIH0gZnJvbSBcIi4uL3V0aWwvQ29uc3RzXCJcbmltcG9ydCB7IEdhbWVWaWV3IH0gZnJvbSBcIi4uL0dhbWVWaWV3XCJcbmltcG9ydCB7IExheW91dFZpZXcgfSBmcm9tIFwiLi4vdmlld3MvTGF5b3V0Vmlld1wiXG5cbmNsYXNzIEFuaW1hdGluZ1N0YXR1cyBleHRlbmRzIFN0YXR1cyB7XG4gICAgcHJpdmF0ZSBkaXN0YW5jZSA9IDBcbiAgICBwcml2YXRlIG9yaWdpbiA9IG5ldyBQb2ludCgwLCAwKVxuICAgIHByaXZhdGUgZHJvcFBvaW50ID0gbmV3IFBvaW50KDAsIDApXG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lVmlldzogR2FtZVZpZXcpIHtcbiAgICAgICAgc3VwZXIoZ2FtZVZpZXcpXG4gICAgfVxuXG4gICAgc3RhcnQodGltZTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KHRpbWUpXG5cbiAgICAgICAgbGV0IGZyZWUgPSB0aGlzLmxheW91dFZpZXcuZnJlZVxuICAgICAgICBpZiAoZnJlZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBmcmVlIGVsZW1lbnRcIilcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHRoaXMubGF5b3V0Vmlldy5kZXN0aW5hdGlvblxuICAgICAgICBpZiAoZGVzdGluYXRpb24gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gZGVzdGluYXRpb25cIilcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3JpZ2luID0gbmV3IFBvaW50KGZyZWUucG9zaXRpb24ueCwgZnJlZS5wb3NpdGlvbi55KVxuICAgICAgICB0aGlzLmRyb3BQb2ludCA9IExheW91dFZpZXcuZ2V0QWJzb2x1dGVQb3NpdGlvbihkZXN0aW5hdGlvbi5nKVxuICAgICAgICB0aGlzLmRyb3BQb2ludC54ICs9IGRlc3RpbmF0aW9uLmRyb3BQb2ludC54XG4gICAgICAgIHRoaXMuZHJvcFBvaW50LnkgKz0gZGVzdGluYXRpb24uZHJvcFBvaW50LnlcbiAgICAgICAgdGhpcy5kaXN0YW5jZSA9IHRoaXMub3JpZ2luLmRpc3RhbmNlKHRoaXMuZHJvcFBvaW50KVxuXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5wcm9jZXNzLmJpbmQodGhpcykpXG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHByb2Nlc3ModGltZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBlbGFwc2VkID0gdGhpcy5lbGFwc2VkVGltZSh0aW1lKVxuICAgICAgICBsZXQgZnJlZSA9IHRoaXMubGF5b3V0Vmlldy5mcmVlXG4gICAgICAgIGlmIChmcmVlID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGZyZWUgZWxlbWVudFwiKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1vdmVkID0gZWxhcHNlZCAqIENvbnN0cy5BbmltYXRpb25WZWxvY2l0eSAqIHRoaXMubGF5b3V0Vmlldy5jYXJkU2l6ZS54XG4gICAgICAgIGlmIChtb3ZlZCA+PSB0aGlzLmRpc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmlzaCgpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByYXRpbyA9IG1vdmVkIC8gdGhpcy5kaXN0YW5jZVxuICAgICAgICBmcmVlLnBvc2l0aW9uID0gbmV3IFBvaW50KHRoaXMub3JpZ2luLnggKiAoMSAtIHJhdGlvKSArIHRoaXMuZHJvcFBvaW50LnggKiByYXRpbyxcbiAgICAgICAgICAgIHRoaXMub3JpZ2luLnkgKiAoMSAtIHJhdGlvKSArIHRoaXMuZHJvcFBvaW50LnkgKiByYXRpbylcbiAgICAgICAgZnJlZS5zZXRUcmFuc2Zvcm0oZnJlZS5wb3NpdGlvbilcblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucHJvY2Vzcy5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIHByaXZhdGUgZmluaXNoKCkge1xuICAgICAgICBsZXQgZnJlZSA9IHRoaXMubGF5b3V0Vmlldy5mcmVlXG4gICAgICAgIHRoaXMubGF5b3V0Vmlldy5zZXRGcmVlKG51bGwpXG4gICAgICAgIHRoaXMubGF5b3V0Vmlldy5kZXN0aW5hdGlvbi5hZGQoZnJlZSlcbiAgICAgICAgaWYgKHRoaXMubGF5b3V0Vmlldy5kcmFnZ2VkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Vmlldy5kcmFnZ2VkLmNsZWFyRHJhZ2dlZCgpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nYW1lVmlldy5zZXRTdGF0dXMoU3RhdHVzVHlwZS5SZWFkeSlcbiAgICB9XG59XG5cbmV4cG9ydCB7IEFuaW1hdGluZ1N0YXR1cyB9IiwiaW1wb3J0IHsgU3RhdHVzIH0gZnJvbSBcIi4vU3RhdHVzXCJcbmltcG9ydCB7IFN0YXR1c1R5cGUgfSBmcm9tIFwiLi9TdGF0dXNUeXBlXCJcbmltcG9ydCB7IEdhbWVWaWV3IH0gZnJvbSBcIi4uL0dhbWVWaWV3XCJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL3V0aWwvUG9pbnRcIlxuaW1wb3J0IHsgUGlsZVZpZXcgfSBmcm9tIFwiLi4vdmlld3MvUGlsZVZpZXdcIlxuaW1wb3J0IHsgTGF5b3V0VmlldyB9IGZyb20gXCIuLi92aWV3cy9MYXlvdXRWaWV3XCJcblxuY2xhc3MgRHJhZ2dpbmdTdGF0dXMgZXh0ZW5kcyBTdGF0dXMge1xuICAgIGNvbnN0cnVjdG9yKGdhbWVWaWV3OiBHYW1lVmlldykge1xuICAgICAgICBzdXBlcihnYW1lVmlldylcbiAgICB9XG5cbiAgICBwcml2YXRlIG9yaWdpbiA9IG5ldyBQb2ludCgwLCAwKVxuICAgIHByaXZhdGUgdGltZSA9IDBcbiAgICBwcml2YXRlIHJlcXVlc3RJZCA9IDBcblxuICAgIHN0YXJ0KHRpbWU6IG51bWJlcikge1xuICAgICAgICBzdXBlci5zdGFydCh0aW1lKVxuXG4gICAgICAgIGxldCBmcmVlID0gdGhpcy5sYXlvdXRWaWV3LmZyZWVcbiAgICAgICAgaWYgKGZyZWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gZnJlZSBlbGVtZW50XCIpXG4gICAgICAgIH1cblxuICAgICAgICAvL1NvdW5kUGxheWVyLmluc3RhbmNlKCkucGxheShTb3VuZElkLmRyYWcpXG5cbiAgICAgICAgdGhpcy5vcmlnaW4gPSBuZXcgUG9pbnQoZnJlZS5wb3NpdGlvbi54LCBmcmVlLnBvc2l0aW9uLnkpXG4gICAgICAgIHRoaXMucmVxdWVzdElkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGFuaW1hdGUodGltZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudGltZSA9IHRpbWVcbiAgICAgICAgbGV0IGZyZWUgPSB0aGlzLmxheW91dFZpZXcuZnJlZVxuICAgICAgICBmcmVlLnNldFRyYW5zZm9ybShmcmVlLnBvc2l0aW9uKVxuICAgICAgICB0aGlzLnJlcXVlc3RJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlLmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgdG91Y2hNb3ZlZCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICBsZXQgZnJlZSA9IHRoaXMubGF5b3V0Vmlldy5mcmVlXG4gICAgICAgIGlmIChmcmVlID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGZyZWUgZWxlbWVudFwiKVxuICAgICAgICB9XG5cbiAgICAgICAgZnJlZS5wb3NpdGlvbiA9IG5ldyBQb2ludCh0aGlzLm9yaWdpbi54ICsgeCAtIHRoaXMubGF5b3V0Vmlldy50b3VjaFN0YXJ0LngsXG4gICAgICAgICAgICB0aGlzLm9yaWdpbi55ICsgeSAtIHRoaXMubGF5b3V0Vmlldy50b3VjaFN0YXJ0LnkpXG4gICAgfVxuXG4gICAgdG91Y2hDYW5jZWxsZWQoKSB7XG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJlcXVlc3RJZClcbiAgICAgICAgdGhpcy5jYW5jZWwoKVxuICAgIH1cblxuICAgIHRvdWNoRW5kZWQoKSB7XG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJlcXVlc3RJZClcbiAgICAgICAgaWYgKHRoaXMuZWxhcHNlZFRpbWUodGhpcy50aW1lKSA8IDIwKSB7XG4gICAgICAgICAgICB0aGlzLmRyb3AodHJ1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcChmYWxzZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2FuY2VsKCkge1xuICAgICAgICBsZXQgZHJhZ2dlZCA9IHRoaXMubGF5b3V0Vmlldy5kcmFnZ2VkXG4gICAgICAgIGlmIChkcmFnZ2VkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldoZXJlIHdhcyBpdCBkcmFnZ2VkIGZyb21cIilcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGF5b3V0Vmlldy5kcmFnZ2VkID0gbnVsbFxuICAgICAgICB0aGlzLmxheW91dFZpZXcuZGVzdGluYXRpb24gPSBkcmFnZ2VkXG4gICAgICAgIHRoaXMuZ2FtZVZpZXcuc2V0U3RhdHVzKFN0YXR1c1R5cGUuQW5pbWF0aW5nKVxuICAgIH1cblxuICAgIHByaXZhdGUgZHJvcCh0YXBwZWQ6IEJvb2xlYW4pIHtcbiAgICAgICAgbGV0IGZyZWUgPSB0aGlzLmxheW91dFZpZXcuZnJlZVxuICAgICAgICBpZiAoZnJlZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBmcmVlIGVsZW1lbnRcIilcbiAgICAgICAgfVxuICAgICAgICBsZXQgZHJhZ2dlZCA9IHRoaXMubGF5b3V0Vmlldy5kcmFnZ2VkXG4gICAgICAgIGlmIChkcmFnZ2VkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldoZXJlIHdhcyBpdCBkcmFnZ2VkIGZyb21cIilcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwaWxlcyA9IG5ldyBBcnJheTxQaWxlVmlldz4oKVxuICAgICAgICBmb3IgKGxldCBwIG9mIHRoaXMubGF5b3V0Vmlldy5waWxlcykge1xuICAgICAgICAgICAgcGlsZXMucHVzaChwKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0YXBwZWQpIHtcbiAgICAgICAgICAgIHBpbGVzLnNvcnQoKGl0MSwgaXQyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGRwMSA9IExheW91dFZpZXcuZ2V0QWJzb2x1dGVQb3NpdGlvbihpdDEuZylcbiAgICAgICAgICAgICAgICBkcDEueCArPSBpdDEuZHJvcFBvaW50LnhcbiAgICAgICAgICAgICAgICBkcDEueSArPSBpdDEuZHJvcFBvaW50LnlcblxuICAgICAgICAgICAgICAgIGxldCBkcDIgPSBMYXlvdXRWaWV3LmdldEFic29sdXRlUG9zaXRpb24oaXQyLmcpXG4gICAgICAgICAgICAgICAgZHAyLnggKz0gaXQyLmRyb3BQb2ludC54XG4gICAgICAgICAgICAgICAgZHAyLnkgKz0gaXQyLmRyb3BQb2ludC55XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZnJlZS5wb3NpdGlvbi5kaXN0YW5jZShkcDEpIC0gZnJlZS5wb3NpdGlvbi5kaXN0YW5jZShkcDIpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgcCBvZiBwaWxlcykge1xuICAgICAgICAgICAgaWYgKHAgIT0gZHJhZ2dlZCAmJiBwLmNhbkFkZChmcmVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoKHApXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbmNlbCgpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5pc2gocGlsZTogUGlsZVZpZXcpIHtcbiAgICAgICAgdGhpcy5sYXlvdXRWaWV3LmRlc3RpbmF0aW9uID0gcGlsZVxuICAgICAgICB0aGlzLmdhbWVWaWV3LnNldFN0YXR1cyhTdGF0dXNUeXBlLkFuaW1hdGluZylcbiAgICAgICAgLy9Tb3VuZFBsYXllci5pbnN0YW5jZSgpLnBsYXkoU291bmRJZC5sYW5kKVxuICAgIH1cbn1cblxuZXhwb3J0IHsgRHJhZ2dpbmdTdGF0dXMgfSIsImltcG9ydCB7IFN0YXR1cyB9IGZyb20gXCIuL1N0YXR1c1wiXG5pbXBvcnQgeyBTdGF0dXNUeXBlIH0gZnJvbSBcIi4vU3RhdHVzVHlwZVwiXG5pbXBvcnQgeyBHYW1lVmlldyB9IGZyb20gXCIuLi9HYW1lVmlld1wiXG5pbXBvcnQgeyBDYXJkVmlldyB9IGZyb20gXCIuLi92aWV3cy9DYXJkVmlld1wiXG5pbXBvcnQgeyBQaWxlVmlldyB9IGZyb20gXCIuLi92aWV3cy9QaWxlVmlld1wiXG5cbmNsYXNzIEF1dG9wbGF5U3RhdHVzIGV4dGVuZHMgU3RhdHVzIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lVmlldzogR2FtZVZpZXcpIHtcbiAgICAgICAgc3VwZXIoZ2FtZVZpZXcpXG4gICAgfVxuXG4gICAgc3RhcnQodGltZTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KHRpbWUpXG5cbiAgICAgICAgaWYodGhpcy5hdXRvUGxheVRhYmxlYXUoKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLmF1dG9QbGF5V2FzdGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLmF1dG9QbGF5SGFuZCgpKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2FtZVZpZXcuc2V0U3RhdHVzKFN0YXR1c1R5cGUuR2FtZW92ZXIpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhbmltYXRlKGNhcmQ6IENhcmRWaWV3LCBwaWxlOiBQaWxlVmlldykge1xuICAgICAgICB0aGlzLmxheW91dFZpZXcuc2V0RnJlZShjYXJkKVxuICAgICAgICB0aGlzLmxheW91dFZpZXcuZGVzdGluYXRpb24gPSBwaWxlXG4gICAgICAgIHRoaXMuZ2FtZVZpZXcuc2V0U3RhdHVzKFN0YXR1c1R5cGUuQW5pbWF0aW5nKVxuICAgIH1cblxuICAgIHByaXZhdGUgYXV0b1BsYXlUYWJsZWF1KCk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IobGV0IHRhYmxlYXUgb2YgdGhpcy5sYXlvdXRWaWV3LnRhYmxlYXVzKSB7XG4gICAgICAgICAgICBsZXQgbGFzdCA9IHRhYmxlYXUuZmFuLmZhbi5sYXN0XG4gICAgICAgICAgICBpZihsYXN0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IobGV0IGZvdW5kYXRpb24gb2YgdGhpcy5sYXlvdXRWaWV3LmZvdW5kYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYoZm91bmRhdGlvbi5mb3VuZGF0aW9uUGlsZS5jYW5BZGQobGFzdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlKHRhYmxlYXUucmVtb3ZlTGFzdCgpLCBmb3VuZGF0aW9uKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHByaXZhdGUgYXV0b1BsYXlXYXN0ZSgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGxhc3QgPSB0aGlzLmxheW91dFZpZXcud2FzdGUud2FzdGUubGFzdFxuICAgICAgICBpZihsYXN0ID09IG51bGwpIHtcbiAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGZvdW5kYXRpb24gb2YgdGhpcy5sYXlvdXRWaWV3LmZvdW5kYXRpb25zKSB7XG4gICAgICAgICAgICBpZiAoZm91bmRhdGlvbi5mb3VuZGF0aW9uUGlsZS5jYW5BZGQobGFzdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGUodGhpcy5sYXlvdXRWaWV3Lndhc3RlLnJlbW92ZUxhc3QoKSwgZm91bmRhdGlvbilcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHByaXZhdGUgYXV0b1BsYXlIYW5kKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5sYXlvdXRWaWV3LmhhbmQuaXNFbXB0eSkge1xuICAgICAgICAgICAgbGV0IGNhcmRzID0gdGhpcy5sYXlvdXRWaWV3Lndhc3RlLnJlbW92ZUFsbCgpXG4gICAgICAgICAgICBpZiAoY2FyZHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FyZHMucmV2ZXJzZSgpXG4gICAgICAgICAgICBmb3IgKGxldCBjYXJkIG9mIGNhcmRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRWaWV3LmhhbmQuYWRkKGNhcmQpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZ2FtZVZpZXcuc2V0U3RhdHVzKFN0YXR1c1R5cGUuUmVhZHkpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGxhc3QgPSB0aGlzLmxheW91dFZpZXcuaGFuZC5yZW1vdmVMYXN0KClcbiAgICAgICAgICAgIGxhc3Qub3BlbigpXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUobGFzdCwgdGhpcy5sYXlvdXRWaWV3Lndhc3RlKVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgeyBBdXRvcGxheVN0YXR1cyB9IiwiaW1wb3J0IHsgU3RhdHVzIH0gZnJvbSBcIi4vU3RhdHVzXCJcbmltcG9ydCB7IEdhbWVWaWV3IH0gZnJvbSBcIi4uL0dhbWVWaWV3XCJcblxuY2xhc3MgR2FtZW92ZXJTdGF0dXMgZXh0ZW5kcyBTdGF0dXMge1xuICAgIGNvbnN0cnVjdG9yKGdhbWVWaWV3OiBHYW1lVmlldykge1xuICAgICAgICBzdXBlcihnYW1lVmlldylcbiAgICB9XG5cbiAgICBzdGFydCh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQodGltZSlcblxuICAgICAgICB0aGlzLmxheW91dFZpZXcucmVuZGVyR2FtZW92ZXIoKVxuICAgICAgICBzZXRUaW1lb3V0KHRoaXMuZmluaXNoLmJpbmQodGhpcyksIDMwMDApXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5pc2goKSB7XG4gICAgICAgIHRoaXMuZ2FtZVZpZXcubmV3R2FtZSgpXG4gICAgfVxufVxuXG5leHBvcnQgeyBHYW1lb3ZlclN0YXR1cyB9IiwiaW1wb3J0IHsgU3RhdHVzIH0gZnJvbSBcIi4vU3RhdHVzXCJcbmltcG9ydCB7IFN0YXR1c1R5cGUgfSBmcm9tIFwiLi9TdGF0dXNUeXBlXCJcbmltcG9ydCB7IFJlYWR5U3RhdHVzIH0gZnJvbSBcIi4vUmVhZHlTdGF0dXNcIlxuaW1wb3J0IHsgRGVhbGluZ1N0YXR1cyB9IGZyb20gXCIuL0RlYWxpbmdTdGF0dXNcIlxuaW1wb3J0IHsgT3BlbmluZ1N0YXR1cyB9IGZyb20gXCIuL09wZW5pbmdTdGF0dXNcIlxuaW1wb3J0IHsgQW5pbWF0aW5nU3RhdHVzIH0gZnJvbSBcIi4vQW5pbWF0aW5nU3RhdHVzXCJcbmltcG9ydCB7IERyYWdnaW5nU3RhdHVzIH0gZnJvbSBcIi4vRHJhZ2dpbmdTdGF0dXNcIlxuaW1wb3J0IHsgQXV0b3BsYXlTdGF0dXMgfSBmcm9tIFwiLi9BdXRvcGxheVN0YXR1c1wiXG5pbXBvcnQgeyBHYW1lb3ZlclN0YXR1cyB9IGZyb20gXCIuL0dhbWVvdmVyU3RhdHVzXCJcbmltcG9ydCB7IEdhbWVWaWV3IH0gZnJvbSBcIi4uL0dhbWVWaWV3XCJcblxuY2xhc3MgU3RhdHVzRmFjdG9yeSB7XG4gICAgc3RhdGljIGNyZWF0ZSh0eXBlOiBTdGF0dXNUeXBlLCBnYW1lVmlldzogR2FtZVZpZXcpOiBTdGF0dXMge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU3RhdHVzVHlwZS5SZWFkeTogcmV0dXJuIG5ldyBSZWFkeVN0YXR1cyhnYW1lVmlldylcbiAgICAgICAgICAgIGNhc2UgU3RhdHVzVHlwZS5EZWFsaW5nOiByZXR1cm4gbmV3IERlYWxpbmdTdGF0dXMoZ2FtZVZpZXcpXG4gICAgICAgICAgICBjYXNlIFN0YXR1c1R5cGUuT3BlbmluZzogcmV0dXJuIG5ldyBPcGVuaW5nU3RhdHVzKGdhbWVWaWV3KVxuICAgICAgICAgICAgY2FzZSBTdGF0dXNUeXBlLkFuaW1hdGluZzogcmV0dXJuIG5ldyBBbmltYXRpbmdTdGF0dXMoZ2FtZVZpZXcpXG4gICAgICAgICAgICBjYXNlIFN0YXR1c1R5cGUuRHJhZ2dpbmc6IHJldHVybiBuZXcgRHJhZ2dpbmdTdGF0dXMoZ2FtZVZpZXcpXG4gICAgICAgICAgICBjYXNlIFN0YXR1c1R5cGUuQXV0b3BsYXk6IHJldHVybiBuZXcgQXV0b3BsYXlTdGF0dXMoZ2FtZVZpZXcpXG4gICAgICAgICAgICBjYXNlIFN0YXR1c1R5cGUuR2FtZW92ZXI6IHJldHVybiBuZXcgR2FtZW92ZXJTdGF0dXMoZ2FtZVZpZXcpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCB7IFN0YXR1c0ZhY3RvcnkgfSIsImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vdXRpbC9Qb2ludFwiXG5pbXBvcnQgeyBMYXlvdXRWaWV3IH0gZnJvbSBcIi4vdmlld3MvTGF5b3V0Vmlld1wiXG5pbXBvcnQgeyBTdGF0dXNUeXBlIH0gZnJvbSBcIi4vc3RhdHVzL1N0YXR1c1R5cGVcIlxuaW1wb3J0IHsgU3RhdHVzIH0gZnJvbSBcIi4vc3RhdHVzL1N0YXR1c1wiXG5pbXBvcnQgeyBTdGF0dXNGYWN0b3J5IH0gZnJvbSBcIi4vc3RhdHVzL1N0YXR1c0ZhY3RvcnlcIlxuaW1wb3J0IHsgSGFuZCB9IGZyb20gXCIuL21vZGVscy9IYW5kXCJcbmltcG9ydCB7IExheW91dCB9IGZyb20gXCIuL21vZGVscy9MYXlvdXRcIlxuXG5jbGFzcyBHYW1lVmlldyB7XG4gICAgbGF5b3V0OiBMYXlvdXRWaWV3O1xuICAgIHByaXZhdGUgc2l6ZTogUG9pbnQ7XG4gICAgcHJpdmF0ZSBhbmltYXRpb25GcmFtZTogbnVtYmVyO1xuICAgIHByaXZhdGUgc3ZnOiBTVkdFbGVtZW50O1xuICAgIHByaXZhdGUgc3RhcnRUaW1lOiBudW1iZXIgPSBudWxsXG4gICAgcHJpdmF0ZSB0aW1lOiBudW1iZXIgPSBudWxsXG4gICAgcHJpdmF0ZSBwb3NpdGlvbjogUG9pbnRcbiAgICBwcml2YXRlIHRvdWNoT3ZlcmxheTogSFRNTEVsZW1lbnRcblxuICAgIHN0YXRpYyBnZXRBYnNvbHV0ZVBvc2l0aW9uKGVsZW06IEhUTUxFbGVtZW50KTogUG9pbnQge1xuICAgICAgICBsZXQgcG9pbnQgPSBuZXcgUG9pbnQoMCwgMClcbiAgICAgICAgd2hpbGUoZWxlbSAhPSBudWxsKSB7XG4gICAgICAgICAgICBwb2ludC54ICs9IGVsZW0ub2Zmc2V0TGVmdFxuICAgICAgICAgICAgcG9pbnQueSArPSBlbGVtLm9mZnNldFRvcFxuICAgICAgICAgICAgZWxlbSA9IDxIVE1MRWxlbWVudD5lbGVtLm9mZnNldFBhcmVudFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBvaW50XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3Ioc3ZnOiBTVkdTVkdFbGVtZW50LCB0dDogSFRNTEVsZW1lbnQsIHNpemU6IFBvaW50KSB7XG4gICAgICAgIHRoaXMuc3ZnID0gc3ZnXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemVcbiAgICAgICAgdGhpcy50b3VjaE92ZXJsYXkgPSB0dFxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gR2FtZVZpZXcuZ2V0QWJzb2x1dGVQb3NpdGlvbihzdmcucGFyZW50RWxlbWVudClcbiAgICB9XG5cbiAgICBwcml2YXRlIHRvdWNoRXZlbnRzID0ge1xuICAgICAgICAnc3RhcnQnOiB0aGlzLmhhbmRsZVRvdWNoU3RhcnQuYmluZCh0aGlzKSxcbiAgICAgICAgJ21vdmUnOiB0aGlzLmhhbmRsZVRvdWNoTW92ZS5iaW5kKHRoaXMpLFxuICAgICAgICAnZW5kJzogdGhpcy5oYW5kbGVUb3VjaEVuZC5iaW5kKHRoaXMpLFxuICAgICAgICAnY2FuY2VsJzogdGhpcy5oYW5kbGVUb3VjaENhbmNlbC5iaW5kKHRoaXMpLFxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmxvYWQoKVxuICAgICAgICB0aGlzLnJlbmRlcigpXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGltZVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMoU3RhdHVzVHlwZS5EZWFsaW5nKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG5ld0dhbWUoKSB7XG4gICAgICAgIHRoaXMuc3RhcnQoKVxuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZCgpIHtcbiAgICAgICAgbGV0IGRlY2sgPSBuZXcgSGFuZCgpXG4gICAgICAgIGRlY2suc2h1ZmZsZSgpXG5cbiAgICAgICAgdGhpcy5sYXlvdXQgPSBuZXcgTGF5b3V0VmlldyhuZXcgTGF5b3V0KGRlY2spKVxuICAgICAgICB0aGlzLmxheW91dC5zZXRTaXplKHRoaXMuc2l6ZSlcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlcigpIHtcbiAgICAgICAgd2hpbGUodGhpcy5zdmcubGFzdENoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLnN2Zy5yZW1vdmVDaGlsZCh0aGlzLnN2Zy5sYXN0Q2hpbGQpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxheW91dC5yZW5kZXIoKVxuXG4gICAgICAgIHRoaXMuc3ZnLmFwcGVuZENoaWxkKHRoaXMubGF5b3V0LmcpXG4gICAgICAgIGxldCBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKExheW91dFZpZXcuU1ZHX05BTUVTUEFDRSwgXCJnXCIpXG4gICAgICAgIGxldCByZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKExheW91dFZpZXcuU1ZHX05BTUVTUEFDRSwgXCJyZWN0XCIpXG4gICAgICAgIHJlY3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0b3VjaC1vdmVybGF5XCIpXG4gICAgICAgIHJlY3Quc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgdGhpcy5zaXplLngudG9TdHJpbmcoKSlcbiAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgdGhpcy5zaXplLnkudG9TdHJpbmcoKSlcbiAgICAgICAgZy5hcHBlbmRDaGlsZChyZWN0KVxuICAgICAgICB0aGlzLnN2Zy5hcHBlbmRDaGlsZChnKVxuICAgICAgICAvL3RoaXMudG91Y2hPdmVybGF5ID0gZG9jdW1lbnRcbiAgICAgICAgdGhpcy5zZXRFdmVudHMoKVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlVG91Y2hTdGFydChlOiBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGFuZGxlVG91Y2hTdGFydFwiKVxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICB0aGlzLmFkZFRvdWNoRXZlbnRzKClcbiAgICAgICAgaWYoZS50b3VjaGVzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGxldCB0b3VjaCA9IGUudG91Y2hlc1swXVxuICAgICAgICB0aGlzLnN0YXR1cy50b3VjaFN0YXJ0ZWQodG91Y2gucGFnZVggLSB0aGlzLnBvc2l0aW9uLngsIHRvdWNoLnBhZ2VZIC0gdGhpcy5wb3NpdGlvbi55KVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlVG91Y2hFbmQoZTogVG91Y2hFdmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImhhbmRsZVRvdWNoRW5kXCIpXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIHRoaXMucmVtb3ZlVG91Y2hFdmVudHMoKVxuICAgICAgICB0aGlzLnN0YXR1cy50b3VjaEVuZGVkKClcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZVRvdWNoQ2FuY2VsKGU6IFRvdWNoRXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJoYW5kbGVUb3VjaENhbmNlbFwiKVxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICB0aGlzLnJlbW92ZVRvdWNoRXZlbnRzKClcbiAgICAgICAgdGhpcy5zdGF0dXMudG91Y2hDYW5jZWxsZWQoKVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlVG91Y2hNb3ZlKGU6IFRvdWNoRXZlbnQpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgaWYoZS50b3VjaGVzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGxldCB0b3VjaCA9IGUudG91Y2hlc1swXVxuICAgICAgICB0aGlzLnN0YXR1cy50b3VjaE1vdmVkKHRvdWNoLnBhZ2VYIC0gdGhpcy5wb3NpdGlvbi54LCB0b3VjaC5wYWdlWSAtIHRoaXMucG9zaXRpb24ueSlcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy50b3VjaE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50b3VjaEV2ZW50cy5zdGFydCwgdHJ1ZSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRvdWNoRXZlbnRzKCkge1xuICAgICAgICB0aGlzLnRvdWNoT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy50b3VjaEV2ZW50cy5lbmQsIHRydWUpXG4gICAgICAgIHRoaXMudG91Y2hPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCB0aGlzLnRvdWNoRXZlbnRzLmNhbmNlbCwgdHJ1ZSlcbiAgICAgICAgdGhpcy50b3VjaE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLnRvdWNoRXZlbnRzLm1vdmUsIHRydWUpICAgICAgICBcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZVRvdWNoRXZlbnRzKCkge1xuICAgICAgICB0aGlzLnRvdWNoT3ZlcmxheS5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy50b3VjaEV2ZW50cy5lbmQsIHRydWUpXG4gICAgICAgIHRoaXMudG91Y2hPdmVybGF5LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCB0aGlzLnRvdWNoRXZlbnRzLmNhbmNlbCwgdHJ1ZSlcbiAgICAgICAgdGhpcy50b3VjaE92ZXJsYXkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLnRvdWNoRXZlbnRzLm1vdmUsIHRydWUpICAgICAgICBcblxuICAgIH1cblxuICAgIHN0YXR1czogU3RhdHVzXG4gICAgc3RhdHVzVHlwZTogU3RhdHVzVHlwZVxuXG4gICAgc2V0U3RhdHVzKHR5cGU6IFN0YXR1c1R5cGUpIHtcbiAgICAgICAgdGhpcy5zdGF0dXNUeXBlID0gdHlwZVxuICAgICAgICB0aGlzLnN0YXR1cyA9IFN0YXR1c0ZhY3RvcnkuY3JlYXRlKHR5cGUsIHRoaXMpXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IHRpbWVcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzLnN0YXJ0KHRpbWUpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZGVhbCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0dXMoU3RhdHVzVHlwZS5EZWFsaW5nKVxuICAgIH1cbn1cblxuZXhwb3J0IHsgR2FtZVZpZXcgfSIsImltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi92aWV3cy9WaWV3XCJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vdXRpbC9Qb2ludFwiXG5pbXBvcnQgeyBHYW1lVmlldyB9IGZyb20gXCIuL0dhbWVWaWV3XCJcblxuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIldvb3RcIilcbiAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHlcblxuICAgIGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoVmlldy5TVkdfTkFNRVNQQUNFLCBcInN2Z1wiKVxuICAgIGxldCBzaXplID0gbmV3IFBvaW50KHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgc3ZnLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHNpemUueC50b1N0cmluZygpKVxuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgc2l6ZS55LnRvU3RyaW5nKCkpXG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBkaXYuc3R5bGUud2lkdGggPSBcIjEwMCVcIlxuICAgIGRpdi5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIlxuXG5cbiAgICBib2R5LmFwcGVuZENoaWxkKHN2ZylcbiAgICBib2R5LmFwcGVuZENoaWxkKGRpdilcblxuICAgIGxldCBnYW1lVmlldyA9IG5ldyBHYW1lVmlldyhzdmcsIGRpdiwgc2l6ZSlcbiAgICBnYW1lVmlldy5zdGFydCgpXG4vKlxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICB9KSovXG4gICAgZnVuY3Rpb24gaGFuZGxlVG91Y2hTdGFydChldmVudDogVG91Y2hFdmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnNvbGUubG9nKFwid2luZG93U3RhcnRcIilcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gaGFuZGxlVG91Y2hFbmQoZXZlbnQ6IFRvdWNoRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zb2xlLmxvZyhcIndpbmRvd0VuZFwiKVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBoYW5kbGVUb3VjaENhbmNlbChldmVudDogVG91Y2hFdmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnNvbGUubG9nKFwid2luZG93Q2FuY2VsXCIpXG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGhhbmRsZVRvdWNoTW92ZShldmVudDogVG91Y2hFdmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnNvbGUubG9nKFwid2luZG93TW92ZVwiKVxuICAgIH1cbiAgICBcbiAgICAvKlxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZVRvdWNoU3RhcnQsIHRydWUpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVRvdWNoRW5kLCB0cnVlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCBoYW5kbGVUb3VjaENhbmNlbCwgdHJ1ZSlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZVRvdWNoTW92ZSwgdHJ1ZSlcbiAgICAqL1xufVxuXG5leHBvcnQgeyBtYWluIH1cblxuLypcbmxldCBjaXJjbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoVmlldy5TVkdfTkFNRVNQQUNFLCBcImNpcmNsZVwiKVxuY2lyY2xlLnNldEF0dHJpYnV0ZShcImN4XCIsIFwiMTBcIilcbmNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJjeVwiLCBcIjEwXCIpXG5jaXJjbGUuc2V0QXR0cmlidXRlKFwiclwiLCBcIjhcIilcbmNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIFwicmVkXCIpXG5jaXJjbGUuc2V0QXR0cmlidXRlKFwic3Ryb2tlXCIsIFwiYmx1ZVwiKVxuY2lyY2xlLnNldEF0dHJpYnV0ZShcInN0cm9rZS13aWR0aFwiLCBcIjJcIilcbi8vY2lyY2xlLnN0eWxlLnN0cm9cbnN2Zy5hcHBlbmRDaGlsZChjaXJjbGUpXG5cbmZ1bmN0aW9uIGhhbmRsZVRvdWNoU3RhcnQoZXZlbnQ6IFRvdWNoRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIFwiZ3JlZW5cIilcbn1cblxuZnVuY3Rpb24gaGFuZGxlVG91Y2hFbmQoZXZlbnQ6IFRvdWNoRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIFwicmVkXCIpICAgIFxufVxuXG5mdW5jdGlvbiBoYW5kbGVUb3VjaENhbmNlbChldmVudDogVG91Y2hFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgY2lyY2xlLnNldEF0dHJpYnV0ZShcImZpbGxcIiwgXCJ5ZWxsb3dcIilcbn1cblxuZnVuY3Rpb24gaGFuZGxlVG91Y2hNb3ZlKGV2ZW50OiBUb3VjaEV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBpZihldmVudC50b3VjaGVzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXVxuICAgIGNpcmNsZS5zdHlsZS50cmFuc2Zvcm0gPSBgbWF0cml4M2QoXG4gICAgICAgIDEsIDAsIDAsIDAsXG4gICAgICAgIDAsIDEsIDAsIDAsXG4gICAgICAgIDAsIDAsIDEsIDAsXG4gICAgICAgICR7dG91Y2guY2xpZW50WCArIDIwfSwgJHt0b3VjaC5jbGllbnRZICsgMjB9LCAwLCAxKWBcbiAgICAvL2NpcmNsZS5zZXRBdHRyaWJ1dGUoXCJjeFwiLCBgJHt0b3VjaC5jbGllbnRYICsgMjB9YClcbiAgICAvL2NpcmNsZS5zZXRBdHRyaWJ1dGUoXCJjeVwiLCBgJHt0b3VjaC5jbGllbnRZICsgMjB9YClcbn1cblxuY2lyY2xlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZVRvdWNoU3RhcnQsIHRydWUpXG5jaXJjbGUuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZVRvdWNoRW5kLCB0cnVlKVxuY2lyY2xlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCBoYW5kbGVUb3VjaENhbmNlbCwgdHJ1ZSlcbmNpcmNsZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZVRvdWNoTW92ZSwgdHJ1ZSlcbiovIl19