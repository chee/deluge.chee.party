/* interact.js 1.10.26 | https://raw.github.com/taye/interact.js/main/LICENSE */

import is from"../../utils/is.prod.js";import*as pointerUtils from"../../utils/pointerUtils.prod.js";function install(e){const{actions:t,Interactable:s,defaults:n}=e;s.prototype.gesturable=function(e){return is.object(e)?(this.options.gesture.enabled=!1!==e.enabled,this.setPerAction("gesture",e),this.setOnEvents("gesture",e),this):is.bool(e)?(this.options.gesture.enabled=e,this):this.options.gesture},t.map.gesture=gesture,t.methodDict.gesture="gesturable",n.actions.gesture=gesture.defaults}function updateGestureProps(e){let{interaction:t,iEvent:s,phase:n}=e;if("gesture"!==t.prepared.name)return;const a=t.pointers.map((e=>e.pointer)),i="start"===n,r="end"===n,o=t.interactable.options.deltaSource;if(s.touches=[a[0],a[1]],i)s.distance=pointerUtils.touchDistance(a,o),s.box=pointerUtils.touchBBox(a),s.scale=1,s.ds=0,s.angle=pointerUtils.touchAngle(a,o),s.da=0,t.gesture.startDistance=s.distance,t.gesture.startAngle=s.angle;else if(r||t.pointers.length<2){const e=t.prevEvent;s.distance=e.distance,s.box=e.box,s.scale=e.scale,s.ds=0,s.angle=e.angle,s.da=0}else s.distance=pointerUtils.touchDistance(a,o),s.box=pointerUtils.touchBBox(a),s.scale=s.distance/t.gesture.startDistance,s.angle=pointerUtils.touchAngle(a,o),s.ds=s.scale-t.gesture.scale,s.da=s.angle-t.gesture.angle;t.gesture.distance=s.distance,t.gesture.angle=s.angle,is.number(s.scale)&&s.scale!==1/0&&!isNaN(s.scale)&&(t.gesture.scale=s.scale)}const gesture={id:"actions/gesture",before:["actions/drag","actions/resize"],install:install,listeners:{"interactions:action-start":updateGestureProps,"interactions:action-move":updateGestureProps,"interactions:action-end":updateGestureProps,"interactions:new"(e){let{interaction:t}=e;t.gesture={angle:0,distance:0,scale:1,startAngle:0,startDistance:0}},"auto-start:check"(e){if(e.interaction.pointers.length<2)return;const t=e.interactable.options.gesture;return t&&t.enabled?(e.action={name:"gesture"},!1):void 0}},defaults:{},getCursor:()=>"",filterEventType(e){return 0===e.search("gesture")}};export{gesture as default};
//# sourceMappingURL=plugin.prod.js.map
