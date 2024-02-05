/**
 * 
 */

(function(API, $){
	API.myText = function(txt, options, x, y) {
        options = options ||{};
        /* Use the options align property to specify desired text alignment
         * Param x will be ignored if desired text alignment is 'center'.
         * Usage of options can easily extend the function to apply different text 
         * styles and sizes 
        */
        
        // Get current font size
        var fontSize = this.internal.getFontSize();
        
        // Get page width
        var pageWidth = this.internal.pageSize.width;
        
        // Get the actual text's width
        /* You multiply the unit width of your string by your font size and divide
         * by the internal scale factor. The division is necessary
         * for the case where you use units other than 'pt' in the constructor
         * of jsPDF.
         */
        var txtWidth = this.getStringUnitWidth(txt) * fontSize / this.internal.scaleFactor;
        
        if( options.align == "center" ){
            // Calculate text's x coordinate
            x = ( pageWidth - txtWidth ) / 2;
        } else if(options.align == "left"){
        	x = 10;
        } else if(options.align == "right"){
        	x = (pageWidth - txtWidth) - 10;
        }

        // Draw text at x,y
        this.text(txt,x,y);
    }
})(jsPDF.API, jQuery);