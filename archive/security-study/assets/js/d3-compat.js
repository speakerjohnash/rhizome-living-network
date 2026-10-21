/* Offline D3 compatibility bridge.
   The locally bundled D3 core is v3.5.6; authored visualizations use a limited
   modern shape/scale API. The bridge maps only those calls, with v3's native
   wiggle/inside-out streamgraph implementation retaining the intended math. */
(function(global){
  'use strict';
  var d=global.d3;
  if(!d)throw Error('Local visualization engine unavailable');
  if(!d.scaleLinear)d.scaleLinear=function(){return d.scale.linear();};
  if(!d.easeCubicInOut)d.easeCubicInOut=d.ease('cubic-in-out');
  d.curveBasis={id:'basis'};
  d.stackOffsetWiggle={id:'wiggle'};
  d.stackOrderInsideOut={id:'inside-out'};
  if(!d.path)d.path=function(){
    var parts=[];
    return {
      moveTo:function(x,y){parts.push('M'+x+','+y);},
      lineTo:function(x,y){parts.push('L'+x+','+y);},
      bezierCurveTo:function(x1,y1,x2,y2,x3,y3){parts.push('C'+x1+','+y1+','+x2+','+y2+','+x3+','+y3);},
      closePath:function(){parts.push('Z');},
      toString:function(){return parts.join(' ');}
    };
  };
  if(!d.area)d.area=function(){
    var fx=function(p){return p.data.year;},fy0=function(p){return p[0];},fy1=function(p){return p[1];},interp='linear';
    function shape(values){return d.svg.area().x(fx).y0(fy0).y1(fy1).interpolate(interp)(values);}
    shape.x=function(fn){if(!arguments.length)return fx;fx=fn;return shape;};
    shape.y0=function(fn){if(!arguments.length)return fy0;fy0=fn;return shape;};
    shape.y1=function(fn){if(!arguments.length)return fy1;fy1=fn;return shape;};
    shape.curve=function(fn){interp=(fn===d.curveBasis?'basis':'linear');return shape;};
    return shape;
  };
  if(!d.stack)d.stack=function(){
    var names=[],wiggle=false,insideOut=false;
    function stack(data){
      var layers=names.map(function(key){return data.map(function(row){return {x:row.year,y:Math.max(0,+row[key]||0),source:row};});});
      var worker=d.layout.stack().values(function(layer){return layer;}).x(function(row){return row.x;}).y(function(row){return row.y;});
      if(wiggle)worker.offset('wiggle');
      if(insideOut)worker.order('inside-out');
      worker(layers);
      return layers.map(function(layer,i){
        var series=layer.map(function(row){var item=[row.y0,row.y0+row.y];item.data=row.source;return item;});
        series.key=names[i];
        return series;
      });
    }
    stack.keys=function(value){if(!arguments.length)return names;names=Array.prototype.slice.call(value);return stack;};
    stack.offset=function(value){wiggle=value===d.stackOffsetWiggle;return stack;};
    stack.order=function(value){insideOut=value===d.stackOrderInsideOut;return stack;};
    return stack;
  };
  global.RhizomeVizCore={d3Version:d.version,bridge:'offline-scales-streamgraph-v1'};
})(this);
