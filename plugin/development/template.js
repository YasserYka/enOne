
module.exports = class Template {
  
  async initialize(config) { }

  // JSX code to be displayed.
  async render() {

    return (
        <div></div>
    );
  }

  /* 
    add all your intervals inside the brackets
    
    for example 
    
    return [
      setinterval(this.updateDate, 60000),
      setinterval(this.updateTime, 60000)
    ];

  */
  async interval() {

    return [];
  }

  // All logic can be added here
  async script() {

  }
  
};
