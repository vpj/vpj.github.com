(function() {
  var CR, LF, parse;

  CR = '\r'.charCodeAt(0);

  LF = '\n'.charCodeAt(0);

  parse = function(options) {
    var EOF, EOL, I, N, QUOTE, SEPARATOR, columns, eol, n, rows, t, t2, text, token;
    SEPARATOR = options.separator.charCodeAt(0);
    QUOTE = options.quote;
    if (QUOTE == null) {
      QUOTE = '\"'.charCodeAt(0);
    }
    text = options.text;
    EOL = '\n';
    EOF = -1;
    columns = [];
    N = text.length;
    I = 0;
    eol = false;
    rows = 0;
    token = function() {
      var c, i, j, k;
      if (I >= N) {
        return EOF;
      }
      if (eol) {
        eol = false;
        return EOL;
      }
      j = I;
      if ((text.charCodeAt(j)) === QUOTE) {
        i = j;
        while (i++ < N) {
          if ((text.charCodeAt(i)) === QUOTE) {
            if ((text.charCodeAt(i + 1)) !== QUOTE) {
              break;
            }
            ++i;
          }
        }
        I = i + 2;
        c = text.charCodeAt(i + 1);
        if (c === CR) {
          eol = true;
          if ((text.charCodeAt(i + 2)) === LF) {
            ++I;
          }
        } else if (c === LF) {
          eol = true;
        }
        return text.slice(j + 1, i).replace(/""/g, "\"");
      }
      while (I < N) {
        c = text.charCodeAt(I++);
        k = 1;
        if (c === LF) {
          eol = true;
        } else if (c === CR) {
          eol = true;
          if ((text.charCodeAt(I)) === LF) {
            ++I;
            ++k;
          }
        } else if (c !== SEPARATOR) {
          continue;
        }
        return text.slice(j, I - k);
      }
      return text.slice(j);
    };
    while ((t = token()) !== EOF) {
      n = 0;
      t2 = token();
      if (t === '' && (t2 === EOL || t2 === EOF)) {
        continue;
      }
      while (t !== EOL && t !== EOF) {
        if (columns.length === n) {
          columns.push(new Array(rows));
        }
        columns[n].push(t);
        n++;
        if (t2 != null) {
          t = t2;
          t2 = null;
        } else {
          t = token();
        }
      }
      while (n < columns.length) {
        columns[n].push(void 0);
        n++;
      }
      rows++;
    }
    return columns;
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = parse;
  }

  if ((typeof window !== "undefined" && window !== null) || (typeof self !== "undefined" && self !== null)) {
    this.dsv = parse;
  }

}).call(this);
