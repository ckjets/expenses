(()=>{"use strict";var e={323:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(r(860)),u=(0,s.default)(),n=s.default.Router();u.use(s.default.json()),u.use(s.default.urlencoded({extended:!1})),n.get("/",((e,t,r)=>t.send("hello world!!!!"))),u.use("/",n),u.listen(3e3,(()=>{console.log("listening on port 3000")}))},860:e=>{e.exports=require("express")}},t={};!function r(o){var s=t[o];if(void 0!==s)return s.exports;var u=t[o]={exports:{}};return e[o].call(u.exports,u,u.exports,r),u.exports}(323)})();