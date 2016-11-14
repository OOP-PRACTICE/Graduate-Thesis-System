/**
 * @module global
 */

try
{
	document.domain = 'localhost:81';
} catch ( e ){}

try
{
	top.location.href.indexOf( 'x' );
}
catch ( e )
{
	try
	{
		top.location = self.location;
	} catch ( e ){}
}

/**
 * 这个生成文档的时候有问题
 * 下面这些方法都是全局函数，不用加命名空间便可调用
 * @class window
 * @static
 */

/**
 * @method isUndefined
 * @param {Any} object
 * @return {Boolean}
 */

function isUndefined( object )
{
	return typeof object == 'undefined';
}

/**
 * @method isString
 * @param {Any} object
 * @return {Boolean}
 */

function isString( object )
{
    return typeof object == 'string';
}

/**
 * @method isElement
 * @param {Any} object
 * @return {Boolean}
 */

function isElement( object )
{
	return object && object.nodeType == 1;
}

/**
 * @method isFunction
 * @param {Any} object
 * @return {Boolean}
 */

function isFunction( object )
{
	return typeof object == 'function';
}

/**
 * @method isObject
 * @param {Any} object
 * @return {Boolean}
 */

function isObject( object )
{
	return typeof object == 'object';
}

/**
 * @method isArray
 * @param {Any} object
 * @return {Boolean}
 */

function isArray( object )
{
	//return object !== null && typeof object == 'object' && 'splice' in object && 'join' in object;
    return Object.prototype.toString.call( object ) === '[object Array]';
}

/**
 * @method isNumber
 * @param {Any} object
 * @return {Boolean}
 */

function isNumber( object )
{
	return typeof object == 'number';
}

/**
 * extend an object
 * @method $extend
 * @param {Object} object the object for extend
 * @param {Object} src the object will copy from
 */

function $extend( object , src )
{
	if( !src ) return object;
	for ( var p in src )
	{
		object[ p ] = src[ p ];
	}
	return object;
}

/**
 * create an DOM element
 * @method $element
 * @param {String} tagName
 * @return {HTMLElement}
 */

(function()
{
	var cache = {};
	
	$element = function( tagName )
	{
		tagName = tagName.toLowerCase();
		if ( !cache[ tagName ] )
		{
			cache[ tagName ] = document.createElement( tagName );
		}
		return $( cache[ tagName ].cloneNode( false ) );
	};
})();

/**
 * short cut for document.getElementById
 * @method $
 * @param {String} id
 * @return {HTMLElement}
 */

function $( id )
{
	var el;
	if ( isString( id ) || isNumber( id ) )
	{
		el = document.getElementById( id + '' );
	}
	else
	{
		el = id;
	}
	if ( !el ) return null;
	if( !el._extendLevel ) XN.element.extend( el );
	return el;
}

xn_getEl = $;

if( !Function.prototype.bind )
{
	Function.prototype.bind = function( object )
	{ 
		var method = this;
		return function()
		{ 
			method.apply( object , arguments ); 
		} 
	};
}

/*
 * patch for old version
 */

ge = getEl = $;
$xElement = $element;
$X = $;
/*
 * patch end
 */
/**
 * @module core
 */

/**
 * @class XN
 * @static
 */

/**
 * 动态加载文件
 * <br>
 * 动态加载某一文件<br>
 * XN.loadFile( 'http://rrimg.com/js/test.js' );<br>
 *
 * 一定要在页面中写入一个如下的标签<br>
 * &lt;script vsrc="http://rrimg.com/js/test.js?ver=$revxxx$"&gt;&lt;/script&gt;<br>
 *  这样loadFile函数将根据此标签获取正确的版本号，并在请求此文件时为其添加<br>
 *  
 *  http://rrimg.com/156454/js/test.js<br>
 *
 * @method loadFile
 * @param {String} file
 * @param {Function} callBack
 */
if (typeof XN == "undefined") {
    var XN = {};
}

var XN = {

	/**
	 * based on YAHOO.namespace
     * @namespace XN
	 * @method namespace
	 * @param  {String*} arguments 1-n namespaces to create 
	 * @return {Object}  A reference to the last namespace object created
	 */

	namespace : function()
	{
	    var a = arguments, o = null, i, j, d;
	    for ( i = 0 ; i < a.length ; i++ )
		{
	        d = a[ i ].split( '.' );
	        o = XN;
	
	        for ( j = ( d[0] == 'XN' ) ? 1 : 0; j < d.length; j++ )
			{
	            o[ d[ j ] ] = o[ d[ j ] ] || {};
	            o = o[ d[ j ] ];
	        }
	    }
		///o="xiaoneicom";
	    return o;		
	}
};


XN.namespace( 'ui' );
XN.namespace( 'util' );
XN.namespace( 'app' );
XN.namespace( 'page' );
XN.namespace( 'config' );

/*
 * patch for old version
 */

XN.APP = XN.App = XN.app;
XN.PAGE = XN.Page = XN.page;
XN.CONFIG = XN.Config = XN.config;

/*
 * patch end
 */
/**
 * @namespace XN
 * @property DEBUG_MODE
 * @type {Boolean}
 */

XN.DEBUG_MODE = false;

/**
 *  log message if the browser has console object
 * @method log
 * @param {Any} s
 */

/**
 * @class debug
 * @static
 */

XN.debug =
{
	/**
	 * log message if the browser has console object
	 * @method log
	 * @param {Any} s
	 */
	
	log : function(){},
	
	/**
	 * debug mode on
	 * @method on
	 */
	
	on : function()
	{
		XN.DEBUG_MODE = true;
		if ( window.console && console.log )
		{
			XN.debug.log = function( s )
			{
				console.log( s );
			}
		}
	},
	
	/**
	 * debug mode off
	 * @method off
	 */
	
	off : function()
	{
		XN.debug.log = function(){};
	}
};

XN.log = function( s )
{
	XN.debug.log( s );
}

/*
 * patch for old version
 */

XN.DEBUG = XN.Debug = XN.debug;
XN.debug.On = XN.debug.on;
XN.debug.Off = XN.debug.off;
/*
 * patch end
 */
/**
 * @module core
 */

/**
 * @namespace XN
 * @class env
 * @static
 */

XN.env =
{	
	/**
	 * @property domain
	 * @type {String}
	 * @default 'kaixin.com'
	 */
	
	domain : 'rzbys.cn',
	
	/**
	 * @property staticRoot
	 * @type {String}
	 * @default 'http://rrimg.com/'
	 */
	
	staticRoot : 'http://rzbys.cn/',
	
	/**
	 * @property swfRoot
	 * @type {String}
	 * @default 'http://static.kaixin.com'
	 */
	
	swfRoot : 'http://rzbys.cn/',
	
	/**
	 * @property wwwRoot
	 * @type {String}
	 * @default 'http://kaixin.com/'
	 */
	
	wwwRoot : 'http://rzbys.cn'
};

/*
 *  patch for old version
 */

XN.ENV = XN.Env = XN.env;

/*
 * patch end
 */
/**
 * @module core
 */

/**
 * @namespace XN
 * @class array
 * @static
 */

XN.array =
{
	
	/**
	 * build query string from array
	 * @namespace XN.array
	 * @method toQueryString
	 * @param {Array | hash} a
	 * @return {String}
	 */
	
	toQueryString : function( a , key )
	{
		var rt = [],t;
		for ( var k in a )
		{
			t = a[ k ];
			if ( isFunction( t ) ) continue;
			if ( isObject( t ) )
			{
				rt.push( arguments.callee( t , k ) );
			}
			else
			{
				if ( /^\d+$/.test( k ) )
				{
					rt.push( ( key || k ) + '=' + encodeURIComponent( t ) );
				}
				else
				{
					rt.push( k + '=' + encodeURIComponent( t ) );
				}	
			}
		}
		return rt.join( '&' );
	},
	
	/**
	 * Iterates over the array
	 * the callback function will receive index and value as the parameters
	 * @namespace XN.array
	 * @method each
	 * @param {Array} a
	 * @param {Function} func callback function
	 */
	
	each : function( a , func )
	{
        if ( !a ) return;

		if ( !isUndefined( a.length ) || !isUndefined( a[ 0 ] ) )
		{
			for ( var i = 0 , j = a.length; i < j; i++ )
			{
				if ( func.call( a , i , a[ i ] ) === false ) break;
			}
		}
		else
		{
			for ( var key in a )
			{
				if( !isFunction( a[ key ] ) )
				{
					if ( func.call( a , key , a[ key ] ) === false ) break;
				}
			}
		}
	},
	
	/**
	 * check if an array has item equal the value param
	 * @namespace XN.array
	 * @method include
	 * @param {Array} a
	 * @param {Any} value
	 * @return {Boolean}
	 */
	
	include : function( a , value )
	{
		var r = false;
		
		XN.array.each( a , function( i , v )
		{
			if ( v === value )
			{
				r = true;
				return false;
			}
		} );
		
		return r;
	},
	
	/**
	 * build array from an object like arguments
	 * @namespace XN.array
	 * @method build
	 * @param {Object} obj
	 * @return {Array}
	 */
	
	build : function( o )
	{
		var rt = [];
		for (var i = 0,j = o.length;i < j;i++)
		{
			rt.push( o[ i ] );
		}
		return rt;
	}
};

/*
 * patch for old version
 */

XN.ARRAY = XN.Array = XN.array;

/*
 * patch end
 */
/**
 * @module core
 */

/**
 * @namespace XN
 * @class string
 * @static
 */

XN.string = {
	/**
	 * replace '\n' with '<br />'
	 * @namespace XN.string
	 * @method nl2br
	 * @param {String} str
	 * @return {String}
	 */
	
	nl2br : function( str )
	{
		return str.replace( /([^>])\n/g , '$1<br />');
	},
	
	/**
	 * trim whitespace
	 * @namespace XN.string
	 * @method trim
	 * @param {String} str
	 * @return {String}
	 */
	
	trim : function( str )
	{
		return str.replace( /^\s+|\s+$/g , '' );
	},
	
	/**
	 * trim whitespace leftside
	 * @namespace XN.string
	 * @method ltrim
	 * @param {String} str
	 * @return {String}
	 */
	
	ltrim : function( str )
	{
		return str.replace( /^\s+/ , '' );
	},
	
	/**
	 * trim whitespace rightside
	 * @namespace XN.string
	 * @method rtrim
	 * @param {String} str
	 * @return {String}
	 */
	
	rtrim : function( str )
	{
		return str.replace( /\s+$/ , '' );
	},
	
	strip : function( str )
	{
    	return XN.string.trim( str );
	},
	
	/**
	 * remove tag like '<...>'
	 * @namespace XN.string
	 * @method stripTags
	 * @param {String} str
	 * @return {String}
	 */
	
	stripTags: function( str )
	{
		return str.replace( /<\/?[^>]+>/igm, '' );
	},
	
	/**
	 * replace char like '<','>' to '&lt;'...
	 * @namespace XN.string
	 * @method escapeHTML
	 * @param {String} str
	 * @return {String}
	 */
	
	escapeHTML : function(str)
	{
		return str.replace( /&/g ,'&amp;' )
		.replace( /</g , '&lt;' )
		.replace( />/g , '&gt;' );
	},
	
	/**
	 * replace '&lt;'... to '<'...
	 * @namespace XN.string
	 * @method unescapeHTML
	 * @param {String} str
	 * @return {String}
	 */
	
	unescapeHTML : function(str)
	{
		return str.replace( /&lt;/g ,'<' )
		.replace( /&gt;/g , '>' )
		.replace( /&nbsp;/g ,' ' )
		.replace( /&quot;/g , '"' )
		.replace( /&amp;/g , '&' );
	},
	
	/**
	 * if str include the keyword will return true 
	 * @namespace XN.string
	 * @method include
	 * @param {String} str
	 * @param {String} key the keyword
	 * @return {Boolean}
	 */
	
	include : function( str , key )
	{
		return str.indexOf( key ) > -1;
	},

	/**
	 * wether str starts with the keyword
	 * @namespace XN.string
	 * @method startsWith
	 * @param {String} str
	 * @param {String} key the keyword
	 * @return {Boolean}
	 */
		
	startsWith : function( str , key )
	{
		return str.indexOf( key ) === 0;
	},

	/**
	 * wether str ends with the keyword
	 * @namespace XN.string
	 * @method endsWith
	 * @param {String} str
	 * @param {String} key the keyword
	 * @return {Boolean}
	 */
	
	endsWith : function( str , key )
	{
	    var d = str.length - key.length;
	    return d >= 0 && str.lastIndexOf( key ) === d;	
	},
	
	/**
	 * check if the string is 'blank',meaning either empty or containing only whitespace
	 * @namespace XN.string
	 * @method isBlank
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	isBlank : function( str )
	{
		return /^\s*$/.test(str);
	},
	
	/**
	 * wether a string is an email address
	 * @namespace XN.string
	 * @method isEmail
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	isEmail : function( str )
	{
		return /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test( str );
	},
	
	/**
	 * wether a string is mobile phone number
	 * @namespace XN.string
	 * @method isMobile
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	isMobile : function( str )
	{
        return /^((\(\d{2,3}\))|(\d{3}\-))?((1[35]\d{9})|(18[89]\d{8}))$/.test(str);
	},
	
	/**
	 * @namespace XN.string
	 * @method isUrl
	 * @param {String} str
	 * @return {Boolean}
	 */	
	 
	isUrl : function(str)
	{
		return /^(http:|ftp:)\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/.test(str);
	},
	
	/**
	 * @namespace XN.string
	 * @method isIp
	 * @param {String} str
	 * @return {Boolean}
	 */
	 	
	isIp : function( str )
	{
		return /^(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])$/.test(str);
	},
	
	/**
	 * @namespace XN.string
	 * @method isNumber
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	isNumber : function( str )
	{
		return /^\d+$/.test( str );
	},

	/**
	 * @namespace XN.string
	 * @method isZip
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	isZip : function( str )
	{
		return /^[1-9]\d{5}$/.test( str );
	},
	
	/**
	 * @namespace XN.string
	 * @method isEN
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	isEN : function( str )
	{
		return /^[A-Za-z]+$/.test( str );
	},

	/**
	 * @namespace XN.string
	 * @method isJSON
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	isJSON : function( str )
	{
		if ( !isString( str ) || str === '') return false;
		str = str.replace( /\\./g , '@' ).replace( /"[^"\\\n\r]*"/g , '' );
		return ( /^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/ ).test( str );	
	},
    
    /**
     * get parameters from url
     * @method getQuery
     * @param {String} key
     * @param {String} url
     * @return {String | Array}
     */

    getQuery : function( key , url )
    {
        url = url || window.location.href;
        var rts = [],rt;
        queryReg = new RegExp( '(^|\\?|&)' + key + '=([^&]*)(?=&|#|$)' , 'g' );
        while ( ( rt = queryReg.exec( url ) ) != null )
        {
            rts.push( decodeURIComponent( rt[ 2 ] ) );
        }
        if ( rts.length == 0 ) return null;
        if ( rts.length == 1 ) return rts[ 0 ];
        return rts;
    },
    
    /**
     * set parameters for url
     * @method setQuery
     * @param {String} key
     * @param {String | Array} value
     * @param {String} url
     * @return {String}
     */

    setQuery : function( key , value , url )
    {
        
        url = url || window.location.href;
        url = url.replace( new RegExp( '(^|\\?|&)' + key + '=[^&]*(?=&|#|$)' , 'g' ) , '' );
        value = isArray( value ) ? value : [ value ];
        
        for ( var i = value.length - 1;i >= 0;i --)
        {
            value[ i ] = encodeURIComponent( value[ i ] );
        }

        var p = key + '=' + value.join( '&' + key + '=' );
        return url + ( /\?/.test( url ) ? '&' : '?' ) + p;
    }
};

/*
 *  patch for old version
 */

XN.String = XN.STRING = XN.string;

XN.string.isNum = XN.string.isNumber;

window.isJSON = XN.string.isJSON;

/*
 * patch end
 */
/**
 * @namespace XN
 * @class func
 * @static
 */

(function()
{
	runOnceFunc = {};
	
	XN.func = {
		
		/**
		 * refer to an empty function
		 * @property empty
		 * @type {Function}
		 */
		
		empty : function(){},
		
		/**
		 * run a function only once
		 * @method runOnce
		 * @param {Function} func
		 * @return {Any} the result the func return
		 */
		
		runOnce : function( func )
		{
			if( runOnceFunc[ func ] )return null;
			runOnceFunc[ func ] = true;
			return func();
		}
	};
})();

/*
 *  patch for old version
 */

XN.FUNC = XN.Func = XN.func;

/*
 * patch end
 */
/**
 * @module core
 */

(function()
{
	
	
	/**
	 * @namespace XN
	 * @class browser
	 * @static
	 */
	
	XN.browser = {
		
		/**
		 * @property IE
		 * @type {Boolean}
		 */
		
		IE : !!( window.attachEvent && !window.opera ),
		
		/**
		 * @property IE6
		 * @type {Boolean}
		 */
		
		IE6 : navigator.userAgent.indexOf( 'MSIE 6.0' ) > -1,
		
		/**
		 * @property IE7
		 * @type {Boolean}
		 */
		
		IE7 : navigator.userAgent.indexOf( 'MSIE 7.0' ) > -1,
		
		/**
		 * @property Opera
		 * @type {Boolean}
		 */
		
		Opera : !!window.opera,
		
		/**
		 * @property WebKit
		 * @type {Boolean}
		 */
		
		WebKit : navigator.userAgent.indexOf( 'AppleWebKit/' ) > -1,
		
		/**
		 * @property Gecko
		 * @type {Boolean}
		 */
		
		Gecko : navigator.userAgent.indexOf( 'Gecko' ) > -1 && navigator.userAgent.indexOf( 'KHTML' ) == -1,
		
		/**
		 * copy string to clipboard
		 * @param {String} str
		 */
		
		copy : function( o )
		{
            function onfail()
            {
                if ( isElement( o ) )
                {
                    o.select();
                }
            }
            
            var str;

			if ( isElement( o ) )
            {
                str = o.value;
            }
            else
            {
                str = o;
            }
			
			if ( window.clipboardData && clipboardData.setData )
			{
				if ( clipboardData.setData( 'text', str ) ) return true;
			}
			else
			{
				XN.DO.alert({
                    message : '您的浏览器不支持脚本复制,请尝试手动复制',
                    callBack : function()
                    {
                        onfail();
                    }
                });

				return false;
			}
			
			XN.DO.alert({
                message : '您的浏览器设置不允许脚本访问剪切板',
                callBack : function()
                {
                    onfail();
                }
            });


			return false;
		}
	};
})();
/*
 * patch for old version
 */

XN.BROWSER = XN.Browser = XN.browser;

/*
 * patch end
 */
/**
 * @module core
 */

/**
 * @namespace XN
 * @class cookie
 * @static
 */

XN.cookie = {
	
	/**
	 * get cookie
	 * @method get
	 * @param {String} name
	 */
	
	get : function( name )
	{
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for ( var i=0;i < ca.length; i++ )
		{
			var c = ca[ i ];
			while ( c.charAt(0) == ' ' ) c = c.substring( 1 , c.length );
			if ( c.indexOf( nameEQ ) == 0 ) return decodeURIComponent( c.substring( nameEQ.length , c.length ) );
		}
		return null;
	},
	
	/**
	 * set Cookie
	 * @method set
	 * @param {String} name
	 * @param {String} value
	 * @param {Int} days
	 * @param {String} path
	 * @param {String} domain
	 * @param {Boolean} secure
	 */
	
	set : function( name , value , days , path , domain , secure )
	{
		var expires;
		if ( isNumber( days ) )
		{
			var date = new Date();
			date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
			expires = date.toGMTString();
		}
		else if ( isString( days ) )
		{
			expires = days;
		}
		else
		{
			expires = false;
		}
		
		document.cookie = name + '=' + encodeURIComponent( value ) +
				(expires ? ';expires=' + expires  : '') +
				(path ? ';path=' + path : '') +
				(domain ? ';domain=' + domain : '') +
				(secure ? ';secure' : '');
	},
	
	/**
	 * delete Cookie
	 * @method del
	 * @param {String} name
	 * @param {String} path
	 * @param {String} domain
	 * @param {Boolean} secure
	 */
	
	del : function( name , path , domain , secure )
	{
		XN.cookie.set( name , '' , -1 , path , domain , secure );
	}
};

/*
 * patch for old version
 */

XN.COOKIE = XN.Cookie = XN.cookie;

/*
 * patch end
 */
/**
 * @namespace XN
 * @class event
 * @static
 */

(function()
{
	var browser = XN.browser;
	
	XN.event =
	{
		/**
		 * @method isCapsLockOn
		 * @param {Object} e the event object
		 * @return {Boolean}
		 */
		
		isCapsLockOn : function( e )
		{
			var c = e.keyCode || e.which;
			var s = e.shiftKey;
			if ( ( ( c >= 65 && c <= 90 ) && !s ) || ( (c >=97 && c <= 122) && s) ) return true;
			return false;
		},
		
		/**
		 * get event src element
		 * @method element
		 * @param {Object} e the event object
		 * @return {HTMLElement}
		 */
		
		element : function( e )
		{
			var n = e.target || e.srcElement;
			return This.resolveTextNode( n );
		},
		
		/**
		 * get related element of event as 'mouseover'
		 * @method relatedTarget
		 * @param {Object} e
		 * @return {HTMLElement}
		 */
		
		relatedTarget: function( e ) {
			var t = e.relatedTarget;
			if ( !t )
			{
			    if ( e.type == 'mouseout' || e.type == 'mouseleave' )
				{
			        t = e.toElement;
			    }
				else if ( e.type == 'mouseover' )
				{
			        t = e.fromElement;
			    }
			}	
			return This.resolveTextNode( t );
		},
		
		resolveTextNode: function( n )
		{
			try
			{
			    if ( n && 3 == n.nodeType ) 
				{
			        return n.parentNode;
			    }
			} catch(e) {}
			
			return n;
		},
		
		/**
		 * get mouse pointer pose x
		 * @method pointerX
		 * @param {Object} event
		 * @return {Int}
		 */
		
		pointerX : function( event )
		{
			return event.pageX || ( event.clientX + ( document.documentElement.scrollLeft || document.body.scrollLeft ) );
		},
		
		/**
		 * get mouse pointer pose y
		 * @method pointerY
		 * @param {Object} event
		 * @return {Int}
		 */
		
		pointerY : function( event )
		{
			return event.pageY || ( event.clientY + ( document.documentElement.scrollTop || document.body.scrollTop ) );
		},
		
		/**
		* 判断当前页面是否是标准模式
		*/
		
		isStrictMode:document.compatMode!="BackCompat",
		
		/**
		 * get page height
		 * @method pageHeight
		 * @return {Int}
		 */
		
		pageHeight : function()
		{
			return this.isStrictMode ? Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight) : Math.max(document.body.scrollHeight,document.body.clientHeight);
		},
		
		/**
		 * get page width
		 * @method pageWidth
		 * @return {Int}
		 */
		
		pageWidth : function()
		{
	  		return this.isStrictMode ? Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth) : Math.max(document.body.scrollWidth,document.body.clientWidth);
		},
		
		/**
		 * get inner width of window
		 * @method winWidth
		 * @return {Int}
		 */
		
		winWidth	: function()
		{
			return this.isStrictMode ?  document.documentElement.clientWidth : document.body.clientWidth;
		},
		
		/**
		 * get inner height of window
		 * @method winHeight
		 * @return {Int}
		 */
		
		winHeight : function()
		{
			return this.isStrictMode ? document.documentElement.clientHeight : document.body.clientHeight;
		},
		
		/**
		 * get scrollTop of document
		 * @method scrollTop
		 * @return {Int}
		 */
		
		scrollTop : function()
		{
			return this.isStrictMode ? document.documentElement.scrollTop : document.body.scrollTop;
		},
		
		/**
		 * get scrollLeft of document
		 * @method scrollLeft
		 * @return {Int}
		 */
		
		scrollLeft:function()
		{
			return this.isStrictMode ? document.documentElement.scrollLeft : document.body.scrollLeft;
		},
		
		/**
		 * stop event bubble
		 * @method stop
		 * @param {Object} event
		 */
    	
		stop	:null,
		
		addEvent	: null,
		delEvent	: null,
		
		/**
		 * enable custom event for an object
		 * @param {Object} obj
		 * @return {Object}
		 */
		enableCustomEvent : function( obj )
		{
			$extend( obj , 
			{
				addEvent : function( type , func )
				{
					if( !this._customEventListeners ) this._customEventListeners = {};
					var funcs = this._customEventListeners;
					if( isUndefined( funcs[type] ) )
					{
						funcs[ type ] = [];
					}
					funcs[ type ].push( func );
					return this;
				},
				delEvent : function( type , func ) 
				{
					var funcs = this._customEventListeners[ type ];
					if ( funcs )
					{
						for( var i = funcs.length - 1; i >= 0;i-- )
						{
							if( funcs[i] == func )
							{
								funcs[i] = null;
								break;
							}
						}
					}
					return this;
				},
				fireEvent : function( type )
				{
					if( !this._customEventListeners || !this._customEventListeners[ type ] )return;
					var funcs = this._customEventListeners[ type ],ars = XN.array.build( arguments );
					ars.shift();
					for( var i = 0, j = funcs.length; i < j; i++ )
					{
						if( funcs[ i ] )
							funcs[ i ].apply( this , ars );
					}
				}
			});
			
			return obj;
		}		
	};
	
	var This = XN.event;
	
	if ( browser.IE )
	{
		This.stop = function( event )
		{
			event.returnValue = false;
			event.cancelBubble = true;			
		}
	}
	else
	{
		This.stop = function( event )
		{
			event.preventDefault();
			event.stopPropagation();		
		}
	}
	
	var ismouseleave = function( event , element )
	{
		var p = event.relatedTarget;
		while ( p && p != element ) try { p = p.parentNode; } catch(error) { p = element; }
		return p !== element;
	}
	
	if (window.attachEvent && !browser.Opera)
	{
		This.addEvent = function( element , name , func )
		{
			 if (name == 'keypress') name = 'keydown';
			 if (name == 'input' ) name = 'propertychange';
			return $( element ).attachEvent( 'on' + name , func );
		};
		This.delEvent =  function( element , name , func )
		{
			if (name == 'keypress') name = 'keydown';
			if (name == 'input' ) name = 'propertychange';
			return $( element ).detachEvent( 'on' + name , func );
		};
	}
	else if ( window.addEventListener )
	{
		
		/**
		 * add event for element
		 * @namespace XN.event
		 * @method addEvent
		 * @param {HTMLElement | String} element
		 * @param {String} name
		 * @param {Function} func
		 * @param {Boolean} useCapture
		 * @return {HTMLElement}
		 */
		
		This.addEvent = function( element , name , func , useCapture )
		{
			element = $( element );
			if ( name == 'mouseleave' )
			{
				element.onmouseleave = function( e )
				{
                    e = e || window.event;
					if ( ismouseleave( e , element ) && func ) func.call( element , e );
				};
				element.addEventListener( 'mouseout' , element.onmouseleave , useCapture );
				return element;
			}
			if ( name == 'keypress' && browser.WebKit ) name = 'keydown';
			element.addEventListener( name , func , useCapture );
			return element;
		};
		
		/**
		 * del event 
		 * @method delEvent
		 * @param {HTMLElement | String} element
		 * @param {String} name
		 * @param {Function} func
		 * @param {Boolean} useCapture
		 * @return {HTMLElement}
		 */
		
		This.delEvent = function(element,name,func,useCapture) {
			element = $(element);
			if ( name == 'mouseleave' )
			{
				element.removeEventListener( 'mouseout' , element.onmouseleave , useCapture );
				return element;
			}
			if ( name == 'keypress' && browser.WebKit ) name = 'keydown';
			element.removeEventListener( name , func , useCapture );
			return element;
		};
	}
    
})();

/*
 * patch for old version
 */

XN.EVENT = XN.Event = XN.event;

/*
 * patch end
 */
/**
 * @namespace XN
 * @class dom
 * @static
 */

(function()
{
	var Event = XN.event;
	var array = XN.array;
	var browser = XN.browser;
	
	var domLoaded = false;
	
	var domloadHooks = [];
	
	
	function runHooks()
	{
		if( !domloadHooks )return;

        XN.array.each( domloadHooks , function( i , v )
		{
			try
			{
                v();
			}
			catch( e )
			{
				if( XN.DEBUG_MODE ) throw e;
			}
		} );
	}

	var shadowElement = null;
	
	function createShadow( opacity )
	{
        opacity = opacity || 0.3;
		
        var el = $element( 'div' );
		
        shadowElement = el;
		
        el.setStyle( [ 'position:absolute;',
                        'top:0;',
                        'left:0;',
                        'background:#000;',
                        'z-index:2000;',
                        'opacity:' + opacity + ';',
                        'filter:alpha(opacity=' + ( opacity * 100 ) + ');'
                    ].join( '' ));
		//hack ie6
		if ( XN.browser.IE6 )
        {
			el.innerHTML= [ '<iframe width="100%" height="100%" frameBorder="0" style="position:absolute;top:0;left:0;z-index:1;"></iframe>',
                            '<div style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000000;z-index:2;height:expression(this.parentNode.offsetHeight);" onmousewheel="return false;"></div>' ].join( '' );
		}		
		
        function resize()
        {
		    el.hide();
            el.style.height = XN.event.pageHeight() + 'px';
		    el.style.width = XN.event.pageWidth() + 'px';
			el.show();					
        }
		
        resize();

        XN.event.addEvent( window , 'resize',function(e)
        {
			if ( shadowElement && shadowElement.style.display != "none" )
            {
                try
                {
                    resize();
				}
				catch(e){}
            }
		});
		
		document.body.appendChild( el );
	}
	
	XN.dom = {
		
		/**
		 * disable user interface
		 * @method disable
		 * @param {Float} opacity
		 */
		
		disable : function( opacity )
		{
			if ( !shadowElement ) createShadow( opacity );
			if ( XN.browser.IE6 )
            {
				document.getElementsByTagName("html")[0].style.overflow="hidden";
				document.body.style.overflow="hidden";
			}
		},
		
		/**
		 * enable user interface
		 * @method enable
		 */
		
		enable : function()
		{
            if ( shadowElement )
            {
				if ( XN.browser.IE6 )
                {
					document.getElementsByTagName("html")[0].style.overflow="";
					document.body.style.overflow="";
				}

				shadowElement.remove();
				shadowElement = null;
			}
		},
		
		/**
		 * insert element after another
		 * @method insertAfter
		 * @param {HTMLElement} element
		 * @param {HTMLElement} targetElement
		 */
		
		insertAfter : function( element , targetElement )
		{
			element = $( element );
			targetElement = $( targetElement );
			
			var parent = targetElement.parentNode;
			if ( parent.lastChild == targetElement )
			{
				parent.appendChild( element );
			}
			else
			{
				parent.insertBefore( element, targetElement.nextSibling );
			}
		},
		
		/**
		 * get elements by classname
		 * @param {String} className
		 * @param {HTMLElement | String} element
		 * @param {String} tagName
         * @return {Array}
		 */
		
		getElementsByClassName : function( className , element , tagName )
		{ 
			var c = ( $( element ) || document ).getElementsByTagName( tagName || '*' ) || document.all; 
			var elements = []; 
			var _exp = new RegExp( '\\b' + className + '\\b' );
			
			array.each( c , function( i , v )
			{
				if ( _exp.test( v.className ) ) elements.push( v );
			} );
			
	  		return elements; 
		},
		
		/**
		 * registor dom load event
		 * @method readyDo
		 * @param {Function} f
		 */
		
		ready : function( f )
		{
			domLoaded ? f() : domloadHooks.push( f );
		},
		
		/**
		 * preload Image
		 * @method preloadImg
		 * @param {String | Array} src
		 */
		
		preloadImg : function( src )
		{
			src = isArray( src ) ? src : [ src ];
			array.each( src , function( i , v )
			{
				new Image().src = v;
			} );
		}
	};
	
	if ( browser.WebKit )
	{
		var timer = setInterval( function()
		{
			if( /loaded|complete/.test( document.readyState ) )
			{
				domLoaded = true;
				runHooks();
				clearInterval( timer );
			}
		} , 10 ); 
	}
	else if ( document.addEventListener )
	{
		document.addEventListener( 'DOMContentLoaded' , function()
		{
			domLoaded = true;
			runHooks();
		} , false );
	}
	else
	{
		var timer = setInterval( function()
		{
            try
			{
                document.body.doScroll('left');
                clearInterval( timer );
                domLoaded = true;
				runHooks();
            } catch (e) {}
        } , 20 ); 
	}
})();


/*
 *  patch for old version
 */

XN.DOM = XN.Dom = XN.dom;
XN.dom.readyDo = XN.dom.ready;

XN.dom.ready( function()
{
    $ = ge = getEl = xn_getEl;
});

/*
 * patch end
 */



(function()
{
    var files = {};
    var version = {};
    
    function hasLoad( file )
    {
        return !!getFile( file );
    }

    function getFile( file )
    {
        return files[ encodeURIComponent( file ) ];
    }
    
    function mark( file )
    {
        var obj = {};
        obj.file = file;
        obj.isLoad = true;
        files[ encodeURIComponent( file ) ] = obj;
    }

    function addFile( file )
    {
        var obj = {};
        obj.file = file;
        obj.isLoaded = false;
        XN.EVENT.enableCustomEvent( obj );
        
        obj.addEvent( 'load' , function()
        {
            this.isLoaded = true;
        });

        files[ encodeURIComponent( file ) ] = obj;

        var el = $element( 'script' );
        el.type="text/javascript";
        el.src = file;

        obj.element = el;
        
        if ( XN.Browser.IE )
        {
            el.onreadystatechange = function()
            {
                if ( ( this.readyState == 'loaded' || this.readyState == 'complete' ) && !this.hasLoad )
                {
                    this.hasLoad = true;
                    getFile( file ).fireEvent( 'load' );
                }
            }
        }else{
            el.onload = function()
            {
                getFile( file ).fireEvent( 'load' );
            };
        }

        document.getElementsByTagName( 'head' )[ 0 ].appendChild( el );
    }

    function loadFile( file , callBack )
    {
        file = getFullName( file );
        
        if ( /\.js(\?|$)/.test( file ) )
        {
            if ( !hasLoad( file ) )
            {
                addFile( file );
            }
            
            if ( !callBack ) return;
            
            if ( getFile( file ).isLoaded )
            {
                callBack.call( getFile( file ) );
            }
            else
            {
                getFile( file ).addEvent( 'load' , callBack );
            }
        }
        else if ( /\.css(\?|$)/.test( file ) )
        {
            if ( hasLoad( file ) ) return;
            mark( file );
            var el = $element( 'link' );
            el.rel = 'stylesheet';
            el.type = 'text/css';
            el.href = file;
            document.getElementsByTagName( 'head' )[ 0 ].appendChild( el );
            if ( callBack ) callBack.call( getFile( file ) );
        }
    }
    
    function getFullName( file )
    {
        XN.func.runOnce( loadVersion );
        return version[ file ] || file;
    }

    function getVersion( file )
    {
        var match;
        if ( match = new RegExp( '(' + XN.env.staticRoot + ')' + '(\\d+)/([^\?]*)' ).exec( file ) )
        {
            version[ match[ 1 ] + match[ 3 ] ] = file;
        }
        else if ( match = new RegExp( '(.*)\\?ver=(\d+)(\..*)' ).exec( file ) )
        {
            version[ match[ 1 ] ] = file;
        }
    }
    
    XN.getFileVersion = function( files )
    {
        XN.array.each( files , function( i , v )
        {
            getVersion( v );
        });
    };

    XN.loadFile = function( file , callBack )
    {
        loadFile( file , callBack );
    };

    XN.loadFiles = function( files , callBack )
    {
        var f = files.length;
        
        function isAllLoad()
        {
            f --;
            if ( f === 0 && callBack ) callBack();
        }

        XN.array.each( files , function( i , v )
        {
            XN.loadFile( v , isAllLoad );
        });
    };

    XN.getVersion = function( file )
    {
        getVersion( file );
    }

    function loadVersion()
    {

        XN.array.each( document.getElementsByTagName( 'script' ) , function( i , v )
        {
            if ( v.src )
            {
                mark( v.src );
                getVersion( v.src );
            }

            if ( v.getAttribute( 'vsrc' ) ) getVersion( v.getAttribute( 'vsrc' ) );
        } );

        XN.array.each( document.getElementsByTagName( 'link' ) , function( i , v )
        {
            if ( v.rel && v.rel == 'stylesheet' )
            {
                mark( v.href );
                getVersion( v.href );
            }

            if ( v.getAttribute( 'vhref' ) ) getVersion( v.getAttribute( 'vhref' ) );
        } );

    }

    XN.dynamicLoad = function( file )
    {
        XN.array.each( file.funcs , function( i , func )
        {
            window[ func ] = function()
            {
                var ars = arguments;
                
                window[ func ] = null;
                if ( file.file )
                {
                    file.files = [ file.file ];
                }

                XN.loadFiles( file.files , function()
                {
                    window[ func ].apply( null , ars );
                });
            };    
        });
    };
})();
/**
 * @namespace XN
 * @class element
 * @static
 */

(function()
{
	var addEvent = XN.event.addEvent;
	var delEvent = XN.event.delEvent;
	var browser = XN.browser;

	XN.element = {
        
        /**
         * 清空元素的innerHTML
         * @method clear
         * @param {HTMLElement | String} element
         * @return {HTMLElement}
         */

	    clear : function( element )
        {
            element = $( element );
            element.innerHTML = '';
            return element;
        },

		/**
		 * simple hover
		 * @method hover
		 * @param {HTMLElement | String} element the element hover on
		 * @param {String} className hover class
		 * @param {HTMLElement | String} hover add class to
		 */
		
		hover : function( element , className , hover )
		{
			element = $( element );
			hover =  hover ? $( hover ) : element;
			
			addEvent( element , 'mouseover' , function()
			{
				hover.addClass( className );
			} , false );
			
			addEvent( element ,'mouseleave' , function()
			{
				hover.delClass(className);
			}, false );
            
            return element;
		},
		
		/**
		 * scroll page to element
		 * @method scrollTo
		 * @param {HTMLElement} element
		 * @param {String} effect
		 */
		
		/*
		 *  rewrite later
		 */
		
		scrollTo : function(element,effect) {
			element = $(element);
			effect = effect || 'normal';
			switch(effect){
				case 'slow':
				XN.EFFECT.scrollTo(element);
				break;
				default:
				window.scrollTo(0,element.realTop());
				break;
			}
			return element;
		},
		
		/**
		 * check if an element is visible
		 * @method visible
		 * @param {HTMLElement | String} element
		 * @return {Boolean}
		 */
		
		visible : function( element )
		{
			element = $( element );
			return element.style.display != 'none' && element.style.visibility != 'hidden';
		},
		
        /**
         * 来回开关一个元素的某个样式
         * <pre>
         *  &lt;div onclick="$(this).toggleClass('expand');"&gt;&lt;/div&gt;
         * </pre>
         * @method toggleClass
         * @param {HTMLElement | String} element
         * @return {HTMLElement}
         */

        toggleClass : function( element , className )
        {
            if ( This.hasClassName( element , className ) )
            {
                This.delClass( element , className );
            }
            else
            {
                This.addClass( element , className );
            }
            return $( element );
        },

		/**
		 * check if an element has given className
		 * @method hasClassName
		 * @param {HTMLElement | String} element
		 * @param {String} className
		 * @return {Boolean}
		 */
		
		hasClassName : function( element , className )
		{
			return new RegExp( '\\b' + className + '\\b' ).test( $( element ).className );
		},
	    	
		/**
		 * add classname to an element
		 * @method addClass
		 * @param {HTMLElement | String} element
		 * @param {String} className
		 * @return {HTMLElement}
		 */
		
		addClass : function( element , className )
		{
			element = $(element);
			if ( This.hasClassName( element , className ) )return element;
			element.className += ' ' + className;
			return element;
		},
		
		/**
		 * del className from an element
		 * @method delClass
		 * @param {HTMLElement | String} element
		 * @param {String} className
		 * @return {HTMLElement}
		 */
		
		delClass : function( element , className )
		{
			element = $(element);
			element.className = element.className.replace( new RegExp( '\\b' + className + '\\b' ) , '' );
			return element;
		},
		
		/**
		 * show an element
		 * @method show element
		 * @param {HTMLElement | String} element
		 * @param {String} effect
		 * @return {HTMLElement}
		 */
		
		/*
		 * rewrite later
		 */
		
		show : function (element,effect){
			element = $(element);
			if(element.style.display != 'none')return;
			effect = effect || 'normal';
		 	switch(effect){
				case 'normal':
				element.style.display = '';
				break;
				case 'fade':
				XN.EFFECT.fadeIn(element,function(e){
					e.style.display = '';
				});
				break;
				case 'slide':
				XN.EFFECT.slideOpen(element);
				break;
				case 'delay':
				setTimeout(function(){
					element.style.display = '';
				},2000);
				break;
			}
			return element;
		},
		
		/**
		 * hide an element
		 * @method hide
		 * @param {HTMLElement} element
		 * @param {String} effect
		 * @return {HTMLElement}
		 */
		
		/*
		 * rewrite later
		 */
		
		hide : function (element,effect){
			element = $(element);
			if(element.style.display == 'none')return;
			effect = effect || 'normal';
		 	switch(effect){
				case 'normal':
				element.style.display = 'none';
				break;
				case 'fade':
				XN.EFFECT.fadeOut(element,function(e){
					e.style.display = 'none';
				});
				break;
				case 'slide':
				XN.EFFECT.slideClose(element);
				break;
				case 'delay':
				setTimeout(function(){
					element.style.display = 'none';
				},2000);
				break;
			}
			return element;
		},
		
		/**
		 * remove element from the DOM
		 * @method remove
		 * @param {HTMLElement | String} element
		 * @return {HTMLElement}
		 */
		
		remove : function( element )
		{
			var element = $(element);
			element.parentNode.removeChild( element );
			return element;
		},
		
		/**
		 * set style for an element
		 * @method setStyle
		 * @param {HTMLElement | String} element
		 * @param {String} style
		 * @return {HTMLElement}
		 */
		
		setStyle : function( element , style )
		{
			var element = $(element);
			element.style.cssText += ';' + style;
			return element;
		},
		
		/**
		 * get style by style name
		 * @param {HTMLElement | String} element
		 * @param {String} name
		 * @return {String}
		 */
		
		getStyle : function( element , style )
		{
			element = $(element);
			
			style = style == 'float' ? 'cssFloat' : style;
			
			var value = element.style[ style ];
			
			if ( !value )
			{
				var css = document.defaultView.getComputedStyle( element , null );
				value = css ? css[style] : null;
			}
			
			if ( style == 'opacity' ) return value ? parseFloat( value ) : 1.0;
			
			return value == 'auto' ? null : value;
		},
		
		/**
		 * @method addEvent
		 * @return {HTMLElement}
		 * @see XN.event.addEvent
		 */
		
		addEvent : function()
		{
			addEvent.apply( null , arguments );
			return arguments[0];
		},
		
		/**
		 * @method delEvent
		 * @return {HTMLElement}
		 * @see XN.event.delEvent
		 */
		
		delEvent : function()
		{
			delEvent.apply( null , arguments );
			return arguments[0];
		},
		
		/**
		 * add Child node to element
		 * @method addChild
		 * @param {HTMLElement | String} father
		 * @param {HTMLElement | String | XN.ui.element | XN.net.xmlhttp} child
		 * @return {HTMLElement}
		 */
		
		addChild : function( father , child )
		{
			father = $( father );
			
			if ( isString( child ) )
			{
				var element = ( child.substring( 0 , 1 ) == '#' ) ? $( child.substring( 1 , child.length ) ) : child;
				if( isString( element ) )
				{
					father.innerHTML += element;
				}
				else
				{
						father.appendChild( element );
				}
			}
			else if ( isElement( child ) )
			{
				father.appendChild( child );
			}
			else if( child.iAmUIelement )
			{
				father.appendChild( $( child.frame ) );
			}
			else if( child.iAmXmlhttp )
			{
				child.fillTo = father;
				father.startLoading();
			}
			return father;
		},
		
		/**
		 * 
		 * @method delChild
		 * @param {HTMLElement | String} father
		 * @param {HTMLElement | String | XN.ui.element } child
		 * @return {HTMLElement}
		 */
		
		delChild : function( father , child )
		{
			child = $( child );
			child.remove();
			return $( father );
		},
		
		/**
		 * @method setContent
		 * @param {HTMLElement | String} element
		 * @param {HTMLElement | String | XN.ui.element | XN.net.xmlhttp} c
		 * @return {HTMLElement}
		 */
		
		setContent : function( element , c )
		{
			element = $( element );
			element.innerHTML = '';
			element.addChild( c );
			return element;
		},
		getPosition : function( element , parentE )
		{
			parentE = $( parentE ) || document.body;
			element = $( element );
			var rl = 0;
			var rt = 0;
			var p = element;
            //fix ie7 未指明的错误
            try{
			    while ( p && p != parentE )
			    {
			    	rl += p.offsetLeft;
			    	rt += p.offsetTop;
		    		p = p.offsetParent;
			    }
            }catch(e){}
			return { 'left' : rl , 'top' : rt };
		},
		
        /**
         * 获取元素的绝对左边距
         * @method realLeft
         * @param {HTMLElement | String} element
         * @return {Int}
         */

		realLeft : function( element , p )
		{
			return This.getPosition( element , p || null ).left;
		},
		
		/**
         * 获取元素的绝对上边距
         * @method realTop
         * @param {HTMLElement | String} element
         * @return {Int}
         */

        realTop : function( element , p )
		{
			return This.getPosition( element , p || null ).top;
		},
        
        /**
         * 在一个div内显示loading的图标,用于ajax动态加载数据
         * 
         * <pre>
         * $( 'message' ).startLoading( 'loading...' );
         * </pre>
         * @method startLoading
         * @param {HTMLElement | String} element
         * @param {String} msg loading时的提示信息
         * @return {HTMLElement}
         */

        startLoading : function( element , msg )
        {
            element = $( element );
            element.innerHTML = '<center><img src=\"' + XN.ENV.staticRoot + 'img/indicator.gif\" />' + (msg || '加载中...') + '</center>';
            return element;
        },
        
        stopLoading:function( element )
        {
            element = $( element );
            return element;
        }
	};
	
	XN.element.extend = function( element )
	{
		if ( element._extendLevel )return element;
		var cache = This.extend.cache;
		for ( var m in This )
		{
			if ( !( m in element ) )
			{
				element[ m ] = cache.findOrStore( This[ m ] );
			}
		}
		return element;
	};
	
	XN.element.extend.cache = {
	  findOrStore : function( value )
	  {
	  	return this[ value ] = this[ value ] || function()
		{
	  		return value.apply( null , [ this ].concat( XN.array.build( arguments ) ) );
		};
	  }		
	};
	
	var This = XN.element;
	
	if( browser.IE )
	{
		XN.element.getStyle = function( element , style )
		{
		    element = $( element );
		    style = ( style == 'float' || style == 'cssFloat' ) ? 'styleFloat' : style;
		    var value = element.style[ style ];
		    if ( !value && element.currentStyle ) value = element.currentStyle[ style ];
		
		    if ( style == 'opacity' )
			{
		      if (value = ( element.getStyle('filter') || '' ).match( /alpha\(opacity=(.*)\)/ ) )
		        if ( value[ 1 ] ) return parseFloat( value[ 1 ] ) / 100;
		      return 1.0;
		    }
		
		    if ( value == 'auto' )
			{
		      if ( (style == 'width' || style == 'height' ) && ( element.getStyle( 'display' ) != 'none') )
		        return element[ 'offset'+ ( style == 'width' ? 'Width' : 'Height' ) ] + 'px';
		      return null;
		    }
		    return value;			
		}
	}

    /**
     * 设置元素透明度
     * <pre>
     *  XN.element.setOpacity( el , 0.3 );
     *  or
     *  $( el ).setOpactiy( 0.3 );
     * </pre>
     * @method setOpacity
     * @param {Float} opacity
     * @return {HTMLElement}
     */
    if ( document.addEventListener )
    {
        XN.element.setOpacity = function( element , opacity )
        {
            element = $( element );
            element.style.opacity = opacity;
            return element;
        };
    }
    else
    {
        XN.element.setOpacity = function( element , opacity )
        {
            element = $( element );
            element.style.zoom = 1;
            element.style.filter = 'Alpha(opacity=' + Math.ceil( opacity * 100 ) + ')';
            return element;            
        };
    }
})();

/*
 *  patch for old version
 */

XN.ELEMENT = XN.Element = XN.element;

/*
 * patch end
 */
/**
 * @namespace XN
 * @class net
 * @static
 */

XN.namespace( 'net' );


XN.net.proxys = {};

/**
 * send form by xmlhttp<br />
 * the params is like {url:'',form:'',method:'',onSuccess:'',onError:''}
 * @namespace XN.net 
 * @method sendForm 
 * @param {Object} params
 * @return {XN.net.xmlhttp}
 * @requires xn.form.js
 */

XN.net.sendForm = function( params )
{
    XN.log( 'send form' );
	params.data = XN.FORM.serialize( params.form );
	return new XN.net.xmlhttp( params );
};



/**
 * 参数形式
 * <pre>
 * {
 *  url:'',
 *  data:'',
 *  useCache:true,
 *  method:'get',
 *  onComplete:functoin,//请求完成回调
 *  onSuccess:function,//请求成功回调
 *  onError:''//请求失败回调
 *  }
 *
 *  注意: 302重定向属于失败状态
 *  
 *  callBack = function(r)
 *  {
 *      if ( r.status == 302 )
 *      {
 *      }
 *  }
 *  
 *  回调函数可以通过r.status判断是否重定向
 *  </pre>
 * @namespace XN.net
 * @class xmlhttp
 * @constructor
 * @param {Object} params
 */

XN.net.xmlhttp = function( params )
{
    var This = this;

    if ( !XN.net.cache )
    {
         XN.net.cache = new XN.util.cache()
    }

	/*
	 * patch for old version
	 */
	var ars = arguments;
	if ( ars.length > 1 )
	{
		this.url = ars[ 0 ] || null;
		this.data = ars[ 1 ] || '';
		this.onSuccess = ars[ 2 ];
		$extend( this , ars[ 3 ] );
		init( window );
		return this;
	}
	/*
	 * patch end
	 */
	
	$extend( this , params );

    var cache;
	
    if ( this.useCache && ( cache = XN.net.cache.get( this.url + encodeURIComponent( this.data ) ) ) )
    {
        this.transport = {};
        this.transport.responseText = cache;
        setTimeout( function()
        {
            This._onComplete( );
            This._onSuccess( );
        }, 0 );
        return this;
    }

    function getDomain( link )
    {
        var a = $element( 'a' );
        a.href = link;
        return a.hostname;
    }



    if ( /^http/.test( this.url ) )
    {
        var cd = getDomain( window.location.href );
        var nd = getDomain( this.url );
        
        if ( cd != nd )
        {
            if ( XN.net.proxys[ nd ] )
            {
                init( XN.net.proxys[ nd ] );
                return This;
            }
            else
            {
                var iframe = $element( 'iframe' ).hide();
                iframe.src = 'http://' + nd + '/ajaxProxy.html';
                document.body.appendChild( iframe );
                XN.event.addEvent( iframe , 'load' , function()
                {
                    try
                    {
                        init( iframe.contentWindow );
                        XN.net.proxys[ nd ] = iframe.contentWindow;
                    }
                    catch(e){}
                });
                return This;
            }
        }
        else
        {
            init( window );
        }
    }
    else
    {
        init( window );
    }
    
    function init( w )
    {
        This.transport = This.getTransport( w );

        if ( This.url && This.url !=='' )
        {
            This.send( This.method );
        }    
    }

};

XN.net.xmlhttp.prototype =
{
	url : null,
	data : '',
	onSuccess : null,
	onFailure : null,
	onError : null,
	fillTo : null,
	method : 'post',
	asynchronous : true,
	transport : null,
	headers : null,
	iAmXmlhttp:true,
    useCache : false,
	
	
	/**
	 * 取消当前请求
	 * @method abort
	 */
	
	abort:function(){
		this.transport.abort();
	},

	send:function( method )
	{
		var _url;
	    

		if ( method == 'get' && this.data !== '' )
		{
			_url = this.url + (/\?/.test(this.url) ? '&' : '?') + this.data;			
		}
		else
		{
			_url = this.url;
		}
		

		if( this.asynchronous )
		{
			this.transport.onreadystatechange = this.onStateChange.bind( this );
		}
		
		this.transport.open( method , _url , this.asynchronous );
		
		this.transport.setRequestHeader( 'Content-Type' , 'application/x-www-form-urlencoded' );
		
		if ( this.headers !== null )
		{
			for ( var i in this.headers )
			{
				this.transport.setRequestHeader( i ,this.headers[ i ] );
			}
		}
		
		this.transport.send( method == 'post' ? this.data : null );
	},
	
    _onSuccess : function( obj )
    {
        var transport = this.transport;
        if ( this.fillTo !== null )
        {
            try{this.fillTo.stopLoading();}catch(e){}
            this.fillTo.innerHTML = transport.responseText;
        }
        try
        {
            if ( this.onSuccess ) this.onSuccess.call( null , transport );
        }
        catch( e )
        {
            if ( XN.DEBUG_MODE ) throw e;
        }
    },
    
    _onComplete : function( obj )
    {
        var transport = this.transport;
        try
        {
            if ( this.onComplete ) this.onComplete.call( null , transport );
        }
        catch( e )
        {
            if ( XN.DEBUG_MODE ) throw e;
        }
    },

	onStateChange : function()
	{
		var transport = this.transport;
		if ( transport.readyState == 4 )
		{

			this._onComplete();
			if( transport.status == undefined || transport.status == 0 || ( transport.status >= 200 && transport.status < 300) )
			{
                if ( this.useCache )
                {
                    XN.net.cache.add( this.url + encodeURIComponent( this.data ) , this.transport.responseText );
                }
                this._onSuccess();
			}
			else
			{
				(this.onError || this.onFailure || XN.func.empty ).call( null , transport );
			}
		}
	}
};

if ( XN.browser.IE )
{
	XN.net.xmlhttp.prototype.getTransport = function( w )
	{
        if ( w !== window )
        {
            return w.getTransport();
        }

        try
        {
            return new ActiveXObject( 'Msxml2.XMLHTTP' );
        }
        catch( e )
        {
            return new ActiveXObject( 'Microsoft.XMLHTTP' );
        }
	};
}
else
{
	XN.net.xmlhttp.prototype.getTransport = function( w )
	{
		return new w.XMLHttpRequest();
	};	
}

/*
 * patch for old version
 */

XN.NET = XN.Net = XN.net;

XN.net.ajax = XN.net.xmlhttp;

$extend( XN.net.xmlhttp.prototype , 
{
	get : function( url , data , onSuccess , params )
	{
		this.url = url;
		this.data = data;
		this.onSuccess = onSuccess;
		$extend( this , params );
		this.send( 'get' );
	},
	post : function( url , data , onSuccess , params )
	{
		this.url = url;
		this.data = data;
		this.onSuccess = onSuccess;
		$extend( this , params );
		this.send( 'post' );		
	}
} );

if ( typeof Ajax == 'undefined' )
{
	Ajax = {};
	Ajax.Request = function( url , o )
	{
		var p = o.parameters;
		o[ 'url' ] = url;
		o[ 'data' ] = p;
		delete o.parameters;
		return new XN.net.xmlhttp( o );
	} 
}

/*
 * patch end
 */
/**
 * @module core
 */

/**
 * @namespace XN
 * @class template
 * @static
 */

XN.template = {};

/**
 * @namespace XN.template
 * @method mediaPlayer
 * @param {Object} o
 * @return {String}
 */

XN.template.mediaPlayer = function( o )
{
	return [ 
	'<object classid="CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95" width="' + (o.width || '352') + '" height="' + (o.height || '70') + '" >\n',
	'<param name="autostart" value="' + (o.autostart || '1')+'" >\n',
	'<param name="showstatusbar" value="' + (o.showstatusbar || '1')+ '">\n',
	'<param name="filename" value="'+ o.filename +'">\n',
	'<embed type="application/x-oleobject" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701" ',
	'flename="mp"',
	'autostart="' + (o.autostart || '1') + '" showstatusbar="' + (o.showstatusbar || '1') + '" ',
	'src="' + o.filename + '" width="' + (o.width || '352') + '" height="' + (o.height || '70') + '"></embed>'
	].join( '' );
};

/**
 * @namespace XN.template
 * @method  flashPlayer
 * @param {Object} o
 * @return {String}
 */

XN.template.flashPlayer = function( o )
{
	return '<embed src="' + XN.ENV.staticRoot + '/swf/player.swf?url=' + o.filename + '&Rwid=' + (o.width || '450') + '&Autoplay=' + (o.autostart || '1')+ '" wmode="' + (o.wmode || 'transparent') +'" loop="false" menu="false" quality="high" scale="noscale" salign="lt" bgcolor="#ffffff" width="' + (o.width || '450') + '" height="' + (o.height || '30') + '" align="middle" allowScriptAccess="sameDomain" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
};

/**
 * @namespace XN.template
 * @method flash
 * @param {Object} o
 * @return {String}
 */

XN.template.flash = function( o )
{
	return '&nbsp;<embed src="' + o.filename + '" type="application/x-shockwave-flash" ' +
	'width="' + (o.width || '320') + '" height="' + (o.height || '240') + '" allowFullScreen="true" wmode="' + (o.wmode || 'transparent') + '" allowScriptAccess="always"></embed>';	
};

/*
 * patch for old version
 */

XN.Template = XN.TEMPLATE = XN.template;

/*
 * patch end
 */

/**
 * @module core
 */

/**
 * 常用功能的封装
 * @namespace XN
 * @class util
 * @static
 */

XN.namespace( 'util' );


/**
 * data cache class
 * @namespace XN.util
 * @class cache
 * @constructor
 * @param {Object} params
 */

XN.util.cache = function( params )
{
	$extend( this , params );
	this._cacheData = [];
};

XN.util.cache.prototype =
{
	
	/**
	 * @property cacheLength
	 * @type {Int}
	 */
	
	cacheLength : null,
	
	_cacheData : null,
	
	/**
	 * check if the cahe key exist
	 * @method isExist
	 * @param {String | Int} key
	 * @return {Boolean}
	 */
	
	isExist : function( key )
	{
		return this.get( key );
	},
	
	/**
	 * add a cache data
	 * @method add
	 * @param {String | Int} key
	 * @param {Any} value
	 */
	
	add : function( key ,value )
	{
		
		if ( !isUndefined( this.isExist( key ) ) ) return;
	
		
		if ( this.cacheLength && this.cacheLength == this._cacheData.length )
		{
			this._cacheData.shift();
		}
		
		this._cacheData.push( {
			'key'	:	key,
			'value':	value
		} );
	},
	
	/**
	 * get cache data by key
	 * @method get
	 * @param {String | Int} key
	 * @return {Any}
	 */
	
	get : function( key )
	{

		for ( var i = this._cacheData.length - 1 ; i >= 0 ; i-- )
		{
			if( this._cacheData[i].key == key )
			{			
				return this._cacheData[i].value;
			}
		}		
	},
	
	/**
	 * clear cache
	 * @method clear
	 */
	
	clear : function(){
		this._cacheData = [];
	}	
};

/*
 * patch for old version
 */

XN.UTIL = XN.Util = XN.util;

/*
 * patch end
 */

/**
 * json格式的ajax数据源
 * <pre>
 *  参数形式如下
 *  <pre>
 *  {
 *      url:'',//查询的url
 *      queryParam:'query',//查询的参数名
 *      attachParam:'',//附加参数
 *      rootKey:null//如果不指定，则认为整个json即为查询结果
 *  }
 *  </pre>
 * </pre>
 *
 * @namespace XN.util
 * @class DS_JSON
 * @constructor
 * @param {Object} params
 */

XN.util.DS_JSON = function( p )
{
	$extend( this , p );
};

XN.util.DS_JSON.prototype  =
{
	DS_TYPE : 'JSON',
	url : null,
	queryParam : 'query',
	attachParam : '',
	rootKey : null,
	_request : null,

    /**
     * 查询数据
     * @method query
     * @param {String} v 查询的字符串
     * @param {Function} callBack 回调函数
     */

	query : function( v , callBack )
	{
        //XN.log( v );
        //XN.log( callBack );
		var This = this;
		
		try{
			this._request.abort();
		}catch(e){}
		
		function parseDS_JSON( r )
		{
			r = r.responseText;
			var pp;
			try{
				var rt = XN.JSON.parse( r );
				if ( This.rootKey && rt[ This.rootKey ] )
				{
					pp = rt[ This.rootKey ];
				}
				else
				{
					pp = rt;
				}
            }
			catch( e )
			{
				pp = [];
			}

			callBack( pp );
		}
		
		this._request = new XN.net.xmlhttp(
		{
			url : this.url,
			data : this.queryParam + '=' + encodeURIComponent( v ) + '&' + this.attachParam,
			method : 'get',
            onSuccess : parseDS_JSON
		});
	}
};

XN.ui.DS_JSON = XN.util.DS_JSON;


/**
 * 用于好友选择器的好友数据源
 * <pre>
 * 参数形式如下
 * {
 *  url:''//请求的url
 * }
 * </pre>
 * @namespace XN.util
 * @class DS_friends
 * @constructor
 * @param {Object} params
 */

/**
 * 如果指定了此属性，将在此网络内查询好友
 * @property net
 * @type {String}
 */

/**
 * 如果指定了此属性，将在此分组内查询好友
 * @property group
 * @type {String}
 */


/**
 * 查询好友
 * @method query
 * @param {String} name
 * @param {Function} callBack
 */

XN.util.DS_friends = function( p )
{
    var ds = new XN.util.DS_JSON( p );
    ds.queryParam = 'p';
    ds.rootKey = 'candidate';
    ds.net = '';
    ds.group = '';
    ds.param = XN.json.build( p.param || {} );

    var limit =  isUndefined( p.limit ) ? 24 : p.limit;

    ds.query = function( name , callBack )
    {
        XN.log( 'start query' );
        
        //只允许查询字母和汉字
        name = name.replace( /[^a-zA-Z\u0391-\uFFE5]/g , '' );
        
        if ( XN.string.isBlank( name ) && this.group == '' && this.net == '' )
        {
            callBack( [] );
            return;
        }

        var p = [
            '{"init":false,',
            '"qkey":"' + this.qkey + '",',
            '"uid":true,',
            '"uname":true,',
            '"uhead":true,',
            '"limit":' + limit + ',',
            '"param":' + this.param + ',',
            '"query":"' +  name  + '",',
            '"group":"' + this.group + '",',
            '"net":"' + this.net + '"',
            '}'
        ].join( '' );

        XN.util.DS_JSON.prototype.query.call( this , p , callBack );
    }
    return ds;
};


XN.ui.DS_friends = XN.util.DS_friends;

/**
 * 从数组创建数据源
 * <pre>
 * 参数形式如下
 *  {
 *      data:a,//创建源的数组
 *      searchKey:'name'//要搜索的字段
 *  }
 * </pre>
 * @namespace XN.util
 * @class DS_Array
 * @constructor
 * @param {Object} params
 */

/**
 * 查询数组
 * @method query
 * @param {String} v 查询的字符串
 * @param {Function} callBack
 */

XN.util.DS_Array = function( p )
{
	$extend( this , p );
	this.init();
};

XN.util.DS_Array.prototype =
{
	DS_TYPE : 'array',
	data : null,
	searchKey : null,
	
	init : function()
	{
		var key = this.searchKey,
		index = this._index = [];
		
		XN.array.each( this.data , function( i , v )
		{
			index.push( v[ key ] );
		} );
	},
	
	query : function( v , callBack )
	{
		callBack( this._search( v ) );
	},
	
	_search : function( v )
	{
		var keys = this._index,
		data = this.data,
		rt = [],
		reg = new RegExp( '^' + v , 'i' );
		XN.array.each( keys , function( i , v )
		{
			if ( reg.test( v ) ) rt.push( data[ i ] );
		} );
		return rt;
	}
};

XN.ui.DS_Array = XN.util.DS_Array;


/**
 * xml格式的ajax数据源
 * <pre>
 * 参数形式如下: 
 *  {
 *      url:''//查询的url地址
 *  }
 * </pre>
 * @namespace XN.util
 * @class DS_XHR
 * @constructor 
 * @param {Object} params
 */

/**
 * 查询数据源
 * @method query
 * @param {String} v
 * @param {Function} callBack
 */

XN.util.DS_XHR = function( p )
{
	$extend( this , p );
};

XN.util.DS_XHR.prototype =
{
	url : null,
	queryParam : 'query',
	_request : null,
	
	query : function( v , callBack )
	{
		var This = this;
		
		try{
			this._request.abort();
		}catch(e){}
		
		function parseDS_XML( r )
		{
			r = r.responseXML;
			var rt = [];
			function getResult( r )
			{
				var tmp = {};
				XN.array.each( r.childNodes , function( i , v )
				{
					tmp[ v.tagName.toLowerCase() ] = v.firstChild.nodeValue;
				} );
				return tmp;
			}
			try{
				var rs = r.getElementsByTagName( 'Result' );
				XN.array.each( rs , function( i , v )
				{
					rt.push( getResult( v ) );
				} );
			}
			catch( e )
			{
				rt = [];
			}
			callBack( rt );
		}
		
		this._request = new XN.net.xmlhttp( {
			url : this.url,
			data : this.queryParam + '=' + encodeURIComponent( v ),
			onSuccess : parseDS_XML
		} );
	}
};

XN.ui.DS_XHR = XN.util.DS_XHR;

/*
XN.util.action = function(){
	this._successCode = [];
	this._errorCode = [];
	this._filters = [];
};

XN.util.action.prototype = 
{
	reqeustURI : null,
	method : 'post',
	_request : null,
	
	abort : function()
	{
		try
		{
			this._request.abort();
		} catch( e ){}
	},
	
	getErrorMessage : function( code )
	{
		if ( !code ) return false;
		return this._errorCode[ code ];
	},
	
	addErrorCode : function( code , msg )
	{
		this._errorCode[ code ] = msg;
	},
	
	getSuccessMessage : function( code )
	{
		if ( !code ) return false;
		return this._successCode[ code ];
	},
	
	addSuccessCode : function( code , msg )
	{
		this._successCode[ code ] = msg;
	},
	
	isSuccess : function( rt )
	{
		return !!this._successCode[ rt.code ];
	},
	
	applyFilter : function( obj )
	{
		var filters = this._filters;
		for ( var i = 0; i < filters.length; i++ )
		{
			obj = filters[ i ].call( null , obj );
			if ( isString( obj ) ) return obj;
		}
		return obj;
	},
	
	addFilter : function( func )
	{
		this._filters.push( func );
	},
	
	exe : function( params )
	{
		var rt = this.applyFilter( params );

        if ( isString( rt ) )
		{
			this.fireEvent( 'checkError' , rt );
			return;
		}
		
		this.fireEvent( 'netRequest' , rt );
		
		this._sendRequest( XN.array.toQueryString( rt ) );
	},
	
	_sendRequest : function( params )
	{
		var This = this;
		this._reqeust = new XN.NET.xmlhttp(
		{
			url : this.reqeustURI,
			data : params,
			method : this.method,
			onComplete : function()
			{
				This.fireEvent( 'netComplete' );
			},
			onSuccess : function( r )
			{
                r = r.responseText;
				try
				{
					var rt = XN.string.isJSON( r ) ? XN.JSON.parse( r ) : r;
					if ( This.isSuccess( rt ) )
					{
						This.fireEvent( 'success' , rt );
					}
					else
					{
						This.fireEvent( 'error' , rt );
					}
				}
				catch( e )
				{
					This.fireEvent( 'error' );
				}
			},
			onError : function()
			{
				This.fireEvent( 'error' );
			}
		} );
	}
};

XN.EVENT.enableCustomEvent( XN.util.action.prototype );
*/

/**
 * 全局热键
 * @class hotKey
 * @static
 * @namespace XN.util
 */

(function()
{
    var funcs = {};

    XN.util.hotKey = {

        /**
         * 添加热键
         * <pre>
         * XN.util.hotKey.add( '27' , callBack );
         * XN.util.hotKey.add( 'ctrl+27' , callBack );
         * </pre>
         * @method add
         * @param {String} key
         * @param {Function} func
         * @obj {Object} obj
         */

        add : function( key , func , obj )
        {
            key = String( key ).toLowerCase();
            var ctrl = false;
            var alt = false;
            var shift = false;
            var _code = null;

            if ( /^\d+$/.test( key ) )
            {
                _code = parseInt( key );
            }
            else
            {
                ctrl = /ctrl|ctr|c/.test( key );
                alt = /alt|a/.test( key );
                shift = /shift|s/.test( key );
                if ( /\d+/.test( key ) )
                {
                    _code = parseInt( /\d+/.exec( key )[ 0 ] );
                }
                else
                {
                    _code = false;
                }
            }

            funcs[ key ] = funcs[ key ] || {};

            funcs[ key ][ func ] = function( e )
            {
                e = e || window.event;
                code = e.keyCode;
                if ( ctrl && !e.ctrlKey ) return;
                if ( alt && !e.altKey ) return;
                if ( shift && !e.shiftKey ) return;
                if ( _code && code !== _code ) return;
                func.call( obj || null );
                XN.event.stop( e );
            };
            XN.event.addEvent( document , 'keydown' , funcs[ key ][ func ] );
        },
        
        /**
         * 删除热键
         * <pre>
         * XN.util.hotKey.del( '27' , callBack );
         * </pre>
         * @method del
         * @param {String} key
         * @param {Function} func
         */
        
        del : function( key , func )
        {
            key = String( key ).toLowerCase();
            XN.event.delEvent( document , 'keydown' , funcs[ key ][ func ] );
            delete funcs[ key ][ func ];
        }
    };
})();

/*
XN.dom.ready(function()
{
    XN.util.hotKey.add( 'ctrl-alt-shift-74' , function()
    {
        XN.DO.alert('ahahaha');
    } );
});
*/

(function()
{
    var id = 0;
    XN.util.createObjID = function()
    {
      id ++;
      return id;
    };
})();
/**
 * alert && confirm
 * @namespace XN
 * @class DO
 * @static
 */

XN.DO = {};

(function(){

    var currentAlert = null;
    var currentTimer = null;
    
    /**
     *  友好的alert
     *  <pre>
     *  参数形式如下: 
     *  {
     *      title:'',//对话框标题
     *      mesage:'',//提示信息
     *      type:'',//对话框的样式
     *      widith:int,//宽度
     *      height:int,//高度
     *      button:'',//按钮文字
     *      callBack:function,//回调函数
     *      autoHide:0,//自动关闭时间
     *      X:int,
     *      Y:int
     *  }
     *  </pre>
     *  @method alert
     *  @param {Object} params
     *  @return {XN.ui.dialog}
     */

    XN.DO.alert = function( message , title , type , X , Y , w , h , callBack )
    {
        try
        {
            currentAlert.hide();
        }catch( e ){}


        var params = {
            type : 'normal',
            width : 400,
            button : '确定',
            callBack : XN.func.empty,
            autoHide : 0,
            params : {}
        };

        if ( !isString( message ) ) $extend( params , message );
        
        /*
         * patch for old version
         */
        if ( isString( message ) || arguments.length > 1 )
        {
            var ars = arguments;
            XN.array.each( [ 'message' , 'title' , 'type' , 'X' , 'Y' , 'width' , 'height' , 'callBack' ] , function( i , v )
            {
                if ( ars[ i ] ) params[ v ] = ars[ i ];
            } );
        }
        /*
         * patch end
         */
        
        var dialog = new XN.ui.dialog( params )
        .setType( params.type )
        .setTitle( params.title || ( params.type == 'error' ? '错误提示' : '提示' ) )
        .setBody( params.msg || params.message || '' )
        .setWidth( params.width )
        .setHeight( params.height )
        .setX( params.X )
        .setY( params.Y )
        .addButton(
        {
            text : ( params.yes || params.button ),
            onclick : function()
            {
                return params.callBack.call( dialog );
            }
        } ).show();

        
        currentAlert = dialog;
        
        if ( params.noFooter )
        {
            dialog.footer.hide();
        }
        
        if ( params.noHeader )
        {
            dialog.header.hide();
        }
        
        try{
            dialog.getButton( params.button ).focus();
        }catch(e){}

        if ( params.autoHide )
        {
            dialog.autoHide( params.autoHide );
            /*currentTimer = setTimeout( function()
            {
                currentAlert.hide();
            } , params.autoHide * 1000 );
            */
        }
        
        return dialog;
    };

    var currentConfirm = null;

    /**
     * 友好的confirm
     * <pre>
     * 参数形式如下: 
     * {
     *  title:'',//标题
     *  message:'',//提示信息
     *  type:'',//样式
     *  width:int,//宽度
     *  height:int,//高度
     *  submit:'',//确定按钮的文字
     *  cancel:'',//取消按钮的样式
     *  focus: '',//聚焦的按钮'submit'or'cancel'
     *  callBack : function,//回调函数
     * }
     *  
     * </pre>
     * @method confirm
     * @param {Object} params
     * @return {XN.ui.dialog}
     */

    XN.DO.confirm = function( message,title,callBack,yes,no,X,Y,w,h )
    {
        
        try
        {
            currentConfirm.remove();
        }catch( e ){}

        var params = {
            type : 'normal',
            width : 780,
            yes : '确定',
            no : '取消',
            callBack : XN.func.empty,
            focus : null,
            params : {}
        };

        if ( !isString( message ) ) $extend( params , message );
            
        /*
         * patch for old version
         */
        if ( isString( message ) || arguments.length > 1 )
        {
            var ars = arguments;
            XN.array.each( [ 'message' , 'title' , 'callBack' , 'yes' , 'no' , 'X' , 'Y' , 'w' , 'h' ] , function( i , v )
            {
                if ( ars[ i ] ) params[ v ] = ars[ i ];
            } );
        }
        /*
         * patch end
         */

        var dialog = new XN.ui.dialog( params )
        .setType( params.type )
        .setTitle( params.title || ( params.type == 'error' ? '错误提示' : '提示' ) )
        .setBody( params.msg || params.message || '' )
        .setWidth( params.width )
        .setHeight( params.height )
        .setX( params.X )
        .setY( params.Y )
        .addButton(
        {
            text : ( params.submit || params.yes ),
            onclick : function()
            {
                return params.callBack.call( dialog , true );
            }
        } )
        .addButton(
        {
            text : ( params.cancel || params.no ),
            onclick : function()
            {
                return params.callBack.call( dialog , false );
            }
        } ).show();
        
        dialog.getButton( params.cancel || params.no ).addClass( 'gray' );
        
        if ( params.focus == 'submit' )
        {
            params.focus = params.submit; 
        }
        else if ( params.focus == 'cancel' )
        {
            params.focus = params.cancel;
        }

        dialog.getButton( params.focus || params.submit || params.yes ).focus();
        
        currentConfirm = dialog;
        
        return dialog;
    };

    /**
     * 显示一段信息后自动关闭
     * <pre>
     * 使用方法
     * XN.DO.showMessage( '动感超人' , 'haha' , 3 );
     * </pre>
     * @method showMessage
     * @param {String} msg
     * @param {String} title
     * @param {Int} time 自动关闭时间
     */

    XN.DO.showMessage = XN.DO.showMsg = function( msg , title , time )
    {
        XN.DO.alert({
            msg : msg,
            title : ( title || '提示' ),
            noFooter : true,
            autoHide : ( time || 2 )
        });
    };
    
    /**
     * 显示一段出错信息后自动关闭
     * <pre>
     * 使用方法
     * XN.DO.showError( '出错信息' , '出错了' , 3 );
     * </pre>
     * @method showError
     * @param {String} msg
     * @param {String} title
     * @param {Int} time 自动关闭时间
     */

    XN.DO.showError = function( msg ,title , time )
    {
        XN.DO.alert({
            msg : msg,
            type : 'error',
            title : (title || '错误提示'),
            noFooter : true,
            autoHide : (time || 2)
        });
    };
})();
/*
 *  based on YUI:YAHOO.lang.JSON 
 */
XN.json = {
	_ESCAPES : /\\["\\\/bfnrtu]/g,
	_VALUES  : /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	_BRACKETS : /(?:^|:|,)(?:\s*\[)+/g,
	_INVALID  : /^[\],:{}\s]*$/,
	_SPECIAL_CHARS : /["\\\x00-\x1f\x7f-\x9f]/g,
	_PARSE_DATE : /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/,
	_CHARS : {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    },
    dateToString : function (d) {
        function _zeroPad(v) {
            return v < 10 ? '0' + v : v;
        }

        return '"' + d.getUTCFullYear()   + '-' +
            _zeroPad(d.getUTCMonth() + 1) + '-' +
            _zeroPad(d.getUTCDate())      + 'T' +
            _zeroPad(d.getUTCHours())     + ':' +
            _zeroPad(d.getUTCMinutes())   + ':' +
            _zeroPad(d.getUTCSeconds())   + 'Z"';
    },
    stringToDate : function (str) {
        if (XN.JSON._PARSE_DATE.test(str)) {
            var d = new Date();
            d.setUTCFullYear(RegExp.$1, (RegExp.$2|0)-1, RegExp.$3);
            d.setUTCHours(RegExp.$4, RegExp.$5, RegExp.$6);
            return d;
        }
    },
	parse:function(str){
		return eval('(' + str + ')');
	},
	build:function(o,w,d){
	    var m = XN.JSON._CHARS,str_re = XN.JSON._SPECIAL_CHARS,pstack = [];
		var _char = function (c) {
            if (!m[c]) {
                var a = c.charCodeAt();
                m[c] = '\\u00' + Math.floor(a / 16).toString(16) +
                                           (a % 16).toString(16);
            }
            return m[c];
    	};
		var _string = function (s) {
            return '"' + s.replace(str_re, _char) + '"';
        };
		var _date = XN.JSON.dateToString;
        var _stringify = function (o,w,d) {
            var t = typeof o,
                i,len,j,k,v,vt,a;
            if (t === 'string') {
                return _string(o);
            }
            if (t === 'boolean' || o instanceof Boolean) {
                return String(o);
            }
            if (t === 'number' || o instanceof Number) {
                return isFinite(o) ? String(o) : 'null';
            }
            if (o instanceof Date) {
                return _date(o);
            }
            if (isArray(o)) {
                for (i = pstack.length - 1; i >= 0; --i) {
                    if (pstack[i] === o) {
                        return 'null';
                    }
                }
                pstack[pstack.length] = o;

                a = [];
                if (d > 0) {
                    for (i = o.length - 1; i >= 0; --i) {
                        a[i] = _stringify(o[i],w,d-1) || 'null';
                    }
                }
                pstack.pop();

                return '[' + a.join(',') + ']';
            }

            if (t === 'object') {
                if (!o) {
                    return 'null';
                }
                for (i = pstack.length - 1; i >= 0; --i) {
                    if (pstack[i] === o) {
                        return 'null';
                    }
                }
                pstack[pstack.length] = o;

                a = [];
                if (d > 0) {
                    if (w) {
                        for (i = 0, j = 0, len = w.length; i < len; ++i) {
                            if (typeof w[i] === 'string') {
                                v = _stringify(o[w[i]],w,d-1);
                                if (v) {
                                    a[j++] = _string(w[i]) + ':' + v;
                                }
                            }
                        }
                    } else {
                        j = 0;
                        for (k in o) {
                            if (typeof k === 'string' && typeof o[k] != 'undefined') {
                                v = _stringify(o[k],w,d-1);
                                if (v) {
                                    a[j++] = _string(k) + ':' + v;
                                }
                            }
                        }
                    }
                }
                pstack.pop();
                return '{' + a.join(',') + '}';
            }
            return undefined; 
        };
		d = d >= 0 ? d : 1/0;
		return _stringify(o,w,d);
	}
};

/*
 * patch for old version
 */

XN.JSON = XN.Json = XN.json;

/*
 * patch end
 */

/*
 * for im
 */

(function()
{
    writepipe = function( uin , nick )
    {
        if ( uin > 0 )
        {
            var s = GetCookie( '_pipe' );
            if ( s ) s += ':';
            SetCookie( '_pipe' , s + uin + ':' + escape( nick ) , null , '/' , 'kaixin.com' );
        }

        var wi_state = GetCookie( '_wi' );

        if ( 'opening' == wi_state )
        {
        }
        else if( 'running' == wi_state )
        {
        }
        else
        {				
            SetCookie( '_wi' , 'opening' , null , '/' , XN.ENV.domain );
            
            window.wiw=window.open(
                    'http://kaixin.com/webpager.do?toid=' + uin ,
                    '_blank',
                    'height=600,width=650,resizable=yes,location=yes'
            );
            
            if ( window.wiw_checker )
                window.clearInterval( window.wiw_checker );
            
            window.wiw_checker=window.setInterval(
                function()
                {
                    if ( window.wiw.closed )
                    {
                        window.clearInterval( window.wiw_checker );
                        SetCookie( '_wi' , '' , null , '/' , XN.ENV.domain );
                    }
                },
                1000);
            return true;
        }

        try
        {
            if ( window.wiw )
                window.wiw.focus();
        }
        catch(e){}
        return false;
    }

    talkto = function( uin , nick , tiny , doing )
    {
        try
        {
            var a=new ActiveXObject( 'xntalk.Application' );
            if ( a )
            {
                a.openChat( '' , uin );
                return true;
            }
        }catch(e){}

        if ( top.frames['imengine'].gPagerType == 4 )
        {
            if ( top.frames['imengine'].imHelper.isLoginUser() )
            {
                var tabs = top.frames['imengine'].imui.chatTabs;
                tabs.onActivateWidget( uin, nick, tiny, doing );
                tabs.switchFocus( uin );
                return true;
            }
        }

        try
        {
            writepipe(uin,nick);
        }catch(e){}
    }

    jump_and_download = function( link )
    {
      if ( XN.BROWSER.IE )
      {
        window.open( link , 'download_window', 'toolbar=0,location=no,directories=0,status=0,scrollbars=0,resizeable=0,width=1,height=1,top=0,left=0');
        window.focus();
      }
    }
    
})();

function GetCookieVal(_70){
var _71=document.cookie.indexOf(";",_70);
if(_71==-1){
_71=document.cookie.length;
}
return unescape(document.cookie.substring(_70,_71));
}
function GetCookie(_72){
var arg=_72+"=";
var _74=arg.length;
var _75=document.cookie.length;
var i=0;
while(i<_75){
var j=i+_74;
if(document.cookie.substring(i,j)==arg){
return GetCookieVal(j);
}
i=document.cookie.indexOf(" ",i)+1;
if(i==0){
break;
}
}
return null;
}

function SetCookie(_78,_79){
var _7a=SetCookie.arguments;
var _7b=SetCookie.arguments.length;
var _7c=(_7b>2)?_7a[2]:null;
var _7d=(_7b>3)?_7a[3]:null;
var _7e=(_7b>4)?_7a[4]:null;
var _7f=(_7b>5)?_7a[5]:false;
document.cookie=_78+"="+escape(_79)+((_7c==null)?"":("; expires="+_7c.toGMTString()))+((_7d==null)?"":("; path="+_7d))+((_7e==null)?"":("; domain="+_7e))+((_7f==true)?"; secure":"");
}


/*
 * for im end
 */
 var IMHack={};
(function(){
	//util method
	var addEvent=function(element, type, handler) {
	  if (!handler.$$guid) handler.$$guid = addEvent.guid++;
	  if (!element.events) element.events = {};
	  var handlers = element.events[type];
	  if (!handlers) {
		handlers = element.events[type] = {};
		if (element["on" + type]) {
		  handlers[0] = element["on" + type];
		}
	  }
	  handlers[handler.$$guid] = handler;
	  element["on" + type] = handleEvent;
	};

	addEvent.guid = 1;

	var removeEvent=function(element, type, handler) {
	  if (element.events && element.events[type]) {
		delete element.events[type][handler.$$guid];
	  }
	};

	var handleEvent=function(event) {
	  event = event || window.event;
	  var handlers = this.events[event.type];
	  for (var i in handlers) {
		this.$$handleEvent = handlers[i];
		this.$$handleEvent(fixEvent(event));
	  }
	};

	var fixEvent=function(event){
		if(event.cancelBubble)
			event.stopPropagation=function(){
				event.cancelBubble=true;
			};
		return event;
	}
	var css=function(ele,prop){
		for(i in prop)
			ele.style[i]=prop[i];
	};
	
	var scrollHeight=function(){
		var h=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
		return Math.max(h,clientHeight());
	}
	var scrollWidth=function(){
		var h=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);
		return Math.max(h,clientWidth());
	}
	var clientWidth=function(){
		return (document.documentElement.clientWidth==0 ? document.body.clientWidth : document.documentElement.clientWidth);
	}
	var clientHeight=function() {
		return (document.documentElement.clientHeight==0 ? document.body.clientHeight : document.documentElement.clientHeight);
	}
	var scrollTop=function(){
		return Math.max(document.body.scrollTop,document.documentElement.scrollTop);
	}
	var scrollLeft=function(){
		return Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);
	}
	var dimension=function(obj){
		var memory={display:obj.style.display,visible:obj.style.visibility};
		css(obj,{display:"",visible:"visibility"});
		var dim={w:obj.offsetWidth,h:obj.offsetHeight};
		css(obj,memory);
		return dim;
	}
	var getElementsByClass=function(context,searchClass) {
		var classElements = [];
		var nodes = context.getElementsByTagName("*");
		var pattern = new RegExp("\\b"+searchClass+"\\b");
		for (var i = 0, j = 0; i < nodes.length; i++) {
			if (pattern.test(nodes[i].className)){
				classElements[j++] = nodes[i];
			}
		}
		return classElements;
	}
	
	//logic method
	var fixedEle=null;
	var timer=null;
	var reLocation=function(){
		css(fixedEle,{display:"none"});
		clearTimeout(timer);
		timer=setTimeout(function(){
			var dim=dimension(fixedEle);
			var top=scrollTop()+clientHeight()-25;
			css(fixedEle,{display:"block",top:top+"px",right:"0px"});
		},500);
	}		
	IMHack.hackToolBar=function(){
		fixedEle=document.getElementById("wpiroot");
		css(fixedEle,{position:"absolute",right:0});
		addEvent(window,"scroll",reLocation);
		addEvent(window,"resize",reLocation);
	}
	IMHack.hackWidget=function(ele){
		var widget=ele.getElementsByTagName("div")[0];
		css(widget,{position:"absolute",bottom:"23px"});
		if(getElementsByClass(ele,"buddy-list").length>0)
			css(widget,{right:"-62px"});
		else if(getElementsByClass(ele,"notifications").length>0)
			css(widget,{right:"-31px"});
		else if(getElementsByClass(ele,"status-control").length>0)
			css(widget,{right:"-1px"});
		else if((/\bm-chat-button-chattab\b/.test(ele.className))){
			css(ele,{position:"relative"});
			css(getElementsByClass(ele,"m-chat-window")[0],{position:"absolute",right:"-2px",bottom:"23px"});				
		}
		else
			css(widget,{right:0});
	}
})();
/*
为了排除ie6下的错误暂时注释
var IMClew={
	hasShow:false,
	timer:null,
	getContent:function(){
		return ['<div id="wpiClew" style="position:fixed;bottom:25px;right:60px;background: transparent url(http://rrimg.com/imgpro/info/chatpopup.gif) no-repeat scroll 0pt 0pt; width: 205px; height: 61px; ">',
				'<div style="padding: 5px 5px 0pt 0pt; float: right;"><span class="share-n-hide"><a href="#nogo" id="ctrlWpiClew" class="x-to-hide"></a></span></div>',
				'<div style="padding: 10px 0pt 0pt; width: 110px; float: right; font-weight: bold;">点击此处，和您的在线好友聊天！</div></div>'].join("");
	},
	append:function(element,text){
		var temp=document.createElement("div");
		temp.innerHTML=text;

		while(temp.hasChildNodes()){
			element.appendChild(temp.childNodes[0]);
		}
	},
	posX:function(element){
		return element.offsetParent ? element.offsetLeft + this.posX(element.offsetParent) : element.offsetLeft;
	},
	posY:function(element){
		return element.offsetParent ? element.offsetTop + this.posY(element.offsetParent) : element.offsetTop;
	},
	hackIE6:function(){
		var func=arguments.callee;			
		var clew=$("wpiClew");
		if(clew==null)
			return;
		clew.hide();
		var base=XN.DOM.getElementsByClassName("m-chat-button-onlinefriends")[0];
		if(this.hasShow || !base || XN.ELEMENT.getStyle("wpiroot","display")=="none"){
			clearTimeout(this.timer);
			this.timer=setTimeout(function(){
				IMClew.hackIE6();
			},500);
			return;
		}
		var basePos={top:this.posY(base),left:this.posX(base)};
		
		clew.style.position="absolute";
		clew.style.top=basePos.top-61+"px";
		clew.style.left=basePos.left-50+"px";			
		clew.show();
	},
	destroy:function(e){
		this.hasShow=true;
		var obj=$('wpiClew');
		if(obj){
			obj.parentNode.removeChild(obj);
			XN.ELEMENT.delEvent(window,"scroll",this.hackIE6);			
		}
	},
	init:function(){
		var cookieName="wpi_clew_cookie";
		
		if(XN.COOKIE.get(cookieName)=="exsit")
			return;
		if(!document || !document.body || !document.getElementsByTagName || !document.getElementById){
			setTimeout(function(){
				IMClew.init();
			},200);
			return;
		}
		XN.COOKIE.set(cookieName,"exsit",1000,"/","kaixin.com");
		this.append(document.body,this.getContent());
		XN.ELEMENT.addEvent("wpiroot","click",function(e){
			IMClew.destroy();
		});
		XN.ELEMENT.addEvent("ctrlWpiClew","click",function(e){
			IMClew.destroy();
		});
		
		//IE6
		if(XN.browser.IE6){
			XN.ELEMENT.addEvent(window,"scroll",function(e){
			IMClew.hackIE6();
		});
			this.hackIE6();
		}
	}
};
*/
XN.USER = XN.User = {};
XN.USER.me = function( parameters )
{
};
currentUser = {};

XN.EVENT.enableCustomEvent( currentUser );

XN.USER.addFriendAction = function( p )
{
    this.config = {
        commentLength : 45,
        needComment : true,
        requestURI : '/ajax_request_friend.do'
    };
    $extend( this.config , p );
};

XN.USER.addFriendAction.prototype = {
    getConfig : function( key )
    {
        return this.config[ key ];
    },
    send : function( id , why , from )
    {
        var This = this;
        
        if ( this.getConfig( 'needComment' ) )
        {
            if ( XN.STRING.isBlank( why ) )
            {
                this.fireEvent( 'checkError' , '您输入的信息不能为空' );
                return;
            }
        }

        if ( why.length > this.getConfig( 'commentLength' ) )
        {
            this.fireEvent( 'checkError' , '您输入的信息不能超过' + this.getConfig( 'commentLength' ) + '个字符' );
            return;
        }

        var data = 'id=' + id + '&why=' + why +'&from=' + from;

        this.fireEvent( 'beforePost' );
        
        new XN.NET.xmlhttp(
        {
            url : this.getConfig( 'requestURI' ),
            'data' : data,
            onSuccess : function( r )
            {
                r = r.responseText;
                This.fireEvent( 'success' , id , r , from );
                
                if ( !window.currentUser ) return;
                
                if ( currentUser.fireEvent )
                    currentUser.fireEvent( 'addFriendSuccess' , id , r ,from );

                if ( currentUser.onaddFriendSuccess )
                    currentUser.onaddFriendSuccess( id , r );
            },
            onError : function()
            {
                This.fireEvent( 'error' , id , from );
                
                if ( !window.currentUser ) return;
                currentUser.fireEvent( 'addFriendError' , id , r , from );
            }
        });
    }
};

XN.EVENT.enableCustomEvent( XN.USER.addFriendAction.prototype );


/*
 * patch for old version
 */

XN.DOM.readyDo(function(){
	
	//对话框引用
	var dialog=null;
	
	//当前操作的用户
	var user=null;
	
	//操作进行中提示对话框
	function loadingDialog(){
		dialog=XN.DO.confirm({
			title : '将' + user.name + '加为好友?',
			msg : '<div style="font-size: 14px;  height:100px; line-height: 1.8em; padding-left: 20px;" class="clearfix"><div style="padding: 4px; background: transparent url('+XN.ENV.staticRoot+'imgpro/bg/picholder59.gif) no-repeat scroll 0% 0%;width: 59px; height: 59px; float: left;"><a href="#" style="background: transparent url('+user.head_url+') no-repeat scroll center center;height: 50px; width: 50px; display: block;">&nbsp;</a></div><div style="margin-left: 10px; height: 30px; float: left;width:240px;font-size:12px;"><h3 style="margin-top:15px;"><img style="display:block;float:left;margin:5px 10px 0 0;" src=\"' + XN.ENV.staticRoot + '/img/indicator.gif\" />Loading...</h3></div></div>',
			width : 400
		});
		dialog.footer.style.display="none";
	}
	
	//拼接对话框的内容	
	function getMessage(speak,isStar,gender){
		var showSpeak=speak == "" ? "none" : "block";
		var showUpload=isStar ? "none" : "block";
		//对话框内部的message(需要根据不同的条件拼接)
		var html=['<div style="padding:4px;color:#EF4223;background-color:#FEFFCF;margin-bottom:10px;">需要通过<em>',
				  user.name,
				  '</em>的验证才能加',
				  gender,
				  '为好友！</div>',
				  '<div style="padding: 4px; background: transparent url(',
				  XN.ENV.staticRoot,
				  'imgpro/bg/picholder59.gif) no-repeat scroll 0% 0%;width: 59px; height: 59px; float: left;"><a href="#" style="background: transparent url(',
				  user.head_url,
				  ') no-repeat scroll center center; height: 50px; width: 50px; display: block;">&nbsp;</a></div>',
				  '<div id="addFriendAlert" style="float: left;width:265px;">',
				  '<h4 style="display:',
				  showSpeak,
				  ';margin-bottom:10px;">',
				  user.name,
				  '说: <span style="font-weight: 400;">',
				  speak,
				  '</span></h4>',
				  '<p style="margin: 0 0 10px 0;">',
				  '<textarea id="addFriendMessage" style="border: 1px solid #B8D4E8; width: 100%; height:50px;color: gray;" title="附加信息(选填，45字内)" onfocus="if(this.value==this.title)this.value=\'\';" onblur="if(this.value==\'\')this.value=this.title;">附加信息(选填，45字内)</textarea>',
				  '</p>',
				  '<div style="display:',
				  showUpload,
				  ';clear:both;text-align:center;"><a style="font-size:12px;" target="_blank" href="http://head.upload.kaixin.com/Upload.do?from=friend">使用真实头像，提高请求通过率</a></div>',
				  '</div><div style="clear:both;"></div>'];
		return html.join("")
	}
	
	//填写好友申请对话框
	function requestDialog(speak,isStar,gender){
		dialog=XN.DO.confirm({
			title : '将' + user.name + '加为好友?',
			msg : getMessage(speak,isStar,gender),
			width : 400,
			callBack : function( r ){
				if (r){
					var obj=$('addFriendMessage')
					var why=obj.value==obj.title ? "" : obj.value;
					getAction().send( user.id , why , user.from );
				}
			}
		});
		dialog.footer.style.display="";
	}
	
	//发送请求时提示信息
	function beforePost(){
        $( 'addFriendAlert' ).innerHTML = '正在发送请求...';
        dialog.footer.hide();
		try
        {
            dialog.preventHide();
        }
        catch(e)
        {
            dialog.show();
        }
    }
    
	//推荐好友
	function recommendFriend(){
		if(typeof showRecommendedFriendDialog!="undefined")
			showRecommendedFriendDialog(user.id,user.name,1,true);
		else{
			XN.loadFile( $( 'st_for_r_f' ).getAttribute( 'vhref' ) );
			XN.loadFile( $( 'js_for_r_f' ).getAttribute( 'vsrc' ) ,function(){
				showRecommendedFriendDialog(user.id,user.name,1,true);
			});
		}
	}
	
	//请求成功后放入处理(判定是否需要推荐流程)
    function success(id, message){
        var This = this;
        if (isJSON(message))
            var msg = XN.JSON.parse( message );
        else
            var msg = {code:0,targetfriendcount:100,message:message};

        if ( msg.code == 0 || msg.code == 1 ){
			//推荐好友
			if(msg.targetfriendcount<=12){
				dialog.hide();
				recommendFriend();
			}
			else{
				$( 'addFriendAlert' ).innerHTML = msg.message;
				setTimeout(function(){dialog.hide();}, 1500);
			}
			//兼容旧方法
			if(user.action){
				try{
					eval(user.action);
				}catch(e){}
			}				
			//是否有回调
			if(user.callback)
				user.callback(user.id);
        }
		else{
			dialog.hide();
			XN.DO.alert({
				title:"好友申请失败",
				message:"<p style='margin:10px;'>"+msg.message+"</p>"
			});
		}
    }
	
	//初始化User
	function initUser(args){
		if ( !/^\d+$/.test( args[ 0 ] ))
			user = {id:args[1],name:args[2],head_url:args[3],star:true,from:args[4],action:args[5]};
		else
			user = {id:args[0],name:args[1],head_url:args[2],star:args[3],from:args[4],callback:args[5]};
	}
	
	//返回当前用户对应的Action
	function getAction(){
		var action = new XN.USER.addFriendAction({
			needComment : false
		});
		action.addEvent( 'beforePost' , beforePost );
		action.addEvent( 'success' , success );
		action.addEvent( 'checkError' , function(message){
			dialog.hide();
			XN.DO.showError(message,"错误提示",2);
			setTimeout(function(){
				dialog.show();
			},2000);
		});    
		action.addEvent( 'error', function( id , message ){
			dialog.hide();
			XN.DO.showError( message );
		});	
		
		return action;
	}
	
	//对外的好友申请接口
	window.showRequestFriendDialog = function(uid,name,head,star,from,action){
		//初始化用户
		initUser(arguments);
		//加载好友提示语
		loadingDialog();
		new XN.NET.xmlhttp({
			url:"GetFriendCue.do",
			method:"get",
			data:'id=' + user.id,
			onSuccess:function(r){
				var result=XN.JSON.parse(r.responseText);
				
				var speak=result.type==0 ? "" : result.content;
				var isStar=result.isTrue ? true: false;
				var gender=result.ta===false ? "她" : "他";
				requestDialog(speak,isStar,gender);
			},
			onError:function(r){
				dialog.hide();
				XN.DO.showError('网络通信失败,请重试');
			}
		});
	};
});
/**
 * @module ui
 */

/**
 * @namespace XN
 * @class ui
 * @static
 */

XN.namespace( 'ui' );

(function()
{
	/**
	 * @namespace XN.ui
	 * @class element
	 * @static
	 */
	
	XN.ui.element = {
		
		/**
		 *  the  frame element
		 *  @property frame
		 *  @type {HTMLElement}
		 */
		
		frame : null,
		
		/**
		 * @property iAmUIelement
		 * @protected
		 * @type {Boolean}
		 * @default true
		 */
		
		iAmUIelement : true
		
	};

	/**
	 * @method show
	 * @see XN.element.show
	 */
	
	/**
	 * @method hide
	 * @see XN.element.hide
	 */
	
	/**
	 * @method remove
	 * @see XN.element.remove
	 */
	
	/**
	 * @method addClass
	 * @see XN.element.addClass
	 */
	
	/**
	 * @method deClass
	 * @see XN.element.delClass
	 */
	
	XN.array.each( [ 'addClass' , 'delClass' , 'show' , 'hide' , 'remove' ] , function( i , v )
	{
		XN.ui.element[ v ] = function()
		{
			XN.element[ v ].apply( null , [ this.frame ].concat( XN.array.build( arguments ) ) );
		}
	} );

	/**
	 * @namespace XN.ui
	 * @class container
	 * @static
	 * @extends XN.ui.element
	 */
	
	XN.ui.container =
	{
		
		/**
		 * @property container
		 * @type {HTMLElement}
		 */
		
		container : null
	};
	
	/**
	 * @method addChild
	 * @see XN.element.addChild
	 */
	
	/**
	 * @method delChild
	 * @see XN.element.deChild
	 */
	
	/**
	 * @method setContent
	 * @see XN.element.setContent
	 */
	
	XN.array.each( [ 'addChild' , 'delChild' , 'setContent' ] , function( i , v )
	{
		XN.ui.container[ v ] = function()
		{
			XN.element[ v ].apply( null , [ this.container ].concat( XN.array.build( arguments ) ) );
		}
	} );
	
	$extend( XN.ui.container , XN.ui.element );
	
})();





/*
 *  patch for old version
 */

XN.UI = XN.Ui = XN.ui;
XN.ui.Element = XN.ui.element;
XN.ui.Content = XN.ui.container;

/*
 * patch end
 */
(function( ns )
{	
	var UI = XN.ui;
	var addEvent = XN.event.addEvent;
	var DEBUG = true;
	
	function log( s )
	{
		if ( DEBUG ) XN.log( isString( s ) ? 'xn.ui.button:' + s : s );
	}

	/**
	 * create a button
	 * @namespace XN.ui
	 * @class button
	 * @constructor
	 * @param  {Object} params The intial Attribute.
	 * @extends XN.ui.element
	 */
	
	ns.button = function( params )
	{
		$extend( this , params );
		this.init();
	};

	ns.button.prototype = $extend( {} , UI.Element );
	
	/**
	 * the title of the button
	 * @property text
	 * @type String
	 */
	
	ns.button.prototype.text = null;
	
	/**
	 *	the className of the button
	 * @property className
	 * @type String
	 * @default 'input-submit'
	 */
	
	ns.button.prototype.className = '';
	
	/**
	 *  the disable class of the button
	 *  @property disableClassName
	 *  @type String
	 *  @default 'gray'
	 */
	
	ns.button.prototype.disableClassName = 'gray';
	
	
	/**
	 * init
	 * @private
	 */
	
	ns.button.prototype.init = function()
	{
		var This = this;

		var el;

		if ( this.getConfig( 'el' ) )
		{
			el = $( this.getConfig( 'el' ) );
		}
		else
		{
			el = $element( 'input' );
		}
		
		this.frame = el;
		el.type = 'button';
	    this.addClass( 'input-submit' );	
		this.addClass( this.getConfig( 'className' ) );
		this.setText( this.getConfig( 'text' ) );
		
		addEvent( el , 'click' , function()
		{
			if ( This.onclick ) This.onclick();
		} , false );		
	};
	
	/**
	 * get user config
	 * @param {String} key
	 * @method getConfig
	 * @return {Any}
	 */
	
	ns.button.prototype.getConfig = function( key )
	{
		if ( key == 'el' ) return this.id;
		return this[ key ];
	};
	
	/**
	 * get dom element of the button
	 * @method getEl 
	 * @return {HTMLElement}
	 */
	
	ns.button.prototype.getEl = function()
	{
		return this.frame;
	};
	/**
	 * set title of the button
	 * @method setText 
	 * @param {String} text
	 */
	
	ns.button.prototype.setText = function( text )
	{
		this.text = text;
		this.getEl().value = text;
	};
	
	/**
	 * disable the button
	 * @method disable
	 */
	
	ns.button.prototype.disable = function(){
		var el = this.getEl();
		el.blur();
		el.disabled = true;
		el.addClass( this.getConfig( 'disableClassName' ) );
	};

	/**
	 *  enable the button
	 *	@method enable
	 */
	
	ns.button.prototype.enable = function(){
		var el = this.getEl();
		el.disabled = false;
		el.delClass( this.getConfig( 'disableClassName' ) );
	};

	/**
	 *  focus on the button
	 *  @method focus
	 */
			
	ns.button.prototype.focus = function(){
		this.getEl().focus();
	};
	
	/**
	 *  make the button blur
	 *  @method blur
	 */

	ns.button.prototype.blur = function(){
		this.getEl().blur();
	};

})( XN.ui );
(function()
{
	var rl = 'realLeft',rt = 'realTop',ow = 'offsetWidth',oh = 'offsetHeight';
	XN.ui.fixPositionMethods = {
		'1-1':function(f,el,x,y,p)
		{
			f.style.left = x + el[ rl ]() - p[ rl ]() + 'px';
			f.style.top = y + el[ rt ]() - p[ rt ]() + 'px';
		},
		'1-2':function(f,el,x,y,p)
		{
			f.style.left = x + el[ rl ]() - p[ rl ]() - f[ ow ] + 'px';
			f.style.top = y + el[ rt ]() - p[ rt ]()  + 'px';
		},
		'1-3':function(f,el,x,y,p)
		{
			f.style.left = x + el[ rl ]() - p[ rl ]() - f[ ow ] + 'px';
			f.style.top = y + el[ rt ]() - p[ rt ]() - f[ oh ] + 'px';
		},
		'1-4':function(f,el,x,y,p)
		{
			f.style.left = x + el[ rl ]() - p[ rl ]() + 'px';
			f.style.top = y + el[ rt ]() - p[ rt ]()  - f[ oh ] + 'px';
		},
		'2-1':function(f,el,x,y,p)
		{
			f.style.left = x + el[ rl ]() - p[ rl ]() + el[ ow ] + 'px';
			f.style.top = y + el[ rt ]() - p[ rt ]()  + 'px';
		},
		'2-2':function(f,el,x,y,p)
		{
			f.style.left = x + el[ rl ]() - p[ rl ]() + el[ ow ] - f[ ow ] + 'px';
			f.style.top = y + el[ rt ]() - p[ rt ]() ;
		},
		'2-3':function(f,el,x,y,p)
		{
			f.style.left = x + el[ rl ]() - p[ rl ]() + el[ ow ] - f[ ow ] + 'px';
			f.style.top = y + el[ rt ]() - p[ rt ]()  - f[ oh ] + 'px';
		},
		'2-4':function(f,el,x,y,p)
		{
			f.style.left = x + el[ rl ]() - p[ rl ]() + el[ ow ] + 'px';
			f.style.top = y + el[ rt ]() - p[ rt ]()  - f[ oh ] + 'px';
		},
		'3-1':function(f,el,x,y,p)
		{
			f.style.left = x + el[ rl ]() - p[ rl ]() + el[ ow ] + 'px';
			f.style.top = y + el[ rt ]() - p[ rt ]() + el[ oh ] + 'px';
		},
		'3-2':function(f,el,x,y,p){
			f.style.left = x + el[ rl ]() - p[ rl ]() + el[ ow ] - f[ ow ] + 'px';
			f.style.top = y + el[ rt ]() + el[ oh ] + 'px';
		},
		'3-3':function(f,el,x,y,p)
		{
			f.style.left = x + el[ rl ]() - p[ rl ]() + el[ ow ] - f[ ow ] + 'px';
			f.style.top = y + el[ rt ]() - p[ rt ]() + el[ oh ] - f[ oh ] + 'px';
		},
		'3-4':function(f,el,x,y,p)
		{
			f.style.left = x + el[ rl ]() - p[ rl ]() + el[ ow ] + 'px';
			f.style.top = y + el[ rt ]() - p[ rt ]() + el[ oh ] - f[ oh ] + 'px';
		},
		'4-1':function(f,el,x,y,p)
		{
			f.style.left = x + el[ rl ]() - p[ rl ]() + 'px';
			f.style.top = y + el[ rt ]() - p[ rt ]() + el[ oh ] + 'px';
		},
		'4-2':function(f,el,x,y,p)
		{
			f.style.left = x + el[ rl ]() - p[ rl ]() - f[ ow ] + 'px';
			f.style.top = y + el[ rt ]() - p[ rt ]() + el[ oh ] + 'px';
		},
		'4-3':function(f,el,x,y,p)
		{
			f.style.left = x + el[ rl ]() - p[ rl ]() - f[ ow ] + 'px';
			f.style.top = y + el[ rt ]() - p[ rt ]() + el[ oh ] - f[ oh ] + 'px';
		},
		'4-4':function(f,el,x,y,p)
		{
			f.style.left = x + el[ rl ]() - p[ rl ]() + 'px';
			f.style.top = y + el[ rt ]() - p[ rt ]() + el[ oh ] - f[ oh ] + 'px';
		}
	};	
})();

/**
 * create fix position element
 * @namespace XN.ui
 * @class fixPositionElement
 * @constructor
 * @param {Object} params
 * @extends XN.ui.container
 */

XN.ui.fixPositionElement = function( params )
{
	var This = this;
	
	this.config = {
		tagName : 'div',
        useIframeInIE6 : true
	};
	
	$extend( this.config , params );
	
	var f,x,y;

	if ( this.getConfig( 'id' ) )
	{
		this.frame = this.container = f = $( this.getConfig( 'id' ) );
		x = f.realLeft();
		y = f.realTop();
	}
	else if ( this.getConfig( 'tagName' ) )
	{
		this.frame = this.container = f = $element( this.getConfig( 'tagName' ) );
	}
	else return;

	XN.array.each( [ 'alignWith' , 'alignType' , 'offsetX' , 'offsetY' , 'alignParent' ] , function( i , v )
	{
        This[ v ] = This.getConfig( v ) || This[ v ];
	} );
    

    XN.element.setStyle( f , 'position:absolute;z-index:10001;left:-9999px;top:-9999px' );
	

    if( !$( this.alignParent ) ) this.alignParent = $( document.body );
	
    $( this.alignParent ).appendChild( this.frame );

	if ( ( XN.browser.IE6 && this.getConfig( 'useIframeInIE6' ) ) || this.getConfig( 'addIframe' ) )
	{
		var iframe;
		this._iframe = iframe = $element( 'iframe' );
		iframe.frameBorder = 0;
		iframe.setStyle( 'position:absolute;border:0px;left:0px;top:0px;z-index:-1;' );
        //fix 防止对话框高度改动时露出空白的iframe
        iframe.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';
		this.frame.appendChild( iframe );	
    }
	if ( XN.element.visible( f ) ) this.show();
    
    f.style.display = 'block';
};

XN.ui.fixPositionElement.prototype = $extend( {} , XN.ui.container );

$extend( XN.ui.fixPositionElement.prototype ,
{
	
	/**
	 * the element align with
	 * @property alignWith
	 * @type {HTMLElement | String}
	 */
	
	alignWith : null,
	
	/**
	 * @property alignType
	 * @type {String}
	 */
	
	alignType : '4-1',
	
	/**
	 * @property offsetX
	 * @type {Int}
	 * @default 0
	 */
	
	offsetX : 0,
	
	/**
	 * @property offsetY 
	 * @type {Int}
	 * @default 0
	 */
	
	offsetY : 0,
	
	/**
	 * @property alignParent
	 * @type {HTMLElement | String}
	 * @default 'dropmenuHolder'
	 */
	
	alignParent : 'dropmenuHolder',
	
	left : null,
	top : null,

	_isShow : false,

	getConfig : function( key )
	{
		return this.config[ key ];
	},
	
	/**
	 * set offset x
	 * @method setOffsetX
	 * @param {Int} x
	 * @return {Object} this
	 */
	
	setOffsetX : function( x )
	{
		this.offsetX = x;
		this.refresh();
		return this;
	},
	
	/**
	 * set offset y
	 * @method setOffestY
	 * @param {Int} y
	 * @return {Object} this
	 */
	
	setOffsetY : function( y )
	{
		this.offsetY = y;
		this.refresh();
		return this;
	},
	
	/**
	 * @method setAlignType
	 * @param {String} t
	 * @return {Object} this
	 */
	
	setAlignType : function( t )
	{
		this.alignType = t;
		this.refresh();
		return this;
	},
	
	/**
	 * @method setAlignParent
	 * @param {HTMLElement | String} p
	 * @return {Object} this
	 */
	
	setAlignParent : function( p )
	{
		this.alignParent = p;
		$( this.alignParent ).appendChild( this.frame );
		this.refresh();
		return this;
	},
	
	/**
	 * @method refresh
	 * @return {Object} this
	 */
	
	refresh : function()
	{
		if ( this.visible() )
		{
			this.show();
		}
		else
		{
			this.hide();
		}
		return this;
	},
	
	/**
	 * @method visible
	 * @return {Boolean}
	 */
	
	visible : function()
	{
		return this._isShow;
	},
	
	/**
	 * @method show
	 * @return {Object} this
	 */
	
	show : function()
	{
		this._isShow = true;
		if ( this.alignWith )
		{
			this._moveToElement( this.alignWith );
		}
		else
		{
			var x = this.left === null ? parseInt( ( ( $( this.alignParent ).offsetWidth -  this.frame.offsetWidth ) / 2 ) , 10 ) : this.left;
			var y = this.top === null ? XN.event.scrollTop() + 100 : this.top;
			this._moveToPosition( x , y );
		}

		if( this._iframe )
		{
            //fix bug for ie6
            try
            {
			    this._iframe.style.height = this.frame.offsetHeight - 2 + 'px';
			    this._iframe.style.width = this.frame.offsetWidth + 'px';
            }catch( e ){}
		}

		return this;
	},
	
	/**
	 * @method hide
	 * @return {Object} this
	 */
	
	hide : function()
	{
        this._isShow = false;
		var f = this.frame;
		//this.left = f.offsetLeft;
		//this.top = f.offsetTop;
		f.style.left = '-9999px';
		f.style.top = '-9999px';
		return this;
	},
	
	/**
	 * @method moveTo
	 * @param {HTMLElement | String | Int} x
	 * @param {Int} y
	 * @return {Object} this
	 */
	
	moveTo : function( x , y )
	{
		if ( !x && !y ) return;
		if ( isNumber( x ) )
		{
			this.left = x;
            this.alignWith = null;
		}
		else if ( isString( x ) || isElement( x ) )
		{
			this.alignWith = $( x );
		}
		
		if ( isNumber( y ) )
		{
			this.top = y;
            this.alignWith = null;
		}
		
		this.refresh();
		
		return this;
	},
	
	/**
	 * @method setX
	 * @param {Int} x
	 * @return {Object} this
	 */
	
	setX : function( x )
	{
		this.moveTo( x );
		return this;
	},
	
	/**
	 * @method setY
	 * @param {Int} y
	 * @return {Object} this
	 */
	
	setY : function( y )
	{
		this.moveTo( null , y );
		return this;
	},

	/**
	 * @method setIndex
	 * @param {Int} i
	 * @return {Object} this
	 */
		
	setIndex : function( i )
	{
		this.frame.style.zIndex = i;
		return this;
	},
	
	_moveToElement : function( el )
	{
		XN.ui.fixPositionMethods[ this.alignType ](
			this.frame , $( el ) , this.offsetX , this.offsetY , $( this.alignParent )
		);
	},
	
	_moveToPosition : function( x , y )
	{
		if ( x )
		{
			this.frame.style.left = x + 'px';
		}
		if ( y )
		{
			this.frame.style.top = y + 'px';
		}
	}
} );
(function()
{
	var fixProto = XN.ui.fixPositionElement.prototype;
	var Event = XN.event;
	/**
	 * 创建一个dialog
     * <pre>
     * 参数形式如下
     * {
     *  HTML:''//自定义对话框的html代码
     * }
     *
     * 自定义代码中必须包含下面三个id的元素
     *  ui_dialog_header
     *  ui_dialog_body
     *  ui_dialog_footer
     * </pre>
	 * @namespace XN.ui
	 * @class dialog
	 * @constructor
	 * @param {Object} params
	 * @extends XN.ui.fixPositionElement
	 */
	
	XN.ui.dialog = function( params )
	{
		var This = this;
		XN.ui.fixPositionElement.call( this , params );
	    
        this.container = $element( 'div' );
        this.frame.appendChild( this.container );

        if ( this.getConfig( 'HTML' ) )
        {
            this.setContent( this.getConfig( 'HTML' ) )
        }
        else
        {
		    this.setContent( this.buildHTML() );
        }
		
		this.header = $( 'ui_dialog_header' );
		this.body = $( 'ui_dialog_body' );
		this.footer = $( 'ui_dialog_footer' );
		
		this.header.removeAttribute( 'id' );
		this.body.removeAttribute( 'id' );
		this.footer.removeAttribute( 'id' );
		
		//lower than menu
		this.frame.style.zIndex = 10000;
		
		this.setWidth( this.getConfig( 'width' ) || 400 );
		
		if ( this.getConfig( 'height' ) ) this.setHeight( this.getConfig( 'height' ) );
		
		XN.array.each( [ 'header' , 'body' , 'footer' ] , function( i , v )
		{
			if ( This.getConfig( v ) ) This[ v ].setContent( This.getConfig( v ) );
		} );
		
		if ( this.getConfig( 'type' ) ) this.setType( this.getConfig( 'type' ) );
		
		this._buttons = [];
		
		XN.event.addEvent( this.footer , 'click' , function( e )
		{
			e = e || window.event;
			This._parseButtonEvent( e );
		} );

        XN.util.hotKey.add( '27' , this._hotKeyEvent , this );

        if ( this.getConfig( 'modal' ) )
        {
            XN.dom.disable();
        }
	};
	XN.ui.dialog.prototype = $extend( {} , fixProto );
	$extend( XN.ui.dialog.prototype , 
	{
		header : null,
		body : null,
		footer : null,
		_iframe : null,
		_buttons : null,
	    
        buildHTML : function()
        {
            return [
                '<table style="width: 100%; height: 100%;" class="pop_dialog_table">',
                    '<tbody>',
                        '<tr>',
                            '<td class="pop_topleft"></td>',
                            '<td class="pop_border"></td>',
                            '<td class="pop_topright"></td>',
                        '</tr>',
                        '<tr>',
                            '<td class="pop_border"></td>',
                            '<td class="pop_content">',
                                '<h2><span id="ui_dialog_header"></span></h2>',
                                '<div class="dialog_content">',
                                    '<div id="ui_dialog_body" class="dialog_body"></div>',
                                    '<div id="ui_dialog_footer" class="dialog_buttons"></div>',
                                '</div>',
                            '</td>',
                            '<td class="pop_border"></td>',
                        '</tr>',
                        '<tr>',
                            '<td class="pop_bottomleft"></td>',
                            '<td class="pop_border"></td>',
                            '<td class="pop_bottomright"></td>',
                        '</tr>',
                        '</tbody>',
                    '</table>'
            ].join( '' );
        },

		/**
		 * 通过一个按钮的标题获取按钮的实例
		 * @method getButton
		 * @param {String} text
		 * @return {XN.ui.button}
		 */
		
		getButton : function( text )
		{
			var buttons = this._buttons;

			for ( var i = buttons.length - 1 ; i >= 0 ; i -- )
			{
				if ( buttons[ i ].text == text ) return buttons[ i ];
			}
			
			return null;
		},

		/**
		 * 向对话框底部添加按钮
         * <pre>
         *  参数形式如下: 
         *  {
         *      text : '',//按钮的文字
         *      onclick : callback//按钮onclick时触发的函数
         *  } 
         * </pre>
		 * @method addButton
		 * @param {Object} b
		 * @return {Object} this
		 */
		
		addButton : function( b )
		{
			var o = {
				text : b.text,
				_onclickForDialog : b.onclick				
			};
			if ( b.className ) o.className = b.className;
			var button = new XN.ui.button( o );

            /*
             * patch for panel
             */
            
            button.frame.setAttribute( 'dialog' , '1' );

            /*
             * patch end
             */

			this._buttons.push( button );

			this.footer.addChild( button );
			return this;
		},

		/**
		 * 从从对话框删除按钮，参数为按钮的文字
		 * @method delButton
		 * @param {String} b title of the button
		 * @return {Object} this
		 */
		
		delButton : function( b )
		{
			if ( isString( b ) ) b = this.getButton( b );

			this.footer.delChild( b );
			return this;
		},
        
        
        _preventHide : false,

        /**
         * 阻止对话框关闭，用于按钮的回调函数
         * <pre>
         * callBack=function()
         * {
         *  this.preventHide();
         *  .....
         * }
         * </pre>
         * @method preventHide
         * @return {Object} this
         */

        preventHide : function()
        {
            this._preventHide = true;
            return this;
        },

		_parseButtonEvent : function( e )
		{
			var el = Event.element( e );
			if ( el.tagName.toLowerCase() !== 'input' || el.type !== 'button' ) return;
            if ( !el.getAttribute( 'dialog' ) ) return;
			
            var button = this.getButton( el.value );
			
            if ( button && button._onclickForDialog )
            {
                button._onclickForDialog.call( this );
            }
            
            if ( this._preventHide )
            {
                this._preventHide = true;
            }
            else
            {
			    this.hide();
                XN.dom.enable();
            }
		},

        _hotKeyEvent : function()
        {
            this.hide();
        },
		
		/**
		 * 设置对话框的样式'normal' or 'error' type
		 * @method setType
		 * @param {String} t
		 * @return {Object} this
		 */
		
		setType : function( t )
		{
			if ( t == 'normal' )
			{
				this.frame.delClass( 'errorDialog' );
			}
			else if ( t == 'error' )
			{
				this.frame.addClass( 'errorDialog' );
			}
			return this;
		},
		
		/**
         * 设置对话框宽度
		 * @method setWidth
		 * @param {Int} w
		 * @return {Object} this
		 */
		
		setWidth : function( w )
		{
			if ( !w ) return this;
			this.width = w;
			this.frame.style.width = w + 'px';
			this.refresh();
			return this;
		},
		
		/**
         * 设置对话框高度，一般是自动伸展
		 * @method setHeight
		 * @param {Int} h
		 * @return {Object} this
		 */
		
		setHeight : function( h )
		{
			if ( !h )return this;
			this.hegith =  h;
			this.frame.style.height = h + 'px';
			this.refresh();
			return this;
		},
        
        /**
         * resize
         * @method resizeTo
         * @param {Int} w
         * @param {Int} h
         * @return {Object} this
         */

        resizeTo : function( w , h )
        {
            this.setWidth( w );
            this.setHeight( h );
            return this;
        },
		
		/**
         * 清空对话框的内容
		 * @method clear
		 * @return {Object} this
		 */
		
		clear : function()
		{
			this.header.setContent( '' );
			this.body.setContent( '' );
			this.footer.setContent( '' );
			this._buttons = [];
			return this;
		},
				
		/**
         * 设置对话框的标题
		 * @method setTitle
		 * @param {String} s
		 * @return {Object} this
		 */
		
		setTitle : function( s )
		{
			this.header.setContent( s );
			return this;
		},
		
		/**
         * 设置对话框的内容
		 * @method setBody
		 * @param {String} s
		 * @return {Object} this;
		 */
		
		setBody : function( s )
		{
			this.body.setContent( s );
			return this;
		},


        remove : function()
        {
            XN.util.hotKey.del( '27' , this._hotKeyEvent );
            XN.ui.element.remove.call( this );
            return this;
        },
        
        show : function()
        {
            this._clearHideTimer();
            fixProto.show.apply( this , arguments );
            return this;
        },

        hide : function()
        {
            this._clearHideTimer();
            fixProto.hide.apply( this , arguments );
            return this;
        },

        _hideTimer : null,
        _clearHideTimer : function()
        {
            if ( this._hideTimer )
            {
                clearTimeout( this._hideTimer );
                this._hideTimer = null;
            }
        },
        
        /**
         * 自动关闭对话框
         * @method autoHide
         * @param {Int} t
         * @return {Object} this
         */

        autoHide : function( t )
        {
            var This = this;
            this._hideTimer = setTimeout(function()
            {
                This.hide();
            }, t * 1000 );
            return this;
        }
	} );
})();

/*
 *  patch for old version
 */
XN.ui.panel = XN.ui.dialog;
XN.ui.dialog.prototype.setHeader = function( h )
{
	if( h && h !== '')
	{
		this.header.addChild( h );
	}
	else
	{
		this.header.innerHTML = '';
	}	
};
XN.ui.dialog.prototype.setFooter = function( f )
{
	if ( f && f !== '' )
	{
		this.footer.addChild( f );
	}
	else
	{
		this.footer.innerHTML = '';
	}
};
/*
 * patch end
 */

/**
 * 菜单
 * <pre>
 *  参数形式如下
 *  {
 *      button : 'el',//触发元素的id
 *      hoverClass : 'classname',//菜单显示时button的样式
 *      event : 'mouseover',//事件类型，还可以是click,manual
 *      alignType : '4-1',//菜单对齐方式
 *      delay :　0.2,//延迟时间，用于mouseover
 *      useIframeInIE6 : true,//在ie6是否添加iframe
 *      addIframe : false,//是否强制添加iframe
 *  }
 * </pre>
 *
 * @namespace XN.ui
 * @class menu
 * @constructor
 * @param {Object} params
 */

XN.ui.menu = function( params )
{
	var This = this;

	this.config = {
		alignType : '4-1',
		barOnshowClass : '',
		tagName : 'div',
		disalbeButtonClickEvent : true,
		fireOn : 'click',
		keep : 0.2,
        useIframeInIE6 : true,
        effectTime : 50
	};

	$extend( this.config , params );
	
	var frame;
	
	if ( this.getConfig( 'text' ) )
	{
		this.frame = frame = $element( this.getConfig( 'tagName' ) );
		frame.setContent( this.getConfig( 'text' ) );
	}
	else if ( this.getConfig( 'button' ) )
	{
		this.frame = frame = $( this.getConfig( 'button' ) );
	}
	else return false;
	
	this._alignType = this.getConfig( 'alignType' );
	
	if ( this.getConfig( 'menu' ) )
	{
        $( this.getConfig( 'menu' ) ).hide();

		this.menu = new XN.ui.fixPositionElement(
		{
			id : this.getConfig( 'menu' ),
			alignType : this._alignType,
			alignWith : this.getConfig( 'alignWith' ) || this.frame,
			addIframe : this.getConfig( 'addIframe' ),
            useIframeInIE6 : this.getConfig( 'useIframeInIE6' )
		}); 
		this.container = this.menu.frame;
		this._canAddSubMenu = false;
	}
	else
	{
        var dt = $element( 'div' );
        dt.hide();
		this.menu = new XN.ui.fixPositionElement(
		{
			//tagName : 'div',
            id : dt,
            alignType : this._alignType,
			alignWith : this.getConfig( 'alignWith' ) || this.frame,
			addIframe : this.getConfig( 'addIframe' ),
            useIframeInIE6 : this.getConfig( 'useIframeInIE6' )
		});
		this.container = $element( 'div' );
		this._menu.setContent( this.container );
	}
    
	
	this.menu.setIndex( 10001 );
	

	XN.event.addEvent( this.menu.frame , 'click' , function( e )
	{
		e = e || window.event;
        This._frameOnClick( e );
	} , false );
	this.menu.setOffsetX( this.getConfig( 'offsetX' ) || 0 );
	this.menu.setOffsetY( this.getConfig( 'offsetY' ) || 0 );
	var eventType = this.getConfig( 'event' );
	if ( eventType == 'click' )
	{
		XN.event.addEvent( this.frame , 'click' , function( e )
		{
			This._buttonClick( e || window.event );
		} );
		XN.event.addEvent( document , 'click' , function( e )
		{
			This._documentClick( e || window.event );
		} );
	}
	else if ( eventType == 'mouseover' )
	{
		XN.event.addEvent( this.frame , 'mouseover' , function( e )
		{
			This._frameMouseOver( e || window.event );
		} );
		
		if ( this.getConfig( 'disalbeButtonClickEvent' ) )
		{
			XN.event.addEvent( this.frame , 'onclick' , function( e )
			{
				XN.event.stop( e || window.event );
			} );
		}
		
		XN.event.addEvent( this.frame , 'mouseleave' , function()
		{
            This._buttonMouseLeave();
		});
		
		XN.event.addEvent( this.menu.frame , 'mouseleave' , function()
		{
            This._menuMouseLeave();
		});
		
		XN.event.addEvent( this.menu.frame , 'mouseover' , function()
		{
			This._mouseOverMenu = true;
		});
	}
	else if ( eventType == 'manual' )
	{
	}
	this.hide();
};

XN.ui.menu.prototype = $extend( {} , XN.ui.container );

$extend( XN.ui.menu.prototype ,
{
	isShow : true,
	menu : null,
	_alignType : null,
	_button : null,
	_canAddSubMenu : true,
	_delayTimer : null,
	_mouseOverMenu : false,
	_mouseOverButton : false,
	_clearTimer : function()
	{
		if ( this._delayTimer )
		{
			clearTimeout( this._delayTimer );
			this._delayTimer = null;
		}
	},
	_buttonClick : function( e )
	{
		XN.event.stop( e );
		if ( this.isShow ) 
			this.hide();
		else
			this.show();
	},
	_documentClick : function( e )
	{
		this.hide();
	},
    
    _frameOnClick : function( e )
    {
        var This = this;
		var el = XN.event.element( e );
		if ( el.tagName.toLowerCase() == 'a' ) return true;
		if ( el.tagName.toLowerCase() == 'input' && ( el.type == 'radio' || el.type == 'checkbox' ) )
        {
            this.isShow = false;
            setTimeout( function()
            {
                This.isShow = true;
            } , 20 );
            return true;
        }
        XN.event.stop( e );
    },

	_frameMouseOver : function( e )
	{
		var This = this;
		this._mouseOverButton = true;
		
		this._clearTimer();
		
		var delay = this.getConfig( 'delay' );
		if ( delay )
		{
			this._delayTimer = setTimeout( function()
			{
				if ( This._mouseOverButton ) This.show();
			} , delay * 1000 );
		}
		else
		{
			This.show();
		}
		XN.event.stop( e );
	},
	_buttonMouseLeave : function()
	{
		var This = this;
		this._mouseOverButton = false;
		this._clearTimer();
		setTimeout( function()
		{
			if ( !This._mouseOverMenu ) This.hide();
		} , this.getConfig( 'effectTime' ) );
	},
	_menuMouseLeave : function()
	{
        var This = this;
		this._mouseOverMenu = false;
		this._clearTimer();
		setTimeout( function()
		{
			if ( !This._mouseOverButton ) This.hide();
		} , this.getConfig( 'effectTime' ) );
	},
	getConfig : function( key )
	{
		var patch = 
		{
			'hoverClass' : 'barOnshowClass',
			'event' : 'fireOn',
			'button' : 'bar',
			'delay' : 'keep'
		};
		if ( patch[ key ] ) return this.config[ key ]  || this.config[ patch[ key ] ];

		return this.config[ key ];
	},

    /**
     * 显示菜单
     * @method show
     * @return {XN.ui.menu} this
     */

	show : function()
	{
		if ( this.isShow ) return this;
		this.menu.show();
		this.frame.addClass( this.getConfig( 'hoverClass' ) );
		this.onShow();
		this.isShow = true;
		return this;
	},
	
    /**
     * 设置菜单宽度
     * @method setWidth
     * @param {Int} width
     * @return {XN.ui.menu} this
     */

    setWidth : function( w )
	{
		this.menu.frame.style.width = w + 'px';
		this.menu.refresh();
        return this;
	},
	    
    /**
     * 隐藏菜单
     * @method hide
     * @return {XN.ui.menu} this
     */

    hide : function()
	{
		if ( !this.isShow ) return this;
		this.menu.hide();
		this.frame.delClass( this.getConfig( 'hoverClass' ) );
		this.isShow = false;
		return this;
	},
    
    /**
     * 刷新菜单
     * @method refresh
     * @return {XN.ui.menu} this
     */

    refresh : function()
    {
        if ( this.isShow )
        {
            this.menu.show();
        }
        return this;
    },

 	onShow : XN.func.empty,
	onHide : XN.func.empty
} );

XN.event.enableCustomEvent( XN.ui.menu.prototype );
/**
 * 自动完成
 * <pre>
 * 参数如下: 
 *  {
 *      input:id,//要使用自动完成的input元素
 *      searchDelay:num,//输入与搜索之间的延迟
 *      DS:obj,//搜索用的数据源,参见XN.util
 *      enableCache:true,//是否使用缓存
 *      maxCache:10//最大缓存长度
 *  }
 * </pre>
 *
 * @namespace XN.ui
 * @class autoComplete
 * @constructor
 * @param {Object} p
 * @extends XN.ui.element
 */

XN.ui.autoComplete = function( p )
{
	var This = this;
	
	this.config = this.config || {};
	
	$extend( this.config ,
	{
		inputTip : null,
		searchDelay : 0.2,
		DS : null,
		enableCache : true,
		maxCache : 10
	});
	
	$extend( this.config , p );
	
	if ( this.getConfig( 'enableCache' ) )
	{
		this.cache = new XN.util.cache({
			cacheLength : this.getConfig( 'maxCache' )
		});
	}
	
	if ( this.getConfig( 'input' ) )
	{
		var input = this.input = $( this.getConfig( 'input' ) );
	}
	else
	{
		var input = this.input = $element( 'input' );
        input.type = 'text';
        input.addClass( 'input-text' );
	}

	
	this.frame = input;
	
	XN.event.addEvent( input , 'focus' , function( e )
	{
		This._startCheck();
		This.fireEvent( 'focus' );
	});
	
	XN.event.addEvent( input , 'blur' , function( e )
	{
		This._endCheck();
		This.fireEvent( 'blur' );	
	});

    this.addEvent( 'focus' , function()
    {
        var v = this.input.value;
        if ( v == '' || v == this.getConfig( 'inputTip' ) )
        {
            this.fireEvent( 'noinput' );
        }
    });

    this.addEvent( 'blur' , function()
    {
        this._lastInput = null;
    });

    XN.event.addEvent( input , 'click' , function( e )
    {
        XN.event.stop( e || window.event );
    });
	
	XN.event.addEvent( input , 'keydown' , function( e )
	{
		This._userInput = true;
		e = e || window.event;
		if ( e.keyCode == 13 ) XN.event.stop( e );
		This.fireEvent( 'keydown' , e );
	});
	
	input.setAttribute( 'AutoComplete' , 'off' );

    this.DS = this.getConfig( 'DS' );
};

XN.ui.autoComplete.prototype = $extend( {} , XN.ui.element );

$extend( XN.ui.autoComplete.prototype,
{
	input : null,
	cache : null,
	_userInput : false,
	_lastInput : null,
	
	getConfig : function( key )
	{
		if ( key == 'input' ) return this.config[ 'input' ] || this.config[ 'id' ];
		return this.config[ key ];
	},
	
	_startCheck : function()
	{
		var This = this;
		this._inputTimer = setInterval(function()
		{
			if( This._userInput )
			{
			 	This._userInput = false;
				return;
			}
			This._checkInput();
		},this.getConfig( 'searchDelay' ) * 1000);
	},
	
	_endCheck : function()
	{
		clearInterval( this._inputTimer );
		this._inputTimer = null;		
	},
	
   
	_checkInput : function()
	{
		var This = this;
		var cv = this.input.value;
		
		if( XN.string.isBlank( cv ) )
		{
			if ( this._lastInput === '' )
			{
				return;
			}

			this._lastInput = '';
            this.fireEvent( 'noinput' );

			return;
		}
		
		if( cv == this._lastInput )
        { 
            return;
        }

		this._lastInput = cv;
		
		this.fireEvent( 'searchbegin' );
		
		if( this.cache )
		{
			var result = this.cache.get( cv );
			if( result )
			{
				this.fireEvent( 'searchover' , result );
				return;
			}
		}
		
		if ( !this.DS )
		{
            XN.log( 'no ds' );
			this.fireEvent( 'NO_DS' );
			return;
		}
		
		this.DS.query( cv , function( r )
		{
			if( This.cache ) This.cache.add( cv , r );
			This.fireEvent( 'searchover' , r );
		});		
	}
});

XN.event.enableCustomEvent( XN.ui.autoComplete.prototype );

(function()
{

var completeMenus = {};

getCompleteMenu = function( id )
{
    return  completeMenus[ id ];
};

/**
 * 自动完成菜单
 * @namespace XN.ui
 * @class autoCompleteMenu
 * @constructor
 * @param {Object} p
 * @extends XN.ui.autoComplete
 */

XN.ui.autoCompleteMenu  = function( p )
{
	var This = this;
    
    this._MID = XN.util.createObjID();
    
    completeMenus[ this._MID ] = this;

	this.config = this.config || {};
	
	$extend( this.config ,
	{
		ulClassName : '',
		liClassName : '',
		liHoverClass : 'm-autosug-hover',
		aClassName : '',
		noResult : '没有匹配结果',
		dataLoading : '正在加载数据...',
		noInput : null,
		autoSelectFirst : false
	} );
	
	XN.ui.autoComplete.call( this , p );
	
	var input = this.input;

	var m = $element('div');
	this._menuList = m;
	m.className = 'm-autosug';
	m.innerHTML = '<span class="x1"><span class="x1a"></span></span><span class="x2"><span class="x2a"></span></span>';
	var div = $element('div');
	div.className = 'm-autosug-minwidth';
	var div2 = $element('div');
	div2.className = 'm-autosug-content';
	var ul = $element('ul');
	ul.className = this.ulClass;

	div2.appendChild( ul );
	div.appendChild( div2 );
	m.appendChild( div );

	this._ul = this._menuList.getElementsByTagName( 'ul' )[0];
	
	this.menu = new XN.UI.menu(
	{
		button : input,
		menu : m,
		fireOn : 'manual'
	});

	this.addEvent( 'keydown' , this._inputOnkeydown );
	
	XN.event.addEvent( this._ul , 'mousedown' , function( e )
	{
		This._menuOnclick( e || window.event );
	});
	
    /*
	XN.event.addEvent( this._ul , 'mousemove' , function( e )
	{
		return This._menuOnmouseover( e || window.event );
	});
    */
	XN.event.addEvent( document , 'click' , function(){
		This.menu.hide();
	} , false );

	this.menu.hide();
	
	/*
	 * 没有输入时关闭菜单
	 */
	this.addEvent( 'noinput' , function()
	{
		var tip = this.getConfig( 'noInput' );
		if( !tip )
		{
			this.menu.hide();
			return;
		}
		this._ul.innerHTML = '<li><p>' + tip + '</p></li>';
		this.menu.show();
	});
	
	this.addEvent( 'NO_DS' , function()
	{
		var tip = this.getConfig( 'dataLoading' );
		this._ul.innerHTML = '<li><p>' + tip + '</p></li>';
		this.menu.show();			
	});
			
	this.addEvent( 'searchover' , this._buildMenu );
};

XN.ui.autoCompleteMenu.prototype = $extend( {} , XN.ui.autoComplete.prototype );

$extend( XN.ui.autoCompleteMenu.prototype ,
{
	menu : null,
	_menuList : null,
	_ul : null,
	_currentLi : null,
	
	_highlightMenuItem : function( li )
	{
		if ( li == this._currentLi ) return;
		var hoverClass = this.getConfig( 'liHoverClass' );
		if ( this._currentLi !== null )
        {
            XN.element.delClass( this._currentLi , hoverClass );
        }
		XN.element.addClass( li , hoverClass );
		this._currentLi = li;
		var aid = this._currentLi.getAttribute( 'aid' );

		if( aid )
        {
            this.fireEvent( 'highlight' , this.result[ parseInt( aid ) ] );
	    }
    },

	/*
	 *  键盘事件处理函数
	 */

	_inputOnkeydown : function( event )
	{
		var li;

		/*
		 *   回车选择一个菜单项
		 */

		if ( event.keyCode == 13 )
		{
			if( this.menu.isShow && this._currentLi )
			{
				var aid = this._currentLi.getAttribute( 'aid' );
				if( aid ) this._selectMenuItem( parseInt( aid ) );
			}
			return false;
		}

		/*
		 *  向上高亮上一个
		 */

		if ( event.keyCode == 38 )
		{
			if ( this._currentLi && this._currentLi.previousSibling )
			{
				li = 	this._currentLi.previousSibling;
			}
			else
			{
				li = this._ul.lastChild;			
			}
			this._highlightMenuItem( li );
			return false;
		}

		/*
		 *  向下高亮下一个
		 */

		if ( event.keyCode == 40 )
		{
			if ( this._currentLi && this._currentLi.nextSibling )
			{
				li = 	this._currentLi.nextSibling;
			}
			else
			{
				li = this._ul.firstChild;			
			}
			this._highlightMenuItem( li );
			return false;
		}
		
		return true;
	},

	/*
	 *  当在菜单上点击时触发
	 */	
 
	_menuOnclick : function( event )
	{
		var el = XN.event.element( event );
		
		while ( el && el.tagName && el.tagName.toLowerCase() !== 'li' )
		{
			el = el.parentNode;
		}
        
		if ( !el || el.nodeType !== 1 || !el.getAttribute( 'aid' ) ) return false;
        this._selectMenuItem( parseInt( el.getAttribute( 'aid' ) ) );
        return false;
	},

	/*
	 *  当在菜单上移动鼠标时触发
	 */

	_menuOnmouseover : function( event )
	{
		var el = XN.event.element( event );
	    if ( el.parentNode == $( 'dropmenuHolder' ) ) return;
		while ( el && el.tagName &&  el.tagName.toLowerCase() !== 'li' )
		{
			el = el.parentNode;
		}
		
		if ( !el || el.nodeType !== 1 || !el.getAttribute( 'aid' ) ) return false;
		this._highlightMenuItem( el );
		return false;
	},
	
	/*
	 *  选择一个菜单项
	 */

	_selectMenuItem : function( id )
	{
		this.menu.hide();
		this.input.focus();
		this.fireEvent( 'select' , this.result[ id ] );
		this._lastInput = this.input.value;
	},

	/*
	 * 匹配结束,显示匹配结果
	 */

	_buildMenu : function( result )
	{
		var This = this;
		this.result = result;
		
        if ( result.length == 0 )
		{
			var noResult = this.getConfig( 'noResult' );

			if ( isFunction( noResult ) )
			{
				noResult = noResult.call( this );
			}

			this._ul.innerHTML = '<li>' + noResult + '</li>';
			this.menu.show();
			this._currentLi = null;
			return;
		}

		var lis = [];

        lis.push( this.firstMenuItem() );
		
        XN.array.each( result , function( i , v )
		{
			lis.push( '<li style="" onmouseover="getCompleteMenu(' + This._MID + ')._highlightMenuItem(this);" aid="' + i + '">' + This.buildMenu( v ) + '</li>' );
		});
		
        lis.push( this.lastMenuItem() );

        this._ul.innerHTML = lis.join('');
		
        if( this.getConfig( 'autoSelectFirst' ) ) this._highlightMenuItem( this._ul.firstChild );
		
        this.menu.show();
	},

    firstMenuItem : function()
    {
        return '';
    },
    
    lastMenuItem : function()
    {
        return '';
    },

	buildMenu : function( r )
	{
		return '<li>' + r.name + '</li>';
	},
	setMenuWidth : function( w )
	{
		this.menu.setWidth( w );
	}
} );
//XN.ui._friendsCacheData = null;

})();

XN.ui.friendSelector = function( params )
{
	var This = this;
	this.config = this.config || {};
	
	$extend( this.config ,
	{
		getFriendsUrl:'/company/getcompany.php?s=1',
        url : '/company/getcompany.php',
        param : {}
	});

	XN.ui.autoCompleteMenu.call( this , params );
	
	this.addEvent( 'select' , function( r )
	{
		this.input.value = r.name;
		if ( this.onSelectOne ) this.onSelectOne( r );			
	} );
	
	this.buildMenu = function( r )
	{
		return '<p>' + r.name + '</p>';
	};
	
	this.addEvent( 'focus' , function()
	{
		if ( this._ready ) return;
		if ( this._isLoading ) return;
        this.loadFriends();
	});
};

XN.ui.friendSelector.prototype = $extend( {} , XN.ui.autoCompleteMenu.prototype );
$extend( XN.ui.friendSelector.prototype,
{
	_isLoading:false,
	_ready:false,
	
    isReady : function()
    {
        return this._ready;
    },

    isLoading : function()
    {
        return this._isLoading;
    },
    
    loadFriends:function( r )
	{
        if ( this.isLoading() ) return;
        this._isLoading = true;
        var This = this;
        var p = {};
        p[ 'init' ] = true;
        p[ 'uid' ] = false;
        p[ 'uhead' ] = false;
        p[ 'uname' ] = false;
        p[ 'group' ] = false;
        p[ 'net' ] = false;
        p[ 'param' ] = this.getConfig( 'param' );

        new XN.NET.xmlhttp(
        {
            useCache : true,
            url : this.getConfig( 'url' ),
            method : 'get',
            data : 'p=' + XN.JSON.build( p ),
            onSuccess : function( r )
            {
                r = XN.JSON.parse( r.responseText );
                log( r );
                This._onload( r );
            }
        });
    },
    
    _onload : function( r )
    {
        this.isLoading = false;
        this._ready = true;
        this.config.qkey = r.qkey;
        this.DS = new XN.util.DS_friends(
        {
            url : this.getConfig( 'url' ),
            qkey : this.getConfig( 'qkey' ),
            limit : this.getConfig( 'limit' ) 
        });
    }
});

XN.ui.friendSelectorSynchronous = function( a , b )
{
    function s( id , ac , v )
    {
        if ( isObject( id ) ) id = id.id;

        if ( v.isReady() )
        {
            try{
                v[ ac ]( id );
            }catch(e){}
        }
        else
        {
            v.addEvent( 'load' , function()
            {
                try{
                    v[ ac ]( id );
                }catch(e){}
            } );
            v.loadFriends();
        }
    }
    
    a.addEvent( 'select' , function( id )
    {
        s( id , 'select' , b );
    } );
    a.addEvent( 'deselect' , function( id )
    {
        s( id , 'deselect' , b );
    } );
    b.addEvent( 'select' , function( id )
    {
        s( id , 'select' , a );
    } );
    b.addEvent( 'deselect' , function( id )
    {
        s( id , 'deselect' , a );
    });
};


(function(){

    /**
     * 多好友选择器
     * <pre>
     * 参数形式如下
     * {
     *      idInputName:'ids',//生成的id字段input的name属性
     *      nameInputName:'names',//生成的name字段input的name属性
     *      url:'/friendsSelector.do',//初始化的url
     *      initParam:{},//初始化参数
     *      param:{},//查询好友的额外参数
     *      maxNum:0//最大数量限制，超出时会触发'overMaxNum'事件
     * }
     * </pre>
     * @namespace XN.ui
     * @class multiFriendSelector
     * @constructor
     * @param {Object} params
     */

    XN.ui.multiFriendSelector = function(params)
    {
        var This = this;
        //ID_PRE ++;
        this._ID = XN.util.createObjID();

        this.config = this.config || {};
        $extend( this.config ,
        {
            inputName : 'ids',
            nameInputName : 'names',
            url : '/friendsSelector.do',
            initParam : {},
            param : {},
            noInput : false,
            maxNum : 0 
        });
        
        $extend( this.config , params );
        
        this.frame = $element('div');
        var div = $element( 'div' );
        div.hide();
        document.body.appendChild( div );
        div.appendChild( this.frame );
        
        this.frame.innerHTML = [
            '<div id="' + this.getID( 'friendsContainer' ) + '" class="tokenizer friendAutoSelector">',
            '<span class="tokenizer_stretcher">^_^</span>',
            '<span class="tab_stop"><input/></span>',
            '<span id="' + this.getID( 'inputContainer' ) + '" class="tokenizer_input"><input id="' + this.getID( 'input' ) + '" type="text" /></span><div id="' + this.getID( 'menu' ) + '"></div>',
            '</div>'
        ].join('');
        
        /*
         * patch for old version
         */
        
        this.input = this.getEl( 'input' );
        this.menuContainer = this.getEl( 'menu' );

        //this._friendsContainer = this.frame.firstChild;
        //this._inputContainer = this.frame.getElementsByTagName('span')[2];
        /*
         * patch end
         */


        XN.event.addEvent( this.getEl( 'friendsContainer' )  , 'click' , function( e )
        {
            This._parseClickEvent( e || window.event ); 
        });
        
        this.autoComplete = new XN.ui.friendSelector(
        {
            id : this.input,
            inputTip : '输入好友姓名...',
            autoSelectFirst : true,
            url : this.getConfig( 'url' ),
            param : this.getConfig( 'param' )
        });

        this.autoComplete.loadFriends = function( r )
        {
            if ( this.isLoading() ) return;
            this._isLoading = true;
            var p = {};
            p[ 'init' ] = true;
            p[ 'uid' ] = true;
            p[ 'uhead' ] = false;
            p[ 'uname' ] = true;
            p[ 'group' ] = false;
            p[ 'net' ] = false;

            $extend( p , This.getConfig( 'initParam' ) );
            
            p[ 'param' ] = this.getConfig( 'param' );

            new XN.NET.xmlhttp(
            {
                useCache : true,
                url : this.getConfig( 'url' ),
                method : 'get',
                data : 'p=' + XN.JSON.build( p ),
                onSuccess : function( r )
                {
                    r = XN.JSON.parse( r.responseText );
                    This._allFriends = r.candidate;
                    This.fireEvent( 'load' );
                    This.autoComplete._onload( r );
                }
            });
        };
        
        this.autoComplete.buildMenu = function(r)
        {
            return '<p>' + r.name + '</p>';
        };

        this.autoComplete.setMenuWidth(129);
        this.autoComplete.addEvent( 'keydown' ,function( e )
        {
            This._onInputKeydown(e);
        });
        this.autoComplete.addEvent( 'select' , function( r )
        {
            XN.log( this.input );
            this.input.value = '';
            This.selectFriend( r );
        });

        if ( this.getConfig( 'noInput' ) )
        {
            this.input.hide();
        }
        
        this.fireEvent( 'init' );
    };
    var proto = XN.ui.multiFriendSelector.prototype = $extend( {} , XN.ui.element );
    
    $extend( proto ,
    {
        //_friendsContainer : null,
        //_inputContainer : null,
        
        /**
         * 选择器是否就绪
         * @method isReady
         * @return {Boolean}
         */

        isReady : function()
        {
            return this.autoComplete.isReady();
        },

        isLoading : function()
        {
            return this.autoComplete.isLoading();
        },

        /**
         * 加载好友数据
         * @method loadFriends
         */

        loadFriends : function()
        {
            this.autoComplete.loadFriends();
        },

        /**
         * 跟据用户id得到一个用户对象
         * @method getUserByID
         * @param {String} id
         * @return {Object}
         */

        getUserByID : function( id )
        {
            id = String( id );
            var rt = null;
            XN.array.each( this._allFriends , function( i , v )
            {
                if ( String( v.id ) == id )
                {
                    rt = v;
                    return false;
                }
            } );
            return rt;
        },

        getConfig : function( key )
        {
            if ( key == 'inputName' ) return this.config[ 'idInputName' ] || this.config[ 'inputName' ];
            return this.config[ key ];
        },

        getID : function( id )
        {
            return 'mfs_' + this._ID + id;
        },
        
        getFriendID : function( id )
        {
            return this.getID( 'friend_' + id );
        },
    
        getFriendEl : function( id )
        {
            return $( this.getFriendID( id ) );
        },

        getEl : function( id )
        {
            return $( this.getID( id ) );
        },

        getFriendsNum : function()
        {
            return this.getEl( 'friendsContainer' ).getElementsByTagName( 'a' ).length;
        },
        
        /**
         * 获取已选好友的id
         * @method getSelectedFriends
         * @return {Array}
         */

        getSelectedFriends : function()
        {
            var rt = [];
            var a = XN.array.build( this.getEl( 'friendsContainer' ).getElementsByTagName( 'a' ) );
            XN.array.each( a , function( i , v )
            {
                rt.push( v.uid + '' );
            });
            return rt;
        },
        
        /**
         * 重设选择器
         * @method reset
         */

        reset : function()
        {
            this.deselectAll(); 
        },

        /**
         * 取消全选
         * @method deselectAll
         */

        deselectAll : function()
        {
            var els = XN.array.build( this.getEl( 'friendsContainer' ).getElementsByTagName( 'a' ) );
            XN.array.each( els , function( i , v )
            {
                XN.element.remove( v );
            });
            this.fireEvent( 'deselectAll' , this.getIds() );
        },
        
        /**
         * 选择一组好友
         * @method selectFriends
         * @param {Array} a
         */

        selectFriends : function( fs )
        {
            var This = this;
            XN.array.each( fs , function( i , v )
            {
                This.select( v );
            } );
        },
        
        /**
         * 反选一组好友
         * @method deselectFriends
         * @param {Array} a
         */

        deselectFriends : function( fs )
        {
            var This = this;
            XN.array.each( fs , function( i , v )
            {
                This.deselect( v );
            } );
        },
        
        /**
         * 选择一个好友
         * @method select
         * @param {String} id
         */

        select : function( o )
        {
            XN.log( 'mfs select' );
            
            var maxNum = this.getConfig( 'maxNum' );
            
            if ( maxNum )
            {
                if ( this.getFriendsNum()  > maxNum )
                {
                    this.fireEvent( 'overMaxNum' , maxNum );
                    return;
                }
            }

            if ( isString( o ) )
            {
                o = {
                    id : o,
                    name : this.getUserByID( o ).name
                };
            }


            
            if ( this.getFriendEl( o.id ) ) return;
            
            this.getEl( 'friendsContainer' ).insertBefore( this.createFriendHTML( o.id , o.name ) , this.getEl( 'inputContainer' ) );
            this.fireEvent( 'select' , o.id );
        },
        
        /**
         * 反选一个好友
         * @method deselect
         * @param {String} id
         */

        deselect : function( uid )
        {
            if ( !this.getFriendEl( uid ) )return;
            this.getFriendEl( uid ).remove();
            this.fireEvent( 'deselect' , uid );
        },

        _parseClickEvent : function( e )
        {
            var el = XN.event.element( e );
            XN.event.stop( e );
            if ( el && el.getAttribute( 'action' ) )
            {
                this.deselectFriend( el.getAttribute( 'uid' ) );
            }
        },

        createFriendHTML : function( uid , uname )
        {
            var a = $element( 'a' );
            a.id = this.getFriendID( uid );
            a.uid = uid;
            a.href = '#nogo';
            a.className = 'token';
            a.tabindex = '-1';
            a.innerHTML = [
                '<span>\n<span>\n<span>\n<span>\n<input type=\"hidden\" value=\"',
                uid,
                '" name=\"',
                this.getConfig( 'inputName' ),
                '\" />\n',
                '<input type=\"hidden\" value=\"',
                uname,
                '" name=\"',
                this.getConfig( 'nameInputName' ),
                '\" />\n',
                uname,
                '<span uid=\"',
                uid,
                '\" action=\"x\" class=\"x\" onmouseout=\"this.className=\'x\'\" onmouseover=\"this.className=\'x_hover\'\" >\n</span>\n</span>\n</span>\n</span>\n</span>'
            ].join( '' );
            return a;
        },

        _onInputKeydown : function( event )
        {
            var i = this.getEl( 'inputContainer' ),
            pa = i.previousSibling,
            na = i.nextSibling,
            input = this.input,
            c = this.getEl( 'friendsContainer' );
            if ( event.keyCode == 8 && this.input.value =='' )
            {
                if( pa )
                {
                    c.removeChild( pa );
                    this.deselectFriend( pa.aid );
                }
                return true;
            }
            else if ( event.keyCode == 37 && this.input.value == '' )
            {
                if ( pa && pa.tagName.toLowerCase() == 'a' )
                {
                    i.parentNode.removeChild( i );
                    c.insertBefore( i , pa );
                    setTimeout( function(){input.focus();} , 0 );
                }
                return true;
            }
            else if ( event.keyCode == 39 && this.input.value == '' )
            {
                if ( na && na.tagName.toLowerCase() == 'a' )
                {
                    i.parentNode.removeChild( i );
                    XN.dom.insertAfter( i , na );
                    setTimeout( function(){input.focus();} , 0 );
                }
                return true;
            }		
            return false
        }
    });

    XN.event.enableCustomEvent( proto );

    /*
     * patch for old version
     */
    proto.deSelectAll = proto.deselectAll;
    proto.deSelectFriend = proto.deselectFriend = proto.deselect;
    proto.selectFriend = proto.select;
    proto.getSelectedFriendsID = proto.getSelectedFriends;
    proto.getIds = proto.getSelectedFriends;
    /*
     * patch end
     */
})();

XN.ui.multiFriendSelectorWithMenu = function( p )
{
    var selector = new XN.ui.multiFriendSelector( p );

    var menu = new XN.ui.friendSelectorMenu({
        url : selector.getConfig( 'url' ),
        param : selector.getConfig( 'param' ),
        multi : true
    });
    
    selector.menuContainer.setContent( menu );
    
    XN.ui.friendSelectorSynchronous( selector , menu );
    
    return selector;
};

(function( ns )
{
	//var ID_PRE = 0;	
	var DEBUG = false;
	var addEvent = XN.event.addEvent;
	
	log = function( s )
	{
		if ( DEBUG ) XN.log ( isString( s ) ? 'ui.tabView:' + s : s );
		return s;
	}
	/**
	 * tabview
	 * @namespace XN.ui
	 * @class tabView
	 * @constructor
	 * @param {Object} params
	 */
	
	ns.tabView = function( params )
	{
		this.config = {
			selectedClass : 'select',
			event : 'click',
			mouseOverDelay : 0.2
		};
		$extend( this.config , params );
		this.init();
	};

	ns.tabView.prototype = {	
		
		_tabs : null,
		_currentTab : null,
		_idPre : null,
		_tabIndex : 0,

		init : function()
		{
			this._idPre = XN.util.createObjID();
			this._tabs = [];
		},
		
		getConfig : function( key )
		{
			if ( key == 'activeClass' ) return this.config[ 'activeClass' ] || this.config[ 'selectedClass' ];
			return this.config[ key ];
		},

		_getID : function( el )
		{
			log( '_getID start' );
			log( 'param:' );
			log( el );
			
			if ( isString( el ) ) return log( el );
			if ( el.id ) return log( el.id );
			
			log( 'do not have id' );
			this._tabIndex ++;
			el.setAttribute( 'id' , 'tabview_' + this._idPre + '_' + this._tabIndex );

			return log( el.id );
		},

		
		//get tab obj by key or element id or element refer
		_getTab : function( id )
		{
			log( '_getTab start' );
			log( 'param:id' );
			log( id );
			if ( !id ) return log( id );
			
			if ( id.label ) return log( id );

			
			var key = this._getID( id );
			log( 'key:' + key );
			
			var tabs = this._tabs;
			
			log( 'all tabs' );
			log( tabs );
			
			for ( var i = tabs.length - 1 ; i >= 0 ; i -- )
			{
				if ( tabs[ i ].key == key ) {
					log( '_getTab end' );
					return log( tabs[ i ] );
				} 
			}
			
			log( '_getTab end' );	
			return log( null );
		},
		
		/**
		 * @method getCurrentTab
		 * @return {Object}
		 */
		
		getCurrentTab : function()
		{
			return this._getTab( this._currentTab );
		},
		
		/**
		 * @method setCurrentTab
		 * @param {String} tab id
		 * @param {Boolean} forceReload
		 * @return {Object} this
		 */
		
		setCurrentTab : function( tab , forceReload )
		{
			log ( 'setCurrentTab start' );
			var oldC = this.getCurrentTab();
			var nowC = this._getTab( tab );
			
			log ( 'old current:' );
			log( oldC );
			log( 'now current:' );
			log( nowC );
			
			if ( oldC && oldC.key == nowC.key && !forceReload ) return;
			
			if ( oldC ) this._deactiveTab( oldC );
			this._activeTab( nowC );

			this._setCurrentTab( nowC );
			log( 'setCurrentTab end' );
			return this;
		},

		/**
		 * @method reset
		 * @return {Object} this
		 */
		
		reset : function()
		{
			var tab = this.getCurrentTab();
			if ( tab )
			{
				this._deactiveTab( tab );
			}
			this._setCurrentTab( null );
			return this;
		},

		_activeTab : function( tab )
		{
			log( '_activeTab:' );
			log( tab );
			
			tab.getEl( 'label' ).addClass( this.getConfig( 'activeClass' ) );
			if ( tab.content ) tab.getEl( 'content' ).show();
			tab.onActive( tab );
			
			log( '_activeTab end' );
		},
		
		_deactiveTab : function( tab )
		{
            //防止元素被销毁
            if ( tab.getEl( 'label' ) )
            {
			    tab.getEl( 'label' ).delClass( this.getConfig( 'activeClass' ) );
            }
			if ( tab.content ) tab.getEl( 'content' ).hide();
			tab.onInactive( tab );
		},

		_setCurrentTab : function( tab )
		{
			log( '_setCurrentTab start' );
			tab = this._getTab( tab );
			
			log( 'currentTab:' );
			log( tab );
			
			this._currentTab = tab ? tab.key : null;
			
			log( 'this._currentTab' );
			log( this._currentTab );
			
			log( '_setCurrentTab end' );
		},

		/**
		 * @method addTab
		 * @param {Object} t
		 * @return {Object} this
		 */
		
		addTab : function( t )
		{
			
			log( 'addTab start' );
			log( 'params:' );
			log( t );
			
			var This = this;
			
			var tab = {
				onActive : XN.func.empty,
				onClick : XN.func.empty,
				onInactive : XN.func.empty,
				onInit : XN.func.empty,
				getEl : function( key )
				{
					return $( this[ key ] );
				},
				active : false
			};
			
			t.label = this._getID( t.label );
			log( 'get label id:' + t.label );
			t.key = t.key || t.label;
			log( 'get key:' +t.key );

			if ( t.content )
			{
				t.content = this._getID( t.content );
				log( 'get content id:' + t.content );
			}
			
			$extend( tab , t );

			this._tabs.push( tab );
			
			log( 'all tabs' );
			log( this._tabs );
			
			if ( tab.active && this._currentTab === null )
			{
				if ( tab.content ) tab.getEl( 'content' ).show();
				tab.getEl( 'label' ).addClass( this.getConfig( 'activeClass' ) );
				this._setCurrentTab( tab );
			}
			else
			{
				if ( tab.content ) tab.getEl( 'content' ).hide();
			}

			var ev = this.getConfig( 'event' );
			
			if ( ev == 'click' ){
				addEvent( tab.getEl( 'label' ) , 'click' , function( e )
				{
					e = e || window.event;
					XN.event.stop( e );
					This._eventHander( e , tab.getEl( 'label' ) );
				} , false );
			}
			else if ( ev == 'mouseover' )
			{
				var isMouseOn = true;
				var timer = null;
				
				addEvent( tab.getEl( 'label' ) , 'mouseover' , function( e )
				{
					var el = this;
					isMouseOn = true;
					timer = setTimeout( function()
					{
						if ( !isMouseOn ) return;
						e = e || window.event;
						This._eventHander( e , tab.getEl( 'label' ) );
					} , This.getConfig( 'mouseOverDelay' ) * 1000 );
				} , false );
				
				addEvent( tab.getEl( 'label' ) , 'mouseleave' , function( e )
				{
					isMouseOn = false;
					if ( timer ) clearTimeout( timer );
				} , false );
			}
			
			tab.onInit( tab );
			
			log( 'addTab end' );
			
			return this;
		},
		
		_eventHander : function( e , el )
		{
			log( 'on click,el:' );
			log( el );
			log( 'get tab form by el:' );
			var tab = this._getTab( el );
			
			this.setCurrentTab( tab );
			tab.onClick( e , tab );
		},
		
		/**
		 * @method refresh
		 * @return {Object} this
		 */
		
		refresh : function()
		{
			this._activeTab( this.getCurrentTab() );
			return this;
		},

		
		//patch for old version
		
		showTab : function( id , forceReload )
		{
			this.setCurrentTab( id , forceReload );
		},

		hideAll : function()
		{
			this.reset();
		}
	};

	XN.event.enableCustomEvent( ns.tabView.prototype );

})( XN.ui );

/**
 * 强制页面重新渲染
 * @method refreshAll
 */

XN.ui.refreshAll = function()
{
    document.body.style.zoom = 1.1;
    document.body.style.zoom = 1;
};


/**
 * effect
 * @class effect
 * @namespace XN
 * @static
 */

XN.effect = {
	fadeIn:function(element,callBack){
		if(element.fadetimer)return;
		callBack = callBack || XN.FUNC.empty;
		var op = 0;
		element.setOpacity(0);
		element.style.display = '';
		element.fadetimer = setInterval(function(){
            XN.Element.setOpacity(element,(op += 0.20));
            if(op >= 1){
                clearInterval(element.fadetimer);
                element.fadetimer = null;
                callBack(element);
            }
		},60);
	},
	fadeOut:function(element,callBack){
		if(element.fadetimer)return;
		callBack = callBack || XN.FUNC.empty;
		var op =1;
		element.setOpacity(1);
		element.fadetimer = setInterval(function(){
            XN.Element.setOpacity(element,(op -= 0.20));
            if(op <= 0){
                clearInterval(element.fadetimer);
                element.fadetimer = null;
                callBack(element);
                element.setOpacity(1);
            }
        },60);		
	},
	gradient:function(element,r,g,b,callBack){
		if(element.gradientTimer)return;
		callBack = callBack || XN.FUNC.empty;
		element.style.backgroundColor = '#fff';
		element.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
		element.gradientTimer = setInterval(function(){
			b += 10;
			element.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + (b >255 ? 255 : b) + ')';
			if(b > 255){
				clearInterval(element.gradientTimer);
				element.gradientTimer = null;
				callBack(element);
			}
		},60);
	},
	slideOpen:function(element){
		if(element.slidetimer)return;
		if(!element.slideHeight){
			var _position = element.getStyle('position');
			element.setStyle('position:absolute;left:-99999px;top:-99999px;');
			element.show();
			element.slideHeight = element.offsetHeight;
			element.hide();
			element.setStyle('position:' + _position + ';left:auto;top:auto;');
		}
		var eh = element.slideHeight,h = 0;
		var step = parseInt(eh / 10);
		element.style.height = '0px';
		element.style.display = '';
		element.style.overflow = 'hidden';
		element.slidetimer = setInterval(function(){
			element.style.height = (h += step) + 'px';
			if(h >= eh){
				clearInterval(element.slidetimer);
				element.slidetimer = null;
				element.style.height = eh;
				element.style.overflow = element.slideOverflow;
			}
		},50);
	},
	slideClose:function(element){
		if(element.slidetimer)return;
		var eh = element.offsetHeight,h = eh;
		element.slideHeight = eh;
		element.slideOverflow = element.getStyle('overflow');
		element.style.overflow = 'hidden';
		var step = parseInt(eh / 10);
		element.slidetimer = setInterval(function(){
			element.style.height = (h -= step) + 'px';
			if(h <= 0){
				clearInterval(element.slidetimer);
				element.slidetimer = null;
				element.style.display = 'none';
				element.style.height = eh;
				element.style.overflow = element.slideOverflow;
			}
		},50);
	},
	scrollTo:function(element,speed,callBack){
		if(element.scrolltimer)return;
		speed = speed || 10;
		callBack = callBack || XN.FUNC.empty;
		var d = element.realTop();
		var i = XN.EVENT.winHeight();
		var h = document.body.scrollHeight;
		var a = XN.EVENT.scrollTop();;
		var offsetTop = null;
		if(d > a){
			if(d + element.offsetHeight < i + a )return;
			element.scrolltimer = setInterval(function(){
				a +=Math.ceil((d-a) / speed) || 1;
				window.scrollTo(0,a);
			  	if(a == d){
					clearInterval(element.scrolltimer);
					element.scrolltimer = null;
				}
			},10);
		}else{
			element.scrolltimer = setInterval(function(){
				a += Math.ceil((d-a) / speed) || -1;
				window.scrollTo(0,a);
			  	if(a == d){
					clearInterval(element.scrolltimer);
					element.scrolltimer = null;
				}
			},10);			
		}
	}
};

/*
 * patch for old version
 */

XN.EFFECT = XN.Effect = XN.effect;

/*
 * patch end
 */

XN.ui.getHiddenDiv = function()
{
    if ( ! this._hiddenDiv )
    {
        this._hiddenDiv = $element( 'div' ).hide();
        document.body.appendChild( this._hiddenDiv );
    }

    return this._hiddenDiv;
}

XN.ui.friendSearchBar = function( p )
{
    var input = $(p.input);
    var submit = $(p.submit || null);
    var form = $(p.form);
    var tip = p.tip || '找人...';
    var action = p.action || function(p)
    {
        window.location.href = 'http://' + XN.ENV.domain + '/profile.do?id=' + p.id;
    };
    var gotoUserPage = false;
    
    (new XN.FORM.inputHelper(input)).setDefaultValue(tip).onEnter(function(el)
    {
        if(gotoUserPage)return;
        if(!XN.STRING.isBlank(el.value))
        {
            form.submit();
        }
    });

    var maxLength = 24;

    var friendSelector = new XN.UI.friendSelector({
        id:input,
        noResult:function(){
            return '搜索"' + this.input.value + '"';
        },
        noInput : '请输入好友姓名(支持拼音输入)',
        limit : maxLength
    });

    /* 
    friendSelector.lastMenuItem = function()
    {
        if ( this.result.length == maxLength )
        {
            return '<li><p><a href="http://friend.' + XN.env.domain + '/myfriendlistx.do?qu=' + this.input.value + '">点击查看更多..</a></p></li>';
        }
        else
        {
            return '';
        }
    }
    */

    friendSelector.setMenuWidth( input.offsetWidth );


    friendSelector.onSelectOne = function(p)
    {
        gotoUserPage = true;
        action(p);
    };
    if(submit)submit.onclick = function()
    {
        if(gotoUserPage)return;
        var v = input.value;
        if(v != tip && !XN.STRING.isBlank(v))
        {
            form.submit();
            return false;
        }
    }
};
﻿if(XN.FORM)XN.FORM = null;
XN.Form = XN.FORM = {
	fillWithJSON:function(form,json) {
			form = $(form);
			var a = '';
			eval('(a='+json +')');
			XN.FORM.fillWithArray(form,a);
	},
	fillWithArray:function(form,a){
		form = $(form);
		for (var p in a){
			XN.FORM.Element.setValue(p,a[p],form);
		}
	},
	setValue:function(element,value){
		return XN.FORM.Element.setValue(element,value);
	},
	getValue:function(element){
		return XN.FORM.Element.getValue(element);
	},
	serialize:function(form,type) {
		return this.serializeElements(this.getElements(form),type || 'string');
	},
	serializeElements: function(elements, type,encode) {

		type = type || 'array';
		if(isUndefined(encode)){
			encode = false;
		} 
		var data = [],_key,_value;
		for (var i = 0,j = elements.length;i < j;i++){
			if (!elements[i].disabled && elements[i].name){
				_key = elements[i].name;
				_value = encode ? encodeURIComponent(XN.FORM.Element.getValue(elements[i])) : XN.FORM.Element.getValue(elements[i]);
				if (_value !== null){
					if (_key in data){
						if (!isArray(data[_key])) {data[_key] = [data[_key]];}
						data[_key].push(_value);
					}else{
						data[_key] = _value;
					}
				}
			}
		}
		if (type == 'array'){
			return data;
		}else if (type == 'string'){
			return XN.ARRAY.toQueryString(data);
		}else if(type == 'hash'){
			var tmp = {};
			for(var p in data){
				if(!isFunction(data[p])){
					tmp[p] = data[p];
				}
			}
			return tmp;
		}
		//return options.hash ? data : Object.toQueryString(data);
	},
	getElements: function(form) {
		form = $(form);
		var elements = [];
		var all = form.getElementsByTagName('*');
		for (var i = 0,j = all.length;i < j;i++ ){
			if (!isUndefined(XN.FORM.Element.Serializers[all[i].tagName.toLowerCase()])){
				elements.push(all[i]);
			}
		}

	return elements;
	}

};

$F = function(id,type){
	var el = $(id);
	if(el.tagName.toLowerCase() == 'form'){
		return XN.FORM.serialize(el,type);
	}else{
		return XN.FORM.getValue(el);
	}
};

XN.FORM.checkPasswordStrength =  function(el,callBack){
	el = $(el);
	function getStrength(str){
		var score = 0;
		var l = str.length;
		if(l <= 4){
			score += 5;
		}else if(l >4 && l < 8){
			score += 10;
		}else if(l > 7){
			score += 25;
		}
		
		var nums = 0;
		var marks = 0;
		var caps = 0;
		var mins = 0;
		
		var tchar;
		for (var i = str.length - 1;i >= 0; i--){
			tchar = str.charCodeAt(i);
			if(tchar > 47 && tchar <58){
				nums ++;
			}else if(tchar > 64 && tchar < 91){
				caps ++;
			}else if(tchar > 96 && tchar < 123){
				mins ++;
			}else if(tchar > 32 && tchar < 127){
				marks ++;
			}
		}
		
		if(caps && mins){
			score += 20;
		}else if((caps && !mins) || (mins && !caps)){
			score += 10;
		}else{
			score += 0;
		}
		
		if(nums > 2){
			score += 20;
		}else if(nums > 0 && nums < 3){
			score += 10;
		}else{
			score += 0;
		}
		
		if(marks > 1){
			score += 25;
		}else if(marks == 1){
			score += 10;
		}else{
			score += 0;
		}
		
		if(caps && mins && nums && marks){
			score += 5;
		}else if((caps || mins) && nums && marks){
			score += 3;
		}else if((caps || mins) && nums){
			score += 2;
		}
		
		var strength;
		var level;
		if(score >= 90){
			strength = '非常安全';
			level = 5;
		}else if(score >=80){
			strength = '安全';
			level = 4;
		}else if(score >= 70){
			strength = '非常强';
			level = 3;
		}else if(score >= 60){
			strength = '强';
			level = 3;
		}else if(score >= 50){
			strength = '一般';
			level = 2;
		}else if(score >= 25){
			strength = '弱';
			level = 1;
		}else if(score >= 0){
			strength = '非常弱';
			level = 1;
		}
		return {"level":level,"score":score,"strength":strength};
	}
	XN.EVENT.addEvent(el,'focus',function(){
		callBack(getStrength(el.value));
	},false);
	XN.EVENT.addEvent(el,'keyup',function(){
		callBack(getStrength(el.value));
	},false);
};

XN.FORM.richTextEditor = function(mode,id){
	this.mode = mode;
	this.id = id;
	//alert(this);
	this.init();
};
XN.FORM.richTextEditor.prototype = {
	mode:null,
	id:null,
	init	:function() {
		//alert();
		
		if(this.mode == "advanced"){
			alert();
			tinyMCE.init({
				theme : "advanced",
				mode : "exact",
				width : "618",
				height:"450",
				elements:this.id,
				language : "zh_cn",
				plugins : "safari,emotions,media",//,inlinepopups",
				theme_advanced_buttons1:'bold,italic,underline,|,forecolor,backcolor,emotions,|,image,media,changeMode',
				theme_advanced_buttons2 : "fontselect,fontsizeselect,removeformat,justifyleft,justifycenter,bullist,numlist,link,unlink",
				theme_advanced_buttons3 : "",
				theme_advanced_toolbar_location : "top",
				theme_advanced_toolbar_align : "left",
				theme_advanced_path : false,
				theme_advanced_statusbar_location : "bottom",
				theme_advanced_resizing : true,
				theme_advanced_resize_horizontal : false,
				theme_advanced_resizing_use_cookie : 1,
				theme_advanced_more_colors : false,
				theme_advanced_font_sizes : '3,4,5,6,7',
				theme_advanced_fonts:'楷体_GB2312=楷体_GB2312;黑体=黑体;隶书=隶书;Times New Roman=Times New Roman;Arial=Arial;',
				custom_undo_redo : false,
                convert_urls : false
			});
		}else if(mode == "simple"){
			tinyMCE.init({
			});
		/**/
		}
	},
	save:function(){
		tinyMCE.get(this.id).save();
	},
	focus	:function() {
		tinyMCE.execCommand('mceFocus',false,this.id);
	},
	resizeTo	:function(w,h) {
		tinyMCE.get(this.id).theme.resizeTo(w,h);
	},
	resizeBy	:function(dw,dh) {
		tinyMCE.get(this.id).theme.resizeBy(dw,dh);
	},
	show	 :function() {
		tinyMCE.get(this.id).show();
	},
	hide:function() {
		tinyMCE.get(this.id).hide();
	}/**/
};


XN.FORM.inputShadow = null;
XN.FORM.inputMethods = {
	maxSize:9000,
	minSize:30,
	timer:null,
	countSize:function(show,max,showMax){
		var s = this;
		//throw new Error('fsdfs');
		show = $(show);
		max = max || 999999;
		if(isUndefined(showMax)){
			showMax = true;
		}
		var el = this.element;
		
		function update(){
            var v = el.value;
            if(v.length >= max){
                el.value = v.substr(0,max);
                XN.Element.addClass(show,'full');
            }else{
                XN.Element.delClass(show,'full');
            }
            show.innerHTML = el.value.length  + (showMax ? '/' +((max == 999999) ? '' : max) : '');
		}
		
		update();
		
		XN.EVENT.addEvent(this.element,'focus',update);
		
		XN.EVENT.addEvent(this.element,'keyup',function(){
			setTimeout(function(){
				update();
			},0);
		},false);
		return this;
	},
	setDefaultValue:function(v){
		var el = this.element;
		v = v || el.value;
		if(document.activeElement == this.element){
				el.value = '';
		}else{
				el.value = v;
		}
		el.style.color='#888';
		XN.EVENT.addEvent(el,'focus',function(){
			if(el.value == v){
				el.value = '';
				el.style.color='#333';
			}
		},false);
		XN.EVENT.addEvent(el,'blur',function(){
			if(el.value == ''){
				el.value = v;
				el.style.color='#888';
			}
		},false);
		return this;
	},
	focus:function(position){
		var el = this.element;
		if(el.value.length == 0){
			el.focus();
			return;
		}
		if(el.setSelectionRange){
			el.focus();
			el.setSelectionRange(el.value.length, position || el.value.length );
		}else if(el.createTextRange){
			var range = el.createTextRange();
			range.moveStart('character', position || el.value.length);
			range.collapse(true);
			range.select();
		}else{
			el.focus();
		}
	},
	onEnter:function(callBack){
		var el = this.element;
		var isTextArea = el.tagName.toLowerCase() == 'textarea';
		XN.EVENT.addEvent(el,'keydown',function(e){
			e = e || window.event;
			if(e.keyCode == 13){
				if(isTextArea && !e.ctrlKey)return false;
				callBack(el);
				return false;
			}
		},false);
		return this;
	},
	onEsc:function(callBack){
		var el = this.element;
		XN.EVENT.addEvent(el,'keydown',function(e){
			e = e || window.event;
			if(e.keyCode == 27){
				callBack(el);
				return false;
			}
		},false);
		return this;		
	},
	_autoResize:function(type,min,max){
		var s = this,el = this.element;
		this.minSize = min || this.minSize;
		this.maxSize = max || this.maxSize;
		this.type = type;
		if(XN.FORM.inputShadow === null){
			var d = $element('div');
			d.setStyle('position:absolute;left:-99999px;top:-99999px');
			document.body.appendChild(d);
			XN.FORM.inputShadow = d;
		}
		this.shadow = XN.FORM.inputShadow;
		setTimeout(function(){
			if(min)return;
			s.minSize = type == 'width' ? el.offsetWidth : el.offsetHeight;
		},10);
		el.style.overflow = 'hidden';
		
		if(XN.BROWSER.IE){
			el.style.fontSize = '12px';
			el.style.fontFamily = "'lucida grande',tahoma,verdana,arial,simsun,sans-serif";
		}
//		this.element.addEvent('keyup',function(event){
//			event = event || window.event;
//			s.resize(event);
//		},false);//this.resize.bind(this);
//		if(XN.BROWSER.IE){
//			this.element.onpaste = function(event){
//				event = event || window.event;
//				s.resize(event);
//			}
//		}
//		return;
//		var s = this;
//		el.onfocus = this.onfocus.bind(this);
//		el.onblur = this.onblur.bind(this);
		XN.EVENT.addEvent(el,'focus',function(){
			s.timer = setInterval(s.resize.bind(s),200);
		});
		XN.EVENT.addEvent(el,'blur',function(){
			clearInterval(s.timer);
			s.timer = null;
		});
	},
//	onfocus:function(){
//		this.timer = setInterval(this.resize.bind(this),200);
//	},
//	onblur:function(){
//		clearInterval(this.timer);
//		this.timer = null;
//	},
	resize:function(event){
		//if(event.type !='onchange' && event.keyCode !== 8 && event.keyCode !== 13)return;
//		if(event.keyCode){
//			if(event.keyCode !== 8 && event.keyCode !== 13 && event.keyCode !== 46)return;
//		}
		var el = this.element,sh = this.shadow,oh,type = this.type;
		sh.style.fontSize = el.getStyle('fontSize');
		sh.style.fontFamily = el.getStyle('fontFamily');
		(type == 'width') ? sh.style.height = el.offsetHeight : sh.style.width = el.offsetWidth;
		sh.innerHTML = XN.STRING.escapeHTML(el.value).replace(/\r\n/mg,'<br>').replace(/\r/mg,'<br>').replace(/\n/mg,'<br>');
		
		(type == 'width') ? oh = sh.offsetWidth : oh = sh.offsetHeight + 27;

		if(oh > this.minSize && oh < this.maxSize){
			el.style[type] = oh + 'px';
		}else if(oh < this.minSize){
			el.style[type] = this.minSize + 'px';
		}else if(oh > this.maxSize){
			el.style[type] = this.maxSize + 'px';
		}
	}
};

XN.FORM.inputHelper = function(id){
	this.element = $(id);
};
XN.FORM.inputHelper.prototype = {
	autoResize:function(min,max){
		this._autoResize('width',min,max);
		return this;
	}
};

$extend(XN.FORM.inputHelper.prototype,XN.FORM.inputMethods);


XN.FORM.textAreaHelper = function(id){
	this.element = $(id);
};
//XN.DEBUG.On();
XN.FORM.textAreaHelper.prototype = {
	element:null,
	autoResize:function(min,max){
		this._autoResize('height',min,max);
		return this;
	}
};
$extend(XN.FORM.textAreaHelper.prototype,XN.FORM.inputMethods);

XN.FORM.Element = {
	getValue: function(element) {
		element = $(element);
		var method = element.tagName.toLowerCase();
		return XN.FORM.Element.Serializers[method](element);
	},
	setValue: function(element, value,form) {
		if(form){
			element = form[element];
			if((isElement(element) && element.tagName.toLowerCase() == 'select')){
				XN.FORM.Element.Serializers['select'](element, value);
			}else if(isElement(element)){
				XN.FORM.Element.Serializers[element.tagName.toLowerCase()](element, value);
			}else if(element[0]){
				var method = element[0].tagName.toLowerCase();
				for(var i = 0,j = element.length;i < j;i++){
					XN.FORM.Element.Serializers[method](element[i],(value[i] || value || ''));
				}
			}
		}else{
			element = $(element);
			var method = element.tagName.toLowerCase();
			XN.FORM.Element.Serializers[method](element, value);
			return element;
		}
	}
};
XN.FORM.Element.Serializers = {
	input: function(element, value) {
		switch (element.type.toLowerCase()) {
			case 'checkbox':
			case 'radio':
				return XN.FORM.Element.Serializers.inputSelector(element, value);
			default:
				return XN.FORM.Element.Serializers.textarea(element, value);
		}
	},
	inputSelector: function(element, value) {
		if (isUndefined(value)) {return element.checked ? element.value : null;}
		else {element.checked = !!value;}
	},

	textarea: function(element, value) {
		if (isUndefined(value)) {return element.value;}
		else {element.value = value;}
	},

	select: function(element, index) {
		if (isUndefined(index))
			{return this[element.type == 'select-one' ?'selectOne' : 'selectMany'](element);}
		else {
			var opt, value, single = !isArray(index);
			for (var i = 0, length = element.length; i < length; i++) {
				opt = element.options[i];
				value = this.optionValue(opt);
				if (single) {
					if (value == index) {
					opt.selected = true;
					return;
				}
				}
				else {opt.selected = XN.ARRAY.include(index,value);}
			}
		}
	},

	selectOne: function(element) {
		var index = element.selectedIndex;
		return index >= 0 ? this.optionValue(element.options[index]) : null;
	},

	selectMany: function(element) {
		var values = [], length = element.length;
		if (!length) {return null;}

		for (var i = 0; i < length; i++) {
			var opt = element.options[i];
			if (opt.selected) {values.push(this.optionValue(opt));}
		}
		return values;
	},

	optionValue: function(opt) {
    // extend element because hasAttribute may not be native
		//return Element.extend(opt).hasAttribute('value') ? opt.value : opt.text;
		return opt.value || opt.text;
	}
};

XN.FORM.tipMethods = {
	alert:function(s,el){
		XN.DO.alert(s,'提示');
	},
	div:function(s,el){
		el.innerHTML = s;
		XN.Element.show(el);
	},
	tip:function(s,el){
		var tip;
		if(!this.tipElement){
			tip = this.tipElement = new XN.UI.fixPositionElement({
				tagName:'div',
				alignType:'2-1',
				offsetY:-10,
				offsetX:110
			});
		}else{
			tip = this.tipElement;
		}
		tip.addClass('form-tip');
		if(XN.FORM.alertMethods.tipElement && XN.FORM.alertMethods.tipElement.isShow){
			return;
		}
		tip.setContent('<div>' +
'										<div class="regbox-t">' +
'											<div class="box-outer">' +
'												<div class="box-inner">' + s + '</div>' +
'											</div>' +
'										</div>' +
'									</div>');
	tip.moveTo(el);
		try{
			$(el.name + '_err').hide();
		}catch(e){}
	}
};

XN.FORM.alertMethods = {
	alert:function(s,el){
		XN.DO.alert(s,'出错提示','error');
	},
	div:function(s,el){
		try{
			el.innerHTML = '<img height="24" width="18" src="' + XN.ENV.staticRoot + 'imgpro/reg/th_ju.gif"/>' + s;
			XN.Element.show(el);
			el.show();
			el.delClass('hide');
		}catch(e){}
	},
	tip:function(s,el){
		var tip;
		if(!this.tipElement){
			tip = this.tipElement = new XN.UI.fixPositionElement({
				tagName:'div',
				alignType:'2-1',
				offsetY:-10,
				offsetX:110
			});
			tip.hide();
		}else{
			tip = this.tipElement;
		}	
			
			tip.setContent('<div>' +
'										<div class="regbox">' +
'											<div class="box-outer">' +
'												<div class="box-inner">' + s + '</div>' +
'											</div>' +
'										</div>' +
'									</div>');
		tip.moveTo(el);
		try{
			$(el.name + '_err').show();
			$(el.name + '_err').delClass('hide');
		}catch(e){}
	}
};

XN.FORM._helpTip = null;
XN.FORM._errorTip = null;
XN.FORM.autoChecker = function(ops){
	var s = this;
	this.form = $(ops.id);
	if(this.form.autoChecker)return;
	this.submitBar = $(ops.submit) || null;
	if(this.submitBar){
		this.submitBar.onclick = function(e){
			e = e || window.event;
			XN.EVENT.stop(e);
			s.submit();
			return false;
		}
	}
	this.checkers = [];
	var ck,els = XN.FORM.getElements(this.form),el;
	for(var i = 0,j = els.length;i < j;i++){
		el = els[i];
		if(!el.disabled && el.name && el.type != 'hidden'){
			var ck = new XN.FORM.elementChecker({
				id:els[i],
				checkMethod:(ops.checkMethod || 'auto'),
				alertMethod:(ops.alertMethod || 'alert'),
				alertDiv:(ops.alertDiv || null),
				tipDiv:(ops.tipDiv || null),
				tipMethod:(ops.tipMethod || 'div')
			});
			ck.form = this.form;
			ck.formControl = this;
			this.checkers.push(ck);
		}
	}
	this.form.autoChecker = true;
};
XN.FORM.autoChecker.prototype = {
	smartSubmit:false,
	submit:function(){
		if(this.isAllRight(true,true)){
			this.form.submit();
		}
	},
	enableSmartSubmit:function(){
		this.smartSubmit = true;
	},
	disableSmartSubmit:function(){
		this.smartSubmit = false;
	},
	isAllRight:function(showError,goToElement){
		var rt = true,cks = this.checkers;
		for(var i = 0,j = cks.length;i < j;i++){
			cks[i].check(showError,goToElement);
			if(!cks[i].passed){
				rt = false;
				break;
			}
		}
		return rt;
	},
	check:function(showError){
		//alert('eys');
		showError = showError || false;
		var cks = this.checkers;
		for(var i = cks.length - 1;i >= 0 ;i--){
			cks[i].check(showError);
		}
	},
	_onupdate:function(){
		if(this.smartSubmit){
			if(this.submitBar){
				var b = this.submitBar;
				if(this.isAllRight()){
					b.disabled = false;
					XN.Element.delClass(b,'gray');
				}else{
					b.disabled = true;
					XN.Element.addClass(b,'gray');
				}
			}
		}
		this.onupdate();
	},
	onupdate:function(){

	}
};
XN.FORM.elementChecker = function(parameters){
	this.options = parameters;
	this.checkers = [];
	this.params = [];
	//$extend(this.options,parameters);
	this.init();
};
XN.FORM.elementChecker.prototype = {
	element:null,
	form:null,
//	checkers:[],
//	params:[],
//	options:{},
	passed:true,
//	tip:null,
//	error:null,
	alertMethod:'alert',
	alertDiv:null,
	tipDiv:null,
	tipMethod:'div',
	submitBar:null,
	init:function(){
		var ops = this.options,el,s = this;

		this.element = el = $(ops.id);

		this.tip = el.getAttribute('tip');
		this.error = el.getAttribute('error');

		XN.EVENT.addEvent(el,'focus',function(){
			if(s.tip){
				s.showTip();
			}
		},false	);


		this.addRule(el.getAttribute('rule'));

		if(!ops.checkMethod || ops.checkMethod == 'auto'){
				XN.EVENT.addEvent(el,'blur',function(){
					try{
						XN.FORM.tipMethods.tipElement.hide();
					}catch(e){}
					s.check();
				},false);
		}

		this.tipMethod = ops.tipMethod;
		this.tipDiv = $(ops.tipDiv) || null;
		this.alertMethod = ops.alertMethod;
		this.alertDiv = $(ops.alertDiv) || null;
		this.options = null;
	},
	check:function(showError,goToElement){
		var s = this;
		try{
			$(this.element.name + '_ok').hide();
			$(this.element.name + '_err').hide();
		}catch(e){}
		if(this.checkers.length == 0)return;
		if(!this.form){
			this.searchForm();
		}
		if(isUndefined(showError)){
			showError = true;
		}
		var cks = this.checkers,pas = this.params,exes = XN.FORM.checkers;
		this.passed = true;
		var _errors = [],msg;
		if(this.error) _errors.push(this.error);
		for(var i = 0,j = cks.length;i < j;i++){
			if(!exes[cks[i]].exe.call(this,pas[i])){
				if(!this.error)_errors.push(exes[cks[i]].error);
				this.passed = false;
				break;
			}
		}
		if((!this.passed) && showError){
			if(_errors.length == 1){
				msg = '<p>' + _errors[0] + '</p>';
			}else{
				msg = '<ul><li>' + _errors.join('</li><li>') + '</li></ul>';
			}
			this.showError(msg);
			if(goToElement){
				try{
					window.location.href = '#' + s.element.name;
					setTimeout(function(){
						s.element.focus();
					},1000);
				}catch(e){}
			}
		}else{
			try{
				$(this.element.name + '_err').hide();
				$(this.element.name + '_ok').show();
				$(this.element.name + '_ok').delClass('hide');
			}catch(e){}
			try{
				XN.FORM.alertMethods.tipElement.hide();
			}catch(e){}
			if(this.alertDiv)XN.Element.hide(this.alertDiv);
			if(this.tipDiv)XN.ELement.hide(this.tipDiv);
		}
		if(this.formControl){
			this.formControl._onupdate();
		}
	},
	addRule:function(str){
		if(!str)return;
		if(isFunction(str)){
			this.checkers.push(str);
			return;
		}
		var rs = str.split('#'),tmp;
		for(var i = 0,j = rs.length;i < j;i++){
			tmp = rs[i].split(':');
			this.checkers.push(tmp[0]);
			this.params.push(tmp[1]);
		}
	},
	searchForm:function(){
		var el = this.element.parentNode;
		while(el !== null && el !== document.body){
			if(el.tagName.toLowerCase() == 'from'){
				this.form =el;
				break;
			}
			el = el.parentNode;
		}
	},
	showTip:function(){
		var tip = this.tip;
		if(this.tipMethod == 'alert'){

			XN.FORM.tipMethods.alert(tip,this.element);

		}else if(this.tipMethod == 'div' && this.tipDiv !== null){

			XN.FORM.tipMethods.div(tip,this.tipDiv);

		}else if(this.tipMethod == 'tip'){

			XN.FORM.tipMethods.tip(tip,this.element);

		}else{
			$(this.element.name + '_err').hide();
			$(this.element.name + '_tip').show();
			$(this.element.name + '_tipMsg').innerHTML = tip;
		}
	},
	showError:function(e){
		if(this.alertMethod == 'alert'){

			XN.FORM.alertMethods.alert(e,this.element);

		}else if(this.alertMethod == 'div'){

			XN.FORM.alertMethods.div(e,this.alertDiv || $(this.element.name + '_err'));

		}else if(this.alertMethod == 'tip'){

			XN.FORM.alertMethods.tip(e,this.element);

		}else{
			try{
				var id = this.element.name;
				$(id + '_err').show();
				$(id + '_err').delClass('hide');
				$(id + '_tip').show();
				$(id + '_tipMsg').innerHTML = e;
			}catch(e){}
		}
	}
};

XN.FORM.checkers = {
	blank:{
		exe:function(p){
			var str = this.element.value;
			return !XN.STRING.isBlank(str);
		},
		error:'必填项不能为空'
	},
	email:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return XN.STRING.isEmail(str);
		},
		error:'您输入的不是一个合法的 E-mail 地址'
	},
	phone:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return XN.STRING.isPhone(str);
		},
		error:'您输入的不是一个合法的电话号码'
	},
	mobile:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return XN.STRING.isMobile(str);
		},
		error:'您输入的不是一个合法的手机号码'
	},
	ip:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return XN.STRING.isIp(str);
		},
		error:'您输入的不是一个合法的ip地址'
	},
	url:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return XN.STRING.isUrl(str);
		},
		error:'您输入的不是一个合法的url'
	},
	num:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return XN.STRING.isNum(str);
		},
		error:'您只能输入一个数字'
	},
	zip:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return XN.STRING.isZip(str);
		},
		error:'您输入的不是一个合法的邮政编码'
	},
	en:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return XN.STRING.isEN(str);
		},
		error:'您只能输入英文字母'
	},
	length:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			var tmp  = p.split(',');
			var min = parseInt(tmp[0]);
			var max = parseInt(tmp[1]);
			var l = str.length;
			if(l < min || l > max){
				XN.FORM.checkers.length.error = '您输入字符长度只能在' + min + '-' + max + '之间';
				return false;
			}
			return true;
		},
		error:''
	},
	lengthWithSec:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			var tmp  = p.split(',');
			var min = parseInt(tmp[0]);
			var max = parseInt(tmp[1]);
			var l = str.length;
			if(l < min || l > max){
				XN.FORM.checkers.lengthWithSec.error = '您输入字符长度只能在' + min + '-' + max + '之间';
				return false;
			}
			if (!pwdSec())
			{
				XN.FORM.checkers.lengthWithSec.error = '您输入的密码过于简单';
				return false;
			}
			return true;
		},
		error:''
	},
	file:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			var avs = p.split(',');
			var passed = false;
			for(var i = 0,j = avs.length;i < j;i++){
				if(XN.STRING.endsWith(str,'.' + avs[i])){
					passed = true;
					break;
				}
			}
			if(!passed){
				XN.FORM.checkers.file.error = '您只能提交' + p + '格式的文件';
			}
			return passed;
		},
		error:''
	},
	include:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			if(!XN.STRING.include(str,p)){
				XN.FORM.checkers.include.error = '您输入的字符必须包含' + p;
				return false;
			}
			return true;
		},
		error:''
	},
	startsWith:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			if(!XN.STRING.startsWith(str,p)){
				XN.FORM.checkers.startsWith.error = '您输入的字符只能以' + p + '开头';
				return false;
			}
			return true;
		},
		error:''
	},
	endsWith:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			if(!XN.STRING.endsWith(str,p)){
				XN.FORM.checkers.endsWith.error = '您输入的字符只能以' + p + '结尾';
				return false;
			}
			return true;
		},
		error:''
	},
	custom:{
		exe:function(p){
			try{
				return window[p].call(this);
			}catch(e){
				if(XN.DEBUG_MODE){
					throw e;
				}
			}
			return true;
		},
		error:''
	},
	compare:{
		exe:function(p){
			return (this.element.value == $(p).value);
		},
		error:''
	},
	sharelink:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			if(str.substr(0,7) != "http://" && str.substr(0,6) != "ftp://"){
				this.element.value = 'http://' + str;
				str = this.element.value;
			}
			if(!XN.STRING.isUrl(str)){
				XN.FORM.checkers.sharelink.error = '请您输入一个有效的链接';
				return false;
			}
			if(/kaixin.com/.test(str)){
				XN.FORM.checkers.sharelink.error = '您必须输入一个站外链接';
				return false;
			}
			return true;
		},
		error:''
	},
	loginName:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			var tmp = '';
			for(var i = 0,j = str.length;i < j;i++){
				var code = str.charCodeAt(i);
				if(code >= 65281 && code <= 65373){
					tmp += String.fromCharCode(code - 65248);
				}else{
					tmp += String.fromCharCode(code);
				}
			}
			tmp = tmp.replace(/·/,'@');
			tmp = tmp.replace(/[。|,|，|、]/g,'.');
			str = this.element.value = tmp;
			if(/@/.test(str)){
				if(XN.STRING.isEmail(str)){
					return true;
				}else{
					XN.FORM.checkers.loginName.error = 'E-mail 格式错误';
					return false;
				}
			}else{
				if(/^[\w@_.-]{3,50}$/.test(str)){
					return true;
				}else{
					XN.FORM.checkers.loginName.error = '帐号格式错误';
					return false;
				}
			}
		},
		error:'您必须输入一个用户名或者email地址'
	},
	regName:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			if(!XN.STRING.isEmail(str)){
				XN.FORM.checkers.regName.error = 'E-mail 格式错误';
				return false;
			}
			var endError = '您的邮箱可能收不到激活信，推荐<a href=\"http:\/\/mail.126.com\" target=\"_blank\">126邮箱<\/a>。';
			var rt = true;
			XN.ARRAY.each([/qq\.com/i,/eyou\.com/i,/yaoyaobuluo\.cn/i,/love126\.com/i],function(i,v){
				if(v.test(str)){
					XN.FORM.checkers.regName.error = endError;
					rt = false;
					return;
				}
			});
			var req = new XN.NET.xmlhttp({
				url:'/ajxRgEm.do?authType=email&value=' + encodeURIComponent(str),
				asynchronous:false
			});
			var msg = req.transport.responseText;
			if(msg != 'OKEMAIL'){
				rt = false;
				XN.FORM.checkers.regName.error = msg;
			}
			return rt;
		},
		error:''
	},
	selectOne:{
		exe:function(p){
			var els = this.form[this.element.name];
			var rt = false;
			XN.ARRAY.each(els,function(i,v){
				if(v.checked){
					rt = true;
					return;
				}
			});
			return rt;
		},
		error:''
	},
	realName:{
		exe:function(){
			var str = this.element.value;
			if(!str)return true;
			function strlen(str) {
				var len = 0;
				for ( var i = 0; i < str.length; i++) {
					if (str.charCodeAt(i) > 255)
						len += 2;
					else
						len++;
				}
				return len;
			}
			function chinese(str) {
				var count = 0;
				for ( var i = 0; i < str.length; i++) {
					if (str.charCodeAt(i) > 255)
						count++;
				}
				return count;
			}
			if(strlen(str) > 12){
				XN.FORM.checkers.realName.error = '姓名不能多于6个汉字';
				return false;
			}
			if (chinese(str) < 2) {
				XN.FORM.checkers.realName.error = '请输入真实姓名';
				return false;
			}
			var req = new XN.NET.xmlhttp({
				url:'ajxRgNa.do',
				data:'authType=name&value=' + encodeURIComponent(str),
				asynchronous:false
			});
			var msg = req.transport.responseText;
			if(msg != 'OKNAME'){
				XN.FORM.checkers.realName.error = msg;
				return false;
			}
			return true;
		},
		error:''
	},
	verifyCode:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			var req = new XN.NET.xmlhttp({
				url:'/ajxRgIc.do?authType=icode&value=' + str + '&key_id=' + $('key_id').value,
				asynchronous:false
			});
			var msg = req.transport.responseText;
			if(msg != 'OKICODE'){
				XN.FORM.checkers.verifyCode.error = msg;
				return false;
			}
			return true;
		},
		error:''
	},
	check:{
		exe:function(p){
			return this.element.checked;
		},
		error:''
	},
	noCheck:{
		exe:function(p){
			return !this.element.checked;
		},
		error:''
	},
	password:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return /[A-Za-z0-9_\-]/.test(str);
		},
		error:'您的密码只能包含英文字母数字和-_'
	},
	not:{
		exe:function(p){
			var str = this.element.value;
			if(!str)return true;
			return str != p;
		},
		error:''
	}
};
﻿XN.WIDGETS = {};
XN.WIDGETS.notify = {
	frequency:1,//每隔多长时间取一次(min)
	
	_menu:null,
	_lastCount:[],
	_lastTitle:null,
	_notifytimer:null,
	_iCanNotify:false,
	_checkNewNotifyTimer:null,
	_getNewNotifyTimer:null,
	_fontTimer:null,
	_whiteTimer:null,
	_isTelling:false,
	tellTheUser:function(){
		if( this._isTelling ) return;
		this._isTelling = true;
		var s = this;
		
		//告诉其他窗口俺发现新提醒
		XN.COOKIE.set('hasnotify','2',null,'/','.kaixin.com');
		
		setTimeout(function(){
			XN.COOKIE.set('hasnotify','1',null,'/','.kaixin.com');
		},1000);
		
		//开始闪
		this._lastTitle = document.title;
		
		var fontTimer,whiteTimer;
		function showFont(){
			document.title = '【新提醒】- ' + s._lastTitle;
			s._fontTimer = setTimeout(function(){
				showWhite();
			},1000);
		}
		
		function showWhite(){
			document.title = '【　　　】- ' + s._lastTitle;
			s._whiteTimer = setTimeout(function(){
				showFont();
			},1000);
		}
		
		showFont();
		
		window.onfocus = function(){
			s.stopTell();
		}
	},
	stopTell:function(){
		this._isTelling = false;
		if(this._fontTimer)clearTimeout(this._fontTimer);
		if(this._whiteTimer)clearTimeout(this._whiteTimer);
		document.title = this._lastTitle;
		window.onfocus = null;
	},
	updateUI:function(o){
		//更新计数
		var count = 0;

		for(var i in o){
			if(isNumber(o[i]))count += o[i];
		}
		
        o.friendRequest = o.friendRequest || 0;
        o.notify = o.notify || 0;
        o.replyCount = o.replyCount || 0;

		//更新好友请求数
		if($('friendRequestCount') && o.friendRequest){
			$('friendRequestCount').innerHTML = '';
			$('friendRequestCount').appendChild(document.createTextNode(o.friendRequest));
		}
		
		//更新通知数
		if($('homeNotifyCount') && o.notify){
			$('homeNotifyCount').innerHTML = '';
			$('homeNotifyCount').appendChild(document.createTextNode(o.notify));
		}
		
		if(count == 0){
			$('showNewNotify').hide();
			return;
		}else{
			$('showNewNotify').show();
		}
		
		$('notifyCount').innerHTML = count;	
        
        if ( o.friendRequest >= 100 )
        {
            o.friendRequest = '100+';
        }

		var tmp = [];
		//tmp.push('<ul>');
		tmp.push('<li><a href="http://www.' + XN.ENV.domain + '/myreplylist.do"><b>' + o.replyCount + '条</b>未读留言</a></li>');
		tmp.push('<li><a href="http://friend.' + XN.ENV.domain + '/GetGuestRequest.do"><b>' + o.friendRequest + '个</b>好友申请</a></li>');
		tmp.push('<li><a style="border-bottom:0 none;" href="http://msg.' + XN.ENV.domain + '/notify/notifications.do"><b>' + o.notify + '个</b>通知</a></li>');
		//tmp.push('</ul>');
		$('notifydropmenu').getElementsByTagName( 'ul' )[ 0 ].innerHTML = tmp.join('');	
	},
	getNewNotify:function(){
		var s = this;
		function buildNotify(r){
			var o = XN.JSON.parse(r.responseText);
			
			//判断是否有新的提醒
			for( var i in o){
				if(isNumber(o[i]) && o[i] != 0 && s._lastCount[i] != o[i]){
					//如果有新提醒
					
					//如果本窗口可以提醒用户
					if(s._iCanNotify && !isUndefined(s._lastCount[i]))s.tellTheUser();
					
					//更新ui
					s.updateUI(o);
					break;
				}
			}
			
			for(var i in o){
				if(isNumber(o[i]))s._lastCount[i] = o[i];
			}
		}


        if ( /friendsell/.test( window.location.href ) )
        {
            var url = 'getMessageInfo.do';
        }
        else
        {
            var url = '/getMessageInfo.do';
        }

		new XN.NET.xmlhttp({
			url:url,
			onSuccess:buildNotify,
			onError:function(){
				if(s._checkNewNotifyTimer)clearInterval(s._checkNewNotifyTimer);
				if(s._getNewNotifyTimer)clearInterval(s._getNewNotifyTimer);
				$('showNewNotify').hide();
			}
		});
	},
	checkNewNotify:function(){
		var s = this;
		if(!XN.COOKIE.get('hasnotify')){
			//如果没有一个窗口在向后台取数据,则自个去取
			
			clearInterval(this._checkNewNotifyTimer);
			this._checkNewNotifyTimer = null;
			
			//插根桩子先
			XN.COOKIE.set('hasnotify','1',null,'/','.kaixin.com');
			
			
			//可以向用户提示
			this._iCanNotify = true;
			
			this._getNewNotifyTimer = setInterval(function(){
				s.getNewNotify();
			},this.frequency * 60 * 1000);		
			
		}else if(XN.COOKIE.get('hasnotify') == '2'){

			//如过其他窗口取到了新的提醒，自个也去取一份，并更新
			s.getNewNotify();

		}else if(XN.COOKIE.get('hasnotify') == '1'){
			//如果没有新的提醒
		}
	},
	init:function(){
		if(!$('showNewNotify'))return;
		var s = this;
		var offsetY;
		if(XN.BROWSER.IE6){
			offsetY = -5;
		}else if(XN.BROWSER.IE7){
			offsetY = -6;
		}else{
			offsetY = -7;
		}
		this._menu = new XN.UI.menu({
			bar:'showNewNotify',
			fireOn:'mouseover',
			menu:'notifydropmenu',
			barOnshowClass:'onhover',
			'offsetY':offsetY,
			offsetX:2
		});
		
		//先得一次
		this.getNewNotify();
		
		//每隔一秒钟检测是否有新的提醒
		this._checkNewNotifyTimer = setInterval(function(){
			s.checkNewNotify();
		},1000);
		
		window.onunload = window.onbeforeunload = function(){
			if(!s._iCanNotify)return;
			XN.COOKIE.del('hasnotify','/','.kaixin.com');
		};
	}
};

XN.DOM.readyDo(function(){
	XN.WIDGETS.notify.init();
});
XN.DOM.readyDo(function()
{
	if ( !$( 'head_profile_link' ) ) return;
	new XN.UI.menu({
		bar : 'head_profile_link',
		menu : 'header_profile_menu',
		fireOn : 'mouseover'
	});
});

//更多应用菜单
XN.DOM.readyDo(function()
{
    if ( !$( 'show_more_apply_menu' ) )return;
    var y;
    if ( XN.Browser.IE6 )
    {
        y = 0;
    }
    else if ( XN.Browser.IE7 )
    {
        y = 0;
    }
    else
    {
        y = 0;
    }
    var menu = new XN.UI.menu({
        bar : 'show_more_apply_menu',
        menu : 'more_apply_menu',
        alignType : '3-4',
		addIframe : true,
        fireOn : 'mouseover',
			barOnshowClass : 'on-line',
        offsetY : y
    });
});

if ( !XN.APP ) XN.APP = {};
if ( !XN.app ) XN.app = XN.APP;
if ( !XN.app.status ) XN.app.status = {};
(function()
{
    XN.env = XN.ENV;
    $ = xn_getEl;

    XN.app.status.notify = {
        
        displayCount : 5,
        inputTip : '更新状态，让好友们知道你在做什么...',
        hideDelay : 5,
        statusJS : XN.env.staticRoot + 'jspro/xn.app.status.js',

        getID : function( id )
        {
            return 's_n_' + id;
        },

        getEl : function( id )
        {
            return $( this.getID( id ) );
        },
        
        _inited : false,

        init : function()
        {
            if ( this._inited ) return;
            this._inited = true;

            XN.log( 'init' );
            
            $ = xn_getEl;

            var This = this;
            try
            {
                var c = XN.DOM.getElementsByClassName( 'chatnote' , 'wpiroot' );
                c = c[ 0 ];
                XN.log( c );
            }
            catch( e ){return;}
            

            var span = $element( 'span' );
            XN.log( span );
            //span.addClass( 'float-left' );
            span.addClass( 'status_input' );
            span.innerHTML = '<input id="' + this.getID( 'input' ) + '" class="input-text" type="input" />'
            + '<input type="button" class="input-button" style="display:none;" value="发布" id="' + this.getID( 'submit' ) + '"/>';
            
            c.appendChild( span );
            
            var div = $element( 'div' );
            div.setAttribute( 'id' , this.getID( 'frame' ) );
            div.innerHTML = [
                '<div class="noticecontainer">',
                    '<div class="noticebox_shadow">',
                            '<div id="' + this.getID( 'list' )  + '"></div>',
                    '</div>',
                    '<div class="anglebottom"></div>',
                '</div>'
            ].join( '' );
            c.appendChild( div );


            XN.event.addEvent( this.getID( 'input' ) , 'focus' , function()
            {
                This.getEl( 'submit' ).show();
            });

            XN.event.addEvent( this.getID( 'input' ) , 'blur' , function( e )
            {
                
                This.getEl( 'submit' ).hide();
            });
            
            XN.event.addEvent( this.getID( 'submit' ) , 'mousedown' , function( e )
            {
                XN.event.stop( e || window.event );
                This.update( This.getEl( 'input' ).value );
                //This.getEl( 'submit' ).hide();
            });

            new XN.FORM.inputHelper( this.getEl( 'input' ) )
            .setDefaultValue( this.inputTip )
            .onEnter( function()
            {
                This.update( This.getEl( 'input' ).value );
            });

            //this.getEl( 'frame' ).hide();
            this.hide();
        },


        show : function()
        {
            //this.getEl( 'frame' ).show();
            this.getEl( 'input' ).show();
        },

        hide : function()
        {
            this.getEl( 'frame' ).hide();
            this.getEl( 'input' ).hide();
        },

        del : function( id )
        {
            try
            {
                this.getEl( 's_' + id ).remove();
            }
            catch(e)
            {
                id.remove();
            }
            
            if ( this.getEl( 'list' ).getElementsByTagName( 'div' ).length == 0 )
            {
                this.getEl( 'frame' ).hide();
            }
        },
        
        update : function( str )
        {

            var This = this;
            function onSuccess()
            {
                XN.app.status.notify.message( '您的状态已经成功发布' );
                This.resetInput();
            }

            if ( window.statusEditor )
            {
                
                statusEditor._action.addEvent( 'postSuccess' , onSuccess );

                statusEditor._action.addEvent( 'postSuccess' , function()
                {
                    this.delEvent( 'postSuccess' , onSuccess );
                });
                
                statusEditor._action.addEvent( 'postError' , function()
                {
                    this.delEvent( 'postSuccess' , onSuccess );
                });
            
                statusEditor.update( str );

            }
            else
            {
                XN.loadFile( this.statusJS , function()
                {
                 
                    XN.log( 'load fasdfsasa' );
                    var action = new XN.app.status.updateAction({
                        reqeustURI : 'http://home.kaixin.com/doing/update.do',
                        parseMediaURI : 'http://home.kaixin.com/share/GetUrlInfo.do',
                        getTscURI : 'http://home.kaixin.com/doing.do'
                    });
                    
                    action.getTscCode();

                    action.addEvent( 'postSuccess' , function()
                    {
                        onSuccess();
                    });

                    action.addEvent( 'postError' , function( r )
                    {
                        XN.DO.showError( r );
                    });

                    setTimeout( function()
                    {
                        action.update( str );
                    } , 500 );

                });


            }
            
        },

        resetInput : function()
        {
            XN.log( 'resetInput' );
            //fix bug for ie6
            var input = this.getEl( 'input' );
            input.value = this.inputTip;
            input.style.color = '#888';
            input.blur();
        },


        sendReply : function( sid )
        {
            var reply = this.getEl( 'text' + sid ).value;

            if ( XN.STRING.isBlank( reply ) )
            {
                XN.DO.showError( '回复内容不能为空' );
                return;
            }
            
            new XN.net.xmlhttp({
                url : 'http://home.kaixin.com/doing/reply.do',
                data : 'c=' + encodeURIComponent( reply ) + '&doingId=' + sid + '&owner=' + this.getEl( 's_' + sid ).getAttribute( 'oid' ) + '&rpLayer=0',
                onSuccess : function( r )
                {
                    XN.app.status.notify.message( '已成功回复' );
                    XN.app.status.notify.del( sid );
                    var ed = getReplyEditor( sid , 'f' );
                    
                    if ( ed )
                    {
                        ed.hide();
                        delReplyEditor( sid , 'f' );
                    }
                },
                onError : function( r )
                {
                
                }
            });

            this.getEl( 'reply' + sid ).innerHTML = '正在发送...';
        },

        showReply : function( sid )
        {
            this.getEl( 'reply' + sid ).show();
            this.getEl( 'showR' + sid ).hide();
            var input = this.getEl( 'text' + sid );
            if ( !input.helper )
            {
                input.helper = new XN.FORM.inputHelper( input ).onEsc(function()
                {
                    XN.app.status.notify.hideReply( sid );
                }).onEnter(function()
                {
                    XN.app.status.notify.sendReply( sid );
                });
            }
        },

        hideReply : function( sid )
        {
            this.getEl( 'reply' + sid ).hide();
            this.getEl( 'showR' + sid ).show();
            this.getEl( 'text' + sid ).value = '';
        },
        
        message : function( msg )
        {
            var div = $element( 'div' );
            div.addClass( 'noticebox clearfix' );
            div.innerHTML = msg;
            this.pop( div );
        },

        pop: function( div )
        {
            var This = this;
            
            this.getEl( 'frame' ).show();
            
            var f = this.getEl( 'list' );
            try
            {
                f.insertBefore( div , f.firstChild );
            }
            catch( e )
            {
                f.appendChild( div );
            }
            
            this.isMoreThan( this.displayCount );
            setTimeout( function()
            {
                var sid = div.getAttribute( 'sid' );
                var el = This.getEl( 'reply' + sid );
                if ( sid  && el && el.style.display != 'none' ) return;
                try
                {
                    if ( sid )
                        This.del( sid );
                    else
                        This.del( div );
                }catch(e){}
            } , 1000 * this.hideDelay );
        },

        get : function( o )
        {
            XN.log( o );

            var div = $element( 'div' );
            div.addClass( 'noticebox clearfix' );
            div.setAttribute( 'id' , this.getID( 's_' + o.sid ) );
            div.setAttribute( 'sid' , o.sid );
            div.setAttribute( 'oid' , o.ownerId );
            
            var profile = 'http://' + XN.env.domain + '/profile.do?id=' + o.ownerId;
            div.innerHTML = [
                '<a href="#nogo" class="closenotice" onclick="XN.app.status.notify.del(\'' + o.sid + '\');" onfocu="this.blur();">关闭</a>',
                '<a class="headpic" href="' + profile + '" target="_blank" style="background-image:url(' + o.head + ');"></a>',
                '<div class="noticecontent">',
                    '<p class="friendname">',
                        '<a href="' + profile + '" target="_blank">' + o.name + '</a>',
                        '<span>更新状态</span>',
                    '</p>',
                    '<p class="contenttext">',
                        '<span>' + o.content + '</span>',
                        '<a class="replylink" id="' + this.getID( 'showR' + o.sid ) + '" href="#nogo" onclick="XN.app.status.notify.showReply(\'' + o.sid + '\');">回复</a>',
                    '</p>',
                '</div>',
                '<div style="display:none;" class="replybox" id="' + this.getID( 'reply' + o.sid ) + '">',
                    '<textarea id="' + this.getID( 'text' + o.sid ) + '" class="replytext"></textarea>',
                    '<p class="actionbox">',
                        '<input type="button" value="确定" onclick="XN.app.status.notify.sendReply(\'' + o.sid + '\');" class="input-button"/>',
                        '<input type="button" value="取消" onclick="XN.app.status.notify.del(\'' + o.sid + '\');" class="input-button gray"/>',
                    '</p>',
                '</div>'
            ].join( '' );

            this.pop( div );
            
        },

        isMoreThan : function( n )
        {
            var nodes = this.getEl( 'list' ).childNodes;

            if ( nodes.length >= n )
            {
                for ( var i = nodes.length - 1;i >=1;i -- )
                {
                    if ( nodes[ i ].nodeType == 1 && this.getEl( 'reply' + nodes[ i ].getAttribute( 'sid' ) ).style.display == 'none' )
                    {
                        
                        $( nodes[ i ] ).remove();
                        break;
                    }
                }
            }
        }
    };
})();

/*
function killErrors() {
return true;
}
window.onerror = killErrors;




if (window.Event) 
document.captureEvents(Event.MOUSEUP); 

function nocontextmenu() 
{ 
event.cancelBubble = true 
event.returnValue = false; 

return false; 
} 

function norightclick(e) 
{ 
if (window.Event) 
{ 
if (e.which == 2 || e.which == 3) 
return false; 
} 
else 
if (event.button == 2 || event.button == 3) 
{ 
event.cancelBubble = true 
event.returnValue = false; 
return false; 
} 

} 

document.oncontextmenu = nocontextmenu; // for IE5+ 
document.onmousedown = norightclick; // for all others 

*/
