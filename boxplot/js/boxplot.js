(function(){var t,n,r,e,i,u,s,o,a,c,f,h,l,x,d,y,g,m;r=400;n=200;t=8;f=50;h=function(t){return.5-.5*Math.cos(Math.PI*t)};y=function(t){var n,r,e,i,u,s;n=t.length;e=[];for(r=u=0,s=t.length;0<=s?u<s:u>s;r=0<=s?++u:--u){i=parseInt(Math.random()*n);e.push(t[i]);t[i]=t[n-1];--n}return e};a=function(t,n,r,e){var i,u,s,o,a;u=(r-n)/(e+1);s=n+u;a=[];for(i=o=0;0<=e?o<e:o>e;i=0<=e?++o:--o){t.push(s);a.push(s+=u)}return a};l=function(){return.4+.2*Math.random()};g=function(t){var n,r,e,i,u,s,o,a,c,f,x,d,g,m;n=4*t+3;e=1/n;i=e/2;a=[];o=[];while(i<1){a.push(h(i));o.push(i);i+=e}r=[];for(i=f=0;f<5;i=++f){s=[];for(x=0,g=a.length;x<g;x++){c=a[x];switch(i){case 0:if(c<a[t]){c=a[0]}break;case 1:if(a[0]<c&&c<a[2*t+1]){c=a[t]}break;case 2:if(a[t]<c&&c<a[3*t+2]){c=a[2*t+1]}break;case 3:if(a[2*t+1]<c&&c<a[4*t+2]){c=a[3*t+2]}break;case 4:if(a[3*t+2]<c){c=a[4*t+2]}}s.push(c)}s=y(s);for(u=d=0,m=s.length;d<m;u=++d){c=s[u];r.push({x:l()+i,y:c})}}return r};x=function(t,n){var r,e,i,u,s,a,c,f,x,d,g,m,p,k;if(n==null){n=0}r=4*t+3;i=1/r;u=i/2;f=[];c=[];while(u<1){f.push(h(u));c.push(u);u+=i}a=o(f);f=[];f.push(a.min);f.push(a.max);f.push(a.q2);for(u=d=0,k=2*t;0<=k?d<k:d>k;u=0<=k?++d:--d){f.push(a.q1);f.push(a.q3)}e=[];for(u=g=0;g<1;u=++g){f=y(f);for(s=m=0,p=f.length;m<p;s=++m){x=f[s];e.push({x:l()+n,y:x})}}return e};c=function(t,n){var r,e,i,u,s,o,c,f,x,d,y,g,m;if(n==null){n=0}e=[];r=4*t+3;i=1/r;u=i/2;x=[];while(u<1){x.push(h(u));u+=i}c=1;for(o=y=0;y<1;o=++y){f=[];f.push(x[0]);a(f,x[0],x[t],c-1);f.push(x[t]);a(f,x[t],x[2*t+1],c);f.push(x[2*t+1]);a(f,x[2*t+1],x[3*t+2],c);f.push(x[3*t+2]);a(f,x[3*t+2],x[4*t+2],c-1);f.push(x[4*t+2]);for(s=g=0,m=f.length;g<m;s=++g){d=f[s];e.push({x:l()+n,y:d})}}return e};m=function(t,n){var r,e,i,u;if(n==null){n=0}r=4*t+3;i=1/r;u=i/2;e=[];while(u<1){e.push({x:l()+n,y:h(u)});u+=i}return e};s=function(t){var n,r;n=t.length;r=parseInt(n/2);if(n%2===0){return(t[r]+t[r-1])/2}else{return t[r]}};o=function(t){var n,r,e;n=t.length;if(n<2){return null}e={min:t[0],q1:0,q2:0,q3:0,max:t[n-1]};e.q2=s(t);r=parseInt(n/2);if(n%2===0){e.q1=s(t.slice(0,r));e.q3=s(t.slice(r,n))}else{e.q1=s(t.slice(0,r));e.q3=s(t.slice(r+1,n))}return e};i=function(e,i){var u,s,a,c,h,l,x,d,y,g,m,p,k,q,v,b,F,w,A;c=[];for(s=q=0;0<=t?q<t:q>t;s=0<=t?++q:--q){c.push([])}for(v=0,w=i.length;v<w;v++){m=i[v];c[parseInt(m.x)].push(m.y)}x=[];for(s=b=0,A=c.length;b<A;s=++b){a=c[s];a.sort(function(t,n){return t-n});h=o(a);h.x=s;x.push(h)}d=r/t;u=10;p=d3.scale.linear().range([n,0]).domain([0,1]);y=d3.scale.linear().range([0,r]).domain([0,t]);l=[];for(s=F=0;F<8;s=++F){l.push(.5+s)}k=d3.svg.axis().scale(p).ticks(3).orient("left");g=d3.svg.axis().scale(y).tickValues(l).tickFormat(function(t){return String.fromCharCode("A".charCodeAt(0)+t)}).orient("bottom");return FP(d3,function(){return this.select("#"+e,function(){return this.svg({width:r+2*f,height:n+2*f},function(){this.g({transform:"translate("+f+", "+f+")"},function(){this.selectAll("g.bar",function(){return this.data(x,function(){return this.enter(function(){return this.g(".bar",{transform:function(t){return"translate("+t.x*d+", 0)"}},function(){this.rect({fill:"#fefefe",stroke:"#777",x:u,width:d-u*2,y:function(t){return p(t.q3)},height:function(t){return p(t.q1)-p(t.q3)}});this.line({stroke:"#000",x1:u,x2:d-u,y1:function(t){return p(t.q2)},y2:function(t){return p(t.q2)}});this.line({stroke:"#777",x1:u,x2:d-u,y1:function(t){return p(t.min)},y2:function(t){return p(t.min)}});this.line({stroke:"#777",x1:u,x2:d-u,y1:function(t){return p(t.max)},y2:function(t){return p(t.max)}});this.line({stroke:"#777","stroke-dasharray":"3,3",x1:d/2,x2:d/2,y1:function(t){return p(t.q3)},y2:function(t){return p(t.max)}});return this.line({stroke:"#777","stroke-dasharray":"3,3",x1:d/2,x2:d/2,y1:function(t){return p(t.min)},y2:function(t){return p(t.q1)}})})})})});return this.g(".labels",{transform:"translate("+(t*d-u/2)+", 0)"},function(){this.text({x:0,dy:"0.32em",y:p(x[0].min)},function(){return this.textValue(x[0].min.toFixed(2))});this.text({x:0,dy:"0.32em",y:p(x[0].q1)},function(){return this.textValue(x[0].q1.toFixed(2))});this.text({x:0,dy:"0.32em",y:p(x[0].q2)},function(){return this.textValue(x[0].q2.toFixed(2))});this.text({x:0,dy:"0.32em",y:p(x[0].q3)},function(){return this.textValue(x[0].q3.toFixed(2))});return this.text({x:0,dy:"0.32em",y:p(x[0].max)},function(){return this.textValue(x[0].max.toFixed(2))})})});this.g(".axis-y.axis",{transform:"translate("+(f-10)+", "+f+")"},function(){return this.call(k)});return this.g(".axis-x.axis",{transform:"translate("+f+", "+(f+n+10)+")"},function(){return this.call(g)})})})})};d=function(e,i){var u,s,o,a,c,h,l;c=d3.scale.linear().range([n,0]).domain([0,1]);o=d3.scale.linear().range([0,r]).domain([0,t]);s=[];for(u=l=0;l<8;u=++l){s.push(.5+u)}h=d3.svg.axis().scale(c).ticks(3).orient("left");a=d3.svg.axis().scale(o).tickValues(s).tickFormat(function(t){return String.fromCharCode("A".charCodeAt(0)+t)}).orient("bottom");return FP(d3,function(){return this.select("#"+e,function(){return this.svg({width:r+2*f,height:n+2*f},function(){this.g({transform:"translate("+f+", "+f+")"},function(){return this.selectAll("circle",function(){return this.data(i,function(){return this.enter(function(){return this.circle({fill:"rgba(0, 0, 0, 0)",stroke:"#555",cx:function(t){return o(t.x)},cy:function(t){return c(t.y)},r:2})})})})});this.g(".axis-y.axis",{transform:"translate("+(f-10)+", "+f+")"},function(){return this.call(h)});return this.g(".axis-x.axis",{transform:"translate("+f+", "+(f+n+10)+")"},function(){return this.call(a)})})})})};e=function(e,i){var u,s,a,c,h,l,x,d,y,g,m,p,k,q,v,b,F,w,A,C,V;l=[];for(a=b=0;0<=t?b<t:b>t;a=0<=t?++b:--b){l.push([])}for(F=0,C=i.length;F<C;F++){k=i[F];l[parseInt(k.x)].push(k.y)}y=[];for(a=w=0,V=l.length;w<V;a=++w){c=l[a];c.sort(function(t,n){return t-n});x=o(c);x.x=a;y.push(x)}g=r/t;u=10;q=d3.scale.linear().range([n,0]).domain([0,1]);m=d3.scale.linear().range([0,r]).domain([0,t]);d=[];for(a=A=0;A<8;a=++A){d.push(.5+a)}v=d3.svg.axis().scale(q).ticks(3).orient("left");p=d3.svg.axis().scale(m).tickValues(d).tickFormat(function(t){return String.fromCharCode("A".charCodeAt(0)+t)}).orient("bottom");s=null;h=null;FP(d3,function(){return this.select("#"+e,function(){return this.svg({width:r+2*f,height:n+2*f},function(){h=this.g({transform:"translate("+f+", "+f+")"},function(){return this.selectAll("circle",function(){return s=this.data(i,function(){return this.enter(function(){return this.circle({fill:"rgba(0, 0, 0, 0)",stroke:"#555",cx:function(t){return m(t.x)},cy:function(t){return q(t.y)},r:2})})})})});this.g(".axis-y.axis",{transform:"translate("+(f-10)+", "+f+")"},function(){return this.call(v)});return this.g(".axis-x.axis",{transform:"translate("+f+", "+(f+n+10)+")"},function(){return this.call(p)})})})});FP(s,function(){return this.transition({delay:3e3,duration:1e3,style:{opacity:0}})});return FP(h,function(){return this.selectAll("g.bar",function(){return this.data(y,function(){return this.enter(function(){return this.g(".bar",{transform:function(t){return"translate("+t.x*g+", 0)"},style:{opacity:0}},function(){this.transition({delay:1e3,duration:1e3,style:{opacity:1}});this.rect({fill:"rgba(0, 0, 0, 0)",stroke:"rgba(0, 0, 0, 0)",x:u,width:g-u*2,y:function(t){return q(t.q3)},height:function(t){return q(t.q1)-q(t.q3)}},function(){return this.transition({delay:5e3,duration:1e3,stroke:"#777"})});this.line({stroke:"#c00",x1:u,x2:g-u,y1:function(t){return q(t.q2)},y2:function(t){return q(t.q2)}},function(){return this.transition({delay:5e3,duration:1e3,stroke:"#000"})});this.line({stroke:"#c00",x1:u,x2:g-u,y1:function(t){return q(t.q1)},y2:function(t){return q(t.q1)}},function(){return this.transition({delay:5e3,duration:1e3,stroke:"#777"})});this.line({stroke:"#c00",x1:u,x2:g-u,y1:function(t){return q(t.q3)},y2:function(t){return q(t.q3)}},function(){return this.transition({delay:5e3,duration:1e3,stroke:"#777"})});this.line({stroke:"#c00",x1:u,x2:g-u,y1:function(t){return q(t.min)},y2:function(t){return q(t.min)}},function(){return this.transition({delay:5e3,duration:1e3,stroke:"#777"})});this.line({stroke:"#c00",x1:u,x2:g-u,y1:function(t){return q(t.max)},y2:function(t){return q(t.max)}},function(){return this.transition({delay:5e3,duration:1e3,stroke:"#777"})});this.line({stroke:"rgba(0, 0, 0, 0)","stroke-dasharray":"3,3",x1:g/2,x2:g/2,y1:function(t){return q(t.q3)},y2:function(t){return q(t.max)}},function(){return this.transition({delay:5e3,duration:1e3,stroke:"#777"})});return this.line({stroke:"rgba(0, 0, 0, 0)","stroke-dasharray":"3,3",x1:g/2,x2:g/2,y1:function(t){return q(t.min)},y2:function(t){return q(t.q1)}},function(){return this.transition({delay:5e3,duration:1e3,stroke:"#777"})})})})})})})};u=function(t){var n,r,i,u,s;e("scatter-plot",t);r="x,y\n";s=[];for(i=0,u=t.length;i<u;i++){n=t[i];s.push(r+=""+n.x.toFixed(3)+","+n.y.toFixed(3)+"\n")}return s};$(function(){var t,n,r,e,i,s,o,a,f,h,l;n=g(5);e=x(5,5);for(s=0,f=e.length;s<f;s++){t=e[s];n.push(t)}i=m(5,6);for(o=0,h=i.length;o<h;o++){t=i[o];n.push(t)}r=c(5,7);for(a=0,l=r.length;a<l;a++){t=r[a];n.push(t)}return u(n)})}).call(this);