
// Return an attribut of angular element
function getElementAttribute(element, attribut)
    {
    
    if(typeof element[0].attributes[attribut] === "undefined") {
        return false;
    }    
        
    return element[0].attributes[attribut].nodeValue ;
    }