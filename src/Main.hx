import promhx.Promise;
using Main.HttpExtensions;
import haxe.Http;
class Main 
{
	var P2:Promise<Int>;
	var p1:Promise<String>;
	function new()
	{
		//p1 = new Promise<String>();
		// new Http("/req/opk").promise()
		// .then(function(s)new Http("req/"+s).promise())
		// .then(function(s)trace("afterA"));
		
		new Http("/req/opk").promise()
		.then(function(t)new Http("req/uli").promise())
		.then(function(t)new Http("req/tagada").promise());
		//Promise.when(p1).then(function(x:String)trace(x));
	//	p1.then(function(x:String)trace(x)).then(function(d)trace("yo"));
		
		 

        // Simple: deliver promise when value is available.
        //p1.then(function(x) trace("delivered " + x));

        // Deliver multiple promises when they are all available.
        // the "then" function must match the arity of the contained values
        // from the arguments to "when".
        
        //Promise.when(p2).then(function(x)p1.resolve(1));
        
        //.resolve(1);
        //p2.resolve(2);
	}
	// function req(url:String,?data:Dynamic<Dynamic>):Promise<String>
	// {
	// 	var p=new Promise<String>(err);
	// 	var r= new haxe.Http("req/"+[1,2]);
	// 	r.onError = p.reject;
	// 	r.onData=function(t)p.resolve(t);
	// 	r.request(false);
	// 	return p;
	// }

	function err(arguments) 
	{
		trace("errorr");
	}
	function pip() 
	{
		trace("pip");
	}
	function pop(a:Int) 
	{
		trace("pop done");
	}
	static public function main()
	{
		var app = new Main();
	}
}
import haxe.Http;
class HttpExtensions{
    public static function promise(h:Http,request = false, ?err:Dynamic->Dynamic){
        var p = new Promise<String>(err);
        h.onError = p.reject;
        var set = false;
        h.onData = function(x){
            if (!set) p.resolve(x);
            else set = true;
        }
        h.request(request);
        trace("p="+p);
        return p;
    }
}