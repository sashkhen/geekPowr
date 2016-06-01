var wrappers = [], strArr = [];
var children = document.body.children;
for (var i = 0; i < children.length; i++) {
  if (children[i].tagName === 'DIV') {
    wrappers.push(children[i]);
    var title = children[i].getElementsByClassName('totype')[0];
    if (title !== undefined) {
      strArr.push(title.innerHTML);
      title.style.height = title.offsetHeight + 'px';
      title.innerHTML = '';
    } else {
      strArr.push('');
    }
  }
}

function typeIn(wrapper, str) {
  var text = '', i = 0, isTag;
  var el = wrapper.getElementsByClassName('totype')[0]; 
  setTimeout(function type() {
    text += str[i++];
    if (str[i] === '<') {
      isTag = true;
    } else if (str[i] === '>') {
      isTag = false;
    }
    if (isTag) {
      return type();
    }
    
    el.innerHTML = text;
    if (text === str) {
      (function fade() {
        var subtitle = wrapper.getElementsByClassName('tofade');
        for (var j = 0; j < subtitle.length; j++) {
          fadeIn(subtitle[j]);
        }
      })();
      return;
    }
    setTimeout(type, 100);
  }, 500);
}

function fadeIn(element) {
    var op = 0.1;  
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
      element.style.opacity = op;
      op += 0.1;
    }, 100);
}

typeIn(wrappers[0], strArr[0]);

var sumHeight = wrappers[0].offsetHeight;
var index = 0;

window.onscroll = function() {
  if (index < wrappers.length) {
     if ((screen.availHeight - wrappers[index].offsetHeight + window.pageYOffset) > (sumHeight - wrappers[index].offsetHeight/2)) {
      sumHeight += wrappers[index].offsetHeight;
      index++;
      if (strArr[index] !== '') {
        typeIn(wrappers[index], strArr[index]);
      } else {
        var subtitle = wrappers[index].getElementsByClassName('tofade');
        for (var i = 0; i < subtitle.length; i++) {
          fadeIn(subtitle[i]);
        }
      }
    } 
    
  }
  
}

//navscroll
$('.nav-pills li a, footer a').on('click', function(event) {
  event.preventDefault();
  var path = this.href.substring(this.href.indexOf('#'));
  $('html, body').animate({scrollTop: $(path).offset().top}, 1000);
})
$('.navbar-brand, #toTop').on('click', function(event) {
  event.preventDefault();
  $('html, body').animate({scrollTop:0}, 1000);
})

