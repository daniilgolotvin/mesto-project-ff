(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-11",headers:{authorization:"b7c3c64c-3f3c-40e5-9f72-342db9e3d5df","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}function r(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))}var o=document.querySelector("#elements").content;function c(e,t,n,r,c){var a=o.querySelector(".card").cloneNode(!0),u=a.querySelector(".card__button"),i=a.querySelector(".card__likes-number"),l=a.querySelector(".card__like"),s=a.querySelector(".card__photo"),f=e.likes.some((function(e){return e._id===c}));return a.querySelector(".card__text").textContent=e.name,i.textContent=e.likes.length,s.src=e.link,s.alt=e.name,n&&l.addEventListener("click",(function(){n(e._id,i,l)})),r&&s.addEventListener("click",(function(){r(e)})),f&&l.classList.add("card__like_active"),e.owner._id!==c?u.remove():u.addEventListener("click",(function(){t(e._id,a)})),a}function a(e,t,o){(o.classList.contains("card__like_active")?r:n)(e).then((function(e){t.textContent=e.likes.length,o.classList.toggle("card__like_active")})).catch((function(e){return console.log(e)}))}function u(n,r){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))})(n).then((function(){r.remove()})).catch((function(e){console.log("Ошибка: ".concat(e))}))}var i=null;function l(e){i&&s(i),e.classList.add("popup_opened"),function(e){e.querySelectorAll(".popup__close").forEach((function(t){t.addEventListener("click",(function(){return s(e)}))})),e.addEventListener("mousedown",f)}(e),i=e}function s(e){e.classList.remove("popup_opened"),function(e){e.querySelectorAll(".popup__close").forEach((function(e){e.removeEventListener("click",s)})),e.removeEventListener("mousedown",f)}(e),i=null}function f(e){e.target.classList.contains("popup_opened")&&s(e.target)}function d(e){return function(e){if(Array.isArray(e))return p(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function m(e,t,n){e.classList.remove(n.inputErrorClass),t.textContent=""}function y(e,t,n){e&&(t?(e.disabled=!1,e.classList.remove(n.inactiveButtonClass)):(e.classList.add(n.inactiveButtonClass),e.disabled="true"))}function _(e,t){var n=e.querySelectorAll(t.inputSelector),r=e.querySelector(t.submitButtonSelector);d(n).forEach((function(n){m(n,e.querySelector("#".concat(n.name,"-error")),t)})),y(r,!1,t)}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var v,S={formSelector:".popup__forms",inputSelector:".popup__form",submitButtonSelector:".popup__save",inactiveButtonClass:"popup__save_type_invalid",inputErrorClass:"popup__form_type_invalid"},b=document.querySelector(".cards"),q=document.querySelector(".profile__avatar"),E=document.querySelector("#profile"),g=document.querySelector(".profile__pencil"),k=E.querySelectorAll(".popup__close"),C=E.querySelector(".popup__forms"),L=C.querySelector(".popup__form_type_name"),x=C.querySelector(".popup__form_type_job"),A=E.querySelector(".popup__save"),j=document.querySelector(".profile__name"),U=document.querySelector(".profile__text"),w=document.querySelector("#cards"),T=document.querySelector(".profile__plus"),O=(w.querySelector(".popup__close"),w.querySelector(".popup__forms")),I=O.querySelector(".popup__form_type_title"),B=O.querySelector(".popup__form_type_link"),P=document.querySelector(".popup_overlay"),D=P.querySelector(".popup__photo"),N=P.querySelector(".popup__image-name"),J=(P.querySelector(".popup__close"),document.querySelector(".profile__edit-avatar")),M=document.querySelector("#pic"),G=document.querySelector('form[name="update-pic"]'),H=G.querySelector(".popup__form_type_picture-url");function V(e,t,n){a(e,t,n)}function $(e){D.src=e.link,D.alt=e.name,N.textContent=e.name,l(P)}k.forEach((function(e){var t=e.closest(".popup");t.addEventListener("click",f),e.addEventListener("click",(function(){return s(t)}))})),C.addEventListener("submit",(function(n){var r,o;n.preventDefault(),A.textContent="Сохранение...",(r=L.value,o=x.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then((function(e){return t(e)}))).then((function(e){j.textContent=e.name,U.textContent=e.about,s(E),_(C,S)})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){A.textContent="Сохранить"}))})),O.addEventListener("submit",(function(n){var r;n.preventDefault(),A.textContent="Сохранение...",(r={name:I.value,link:B.value},fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify(r)}).then((function(e){return t(e)}))).then((function(e){!function(e,t,n,r,o){var a=c(e,t,n,r,o);b.prepend(a)}(e,u,a,$,v),s(w),O.reset(),_(O,S)})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){A.textContent="Сохранить"}))})),G.addEventListener("submit",(function(n){var r;n.preventDefault(),A.textContent="Сохранение...",(r={avatar:H.value},fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify(r)}).then((function(e){return t(e)}))).then((function(e){q.style.backgroundImage="url(".concat(e.avatar,")"),s(M),G.reset(),_(G,S)})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){A.textContent="Сохранить"}))})),g.addEventListener("click",(function(){_(C,S),L.value=j.textContent,x.value=U.textContent,l(E)})),T.addEventListener("click",(function(){_(O,S),l(w)})),J.addEventListener("click",(function(){_(G,S),l(M)})),Promise.all([fetch("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}).then(t)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],a=r[1];!function(e){j.textContent=e.name,U.textContent=e.about,q.style.backgroundImage="url(".concat(e.avatar,")")}(a),v=a._id,function(e){e.forEach((function(e){var t;t=c(e,u,V,$,v),b.append(t)}))}(o)})).catch((function(e){console.log("Ошибка: ".concat(e))})),function(e){d(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=e.querySelectorAll(t.inputSelector),r=e.querySelector(t.submitButtonSelector);y(r,e.checkValidity(),t),d(n).forEach((function(n){n.addEventListener("input",(function(){!function(e,t,n){var r=e.validity.valid,o=t.querySelector("#".concat(e.name,"-error"));r?m(e,o,n):function(e,t,n){e.classList.add(n.inputErrorClass),t.textContent=e.validationMessage}(e,o,n)}(n,e,t),y(r,e.checkValidity(),t)}))}))}(t,e)}))}(S)})();