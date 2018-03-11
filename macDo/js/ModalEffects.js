/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var count = true; 
var ModalEffects = (function() {

	function init() {

		var overlay = document.querySelector( '.md-overlay' );

		[].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

			var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
				validate = modal.querySelector( '.md-validate' ),
				cancel = modal.querySelector('.md-cancel');
			var form = modal.querySelector('#form');
				

			function removeModal( hasPerspective ) {
				classie.remove( modal, 'md-show' );

				if( hasPerspective ) {
					classie.remove( document.documentElement, 'md-perspective' );
				}
			}

			function removeModalHandler() {
				removeModal( classie.has( el, 'md-setperspective' ) ); 
			}

			el.addEventListener( 'click', function( ev ) {
				classie.add( modal, 'md-show' );
				overlay.removeEventListener( 'click', removeModalHandler );
				overlay.addEventListener( 'click', removeModalHandler );

				if( classie.has( el, 'md-setperspective' ) ) {
					setTimeout( function() {
						classie.add( document.documentElement, 'md-perspective' );
					}, 25 );
				}
			});

			validate.addEventListener( 'click', function( ev ) {
				if(classie.has(validate, 'product') && count){
					//Retrieve data input
					var elDiv = document.getElementById('form').getElementsByTagName('*');
					var product = {nom:"", lipides:"", glucides:"", protides:"", autres:"", image:"", section:""};
					var err = false;
					for(var i = 0; i < elDiv.length; i++){
						if(elDiv[i].tagName == 'INPUT'){
							if(elDiv[i].value == ''){
								err =true;
								break;
							}else{
								product[elDiv[i].name] = String(elDiv[i].value).toLowerCase();
							}
							
						}
					}
					// Get the category
					if(document.getElementById('sections').selectedIndex == 0)
						err=true;
					else
						product['section'] = document.getElementById('sections').selectedIndex-1;
					if(err)
						alert('Une erreur est survenue, un champ n\'a pas été renseigné.');
					else{
						// We add the product to the current database
						DB.push(product);					
						// Update the table
						updateTable();
					}
					
				}else if(classie.has(validate, 'category') && count){
					var val = document.getElementById('new-cat').value;
					if(val == '')
						alert('Une erreur est survenue, un champ n\'a pas été renseigné.');
					else{
						SECTIONS.push(val);
						updateSections();
					}
				}
				count = !count;
				ev.stopPropagation();
				removeModalHandler();
			});
			cancel.addEventListener( 'click', function( ev ) {
				ev.stopPropagation();
				removeModalHandler();
			});

		} );

	}
	init();

})();