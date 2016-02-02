
Crystal.React.About = React.createClass({
  render: function () {
    var imagePath = Crystal.imagePath('sf201');
    
    return (
    	<div className='mo-container about-container'>
    		<div className='mo-content about-content'>
          <h1>Crystal : Shadow Era Tools</h1>
    			
          <p>
    				Crystal is a toolbox for Shadows Era players.
    			</p>

    			<p>
    				It provides : 
    			</p>
				
    			<ul>
    				<li>a <a href='/cards'>Card Browser</a>, to easily find cards depending on their faction, class, tags, etc...
    				</li>
    				<li>a <a href='/decks'>Deck Builder</a>, to build and customize your deck
    				</li>
    			</ul>

    			<p>
    				<a href='http://www.shadowera.com/' target='_blank'>Shadows Era</a> is an online, multiplayer, free to play collectible trading card game. <br/>
    				It features deep strategy, easy gameplay, and gorgeous card art.
    			</p>
    		</div>
        
    		<img src={imagePath} className='mo-image'/>
    	</div>
    );
  }
});
