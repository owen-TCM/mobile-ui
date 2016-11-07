import React from 'react';
import ReactDOM from 'react-dom';

$(document).on("pageshow", "[data-role='page']", function () {	//removes the intial div element that comes with the jquery mobile module 
 $('div.ui-loader').remove();
});

// react class for the menu icon

var Menu_icon = React.createClass({
	handleClick: function(){	// this function is attached to the click/tap event when the user taps the menu icon
		
		ReactDOM.render(<Menu />,document.getElementById('container'));	// render function renders the Menu element for the menu after click/tap event
		$('.clear:eq(2)').after('<div id="settings"><div id="settingoption">change menu color</div>    \
			<div id="settingoption">change background color</div></div>')		// appends the change menu color and background color options under menu 'settings' NOT OPTIMAL 
		$('#settings').hide()	// initially hiding setting options 
		if(!$('#mask').length ){	// if a mask layer div doesnt exist, create a mask layer when menu pops up 
			$('body').append('<div id="mask"></div>').hide().fadeIn('fast')
		}
		$('.clear').each(function(){				//attaches a function to each menu option element which changes the color and bolds the selected option
				$(this).click(function(){
					
					$('.clear').css({
						'background-color':'rgb(237, 236, 236)',
						'font-weight':'normal'
					})
					$(this).css({
						'background-color':'rgb(160, 204, 58)',
						'font-weight':'bold'
					})
				})				
			})

  		$(document).on("swipeleft",function(){	// for swipe left event which removes the menu after the event
    		ReactDOM.unmountComponentAtNode($('#dropdowncontainer').get(0))
			ReactDOM.render(<Menu_icon />,document.getElementById('container'));	//re-renders menu icon after the menu is removed	
			$('#mask').remove()	// removes the mask element
  		});             

  		$("#mask").on("tap",function(){	// when the user taps on the mask element, remove the menu as well
			ReactDOM.unmountComponentAtNode($('#dropdowncontainer').get(0))
			ReactDOM.render(<Menu_icon />,document.getElementById('container'))	  //re-renders menu icon after the menu is removed
  			$("#mask").remove();
		})

  		// the code for the swiperight function for the left menu OPTIONAL

		/*$(document).on("swiperight",function(){
    			
			ReactDOM.render(<Menu />,document.getElementById('container'));
			$('.clear:eq(2)').after('<div id="settings"><div id="settingoption">change menu color</div><div id="settingoption">change background color</div></div>')
			$('#settings').hide()
			$('.clear').each(function(){				
				$(this).click(function(){
					
					$('.clear').css({
						'background-color':'rgb(237, 236, 236)',
						'font-weight':'normal'
					})
					$(this).css({
						'background-color':'rgb(160, 204, 58)',
						'font-weight':'bold'
					})
				})				
			})
			if(!$('#mask').length ){
			$('body').append('<div id="mask"></div>').hide().fadeIn('slow')
			}
			$("#mask").on("tap",function(){
			ReactDOM.unmountComponentAtNode($('#dropdowncontainer').get(0))
			ReactDOM.render(<Menu_icon />,document.getElementById('container'))
  			$("#mask").remove();
			})
  		});    */
		
			
	},
	render: function(){		// render function 
		return(
			<input onClick= {this.handleClick} className="menuicon" type="image" src="images/threelines.png"/>
		);
	}
		
})

//dropdown class for the dropdown submenu OPTIONAL 
/*
var Dropdown = React.createClass({	
	render:function(){
		return(
			<div className='dropdown'></div>
		);
	}	
})
*/

// adds functionality for future settings
var Settings = React.createClass({
	render: function(){
		
	}
})

// react class for the menu option items 
var Menuitem = React.createClass({
	handleClick:function(){		// handleclick function for the click/tap event when the user taps on a menu option
		
		//$('#dropdowncontainer').hide()	// needed if dropdown menus will be implemented	
		switch(this.props.name){	

		case 'Logout':      // if user presses logout , go back to login page
			window.location.href="index.html" 
			break;
		case 'Settings': 	// if user presses settings, show settings
			$('#settings').toggle()		
			break;
		case 'Device': 	// if user presses device, show the devices page			 
			ReactDOM.render(<Page name='Devices'/>,document.getElementById('page'))		// renders devices react element			
			$('#mask').remove() //removes transparent mask
			ReactDOM.render(<Menu_icon />,document.getElementById('container'));	// re-renders menu icon
			break;
		case 'Dashboard': 	// if user presses dashboard, show dashboard page
			//ReactDOM.render(<Dropdown />,document.getElementById('dropdowncontainer')); 
			ReactDOM.render(<Page name='Dashboard'/>,document.getElementById('page')) 	// renders dashboard react element
			$('#mask').remove() 	// removes mask
			ReactDOM.render(<Menu_icon />,document.getElementById('container')); 	//re-renders menu icon
			/*$('.dropdown').css({'position': 'absolute',
					    'left': $('.menu').width(),
					    'top': $('.menuitem:eq(0)').position().top,
					    'height': '200px',
					    'width':'200px',
					    'z-index':'11',
					    'background-color':'rgb(237, 236, 236)',
					    'border':'1px solid black',
			});*/
			
			break;
		default:
			break;
		}
	},
	render:function(){	// render function
		
		return (
			<div className='clear' onClick={this.handleClick}>	
			<span className ='menuitem'  >{this.props.name}</span>
					
			</div>
		);
		
	}
})
// react class for menu
var Menu = React.createClass({
	render:function(){	// renders the entire menu
		return(
			<div className='menu'>	
				<img src='../images/login_banner.png' className='logo' />
				<Menuitem name='Dashboard'/> 
				<Menuitem name='Device'/>
				<Menuitem name='Settings'/>
				<Menuitem name='Logout'/>
				
			</div>
		)
		
	}
})
// react class for react heading 
var Rowheading = React.createClass({
	render:function(){
		return(
		<thead>
		<tr>
			<th>Site Name</th>
			<th>Status</th>
			<th>IP</th>
			<th className='hiddenth'></th> {/* hidden heading for the checkbox column for the user to select/unselect rows when the user taps and holds on the device row*/}
		</tr>
		</thead>
		)
	}
})
// react class for table columns
var Column = React.createClass({  
	render:function(){
		return(
		
		<td>{this.props.name}</td>
		
		)
	}
})

// react class for table rows
var Row = React.createClass({
	
	render:function(){
		
		return(
		<tr id={this.props.name} className = 'row'>
		<Column name={this.props.name}/>
		<Column name={this.props.status}/>
		<Column name={this.props.ip}/>	
		
		</tr>
		)
	}
})

// react class for a device details pop up when user double taps device table row
var Devicedetails = React.createClass({

	render:function(){
		return(
			<div className='devicedetails'>
				{this.props.name}
			</div>
		)
	}
})

// react class for device table
var tapcount = 0	// tapcount for double tap event
var Table = React.createClass({	

	getInitialState:function(){	// gets the initial state values of the table device entries

    	return{entries:this.props.entries}
  	},
  	componentWillUpdate:function(){	// this function runs before the table updates
  		
  		$( ".row" ).off()	// detaches all functions attached to rows
  	},
	componentDidMount:function(){	//	this function runs after the table element is mounted on the page
		this.setupfunctions()
		
	},
	componentDidUpdate:function(){	// runs after every time the table updates
		
		this.setupfunctions()

	},
	setupfunctions: function(){
		$('.row > *:not(.select)').click(function(){	// attaches a double tap function to the rows and creates a pop up of device details
			console.log(tapcount)
			tapcount++
			setTimeout(function(){	// reset tap count if user does not tap the second time after 1 second

				tapcount = 0

			},1000)

			if(tapcount ===2){	// if user taps twice then create the pop up with device details
					tapcount = 0
					$('.page').append('<div class="devicedetails"> \
						<a href="#" class="ui-icon-delete  ui-btn-icon-right"> </a><p>Device name: '+this.id+'</p> <p> details </p></div>')
					if(!$('#mask').length ){
						$('body').append('<div id="mask"></div>').hide().fadeIn('fast')
					}
					
					$('.ui-icon-delete').click(function(){
						$('#mask').remove()
						$('.devicedetails').remove()
					})
			}
		})
		$('.row').on("taphold",function(e){	// attaches function that generates a column of checkboxes for all the rows for selecting/unselecting device rows
			
			tapcount = 0
			var that = this
  					
  			if(!$('#select_'+this.id).length){
  				$('.hiddenth').css('display','inline-block')
  				$(this).css('background-color','yellow');

  				$('.row').each(function(){
  					
  					var row = this
  					var ischecked = that.id === this.id ? true : false						
  					if(ischecked){			
		  			$(this).append('<td  class="select"><input id=select_'+this.id+' checked type="checkbox"></td>')
		  			}
		  			else{
		  			$(this).append('<td class="select"><input id=select_'+this.id+' type="checkbox"></td>')
		  			}
		  			$('#select_'+this.id).click(function(){
		  				
		  				if($(this).prop('checked')){
		  				$(row).css('background-color','yellow');
		  				}
		  				else{
		  				$(row).css('background-color','white');	
		  				}
		  			})
	  			})
	  			$('.page').append('<div class="rowoptions"> \
	  				<button class="options" id="selectall">select all</button> \
	  				<button class="options" id="selectnone">deselect all</button> \
	  				<button class="options" id="cancel">cancel</button> \
	  				<button class="options" id="confirm">confirm</button> \
	  			</div>')
	  			// below functions are for when the user presses on the four options!
				$('#selectall').click(function(){	
					$('input[id^="select_"]').prop('checked',true)
					
					$('.row').css('background-color','yellow')
						
				})	  			
	  			$('#selectnone').click(function(){
					$('input[id^="select_"]').prop('checked',false)
					
					$('.row').css('background-color','white')
						
				})		
	  			$('#cancel').click(function(){
	  				$('.row').css('background-color','white')
	  				$('.select,.rowoptions').remove()
	  				$('.menuicon').show()
	  				$('.hiddenth').css('display','none')
	  			})
				$('#confirm').click(function(){
					$('.row').css('background-color','white')
	  				$('.select,.rowoptions').remove()
	  				$('.menuicon').show()
	  				$('.hiddenth').css('display','none')
				})
  				$('.menuicon').hide()
  			}		
  			/*$('').click(function(){
  				
				$('.select,.rowoptions').remove()

				$('.row').css('background-color','white')
				$('.menuicon').show()	
			})*/

		});		
	},
	render:function(){	// if no entries are found then render a not found div element otherwise render table results
		if(this.props.entries !== null){
			return(							
					<table>				
					<Rowheading />
					<tbody>
					{this.props.entries}
					</tbody>
					</table>
						
			)
		}
		else{		
			return(		
					
					<table>								
					<div>not result found </div>				
					</table>
									
			)
		}		
		
	}
})


// react class for each pegination block
var Paginationpage = React.createClass({
	componentDidMount: function(){
		
		$('.pagination-index').click(function(){	// bolds and changes color of the pagination block when user selects that page
			$('.pagination-index').css({'background-color':'white','font-weight':'normal'})
			$(this).css({'background-color':'greenyellow','font-weight':'bold'})
			//console.log('index: ',$(this).index())
		})	
	},
	handleClick:function(){	// this function handles the click event
		this.props.pageselect(this.props.index) // sends the index (page number) of the selected page to the parent element 'page' 
	},
	render: function(){

		return(
			<span className='pagination-index' onClick={this.handleClick} >{this.props.index}</span>
		)
	}

}) 
// react class for the entire pagination
var Pagination = React.createClass({
	
	pageselect: function(pageindex){
		this.props.pageselect(pageindex) //sends the page index to the parent element 'page'
	},
	render: function(){
		
		var numberofpages = [] 
		for(var i=0;i<this.props.numpages;i++){  //   pushes the number of pageination page elements depending on the number of devices
			numberofpages.push(<Paginationpage index={i+1} pageselect = {this.pageselect}/>)
		}
		return(
		<span className='pagination'>
		{numberofpages}
		</span>
		)
	}

})
// react class for the filter options pop up overlay 
var Filteroptions = React.createClass({
	getInitialState:function(){	// initial values are all false ( none are selected)
		return{
		name:false,
		ip:false,
		minor_alarms:false,
		major_alarms:false,
		no_response:false,
		setoptions:null
		}
	},
	componentDidMount:function(){	// runs after the component mounts

		var values = [false,false,false,false,false]
		$('.filteroption').click(function(){	// attaches a function to all of the filter options. 
			
			$(this).css('background-color','greenyellow').prop('disabled',true)	
			$('.filteroption').not(this).prop('disabled',false).css('background-color','#e5e5e5') 
			
			switch($(this).val() ){ // depend on the option, set the option to true if selected
				case 'name':
					values[0] = true
					values[1] = false
				break;
				case 'ip':
					values[0] = false
					values[1] = true
				break;
				case 'minor':
				if($(this).is(':checked')){	// for status options, if the checkbox is checked the set value to trie
					values[2] = true 
				}
				else{
					values[2] = false
				}
				break;
				case 'major':
				if($(this).is(':checked')){
					values[3] = true	
				}
				else{
					values[3] = false
				}
				case 'no_response':
				if($(this).is(':checked')){
					values[4] = true	
				}
				else{
					values[4] = false
				}
				default:

			}
			
		})
		this.state.setoptions = setInterval(function(){	// updates option values ever 100 milliseconds
			this.setState({
					name:values[0],
					ip:values[1],
					minor_alarms:values[2],
					major_alarms:values[3],
					no_response:values[4]
			})
		}.bind(this),100)
	},
	handleClick:function(){	// handles click event after user presses 'apply'
		clearInterval(this.state.setoptions)	// clear the interval function above after the filter option selection is over
		//console.log(this.state.name +' '+this.state.ip + ' ' + this.state.major_alarms + ' ' + this.state.minor_alarms + ' ' + this.state.no_response)
		this.props.getfiltersettings({	// sends the selection information to the parent element 'page'
			name:this.state.name,
			ip:this.state.ip,
			major:this.state.major_alarms,
			minor:this.state.minor_alarms,
			no_response:this.state.no_response
		})
		ReactDOM.unmountComponentAtNode($('#filteroptionscontainer').get(0)) // remove overlay after 'apply'
		$('#mask').remove() // remove mask
	},
	render:function(){	// renders the overlay
		
		return(
			<div className='filteroverlay'> 
			<p><button className='filteroption' value='name'>Filter Name </button></p>
			<p><button className='filteroption' value='ip'>Filter by IP </button></p>	
			<p> Filter by one of more statuses </p>	
			<p><span> Minor Alarms </span><input type='checkbox' value='minor' className='filteroption'/></p>
			<p><span> Major Alarms </span><input type='checkbox' value='major' className='filteroption'/></p>
			<p><span> No response </span><input type='checkbox' value='no_response' className='filteroption'/></p>
			<button onClick={this.handleClick}> Apply </button>
			</div>

		)
		
	}

})
// react class for the devices page
var Page = React.createClass({
	getInitialState:function(){	// sets all initial values 
		var entriesperpage = this.createrowobject(5)	// creates 5 row devices entries by default
    	return{
    		numpages:entriesperpage.length,	// number of pages for the pagination
    		entries: entriesperpage[0],		// selects the first page at index 0 
    		numentriesperpage: 5,			// number of entries to display per page is 5 by default
    		resultfound:null,				// results not found initially 
    		page: 1,						// page is the first page initially
    		sortmethod:'',					// no sort methods selected initially
    		updatetable:false,				// a set interval function object will be assigned to his variable later
    		name:true,						// name, ip, major, minor, no_response are for the filter options 
    		ip:false,						// name is assigned true because by default the search method for finding devices is by name
    		major:false,
    		minor:false,
    		no_response:false,				
    		
    	}
  	},
  	getentryinfo:function(){	// return static information for now 
  		return([
		{name:'Vermont', status:'Minor Alarms(2)', ip:'10.201.157.164'},	
		{name:'Burnhill',status:'No SNMP Response',ip:'10.252.151.232'},
		{name:'E1100', status:'Major Alarms(1)', ip:'10.25.111.202'},
		{name:'VaughanMills', status:'OK', ip:'10.255.124.112'},
		{name:'Sudbury', status:'Minor Alarms(1)', ip:'10.64.98.123'},
		{name:'Sunnybrook', status:'OK', ip:'10.202.1.176'},
		{name:'Silverbrook', status:'OK', ip:'10.204.1.146'},
		{name:'Toronto', status:'Minor Alarms(2)', ip:'10.201.157.164'},
		{name:'Vancouver',status:'No SNMP Response',ip:'10.252.151.232'},
		{name:'Burnaby', status:'Major Alarms(1)', ip:'10.25.111.202'},
		{name:'Montreal', status:'OK', ip:'10.255.124.112'},
		{name:'Ottawa', status:'Minor Alarms(1)', ip:'10.64.98.123'},
		{name:'Windsor', status:'OK', ip:'10.202.1.176'},
		{name:'Windsor', status:'OK', ip:'10.202.1.176'},
		{name:'Windsor', status:'OK', ip:'10.202.1.174'},
		{name:'Windsor', status:'OFF', ip:'10.202.1.173'},
		{name:'Windsor', status:'OK', ip:'10.202.1.176'},
		{name:'Windsor', status:'OFF', ip:'10.202.1.172'},
		{name:'Windsor', status:'OK', ip:'10.202.1.176'},
		{name:'Windsor', status:'OK', ip:'10.201.1.171'},
		{name:'Windsor', status:'OK', ip:'10.206.1.176'},
		{name:'Calgary', status:'OK', ip:'10.200.1.146'},
		{name:'QuebecCity', status:'Minor Alarms(2)', ip:'10.201.157.164'},
		{name:'Kelowna',status:'No SNMP Response',ip:'10.252.151.232'},
		{name:'Edmonton', status:'Major Alarms(1)', ip:'10.25.111.202'},
		{name:'Yukon', status:'OK', ip:'10.255.124.112'},
		{name:'Winnipeg', status:'Minor Alarms(1)', ip:'10.64.98.123'},
		{name:'Regina', status:'OK', ip:'10.202.1.176'},
		{name:'Saskatoon', status:'OK', ip:'10.204.1.146'}
		])
  	}, 

  	create1drowarray:function(){	// creates a one dimensional array of the data for the table
  		var rows = []
  		var rowentries = this.getentryinfo()
  		for (var i = 0; i < rowentries.length; i++){
  			rows.push(<Row name= {rowentries[i].name} status= {rowentries[i].status} ip= {rowentries[i].ip} />)
  		}
  		return rows
  	},
  	createrowobject:function(entriesperpage,sortmethod){	// creates a two dimensional array of the data for the table
  		var rows = [[]]
  		var pageindex = 0
  		var entryindex = 0

  		var rowentries = this.getentryinfo()
  		if(sortmethod==='Alphabetical'){	// sorts the entries in alphabetical order
	  		rowentries.sort(function(a,b){
	  				var x = a.name.toLowerCase();
	    			var y = b.name.toLowerCase();
	   				if (x < y) {return -1;}
	    			if (x > y) {return 1;}
	   				return 0; 
	  		})
  		}
  		else if(sortmethod==='Status'){		// sorts the entries by status in alphabetical order
	  		rowentries.sort(function(a,b){
	  				var x = a.status.toLowerCase();
	    			var y = b.status.toLowerCase();
	   				if (x < y) {return -1;}
	    			if (x > y) {return 1;}
	   				return 0; 
	  		})	
  		}
  		
  		
  		for (var i = 0; i < rowentries.length; i++){	// creates the 2d array which is better suited for the pagination design!
  			// new setrowentryinfo() //create row object? optional
  			if(entryindex == entriesperpage){	// the user selects the entries to display per page ( it is 5 by default)
  				rows.push([])
  				pageindex++
  				entryindex = 0 
  			}
  			else{
  				rows[pageindex].push(<Row name= {rowentries[i].name} status= {rowentries[i].status} ip= {rowentries[i].ip} />)
  				entryindex++
  			}		
  		}
  		return rows
  	},
  	/*processentries:function(array){		// not used anymore
  		
  		var returnentries = []
		for (var i = 0; i < array.length; i++){
			returnentries.push(array[i])
		}
		return returnentries
  	},*/
 	setrowentryinfo:function(name,status,ip){	// will be useful later when we need to create objects for the row entries
		this.name = name
		this.status = status
		this.ip = ip
	},
  	pageselect: function(pageindex){	// page select function receives the page number that the user selects from the paginationpage element 
  		this.setState({					// sets state for the received page number and changes the table entries to the next page
	  			page:pageindex,
	  			entries:this.createrowobject(this.state.numentriesperpage,this.state.sortmethod)[pageindex-1]
	  	})
  	},
 	applysearchsettings:function(object){	//	this function handles the filter option settings received from the child element
 		console.log(object)
 		this.setState({		// sets the states for the filter options
 			name:object.name,
 			ip:object.ip,
 			major:object.major,
 			minor:object.minor,
 			no_response:object.no_response
 		})
 		setTimeout( () =>{		// set a timeout delay of 1 second because it takes time for the sets above to be set
 		
	 		clearInterval(this.state.updatetable)	
	 		var rowentries = this.getentryinfo()
			var rowobject = this.create1drowarray()
			var matched_entries = []

			
			for(var i=0;i<rowentries.length;i++){	// NOT an optimal way of handling the status filter options this will be replaced

				if(this.state.major && this.state.minor && this.state.no_response){
					var reg = /^major/gi.test(rowentries[i].status) || /^minor/gi.test(rowentries[i].status) || /^no/gi.test(rowentries[i].status)
				}
				else if(this.state.major && this.state.minor && !this.state.no_response){
					var reg = /^major/gi.test(rowentries[i].status) || /^minor/gi.test(rowentries[i].status)
				}
				else if (this.state.minor && this.state.no_response && !this.state.major){
					var reg =  /^minor/gi.test(rowentries[i].status) || /^no/gi.test(rowentries[i].status)
				}
				else if (this.state.major && this.state.no_response && !this.state.minor){
					var reg = /^major/gi.test(rowentries[i].status) || /^no/gi.test(rowentries[i].status)
				}
				else if(this.state.major){
					var reg = /^major/gi.test(rowentries[i].status)
				}
				else if (this.state.minor){
					var reg = /^minor/gi.test(rowentries[i].status)
				}
				else if( this.state.no_response){
					var reg = /^no/gi.test(rowentries[i].status)
				}
				else{
					matched_entries = null
				}


				if(reg){
					
					matched_entries.push(rowobject[i])
					
				}
	
			}
			this.setState({
				entries: matched_entries,
				numpages:0
			})
		},1000)
 	},
  	updatetable:function(){		// this function assigns a periodic setInterval function for updating table values when a setting changes

  		if(!this.state.updatetable){
  		this.setState({
  			// updatetable function updates the table entries whenever the user changes the sort method and entries to display per page
  			updatetable: setInterval(function(){
  			this.setState({
  				sortmethod: $('.sortoption:selected').val(),
  				numentriesperpage: $('.selectoption:selected').val(),
  				//searchmethod: 'name'//$('.filteroption:selected').val()
  			})
  			this.setState({
  				entries:this.createrowobject(this.state.numentriesperpage,this.state.sortmethod)[this.state.page-1],
  				numpages:this.createrowobject(this.state.numentriesperpage,this.state.sortmethod).length
  			})

  		}.bind(this),1000)
  		})
  		}
  	},
  	
  	componentDidMount:function(){	// runs once component mounts
  		
  		this.updatetable()	// set up periodic updating of table values when settings are changed
  		
  		$('.pagination > span:nth-child(1)').css({'background-color':'greenyellow','font-weight':'bold'})	// bold the first pagination block

  		$('.cleartext').click(function(){	// when the user presses on the x in the search bar, clear the search bar of any text
  			$('.filterbar').val('')	// clear the search bar
  			
  			$('.cleartext').hide()	// hides the clear x icon
  			//$('.cleartext').css('display','none')	// alternative way of hiding the clear x icon
  			this.updatetable()		// sets up the table updating again after the user finishes looking at the search results!
			this.setState({			// sets the table back to displaying the original devices
  				entries:this.createrowobject(this.state.numentriesperpage,this.state.sortmethod)[this.state.page-1],
  				numpages:this.createrowobject(this.state.numentriesperpage,this.state.sortmethod).length
  			})
  		}.bind(this))
  		
  	},
	handleKey:function(e){		// handles any key press events by the user 
		
		clearInterval(this.state.updatetable)	// stops the updating
		$('.cleartext').css('display','inline-block')	// displays the x clear icon on the right side of the search bar
		this.setState({
			updatetable:false	// removes the setInterval for updating
		})
		var matched_entries = []
		if($('.filterbar').val()===''){		// if there is no text in the search bar, redisplay all the table devices
			
			$('.cleartext').hide()	
			this.updatetable()
			this.setState({
  				entries:this.createrowobject(this.state.numentriesperpage,this.state.sortmethod)[this.state.page-1],
  				numpages:this.createrowobject(this.state.numentriesperpage,this.state.sortmethod).length
  			})
		}
		else{	// there is text in the search bar
			var inp = String.fromCharCode(e.which);		// converts the keyboard numeric keycode into the letter
			var reg = /[a-zA-Z0-9-_\b]/		// regular expression for matching all letters, numbers, and the backspace key
			//alert(inp)
			if (reg.test(inp))	// if the keypressed is a letter,number or the backspace key
			{
				
				var rowentries = this.getentryinfo()
				var rowobject = this.create1drowarray()
				
				for(var i=0;i<rowentries.length;i++){	// replace this function with an array.map() function for better efficiency
					//console.log(rowentries[i].name)

					var regex = new RegExp('^'+$('.filterbar').val(),'gi')	// matches the search bar input with row entries it matches
					// decides what to match the ip or the name of the device
					var name_or_ip = this.state.name ? regex.test(rowentries[i].name) : regex.test(rowentries[i].ip)	

					if(name_or_ip)	{	
						matched_entries.push(rowobject[i])	// pushes the matched devices into the array
									
					}
					
				}
				if(matched_entries.length > 0){		// display the matched devices in the table
					this.setState({
							entries: matched_entries,
							numpages:0
					})
				}
				else{								// no entries found
					this.setState({
							entries: null,
							numpages:0
					})
				}
			}
		}
		
	},
	filteroptions:function(){	// renders the filter option pop up overlay if the button is pressed
			
		ReactDOM.render(<Filteroptions getfiltersettings= {this.applysearchsettings}/>,document.getElementById('filteroptionscontainer'))	
		$('body').append('<div id="mask"></div>').hide().fadeIn('fast')
	},
	render:function(){	// render function for all the necessary elements 

		switch(this.props.name){
			
			case 'Devices': // if the user selected the device option on the menu bar

				return(
			
					<div className='page '>
						<h1> DEVICES </h1>
						
						<div className="ui-input-search" >
						<input type='text'  className='filterbar' onKeyUp={this.handleKey} placeholder='search devices'/>
						<div className='cleartext'>X </div>	
						</div>
						
						<div className='advancesearch'>
						
						<button className='filterselect' onClick = {this.filteroptions}> search options</button>
						
		
						</div>
						<div className='advancesearch'>
						<span> Sort By: </span>
						<select className='sort'  >
						  <option className='sortoption' value="none">none</option>
						  <option className='sortoption' value="Alphabetical">Alphabetical Order</option>					
						  <option className='sortoption' value="Status">Status</option>				  
						</select>
						</div>
						<Table resultfound = {this.state.resultfound} entries={this.state.entries}  pageselect={this.state.page}/>
						<Pagination pageselect={this.pageselect} numpages= {this.state.numpages} />
						<span> Entries per page: </span>
						<select className='selectnumentries' >
						  <option className='selectoption' value="5">5</option>
						  <option className='selectoption' value="7">7</option>
						  <option className='selectoption' value="8">8</option>
						  <option className='selectoption' value="10">10</option>
						</select>
									
					</div>			
				)
				break;
			case 'Dashboard': 	// if the user selected the dashboard option on the menu bar
				return(
					<div className='page'>
						<h1> DASHBOARD </h1>
						<img src='images/adeptcontent.png' height='60%' width='60%'/>
						<input type='text'/>
					</div>			
				)
				break;
			default:
				break;				
		}
	}
})


ReactDOM.render(
  <Menu_icon />,
  document.getElementById('container')
);
