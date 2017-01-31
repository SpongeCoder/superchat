function number_format ( number, decimals, decPoint, thousandsSep ) {
    //  Example 1: number_format(1234.56)
    //  returns 1: '1,235'
    //  example 2: number_format(1234.56, 2, ',', ' ')
    //  returns 2: '1 234,56'
    //  example 3: number_format(1234.5678, 2, '.', '')
    //  returns 3: '1234.57'
    //  example 4: number_format(67, 2, ',', '.')
    //  returns 4: '67,00'

    number = ( number + "" ).replace( /[^0-9+\-Ee.]/g, "" );
    var n = !isFinite( +number ) ? 0 : +number;
    var prec = !isFinite( +decimals ) ? 0 : Math.abs( decimals );
    var sep = ( typeof thousandsSep === "undefined" ) ? "," : thousandsSep;
    var dec = ( typeof decPoint === "undefined" ) ? "." : decPoint;
    var s = "";
    var toFixedFix = function( n, prec ) {
        var k = Math.pow( 10, prec );
        return "" + ( Math.round( n * k ) / k ).toFixed( prec );
    };

    // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
    s = ( prec ? toFixedFix( n, prec ) : "" + Math.round( n ) ).split( "." );
    if ( s[ 0 ].length > 3 ) {
        s[ 0 ] = s[ 0 ].replace( /\B(?=(?:\d{3})+(?!\d))/g, sep );
    }
    if ( ( s[ 1 ] || "" ).length < prec ) {
        s[ 1 ] = s[ 1 ] || "";
        s[ 1 ] += new Array( prec - s[ 1 ].length + 1 ).join( "0" );
    }
    return s.join( dec );
}
