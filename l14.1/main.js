let selector = 'group';
const DomElement = function() {
  this.selector = '.' + selector;
  this.height = 0;
  this.width = 0;
  this.bg = 0;
  this.fontSize = 0;
};

DomElement.prototype.createElem = function () {
  let block;
  this.selector === '.' + selector ? block = document.createElement('div'): block;
  this.selector === '#' + selector ? block = document.createElement('p'): block;

  if (this.selector === '.' + selector) {
    block.className = selector;
  } else if (this.selector === '#' + selector) {
    block.id = selector;
  }

  this.height = '50px';
  this.width = '150px';
  this.bg = '#762ee1';
  this.fontSize = '14px';
    
  block.style.height = '50px';
  block.style.background = '#762ee1';
  block.style.fontSize = '14px';
  block.style.margin = '150px auto';
  block.style.width = '150px';
  document.body.prepend(block);
};
const domElement = new DomElement();
domElement.createElem();