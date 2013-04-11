import promhx.Promise;
using Main.HttpExtensions;
import haxe.Http;
class Main 
{
	
	function new()
	{
		new Http("/req/opk").promise()
		.then(function(t) new Http("req/oki").promise())
		.then(function(t)new Http("req/tagada").promise()); //is not fired 
		
		new Http("/req/opk").promise()
		.pipe(function(t)return new Http("req/oki").promise())
		.then(function(t)new Http("req/tagada").promise()); //is fired

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