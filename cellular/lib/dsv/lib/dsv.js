(function() {
  var BUFFER, CR, EOF, EOL, LF, TEXT_DECODER, parse, parseBuffer, parseString;

  CR = '\r'.charCodeAt(0);

  LF = '\n'.charCodeAt(0);

  EOL = '\n';

  EOF = -1;

  if (this.TextDecoder != null) {
    TEXT_DECODER = new this.TextDecoder('utf8');
  } else {
    TEXT_DECODER = null;
  }

  if (typeof Buffer !== "undefined" && Buffer !== null) {
    BUFFER = Buffer;
  } else {
    BUFFER = null;
  }

  parseString = function(options) {
    var I, N, QUOTE, SEPARATOR, columns, eol, n, rows, t, t2, text, token;
    SEPARATOR = options.separator.charCodeAt(0);
    if (options.quote != null) {
      QUOTE = options.quote.charCodeAt(0);
    } else {
      QUOTE = '\"'.charCodeAt(0);
    }
    text = options.text;
    N = text.length;
    I = 0;
    eol = false;
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
        } else if (i + 1 < N && c !== SEPARATOR) {
          throw new Error((text.slice(j, i + 10)) + " DSV Quote error");
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
    rows = 0;
    columns = [];
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

  parseBuffer = function(options) {
    var I, N, QUOTE, SEPARATOR, _slice, buffer, columns, eol, n, replaceQuote, rows, t, t2, token;
    SEPARATOR = options.separator.charCodeAt(0);
    if (options.quote != null) {
      QUOTE = options.quote.charCodeAt(0);
    } else {
      QUOTE = '\"'.charCodeAt(0);
    }
    buffer = options.buffer;
    N = options.length;
    I = 0;
    eol = false;
    if (BUFFER != null) {
      _slice = function(buf, from, to) {
        if (from >= to) {
          return new Buffer(0);
        }
        return buf.slice(from, to);
      };
    } else {
      _slice = function(buf, from, to) {
        if (from >= to) {
          return new Uint8Array(0);
        }
        return new Uint8Array(buf, from, to - from);
      };
    }
    replaceQuote = function(buf) {
      var i, j;
      i = 0;
      j = 0;
      while (i < buf.length) {
        if (buf[i] === QUOTE) {
          if (i + 1 < buf.length && buf[i + 1] === QUOTE) {
            ++i;
          }
        }
        buf[j] = buf[i];
        ++i;
        ++j;
      }
      return _slice(buf, 0, j);
    };
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
      if (buffer[j] === QUOTE) {
        i = j;
        while (i++ < N) {
          if (buffer[i] === QUOTE) {
            if (buffer[i + 1] !== QUOTE) {
              break;
            }
            ++i;
          }
        }
        I = i + 2;
        c = buffer[i + 1];
        if (c === CR) {
          eol = true;
          if (buffer[i + 2] === LF) {
            ++I;
          }
        } else if (c === LF) {
          eol = true;
        } else if (i + 1 < N && c !== SEPARATOR) {
          throw new Error((_slice(buffer, j, i + 10)) + " DSV Quote error");
        }
        return replaceQuote(_slice(buffer, j + 1, i));
      }
      while (I < N) {
        c = buffer[I++];
        k = 1;
        if (c === LF) {
          eol = true;
        } else if (c === CR) {
          eol = true;
          if (buffer[I] === LF) {
            ++I;
            ++k;
          }
        } else if (c !== SEPARATOR) {
          continue;
        }
        return _slice(buffer, j, I - k);
      }
      return _slice(buffer, j, N);
    };
    rows = 0;
    columns = [];
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

  parse = function(options) {
    if (options.text != null) {
      return parseString(options);
    } else {
      return parseBuffer(options);
    }
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = parse;
  }

  if ((typeof window !== "undefined" && window !== null) || (typeof self !== "undefined" && self !== null)) {
    this.dsv = parse;
  }

}).call(this);
