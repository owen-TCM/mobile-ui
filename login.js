import React from 'react';
import ReactDOM from 'react-dom';

var APP = {}
var Usernamerow = React.createClass({
  render: function() {
    return (
      
      <div>
        
        <span className ='username'> Username:  </span>       
        <input id='username' type='text'/>       
      </div>        
    );
  }

});

var Passwordrow = React.createClass({
  
  getInitialState:function(){
    return{didyoucheck:true}
  },
  componentDidMount: function(){
    
    $(APP).on('up',function(){
      console.log(this.state.didyoucheck)
      this.setState({didyoucheck:!this.state.didyoucheck})                   
    }.bind(this))
   
  },
  componentWillUnmount: function(){
     $(APP).off('up');
     $(APP).off('down');
  },
  render: function() {
    var revealpass = this.state.didyoucheck?'password':'text'
    return (      
      <div>        
        <span className ='password'>Password: </span>  
        <input id='password' type = {revealpass} />       
      </div>        
    );
  }

});

var Passwordreveal = React.createClass({
  render: function(){
    
    return(
      <div>
      <input  onClick = {toggle.bind(this)} className='checkbox' type='checkbox'/> 
        <span className ='reveal'>reveal password</span>
      </div> 
      )
  }
})
var Wrong = React.createClass({
  render: function(){
    return(<div className='error'>{this.props.name}</div>);
  }
})
var Loginbutton = React.createClass({
  getInitialState:function(){
    return{clicked:false}
  },
  componentDidMount: function(){       
      
    $(document).on('keyup',function(e){
      if(e.keyCode ==13){
      ReactDOM.unmountComponentAtNode($('#container4').get(0))
    //ReactDOM.unmountComponentAtNode($('#container5').get(0))
        $('#container5').html('<div class="makecenter progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40"\ aria-valuemin="0" aria-valuemax="100" style="width:40%">\
     &nbsp </div>')
              
          setTimeout(function(){
             if($('#username').val()==='user' && $('#password').val()==='user'){
           $('#container5').html('Success!')
           ReactDOM.unmountComponentAtNode($('#container4').get(0))
           setTimeout(function(){
             
            window.location.href="main.html"            
           },1000)
          
        }
            else{
              
              if($('#username').val()==='' || $('#password').val()===''){
                var errortype = 'Please input the Username/Password!'
              }
              else{
                var errortype = 'Wrong Username or Password'
              }
              ReactDOM.render(
                <Wrong name={errortype} />,
                document.getElementById('container4')
              );
           ReactDOM.render(
            <Loginbutton name='Login' />,
            document.getElementById('container5')
            );   
            }
        }.bind(this),2000)
     }
    }.bind(this))
    $('.login').on('click',function(){
      ReactDOM.unmountComponentAtNode($('#container4').get(0))
    //ReactDOM.unmountComponentAtNode($('#container5').get(0))
        $('#container5').html('<div class="makecenter progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40"\ aria-valuemin="0" aria-valuemax="100" style="width:40%">\
     &nbsp </div>')
              
          setTimeout(function(){
             if($('#username').val()==='user' && $('#password').val()==='user'){
           $('#container5').html('Success!')
           ReactDOM.unmountComponentAtNode($('#container4').get(0))
           setTimeout(function(){
             
            window.location.href="main.html"            
           },1000)
          
        }
            else{
              
              if($('#username').val()==='' || $('#password').val()===''){
                var errortype = 'Please input the Username/Password!'
              }
              else{
                var errortype = 'Wrong Username or Password'
              }
              ReactDOM.render(
                <Wrong name={errortype} />,
                document.getElementById('container4')
              );
           ReactDOM.render(
            <Loginbutton name='Login' />,
            document.getElementById('container5')
            );   
            }
        }.bind(this),2000)
        
    }.bind(this))
  },
  componentWillUnmount: function(){
    //alert('haha')
    $('.login').off()
  },
  render: function(){
    
    if(!this.state.clicked){
      
      return(<button className='login'> {this.props.name}</button> )
    }
    else{
      return(<span className='login'>checking...</span>)
    }
  }
})

/*var Loginprompt = React.createClass({
  render:function(){
    return (
      <div>
        <b>Adept Login</b>
        <Usernamerow />
        <Passwordrow />
        <Passwordreveal />
        <Loginbutton name='Login '/></div>
       
    )
    
  }
})*/
var toggle= function(e){
  
  e.checked = !e.checked 
  $(APP).trigger('up')
 
  
}


 ReactDOM.render(
  <Usernamerow />,
  document.getElementById('container')
);
ReactDOM.render(
  <Passwordrow  />,
  document.getElementById('container2')
);
ReactDOM.render(
  <Passwordreveal  />,
  document.getElementById('container3')
);

 ReactDOM.render(
  <Loginbutton name='Login' />,
  document.getElementById('container5')
);

