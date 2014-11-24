(function() {
  Mod.require(function() {
    var text;
    text = '#Markdown like syntax for Edward Tufte style documents\n\n >>>\n  ###**<<http://vpj.github.io/docscript/(Try online editor)>>\n\n We started working on a documentation engine to create documents such\n as --printed user manuals--, --getting started guides--, --online help--,\n --training handouts-- and --internal documents-- at\n **<<http://www.forestpin.com(Foresptin)>>**.\n\n >>>\n  !https://d13yacurqjgara.cloudfront.net/users/161539/screenshots/1789209/logo.png\n\n  --Forestpin Logo\n\n Initially we were working with editors such as Microsoft Word. It was alright\n when we had a couple of documents but it wasn\'t easy to maintain formats and\n manage them as larger documents came in. Then we started looking at\n alternatives like <<http://en.wikipedia.org/wiki/LaTeX(LaTeX)>>\n and <<http://en.wikipedia.org/wiki/Markdown(Markdown)>>.\n\n Both these options would make managing the documentations much easier. The\n documents could be version controlled with **git**, which lets us do a number\n things: version control, branching, collaboration, etc. Although LeTeX gives\n a lot of flexibility,  it was a little too complicated,\n especially for non-technical writers.\n\n Markdown on the other hand was much simpler but didn\'t support some of the key\n features we wanted. Markdown doesn\'t work well when printing. It breaks pages\n random places. The other problem was that Markdown didn\'t support\n sidenotes.\n\n <<http://rmarkdown.rstudio.com/(R Markdown)>> suported formatting inspired by\n Tufte. This was the best already available option for us. We honestly didn\'t\n have very good reasons not to use it and develop our own.\n\n >>>\n  <<http://rmarkdown.rstudio.com/tufte_handout_format.html(RStudio Markdown)>>\n  does seem to have tufte style for Markdown.\n\n  --<<http://sachsmc.github.io/tufterhandout/(Sample)>> -\n  <<https://raw.githubusercontent.com/sachsmc/tufterhandout/master/vignettes/example.Rmd(Source)>>\n\n\n However there were a few advantages of developing our own tool:\n\n  * Give us total control\n\n   We would be able to modify the tool to perfectly fit our needs\n\n  * Mardown doesn\'t have a structure\n\n   For instance, in the following document,\n\n   ```\n    #Heading1\n    Intro\n    #Heading2\n    Paragraph\n    #Heading3\n    Paragraph\n    Conclusion\n\n   it is not clear whether ``Conclusion`` belongs to ``Heading1`` or\n   ``Heading3``. This again gives some trouble when paginating.\n\n  * R Markdown seemed to be use verbose syntaxes for some of the commonly\n   needed functions\n\n ###DocScript Project\n\n  Docscript is available on <<https://github.com/vpj/docscript(Github)>>. It\n  is not fully baked yet but you can give it a try.\n\n  >>>\n   #####**<<https://github.com/vpj/docscript(Fork me on github)>>\n\n\n  Here are some of the sample documents we\'ve created:\n\n   * <<http://vpj.github.io/docscript/benford.html(Benford\'s Law Test)>>\n   * <<http://vpj.github.io/docscript/dashboard.html(Forestpin Dashboard)>>\n   * <<http://vpj.github.io/docscript/correlation.html(Correlation Test)>>\n\n ###Usage\n\n  The online compiler is available at <<http://vpj.github.io/docscript/>>.\n\n  The command line interface requires ``nodejs`` and ``coffeescript``. You need\n  to get the git submodules with ``git submodule init`` and\n  ``git submodule update`` after cloning docscript.\n\n  >>>\n   A few npm packeges such as ``optimist`` are required.\n\n\n  ```\n   ./docscript.coffee -i input_file -o output_file\n\n  This will create the output html file inside ``build`` directory. The CLI is\n  still in early stages.\n\n ##Design\n\n  Docscript uses indentation to specify hierarchy of content.\n\n  +++\n   ####Example\n\n    ```\n     ###Heading1\n\n      Introduction\n\n      * Point one\n\n       Description about point one\n\n      ####Subtopic\n\n       Subtopic content\n\n       More subtopic content\n\n      This belongs to Heading1\n\n    >>>\n     ###Heading1\n\n      Introduction\n\n      * Point one\n\n       Description about point one\n\n      ####Subtopic\n\n       Subtopic content\n\n       More subtopic content\n\n      This belongs to Heading1\n\n  Althought indentation doesn\'t help much in standard rendering except in a\n  a few cases (e.g. lists) it\'s has a number of of other uses. It lets us\n  programmetically set page breaks when printing (not implemented yet).\n  Other advantage is we can use **code folding** when editing; which come handy\n  when working with large documents.\n\n  Another key feature of docscript is sidenotes. You can have notes as well\n  as images in sidenotes.\n\n  >>>\n   <<<\n    <a href="https://twitter.com/share" class="twitter-share-button" data-via="vpj" data-size="large">Tweet</a>\n    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?\'http\':\'https\';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\'://platform.twitter.com/widgets.js\';fjs.parentNode.insertBefore(js,fjs);}}(document, \'script\', \'twitter-wjs\');</script>\n\n   --Tweet this button in a sidenote^^1^^\n\n  We\'ve changed some syntaxes of Markdown; for instance, ``<<`` and ``>>`` are\n  used for links instead of ``[]()``, because we felt it was a little more\n  intuitive (resemblence with HTML tags).\n\n  Docscript introduces HTML blocks marked by ``<<<``, where you can add\n  any HTML content.\n\n  >>>\n   ^^1^^That\'s how we added the tweet button.\n\n ##Reference\n\n  ###Headings\n\n   Headings have the same syntax as Markdown. ``#`` for level 1 headings ``##`` for\n   level 2 headings and so on. The content that belongs to the heading should\n   indented.\n\n   ```\n    #Heading\n\n     Indented content\n\n  ###Paragraphs\n\n   Again similar to Markdown. Paragraphs are separated by blank lines.\n\n   ```\n    Paragraph1\n    More of paragraph1\n\n    Paragraph2\n\n  ###List\n\n   Ordered lists begin with ``- `` while unordered lists begin with ``* ``.\n   Since lists can be structured with indentations, it\'s easy to have lists\n   within lists.\n\n   ```\n    - Introduction\n    - Analyses\n\n     - Daily analysis\n     - Benford\'s law\n     - Timeseries analysis\n    - Visualizations\n\n     * Treemap\n     * Bar charts\n     * Dashboard\n\n   >>>\n    - Introduction\n    - Analyses\n\n     - Daily analysis\n     - Benford\'s law\n     - Timeseries analysis\n    - Visualizations\n\n     * Treemap\n     * Bar charts\n     * Dashboard\n\n  ###Media\n\n   Images can be added with ``!``.\n\n   ```\n    !https://d13yacurqjgara.cloudfront.net/users/161539/screenshots/1789209/logo.png\n\n   >>>\n    !https://d13yacurqjgara.cloudfront.net/users/161539/screenshots/1789209/logo.png\n\n  ###Special Blocks\n\n   This is similar to block quotes in Markdown. Special blocks are specified\n   by ``+++``. The content is identified using indentation.\n\n   ```\n    +++\n     **This is a special segment.\n\n     Can have all the other things like images.\n\n     !https://d13yacurqjgara.cloudfront.net/users/161539/screenshots/1814286/d1.png\n\n   +++\n    **This is a special segment.\n\n    Can have all the other things like images.\n\n    !https://d13yacurqjgara.cloudfront.net/users/161539/screenshots/1814286/d1.png\n\n  ###Code Blocks\n\n   Code blocks are identified by three backtick quotes (`).\n\n  ###Html Blocks\n\n   Html blocks are identified by ``<<<``.\n\n   ```\n    <<<\n     <blockquote class="twitter-tweet" lang="en"><p>Docscript <a href="http://t.co/iaPELYc7RL">http://t.co/iaPELYc7RL</a> Alternative to <a href="https://twitter.com/hashtag/markdown?src=hash">#markdown</a> written in <a href="https://twitter.com/hashtag/coffeescript?src=hash">#coffeescript</a></p>&mdash; Varuna Jayasiri (@vpj) <a href="https://twitter.com/vpj/status/532035802578944003">November 11, 2014</a></blockquote>\n     <script async src="http://platform.twitter.com/widgets.js" charset="utf-8"></script>\n\n   Here\'s a tweet embedded with an HTML block.\n\n   <<<\n    <blockquote class="twitter-tweet" lang="en"><p>Docscript <a href="http://t.co/iaPELYc7RL">http://t.co/iaPELYc7RL</a> Alternative to <a href="https://twitter.com/hashtag/markdown?src=hash">#markdown</a> written in <a href="https://twitter.com/hashtag/coffeescript?src=hash">#coffeescript</a></p>&mdash; Varuna Jayasiri (@vpj) <a href="https://twitter.com/vpj/status/532035802578944003">November 11, 2014</a></blockquote>\n    <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>\n\n   >>>\n    This won\'t work in online editor since the twitter script will not load\n\n  ###Bold\n\n   Text can be made bold with ``**``.\n\n   ```\n    **This is bold** and this is not.\n\n    **This entire paragraph is bold.\n    Still the same paragraph.\n\n   >>>\n    **This is bold** and this is not.\n\n    **This entire paragraph is bold.\n    Still the same paragraph.\n\n  ###Italics\n\n   Text can be made italics with ``--``.\n\n   ```\n    --This is italics-- and this is not\n\n    --This entire paragraph is in italics.\n    Still the same paragraph\n\n   >>>\n    --This is italics-- and this is not\n\n    --This entire paragraph is in italics.\n    Still the same paragraph\n\n  ###Superscript and Subscript\n\n   Superscript are wrapped inside ``^^ ^^`` and Subscripts are wrapped inside\n   ``__ __``.\n\n\n   ```\n    * 2^^2^^ = 4\n    * CO__2__\n\n   >>>\n    * 2^^2^^ = 4\n    * CO__2__\n\n  ###Inline code\n\n   Inline code is identified by two backticks (`).\n\n   ```\n    Click ``apply`` to save changes.\n\n   >>>\n    Click ``apply`` to save changes.\n\n  ###Links\n\n   Links are wrapped inside ``<< >>``. The link text can be specified within\n   brackets.\n\n   ```\n    * <<http://www.twitter.com/vpj(My Twitter Account)>>\n    * <<http://www.forestpin.com>>\n\n   >>>\n    * <<http://www.twitter.com/vpj(My Twitter Account)>>\n    * <<http://www.forestpin.com>>\n\n\n ###**Future Plans\n\n  We need to add **inline images** to include small illustrations within text.\n  I plan on supporting comments as well. So that we can include notes that won\'t\n  got to the rendered document.\n\n  A lot of work needs to be done on the CLI to render multiple files and\n  to compose large document based on a number of files. I am thinking of using\n  this for my blog.\n';
    return Mod.set('Docscript.Sample', text);
  });

}).call(this);
