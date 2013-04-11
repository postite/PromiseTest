import neko.Lib;
import haxe.web.Dispatch;
class Index 
{
	function new()
	{
		
		
	}
	function doDefault() 
	{
		Lib.print(new IndexView().execute({}));
	}
	function doReq(arg:String) 
	{
		Lib.print("pop"+arg);
	}

	static public function main()
	{
		
		var app = new Index();
		Dispatch.run(neko.Web.getURI(),neko.Web.getParams(),app);
	}
}

import erazor.macro.Template;
@:includeTemplate("../bin/_index.html")
class IndexView extends Template<Dynamic>{}