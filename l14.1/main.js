let selector = 'group';
const DomElement = function() {
  this.selector = '#' + selector;
  this.height = 0;
  this.width = 0;
  this.bg = 0;
  this.fontSize = 0;
};

DomElement.prototype.createElem = function () {
  if (this.selector === '.' + selector) {
    console.log(this.selector);
    let newElem = document.createElement('div');
    newElem.className = `${selector}`;
    newElem.textContent = 'Just Text';
    
    this.height = '50px';
    this.width = '150px';
    this.bg = '#762ee1';
    this.fontSize = '14px';
    
    newElem.style.height = '50px';
    newElem.style.width = '150px';
    newElem.style.background = '#762ee1';
    newElem.style.fontSize = '14px';
    newElem.style.margin = '150px auto';
    console.log(this);
    document.body.append(newElem);
  } else if (this.selector === '#' + selector) {
    let p = document.createElement('p');
    p.id = selector;
    p.textContent = 'Just Text';

    this.height = '80px';
    this.width = '200px';
    this.bg = '#1653fb';
    this.fontSize = '19px';
    
    p.style.height = '80px';
    p.style.width = '200px';
    p.style.background = '#1653fb';
    p.style.fontSize = '19px';
    p.style.margin = '150px auto';
    document.body.prepend(p);
  }
};

const domElement = new DomElement();
domElement.createElem();