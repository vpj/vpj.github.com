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
            text.textContent = "Congratulations!";
            text.setAttribute("class", "game-over");
            text.setAttribute("x", "" + this.size.x / 2);
            text.setAttribute("y", "" + this.size.y / 2);
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
define("util/SoundPlayer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SoundPlayer = /** @class */ (function () {
        function SoundPlayer() {
            this.soundPool = {};
        }
        SoundPlayer.prototype.load = function (sounds, onReady) {
            var processing = 0;
            for (var id in sounds) {
                var file = sounds[id];
                if (this.soundPool[id] != null) {
                    continue;
                }
                processing++;
                this.soundPool[id] = new Audio(file);
                this.soundPool[id].addEventListener("loadedmetadata", function (ev) {
                    //alert("Loaded")
                    processing--;
                    if (processing == 0) {
                        //onReady()
                    }
                });
            }
            onReady();
        };
        SoundPlayer.prototype.play = function (id) {
            if (this.lastPlaying != null) {
                this.lastPlaying.pause();
            }
            var promise = this.soundPool[id].play();
            if (promise) {
                promise.catch(function (error) {
                    console.log(error);
                });
            }
            this.lastPlaying = this.soundPool[id];
        };
        SoundPlayer.instance = new SoundPlayer();
        return SoundPlayer;
    }());
    exports.SoundPlayer = SoundPlayer;
});
define("status/ReadyStatus", ["require", "exports", "status/Status", "status/StatusType", "util/Point", "util/SoundPlayer"], function (require, exports, Status_1, StatusType_1, Point_8, SoundPlayer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ReadyStatus = /** @class */ (function (_super) {
        __extends(ReadyStatus, _super);
        function ReadyStatus(gameView) {
            var _this = _super.call(this, gameView) || this;
            _this.layoutView.setFree(null);
            _this.layoutView.destination = null;
            _this.layoutView.dragged = null;
            return _this;
        }
        ReadyStatus.prototype.start = function (time) {
            _super.prototype.start.call(this, time);
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
            SoundPlayer_1.SoundPlayer.instance.play('drag');
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
                SoundPlayer_1.SoundPlayer.instance.play('drag');
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
define("status/DealingStatus", ["require", "exports", "status/Status", "status/StatusType", "util/SoundPlayer"], function (require, exports, Status_2, StatusType_2, SoundPlayer_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DealingStatus = /** @class */ (function (_super) {
        __extends(DealingStatus, _super);
        function DealingStatus(gameView) {
            return _super.call(this, gameView) || this;
        }
        DealingStatus.prototype.open = function () {
            SoundPlayer_2.SoundPlayer.instance.play('shuffle');
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
            var free = _this.layoutView.free;
            if (free == null) {
                throw new Error("No free element");
            }
            var destination = _this.layoutView.destination;
            if (destination == null) {
                throw new Error("No destination");
            }
            _this.origin = new Point_9.Point(free.position.x, free.position.y);
            _this.dropPoint = LayoutView_6.LayoutView.getAbsolutePosition(destination.g);
            _this.dropPoint.x += destination.dropPoint.x;
            _this.dropPoint.y += destination.dropPoint.y;
            _this.distance = _this.origin.distance(_this.dropPoint);
            return _this;
        }
        AnimatingStatus.prototype.start = function (time) {
            _super.prototype.start.call(this, time);
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
define("status/DraggingStatus", ["require", "exports", "status/Status", "status/StatusType", "util/Point", "views/LayoutView", "util/SoundPlayer"], function (require, exports, Status_5, StatusType_5, Point_10, LayoutView_7, SoundPlayer_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DraggingStatus = /** @class */ (function (_super) {
        __extends(DraggingStatus, _super);
        function DraggingStatus(gameView) {
            var _this = _super.call(this, gameView) || this;
            _this.origin = new Point_10.Point(0, 0);
            _this.time = 0;
            _this.requestId = 0;
            var free = _this.layoutView.free;
            if (free == null) {
                throw new Error("No free element");
            }
            _this.origin = new Point_10.Point(free.position.x, free.position.y);
            return _this;
        }
        DraggingStatus.prototype.start = function (time) {
            _super.prototype.start.call(this, time);
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
        DraggingStatus.prototype.touchStarted = function (x, y) {
            window.cancelAnimationFrame(this.requestId);
            this.cancel();
        };
        DraggingStatus.prototype.touchCancelled = function () {
            window.cancelAnimationFrame(this.requestId);
            this.cancel();
        };
        DraggingStatus.prototype.touchEnded = function () {
            window.cancelAnimationFrame(this.requestId);
            if (this.elapsedTime(this.time) < 200) {
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
            SoundPlayer_3.SoundPlayer.instance.play('land');
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
define("main", ["require", "exports", "views/View", "util/Point", "GameView", "util/SoundPlayer"], function (require, exports, View_6, Point_12, GameView_1, SoundPlayer_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createStartButton() {
        var button = document.createElement("button");
        button.textContent = "Start";
        return button;
    }
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
        SoundPlayer_4.SoundPlayer.instance.load({ 'shuffle': "cards.wav",
            "land": "land.wav",
            'drag': "drag.wav" }, function () {
            var button = createStartButton();
            div.appendChild(button);
            button.addEventListener("click", function () {
                SoundPlayer_4.SoundPlayer.instance.play('shuffle');
                SoundPlayer_4.SoundPlayer.instance.play('drag');
                SoundPlayer_4.SoundPlayer.instance.play('land');
                div.removeChild(button);
                gameView.start();
            });
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwvUG9pbnQudHMiLCJ2aWV3cy9WaWV3LnRzIiwidmlld3MvRHJhZ2dhYmxlLnRzIiwidmlld3MvUGlsZVZpZXcudHMiLCJtb2RlbHMvU3VpdC50cyIsIm1vZGVscy9SYW5rLnRzIiwibW9kZWxzL0NhcmQudHMiLCJ2aWV3cy9DYXJkVmlldy50cyIsIm1vZGVscy9GYW4udHMiLCJ1dGlsL0NvbnN0cy50cyIsInZpZXdzL0ZhblZpZXcudHMiLCJtb2RlbHMvRm91bmRhdGlvblBpbGUudHMiLCJ2aWV3cy9Gb3VuZGF0aW9uUGlsZVZpZXcudHMiLCJtb2RlbHMvVGFibGVhdS50cyIsInZpZXdzL1RhYmxlYXVWaWV3LnRzIiwibW9kZWxzL0hhbmQudHMiLCJ2aWV3cy9IYW5kVmlldy50cyIsIm1vZGVscy9XYXN0ZVBpbGUudHMiLCJ2aWV3cy9XYXN0ZVBpbGVWaWV3LnRzIiwibW9kZWxzL0xheW91dC50cyIsInZpZXdzL0xheW91dFZpZXcudHMiLCJzdGF0dXMvU3RhdHVzVHlwZS50cyIsInN0YXR1cy9TdGF0dXMudHMiLCJ1dGlsL1NvdW5kUGxheWVyLnRzIiwic3RhdHVzL1JlYWR5U3RhdHVzLnRzIiwic3RhdHVzL0RlYWxpbmdTdGF0dXMudHMiLCJzdGF0dXMvT3BlbmluZ1N0YXR1cy50cyIsInN0YXR1cy9BbmltYXRpbmdTdGF0dXMudHMiLCJzdGF0dXMvRHJhZ2dpbmdTdGF0dXMudHMiLCJzdGF0dXMvQXV0b3BsYXlTdGF0dXMudHMiLCJzdGF0dXMvR2FtZW92ZXJTdGF0dXMudHMiLCJzdGF0dXMvU3RhdHVzRmFjdG9yeS50cyIsIkdhbWVWaWV3LnRzIiwibWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBQUE7UUFJSSxlQUFZLENBQVMsRUFBRSxDQUFTO1lBSGhDLE1BQUMsR0FBRyxDQUFDLENBQUE7WUFDTCxNQUFDLEdBQUcsQ0FBQyxDQUFBO1lBR0Qs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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBOENFIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUG9pbnQge1xuICAgIHggPSAwXG4gICAgeSA9IDBcblxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMueCA9IHhcbiAgICAgICAgdGhpcy55ID0geVxuICAgIH1cblxuICAgIGRpc3RhbmNlKHBvaW50OiBQb2ludCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoKHBvaW50LnggLSB0aGlzLngpICogKHBvaW50LnggLSB0aGlzLngpICtcbiAgICAgICAgICAgIChwb2ludC55IC0gdGhpcy55KSAqIChwb2ludC55IC0gdGhpcy55KSlcbiAgICB9XG59XG5cbmV4cG9ydCB7IFBvaW50IH0iLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi91dGlsL1BvaW50XCJcblxuYWJzdHJhY3QgY2xhc3MgVmlldyB7XG4gICAgc3RhdGljIHJlYWRvbmx5IFNWR19OQU1FU1BBQ0UgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcblxuICAgIHBvc2l0aW9uID0gbmV3IFBvaW50KDAsIDApXG5cbiAgICBzaXplID0gbmV3IFBvaW50KDAsIDApXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHdoaWxlKHRoaXMuZy5sYXN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuZy5yZW1vdmVDaGlsZCh0aGlzLmcubGFzdENoaWxkKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZy5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke3RoaXMucG9zaXRpb24ueH0sICR7dGhpcy5wb3NpdGlvbi55fSlgKVxuICAgIH1cblxuICAgIGFic3RyYWN0IGlzSW5zaWRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhblxuXG4gICAgcmVhZG9ubHkgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhWaWV3LlNWR19OQU1FU1BBQ0UsIFwiZ1wiKVxuXG4gICAgc2V0VHJhbnNmb3JtKHBvc2l0aW9uOiBQb2ludCkge1xuICAgICAgICB0aGlzLmcuc3R5bGUudHJhbnNmb3JtID0gYG1hdHJpeDNkKFxuICAgICAgICAgICAgMSwgMCwgMCwgMCxcbiAgICAgICAgICAgIDAsIDEsIDAsIDAsXG4gICAgICAgICAgICAwLCAwLCAxLCAwLFxuICAgICAgICAgICAgJHtwb3NpdGlvbi54fSwgJHtwb3NpdGlvbi55fSwgMCwgMSlgXG4gICAgfVxuXG4gICAgY2xlYXJUcmFuc2Zvcm0oKSB7XG4gICAgICAgIHRoaXMuZy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInRyYW5zZm9ybVwiKVxuICAgIH1cbn1cblxuZXhwb3J0IHsgVmlldyB9IiwiaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL1ZpZXdcIlxuXG5hYnN0cmFjdCBjbGFzcyBEcmFnZ2FibGUgZXh0ZW5kcyBWaWV3IHtcbiAgICAgaXNEcmFnZ2luZyA9IGZhbHNlXG59XG5cbmV4cG9ydCB7IERyYWdnYWJsZSB9IiwiaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL1ZpZXdcIlxuaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSBcIi4vRHJhZ2dhYmxlXCJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL3V0aWwvUG9pbnRcIlxuXG5hYnN0cmFjdCBjbGFzcyBQaWxlVmlldyBleHRlbmRzIFZpZXcge1xuICAgIGFic3RyYWN0IHJlYWRvbmx5IGRyb3BQb2ludDogUG9pbnRcbiAgICBhYnN0cmFjdCBhZGQoZHJhZ2dhYmxlOiBEcmFnZ2FibGUpOiB2b2lkXG4gICAgYWJzdHJhY3QgZ2V0RHJhZ2dhYmxlKHg6IG51bWJlciwgeTogbnVtYmVyKTogRHJhZ2dhYmxlXG4gICAgYWJzdHJhY3QgY2FuQWRkKGRyYWdnYWJsZTogRHJhZ2dhYmxlKTogQm9vbGVhblxuXG4gICAgY2xlYXJEcmFnZ2VkKCkge1xuICAgIH1cbn1cblxuZXhwb3J0IHsgUGlsZVZpZXcgfSIsImVudW0gU3VpdCB7XG4gICAgQ2x1YiA9IDAsXG4gICAgRGlhbW9uZCA9IDEsXG4gICAgSGVhcnQgPSAyLFxuICAgIFNwYWRlID0gM1xufVxuXG5jbGFzcyBTdWl0VXRpbCB7XG4gICAgc3RhdGljIGdldFN5bWJvbChzdWl0OiBTdWl0KTogc3RyaW5nIHtcbiAgICAgICAgc3dpdGNoIChzdWl0KSB7XG4gICAgICAgICAgICBjYXNlIFN1aXQuQ2x1YjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLimaNcIlxuICAgICAgICAgICAgY2FzZSBTdWl0LkRpYW1vbmQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi4pmmXCJcbiAgICAgICAgICAgIGNhc2UgU3VpdC5IZWFydDpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLimaVcIlxuICAgICAgICAgICAgY2FzZSBTdWl0LlNwYWRlOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIuKZoFwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgaXNSZWQoc3VpdDogU3VpdCk6IGJvb2xlYW4ge1xuICAgICAgICBzd2l0Y2ggKHN1aXQpIHtcbiAgICAgICAgICAgIGNhc2UgU3VpdC5DbHViOlxuICAgICAgICAgICAgY2FzZSBTdWl0LlNwYWRlOlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgY2FzZSBTdWl0LkRpYW1vbmQ6XG4gICAgICAgICAgICBjYXNlIFN1aXQuSGVhcnQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyByZWFkb25seSBTdWl0cyA9IFtTdWl0LkNsdWIsIFN1aXQuRGlhbW9uZCwgU3VpdC5IZWFydCwgU3VpdC5TcGFkZV1cbn1cblxuZXhwb3J0IHsgU3VpdCwgU3VpdFV0aWwgfSIsImVudW0gUmFuayB7XG4gICAgQWNlID0gMCxcbiAgICBUd28sIFRocmVlLCBGb3VyLCBGaXZlLCBTaXgsIFNldmVuLCBFaWdodCwgTmluZSwgVGVuLFxuICAgIEphY2ssIFF1ZWVuLCBLaW5nXG59XG5cbmNsYXNzIFJhbmtVdGlsIHtcbiAgICBzdGF0aWMgZ2V0U3ltYm9sKHJhbms6IFJhbmspOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKHJhbmspIHtcbiAgICAgICAgICAgIGNhc2UgUmFuay5BY2U6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQVwiXG4gICAgICAgICAgICBjYXNlIFJhbmsuSmFjazpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJKXCJcbiAgICAgICAgICAgIGNhc2UgUmFuay5RdWVlbjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJRXCJcbiAgICAgICAgICAgIGNhc2UgUmFuay5LaW5nOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIktcIlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7cmFuayArIDF9YFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHJlYWRvbmx5IFJhbmtzID0gW1JhbmsuQWNlLFxuICAgIFJhbmsuVHdvLCBSYW5rLlRocmVlLCBSYW5rLkZvdXIsIFJhbmsuRml2ZSwgUmFuay5TaXgsIFJhbmsuU2V2ZW4sIFJhbmsuRWlnaHQsIFJhbmsuTmluZSwgUmFuay5UZW4sXG4gICAgUmFuay5KYWNrLCBSYW5rLlF1ZWVuLCBSYW5rLktpbmddXG59XG5cbmV4cG9ydCB7IFJhbmssIFJhbmtVdGlsIH0iLCJpbXBvcnQgeyBTdWl0LCBTdWl0VXRpbCB9IGZyb20gXCIuL1N1aXRcIlxuaW1wb3J0IHsgUmFuayB9IGZyb20gXCIuL1JhbmtcIlxuXG5jbGFzcyBDYXJkIHtcbiAgICByZWFkb25seSBzdWl0OiBTdWl0XG4gICAgcmVhZG9ubHkgcmFuazogUmFua1xuXG4gICAgY29uc3RydWN0b3Ioc3VpdDogU3VpdCwgcmFuazogUmFuaykge1xuICAgICAgICB0aGlzLnN1aXQgPSBzdWl0XG4gICAgICAgIHRoaXMucmFuayA9IHJhbmtcbiAgICB9XG5cbiAgICBjYW5GYW4obmV4dDogQ2FyZCk6IGJvb2xlYW4ge1xuICAgICAgICBpZih0aGlzLnJhbmsgIT0gbmV4dC5yYW5rICsgMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBpZihTdWl0VXRpbC5pc1JlZCh0aGlzLnN1aXQpID09IFN1aXRVdGlsLmlzUmVkKG5leHQuc3VpdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBjYW5QaWxlKG5leHQ6IENhcmQpOiBib29sZWFuIHtcbiAgICAgICAgaWYodGhpcy5zdWl0ICE9IG5leHQuc3VpdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLnJhbmsgKyAxICE9IG5leHQucmFuaykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbn1cblxuZXhwb3J0IHsgQ2FyZCB9IiwiaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSBcIi4vRHJhZ2dhYmxlXCJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi9WaWV3XCJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL3V0aWwvUG9pbnRcIlxuaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuLi9tb2RlbHMvQ2FyZFwiXG5pbXBvcnQgeyBSYW5rVXRpbCB9IGZyb20gXCIuLi9tb2RlbHMvUmFua1wiXG5pbXBvcnQgeyBTdWl0LCBTdWl0VXRpbCB9IGZyb20gXCIuLi9tb2RlbHMvU3VpdFwiXG5cbmNsYXNzIENhcmRWaWV3IGV4dGVuZHMgRHJhZ2dhYmxlIHtcbiAgICBpc09wZW4gPSBmYWxzZVxuICAgIHJlYWRvbmx5IGNhcmQ6IENhcmRcblxuICAgIGNvbnN0cnVjdG9yKGNhcmQ6IENhcmQpIHtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLmNhcmQgPSBjYXJkXG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2VcbiAgICAgICAgaWYgKHRoaXMuZyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmcuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJjYXJkIGNhcmQtY2xvc2VcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW4oKSB7XG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZVxuICAgICAgICBpZiAodGhpcy5nICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImNhcmQgY2FyZC1vcGVuXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHN1cGVyLnJlbmRlcigpXG5cbiAgICAgICAgbGV0IHJlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoVmlldy5TVkdfTkFNRVNQQUNFLCBcInJlY3RcIilcbiAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCB0aGlzLnNpemUueC50b1N0cmluZygpKVxuICAgICAgICByZWN0LnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCB0aGlzLnNpemUueS50b1N0cmluZygpKVxuICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQocmVjdClcblxuICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuZy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgY2FyZCBzdWl0LSR7U3VpdFt0aGlzLmNhcmQuc3VpdF19IGNhcmQtb3BlbmApXG4gICAgICAgICAgICByZWN0LnNldEF0dHJpYnV0ZShcImZpbGxcIiwgXCJyZWRcIilcblxuICAgICAgICAgICAgbGV0IHlUb3AgPSB0aGlzLnNpemUueCAvIDIuMlxuICAgICAgICAgICAgdGhpcy5nLmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlVGV4dChSYW5rVXRpbC5nZXRTeW1ib2wodGhpcy5jYXJkLnJhbmspLCB0aGlzLnNpemUueCAqIDAuMjUsIHlUb3ApKVxuICAgICAgICAgICAgdGhpcy5nLmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlVGV4dChTdWl0VXRpbC5nZXRTeW1ib2wodGhpcy5jYXJkLnN1aXQpLCB0aGlzLnNpemUueCAqIDAuNzUsIHlUb3ApKVxuICAgICAgICAgICAgdGhpcy5nLmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlVGV4dChTdWl0VXRpbC5nZXRTeW1ib2wodGhpcy5jYXJkLnN1aXQpLCB0aGlzLnNpemUueCAqIDAuNSwgeVRvcCArIHRoaXMuc2l6ZS55ICogMC41KSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImNhcmQgY2FyZC1jbG9zZVwiKVxuICAgICAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIFwiYmxhY2tcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlVGV4dCh0ZXh0OiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyKTogU1ZHVGV4dEVsZW1lbnQge1xuICAgICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhWaWV3LlNWR19OQU1FU1BBQ0UsIFwidGV4dFwiKVxuICAgICAgICBlbGVtLnRleHRDb250ZW50ID0gdGV4dFxuICAgICAgICBlbGVtLnN0eWxlLmZvbnRTaXplID0gYCR7dGhpcy5zaXplLnggLyAyLjJ9YFxuICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZShcInhcIiwgeC50b1N0cmluZygpKVxuICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZShcInlcIiwgeS50b1N0cmluZygpKVxuXG4gICAgICAgIHJldHVybiBlbGVtXG4gICAgfVxuXG4gICAgaXNJbnNpZGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHggPj0gdGhpcy5wb3NpdGlvbi54ICYmIHkgPj0gdGhpcy5wb3NpdGlvbi55ICYmIFxuICAgICAgICB4IDwgdGhpcy5wb3NpdGlvbi54ICsgdGhpcy5zaXplLnggJiYgeSA8IHRoaXMucG9zaXRpb24ueSArIHRoaXMuc2l6ZS55XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUhvbGRlcihzaXplOiBQb2ludCk6IFNWR1JlY3RFbGVtZW50IHtcbiAgICAgICAgbGV0IHJlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoVmlldy5TVkdfTkFNRVNQQUNFLCBcInJlY3RcIilcbiAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhvbGRlclwiKVxuICAgICAgICByZWN0LnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHNpemUueC50b1N0cmluZygpKVxuICAgICAgICByZWN0LnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBzaXplLnkudG9TdHJpbmcoKSlcblxuICAgICAgICByZXR1cm4gcmVjdFxuICAgIH1cbn1cblxuZXhwb3J0IHsgQ2FyZFZpZXcgfSIsImltcG9ydCB7IENhcmQgfSBmcm9tIFwiLi9DYXJkXCJcbmltcG9ydCB7IFJhbmsgfSBmcm9tIFwiLi9SYW5rXCJcblxuY2xhc3MgRmFuIHtcbiAgICBjYXJkOiBDYXJkXG4gICAgZmFuOiBGYW5cblxuICAgIGdldCBmaXJzdCgpOiBDYXJkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FyZFxuICAgIH1cblxuICAgIGdldCBsYXN0KCk6IENhcmQge1xuICAgICAgICBpZiAodGhpcy5mYW4gPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FyZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmFuLmxhc3RcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jYXJkID09IG51bGxcbiAgICB9XG5cbiAgICBnZXQgaXNTaW5nbGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhcmQgIT0gbnVsbCAmJiB0aGlzLmZhbiA9PSBudWxsXG4gICAgfVxuXG4gICAgYWRkRmFuKGZhbjogRmFuKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcmQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jYXJkID0gZmFuLmNhcmRcbiAgICAgICAgICAgIHRoaXMuZmFuID0gZmFuLmZhblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZmFuID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZmFuID0gZmFuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZhbi5hZGRGYW4oZmFuKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQ2FyZChjYXJkOiBDYXJkKSB7XG4gICAgICAgIGlmICh0aGlzLmNhcmQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jYXJkID0gY2FyZFxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZmFuID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZmFuID0gbmV3IEZhbigpXG4gICAgICAgICAgICB0aGlzLmZhbi5hZGRDYXJkKGNhcmQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZhbi5hZGRDYXJkKGNhcmQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVGYW4oKSB7XG4gICAgICAgIHRoaXMuZmFuID0gbnVsbFxuICAgIH1cblxuICAgIGNhbkZhbkNhcmQoY2FyZDogQ2FyZCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5jYXJkID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBjYXJkLnJhbmsgPT0gUmFuay5LaW5nXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5mYW4gPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FyZC5jYW5GYW4oY2FyZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZhbi5jYW5GYW5DYXJkKGNhcmQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5GYW5GYW4oZmFuOiBGYW4pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGZhbi5pc0VtcHR5KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNhcmQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbi5jYXJkLnJhbmsgPT0gUmFuay5LaW5nXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5mYW4gPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FyZC5jYW5GYW4oZmFuLmNhcmQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mYW4uY2FuRmFuRmFuKGZhbilcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHsgRmFuIH0iLCJjbGFzcyBDb25zdHMge1xuICAgIHN0YXRpYyBGYW5HYXBGYWN0b3IgPSAwLjNcbiAgICBzdGF0aWMgQ2xvc2VkR2FwRmFjdG9yID0gMC4xXG4gICAgc3RhdGljIE1hcmdpbiA9IDE2XG5cbiAgICBzdGF0aWMgQW5pbWF0aW9uVmVsb2NpdHkgPSAxIC8gMzBcbn1cblxuZXhwb3J0IHsgQ29uc3RzIH0iLCJpbXBvcnQgeyBQaWxlVmlldyB9IGZyb20gXCIuL1BpbGVWaWV3XCJcbmltcG9ydCB7IERyYWdnYWJsZSB9IGZyb20gXCIuL0RyYWdnYWJsZVwiXG5pbXBvcnQgeyBDYXJkVmlldyB9IGZyb20gXCIuL0NhcmRWaWV3XCJcbmltcG9ydCB7IExheW91dFZpZXcgfSBmcm9tIFwiLi9MYXlvdXRWaWV3XCJcbmltcG9ydCB7IEZhbiB9IGZyb20gXCIuLi9tb2RlbHMvRmFuXCJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL3V0aWwvUG9pbnRcIlxuaW1wb3J0IHsgQ29uc3RzIH0gZnJvbSBcIi4uL3V0aWwvQ29uc3RzXCJcblxuY2xhc3MgRmFuVmlldyBleHRlbmRzIERyYWdnYWJsZSB7XG4gICAgY2FyZDogQ2FyZFZpZXcgPSBudWxsXG4gICAgY2hpbGQ6IEZhblZpZXcgPSBudWxsXG4gICAgZmFuOiBGYW5cblxuICAgIGNvbnN0cnVjdG9yKGZhbjogRmFuKSB7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5mYW4gPSBmYW5cbiAgICB9XG5cbiAgICBwcml2YXRlIF9pc0RyYWdnaW5nID0gZmFsc2VcbiAgICBnZXQgaXNEcmFnZ2luZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRHJhZ2dpbmdcbiAgICB9XG4gICAgc2V0IGlzRHJhZ2dpbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IHZhbHVlXG4gICAgICAgIGlmICh0aGlzLmNhcmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jYXJkLmlzRHJhZ2dpbmcgPSB2YWx1ZVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNoaWxkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGQuaXNEcmFnZ2luZyA9IHZhbHVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5BZGRDYXJkKGNhcmQ6IENhcmRWaWV3KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZhbi5jYW5GYW5DYXJkKGNhcmQuY2FyZClcbiAgICB9XG5cbiAgICBhZGRDYXJkKGNhcmQ6IENhcmRWaWV3KSB7XG4gICAgICAgIC8qaWYoIXRoaXMuY2FuQWRkQ2FyZChjYXJkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgYWRkIGNhcmRcIilcbiAgICAgICAgfSovXG5cbiAgICAgICAgaWYodGhpcy5jYXJkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY2FyZCA9IGNhcmRcbiAgICAgICAgICAgIHRoaXMuZmFuLmFkZENhcmQoY2FyZC5jYXJkKVxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKVxuICAgICAgICB9IGVsc2UgaWYodGhpcy5jaGlsZCA9PSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgZmFuID0gbmV3IEZhbigpXG4gICAgICAgICAgICB0aGlzLmNoaWxkID0gbmV3IEZhblZpZXcoZmFuKVxuICAgICAgICAgICAgdGhpcy5jaGlsZC5hZGRDYXJkKGNhcmQpXG4gICAgICAgICAgICB0aGlzLmZhbi5hZGRGYW4oZmFuKVxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGlsZC5hZGRDYXJkKGNhcmQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5BZGRGYW4oZmFuOiBGYW5WaWV3KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZhbi5jYW5GYW5GYW4oZmFuLmZhbilcbiAgICB9XG5cbiAgICBhZGRGYW4oZmFuOiBGYW5WaWV3KSB7XG4gICAgICAgIGlmKCF0aGlzLmNhbkFkZEZhbihmYW4pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBhZGQgZmFuXCIpXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5jYXJkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGFkZCB0byBhIGVtcHR5IGZhblwiKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5jaGlsZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkID0gZmFuXG4gICAgICAgICAgICB0aGlzLmZhbi5hZGRGYW4oZmFuLmZhbilcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGQuYWRkRmFuKGZhbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgc3VwZXIucmVuZGVyKClcblxuICAgICAgICBpZih0aGlzLmNhcmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jYXJkLnBvc2l0aW9uID0gbmV3IFBvaW50KDAsIDApXG4gICAgICAgICAgICB0aGlzLmNhcmQuc2l6ZSA9IHRoaXMuc2l6ZVxuICAgICAgICAgICAgdGhpcy5jYXJkLnJlbmRlcigpXG4gICAgICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQodGhpcy5jYXJkLmcpXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5jaGlsZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkLnBvc2l0aW9uID0gbmV3IFBvaW50KDAsIENvbnN0cy5GYW5HYXBGYWN0b3IgKiB0aGlzLnNpemUueSlcbiAgICAgICAgICAgIHRoaXMuY2hpbGQuc2l6ZSA9IHRoaXMuc2l6ZVxuICAgICAgICAgICAgdGhpcy5jaGlsZC5yZW5kZXIoKVxuICAgICAgICAgICAgdGhpcy5nLmFwcGVuZENoaWxkKHRoaXMuY2hpbGQuZylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzSW5zaWRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHggLT0gdGhpcy5wb3NpdGlvbi54XG4gICAgICAgIHkgLT0gdGhpcy5wb3NpdGlvbi55XG4gICAgICAgIGlmKHRoaXMuY2hpbGQgIT0gbnVsbCAmJiB0aGlzLmNoaWxkLmlzSW5zaWRlKHgsIHkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuY2FyZCAhPSBudWxsICYmIHRoaXMuY2FyZC5pc0luc2lkZSh4LCB5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGdldERyYWdnYWJsZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IERyYWdnYWJsZSB7XG4gICAgICAgIHggLT0gdGhpcy5wb3NpdGlvbi54XG4gICAgICAgIHkgLT0gdGhpcy5wb3NpdGlvbi55XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLmNoaWxkID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLmNoaWxkLmlzSW5zaWRlKHgsIHkpKSB7XG4gICAgICAgICAgICBsZXQgZHJhZ2dhYmxlID0gdGhpcy5jaGlsZC5nZXREcmFnZ2FibGUoeCwgeSlcbiAgICAgICAgICAgIGlmKGRyYWdnYWJsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRyYWdnYWJsZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5mYW4ucmVtb3ZlRmFuKClcbiAgICAgICAgICAgIGRyYWdnYWJsZSA9IHRoaXMuY2hpbGRcbiAgICAgICAgICAgIHRoaXMuY2hpbGQgPSBudWxsXG4gICAgICAgICAgICBkcmFnZ2FibGUucG9zaXRpb24gPSBMYXlvdXRWaWV3LmdldEFic29sdXRlUG9zaXRpb24oZHJhZ2dhYmxlLmcpXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpXG5cbiAgICAgICAgICAgIHJldHVybiBkcmFnZ2FibGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZHJvcFBvaW50KCk6IFBvaW50IHtcbiAgICAgICAgaWYodGhpcy5jYXJkID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uXG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLmNoaWxkID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9pbnQoMCwgQ29uc3RzLkZhbkdhcEZhY3RvciAqIHRoaXMuc2l6ZS55KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBvaW50ID0gdGhpcy5jaGlsZC5kcm9wUG9pbnRcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9pbnQocG9pbnQueCArIHRoaXMuY2hpbGQucG9zaXRpb24ueCwgcG9pbnQueSArIHRoaXMuY2hpbGQucG9zaXRpb24ueSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUxhc3QoKTogQ2FyZFZpZXcge1xuICAgICAgICBpZih0aGlzLmNoaWxkLmZhbi5pc1NpbmdsZSkge1xuICAgICAgICAgICAgdGhpcy5mYW4ucmVtb3ZlRmFuKClcbiAgICAgICAgICAgIGxldCBjYXJkID0gdGhpcy5jaGlsZC5jYXJkXG4gICAgICAgICAgICB0aGlzLmNoaWxkID0gbnVsbFxuICAgICAgICAgICAgY2FyZC5wb3NpdGlvbiA9IExheW91dFZpZXcuZ2V0QWJzb2x1dGVQb3NpdGlvbihjYXJkLmcpXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpXG4gICAgICAgICAgICByZXR1cm4gY2FyZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGQucmVtb3ZlTGFzdCgpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCB7IEZhblZpZXcgfSIsImltcG9ydCB7IENhcmQgfSBmcm9tIFwiLi9DYXJkXCJcbmltcG9ydCB7IFJhbmsgfSBmcm9tIFwiLi9SYW5rXCJcblxuY2xhc3MgRm91bmRhdGlvblBpbGUge1xuICAgIGNhcmRzID0gbmV3IEFycmF5PENhcmQ+KClcblxuICAgIGNhbkFkZChjYXJkOiBDYXJkKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLmNhcmRzLmxlbmd0aFxuICAgICAgICBpZihsZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhcmQucmFuayA9PSBSYW5rLkFjZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FyZHNbbGVuZ3RoIC0gMV0uY2FuUGlsZShjYXJkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkKGNhcmQ6IENhcmQpIHtcbiAgICAgICAgdGhpcy5jYXJkcy5wdXNoKGNhcmQpXG4gICAgfVxuXG4gICAgcmVtb3ZlTGFzdCgpIHtcbiAgICAgICAgdGhpcy5jYXJkcy5zcGxpY2UoLTEsIDEpXG4gICAgfVxufVxuXG5leHBvcnQgeyBGb3VuZGF0aW9uUGlsZSB9IiwiaW1wb3J0IHsgUGlsZVZpZXcgfSBmcm9tIFwiLi9QaWxlVmlld1wiXG5pbXBvcnQgeyBEcmFnZ2FibGUgfSBmcm9tIFwiLi9EcmFnZ2FibGVcIlxuaW1wb3J0IHsgQ2FyZFZpZXcgfSBmcm9tIFwiLi9DYXJkVmlld1wiXG5pbXBvcnQgeyBGYW5WaWV3IH0gZnJvbSBcIi4vRmFuVmlld1wiXG5pbXBvcnQgeyBMYXlvdXRWaWV3IH0gZnJvbSBcIi4vTGF5b3V0Vmlld1wiXG5pbXBvcnQgeyBGb3VuZGF0aW9uUGlsZSB9IGZyb20gXCIuLi9tb2RlbHMvRm91bmRhdGlvblBpbGVcIlxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vdXRpbC9Qb2ludFwiXG5cbmNsYXNzIEZvdW5kYXRpb25QaWxlVmlldyBleHRlbmRzIFBpbGVWaWV3IHtcbiAgICBjYXJkcyA9IG5ldyBBcnJheTxDYXJkVmlldz4oKVxuICAgIGZvdW5kYXRpb25QaWxlOiBGb3VuZGF0aW9uUGlsZVxuXG4gICAgY29uc3RydWN0b3IoZm91bmRhdGlvblBpbGU6IEZvdW5kYXRpb25QaWxlKSB7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uUGlsZSA9IGZvdW5kYXRpb25QaWxlXG4gICAgICAgIGZvcihsZXQgY2FyZCBvZiBmb3VuZGF0aW9uUGlsZS5jYXJkcykge1xuICAgICAgICAgICAgbGV0IGNhcmRWaWV3ID0gbmV3IENhcmRWaWV3KGNhcmQpXG4gICAgICAgICAgICBjYXJkVmlldy5jbG9zZSgpXG4gICAgICAgICAgICB0aGlzLmNhcmRzLnB1c2goY2FyZFZpZXcpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHN1cGVyLnJlbmRlcigpXG4gICAgICAgIGlmKHRoaXMuY2FyZHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIGxldCBob2xkZXIgPSBDYXJkVmlldy5jcmVhdGVIb2xkZXIodGhpcy5zaXplKVxuICAgICAgICAgICAgdGhpcy5nLmFwcGVuZENoaWxkKGhvbGRlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjYXJkID0gdGhpcy5jYXJkc1t0aGlzLmNhcmRzLmxlbmd0aCAtIDFdXG4gICAgICAgICAgICBjYXJkLnBvc2l0aW9uID0gbmV3IFBvaW50KDAsIDApXG4gICAgICAgICAgICBjYXJkLnNpemUgPSB0aGlzLiBzaXplXG4gICAgICAgICAgICBjYXJkLnJlbmRlcigpXG4gICAgICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQoY2FyZC5nKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQ2FyZChjYXJkOiBDYXJkVmlldykge1xuICAgICAgICB0aGlzLmNhcmRzLnB1c2goY2FyZClcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uUGlsZS5hZGQoY2FyZC5jYXJkKVxuICAgICAgICB0aGlzLnJlbmRlcigpXG4gICAgfVxuXG4gICAgY2FuQWRkKGRyYWdnYWJsZTogRHJhZ2dhYmxlKTogQm9vbGVhbiB7XG4gICAgICAgIGlmKGRyYWdnYWJsZSBpbnN0YW5jZW9mIENhcmRWaWV3KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uUGlsZS5jYW5BZGQoZHJhZ2dhYmxlLmNhcmQpXG4gICAgICAgIH0gZWxzZSBpZiAoZHJhZ2dhYmxlIGluc3RhbmNlb2YgRmFuVmlldykge1xuICAgICAgICAgICAgaWYoIWRyYWdnYWJsZS5mYW4uaXNTaW5nbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvdW5kYXRpb25QaWxlLmNhbkFkZChkcmFnZ2FibGUuY2FyZCEhLmNhcmQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZChkcmFnZ2FibGU6IERyYWdnYWJsZSkge1xuICAgICAgICBpZighdGhpcy5jYW5BZGQoZHJhZ2dhYmxlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGFkZCB0byBmb3VuZGF0aW9uXCIpXG4gICAgICAgIH1cblxuICAgICAgICBpZihkcmFnZ2FibGUgaW5zdGFuY2VvZiBDYXJkVmlldykge1xuICAgICAgICAgICAgZHJhZ2dhYmxlLm9wZW4oKVxuICAgICAgICAgICAgdGhpcy5hZGRDYXJkKGRyYWdnYWJsZSlcbiAgICAgICAgfSBlbHNlIGlmIChkcmFnZ2FibGUgaW5zdGFuY2VvZiBGYW5WaWV3KSB7XG4gICAgICAgICAgICB0aGlzLmFkZENhcmQoZHJhZ2dhYmxlLmNhcmQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUxhc3QoKTogQ2FyZFZpZXcge1xuICAgICAgICBpZih0aGlzLmNhcmRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uUGlsZS5yZW1vdmVMYXN0KClcbiAgICAgICAgbGV0IGNhcmQgPSB0aGlzLmNhcmRzW3RoaXMuY2FyZHMubGVuZ3RoIC0gMV1cbiAgICAgICAgdGhpcy5jYXJkcy5zcGxpY2UoLTEsIDEpXG4gICAgICAgIGNhcmQucG9zaXRpb24gPSBMYXlvdXRWaWV3LmdldEFic29sdXRlUG9zaXRpb24oY2FyZC5nKVxuICAgICAgICB0aGlzLnJlbmRlcigpXG4gICAgICAgIHJldHVybiBjYXJkXG4gICAgfVxuXG4gICAgaXNJbnNpZGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHggPj0gdGhpcy5wb3NpdGlvbi54ICYmIHkgPj0gdGhpcy5wb3NpdGlvbi55ICYmIFxuICAgICAgICB4IDwgdGhpcy5wb3NpdGlvbi54ICsgdGhpcy5zaXplLnggJiYgeSA8IHRoaXMucG9zaXRpb24ueSArIHRoaXMuc2l6ZS55XG4gICAgfVxuXG4gICAgZ2V0RHJhZ2dhYmxlKHg6IG51bWJlciwgeTogbnVtYmVyKTogRHJhZ2dhYmxlIHtcbiAgICAgICAgaWYoIXRoaXMuaXNJbnNpZGUoeCwgeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVMYXN0KClcbiAgICB9XG5cbiAgICBnZXQgZHJvcFBvaW50KCk6IFBvaW50IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb2ludCgwLCAwKVxuICAgIH1cbn1cblxuZXhwb3J0IHsgRm91bmRhdGlvblBpbGVWaWV3IH0iLCJpbXBvcnQgeyBDYXJkIH0gZnJvbSBcIi4vQ2FyZFwiXG5pbXBvcnQgeyBGYW4gfSBmcm9tIFwiLi9GYW5cIlxuXG5jbGFzcyBUYWJsZWF1IHtcbiAgICBjbG9zZWQgPSBuZXcgQXJyYXk8Q2FyZD4oKVxuICAgIGZhbiA9IG5ldyBGYW4oKVxuXG4gICAgYWRkQ2xvc2VkKGNhcmQ6IENhcmQpIHtcbiAgICAgICAgdGhpcy5jbG9zZWQucHVzaChjYXJkKVxuICAgIH1cblxuICAgIG9wZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIGlmKCF0aGlzLmZhbi5pc0VtcHR5KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLmNsb3NlZC5sZW5ndGhcblxuICAgICAgICBpZihsZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsb3NlZC5zcGxpY2UoLTEsIDEpXG5cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZW1vdmVGYW4oKSB7XG4gICAgICAgIHRoaXMuZmFuID0gbmV3IEZhbigpXG4gICAgfVxuXG4gICAgZ2V0IGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZhbi5pc0VtcHR5ICYmIHRoaXMuY2xvc2VkLmxlbmd0aCA9PSAwXG4gICAgfVxufVxuXG5leHBvcnQgeyBUYWJsZWF1IH0iLCJpbXBvcnQgeyBQaWxlVmlldyB9IGZyb20gXCIuL1BpbGVWaWV3XCJcbmltcG9ydCB7IERyYWdnYWJsZSB9IGZyb20gXCIuL0RyYWdnYWJsZVwiXG5pbXBvcnQgeyBMYXlvdXRWaWV3IH0gZnJvbSBcIi4vTGF5b3V0Vmlld1wiXG5pbXBvcnQgeyBDYXJkVmlldyB9IGZyb20gXCIuL0NhcmRWaWV3XCJcbmltcG9ydCB7IEZhblZpZXcgfSBmcm9tIFwiLi9GYW5WaWV3XCJcbmltcG9ydCB7IFRhYmxlYXUgfSBmcm9tIFwiLi4vbW9kZWxzL1RhYmxlYXVcIlxuaW1wb3J0IHsgQ29uc3RzIH0gZnJvbSBcIi4uL3V0aWwvQ29uc3RzXCJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL3V0aWwvUG9pbnRcIlxuXG5jbGFzcyBUYWJsZWF1VmlldyBleHRlbmRzIFBpbGVWaWV3IHtcbiAgICBjbG9zZWQgPSBuZXcgQXJyYXk8Q2FyZFZpZXc+KClcbiAgICBmYW46IEZhblZpZXdcbiAgICB0YWJsZWF1OiBUYWJsZWF1XG5cbiAgICBjb25zdHJ1Y3Rvcih0YWJsZWF1OiBUYWJsZWF1KSB7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgaWYgKCF0YWJsZWF1LmlzRW1wdHkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vbiBlbXB0eSB0YWJsZWF1XCIpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRhYmxlYXUgPSB0YWJsZWF1XG4gICAgICAgIHRoaXMuZmFuID0gbmV3IEZhblZpZXcodGFibGVhdS5mYW4pXG4gICAgfVxuXG4gICAgYWRkQ2xvc2VkKGNhcmQ6IENhcmRWaWV3KSB7XG4gICAgICAgIHRoaXMudGFibGVhdS5hZGRDbG9zZWQoY2FyZC5jYXJkKVxuICAgICAgICB0aGlzLmNsb3NlZC5wdXNoKGNhcmQpXG4gICAgfVxuXG4gICAgb3BlbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRhYmxlYXUub3BlbigpKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBsZXQgY2FyZCA9IHRoaXMuY2xvc2VkW3RoaXMuY2xvc2VkLmxlbmd0aCAtIDFdXG4gICAgICAgIHRoaXMuY2xvc2VkLnNwbGljZSgtMSwgMSlcbiAgICAgICAgY2FyZC5vcGVuKClcbiAgICAgICAgdGhpcy5mYW4uYWRkQ2FyZChjYXJkKVxuICAgICAgICB0aGlzLnJlbmRlcigpXG4gICAgfVxuXG4gICAgZ2V0IHlDbG9zZWQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIENvbnN0cy5DbG9zZWRHYXBGYWN0b3IgKiB0aGlzLnNpemUueSAqIHRoaXMuY2xvc2VkLmxlbmd0aFxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgc3VwZXIucmVuZGVyKClcblxuICAgICAgICBpZiAodGhpcy50YWJsZWF1LmlzRW1wdHkpIHtcbiAgICAgICAgICAgIGxldCBob2xkZXIgPSBDYXJkVmlldy5jcmVhdGVIb2xkZXIodGhpcy5zaXplKVxuICAgICAgICAgICAgdGhpcy5nLmFwcGVuZENoaWxkKGhvbGRlcilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNsb3NlZC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGNhcmQgPSB0aGlzLmNsb3NlZFtpXVxuICAgICAgICAgICAgY2FyZC5wb3NpdGlvbiA9IG5ldyBQb2ludCgwLCBDb25zdHMuQ2xvc2VkR2FwRmFjdG9yICogdGhpcy5zaXplLnkgKiBpKVxuICAgICAgICAgICAgY2FyZC5zaXplID0gdGhpcy5zaXplXG4gICAgICAgICAgICBjYXJkLnJlbmRlcigpXG4gICAgICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQoY2FyZC5nKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mYW4ucG9zaXRpb24gPSBuZXcgUG9pbnQoMCwgdGhpcy55Q2xvc2VkKVxuICAgICAgICB0aGlzLmZhbi5zaXplID0gdGhpcy5zaXplXG4gICAgICAgIHRoaXMuZmFuLnJlbmRlcigpXG4gICAgICAgIHRoaXMuZy5hcHBlbmRDaGlsZCh0aGlzLmZhbi5nKVxuICAgIH1cblxuICAgIGlzSW5zaWRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHggLT0gdGhpcy5wb3NpdGlvbi54XG4gICAgICAgIHkgLT0gdGhpcy5wb3NpdGlvbi55XG5cbiAgICAgICAgaWYgKHRoaXMuZmFuLmlzSW5zaWRlKHgsIHkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBoZWlnaHQgPSBDb25zdHMuQ2xvc2VkR2FwRmFjdG9yICogdGhpcy5zaXplLnkgKiAodGhpcy5jbG9zZWQubGVuZ3RoIC0gMSkgKyB0aGlzLnNpemUueVxuICAgICAgICByZXR1cm4geCA+PSAwICYmIHkgPj0gMCAmJlxuICAgICAgICAgICAgeCA8IHRoaXMuc2l6ZS54ICYmIHkgPCBoZWlnaHRcbiAgICB9XG5cbiAgICBnZXREcmFnZ2FibGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBEcmFnZ2FibGUge1xuICAgICAgICB4IC09IHRoaXMucG9zaXRpb24ueFxuICAgICAgICB5IC09IHRoaXMucG9zaXRpb24ueVxuXG4gICAgICAgIGxldCBkcmFnZ2FibGUgPSB0aGlzLmZhbi5nZXREcmFnZ2FibGUoeCwgeSlcbiAgICAgICAgaWYgKGRyYWdnYWJsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZHJhZ2dhYmxlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5mYW4uZmFuLmlzRW1wdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5mYW4uaXNJbnNpZGUoeCwgeSkpIHtcbiAgICAgICAgICAgIGRyYWdnYWJsZSA9IHRoaXMuZmFuXG4gICAgICAgICAgICB0aGlzLnRhYmxlYXUucmVtb3ZlRmFuKClcbiAgICAgICAgICAgIHRoaXMuZmFuID0gbmV3IEZhblZpZXcodGhpcy50YWJsZWF1LmZhbilcbiAgICAgICAgICAgIGRyYWdnYWJsZS5wb3NpdGlvbiA9IExheW91dFZpZXcuZ2V0QWJzb2x1dGVQb3NpdGlvbihkcmFnZ2FibGUuZylcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKClcblxuICAgICAgICAgICAgcmV0dXJuIGRyYWdnYWJsZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBnZXQgZHJvcFBvaW50KCk6IFBvaW50IHtcbiAgICAgICAgaWYgKHRoaXMuZmFuLmZhbi5pc0VtcHR5KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvaW50KDAsIHRoaXMueUNsb3NlZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBwb2ludCA9IHRoaXMuZmFuLmRyb3BQb2ludFxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQb2ludChwb2ludC54ICsgdGhpcy5mYW4ucG9zaXRpb24ueCwgcG9pbnQueSArIHRoaXMuZmFuLnBvc2l0aW9uLnkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5BZGQoZHJhZ2dhYmxlOiBEcmFnZ2FibGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGRyYWdnYWJsZSBpbnN0YW5jZW9mIENhcmRWaWV3KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mYW4uY2FuQWRkQ2FyZChkcmFnZ2FibGUpXG4gICAgICAgIH0gZWxzZSBpZiAoZHJhZ2dhYmxlIGluc3RhbmNlb2YgRmFuVmlldykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmFuLmNhbkFkZEZhbihkcmFnZ2FibGUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZChkcmFnZ2FibGU6IERyYWdnYWJsZSkge1xuICAgICAgICBpZiAoIXRoaXMuY2FuQWRkKGRyYWdnYWJsZSkpIHtcbiAgICAgICAgICAgIC8vdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGFkZCB0byB0YWJsZWF1XCIpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZHJhZ2dhYmxlIGluc3RhbmNlb2YgQ2FyZFZpZXcpIHtcbiAgICAgICAgICAgIGRyYWdnYWJsZS5vcGVuKClcbiAgICAgICAgICAgIHRoaXMuZmFuLmFkZENhcmQoZHJhZ2dhYmxlKVxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKVxuICAgICAgICB9IGVsc2UgaWYgKGRyYWdnYWJsZSBpbnN0YW5jZW9mIEZhblZpZXcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZhbi5mYW4uaXNFbXB0eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmFuID0gZHJhZ2dhYmxlXG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZWF1LmZhbiA9IHRoaXMuZmFuLmZhblxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mYW4uYWRkRmFuKGRyYWdnYWJsZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyRHJhZ2dlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmFuLmZhbi5pc0VtcHR5KSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlTGFzdCgpOiBDYXJkVmlldyB7XG4gICAgICAgIGlmKHRoaXMuZmFuLmZhbi5pc1NpbmdsZSkge1xuICAgICAgICAgICAgdGhpcy50YWJsZWF1LnJlbW92ZUZhbigpXG4gICAgICAgICAgICBsZXQgY2FyZCA9IHRoaXMuZmFuLmNhcmRcbiAgICAgICAgICAgIHRoaXMuZmFuID0gbmV3IEZhblZpZXcodGhpcy50YWJsZWF1LmZhbilcbiAgICAgICAgICAgIGNhcmQucG9zaXRpb24gPSBMYXlvdXRWaWV3LmdldEFic29sdXRlUG9zaXRpb24oY2FyZC5nKVxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKVxuICAgICAgICAgICAgcmV0dXJuIGNhcmRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZhbi5yZW1vdmVMYXN0KClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHsgVGFibGVhdVZpZXcgfSIsImltcG9ydCB7IENhcmQgfSBmcm9tIFwiLi9DYXJkXCJcbmltcG9ydCB7IFJhbmtVdGlsIH0gZnJvbSBcIi4vUmFua1wiXG5pbXBvcnQgeyBTdWl0VXRpbCB9IGZyb20gXCIuL1N1aXRcIlxuXG5jbGFzcyBIYW5kIHtcbiAgICBjYXJkcyA9IG5ldyBBcnJheTxDYXJkPigpXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgZm9yKGxldCBzdWl0IG9mIFN1aXRVdGlsLlN1aXRzKSB7XG4gICAgICAgICAgICBmb3IobGV0IHJhbmsgb2YgUmFua1V0aWwuUmFua3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmRzLnB1c2gobmV3IENhcmQoc3VpdCwgcmFuaykpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGQoY2FyZDogQ2FyZCkge1xuICAgICAgICB0aGlzLmNhcmRzLnB1c2goY2FyZClcbiAgICB9XG5cbiAgICBzaHVmZmxlKCkge1xuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy5jYXJkcy5sZW5ndGhcblxuICAgICAgICBpZihsZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGxlbmd0aCAtIGkpKSArIGlcbiAgICAgICAgICAgIGxldCB0bXAgPSB0aGlzLmNhcmRzW2ldXG4gICAgICAgICAgICB0aGlzLmNhcmRzW2ldID0gdGhpcy5jYXJkc1tqXVxuICAgICAgICAgICAgdGhpcy5jYXJkc1tqXSA9IHRtcFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlTGFzdCgpIHtcbiAgICAgICAgdGhpcy5jYXJkcy5zcGxpY2UoLTEsIDEpXG4gICAgfVxufVxuXG5leHBvcnQgeyBIYW5kIH0iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vVmlld1wiXG5pbXBvcnQgeyBDYXJkVmlldyB9IGZyb20gXCIuL0NhcmRWaWV3XCJcbmltcG9ydCB7IExheW91dFZpZXcgfSBmcm9tIFwiLi9MYXlvdXRWaWV3XCJcbmltcG9ydCB7IEhhbmQgfSBmcm9tIFwiLi4vbW9kZWxzL0hhbmRcIlxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vdXRpbC9Qb2ludFwiXG5cbmNsYXNzIEhhbmRWaWV3IGV4dGVuZHMgVmlldyB7XG4gICAgaGFuZDogSGFuZDtcbiAgICBjYXJkcyA9IG5ldyBBcnJheTxDYXJkVmlldz4oKVxuXG4gICAgY29uc3RydWN0b3IoaGFuZDogSGFuZCkge1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuaGFuZCA9IGhhbmRcbiAgICAgICAgZm9yKGxldCBjYXJkIG9mIGhhbmQuY2FyZHMpIHtcbiAgICAgICAgICAgIGxldCBjYXJkVmlldyA9IG5ldyBDYXJkVmlldyhjYXJkKVxuICAgICAgICAgICAgY2FyZFZpZXcuY2xvc2UoKVxuICAgICAgICAgICAgdGhpcy5jYXJkcy5wdXNoKGNhcmRWaWV3KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBzdXBlci5yZW5kZXIoKVxuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5jYXJkcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgbGV0IGhvbGRlciA9IENhcmRWaWV3LmNyZWF0ZUhvbGRlcih0aGlzLnNpemUpXG4gICAgICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQoaG9sZGVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGNhcmQgPSB0aGlzLmNhcmRzW3RoaXMuY2FyZHMubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgIGNhcmQucG9zaXRpb24gPSBuZXcgUG9pbnQoMCwgMClcbiAgICAgICAgICAgIGNhcmQuc2l6ZSA9IHRoaXMuc2l6ZVxuICAgICAgICAgICAgY2FyZC5yZW5kZXIoKVxuICAgICAgICAgICAgdGhpcy5nLmFwcGVuZENoaWxkKGNhcmQuZylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZChjYXJkOiBDYXJkVmlldykge1xuICAgICAgICBjYXJkLmNsb3NlKClcbiAgICAgICAgdGhpcy5jYXJkcy5wdXNoKGNhcmQpXG4gICAgICAgIHRoaXMuaGFuZC5hZGQoY2FyZC5jYXJkKVxuICAgICAgICB0aGlzLnJlbmRlcigpXG4gICAgfVxuXG4gICAgcmVtb3ZlTGFzdCgpOiBDYXJkVmlldyB7XG4gICAgICAgIHRoaXMuaGFuZC5yZW1vdmVMYXN0KClcbiAgICAgICAgbGV0IGNhcmQgPSB0aGlzLmNhcmRzW3RoaXMuY2FyZHMubGVuZ3RoIC0gMV1cbiAgICAgICAgdGhpcy5jYXJkcy5zcGxpY2UoLTEsIDEpXG4gICAgICAgIGNhcmQucG9zaXRpb24gPSBMYXlvdXRWaWV3LmdldEFic29sdXRlUG9zaXRpb24oY2FyZC5nKVxuICAgICAgICB0aGlzLnJlbmRlcigpXG4gICAgICAgIHJldHVybiBjYXJkXG4gICAgfVxuXG4gICAgaXNJbnNpZGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHggPj0gdGhpcy5wb3NpdGlvbi54ICYmIHkgPj0gdGhpcy5wb3NpdGlvbi55ICYmIFxuICAgICAgICB4IDwgdGhpcy5wb3NpdGlvbi54ICsgdGhpcy5zaXplLnggJiYgeSA8IHRoaXMucG9zaXRpb24ueSArIHRoaXMuc2l6ZS55XG4gICAgfVxuXG4gICAgZ2V0IGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhcmRzLmxlbmd0aCA9PSAwXG4gICAgfVxufVxuXG5leHBvcnQgeyBIYW5kVmlldyB9IiwiaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCIuL0NhcmRcIlxuXG5jbGFzcyBXYXN0ZVBpbGUge1xuICAgIGNhcmRzID0gbmV3IEFycmF5PENhcmQ+KClcblxuICAgIGFkZChjYXJkOiBDYXJkKSB7XG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChjYXJkKVxuICAgIH1cblxuICAgIHJlbW92ZUxhc3QoKSB7XG4gICAgICAgIHRoaXMuY2FyZHMuc3BsaWNlKC0xLCAxKVxuICAgIH1cblxuICAgIHJlbW92ZUFsbCgpIHtcbiAgICAgICAgdGhpcy5jYXJkcyA9IG5ldyBBcnJheTxDYXJkPigpXG4gICAgfVxuXG4gICAgZ2V0IGxhc3QoKTogQ2FyZCB7XG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLmNhcmRzLmxlbmd0aFxuICAgICAgICBpZihsZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jYXJkc1tsZW5ndGggLSAxXVxuICAgIH1cbn1cblxuZXhwb3J0IHsgV2FzdGVQaWxlIH0iLCJpbXBvcnQgeyBQaWxlVmlldyB9IGZyb20gXCIuL1BpbGVWaWV3XCJcbmltcG9ydCB7IERyYWdnYWJsZSB9IGZyb20gXCIuL0RyYWdnYWJsZVwiXG5pbXBvcnQgeyBDYXJkVmlldyB9IGZyb20gXCIuL0NhcmRWaWV3XCJcbmltcG9ydCB7IExheW91dFZpZXcgfSBmcm9tIFwiLi9MYXlvdXRWaWV3XCJcbmltcG9ydCB7IFdhc3RlUGlsZSB9IGZyb20gXCIuLi9tb2RlbHMvV2FzdGVQaWxlXCJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL3V0aWwvUG9pbnRcIlxuXG5jbGFzcyBXYXN0ZVBpbGVWaWV3IGV4dGVuZHMgUGlsZVZpZXcge1xuICAgIHdhc3RlOiBXYXN0ZVBpbGVcbiAgICBjYXJkcyA9IG5ldyBBcnJheTxDYXJkVmlldz4oKVxuXG4gICAgY29uc3RydWN0b3Iod2FzdGU6IFdhc3RlUGlsZSkge1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMud2FzdGUgPSB3YXN0ZVxuXG4gICAgICAgIGZvcihsZXQgY2FyZCBvZiB3YXN0ZS5jYXJkcykge1xuICAgICAgICAgICAgbGV0IGNhcmRWaWV3ID0gbmV3IENhcmRWaWV3KGNhcmQpXG4gICAgICAgICAgICBjYXJkVmlldy5jbG9zZSgpXG4gICAgICAgICAgICB0aGlzLmNhcmRzLnB1c2goY2FyZFZpZXcpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHN1cGVyLnJlbmRlcigpXG5cbiAgICAgICAgaWYodGhpcy5jYXJkcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgbGV0IGhvbGRlciA9IENhcmRWaWV3LmNyZWF0ZUhvbGRlcih0aGlzLnNpemUpXG4gICAgICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQoaG9sZGVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGNhcmQgPSB0aGlzLmNhcmRzW3RoaXMuY2FyZHMubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgIGNhcmQucG9zaXRpb24gPSBuZXcgUG9pbnQoMCwgMClcbiAgICAgICAgICAgIGNhcmQuc2l6ZSA9IHRoaXMuc2l6ZVxuICAgICAgICAgICAgY2FyZC5yZW5kZXIoKVxuICAgICAgICAgICAgdGhpcy5nLmFwcGVuZENoaWxkKGNhcmQuZylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbkFkZChkcmFnZ2FibGU6IERyYWdnYWJsZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBhZGQoZHJhZ2dhYmxlOiBEcmFnZ2FibGUpIHtcbiAgICAgICAgaWYoZHJhZ2dhYmxlIGluc3RhbmNlb2YgQ2FyZFZpZXcpIHtcbiAgICAgICAgICAgIGRyYWdnYWJsZS5vcGVuKClcbiAgICAgICAgICAgIHRoaXMuY2FyZHMucHVzaChkcmFnZ2FibGUpXG4gICAgICAgICAgICB0aGlzLndhc3RlLmFkZChkcmFnZ2FibGUuY2FyZClcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBhZGQgdG8gd2FzdGUgcGlsZVwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlTGFzdCgpOiBDYXJkVmlldyB7XG4gICAgICAgIGlmKHRoaXMuY2FyZHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndhc3RlLnJlbW92ZUxhc3QoKVxuICAgICAgICBsZXQgY2FyZCA9IHRoaXMuY2FyZHNbdGhpcy5jYXJkcy5sZW5ndGggLSAxXVxuICAgICAgICB0aGlzLmNhcmRzLnNwbGljZSgtMSwgMSlcbiAgICAgICAgY2FyZC5wb3NpdGlvbiA9IExheW91dFZpZXcuZ2V0QWJzb2x1dGVQb3NpdGlvbihjYXJkLmcpXG4gICAgICAgIHRoaXMucmVuZGVyKClcbiAgICAgICAgcmV0dXJuIGNhcmRcbiAgICB9XG5cbiAgICByZW1vdmVBbGwoKTogQXJyYXk8Q2FyZFZpZXc+IHtcbiAgICAgICAgbGV0IHJlbW92ZWQgPSB0aGlzLmNhcmRzXG4gICAgICAgIHRoaXMuY2FyZHMgPSBuZXcgQXJyYXk8Q2FyZFZpZXc+KClcbiAgICAgICAgdGhpcy53YXN0ZS5yZW1vdmVBbGwoKVxuICAgICAgICB0aGlzLnJlbmRlcigpXG5cbiAgICAgICAgcmV0dXJuIHJlbW92ZWRcbiAgICB9XG5cbiAgICBpc0luc2lkZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4geCA+PSB0aGlzLnBvc2l0aW9uLnggJiYgeSA+PSB0aGlzLnBvc2l0aW9uLnkgJiYgXG4gICAgICAgIHggPCB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLnNpemUueCAmJiB5IDwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5zaXplLnlcbiAgICB9XG5cblxuICAgIGdldERyYWdnYWJsZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IERyYWdnYWJsZSB7XG4gICAgICAgIGlmKCF0aGlzLmlzSW5zaWRlKHgsIHkpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlTGFzdCgpXG4gICAgfVxuXG5cbiAgIGdldCBkcm9wUG9pbnQoKTogUG9pbnQge1xuICAgICAgIHJldHVybiBuZXcgUG9pbnQoMCwgMClcbiAgIH1cbn1cblxuZXhwb3J0IHsgV2FzdGVQaWxlVmlldyB9IiwiaW1wb3J0IHsgSGFuZCB9IGZyb20gXCIuL0hhbmRcIlxuaW1wb3J0IHsgRm91bmRhdGlvblBpbGUgfSBmcm9tIFwiLi9Gb3VuZGF0aW9uUGlsZVwiXG5pbXBvcnQgeyBUYWJsZWF1IH0gZnJvbSBcIi4vVGFibGVhdVwiXG5pbXBvcnQgeyBXYXN0ZVBpbGUgfSBmcm9tIFwiLi9XYXN0ZVBpbGVcIlxuXG5jbGFzcyBMYXlvdXQge1xuICAgIGZvdW5kYXRpb25zID0gbmV3IEFycmF5PEZvdW5kYXRpb25QaWxlPigpXG4gICAgdGFibGVhdXMgPSBuZXcgQXJyYXk8VGFibGVhdT4oKVxuICAgIGhhbmQ6IEhhbmRcbiAgICB3YXN0ZSA9IG5ldyBXYXN0ZVBpbGUoKVxuXG4gICAgY29uc3RydWN0b3IoaGFuZDogSGFuZCkge1xuICAgICAgICB0aGlzLmhhbmQgPSBoYW5kXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA0OyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMuZm91bmRhdGlvbnMucHVzaChuZXcgRm91bmRhdGlvblBpbGUoKSlcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNzsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLnRhYmxlYXVzLnB1c2gobmV3IFRhYmxlYXUoKSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHsgTGF5b3V0IH0iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vVmlld1wiXG5pbXBvcnQgeyBEcmFnZ2FibGUgfSBmcm9tIFwiLi9EcmFnZ2FibGVcIlxuaW1wb3J0IHsgRm91bmRhdGlvblBpbGVWaWV3IH0gZnJvbSBcIi4vRm91bmRhdGlvblBpbGVWaWV3XCJcbmltcG9ydCB7IFRhYmxlYXVWaWV3IH0gZnJvbSBcIi4vVGFibGVhdVZpZXdcIlxuaW1wb3J0IHsgSGFuZFZpZXcgfSBmcm9tIFwiLi9IYW5kVmlld1wiXG5pbXBvcnQgeyBXYXN0ZVBpbGVWaWV3IH0gZnJvbSBcIi4vV2FzdGVQaWxlVmlld1wiXG5pbXBvcnQgeyBQaWxlVmlldyB9IGZyb20gXCIuL1BpbGVWaWV3XCJcbmltcG9ydCB7IExheW91dCB9IGZyb20gXCIuLi9tb2RlbHMvTGF5b3V0XCJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL3V0aWwvUG9pbnRcIlxuaW1wb3J0IHsgQ29uc3RzIH0gZnJvbSBcIi4uL3V0aWwvQ29uc3RzXCJcblxuY2xhc3MgTGF5b3V0VmlldyBleHRlbmRzIFZpZXcge1xuICAgIGZvdW5kYXRpb25zID0gbmV3IEFycmF5PEZvdW5kYXRpb25QaWxlVmlldz4oKVxuICAgIHRhYmxlYXVzID0gbmV3IEFycmF5PFRhYmxlYXVWaWV3PigpXG4gICAgaGFuZDogSGFuZFZpZXdcbiAgICB3YXN0ZTogV2FzdGVQaWxlVmlld1xuICAgIHBpbGVzID0gbmV3IEFycmF5PFBpbGVWaWV3PigpXG4gICAgbGF5b3V0OiBMYXlvdXRcblxuICAgIHByaXZhdGUgc3RhdGljIGdMYXlvdXQ6IFNWR0dFbGVtZW50XG4gICAgc3RhdGljIGdldEFic29sdXRlUG9zaXRpb24oZzogU1ZHR0VsZW1lbnQpOiBQb2ludCB7XG4gICAgICAgIGxldCBwID0gbmV3IFBvaW50KDAsIDApXG4gICAgICAgIHdoaWxlKGcgIT0gbnVsbCAmJiBnICE9IExheW91dFZpZXcuZ0xheW91dCkge1xuICAgICAgICAgICAgbGV0IHRyYW5zbGF0ZSA9IGcuZ2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIpXG4gICAgICAgICAgICBpZih0cmFuc2xhdGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSA9IFwidHJhbnNsYXRlKDAsMClcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJhbnNsYXRlID0gdHJhbnNsYXRlLnN1YnN0cihcInRyYW5zbGF0ZVwiLmxlbmd0aClcbiAgICAgICAgICAgIHRyYW5zbGF0ZSA9IHRyYW5zbGF0ZS5yZXBsYWNlKFwiKFwiLCBcIlwiKVxuICAgICAgICAgICAgdHJhbnNsYXRlID0gdHJhbnNsYXRlLnJlcGxhY2UoXCIpXCIsIFwiXCIpXG4gICAgICAgICAgICBsZXQgc3BsaXQgPSB0cmFuc2xhdGUuc3BsaXQoXCIsXCIpXG4gICAgICAgICAgICBpZihzcGxpdC5sZW5ndGggIT0gMikge1xuICAgICAgICAgICAgICAgIHNwbGl0ID0gW1wiXCIsIFwiXCJdXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB4ID0gcGFyc2VGbG9hdChzcGxpdFswXSlcbiAgICAgICAgICAgIGxldCB5ID0gcGFyc2VGbG9hdChzcGxpdFsxXSlcbiAgICAgICAgICAgIGlmKGlzTmFOKHgpKSB7XG4gICAgICAgICAgICAgICAgeCA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGlzTmFOKHkpKSB7XG4gICAgICAgICAgICAgICAgeSA9IDBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcC54ICs9IHhcbiAgICAgICAgICAgIHAueSArPSB5XG5cbiAgICAgICAgICAgIGxldCBwYXJlbnQgPSBnLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgIGlmKHBhcmVudCBpbnN0YW5jZW9mIFNWR0dFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZyA9IHBhcmVudFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihsYXlvdXQ6IExheW91dCkge1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIExheW91dFZpZXcuZ0xheW91dCA9IHRoaXMuZ1xuICAgICAgICB0aGlzLmxheW91dCA9IGxheW91dFxuICAgICAgICB0aGlzLmhhbmQgPSBuZXcgSGFuZFZpZXcobGF5b3V0LmhhbmQpXG4gICAgICAgIHRoaXMud2FzdGUgPSBuZXcgV2FzdGVQaWxlVmlldyhsYXlvdXQud2FzdGUpXG4gICAgICAgIHRoaXMucGlsZXMucHVzaCh0aGlzLndhc3RlKVxuICAgICAgICBmb3IgKGxldCBmIG9mIGxheW91dC5mb3VuZGF0aW9ucykge1xuICAgICAgICAgICAgbGV0IHYgPSBuZXcgRm91bmRhdGlvblBpbGVWaWV3KGYpXG4gICAgICAgICAgICB0aGlzLmZvdW5kYXRpb25zLnB1c2godilcbiAgICAgICAgICAgIHRoaXMucGlsZXMucHVzaCh2KVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHQgb2YgbGF5b3V0LnRhYmxlYXVzKSB7XG4gICAgICAgICAgICBsZXQgdiA9IG5ldyBUYWJsZWF1Vmlldyh0KVxuICAgICAgICAgICAgdGhpcy50YWJsZWF1cy5wdXNoKHYpXG4gICAgICAgICAgICB0aGlzLnBpbGVzLnB1c2godilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdGltZTogbnVtYmVyID0gMFxuICAgIGNhcmRTaXplOiBQb2ludFxuICAgIHByaXZhdGUgYmxvY2tTaXplOiBQb2ludFxuXG4gICAgc2V0U2l6ZShzaXplOiBQb2ludCkge1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplXG4gICAgICAgIGxldCBjYXJkV2lkdGggPSAoc2l6ZS54IC0gMiAqIENvbnN0cy5NYXJnaW4pIC8gNyAqIDAuOVxuICAgICAgICB0aGlzLmNhcmRTaXplID0gbmV3IFBvaW50KGNhcmRXaWR0aCwgY2FyZFdpZHRoICogMS42MTgpXG4gICAgICAgIHRoaXMuYmxvY2tTaXplID0gbmV3IFBvaW50KHRoaXMuY2FyZFNpemUueCAvIDAuOSxcbiAgICAgICAgICAgIHRoaXMuY2FyZFNpemUueSAvIDAuOSlcblxuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBzdXBlci5yZW5kZXIoKVxuICAgICAgICB0aGlzLnJlbmRlckhhbmQoKVxuICAgICAgICB0aGlzLnJlbmRlcldhc3RlKClcbiAgICAgICAgdGhpcy5yZW5kZXJGb3VuZGF0aW9ucygpXG4gICAgICAgIHRoaXMucmVuZGVyVGFibGVhdXMoKVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVySGFuZCgpIHtcbiAgICAgICAgdGhpcy5oYW5kLnBvc2l0aW9uID0gbmV3IFBvaW50KDYgKiB0aGlzLmJsb2NrU2l6ZS54ICsgQ29uc3RzLk1hcmdpbixcbiAgICAgICAgICAgIDAuNSAqIHRoaXMuYmxvY2tTaXplLnkpXG4gICAgICAgIHRoaXMuaGFuZC5zaXplID0gdGhpcy5jYXJkU2l6ZVxuICAgICAgICB0aGlzLmhhbmQucmVuZGVyKClcbiAgICAgICAgdGhpcy5nLmFwcGVuZENoaWxkKHRoaXMuaGFuZC5nKVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyV2FzdGUoKSB7XG4gICAgICAgIHRoaXMud2FzdGUucG9zaXRpb24gPSBuZXcgUG9pbnQoNC41ICogdGhpcy5ibG9ja1NpemUueCArIENvbnN0cy5NYXJnaW4sXG4gICAgICAgICAgICAwLjUgKiB0aGlzLmJsb2NrU2l6ZS55KVxuICAgICAgICB0aGlzLndhc3RlLnNpemUgPSB0aGlzLmNhcmRTaXplXG4gICAgICAgIHRoaXMud2FzdGUucmVuZGVyKClcbiAgICAgICAgdGhpcy5nLmFwcGVuZENoaWxkKHRoaXMud2FzdGUuZylcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlckZvdW5kYXRpb25zKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZm91bmRhdGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBmb3VuZGF0aW9uID0gdGhpcy5mb3VuZGF0aW9uc1tpXVxuICAgICAgICAgICAgZm91bmRhdGlvbi5wb3NpdGlvbiA9IG5ldyBQb2ludChpICogdGhpcy5ibG9ja1NpemUueCArIENvbnN0cy5NYXJnaW4sXG4gICAgICAgICAgICAgICAgMC41ICogdGhpcy5ibG9ja1NpemUueSlcbiAgICAgICAgICAgIGZvdW5kYXRpb24uc2l6ZSA9IHRoaXMuY2FyZFNpemVcbiAgICAgICAgICAgIGZvdW5kYXRpb24ucmVuZGVyKClcbiAgICAgICAgICAgIHRoaXMuZy5hcHBlbmRDaGlsZChmb3VuZGF0aW9uLmcpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlclRhYmxlYXVzKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGFibGVhdXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCB0YWJsZWF1ID0gdGhpcy50YWJsZWF1c1tpXVxuICAgICAgICAgICAgdGFibGVhdS5wb3NpdGlvbiA9IG5ldyBQb2ludChpICogdGhpcy5ibG9ja1NpemUueCArIENvbnN0cy5NYXJnaW4sXG4gICAgICAgICAgICAgICAgMiAqIHRoaXMuYmxvY2tTaXplLnkpXG4gICAgICAgICAgICB0YWJsZWF1LnNpemUgPSB0aGlzLmNhcmRTaXplXG4gICAgICAgICAgICB0YWJsZWF1LnJlbmRlcigpXG4gICAgICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQodGFibGVhdS5nKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyR2FtZW92ZXIoKSB7XG4gICAgICAgIGxldCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFZpZXcuU1ZHX05BTUVTUEFDRSwgXCJ0ZXh0XCIpXG4gICAgICAgIHRleHQudGV4dENvbnRlbnQgPSBcIkNvbmdyYXR1bGF0aW9ucyFcIlxuICAgICAgICB0ZXh0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZ2FtZS1vdmVyXCIpXG4gICAgICAgIHRleHQuc2V0QXR0cmlidXRlKFwieFwiLCBgJHt0aGlzLnNpemUueCAvIDJ9YClcbiAgICAgICAgdGV4dC5zZXRBdHRyaWJ1dGUoXCJ5XCIsIGAke3RoaXMuc2l6ZS55IC8gMn1gKVxuICAgICAgICB0aGlzLmcuYXBwZW5kQ2hpbGQodGV4dClcbiAgICB9XG5cbiAgICBmcmVlOiBEcmFnZ2FibGUgPSBudWxsXG4gICAgc2V0RnJlZShmcmVlOiBEcmFnZ2FibGUpIHtcbiAgICAgICAgbGV0IHByZXYgPSB0aGlzLmZyZWVcbiAgICAgICAgaWYgKHByZXYgIT0gbnVsbCkge1xuICAgICAgICAgICAgcHJldi5pc0RyYWdnaW5nID0gZmFsc2VcbiAgICAgICAgICAgIHByZXYuY2xlYXJUcmFuc2Zvcm0oKVxuICAgICAgICAgICAgdGhpcy5nLnJlbW92ZUNoaWxkKHByZXYuZylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcmVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZyZWUuaXNEcmFnZ2luZyA9IHRydWVcbiAgICAgICAgICAgIGZyZWUucmVuZGVyKClcbiAgICAgICAgICAgIGZyZWUuZy5yZW1vdmVBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIilcbiAgICAgICAgICAgIHRoaXMuZy5hcHBlbmRDaGlsZChmcmVlLmcpXG4gICAgICAgICAgICBmcmVlLnNldFRyYW5zZm9ybShmcmVlLnBvc2l0aW9uKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mcmVlID0gZnJlZVxuICAgIH1cblxuICAgIGlzSW5zaWRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGRlc3RpbmF0aW9uOiBQaWxlVmlldyA9IG51bGxcbiAgICB0b3VjaFN0YXJ0ID0gbmV3IFBvaW50KDAsIDApXG4gICAgZHJhZ2dlZDogUGlsZVZpZXcgPSBudWxsXG59XG5cbmV4cG9ydCB7IExheW91dFZpZXcgfSIsImVudW0gIFN0YXR1c1R5cGUge1xuICAgIFJlYWR5LCBEZWFsaW5nLCBPcGVuaW5nLCBBbmltYXRpbmcsIERyYWdnaW5nLCBBdXRvcGxheSwgR2FtZW92ZXJcbn1cblxuZXhwb3J0IHsgU3RhdHVzVHlwZSB9IiwiaW1wb3J0IHsgU3RhdHVzVHlwZSB9IGZyb20gXCIuL1N0YXR1c1R5cGVcIlxuaW1wb3J0IHsgR2FtZVZpZXcgfSBmcm9tIFwiLi4vR2FtZVZpZXdcIlxuaW1wb3J0IHsgTGF5b3V0VmlldyB9IGZyb20gXCIuLi92aWV3cy9MYXlvdXRWaWV3XCJcblxuYWJzdHJhY3QgY2xhc3MgU3RhdHVzIHtcbiAgICBnYW1lVmlldzogR2FtZVZpZXdcbiAgICBsYXlvdXRWaWV3OiBMYXlvdXRWaWV3XG4gICAgc3RhcnRUaW1lID0gMFxuXG4gICAgY29uc3RydWN0b3IoZ2FtZVZpZXc6IEdhbWVWaWV3KSB7XG4gICAgICAgIHRoaXMuZ2FtZVZpZXcgPSBnYW1lVmlld1xuICAgICAgICB0aGlzLmxheW91dFZpZXcgPSBnYW1lVmlldy5sYXlvdXRcbiAgICB9XG4gICAgXG4gICAgZWxhcHNlZFRpbWUodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRpbWUgLSB0aGlzLnN0YXJ0VGltZVxuICAgIH1cblxuICAgIHN0YXJ0KHRpbWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHRpbWVcbiAgICB9XG5cbiAgICB0b3VjaFN0YXJ0ZWQoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICB9XG5cbiAgICB0b3VjaE1vdmVkKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgfVxuXG4gICAgdG91Y2hFbmRlZCgpIHtcbiAgICB9XG5cbiAgICB0b3VjaENhbmNlbGxlZCgpIHtcbiAgICB9XG59XG5cbmV4cG9ydCB7IFN0YXR1cyB9IiwiY2xhc3MgU291bmRQbGF5ZXIge1xuICAgIHByaXZhdGUgc291bmRQb29sOiB7IFtpZDogc3RyaW5nXTogSFRNTEF1ZGlvRWxlbWVudCB9ID0ge31cbiAgICBwcml2YXRlIGxhc3RQbGF5aW5nOiBIVE1MQXVkaW9FbGVtZW50XG5cbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgU291bmRQbGF5ZXIoKVxuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBsb2FkKHNvdW5kczogeyBbaWQ6IHN0cmluZ106IHN0cmluZyB9LCBvblJlYWR5OiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIGxldCBwcm9jZXNzaW5nID0gMFxuXG4gICAgICAgIGZvciAobGV0IGlkIGluIHNvdW5kcykge1xuICAgICAgICAgICAgbGV0IGZpbGUgPSBzb3VuZHNbaWRdXG4gICAgICAgICAgICBpZiAodGhpcy5zb3VuZFBvb2xbaWRdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcm9jZXNzaW5nKytcblxuICAgICAgICAgICAgdGhpcy5zb3VuZFBvb2xbaWRdID0gbmV3IEF1ZGlvKGZpbGUpXG4gICAgICAgICAgICB0aGlzLnNvdW5kUG9vbFtpZF0uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZG1ldGFkYXRhXCIsIChldjogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiTG9hZGVkXCIpXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2luZy0tXG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NpbmcgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvL29uUmVhZHkoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBvblJlYWR5KClcbiAgICB9XG5cbiAgICBwbGF5KGlkOiBzdHJpbmcpIHtcbiAgICAgICAgaWYodGhpcy5sYXN0UGxheWluZyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RQbGF5aW5nLnBhdXNlKClcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5zb3VuZFBvb2xbaWRdLnBsYXkoKVxuICAgICAgICBpZihwcm9taXNlKSB7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhc3RQbGF5aW5nID0gdGhpcy5zb3VuZFBvb2xbaWRdXG4gICAgfVxufVxuXG5leHBvcnQgeyBTb3VuZFBsYXllciB9IiwiaW1wb3J0IHsgU3RhdHVzIH0gZnJvbSBcIi4vU3RhdHVzXCJcbmltcG9ydCB7IFN0YXR1c1R5cGUgfSBmcm9tIFwiLi9TdGF0dXNUeXBlXCJcbmltcG9ydCB7IEdhbWVWaWV3IH0gZnJvbSBcIi4uL0dhbWVWaWV3XCJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4uL3V0aWwvUG9pbnRcIlxuaW1wb3J0IHsgU291bmRQbGF5ZXIgfSBmcm9tIFwiLi4vdXRpbC9Tb3VuZFBsYXllclwiXG5cbmNsYXNzIFJlYWR5U3RhdHVzIGV4dGVuZHMgU3RhdHVzIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lVmlldzogR2FtZVZpZXcpIHtcbiAgICAgICAgc3VwZXIoZ2FtZVZpZXcpXG5cbiAgICAgICAgdGhpcy5sYXlvdXRWaWV3LnNldEZyZWUobnVsbClcbiAgICAgICAgdGhpcy5sYXlvdXRWaWV3LmRlc3RpbmF0aW9uID0gbnVsbFxuICAgICAgICB0aGlzLmxheW91dFZpZXcuZHJhZ2dlZCA9IG51bGxcbiAgICB9XG5cbiAgICBzdGFydCh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQodGltZSlcblxuICAgICAgICBpZih0aGlzLmlzRmluaXNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5maW5pc2goKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0ZpbmlzaGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IobGV0IHQgb2YgdGhpcy5sYXlvdXRWaWV3LnRhYmxlYXVzKSB7XG4gICAgICAgICAgICBpZih0LmNsb3NlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHByaXZhdGUgZmluaXNoKCkge1xuICAgICAgICB0aGlzLmdhbWVWaWV3LnNldFN0YXR1cyhTdGF0dXNUeXBlLkF1dG9wbGF5KVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZFRhcHBlZCgpIHtcbiAgICAgICAgU291bmRQbGF5ZXIuaW5zdGFuY2UucGxheSgnZHJhZycpXG5cbiAgICAgICAgaWYgKHRoaXMubGF5b3V0Vmlldy5oYW5kLmlzRW1wdHkpIHtcbiAgICAgICAgICAgIGxldCBjYXJkcyA9IHRoaXMubGF5b3V0Vmlldy53YXN0ZS5yZW1vdmVBbGwoKVxuICAgICAgICAgICAgY2FyZHMucmV2ZXJzZSgpXG4gICAgICAgICAgICBmb3IgKGxldCBjYXJkIG9mIGNhcmRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRWaWV3LmhhbmQuYWRkKGNhcmQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbGFzdCA9IHRoaXMubGF5b3V0Vmlldy5oYW5kLnJlbW92ZUxhc3QoKVxuICAgICAgICAgICAgbGFzdC5vcGVuKClcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Vmlldy5zZXRGcmVlKGxhc3QpXG4gICAgICAgICAgICB0aGlzLmxheW91dFZpZXcuZGVzdGluYXRpb24gPSB0aGlzLmxheW91dFZpZXcud2FzdGVcbiAgICAgICAgICAgIHRoaXMuZ2FtZVZpZXcuc2V0U3RhdHVzKFN0YXR1c1R5cGUuQW5pbWF0aW5nKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG91Y2hTdGFydGVkKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmxheW91dFZpZXcuaGFuZC5pc0luc2lkZSh4LCB5KSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kVGFwcGVkKClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxheW91dFZpZXcucGlsZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBwaWxlID0gdGhpcy5sYXlvdXRWaWV3LnBpbGVzW2ldXG4gICAgICAgICAgICBsZXQgZHJhZ2dhYmxlID0gcGlsZS5nZXREcmFnZ2FibGUoeCwgeSlcbiAgICAgICAgICAgIGlmIChkcmFnZ2FibGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFNvdW5kUGxheWVyLmluc3RhbmNlLnBsYXkoJ2RyYWcnKVxuICAgICAgICAgICAgdGhpcy5sYXlvdXRWaWV3LnNldEZyZWUoZHJhZ2dhYmxlKVxuICAgICAgICAgICAgdGhpcy5sYXlvdXRWaWV3LnRvdWNoU3RhcnQgPSBuZXcgUG9pbnQoeCwgeSlcbiAgICAgICAgICAgIHRoaXMubGF5b3V0Vmlldy5kcmFnZ2VkID0gcGlsZVxuICAgICAgICAgICAgdGhpcy5nYW1lVmlldy5zZXRTdGF0dXMoU3RhdHVzVHlwZS5EcmFnZ2luZylcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgeyBSZWFkeVN0YXR1cyB9IiwiaW1wb3J0IHsgU3RhdHVzIH0gZnJvbSBcIi4vU3RhdHVzXCJcbmltcG9ydCB7IFN0YXR1c1R5cGUgfSBmcm9tIFwiLi9TdGF0dXNUeXBlXCJcbmltcG9ydCB7IEdhbWVWaWV3IH0gZnJvbSBcIi4uL0dhbWVWaWV3XCJcbmltcG9ydCB7IFNvdW5kUGxheWVyIH0gZnJvbSBcIi4uL3V0aWwvU291bmRQbGF5ZXJcIlxuXG5jbGFzcyBEZWFsaW5nU3RhdHVzIGV4dGVuZHMgU3RhdHVzIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lVmlldzogR2FtZVZpZXcpIHtcbiAgICAgICAgc3VwZXIoZ2FtZVZpZXcpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcGVuKCkge1xuICAgICAgICBTb3VuZFBsYXllci5pbnN0YW5jZS5wbGF5KCdzaHVmZmxlJylcbiAgICAgICAgdGhpcy5nYW1lVmlldy5zZXRTdGF0dXMoU3RhdHVzVHlwZS5PcGVuaW5nKVxuICAgIH1cblxuICAgIHN0YXJ0KHRpbWU6IG51bWJlcikge1xuICAgICAgICBzdXBlci5zdGFydCh0aW1lKVxuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxheW91dFZpZXcudGFibGVhdXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IGk7IGogPCB0aGlzLmxheW91dFZpZXcudGFibGVhdXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FyZCA9IHRoaXMubGF5b3V0Vmlldy5oYW5kLnJlbW92ZUxhc3QoKVxuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0Vmlldy50YWJsZWF1c1tqXS5hZGRDbG9zZWQoY2FyZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5vcGVuLmJpbmQodGhpcyksIDMwMClcbiAgICB9XG59XG5cbmV4cG9ydCB7IERlYWxpbmdTdGF0dXMgfSIsImltcG9ydCB7IFN0YXR1cyB9IGZyb20gXCIuL1N0YXR1c1wiXG5pbXBvcnQgeyBTdGF0dXNUeXBlIH0gZnJvbSBcIi4vU3RhdHVzVHlwZVwiXG5pbXBvcnQgeyBHYW1lVmlldyB9IGZyb20gXCIuLi9HYW1lVmlld1wiXG5cbmNsYXNzIE9wZW5pbmdTdGF0dXMgZXh0ZW5kcyBTdGF0dXMge1xuICAgIGNvbnN0cnVjdG9yKGdhbWVWaWV3OiBHYW1lVmlldykge1xuICAgICAgICBzdXBlcihnYW1lVmlldylcbiAgICB9XG5cbiAgICBzdGFydCh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQodGltZSlcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGF5b3V0Vmlldy50YWJsZWF1cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXRWaWV3LnRhYmxlYXVzW2ldLm9wZW4oKVxuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlYWR5LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWFkeSgpIHtcbiAgICAgICAgdGhpcy5nYW1lVmlldy5zZXRTdGF0dXMoU3RhdHVzVHlwZS5SZWFkeSlcbiAgICB9XG59XG5cbmV4cG9ydCB7IE9wZW5pbmdTdGF0dXMgfSIsImltcG9ydCB7IFN0YXR1cyB9IGZyb20gXCIuL1N0YXR1c1wiXG5pbXBvcnQgeyBTdGF0dXNUeXBlIH0gZnJvbSBcIi4vU3RhdHVzVHlwZVwiXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi91dGlsL1BvaW50XCJcbmltcG9ydCB7IENvbnN0cyB9IGZyb20gXCIuLi91dGlsL0NvbnN0c1wiXG5pbXBvcnQgeyBHYW1lVmlldyB9IGZyb20gXCIuLi9HYW1lVmlld1wiXG5pbXBvcnQgeyBMYXlvdXRWaWV3IH0gZnJvbSBcIi4uL3ZpZXdzL0xheW91dFZpZXdcIlxuXG5jbGFzcyBBbmltYXRpbmdTdGF0dXMgZXh0ZW5kcyBTdGF0dXMge1xuICAgIHByaXZhdGUgZGlzdGFuY2UgPSAwXG4gICAgcHJpdmF0ZSBvcmlnaW4gPSBuZXcgUG9pbnQoMCwgMClcbiAgICBwcml2YXRlIGRyb3BQb2ludCA9IG5ldyBQb2ludCgwLCAwKVxuXG4gICAgY29uc3RydWN0b3IoZ2FtZVZpZXc6IEdhbWVWaWV3KSB7XG4gICAgICAgIHN1cGVyKGdhbWVWaWV3KVxuXG4gICAgICAgIGxldCBmcmVlID0gdGhpcy5sYXlvdXRWaWV3LmZyZWVcbiAgICAgICAgaWYgKGZyZWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gZnJlZSBlbGVtZW50XCIpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSB0aGlzLmxheW91dFZpZXcuZGVzdGluYXRpb25cbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGRlc3RpbmF0aW9uXCIpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9yaWdpbiA9IG5ldyBQb2ludChmcmVlLnBvc2l0aW9uLngsIGZyZWUucG9zaXRpb24ueSlcbiAgICAgICAgdGhpcy5kcm9wUG9pbnQgPSBMYXlvdXRWaWV3LmdldEFic29sdXRlUG9zaXRpb24oZGVzdGluYXRpb24uZylcbiAgICAgICAgdGhpcy5kcm9wUG9pbnQueCArPSBkZXN0aW5hdGlvbi5kcm9wUG9pbnQueFxuICAgICAgICB0aGlzLmRyb3BQb2ludC55ICs9IGRlc3RpbmF0aW9uLmRyb3BQb2ludC55XG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSB0aGlzLm9yaWdpbi5kaXN0YW5jZSh0aGlzLmRyb3BQb2ludClcbiAgICB9XG5cbiAgICBzdGFydCh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQodGltZSlcblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucHJvY2Vzcy5iaW5kKHRoaXMpKVxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzKHRpbWU6IG51bWJlcikge1xuICAgICAgICBsZXQgZWxhcHNlZCA9IHRoaXMuZWxhcHNlZFRpbWUodGltZSlcbiAgICAgICAgbGV0IGZyZWUgPSB0aGlzLmxheW91dFZpZXcuZnJlZVxuICAgICAgICBpZiAoZnJlZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBmcmVlIGVsZW1lbnRcIilcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtb3ZlZCA9IGVsYXBzZWQgKiBDb25zdHMuQW5pbWF0aW9uVmVsb2NpdHkgKiB0aGlzLmxheW91dFZpZXcuY2FyZFNpemUueFxuICAgICAgICBpZiAobW92ZWQgPj0gdGhpcy5kaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5maW5pc2goKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmF0aW8gPSBtb3ZlZCAvIHRoaXMuZGlzdGFuY2VcbiAgICAgICAgZnJlZS5wb3NpdGlvbiA9IG5ldyBQb2ludCh0aGlzLm9yaWdpbi54ICogKDEgLSByYXRpbykgKyB0aGlzLmRyb3BQb2ludC54ICogcmF0aW8sXG4gICAgICAgICAgICB0aGlzLm9yaWdpbi55ICogKDEgLSByYXRpbykgKyB0aGlzLmRyb3BQb2ludC55ICogcmF0aW8pXG4gICAgICAgIGZyZWUuc2V0VHJhbnNmb3JtKGZyZWUucG9zaXRpb24pXG5cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnByb2Nlc3MuYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmlzaCgpIHtcbiAgICAgICAgbGV0IGZyZWUgPSB0aGlzLmxheW91dFZpZXcuZnJlZVxuICAgICAgICB0aGlzLmxheW91dFZpZXcuc2V0RnJlZShudWxsKVxuICAgICAgICB0aGlzLmxheW91dFZpZXcuZGVzdGluYXRpb24uYWRkKGZyZWUpXG4gICAgICAgIGlmICh0aGlzLmxheW91dFZpZXcuZHJhZ2dlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dFZpZXcuZHJhZ2dlZC5jbGVhckRyYWdnZWQoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2FtZVZpZXcuc2V0U3RhdHVzKFN0YXR1c1R5cGUuUmVhZHkpXG4gICAgfVxufVxuXG5leHBvcnQgeyBBbmltYXRpbmdTdGF0dXMgfSIsImltcG9ydCB7IFN0YXR1cyB9IGZyb20gXCIuL1N0YXR1c1wiXG5pbXBvcnQgeyBTdGF0dXNUeXBlIH0gZnJvbSBcIi4vU3RhdHVzVHlwZVwiXG5pbXBvcnQgeyBHYW1lVmlldyB9IGZyb20gXCIuLi9HYW1lVmlld1wiXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLi91dGlsL1BvaW50XCJcbmltcG9ydCB7IFBpbGVWaWV3IH0gZnJvbSBcIi4uL3ZpZXdzL1BpbGVWaWV3XCJcbmltcG9ydCB7IExheW91dFZpZXcgfSBmcm9tIFwiLi4vdmlld3MvTGF5b3V0Vmlld1wiXG5pbXBvcnQgeyBTb3VuZFBsYXllciB9IGZyb20gXCIuLi91dGlsL1NvdW5kUGxheWVyXCI7XG5cbmNsYXNzIERyYWdnaW5nU3RhdHVzIGV4dGVuZHMgU3RhdHVzIHtcbiAgICBwcml2YXRlIG9yaWdpbiA9IG5ldyBQb2ludCgwLCAwKVxuICAgIHByaXZhdGUgdGltZSA9IDBcbiAgICBwcml2YXRlIHJlcXVlc3RJZCA9IDBcblxuICAgIGNvbnN0cnVjdG9yKGdhbWVWaWV3OiBHYW1lVmlldykge1xuICAgICAgICBzdXBlcihnYW1lVmlldylcblxuICAgICAgICBsZXQgZnJlZSA9IHRoaXMubGF5b3V0Vmlldy5mcmVlXG4gICAgICAgIGlmIChmcmVlID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGZyZWUgZWxlbWVudFwiKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcmlnaW4gPSBuZXcgUG9pbnQoZnJlZS5wb3NpdGlvbi54LCBmcmVlLnBvc2l0aW9uLnkpXG4gICAgfVxuXG4gICAgc3RhcnQodGltZTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KHRpbWUpXG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0SWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIHByaXZhdGUgYW5pbWF0ZSh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy50aW1lID0gdGltZVxuICAgICAgICBsZXQgZnJlZSA9IHRoaXMubGF5b3V0Vmlldy5mcmVlXG4gICAgICAgIGZyZWUuc2V0VHJhbnNmb3JtKGZyZWUucG9zaXRpb24pXG4gICAgICAgIHRoaXMucmVxdWVzdElkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICB0b3VjaE1vdmVkKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBmcmVlID0gdGhpcy5sYXlvdXRWaWV3LmZyZWVcbiAgICAgICAgaWYgKGZyZWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gZnJlZSBlbGVtZW50XCIpXG4gICAgICAgIH1cblxuICAgICAgICBmcmVlLnBvc2l0aW9uID0gbmV3IFBvaW50KHRoaXMub3JpZ2luLnggKyB4IC0gdGhpcy5sYXlvdXRWaWV3LnRvdWNoU3RhcnQueCxcbiAgICAgICAgICAgIHRoaXMub3JpZ2luLnkgKyB5IC0gdGhpcy5sYXlvdXRWaWV3LnRvdWNoU3RhcnQueSlcbiAgICB9XG5cbiAgICB0b3VjaFN0YXJ0ZWQoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMucmVxdWVzdElkKVxuICAgICAgICB0aGlzLmNhbmNlbCgpXG4gICAgfVxuXG4gICAgdG91Y2hDYW5jZWxsZWQoKSB7XG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJlcXVlc3RJZClcbiAgICAgICAgdGhpcy5jYW5jZWwoKVxuICAgIH1cblxuICAgIHRvdWNoRW5kZWQoKSB7XG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJlcXVlc3RJZClcbiAgICAgICAgaWYgKHRoaXMuZWxhcHNlZFRpbWUodGhpcy50aW1lKSA8IDIwMCkge1xuICAgICAgICAgICAgdGhpcy5kcm9wKHRydWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRyb3AoZmFsc2UpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbmNlbCgpIHtcbiAgICAgICAgbGV0IGRyYWdnZWQgPSB0aGlzLmxheW91dFZpZXcuZHJhZ2dlZFxuICAgICAgICBpZiAoZHJhZ2dlZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXaGVyZSB3YXMgaXQgZHJhZ2dlZCBmcm9tXCIpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxheW91dFZpZXcuZHJhZ2dlZCA9IG51bGxcbiAgICAgICAgdGhpcy5sYXlvdXRWaWV3LmRlc3RpbmF0aW9uID0gZHJhZ2dlZFxuICAgICAgICB0aGlzLmdhbWVWaWV3LnNldFN0YXR1cyhTdGF0dXNUeXBlLkFuaW1hdGluZylcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyb3AodGFwcGVkOiBCb29sZWFuKSB7XG4gICAgICAgIGxldCBmcmVlID0gdGhpcy5sYXlvdXRWaWV3LmZyZWVcbiAgICAgICAgaWYgKGZyZWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gZnJlZSBlbGVtZW50XCIpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRyYWdnZWQgPSB0aGlzLmxheW91dFZpZXcuZHJhZ2dlZFxuICAgICAgICBpZiAoZHJhZ2dlZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXaGVyZSB3YXMgaXQgZHJhZ2dlZCBmcm9tXCIpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGlsZXMgPSBuZXcgQXJyYXk8UGlsZVZpZXc+KClcbiAgICAgICAgZm9yIChsZXQgcCBvZiB0aGlzLmxheW91dFZpZXcucGlsZXMpIHtcbiAgICAgICAgICAgIHBpbGVzLnB1c2gocClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGFwcGVkKSB7XG4gICAgICAgICAgICBwaWxlcy5zb3J0KChpdDEsIGl0MikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkcDEgPSBMYXlvdXRWaWV3LmdldEFic29sdXRlUG9zaXRpb24oaXQxLmcpXG4gICAgICAgICAgICAgICAgZHAxLnggKz0gaXQxLmRyb3BQb2ludC54XG4gICAgICAgICAgICAgICAgZHAxLnkgKz0gaXQxLmRyb3BQb2ludC55XG5cbiAgICAgICAgICAgICAgICBsZXQgZHAyID0gTGF5b3V0Vmlldy5nZXRBYnNvbHV0ZVBvc2l0aW9uKGl0Mi5nKVxuICAgICAgICAgICAgICAgIGRwMi54ICs9IGl0Mi5kcm9wUG9pbnQueFxuICAgICAgICAgICAgICAgIGRwMi55ICs9IGl0Mi5kcm9wUG9pbnQueVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyZWUucG9zaXRpb24uZGlzdGFuY2UoZHAxKSAtIGZyZWUucG9zaXRpb24uZGlzdGFuY2UoZHAyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHAgb2YgcGlsZXMpIHtcbiAgICAgICAgICAgIGlmIChwICE9IGRyYWdnZWQgJiYgcC5jYW5BZGQoZnJlZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaChwKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYW5jZWwoKVxuICAgIH1cblxuICAgIHByaXZhdGUgZmluaXNoKHBpbGU6IFBpbGVWaWV3KSB7XG4gICAgICAgIFNvdW5kUGxheWVyLmluc3RhbmNlLnBsYXkoJ2xhbmQnKVxuICAgICAgICB0aGlzLmxheW91dFZpZXcuZGVzdGluYXRpb24gPSBwaWxlXG4gICAgICAgIHRoaXMuZ2FtZVZpZXcuc2V0U3RhdHVzKFN0YXR1c1R5cGUuQW5pbWF0aW5nKVxuICAgICAgICAvL1NvdW5kUGxheWVyLmluc3RhbmNlKCkucGxheShTb3VuZElkLmxhbmQpXG4gICAgfVxufVxuXG5leHBvcnQgeyBEcmFnZ2luZ1N0YXR1cyB9IiwiaW1wb3J0IHsgU3RhdHVzIH0gZnJvbSBcIi4vU3RhdHVzXCJcbmltcG9ydCB7IFN0YXR1c1R5cGUgfSBmcm9tIFwiLi9TdGF0dXNUeXBlXCJcbmltcG9ydCB7IEdhbWVWaWV3IH0gZnJvbSBcIi4uL0dhbWVWaWV3XCJcbmltcG9ydCB7IENhcmRWaWV3IH0gZnJvbSBcIi4uL3ZpZXdzL0NhcmRWaWV3XCJcbmltcG9ydCB7IFBpbGVWaWV3IH0gZnJvbSBcIi4uL3ZpZXdzL1BpbGVWaWV3XCJcblxuY2xhc3MgQXV0b3BsYXlTdGF0dXMgZXh0ZW5kcyBTdGF0dXMge1xuICAgIGNvbnN0cnVjdG9yKGdhbWVWaWV3OiBHYW1lVmlldykge1xuICAgICAgICBzdXBlcihnYW1lVmlldylcbiAgICB9XG5cbiAgICBzdGFydCh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQodGltZSlcblxuICAgICAgICBpZih0aGlzLmF1dG9QbGF5VGFibGVhdSgpKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuYXV0b1BsYXlXYXN0ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuYXV0b1BsYXlIYW5kKCkpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nYW1lVmlldy5zZXRTdGF0dXMoU3RhdHVzVHlwZS5HYW1lb3ZlcilcbiAgICB9XG5cbiAgICBwcml2YXRlIGFuaW1hdGUoY2FyZDogQ2FyZFZpZXcsIHBpbGU6IFBpbGVWaWV3KSB7XG4gICAgICAgIHRoaXMubGF5b3V0Vmlldy5zZXRGcmVlKGNhcmQpXG4gICAgICAgIHRoaXMubGF5b3V0Vmlldy5kZXN0aW5hdGlvbiA9IHBpbGVcbiAgICAgICAgdGhpcy5nYW1lVmlldy5zZXRTdGF0dXMoU3RhdHVzVHlwZS5BbmltYXRpbmcpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhdXRvUGxheVRhYmxlYXUoKTogYm9vbGVhbiB7XG4gICAgICAgIGZvcihsZXQgdGFibGVhdSBvZiB0aGlzLmxheW91dFZpZXcudGFibGVhdXMpIHtcbiAgICAgICAgICAgIGxldCBsYXN0ID0gdGFibGVhdS5mYW4uZmFuLmxhc3RcbiAgICAgICAgICAgIGlmKGxhc3QgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcihsZXQgZm91bmRhdGlvbiBvZiB0aGlzLmxheW91dFZpZXcuZm91bmRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZihmb3VuZGF0aW9uLmZvdW5kYXRpb25QaWxlLmNhbkFkZChsYXN0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGUodGFibGVhdS5yZW1vdmVMYXN0KCksIGZvdW5kYXRpb24pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhdXRvUGxheVdhc3RlKCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgbGFzdCA9IHRoaXMubGF5b3V0Vmlldy53YXN0ZS53YXN0ZS5sYXN0XG4gICAgICAgIGlmKGxhc3QgPT0gbnVsbCkge1xuICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgZm91bmRhdGlvbiBvZiB0aGlzLmxheW91dFZpZXcuZm91bmRhdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChmb3VuZGF0aW9uLmZvdW5kYXRpb25QaWxlLmNhbkFkZChsYXN0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLmxheW91dFZpZXcud2FzdGUucmVtb3ZlTGFzdCgpLCBmb3VuZGF0aW9uKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhdXRvUGxheUhhbmQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmxheW91dFZpZXcuaGFuZC5pc0VtcHR5KSB7XG4gICAgICAgICAgICBsZXQgY2FyZHMgPSB0aGlzLmxheW91dFZpZXcud2FzdGUucmVtb3ZlQWxsKClcbiAgICAgICAgICAgIGlmIChjYXJkcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXJkcy5yZXZlcnNlKClcbiAgICAgICAgICAgIGZvciAobGV0IGNhcmQgb2YgY2FyZHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dFZpZXcuaGFuZC5hZGQoY2FyZClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5nYW1lVmlldy5zZXRTdGF0dXMoU3RhdHVzVHlwZS5SZWFkeSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbGFzdCA9IHRoaXMubGF5b3V0Vmlldy5oYW5kLnJlbW92ZUxhc3QoKVxuICAgICAgICAgICAgbGFzdC5vcGVuKClcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZShsYXN0LCB0aGlzLmxheW91dFZpZXcud2FzdGUpXG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCB7IEF1dG9wbGF5U3RhdHVzIH0iLCJpbXBvcnQgeyBTdGF0dXMgfSBmcm9tIFwiLi9TdGF0dXNcIlxuaW1wb3J0IHsgR2FtZVZpZXcgfSBmcm9tIFwiLi4vR2FtZVZpZXdcIlxuXG5jbGFzcyBHYW1lb3ZlclN0YXR1cyBleHRlbmRzIFN0YXR1cyB7XG4gICAgY29uc3RydWN0b3IoZ2FtZVZpZXc6IEdhbWVWaWV3KSB7XG4gICAgICAgIHN1cGVyKGdhbWVWaWV3KVxuICAgIH1cblxuICAgIHN0YXJ0KHRpbWU6IG51bWJlcikge1xuICAgICAgICBzdXBlci5zdGFydCh0aW1lKVxuXG4gICAgICAgIHRoaXMubGF5b3V0Vmlldy5yZW5kZXJHYW1lb3ZlcigpXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5maW5pc2guYmluZCh0aGlzKSwgMzAwMClcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmlzaCgpIHtcbiAgICAgICAgdGhpcy5nYW1lVmlldy5uZXdHYW1lKClcbiAgICB9XG59XG5cbmV4cG9ydCB7IEdhbWVvdmVyU3RhdHVzIH0iLCJpbXBvcnQgeyBTdGF0dXMgfSBmcm9tIFwiLi9TdGF0dXNcIlxuaW1wb3J0IHsgU3RhdHVzVHlwZSB9IGZyb20gXCIuL1N0YXR1c1R5cGVcIlxuaW1wb3J0IHsgUmVhZHlTdGF0dXMgfSBmcm9tIFwiLi9SZWFkeVN0YXR1c1wiXG5pbXBvcnQgeyBEZWFsaW5nU3RhdHVzIH0gZnJvbSBcIi4vRGVhbGluZ1N0YXR1c1wiXG5pbXBvcnQgeyBPcGVuaW5nU3RhdHVzIH0gZnJvbSBcIi4vT3BlbmluZ1N0YXR1c1wiXG5pbXBvcnQgeyBBbmltYXRpbmdTdGF0dXMgfSBmcm9tIFwiLi9BbmltYXRpbmdTdGF0dXNcIlxuaW1wb3J0IHsgRHJhZ2dpbmdTdGF0dXMgfSBmcm9tIFwiLi9EcmFnZ2luZ1N0YXR1c1wiXG5pbXBvcnQgeyBBdXRvcGxheVN0YXR1cyB9IGZyb20gXCIuL0F1dG9wbGF5U3RhdHVzXCJcbmltcG9ydCB7IEdhbWVvdmVyU3RhdHVzIH0gZnJvbSBcIi4vR2FtZW92ZXJTdGF0dXNcIlxuaW1wb3J0IHsgR2FtZVZpZXcgfSBmcm9tIFwiLi4vR2FtZVZpZXdcIlxuXG5jbGFzcyBTdGF0dXNGYWN0b3J5IHtcbiAgICBzdGF0aWMgY3JlYXRlKHR5cGU6IFN0YXR1c1R5cGUsIGdhbWVWaWV3OiBHYW1lVmlldyk6IFN0YXR1cyB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTdGF0dXNUeXBlLlJlYWR5OiByZXR1cm4gbmV3IFJlYWR5U3RhdHVzKGdhbWVWaWV3KVxuICAgICAgICAgICAgY2FzZSBTdGF0dXNUeXBlLkRlYWxpbmc6IHJldHVybiBuZXcgRGVhbGluZ1N0YXR1cyhnYW1lVmlldylcbiAgICAgICAgICAgIGNhc2UgU3RhdHVzVHlwZS5PcGVuaW5nOiByZXR1cm4gbmV3IE9wZW5pbmdTdGF0dXMoZ2FtZVZpZXcpXG4gICAgICAgICAgICBjYXNlIFN0YXR1c1R5cGUuQW5pbWF0aW5nOiByZXR1cm4gbmV3IEFuaW1hdGluZ1N0YXR1cyhnYW1lVmlldylcbiAgICAgICAgICAgIGNhc2UgU3RhdHVzVHlwZS5EcmFnZ2luZzogcmV0dXJuIG5ldyBEcmFnZ2luZ1N0YXR1cyhnYW1lVmlldylcbiAgICAgICAgICAgIGNhc2UgU3RhdHVzVHlwZS5BdXRvcGxheTogcmV0dXJuIG5ldyBBdXRvcGxheVN0YXR1cyhnYW1lVmlldylcbiAgICAgICAgICAgIGNhc2UgU3RhdHVzVHlwZS5HYW1lb3ZlcjogcmV0dXJuIG5ldyBHYW1lb3ZlclN0YXR1cyhnYW1lVmlldylcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHsgU3RhdHVzRmFjdG9yeSB9IiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi91dGlsL1BvaW50XCJcbmltcG9ydCB7IExheW91dFZpZXcgfSBmcm9tIFwiLi92aWV3cy9MYXlvdXRWaWV3XCJcbmltcG9ydCB7IFN0YXR1c1R5cGUgfSBmcm9tIFwiLi9zdGF0dXMvU3RhdHVzVHlwZVwiXG5pbXBvcnQgeyBTdGF0dXMgfSBmcm9tIFwiLi9zdGF0dXMvU3RhdHVzXCJcbmltcG9ydCB7IFN0YXR1c0ZhY3RvcnkgfSBmcm9tIFwiLi9zdGF0dXMvU3RhdHVzRmFjdG9yeVwiXG5pbXBvcnQgeyBIYW5kIH0gZnJvbSBcIi4vbW9kZWxzL0hhbmRcIlxuaW1wb3J0IHsgTGF5b3V0IH0gZnJvbSBcIi4vbW9kZWxzL0xheW91dFwiXG5cbmNsYXNzIEdhbWVWaWV3IHtcbiAgICBsYXlvdXQ6IExheW91dFZpZXc7XG4gICAgcHJpdmF0ZSBzaXplOiBQb2ludDtcbiAgICBwcml2YXRlIGFuaW1hdGlvbkZyYW1lOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzdmc6IFNWR0VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBzdGFydFRpbWU6IG51bWJlciA9IG51bGxcbiAgICBwcml2YXRlIHRpbWU6IG51bWJlciA9IG51bGxcbiAgICBwcml2YXRlIHBvc2l0aW9uOiBQb2ludFxuICAgIHByaXZhdGUgdG91Y2hPdmVybGF5OiBIVE1MRWxlbWVudFxuXG4gICAgc3RhdGljIGdldEFic29sdXRlUG9zaXRpb24oZWxlbTogSFRNTEVsZW1lbnQpOiBQb2ludCB7XG4gICAgICAgIGxldCBwb2ludCA9IG5ldyBQb2ludCgwLCAwKVxuICAgICAgICB3aGlsZShlbGVtICE9IG51bGwpIHtcbiAgICAgICAgICAgIHBvaW50LnggKz0gZWxlbS5vZmZzZXRMZWZ0XG4gICAgICAgICAgICBwb2ludC55ICs9IGVsZW0ub2Zmc2V0VG9wXG4gICAgICAgICAgICBlbGVtID0gPEhUTUxFbGVtZW50PmVsZW0ub2Zmc2V0UGFyZW50XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcG9pbnRcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihzdmc6IFNWR1NWR0VsZW1lbnQsIHR0OiBIVE1MRWxlbWVudCwgc2l6ZTogUG9pbnQpIHtcbiAgICAgICAgdGhpcy5zdmcgPSBzdmdcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZVxuICAgICAgICB0aGlzLnRvdWNoT3ZlcmxheSA9IHR0XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBHYW1lVmlldy5nZXRBYnNvbHV0ZVBvc2l0aW9uKHN2Zy5wYXJlbnRFbGVtZW50KVxuICAgIH1cblxuICAgIHByaXZhdGUgdG91Y2hFdmVudHMgPSB7XG4gICAgICAgICdzdGFydCc6IHRoaXMuaGFuZGxlVG91Y2hTdGFydC5iaW5kKHRoaXMpLFxuICAgICAgICAnbW92ZSc6IHRoaXMuaGFuZGxlVG91Y2hNb3ZlLmJpbmQodGhpcyksXG4gICAgICAgICdlbmQnOiB0aGlzLmhhbmRsZVRvdWNoRW5kLmJpbmQodGhpcyksXG4gICAgICAgICdjYW5jZWwnOiB0aGlzLmhhbmRsZVRvdWNoQ2FuY2VsLmJpbmQodGhpcyksXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMubG9hZCgpXG4gICAgICAgIHRoaXMucmVuZGVyKClcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSB0aW1lXG4gICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhTdGF0dXNUeXBlLkRlYWxpbmcpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgbmV3R2FtZSgpIHtcbiAgICAgICAgdGhpcy5zdGFydCgpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkKCkge1xuICAgICAgICBsZXQgZGVjayA9IG5ldyBIYW5kKClcbiAgICAgICAgZGVjay5zaHVmZmxlKClcblxuICAgICAgICB0aGlzLmxheW91dCA9IG5ldyBMYXlvdXRWaWV3KG5ldyBMYXlvdXQoZGVjaykpXG4gICAgICAgIHRoaXMubGF5b3V0LnNldFNpemUodGhpcy5zaXplKVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyKCkge1xuICAgICAgICB3aGlsZSh0aGlzLnN2Zy5sYXN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuc3ZnLnJlbW92ZUNoaWxkKHRoaXMuc3ZnLmxhc3RDaGlsZClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGF5b3V0LnJlbmRlcigpXG5cbiAgICAgICAgdGhpcy5zdmcuYXBwZW5kQ2hpbGQodGhpcy5sYXlvdXQuZylcbiAgICAgICAgbGV0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTGF5b3V0Vmlldy5TVkdfTkFNRVNQQUNFLCBcImdcIilcbiAgICAgICAgbGV0IHJlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTGF5b3V0Vmlldy5TVkdfTkFNRVNQQUNFLCBcInJlY3RcIilcbiAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRvdWNoLW92ZXJsYXlcIilcbiAgICAgICAgcmVjdC5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCB0aGlzLnNpemUueC50b1N0cmluZygpKVxuICAgICAgICByZWN0LnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCB0aGlzLnNpemUueS50b1N0cmluZygpKVxuICAgICAgICBnLmFwcGVuZENoaWxkKHJlY3QpXG4gICAgICAgIHRoaXMuc3ZnLmFwcGVuZENoaWxkKGcpXG4gICAgICAgIC8vdGhpcy50b3VjaE92ZXJsYXkgPSBkb2N1bWVudFxuICAgICAgICB0aGlzLnNldEV2ZW50cygpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVUb3VjaFN0YXJ0KGU6IFRvdWNoRXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJoYW5kbGVUb3VjaFN0YXJ0XCIpXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIHRoaXMuYWRkVG91Y2hFdmVudHMoKVxuICAgICAgICBpZihlLnRvdWNoZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbGV0IHRvdWNoID0gZS50b3VjaGVzWzBdXG4gICAgICAgIHRoaXMuc3RhdHVzLnRvdWNoU3RhcnRlZCh0b3VjaC5wYWdlWCAtIHRoaXMucG9zaXRpb24ueCwgdG91Y2gucGFnZVkgLSB0aGlzLnBvc2l0aW9uLnkpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVUb3VjaEVuZChlOiBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGFuZGxlVG91Y2hFbmRcIilcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgdGhpcy5yZW1vdmVUb3VjaEV2ZW50cygpXG4gICAgICAgIHRoaXMuc3RhdHVzLnRvdWNoRW5kZWQoKVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlVG91Y2hDYW5jZWwoZTogVG91Y2hFdmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImhhbmRsZVRvdWNoQ2FuY2VsXCIpXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIHRoaXMucmVtb3ZlVG91Y2hFdmVudHMoKVxuICAgICAgICB0aGlzLnN0YXR1cy50b3VjaENhbmNlbGxlZCgpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVUb3VjaE1vdmUoZTogVG91Y2hFdmVudCkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBpZihlLnRvdWNoZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbGV0IHRvdWNoID0gZS50b3VjaGVzWzBdXG4gICAgICAgIHRoaXMuc3RhdHVzLnRvdWNoTW92ZWQodG91Y2gucGFnZVggLSB0aGlzLnBvc2l0aW9uLngsIHRvdWNoLnBhZ2VZIC0gdGhpcy5wb3NpdGlvbi55KVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0RXZlbnRzKCkge1xuICAgICAgICB0aGlzLnRvdWNoT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnRvdWNoRXZlbnRzLnN0YXJ0LCB0cnVlKVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVG91Y2hFdmVudHMoKSB7XG4gICAgICAgIHRoaXMudG91Y2hPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLnRvdWNoRXZlbnRzLmVuZCwgdHJ1ZSlcbiAgICAgICAgdGhpcy50b3VjaE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIHRoaXMudG91Y2hFdmVudHMuY2FuY2VsLCB0cnVlKVxuICAgICAgICB0aGlzLnRvdWNoT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMudG91Y2hFdmVudHMubW92ZSwgdHJ1ZSkgICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlVG91Y2hFdmVudHMoKSB7XG4gICAgICAgIHRoaXMudG91Y2hPdmVybGF5LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLnRvdWNoRXZlbnRzLmVuZCwgdHJ1ZSlcbiAgICAgICAgdGhpcy50b3VjaE92ZXJsYXkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIHRoaXMudG91Y2hFdmVudHMuY2FuY2VsLCB0cnVlKVxuICAgICAgICB0aGlzLnRvdWNoT3ZlcmxheS5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMudG91Y2hFdmVudHMubW92ZSwgdHJ1ZSkgICAgICAgIFxuXG4gICAgfVxuXG4gICAgc3RhdHVzOiBTdGF0dXNcbiAgICBzdGF0dXNUeXBlOiBTdGF0dXNUeXBlXG5cbiAgICBzZXRTdGF0dXModHlwZTogU3RhdHVzVHlwZSkge1xuICAgICAgICB0aGlzLnN0YXR1c1R5cGUgPSB0eXBlXG4gICAgICAgIHRoaXMuc3RhdHVzID0gU3RhdHVzRmFjdG9yeS5jcmVhdGUodHlwZSwgdGhpcylcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy50aW1lID0gdGltZVxuICAgICAgICAgICAgdGhpcy5zdGF0dXMuc3RhcnQodGltZSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBkZWFsKCkge1xuICAgICAgICB0aGlzLnNldFN0YXR1cyhTdGF0dXNUeXBlLkRlYWxpbmcpXG4gICAgfVxufVxuXG5leHBvcnQgeyBHYW1lVmlldyB9IiwiaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL3ZpZXdzL1ZpZXdcIlxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi91dGlsL1BvaW50XCJcbmltcG9ydCB7IEdhbWVWaWV3IH0gZnJvbSBcIi4vR2FtZVZpZXdcIlxuaW1wb3J0IHsgU291bmRQbGF5ZXIgfSBmcm9tIFwiLi91dGlsL1NvdW5kUGxheWVyXCJcblxuZnVuY3Rpb24gY3JlYXRlU3RhcnRCdXR0b24oKTogSFRNTEVsZW1lbnQge1xuICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJTdGFydFwiXG4gICAgcmV0dXJuIGJ1dHRvblxufVxuXG5mdW5jdGlvbiBtYWluKCkge1xuICAgIGNvbnNvbGUubG9nKFwiV29vdFwiKVxuICAgIGxldCBib2R5ID0gZG9jdW1lbnQuYm9keVxuXG4gICAgbGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhWaWV3LlNWR19OQU1FU1BBQ0UsIFwic3ZnXCIpXG4gICAgbGV0IHNpemUgPSBuZXcgUG9pbnQod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbiAgICBzdmcuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgc2l6ZS54LnRvU3RyaW5nKCkpXG4gICAgc3ZnLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBzaXplLnkudG9TdHJpbmcoKSlcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgIGRpdi5zdHlsZS53aWR0aCA9IFwiMTAwJVwiXG4gICAgZGl2LnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiXG5cblxuICAgIGJvZHkuYXBwZW5kQ2hpbGQoc3ZnKVxuICAgIGJvZHkuYXBwZW5kQ2hpbGQoZGl2KVxuXG4gICAgbGV0IGdhbWVWaWV3ID0gbmV3IEdhbWVWaWV3KHN2ZywgZGl2LCBzaXplKVxuICAgIFNvdW5kUGxheWVyLmluc3RhbmNlLmxvYWQoeydzaHVmZmxlJzogXCJjYXJkcy53YXZcIixcbiAgICBcImxhbmRcIjogXCJsYW5kLndhdlwiLFxuICAgICdkcmFnJzogXCJkcmFnLndhdlwifSwgKCkgPT4ge1xuICAgICAgICBsZXQgYnV0dG9uID0gY3JlYXRlU3RhcnRCdXR0b24oKVxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKVxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIFNvdW5kUGxheWVyLmluc3RhbmNlLnBsYXkoJ3NodWZmbGUnKVxuICAgICAgICAgICAgU291bmRQbGF5ZXIuaW5zdGFuY2UucGxheSgnZHJhZycpXG4gICAgICAgICAgICBTb3VuZFBsYXllci5pbnN0YW5jZS5wbGF5KCdsYW5kJylcbiAgICAgICAgICAgIGRpdi5yZW1vdmVDaGlsZChidXR0b24pXG4gICAgICAgICAgICBnYW1lVmlldy5zdGFydCgpXG4gICAgICAgIH0pXG4gICAgfSlcblxuLypcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfSkqL1xuICAgIGZ1bmN0aW9uIGhhbmRsZVRvdWNoU3RhcnQoZXZlbnQ6IFRvdWNoRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zb2xlLmxvZyhcIndpbmRvd1N0YXJ0XCIpXG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGhhbmRsZVRvdWNoRW5kKGV2ZW50OiBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY29uc29sZS5sb2coXCJ3aW5kb3dFbmRcIilcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gaGFuZGxlVG91Y2hDYW5jZWwoZXZlbnQ6IFRvdWNoRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zb2xlLmxvZyhcIndpbmRvd0NhbmNlbFwiKVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBoYW5kbGVUb3VjaE1vdmUoZXZlbnQ6IFRvdWNoRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zb2xlLmxvZyhcIndpbmRvd01vdmVcIilcbiAgICB9XG4gICAgXG4gICAgLypcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVUb3VjaFN0YXJ0LCB0cnVlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVUb3VjaEVuZCwgdHJ1ZSlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgaGFuZGxlVG91Y2hDYW5jZWwsIHRydWUpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGVUb3VjaE1vdmUsIHRydWUpXG4gICAgKi9cbn1cblxuZXhwb3J0IHsgbWFpbiB9XG5cbi8qXG5sZXQgY2lyY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFZpZXcuU1ZHX05BTUVTUEFDRSwgXCJjaXJjbGVcIilcbmNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJjeFwiLCBcIjEwXCIpXG5jaXJjbGUuc2V0QXR0cmlidXRlKFwiY3lcIiwgXCIxMFwiKVxuY2lyY2xlLnNldEF0dHJpYnV0ZShcInJcIiwgXCI4XCIpXG5jaXJjbGUuc2V0QXR0cmlidXRlKFwiZmlsbFwiLCBcInJlZFwiKVxuY2lyY2xlLnNldEF0dHJpYnV0ZShcInN0cm9rZVwiLCBcImJsdWVcIilcbmNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJzdHJva2Utd2lkdGhcIiwgXCIyXCIpXG4vL2NpcmNsZS5zdHlsZS5zdHJvXG5zdmcuYXBwZW5kQ2hpbGQoY2lyY2xlKVxuXG5mdW5jdGlvbiBoYW5kbGVUb3VjaFN0YXJ0KGV2ZW50OiBUb3VjaEV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBjaXJjbGUuc2V0QXR0cmlidXRlKFwiZmlsbFwiLCBcImdyZWVuXCIpXG59XG5cbmZ1bmN0aW9uIGhhbmRsZVRvdWNoRW5kKGV2ZW50OiBUb3VjaEV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBjaXJjbGUuc2V0QXR0cmlidXRlKFwiZmlsbFwiLCBcInJlZFwiKSAgICBcbn1cblxuZnVuY3Rpb24gaGFuZGxlVG91Y2hDYW5jZWwoZXZlbnQ6IFRvdWNoRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIFwieWVsbG93XCIpXG59XG5cbmZ1bmN0aW9uIGhhbmRsZVRvdWNoTW92ZShldmVudDogVG91Y2hFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgaWYoZXZlbnQudG91Y2hlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF1cbiAgICBjaXJjbGUuc3R5bGUudHJhbnNmb3JtID0gYG1hdHJpeDNkKFxuICAgICAgICAxLCAwLCAwLCAwLFxuICAgICAgICAwLCAxLCAwLCAwLFxuICAgICAgICAwLCAwLCAxLCAwLFxuICAgICAgICAke3RvdWNoLmNsaWVudFggKyAyMH0sICR7dG91Y2guY2xpZW50WSArIDIwfSwgMCwgMSlgXG4gICAgLy9jaXJjbGUuc2V0QXR0cmlidXRlKFwiY3hcIiwgYCR7dG91Y2guY2xpZW50WCArIDIwfWApXG4gICAgLy9jaXJjbGUuc2V0QXR0cmlidXRlKFwiY3lcIiwgYCR7dG91Y2guY2xpZW50WSArIDIwfWApXG59XG5cbmNpcmNsZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVUb3VjaFN0YXJ0LCB0cnVlKVxuY2lyY2xlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVUb3VjaEVuZCwgdHJ1ZSlcbmNpcmNsZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgaGFuZGxlVG91Y2hDYW5jZWwsIHRydWUpXG5jaXJjbGUuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGVUb3VjaE1vdmUsIHRydWUpXG4qLyJdfQ==