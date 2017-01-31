$( function() {
    var $formValidate = $( '.js-validate-form' );

    $formValidate.on( 'submit', function( event ) {
        var $input = $( this ).find( '.js-validate' );

        if ( !inputValidate( $input ) ) {
            event.preventDefault();
        }
    } );


} );
